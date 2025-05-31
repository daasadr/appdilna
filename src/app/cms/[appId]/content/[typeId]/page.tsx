'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContentEditor } from '@/components/cms/ContentEditor';

const queryClient = new QueryClient();

export default function ContentPage({ 
  params 
}: { 
  params: { appId: string; typeId: string } 
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Editor obsahu</h1>
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              Zpět na přehled
            </button>
          </div>
        </nav>
        
        <main className="max-w-3xl mx-auto py-6 px-4">
          <ContentEditor 
            appId={params.appId}
            contentTypeId={params.typeId}
          />
        </main>
      </div>
    </QueryClientProvider>
  );
} 