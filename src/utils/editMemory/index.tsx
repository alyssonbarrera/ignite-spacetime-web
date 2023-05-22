import { api } from '@lib/api'
import Cookies from 'js-cookie'

type EditMemoryProps = {
  id: string
  content: string
  coverUrl: string | undefined
  isPublic: string
}

export async function editMemory({
  id,
  content,
  coverUrl,
  isPublic,
}: EditMemoryProps) {
  const token = Cookies.get('token')

  await api.put(
    `/memories/${id}`,
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
