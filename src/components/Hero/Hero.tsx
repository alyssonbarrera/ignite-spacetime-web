'use client'
import Image from 'next/image'

import Cookies from 'js-cookie'
import { renderToast } from '@utils/toast'
import { Button } from '@components/Button'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import nlwLogoWeb from '@assets/nlw-spacetime-logo-web.svg'
import nlwLogoMobile from '@assets/nlw-spacetime-logo-mobile.svg'

export function Hero() {
  const router = useRouter()
  const isAuthenticated = Cookies.get('token')

  function handleCreateMemory() {
    if (!isAuthenticated) {
      return renderToast({
        message: 'Você precisa estar logado para cadastrar uma lembrança!',
        type: 'error',
      })
    }

    return router.push('/memories/new')
  }

  return (
    <div className="mx-auto flex flex-col items-center space-y-5 md:mx-0 md:items-start">
      <div className="hidden md:block">
        <Image src={nlwLogoWeb} alt="NLW Spacetime" />
      </div>
      <div className="md:hidden">
        <Image src={nlwLogoMobile} alt="NLW Spacetime" />
      </div>

      <div className="max-w-[420px] space-y-1">
        <h1 className="mt-5 text-center text-5xl font-bold leading-tight text-gray-50 md:text-start">
          Sua cápsula do tempo
        </h1>
        <p className="text-center text-lg leading-relaxed md:text-start">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Button variant="tertiary" onClick={handleCreateMemory}>
        CADASTRAR LEMBRANÇA
      </Button>

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
    </div>
  )
}
