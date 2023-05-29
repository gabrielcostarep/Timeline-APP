import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { NewMemoryForm } from '@/components/NewMemoryForm'

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16 lg:min-h-[calc(100vh-5rem)] lg:gap-2 lg:p-4 ">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <NewMemoryForm />
    </div>
  )
}
