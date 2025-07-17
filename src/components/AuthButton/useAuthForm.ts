import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthFormData } from './types'

export const useAuthForm = (initialMode: 'login' | 'register', onClose?: () => void) => {
  const [currentMode, setCurrentMode] = useState<'login' | 'register'>(initialMode)
  const [formData, setFormData] = useState<AuthFormData>({
    name: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' })
    setMessage(null)
    setIsSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    setIsSuccess(false)

    try {
      if (currentMode === 'register') {
        await handleRegister()
      } else {
        await handleLogin()
      }
    } catch (error) {
      setMessage('Nastala chyba. Zkuste to znovu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.status === 201) {
      setIsSuccess(true)
      setMessage('Účet byl úspěšně vytvořen! Nyní se můžete přihlásit.')
      setCurrentMode('login')
      resetForm()
    } else if (response.status === 409) {
      setMessage('Uživatel s tímto emailem již existuje.')
    } else {
      const errorData = await response.json()
      setMessage(errorData.message || 'Nastala neočekávaná chyba, zkuste to prosím znovu.')
    }
  }

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      callbackUrl: '/dashboard',
      redirect: false
    })

    if (res?.error) {
      setMessage('Nesprávný email nebo heslo.')
    } else {
      setMessage(null)
      onClose?.()
      router.push('/dashboard')
    }
  }

  const switchMode = () => {
    setCurrentMode(currentMode === 'login' ? 'register' : 'login')
    resetForm()
  }

  const handleGoogleSignIn = () => {
    signIn('google')
  }

  return {
    currentMode,
    formData,
    isLoading,
    message,
    isSuccess,
    handleInputChange,
    handleSubmit,
    switchMode,
    handleGoogleSignIn,
  }
}
