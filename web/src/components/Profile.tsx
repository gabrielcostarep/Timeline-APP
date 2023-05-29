import { getUser } from '@/lib/auth'
import Image from 'next/image'
import { XIcon } from 'lucide-react'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        alt={`Imagem do usuário ${name}`}
        width={48}
        height={48}
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a href="/api/auth/logout" className="sm:cursor-pointer">
          <XIcon className="ml-1 inline-block h-5 w-5 text-red-600 transition-colors hover:text-red-400" />
        </a>
      </p>
    </div>
  )
}
