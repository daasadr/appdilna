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