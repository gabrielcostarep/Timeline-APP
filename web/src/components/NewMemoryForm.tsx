'use client'

import { FormEvent } from 'react'
import { Camera } from 'lucide-react'
import Cookie from 'js-cookie'
import { api } from '@/lib/api'

import { MediaPicker } from '@/components/MediaPicker'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form
      onSubmit={handleCreateMemory}
      className="flex max-h-screen flex-1 flex-col gap-2"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 hover:border-gray-100"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker id="media" />

      <textarea
        name="content"
        spellCheck={false}
        className="border-1 w-full flex-1 resize-none rounded-lg border-gray-700 bg-black/20 p-3 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar."
      />

      <button
        type="submit"
        className="text-small inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt uppercase leading-none text-black transition-colors hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
