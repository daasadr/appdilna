import { NextResponse } from 'next/server';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sections = await directus.request(readItems('sections', {
      filter: {
        page: {
          template_id: { _eq: params.id }
        }
      },
      sort: ['order']
    }));

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 