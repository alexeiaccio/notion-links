import './globals.css'
import { Unbounded, Inter } from '@next/font/google'
import { cx } from 'class-variance-authority'

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-unbounded',
})

const inter = Inter({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['400', '700'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cx(unbounded.variable, inter.variable)}>
      <head />
      <body className="relative overscroll-none font-inter font-normal">
        <div className="max-w-screen fixed inset-0 flex max-h-screen items-center justify-center overflow-hidden">
          <div className="h-[150vmax] w-[150vmax] flex-shrink-0 animate-rotation opacity-25 [background-image:linear-gradient(32deg,_#85eaf2_0%,_#e485cf_47%,_#fdf67a_100%)]" />
        </div>
        {children}
      </body>
    </html>
  )
}

// const unbounded = localFont({
//   src: '../assets/fonts/Unbounded-VariableFont.ttf',
//   variable: '--font-unbounded',
// })

// const inter = localFont({
//   src: '../assets/fonts/Inter-VariableFont.ttf',
//   variable: '--font-inter',
// })
