'use client'

import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

import { api } from '@lib/api'
import { upload } from '@utils/upload'
import { renderToast } from '@utils/toast'
import { Button } from '@components/Button'
import { MediaPicker } from '@components/MediaPicker'

type MemoryFormProps = {
  type: 'create' | 'edit'
  data?: {
    id: string
    userId: string
    coverUrl: string
    content: string
    isPublic: boolean
    createdAt: string
  } | null
}

export function MemoryForm({ type, data }: MemoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  async function handleMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const token = Cookie.get('token')

    const formData = new FormData(event.currentTarget)
    const isPublic = formData.get('isPublic')
    const content = formData.get('content')

    if (file && file.size > 50000000) {
      setIsSubmitting(false)
      return renderToast({
        message: 'O arquivo deve ter no máximo 50MB!',
        type: 'error',
      })
    }

    if (type === 'create') {
      if (file && content) {
        try {
          const { coverUrl } = await upload(file)

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

          router.push('/')
        } catch (error) {
          renderToast({
            message: 'Ocorreu um erro ao criar a memória!',
            type: 'error',
          })
        } finally {
          setIsSubmitting(false)
        }
      } else {
        setIsSubmitting(false)
        return renderToast({
          message: 'É necessário adicionar uma mídia e um conteúdo!',
          type: 'error',
        })
      }
    }

    if (type === 'edit') {
      try {
        const { coverUrl } = file ? await upload(file) : { coverUrl: undefined }

        await api.put(
          `/memories/${data?.id}`,
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

        router.push('/')
      } catch (error) {
        renderToast({
          message: 'Ocorreu um erro ao editar a memória!',
          type: 'error',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form onSubmit={handleMemory} className="flex flex-1 flex-col space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          {type === 'create' ? 'Adicionar mídia' : 'Editar mídia'}
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="false"
            defaultChecked={data?.isPublic}
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          {type === 'create' ? 'Tornar memória pública' : 'Memória pública'}
        </label>
      </div>

      <MediaPicker fileSelected={setFile} mediaUrl={data?.coverUrl} />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        defaultValue={data?.content}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Button type="submit" isLoading={isSubmitting}>
        {type === 'create' ? 'Salvar' : 'Salvar alterações'}
      </Button>
    </form>
  )
}
