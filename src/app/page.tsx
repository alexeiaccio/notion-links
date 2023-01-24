import { getBlocktData, getData, getSocialsData } from '~/utils/data'
import { ClientComponent } from './client'
import { Image } from './image'

export default async function Page() {
  const data = await getData()

  return (
    <main className="flex flex-col items-center gap-2">
      <div className="grid aspect-[10/4] w-full place-items-center overflow-hidden">
        <Image src={data?.cover?.url} width={1920} id={data.id} alt="" />
      </div>
      <div className="relative -mt-14 h-24 w-24 overflow-hidden rounded-full object-cover">
        <Image src={data?.avatar?.url} width={96} height={96} id={data.id} alt={data?.name ?? ''} />
      </div>
      <h1 className="text-2xl font-bold">{data?.name}</h1>
      {data?.info && <p className="px-4">{data.info}</p>}
      <div className="grid w-full gap-2 px-4">
        {data?.links?.map((link) => {
          switch (link.type) {
            case 'bookmark':
              return (
                <div key={link.id} className="min-w-0">
                  <a href={link.href} target="_blank" rel="noreferrer" className="inline-block max-w-full truncate">
                    {link.title || link.href}
                  </a>
                </div>
              )
            case 'toggle':
              return (
                <details key={link.id} className="group">
                  <summary>{link.title}</summary>
                  <div className="hidden group-open:grid">
                    <ClientComponent>
                      {/* @ts-expect-error RSC */}
                      <BlockContent id={link.id} />
                    </ClientComponent>
                  </div>
                </details>
              )
            default:
              return null
          }
        })}
      </div>
      {/* @ts-expect-error RSC */}
      <Socials id={data.socials} />
    </main>
  )
}

async function BlockContent({ id }: { id: string }) {
  const data = await getBlocktData(id)
  return (
    <>
      {data?.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={block.id} className="min-w-0">
                {block.text}
              </p>
            )
          case 'video': {
            let src = block.url
            if (src.includes('youtube')) {
              const url = new URL(src)
              const id = url.searchParams.get('v')
              if (id) src = `http://www.youtube.com/embed/${id}`
            }
            return (
              <div key={block.id} className="relative aspect-video w-full">
                <iframe src={src} className="absolute inset-0 h-full w-full" loading="lazy" />
              </div>
            )
          }
          default:
            return null
        }
      })}
    </>
  )
}

async function Socials({ id }: { id: string | undefined }) {
  const data = await getSocialsData(id)
  return <>{data && <pre className="w-full overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>}</>
}

export const runtime = 'experimental-edge'
export const revalidate = 60
