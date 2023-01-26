import { Client, isFullBlock, isFullPage, LogLevel } from '@notionhq/client'
import type {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { env } from '~/env/server.mjs'

export const notionVersion = '2022-06-28'

export const notion = new Client({
  auth: env.NOTION_SECRET,
  notionVersion,
  logLevel: LogLevel.ERROR,
})

export async function getData() {
  const page = await getPage(env.NOTION_PAGE_ID)
  const blocks = await getBlockChildren(env.NOTION_PAGE_ID)
  let [infoBlock, ...otherBlocks] = blocks || []
  infoBlock = infoBlock?.type === 'paragraph' ? infoBlock : undefined
  const socialsBlock = otherBlocks.at(-1)?.type === 'child_database' ? otherBlocks.at(-1) : undefined
  otherBlocks = infoBlock ? otherBlocks : blocks || []
  otherBlocks = socialsBlock ? otherBlocks.slice(0, -1) : otherBlocks
  return {
    id: idFromUUID(env.NOTION_PAGE_ID),
    name: getProperty(page?.properties, 'title', 'title')?.[0]?.plain_text ?? null,
    avatar: getFile(page?.icon as File) ?? null,
    cover: getFile(page?.cover) ?? null,
    info: infoBlock ? infoBlock.paragraph.rich_text.map((part) => part.plain_text).join('') ?? null : null,
    links: otherBlocks?.flatMap((block) => {
      if (block.type === 'bookmark') {
        const content = getBlockContent(block, block.type)
        if (!content?.url) return []
        return {
          id: block.id,
          type: block.type,
          href: content.url,
          title: richTextToPlainText(content.caption),
        }
      }
      if (block.type === 'toggle' && block.has_children) {
        const content = getBlockContent(block, block.type)
        return {
          id: block.id,
          type: block.type,
          title: richTextToPlainText(content?.rich_text),
        }
      }
      return []
    }),
    socials: socialsBlock?.id ?? null,
  } as const
}

export async function getBlocktData(id: string) {
  const data = await getBlockChildren(id)
  return data?.flatMap((block) => {
    if (block.type === 'paragraph') {
      const content = getBlockContent(block, block.type)
      return {
        id: block.id,
        type: block.type,
        text: richTextToPlainText(content?.rich_text),
      }
    }
    if (block?.type === 'video') {
      const content = getBlockContent(block, block.type)
      if (content?.type !== 'external') return []
      return {
        id: block.id,
        type: block.type,
        url: content.external.url,
      }
    }
    return []
  })
}

export async function getSocialsData(id: string | undefined) {
  const data = await getDatabase(id)
  return data?.results.flatMap((item) => {
    if (!isFullPage(item)) return []
    if (item.object === 'page') {
      return {
        id: item.id,
        title: richTextToPlainText(getProperty(item.properties, 'title', 'title')),
        media: getProperty(item.properties, 'media', 'select')?.name ?? null,
        url: getProperty(item.properties, 'link', 'url') ?? null,
      }
    }
    return []
  })
}

// #region api

export async function getPage(id: string | undefined) {
  const page = await notion.pages.retrieve({
    page_id: idFromUUID(id),
  })
  if (!isFullPage(page)) return null
  return page
}

export async function getBlockChildren(id: string | undefined) {
  const blocks = await notion.blocks.children.list({
    block_id: idFromUUID(id),
  })
  if (!id || !blocks) return null
  return blocks.results.filter(isNonEmptyBlock)
}

export async function getDatabase(id: string | undefined) {
  const database = await notion.databases.query({
    database_id: idFromUUID(id),
  })
  return database
}

export async function getBlockRecordMap(id: string | undefined) {
  if (!id) return null

  try {
    const data = await fetch('https://www.notion.so/api/v3/syncRecordValues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token_v2=${env.NOTION_TOKEN}`,
      },
      body: JSON.stringify({
        requests: [
          {
            pointer: {
              table: 'block',
              id,
            },
            version: 1,
          },
        ],
      }),
    })
    const json = (await data.json()) as { recordMap: RecordMap }
    const recordMap = json.recordMap
    const properties = recordMap.block?.[id]?.value?.properties
    const format = recordMap.block?.[id]?.value?.format
    return {
      id,
      title: properties?.title?.[0]?.[0] ?? null,
      description: properties?.description?.[0]?.[0] ?? null,
      icon: format?.bookmark_icon ?? null,
      cover: format?.bookmark_cover ?? null,
    }
  } catch (error) {
    console.error(error)
  }
}

// #endregion

// #region helpers

export function idFromUUID(id: string | null | undefined): string {
  return id?.replace(/-/g, '') ?? ''
}

function isNonEmptyBlock(block: Block): block is BlockObjectResponse {
  return (
    isFullBlock(block) &&
    (block.has_children ||
      block.type !== 'paragraph' ||
      block.paragraph?.rich_text.length > 1 ||
      (block.paragraph?.rich_text[0]?.plain_text?.trim().length ?? 0) > 0)
  )
}

function getProperty<
  Props extends Properties,
  Prop extends Props[keyof Props],
  Type extends Prop['type'],
  Res extends Extract<Prop, { type: Type }>,
  TypeKey extends Extract<keyof Res, Type>,
>(props: Props | null | undefined, key: keyof Props, type: Type): Res[TypeKey] | null {
  return props && key in props ? (props[key] as Res)[type as unknown as TypeKey] || null : null
}

function getBlockContent<
  Props extends BlockObjectResponse,
  Type extends Props['type'],
  Res extends Extract<Props, { type: Type }>,
  TypeKey extends Extract<keyof Res, Type>,
>(props: Props | null | undefined, type: Type): Res[TypeKey] | null {
  return props && type in props ? (props as unknown as Res)[type as unknown as TypeKey] || null : null
}

function getFile(file: Partial<File> | null | undefined) {
  if (!file) return null
  if (file.type == 'external') return { url: file.external?.url ?? '', type: file.type, name: file.name ?? '' }
  if (file.type === 'file') return { url: file.file?.url ?? '', type: file.type, name: file.name ?? '' }
}

function richTextToPlainText(richText: RichTextItemResponse[] | undefined | null) {
  return richText?.map((part) => part.plain_text).join('') ?? ''
}

type Block = PartialBlockObjectResponse | BlockObjectResponse
type Properties = PageObjectResponse['properties']
type Property = NonNullable<Properties[keyof Properties]>
type File = Extract<Property, { type: 'files' }>['files'][number]

export interface RecordMap {
  block: TBlock
}

export interface TBlock {
  [key: string]: TEditor
}

export interface TEditor {
  role: string
  value: Value
}

export interface Value {
  id: string
  version: number
  type: string
  properties: TProperties
  format: Format
  created_time: number
  last_edited_time: number
  parent_id: string
  parent_table: string
  alive: boolean
  created_by_table: string
  created_by_id: string
  last_edited_by_table: string
  last_edited_by_id: string
  space_id: string
}

export interface TProperties {
  link: string[][]
  title: string[][]
  caption: string[][]
  description: string[][]
}

export interface Format {
  bookmark_icon: string
  bookmark_cover: string
}

// #endregion
