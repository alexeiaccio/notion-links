import { env } from '~/env/server.mjs'

export default function Head() {
  return (
    <>
      <title>Notion Links</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <meta
        property="og:image"
        content={`${env.NEXT_URL}/api/og?theme=light`}
      />
    </>
  )
}
