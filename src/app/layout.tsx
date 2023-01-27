import './globals.css'
import { Caveat } from '@next/font/google'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={caveat.className}>
      <head />
      <body className="relative overscroll-none text-xl">
        <div className="max-w-screen fixed inset-0 flex max-h-screen items-center justify-center overflow-hidden">
          <div className="h-[150vmax] w-[150vmax] flex-shrink-0 animate-rotation opacity-25 [background-image:linear-gradient(32deg,_#85eaf2_0%,_#e485cf_47%,_#fdf67a_100%)]" />
        </div>
        {children}
      </body>
    </html>
  )
}
