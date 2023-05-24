import { api } from '@lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token, refreshToken } = registerResponse.data

  const redirectURL = redirectTo ?? new URL('/', request.url) // TODO: Change this to the URL you want to redirect to after login

  const tokenExpiresInSeconds = 60 * 60 * 24 * 3 // 3 days
  const refreshTokenExpiresInSeconds = 60 * 60 * 24 * 7 // 7 dias

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': [
        `token=${token}; Max-Age=${tokenExpiresInSeconds}; Path=/; SameSite=Strict`,
        `refreshToken=${refreshToken}; Max-Age=${refreshTokenExpiresInSeconds}; Path=/; SameSite=Strict`,
      ].join(', '),
    },
  })
}
