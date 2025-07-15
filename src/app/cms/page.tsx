'use client';

import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function CMSPage() {
  const { data: apps, isLoading } = useQuery({
    queryKey: ['apps'],
    queryFn: () => directus.request(readItems('apps')),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-xl font-semibold">Moje aplikace</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Seznam aplikací</h2>
          <Link
            href="/cms/new"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Vytvořit novou aplikaci
          </Link>
        </div>

        {isLoading ? (
          <div>Načítám aplikace...</div>
        ) : apps?.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Zatím nemáte žádné aplikace
            </h3>
            <p className="text-gray-500 mb-4">
              Začněte vytvořením své první aplikace
            </p>
            <Link
              href="/cms/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600"
            >
              Vytvořit první aplikaci
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps?.map((app) => (
              <Link
                key={app.id}
                href={`/cms/${app.id}`}
                className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
                <p className="text-gray-500 mb-4">
                  Šablona: {app.template_id}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    app.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  {app.status === 'published' ? 'Publikováno' : 'Koncept'}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
