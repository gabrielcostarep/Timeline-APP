import Image from 'next/image'
import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export function Hero() {
  return (
    <div className="space-y-5 lg:space-y-0">
      <Image src={nlwLogo} alt="NLW SpaceTime Logo" className="lg:hidden" />

      <div className="max-w-[420px] space-y-4 lg:hidden">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt uppercase leading-none text-black transition-colors hover:bg-green-600
        lg:justify-end lg:p-2 lg:text-sm"
      >
        <p className="sm:hidden">Cadastrar Lembranças</p>
        <Plus className="hidden sm:inline-block" />
      </Link>
    </div>
  )
}
