/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs'
import Link from 'next/link'
import { api } from '@lib/api'
import { cookies } from 'next/headers'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'

import { EmptyMemories } from '@components/EmptyMemories'

dayjs.locale(ptBr)

type Memory = {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

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

  const memories: Memory[] = response.data.memories

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {
              dayjs(memory.createdAt).format('D [de] MMMM, YYYY') // DD de MMMM, AAAA
            }
          </time>
          {memory.coverUrl.split('.').pop() === 'mp4' ? (
            <video
              className="aspect-video w-full rounded-lg object-cover"
              controls
            >
              <source src={memory.coverUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={memory.coverUrl}
              alt="Media"
              className="aspect-video w-full rounded-lg object-cover"
            />
          )}
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

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
