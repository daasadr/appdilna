'use client';

import { useQuery } from '@tanstack/react-query';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { Schema } from '@/lib/directus';

export function AppDashboard({ appId }: { appId: string }) {
  const { data: app } = useQuery({
    queryKey: ['app', appId],
    queryFn: () => directus.request(readItems('apps', {
      filter: { id: { _eq: appId } }
    }))
  });

  const { data: contentTypes } = useQuery({
    queryKey: ['contentTypes', appId],
    queryFn: () => directus.request(readItems('content_types', {
      filter: { app_id: { _eq: appId } }
    }))
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{app?.[0]?.name || 'Načítám...'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentTypes?.map(type => (
          <div key={type.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl mb-2">{type.name}</h2>
            <p className="text-gray-600 mb-4">
              {type.fields.length} polí
            </p>
            <div className="flex gap-2">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => window.location.href = `/cms/${appId}/content/${type.id}`}
              >
                Upravit obsah
              </button>
              <button 
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                onClick={() => window.location.href = `/cms/${appId}/content/${type.id}/settings`}
              >
                Nastavení
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 