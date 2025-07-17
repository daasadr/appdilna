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
    <div className="flex min-h-screen items-center justify-center bg-parchment/10">
      <div className="mx-4 w-full max-w-md">
        <div className="rounded-lg border border-copper/20 bg-white/80 p-8 shadow-lg">
          <h1 className="mb-4 font-display text-2xl text-copper">
            Chyba přihlášení
          </h1>
          <p className="mb-6 text-gray-600">{getErrorMessage(error)}</p>
          <Link
            href="/"
            className="block w-full rounded-lg bg-copper px-4 py-2 text-center text-white transition-colors hover:bg-copper/90"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  )
}
