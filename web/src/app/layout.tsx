import './globals.css'
import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import { cookies } from 'next/headers'

import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Copyright } from '@/components/Copyright'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'Timeline',
  description:
    'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e Typescript.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2 lg:grid-cols-1">
          {/* Left column */}
          <section className="border-white-10 relative flex flex-col items-start justify-between overflow-hidden border-r  bg-[url('../assets/bg-stars.svg')] bg-cover px-28 py-16 lg:h-20 lg:flex-row lg:items-center lg:justify-evenly lg:overflow-hidden lg:border-none lg:p-0">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 -z-10 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full lg:w-full" />

            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </section>

          {/* Right column */}
          <section className="flex flex-col bg-[url('../assets/bg-stars.svg')] bg-cover">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
