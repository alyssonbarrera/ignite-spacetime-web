'use client'
import { api } from '@lib/api'

import Link from 'next/link'
import Cookies from 'js-cookie'
import { ChevronLeft } from 'lucide-react'
import { AppError } from '@utils/errors/AppError'
import { ExpandedMemory } from '@components/ExpandedMemory'
import { useEffect, useState } from 'react'
import { renderToast } from '@utils/toast'
import { BeatLoader } from 'react-spinners'

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
  const token = Cookies.get('token')
  const [isFetching, setIsFetching] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [memory, setMemory] = useState<MemoryResponseProps['memory'] | null>(
    null,
  )

  async function handleGetMemory() {
    try {
      setIsFetching(true)

      const response = token
        ? await api.get(`/memories/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await api.get(`/memories/${id}`)

      setMemory(response.data.memory)
    } catch (error: any) {
      const isAppError = error instanceof AppError
      const errorMessage =
        isAppError && error.message.includes('allowed')
          ? 'Você não tem permissão para acessar essa memória'
          : isAppError
          ? error.message
          : 'Ocorreu um erro ao buscar essa memória'

      isAppError && error.message.includes('allowed')
        ? setIsPublic(false)
        : setIsPublic(true)

      renderToast({
        type: 'error',
        message: errorMessage,
      })
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    handleGetMemory()
  }, [])

  if (isFetching && !memory) {
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

  if (!isPublic && !isFetching && !memory) {
    return (
      <div className="flex flex-1 items-center justify-center p-16">
        <p className="w-[360px] text-center leading-relaxed">
          Esta memória é privada
        </p>
      </div>
    )
  }

  if (memory) {
    return (
      <div className="flex max-w-[1200px] flex-1 flex-col space-y-4 p-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4 " />
          voltar à home
        </Link>
        <ExpandedMemory memory={memory} />
      </div>
    )
  }
}
