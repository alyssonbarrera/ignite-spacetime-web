import React from 'react'
import classNames from 'classnames'
import { BeatLoader } from 'react-spinners'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  isLoading?: boolean
}

const variants = {
  primary: 'bg-green-500 hover:bg-green-600 font-alt',
  secondary: 'bg-red-500 text-gray-50 hover:bg-red-600 font-alt',
  tertiary: 'bg-green-500 hover:bg-green-600',
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'flex min-w-[100px] justify-center rounded-full px-5 py-3 text-sm font-bold uppercase leading-none text-black',
        isLoading && 'pointer-events-none opacity-80',
        variants[variant],
      )}
      {...rest}
    >
      {isLoading ? <BeatLoader size={10} color="#8257e5" /> : children}
    </button>
  )
}
