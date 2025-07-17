'use client'

import { CreateAppForm } from '@/components/cms/CreateAppForm'

export default function NewAppPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <h1 className="text-xl font-semibold">Nová aplikace</h1>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6">
        <CreateAppForm />
      </main>
    </div>
  )
}
