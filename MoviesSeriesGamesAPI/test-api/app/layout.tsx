import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './ui/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/e61d350a25.js" crossOrigin="anonymous" defer></script>
      </head>
      <body className={`${inter.className} py-40 px-[18%] flex flex-col gap-5`}>
        <Header />
        <main className='w-full min-h-[65vh]'>
          {children}
        </main>
      </body>
    </html>
  )
}
