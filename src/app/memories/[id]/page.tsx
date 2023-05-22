/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'

import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { ChevronLeft, FileKey, X } from 'lucide-react'

import { api } from '@lib/api'
import { renderToast } from '@utils/toast'
import { Button } from '@components/Button'
import { MemoryForm } from '@components/MemoryForm'

type MemoryProps = {
  params: {
    id: string
  }
}

type MemoryResponseProps = {
  memory: {
    id: string
    userId: string
    coverUrl: string
    content: string
    isPublic: boolean
    createdAt: string
  }
}

export default function Memory({ params }: MemoryProps) {
  const { id } = params
  const token = Cookie.get('token')
  const router = useRouter()

  const [memory, setMemory] = useState<MemoryResponseProps['memory'] | null>(
    null,
  )
  const [isFetching, setIsFetching] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleGetMemory() {
    setIsFetching(true)
    try {
      const response = await api.get(`/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMemory(response.data.memory)
    } catch (error) {
      renderToast({
        type: 'error',
        message: 'Ocorreu um erro ao buscar a memória.',
      })
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    handleGetMemory()
  }, [])

  if (isFetching) {
    return (
      <div className="flex-1">
        <BeatLoader
          size={10}
          color="#8257e5"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        />
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="flex flex-1 flex-col justify-between space-y-4 p-8">
        <button
          onClick={() => setIsEditing(false)}
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <X className="h-4 w-4" />
          parar de editar
        </button>
        <MemoryForm type="edit" data={memory} />
      </div>
    )
  }

  async function handleDeleteMemory() {
    setIsDeleting(true)
    try {
      await api.delete(`/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      router.push('/')
    } catch (error) {
      renderToast({
        type: 'error',
        message: 'Não foi possível excluir a memória',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex max-w-[1200px] flex-1 flex-col space-y-4 p-8">
      <div className="space-y-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4 " />
          voltar à home
        </Link>
        <div>
          <span className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
            <FileKey className="h-4 w-4" />
            {memory?.isPublic ? 'Memória pública' : 'Memória privada'}
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
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
      <div className="flex gap-4 self-end">
        <Button onClick={() => setIsEditing(true)}>Editar</Button>
        <Button
          isLoading={isDeleting}
          variant="secondary"
          onClick={handleDeleteMemory}
        >
          Excluir
        </Button>
      </div>
    </div>
  )
}
