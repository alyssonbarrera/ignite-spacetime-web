/* eslint-disable @next/next/no-img-element */
'use client'
import { ChangeEvent, useEffect, useState } from 'react'

type MediaProps = {
  preview: string
  type: string
}

type MediaPickerProps = {
  fileSelected: (file: File) => void
  mediaUrl?: string
}

export function MediaPicker({ fileSelected, mediaUrl }: MediaPickerProps) {
  const [media, setMedia] = useState<MediaProps | null>(null)
  const [file, setFile] = useState<File | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || files.length === 0) {
      return
    }

    const preview = URL.createObjectURL(files[0])

    setFile(files[0])

    setMedia({
      preview,
      type: files[0].type,
    })
  }

  useEffect(() => {
    if (file) {
      fileSelected(file)
    }
  }, [file, fileSelected])

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*, video/*"
        className="hidden"
      />

      {mediaUrl &&
        !file &&
        (mediaUrl.split('/').pop()?.includes('mp4') ? (
          <video src={mediaUrl} controls className="rounded-lg" />
        ) : (
          <img
            src={mediaUrl}
            alt="file preview"
            className="aspect-video w-full rounded-lg object-cover"
          />
        ))}

      {media &&
        (media.type.includes('image') ? (
          <img
            src={media.preview}
            alt="file preview"
            className="aspect-video w-full rounded-lg object-cover"
          />
        ) : (
          <video src={media.preview} controls className="rounded-lg" />
        ))}
    </>
  )
}
