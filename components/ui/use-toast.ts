import { useState, useCallback } from 'react'

type ToastType = {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const toast = useCallback(({ title, description, variant = 'default' }: ToastType) => {
    setToasts((prevToasts) => [...prevToasts, { title, description, variant }])
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1))
    }, 3000)
  }, [])

  return { toast, toasts }
}