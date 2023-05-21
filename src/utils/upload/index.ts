/* eslint-disable react-hooks/rules-of-hooks */
import { api } from '@lib/api'

export async function upload(file: File) {
  const uploadFormData = new FormData()
  uploadFormData.set('file', file)

  const uploadResponse = await api.post('/upload', uploadFormData)

  const coverUrl = uploadResponse.data.fileUrl

  return {
    coverUrl,
  }
}
