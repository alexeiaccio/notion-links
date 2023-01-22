import { getDB } from '~/utils/data'

export default async function Page() {
  const db = await getDB()

  return (
    <>
      <h1>
        {
          // @ts-expect-error No types yet
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          db?.properties?.title?.title?.[0]?.plain_text ?? '...'
        }
      </h1>
      {db && <pre>{JSON.stringify(db, null, 2)}</pre>}
    </>
  )
}
