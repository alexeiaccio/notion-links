import NextImage, { type ImageProps } from 'next/image'
import { env } from '~/env/server.mjs'

export function Image({
  src,
  id,
  alt = '',
  width = 1280,
  height = 600,
  ...props
}: ImageProps & {
  src?: string
  id?: string
}) {
  if (!src || !id) return null
  return (
    <NextImage
      src={`${env.NEXT_URL}/api/image/${encodeURIComponent(src)}?id=${id}&width=${width}`}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}
