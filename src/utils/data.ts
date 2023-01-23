import { Client, isFullBlock, isFullPage, LogLevel } from '@notionhq/client'
import type {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
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
  return {
    name: getProperty(page?.properties, 'title', 'title')?.[0]?.plain_text ?? null,
    avatar: getFile(page?.icon as File) ?? null,
    cover: getFile(page?.cover) ?? null,
    info:
      blocks?.[0]?.type === 'paragraph'
        ? blocks[0].paragraph.rich_text.map((part) => part.plain_text).join('') ?? null
        : null,
    page,
    blocks,
  } as const
}

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
  return props && key in props ? (props[key] as Res)?.[type as unknown as TypeKey] || null : null
}

function getFile(file: Partial<File> | null | undefined) {
  if (!file) return null
  if (file.type == 'external') return { url: file.external?.url ?? '', name: file.name ?? '' }
  if (file.type === 'file') return { url: file.file?.url ?? '', name: file.name ?? '' }
}

type Block = PartialBlockObjectResponse | BlockObjectResponse
type Properties = PageObjectResponse['properties']
type Property = NonNullable<Properties[keyof Properties]>
type File = Extract<Property, { type: 'files' }>['files'][number]
