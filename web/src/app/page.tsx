import Image from 'next/image'
import { User } from 'lucide-react'

import nlwLogo from '../assets/nlw-spacetime-logo.svg'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left column */}
      <section className="border-white-10 relative flex flex-col items-start justify-between overflow-hidden border-r  bg-[url('../assets/bg-stars.svg')] bg-cover px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {/* Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {/* Sign In */}
        <a
          href=""
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500" />
          </div>

          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline">
              Crie sua conta e salve suas memórias!
            </span>
          </p>
        </a>

        {/* Hero */}
        <div>
          <Image src={nlwLogo} alt="NLW SpaceTime Logo" />
        </div>
      </section>

      {/* Right column */}
      <section className="flex flex-col bg-[url('../assets/bg-stars.svg')] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a href="" className="underline hover:text-gray-50">
              criar agora
            </a>
            !
          </p>
        </div>
      </section>
    </main>
  )
}
