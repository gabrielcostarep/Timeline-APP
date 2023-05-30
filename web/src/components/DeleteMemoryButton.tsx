'use client'

import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Trash } from 'lucide-react'

export function DeleteMemoryButton({
  id,
  token,
}: {
  id: string
  token: string | undefined
}) {
  const router = useRouter()

  async function deleteMemory() {
    await api
      .delete(`/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.refresh()
      })
  }

  return (
    <div
      onClick={deleteMemory}
      className="flex cursor-pointer items-center gap-1 text-sm text-gray-200 transition-colors hover:text-red-700"
    >
      <Trash className="h-4 w-4" />
      Deletar memória
    </div>
  )
}
