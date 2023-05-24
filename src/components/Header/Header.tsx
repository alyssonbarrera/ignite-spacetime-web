import { SignIn } from '@components/SignIn'
import { Profile } from '@components/Profile'

type HeaderProps = {
  token: string | undefined
}

export function Header({ token }: HeaderProps) {
  return token ? <Profile token={token} /> : <SignIn />
}
