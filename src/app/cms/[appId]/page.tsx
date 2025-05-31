'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppDashboard } from '@/components/cms/AppDashboard';

const queryClient = new QueryClient();

export default function CMSPage({ params }: { params: { appId: string } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <h1 className="text-xl font-semibold">App CMS</h1>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto py-6 px-4">
          <AppDashboard appId={params.appId} />
        </main>
      </div>
    </QueryClientProvider>
  );
} 