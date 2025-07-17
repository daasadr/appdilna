'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import AuthModal from '@/components/AuthModal'
import { useSession, signIn, signOut } from 'next-auth/react'
import { User } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const [showAuth, setShowAuth] = useState<null | 'login' | 'register'>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'RefreshAccessTokenError') {
      setErrorMessage('Vaše přihlášení vypršelo. Přihlaste se prosím znovu.')
    } else if (error === 'TokenExpired') {
      setErrorMessage('Vaše přihlášení vypršelo. Přihlaste se prosím znovu.')
    }
  }, [searchParams])

  const handleEnterWorkshop = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      setShowAuth('login')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Wood textura - na celé pozadí */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/wood-texture.webp')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Overlay gradienty pro plynulé okraje */}
      <div
        className="pointer-events-none absolute inset-0 z-10 select-none"
        style={{
          background:
            'linear-gradient(90deg, #2d1c0a 0%, transparent 10%, transparent 90%, #2d1c0a 100%)',
          opacity: 0.18,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 select-none"
        style={{
          background:
            'linear-gradient(180deg, #2d1c0a 0%, transparent 12%, transparent 88%, #2d1c0a 100%)',
          opacity: 0.08,
        }}
      />
      {/* Tmavý sloupec uprostřed s gradientovými okraji */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-20 h-full select-none"
        style={{
          width: '33vw',
          transform: 'translateX(-50%)',
          background:
            'linear-gradient(90deg, transparent 0%, #181818 18%, #181818 82%, transparent 100%)',
          opacity: 0.92,
        }}
      />

      {/* Blueprint výkresy na různých místech - zvýrazněné */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-30 h-96 w-96 select-none"
        style={{
          maskImage: 'linear-gradient(to left, transparent 10%, black 60%)',
          WebkitMaskImage:
            'linear-gradient(to left, transparent 10%, black 60%)',
          opacity: 0.48,
          filter: 'drop-shadow(0 0 16px #ffb347) brightness(1.2) sepia(0.2)',
          transform: 'rotate(12deg)',
        }}
      >
        <div className="h-full w-full bg-blueprint bg-contain bg-right-top bg-no-repeat" />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-30 h-80 w-80 select-none"
        style={{
          maskImage: 'linear-gradient(to top, transparent 10%, black 60%)',
          WebkitMaskImage:
            'linear-gradient(to top, transparent 10%, black 60%)',
          opacity: 0.38,
          filter: 'drop-shadow(0 0 12px #ffb347) brightness(1.2) sepia(0.2)',
          transform: 'rotate(-18deg)',
        }}
      >
        <div className="h-full w-full bg-blueprint bg-contain bg-left-bottom bg-no-repeat" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-40 w-[500px] select-none"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)',
          opacity: 0.32,
          filter: 'drop-shadow(0 0 18px #ffb347) brightness(1.2) sepia(0.2)',
          transform: 'translate(-50%,-50%) rotate(-7deg)',
        }}
      >
        <div className="h-full w-full bg-blueprint bg-contain bg-center bg-no-repeat" />
      </div>

      {/* PRAVÝ HORNÍ ROH: dvě menší dřevěná tlačítka */}
      <div className="fixed right-8 top-8 z-50 flex gap-3">
        {session ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <span>{session.user?.name || session.user?.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="rounded-full border px-4 py-2 font-display text-base shadow-lg transition-transform duration-200 hover:scale-105"
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
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => setShowAuth('register')}
              className="rounded-full border px-4 py-2 font-display text-base shadow-lg transition-transform duration-200 hover:scale-105"
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
              Registrovat
            </button>
            <button
              onClick={() => setShowAuth('login')}
              className="rounded-full border px-4 py-2 font-display text-base shadow-lg transition-transform duration-200 hover:scale-105"
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
              Přihlásit se
            </button>
          </div>
        )}
      </div>

      <div className="container relative z-40 mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Chybová zpráva */}
          {errorMessage && (
            <div className="mb-8 rounded-lg border border-red-400 bg-red-100 p-4 text-red-700">
              <p className="text-center">{errorMessage}</p>
              <button
                onClick={() => setErrorMessage(null)}
                className="absolute right-2 top-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )}

          <div className="mb-12 text-center">
            <h1
              className="mb-4 font-display text-6xl"
              style={{
                color: '#fff8e1',
                textShadow: '0 2px 16px #ffb347, 0 1px 0 #181818',
                letterSpacing: '0.04em',
              }}
            >
              AppDílna
            </h1>
            <p className="font-display text-xl italic text-copper">
              Digitální laboratoř pro tvorbu PWA aplikací
            </p>
          </div>

          {/* Dekorativní oddělovač */}
          <div className="mb-12 flex items-center justify-center">
            <div className="h-px w-32 bg-copper" />
            <div className="mx-4 text-copper">⚡</div>
            <div className="h-px w-32 bg-copper" />
          </div>

          {/* Hlavní text */}
          <div className="mb-12 rounded-lg border border-copper/20 bg-parchment/80 p-8 shadow-lg">
            <p className="mb-6 text-lg text-ink">
              Vítejte v naší digitální dílně, kde se z vašich nápadů stávají
              skutečné aplikace. S našimi nástroji a šablonami můžete vytvořit
              profesionální PWA aplikaci bez nutnosti psát jediný řádek kódu.
            </p>
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={handleEnterWorkshop}
                className="rounded-lg border px-10 py-6 font-display text-2xl shadow-lg transition-transform duration-200 hover:scale-105"
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
                Vstoupit do dílny
              </button>
            </div>
          </div>

          {/* Dekorativní prvky */}
          <div className="grid grid-cols-3 gap-8 text-center">
            <a
              href="/pwa"
              className="block cursor-pointer rounded-lg border border-copper/20 p-4 transition-colors hover:bg-copper/10"
            >
              <div className="mb-2 text-3xl">📖</div>
              <h3 className="mb-2 font-display text-copper underline">
                Co je to Powerful Web App a jaké jsou její výhody?
              </h3>
            </a>
            <div className="rounded-lg border border-copper/20 p-4">
              <div className="mb-2 text-3xl">📐</div>
              <h3 className="mb-2 font-display text-copper">Šablony</h3>
              <p className="text-ink/80">Připravené šablony pro rychlý start</p>
            </div>
            <a
              href="/nasazeni"
              className="block cursor-pointer rounded-lg border border-copper/20 p-4 transition-colors hover:bg-copper/10"
            >
              <div className="mb-2 text-3xl">🚀</div>
              <h3 className="mb-2 font-display text-copper underline">
                Jak na nasazení aplikace
              </h3>
            </a>
          </div>
        </div>
      </div>

      {/* Modální okno pro přihlášení/registraci */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className="relative mx-4 w-full max-w-md rounded-3xl bg-white/90 p-8"
            style={{
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 0 0 #fff0, 0 0 120px 48px #f5f1e6cc',
            }}
          >
            <button
              onClick={() => setShowAuth(null)}
              className="absolute right-4 top-4 text-copper hover:text-copper/80"
            >
              ✕
            </button>
            <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} />
          </div>
        </div>
      )}
    </div>
  )
}
