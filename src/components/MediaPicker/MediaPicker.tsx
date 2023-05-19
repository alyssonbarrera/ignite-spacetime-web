'use client'

import { ChangeEvent, useState } from 'react'

type MediaProps = {
  preview: string
  type: string
}

export function MediaPicker() {
  const [media, setMedia] = useState<MediaProps | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    const preview = URL.createObjectURL(files[0])

    setMedia({
      preview,
      type: files[0].type,
    })
  }

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

      {media &&
        (media.type.includes('image') ? (
          // eslint-disable-next-line @next/next/no-img-element
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
