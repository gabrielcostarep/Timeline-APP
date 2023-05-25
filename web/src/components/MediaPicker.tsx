'use client'

import { ChangeEvent, useState, useRef, RefObject } from 'react'
import { X } from 'lucide-react'

export function MediaPicker({ id }: { id: string }) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    setPreview(URL.createObjectURL(files[0]))
  }

  function handleDeleteFile() {
    setPreview(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        ref={fileInputRef as RefObject<HTMLInputElement>}
        onChange={onMediaSelected}
        accept="image/*"
        multiple={false}
        type="file"
        name="coverUrl"
        className="hidden"
        id={id}
      />

      {preview && (
        /* eslint-disable */
        <div className="relative">
          <img
            src={preview}
            alt="Imagem escolhida pelo usuário"
            className="aspect-video w-full rounded-lg object-cover"
          />
          <X
            onClick={handleDeleteFile}
            className="absolute right-2 top-2 cursor-pointer text-red-600 hover:text-red-500"
          />
        </div>
        /* eslint-enable */
      )}
    </>
  )
}
