'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Došlo k chybě v konfiguraci přihlášení. Kontaktujte prosím podporu.'
      case 'AccessDenied':
        return 'Přístup byl odepřen. Nemáte dostatečná oprávnění.'
      case 'Verification':
        return 'Odkaz pro přihlášení vypršel nebo je neplatný. Zkuste to prosím znovu.'
      default:
        return 'Došlo k chybě při přihlašování. Zkuste to prosím znovu.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment/10">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/80 p-8 rounded-lg shadow-lg border border-copper/20">
          <h1 className="text-2xl font-display text-copper mb-4">Chyba přihlášení</h1>
          <p className="text-gray-600 mb-6">{getErrorMessage(error)}</p>
          <Link 
            href="/"
            className="block w-full px-4 py-2 bg-copper text-white rounded-lg hover:bg-copper/90 transition-colors text-center"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  )
} 