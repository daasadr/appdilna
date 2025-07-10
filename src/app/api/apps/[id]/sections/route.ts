import { NextResponse } from 'next/server';
import { createDirectus, rest, token as directusToken, readItems } from '@directus/sdk';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const directus = createDirectus(process.env.DIRECTUS_URL!)
      .with(rest())
      .with(directusToken(session.accessToken));
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