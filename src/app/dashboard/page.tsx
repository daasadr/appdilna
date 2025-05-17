'use client'

import { useSession, signOut } from 'next-auth/react'
import { User } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session } = useSession()

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
              onClick={() => signIn()}
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
            <button
              onClick={() => signIn()}
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
              Dílna
            </h1>
            <p className="text-xl text-copper font-display italic">
              Vítejte v digitální dílně
            </p>
          </div>

          {/* Dekorativní oddělovač */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-copper w-32" />
            <div className="mx-4 text-copper">⚡</div>
            <div className="h-px bg-copper w-32" />
          </div>

          {/* Hlavní obsah podle přihlášení */}
          {session ? (
            <div className="bg-parchment/80 p-8 rounded-lg shadow-lg border border-copper/20 mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Vítejte, {session.user?.name || session.user?.email}!</h2>
              <p className="mb-6">Můžete začít tvořit vlastní aplikaci nebo si vybrat šablonu.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-lg font-display text-xl shadow-lg border hover:scale-105 transition-transform duration-200"
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
                  Začít tvořit aplikaci
                </button>
                <button className="px-8 py-4 rounded-lg font-display text-xl shadow-lg border hover:scale-105 transition-transform duration-200"
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
                  Moje projekty
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-parchment/80 p-8 rounded-lg shadow-lg border border-copper/20 mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Pro plný přístup k tvorbě aplikací se přihlaste nebo zaregistrujte.</h2>
              <p className="mb-6">Jako nepřihlášený uživatel si můžete prohlédnout ukázky šablon, ale nemůžete tvořit vlastní aplikace.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => signIn()} className="px-8 py-4 rounded-lg font-display text-xl shadow-lg border hover:scale-105 transition-transform duration-200"
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
                  Přihlásit se a začít tvořit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 