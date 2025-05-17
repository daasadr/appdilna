'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function VerifyPage() {
  const [code, setCode] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Zde přidej logiku pro ověření kódu
    // Např. volání API endpointu pro ověření
    console.log('Verifying code:', code, 'for email:', email)
    // Po úspěšném ověření přesměruj na hlavní stránku
    router.push('/')
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-4 text-center">Ověření kódu</h1>
        <p className="mb-4 text-center">Zadejte kód zaslaný na {email}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-4 py-2 border rounded"
            placeholder="Kód"
          />
          <button
            type="submit"
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
            Ověřit
          </button>
        </form>
      </div>
    </div>
  )
} 