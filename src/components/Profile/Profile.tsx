import Image from 'next/image'
import decode from 'jwt-decode'

type User = {
  sub: string
  name: string
  avatarUrl: string
}

export function Profile({ token }: { token: string }) {
  const user = decode<User>(token)

  return (
    <div className="mx-auto flex items-center gap-3 md:mx-0">
      <Image
        src={user?.avatarUrl}
        width={40}
        height={40}
        alt="user image"
        className="h-10 w-10 rounded-full"
      />
      <div>
        <p className="max-w-[140px] text-sm leading-snug">
          {user?.name}
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
