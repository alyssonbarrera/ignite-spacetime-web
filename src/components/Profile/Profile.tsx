import Image from 'next/image'
import { getUser } from '@lib/auth'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="mx-auto flex items-center gap-3 md:mx-0">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt="user image"
        className="h-10 w-10 rounded-full"
      />
      <div>
        <p className="max-w-[140px] text-sm leading-snug">
          {name}
          <a
            href="/api/auth/logout"
            className="block text-red-400 hover:text-red-300"
          >
            Quero sair
          </a>
        </p>
      </div>
    </div>
  )
}
