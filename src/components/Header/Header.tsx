import { SignIn } from '@components/SignIn'
import { Profile } from '@components/Profile'

type HeaderProps = {
  isAuthenticated: boolean
}

export function Header({ isAuthenticated }: HeaderProps) {
  return isAuthenticated ? <Profile /> : <SignIn />
}
