'use client'

import Image from 'next/image'
import { useState } from 'react'
import AuthModal from '@/components/AuthButton'
import { useSession, signIn, signOut } from 'next-auth/react'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [showAuth, setShowAuth] = useState<null | 'login' | 'register'>(null)
  const { data: session } = useSession()
  const router = useRouter()

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
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/wood-texture.webp')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Overlay gradienty pro plynulé okraje */}
      <div className="pointer-events-none select-none absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(90deg, #2d1c0a 0%, transparent 10%, transparent 90%, #2d1c0a 100%)',
          opacity: 0.18,
        }}
      />
      <div className="pointer-events-none select-none absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(180deg, #2d1c0a 0%, transparent 12%, transparent 88%, #2d1c0a 100%)',
          opacity: 0.08,
        }}
      />
      {/* Tmavý sloupec uprostřed s gradientovými okraji */}
      <div className="pointer-events-none select-none absolute top-0 left-1/2 z-20 h-full"
        style={{
          width: '33vw',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, transparent 0%, #181818 18%, #181818 82%, transparent 100%)',
          opacity: 0.92,
        }}
      />

      {/* Blueprint výkresy na různých místech - zvýrazněné */}
      <div className="pointer-events-none select-none absolute top-0 right-0 w-96 h-96 z-30"
        style={{
          maskImage: 'linear-gradient(to left, transparent 10%, black 60%)',
          WebkitMaskImage: 'linear-gradient(to left, transparent 10%, black 60%)',
          opacity: 0.48,
          filter: 'drop-shadow(0 0 16px #ffb347) brightness(1.2) sepia(0.2)',
          transform: 'rotate(12deg)'
        }}
      >
        <div className="w-full h-full bg-blueprint bg-contain bg-no-repeat bg-right-top" />
      </div>
      <div className="pointer-events-none select-none absolute bottom-0 left-0 w-80 h-80 z-30"
        style={{
          maskImage: 'linear-gradient(to top, transparent 10%, black 60%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 10%, black 60%)',
          opacity: 0.38,
          filter: 'drop-shadow(0 0 12px #ffb347) brightness(1.2) sepia(0.2)',
          transform: 'rotate(-18deg)'
        }}
      >
        <div className="w-full h-full bg-blueprint bg-contain bg-no-repeat bg-left-bottom" />
      </div>
      <div className="pointer-events-none select-none absolute top-1/2 left-1/2 w-[500px] h-40 z-30"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)',
          opacity: 0.32,
          filter: 'drop-shadow(0 0 18px #ffb347) brightness(1.2) sepia(0.2)',
          transform: 'translate(-50%,-50%) rotate(-7deg)'
        }}
      >
        <div className="w-full h-full bg-blueprint bg-contain bg-no-repeat bg-center" />
      </div>

      {/* PRAVÝ HORNÍ ROH: dvě menší dřevěná tlačítka */}
      <div className="fixed top-8 right-8 z-50 flex gap-3">
        {session ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-6 h-6" />
              <span>{session.user?.name || session.user?.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-full font-display text-base shadow-lg border hover:scale-105 transition-transform duration-200"
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
              onClick={() => router.push('/register')}
              className="px-4 py-2 rounded-full font-display text-base shadow-lg border hover:scale-105 transition-transform duration-200"
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
              className="px-4 py-2 rounded-full font-display text-base shadow-lg border hover:scale-105 transition-transform duration-200"
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

      <div className="container mx-auto px-4 py-12 relative z-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-6xl mb-4"
              style={{
                color: '#fff8e1',
                textShadow: '0 2px 16px #ffb347, 0 1px 0 #181818',
                letterSpacing: '0.04em',
              }}
            >
              AppDílna
            </h1>
            <p className="text-xl text-copper font-display italic">
              Digitální laboratoř pro tvorbu PWA aplikací
            </p>
          </div>

          {/* Dekorativní oddělovač */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-copper w-32" />
            <div className="mx-4 text-copper">⚡</div>
            <div className="h-px bg-copper w-32" />
          </div>

          {/* Hlavní text */}
          <div className="bg-parchment/80 p-8 rounded-lg shadow-lg border border-copper/20 mb-12">
            <p className="text-lg text-ink mb-6">
              Vítejte v naší digitální dílně, kde se z vašich nápadů stávají skutečné aplikace.
              S našimi nástroji a šablonami můžete vytvořit profesionální PWA aplikaci
              bez nutnosti psát jediný řádek kódu.
            </p>
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={handleEnterWorkshop}
                className="px-10 py-6 rounded-lg font-display text-2xl shadow-lg border hover:scale-105 transition-transform duration-200"
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
            <a href="/pwa" className="p-4 border border-copper/20 rounded-lg cursor-pointer hover:bg-copper/10 transition-colors block">
              <div className="text-3xl mb-2">📖</div>
              <h3 className="font-display text-copper mb-2 underline">Co je to Powerful Web App a jaké jsou její výhody?</h3>
            </a>
            <div className="p-4 border border-copper/20 rounded-lg">
              <div className="text-3xl mb-2">📐</div>
              <h3 className="font-display text-copper mb-2">Šablony</h3>
              <p className="text-ink/80">Připravené šablony pro rychlý start</p>
            </div>
            <a href="/nasazeni" className="p-4 border border-copper/20 rounded-lg cursor-pointer hover:bg-copper/10 transition-colors block">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-display text-copper mb-2 underline">Jak na nasazení aplikace</h3>
            </a>
          </div>
        </div>
      </div>

      {/* Modální okno pro přihlášení/registraci */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white/90 p-8 rounded-3xl max-w-md w-full mx-4 relative" style={{ backdropFilter: 'blur(8px)', boxShadow: '0 0 0 0 #fff0, 0 0 120px 48px #f5f1e6cc' }}>
            <button onClick={() => setShowAuth(null)} className="absolute top-4 right-4 text-copper hover:text-copper/80">✕</button>
            <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} />
          </div>
        </div>
      )}
    </div>
  )
} 