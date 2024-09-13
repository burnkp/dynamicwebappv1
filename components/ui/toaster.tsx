import { useToast } from './use-toast'
import { Toast, ToastProvider, ToastViewport } from './toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map((toast, index) => (
        <Toast key={index} {...toast} />
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}