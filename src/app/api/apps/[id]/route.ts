import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createDirectus, readItem, updateItem, rest, staticToken } from '@directus/sdk';

// Typy pro aplikaci
type App = {
  id: string;
  name: string;
  slug: string;
  status: 'draft' | 'published';
  app_title?: string;
  welcome_message?: string;
  user_owner?: string;
  pages?: any[];
  settings?: any;
  theme?: any;
};

// GET - načtení aplikace
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const appId = params.id;

    // Použijeme admin token pro načítání dat
    const directusAdmin = createDirectus(process.env.DIRECTUS_URL!)
      .with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN!))
      .with(rest());

    // Načteme aplikaci
    const app = await directusAdmin.request(readItem('apps', appId, {
      fields: ['id', 'name', 'slug', 'status', 'app_title', 'welcome_message', 'user_owner', 'pages', 'settings', 'theme']
    })) as App;

    // Bezpečnostní kontrola - ověříme, že aplikace patří přihlášenému uživateli
    if (!app.user_owner || app.user_owner !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Pokud aplikace nemá stránky, vytvoříme výchozí stránku
    if (!app.pages || app.pages.length === 0) {
      app.pages = [{
        id: 'home',
        name: 'Domovská stránka',
        slug: 'home',
        components: [],
        settings: {}
      }];
    }

    // Pokud aplikace nemá nastavení, vytvoříme výchozí
    if (!app.settings) {
      app.settings = {
        seo: {
          title: app.app_title || app.name,
          description: app.welcome_message || 'Vítejte v naší aplikaci',
          keywords: []
        },
        analytics: {
          enabled: false,
          trackingId: ''
        }
      };
    }

    // Pokud aplikace nemá téma, vytvoříme výchozí
    if (!app.theme) {
      app.theme = {
        colors: {
          primary: '#3B82F6',
          secondary: '#6B7280',
          accent: '#10B981',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        spacing: 'medium',
        borderRadius: 'medium'
      };
    }

    return NextResponse.json(app);
  } catch (error: any) {
    console.error('Error fetching app:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - aktualizace aplikace
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const appId = params.id;
    const updateData = await request.json();

    // Použijeme admin token pro aktualizaci dat
    const directusAdmin = createDirectus(process.env.DIRECTUS_URL!)
      .with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN!))
      .with(rest());

    // Nejdříve ověříme, že aplikace patří uživateli
    const existingApp = await directusAdmin.request(readItem('apps', appId, {
      fields: ['user_owner']
    })) as App;

    if (!existingApp.user_owner || existingApp.user_owner !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Aktualizujeme aplikaci
    const updatedApp = await directusAdmin.request(updateItem('apps', appId, {
      ...updateData,
      updatedAt: new Date().toISOString()
    }));

    return NextResponse.json(updatedApp);
  } catch (error: any) {
    console.error('Error updating app:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 