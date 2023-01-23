import { getData } from '~/utils/data'

export default async function Page() {
  const data = await getData()

  return (
    <>
      <h1>
        {
          // @ts-expect-error No types yet
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          data?.properties?.title?.title?.[0]?.plain_text ?? '...'
        }
      </h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}
