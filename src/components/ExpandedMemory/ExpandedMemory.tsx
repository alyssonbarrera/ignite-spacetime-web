import { Check, FileKey, Share2 } from 'lucide-react'
import { useState } from 'react'

/* eslint-disable @next/next/no-img-element */
type MemoryProps = {
  memory: {
    id: string
    userId: string
    coverUrl: string
    content: string
    isPublic: boolean
    createdAt: string
  } | null
}

export function ExpandedMemory({ memory }: MemoryProps) {
  const baseURL = window.location.origin
  const url = `${baseURL}/memories/public/${memory?.id}`
  const [isCopied, setIsCopied] = useState(false)

  function handleCopyUrl() {
    navigator.clipboard.writeText(url)
    setIsCopied(true)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex gap-4">
        <span className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
          <FileKey className="h-4 w-4" />
          {memory?.isPublic ? 'Memória pública' : 'Memória privada'}
        </span>
        <button
          onClick={handleCopyUrl}
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4" />
              Link copiado
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Compartilhar
            </>
          )}
        </button>
      </div>
      <div>
        {memory?.coverUrl.split('.').pop() === 'mp4' ? (
          <video
            className="aspect-video w-full rounded-lg object-cover"
            controls
          >
            <source src={memory?.coverUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={memory?.coverUrl}
            alt="Memory cover"
            className="rounded-lg object-cover"
          />
        )}
      </div>

      <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-100">
        {memory?.content}
      </p>
    </div>
  )
}
