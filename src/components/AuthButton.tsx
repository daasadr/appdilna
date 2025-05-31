'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthModal({ mode = 'login', onClose }: { mode?: 'login' | 'register', onClose?: () => void }) {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    try {
      const res = await signIn('email', { 
        email, 
        callbackUrl: '/dashboard',
        redirect: false
      })
      
      if (res?.error) {
        setMessage('Nastala chyba při odesílání odkazu. Zkuste to znovu.')
      } else {
        setMessage('Odeslali jsme vám přihlašovací odkaz na email.')
      }
    } catch (error) {
      setMessage('Nastala chyba při odesílání odkazu. Zkuste to znovu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google')
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
        {mode === 'register' ? 'Registrace' : 'Přihlášení'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-copper mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {isLoading ? 'Odesílám...' : (mode === 'register' ? 'Zaslat registrační odkaz' : 'Zaslat přihlašovací odkaz')}
        </button>
      </form>
      {message && <div className="mt-4 text-center text-copper">{message}</div>}
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