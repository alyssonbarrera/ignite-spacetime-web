import { Profile } from '@components/Profile'
import { SignIn } from '@components/SignIn'

type HeaderProps = {
  isAuthenticated: boolean
}

export function Header({ isAuthenticated }: HeaderProps) {
  return isAuthenticated ? <Profile /> : <SignIn />
}
