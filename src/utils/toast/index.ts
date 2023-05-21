import { ToastOptions, toast } from 'react-toastify'

type ToastProps = {
  message: string
  type: 'success' | 'error' | 'info' | 'warn'
}

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
} as ToastOptions

export function renderToast({ message, type }: ToastProps) {
  switch (type) {
    case 'success':
      return toast.success(message, toastConfig)
    case 'error':
      return toast.error(message, toastConfig)
    case 'info':
      return toast.info(message, toastConfig)
    case 'warn':
      return toast.warn(message, toastConfig)
    default:
      return toast(message, toastConfig)
  }
}
