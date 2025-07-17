'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthModal({
  mode = 'login',
  onClose,
}: {
  mode?: 'login' | 'register'
  onClose?: () => void
}) {
  const { data: session, status } = useSession()
  const [currentMode, setCurrentMode] = useState<'login' | 'register'>(mode)
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    setIsSuccess(false)

    try {
      if (currentMode === 'register') {
        // Registrace
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (response.status === 201) {
          setIsSuccess(true)
          setMessage('Účet byl úspěšně vytvořen! Nyní se můžete přihlásit.')
          setCurrentMode('login')
          setFormData({ name: '', email: '', password: '' })
        } else if (response.status === 409) {
          setMessage('Uživatel s tímto emailem již existuje.')
        } else {
          const errorData = await response.json()
          setMessage(
            errorData.message ||
              'Nastala neočekávaná chyba, zkuste to prosím znovu.'
          )
        }
      } else {
        // Přihlášení
        const res = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/',
          redirect: false,
        })

        if (res?.error) {
          setMessage('Nesprávný email nebo heslo.')
        } else {
          setMessage(null)
          onClose?.()
          router.push('/')
        }
      }
    } catch (error) {
      setMessage('Nastala chyba. Zkuste to znovu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google')
  }

  const switchMode = () => {
    setCurrentMode(currentMode === 'login' ? 'register' : 'login')
    setMessage(null)
    setIsSuccess(false)
    setFormData({ name: '', email: '', password: '' })
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center">
        <div className="text-copper">Načítání...</div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="text-copper">
          Jste přihlášen(a) jako {session.user?.name || session.user?.email}
        </span>
        <button
          onClick={() => signOut()}
          className="rounded-full border border-copper/40 px-4 py-2 shadow-lg transition-transform duration-200 hover:scale-105"
          style={{
            backgroundImage: "url('/images/wood.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff8e1',
            textShadow: '0 1px 8px #181818, 0 1px 0 #b87333',
            boxShadow: '0 2px 12px #0006, 0 1px 0 #fff4 inset',
            borderWidth: '2px',
            borderColor: '#6b4f27',
          }}
        >
          Odhlásit se
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-6 text-center font-display text-2xl text-copper">
        {currentMode === 'register' ? 'Registrace' : 'Přihlášení'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {currentMode === 'register' && (
          <div>
            <label htmlFor="name" className="mb-2 block text-copper">
              Jméno
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-copper/40 px-4 py-2 focus:border-copper focus:outline-none"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-2 block text-copper">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-copper/40 px-4 py-2 focus:border-copper focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-copper">
            Heslo
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-copper/40 px-4 py-2 focus:border-copper focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full border border-copper/40 py-2 shadow-lg transition-transform duration-200 hover:scale-105"
          style={{
            backgroundImage: "url('/images/wood.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff8e1',
            textShadow: '0 1px 8px #181818, 0 1px 0 #b87333',
            boxShadow: '0 2px 12px #0006, 0 1px 0 #fff4 inset',
            borderWidth: '2px',
            borderColor: '#6b4f27',
          }}
        >
          {isLoading
            ? currentMode === 'register'
              ? 'Registruji...'
              : 'Přihlašuji...'
            : currentMode === 'register'
              ? 'Registrovat'
              : 'Přihlásit se'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}
        >
          {message}
        </div>
      )}

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={switchMode}
          className="text-copper underline hover:text-copper/80"
        >
          {currentMode === 'login'
            ? 'Nemáte účet? Registrujte se'
            : 'Máte účet? Přihlaste se'}
        </button>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-copper/40"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white/90 px-2 text-copper">
              nebo pokračujte s
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-copper/40 px-4 py-2 hover:bg-gray-50"
          >
            <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
            Google
          </button>
        </div>
      </div>
    </div>
  )
}
