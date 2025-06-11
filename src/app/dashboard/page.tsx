'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-copper">Načítání...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-parchment/10">
      {/* Stylový dřevěný home button v pravém horním rohu */}
      <a
        href="/"
        className="fixed top-8 right-8 z-50"
        style={{ textDecoration: 'none' }}
      >
        <button
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg border hover:scale-110 transition-transform duration-200"
          style={{
            backgroundImage: "url('/images/wood.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff8e1',
            textShadow: '0 1px 8px #181818, 0 1px 0 #b87333',
            boxShadow: '0 2px 12px #0006, 0 1px 0 #fff4 inset',
            borderWidth: '3px',
            borderColor: '#6b4f27',
            outline: 'none',
            fontSize: '1.5rem',
            fontFamily: 'inherit',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
          aria-label="Domů"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="woodHouse" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#b87333" />
                <stop offset="1" stopColor="#6b4f27" />
              </linearGradient>
            </defs>
            <path d="M6 16L16 7L26 16V26C26 26.5523 25.5523 27 25 27H7C6.44772 27 6 26.5523 6 26V16Z" fill="url(#woodHouse)" stroke="#6b4f27" strokeWidth="2" />
            <rect x="12" y="20" width="8" height="7" rx="1.5" fill="#fff8e1" stroke="#b87333" strokeWidth="1.5" />
          </svg>
        </button>
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-display text-copper mb-8">
          Vítejte, {session.user?.name || session.user?.email}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Karta pro vytvoření nové aplikace */}
          <div className="bg-white/80 rounded-lg p-6 shadow-lg border border-copper/20">
            <h2 className="text-xl font-display text-copper mb-4">Vytvořit novou aplikaci</h2>
            <p className="text-gray-600 mb-4">
              Začněte s prázdnou šablonou nebo vyberte z předpřipravených šablon.
            </p>
            <button
              onClick={() => router.push('/templates')}
              className="w-full px-4 py-2 bg-copper text-white rounded-lg hover:bg-copper/90 transition-colors"
            >
              Začít tvořit
            </button>
          </div>

          {/* Karta pro moje aplikace */}
          <div className="bg-white/80 rounded-lg p-6 shadow-lg border border-copper/20">
            <h2 className="text-xl font-display text-copper mb-4">Moje aplikace</h2>
            <p className="text-gray-600 mb-4">
              Spravujte své existující aplikace a projekty.
            </p>
            <button
              onClick={() => router.push('/apps')}
              className="w-full px-4 py-2 bg-copper text-white rounded-lg hover:bg-copper/90 transition-colors"
            >
              Zobrazit aplikace
            </button>
          </div>

          {/* Karta pro nastavení */}
          <div className="bg-white/80 rounded-lg p-6 shadow-lg border border-copper/20">
            <h2 className="text-xl font-display text-copper mb-4">Nastavení účtu</h2>
            <p className="text-gray-600 mb-4">
              Upravte své profilové informace a předvolby.
            </p>
            <button
              onClick={() => router.push('/settings')}
              className="w-full px-4 py-2 bg-copper text-white rounded-lg hover:bg-copper/90 transition-colors"
            >
              Upravit nastavení
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 