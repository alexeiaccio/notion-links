import { Client, LogLevel } from '@notionhq/client'
import { env } from '~/env/server.mjs'

export const notionVersion = '2022-06-28'

export const notion = new Client({
  auth: env.NOTION_SECRET,
  notionVersion,
  logLevel: LogLevel.ERROR,
})

export async function getDB() {
  const db = await getPage(env.NOTION_PAGE_ID)
  return db
}

export async function getPage(id: string | undefined) {
  const page = await notion.pages.retrieve({
    page_id: idFromUUID(id),
  })
  if (!page) return null
  return page
}

export function idFromUUID(id: string | null | undefined): string {
  return id?.replace(/-/g, '') ?? ''
}
