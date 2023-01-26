import { Suspense } from 'react'
import { env } from '~/env/server.mjs'
import { getBlockRecordMap, getBlocktData, getData, getSocialsData } from '~/utils/data'
import { ClientComponent } from './client'
import { type IconName, Icons } from './icons'
import { Image } from './image'

export default async function Page() {
  const data = await getData()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between gap-4">
      <div className="grid aspect-[10/4] w-full place-items-center overflow-hidden">
        <Image src={data?.cover?.url} width={1920} id={data.id} alt="" />
      </div>
      <div className="relative -mt-16 h-24 w-24 overflow-hidden rounded-full object-cover">
        <Image src={data?.avatar?.url} width={96} height={96} id={data.id} alt={data?.name ?? ''} />
      </div>
      <h1 className="text-2xl font-bold">{data?.name}</h1>
      {data?.info && <p className="max-w-[72ch] px-4 text-center">{data.info}</p>}
      <div className="mt-8 grid w-full max-w-[72ch] gap-4 px-4">
        {data?.links?.map((link) => {
          switch (link.type) {
            case 'bookmark': {
              // @ts-expect-error RSC
              return <Bookmark key={link.id} link={link} />
            }
            case 'toggle':
              return (
                <details key={link.id} className="group min-w-0">
                  <summary className="flex cursor-pointer items-center gap-4 overflow-hidden bg-white p-1 shadow-lg hover:scale-105 hover:transition-transform">
                    <h3 className="max-w-full flex-1 truncate pl-3">{link.title}</h3>
                    <div className="grid h-12 w-12 flex-shrink-0 place-items-center overflow-hidden rounded-md transition-colors hover:bg-gray-100">
                      <div className="h-4 w-4 transition-transform group-open:rotate-180">
                        <Icons name="chevron" />
                      </div>
                    </div>
                  </summary>
                  <div className="hidden py-4 group-open:grid">
                    <ClientComponent>
                      <Suspense fallback={'loading...'}>
                        {/* @ts-expect-error RSC */}
                        <BlockContent id={link.id} />
                      </Suspense>
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
      <div className="w-full p-4 text-center text-xs">
        made with 🤍 by{' '}
        <a
          className="bg-gradient-to-tr from-violet-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent"
          href="https://beta.accio.pro"
          target="_blank"
          rel="noreferrer"
        >
          accio
        </a>
      </div>
    </main>
  )
}

async function Bookmark({
  link,
}: {
  link: {
    id: string
    type: 'bookmark'
    href: string
    title: string
  }
}) {
  const data = await getBlockRecordMap(link.id)

  return (
    <a
      key={link.id}
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="flex min-w-0 items-center gap-4 overflow-hidden bg-white p-1 shadow-lg hover:scale-105 hover:transition-transform"
      title={data?.description || link.title || data?.title || link.href}
    >
      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        {data?.cover && (
          <Image
            src={data.cover}
            className="h-full w-full object-cover"
            width={48}
            height={48}
            alt={link.title ?? ''}
          />
        )}
      </div>
      <h3 className="max-w-full flex-1 truncate">{link.title || data?.title || link.href}</h3>
    </a>
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
              if (id) src = `http${env.NODE_ENV === 'production' ? 's' : ''}://www.youtube.com/embed/${id}`
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
  return (
    <div className="mt-auto flex max-w-[72ch] gap-4 p-4">
      {data?.map((item) => {
        return (
          <a
            key={item.id}
            className="relative grid h-12 w-12 flex-shrink-0 place-items-center overflow-hidden transition-colors before:absolute before:inset-0 before:rounded-full before:opacity-0 before:transition-opacity before:[background-image:linear-gradient(32deg,_#85eaf2_0%,_#e485cf_47%,_#fdf67a_100%)] hover:text-white hover:before:opacity-100"
            href={item.url ?? ''}
            title={item.title}
            target="_blank"
            rel="noreferrer"
          >
            <div className="relative inline-block h-6 w-6">
              <Icons name={item.media as IconName} />
            </div>
          </a>
        )
      })}
    </div>
  )
}

export const runtime = 'experimental-edge'
export const revalidate = 60
