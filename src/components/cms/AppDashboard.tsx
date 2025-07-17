'use client'

import { useQuery } from '@tanstack/react-query'
import { createDirectus, rest, staticToken, readItems } from '@directus/sdk'

export function AppDashboard({ appId }: { appId: string }) {
  const { data: app } = useQuery({
    queryKey: ['app', appId],
    queryFn: async () => {
      const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!)
        .with(staticToken(process.env.NEXT_PUBLIC_DIRECTUS_ADMIN_TOKEN!))
        .with(rest())

      return directus.request(
        readItems('apps', {
          filter: { id: { _eq: appId } },
        })
      )
    },
  })

  const { data: contentTypes } = useQuery({
    queryKey: ['contentTypes', appId],
    queryFn: async () => {
      const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!)
        .with(staticToken(process.env.NEXT_PUBLIC_DIRECTUS_ADMIN_TOKEN!))
        .with(rest())

      return directus.request(
        readItems('content_types', {
          filter: { app_id: { _eq: appId } },
        })
      )
    },
  })

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {app?.[0]?.name || 'Načítám...'}
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contentTypes?.map((type: any) => (
          <div
            key={type.id}
            className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="mb-2 text-xl">{type.name}</h2>
            <p className="mb-4 text-gray-600">{type.fields.length} polí</p>
            <div className="flex gap-2">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                onClick={() =>
                  (window.location.href = `/cms/${appId}/content/${type.id}`)
                }
              >
                Upravit obsah
              </button>
              <button
                className="rounded border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                onClick={() =>
                  (window.location.href = `/cms/${appId}/content/${type.id}/settings`)
                }
              >
                Nastavení
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
