import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'

interface MemoryProps {
  coverUrl: string
  excerpt: string
  createdAt: string
  id: string
}

dayjs.locale(ptBR)

export default async function Home() {
  const isAuthenticated = cookies().has('token')
  const token = cookies().get('token')?.value

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: MemoryProps[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex max-h-screen flex-col gap-10 overflow-y-scroll p-8 lg:max-h-full lg:overflow-y-hidden">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <Image
            src={memory.coverUrl}
            alt="Imagem escolhida pelo usuário"
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          {/* TODO: Fazer a página Ler Mais */}

          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
