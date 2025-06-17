import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { directus } from '@/lib/directus';
import { readItems, updateItems, createItems } from '@directus/sdk';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Načteme všechny aktuální sekce pro daný templateId
    const sections = await directus.request(readItems('sections', {
      filter: {
        page: {
          template_id: { _eq: params.id }
        }
      },
      sort: ['order'],
      fields: ['*', 'page.*']
    }));

    // 2. Získáme poslední verzi
    const lastVersions = await directus.request(readItems('published_versions', {
      filter: { template_id: { _eq: params.id } },
      sort: ['-version'],
      limit: 1
    }));
    const lastVersion = lastVersions[0];
    const newVersion = (lastVersion?.version || 0) + 1;

    // 3. Nastavíme všechny předchozí verze jako neaktivní
    if (lastVersion) {
      await directus.request(updateItems('published_versions', {
        filter: { template_id: { _eq: params.id }, isLive: { _eq: true } },
        data: { isLive: false }
      }));
    }

    // 4. Vytvoříme novou aktivní verzi
    await directus.request(createItems('published_versions', [{
      template_id: params.id,
      sections: sections,
      version: newVersion,
      isLive: true,
      publishedAt: new Date().toISOString()
    }]));

    // 5. Aktualizujeme template
    await directus.request(updateItems('templates', {
      filter: { id: { _eq: params.id } },
      data: {
        lastPublishedAt: new Date().toISOString(),
        published: true
      }
    }));

    // 6. Revalidujeme cache pro veřejnou část aplikace
    if (process.env.NEXT_PUBLIC_APP_URL) {
      revalidatePath(`${process.env.NEXT_PUBLIC_APP_URL}/apps/${params.id}`);
    }

    return NextResponse.json({
      success: true,
      version: newVersion,
      publishedAt: new Date()
    });
  } catch (error) {
    console.error('Error publishing app:', error);
    return NextResponse.json(
      { error: 'Failed to publish app' },
      { status: 500 }
    );
  }
} 