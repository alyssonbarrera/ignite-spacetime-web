import { api } from '@lib/api'
import Cookies from 'js-cookie'

type CreateMemoryProps = {
  content: string
  coverUrl: string
  isPublic: string
}

export async function createMemory({
  content,
  coverUrl,
  isPublic,
}: CreateMemoryProps) {
  const token = Cookies.get('token')

  await api.post(
    '/memories',
    {
      coverUrl,
      content,
      isPublic,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
