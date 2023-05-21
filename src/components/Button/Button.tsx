import React from 'react'
import classNames from 'classnames'
import { BeatLoader } from 'react-spinners'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
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
        'flex min-w-[100px] justify-center self-end rounded-full px-5 py-3 font-alt text-sm uppercase leading-none text-black',
        isLoading && 'pointer-events-none opacity-80',
        variant === 'primary'
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-red-500 text-gray-50 hover:bg-red-600',
      )}
      {...rest}
    >
      {isLoading ? <BeatLoader size={10} color="#8257e5" /> : children}
    </button>
  )
}
