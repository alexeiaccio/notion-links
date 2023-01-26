import NextImage, { type ImageProps } from 'next/image'
import { env } from '~/env/server.mjs'

// TODO: enternal images from block
export function Image({
  src,
  id,
  alt = '',
  width = 1280,
  height = 600,
  ...props
}: Omit<ImageProps, 'src'> & {
  src?: string
  id?: string
}) {
  if (!src) return null
  if (src.includes('.notion') && id) {
    return (
      <NextImage
        src={
          src.includes('www.notion.so')
            ? `${env.NEXT_URL}/api/image/${encodeURIComponent(src)}?id=${id}&width=${width}`
            : src
        }
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={width} height={height} loading="lazy" className={props.className} />
}
