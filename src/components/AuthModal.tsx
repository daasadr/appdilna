'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthModal({ mode = 'login', onClose }: { mode?: 'login' | 'register', onClose?: () => void }) {
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
          setMessage(errorData.message || 'Nastala neočekávaná chyba, zkuste to prosím znovu.')
        }
      } else {
        // Přihlášení
        const res = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/',
          redirect: false
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
        <span className="text-copper">Jste přihlášen(a) jako {session.user?.name || session.user?.email}</span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded-full shadow-lg border border-copper/40 hover:scale-105 transition-transform duration-200"
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
      <h2 className="text-2xl font-display text-copper mb-6 text-center">
        {currentMode === 'register' ? 'Registrace' : 'Přihlášení'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {currentMode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-copper mb-2">Jméno</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-copper/40 focus:outline-none focus:border-copper"
              required
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-copper mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-copper/40 focus:outline-none focus:border-copper"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-copper mb-2">Heslo</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-copper/40 focus:outline-none focus:border-copper"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-full shadow-lg border border-copper/40 hover:scale-105 transition-transform duration-200"
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
            ? (currentMode === 'register' ? 'Registruji...' : 'Přihlašuji...') 
            : (currentMode === 'register' ? 'Registrovat' : 'Přihlásit se')
          }
        </button>
      </form>
      
      {message && (
        <div className={`mt-4 text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={switchMode}
          className="text-copper hover:text-copper/80 underline"
        >
          {currentMode === 'login' 
            ? 'Nemáte účet? Registrujte se' 
            : 'Máte účet? Přihlaste se'
          }
        </button>
      </div>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-copper/40"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white/90 text-copper">nebo pokračujte s</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2 px-4 rounded-lg border border-copper/40 hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <img src="/images/google.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
        </div>
      </div>
    </div>
  )
} 