import { EmptyMemories } from '@/components/EmptyMemories'
import { DeleteMemoryButton } from '@/components/DeleteMemoryButton'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Image from 'next/image'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

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
    <div className="flex max-h-screen flex-col gap-16 overflow-y-scroll p-8 lg:max-h-full lg:overflow-y-hidden">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>

            <DeleteMemoryButton id={memory.id} token={token} />
          </div>

          <Image
            src={memory.coverUrl}
            alt="Imagem escolhida pelo usuário"
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="text-justify text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
        </div>
      ))}
    </div>
  )
}
