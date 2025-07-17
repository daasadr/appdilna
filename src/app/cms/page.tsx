'use client'

import { directus } from '@/lib/directus'
import { readItems } from '@directus/sdk'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function CMSPage() {
  const { data: apps, isLoading } = useQuery({
    queryKey: ['apps'],
    queryFn: () => directus.request(readItems('apps')),
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <h1 className="text-xl font-semibold">Moje aplikace</h1>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Seznam aplikací</h2>
          <Link
            href="/cms/new"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Vytvořit novou aplikaci
          </Link>
        </div>

        {isLoading ? (
          <div>Načítám aplikace...</div>
        ) : apps?.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Zatím nemáte žádné aplikace
            </h3>
            <p className="mb-4 text-gray-500">
              Začněte vytvořením své první aplikace
            </p>
            <Link
              href="/cms/new"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600"
            >
              Vytvořit první aplikaci
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {apps?.map(app => (
              <Link
                key={app.id}
                href={`/cms/${app.id}`}
                className="block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="mb-2 text-xl font-semibold">{app.name}</h3>
                <p className="mb-4 text-gray-500">Šablona: {app.template_id}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span
                    className={`mr-2 inline-block h-2 w-2 rounded-full ${
                      app.status === 'published'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                  {app.status === 'published' ? 'Publikováno' : 'Koncept'}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
