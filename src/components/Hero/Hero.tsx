import Link from 'next/link'
import Image from 'next/image'

import nlwLogoWeb from '@assets/nlw-spacetime-logo-web.svg'
import nlwLogoMobile from '@assets/nlw-spacetime-logo-mobile.svg'

export function Hero() {
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
      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  )
}
