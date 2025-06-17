import { NextResponse } from 'next/server';
import { ContentBlock } from '@/types/template';
import { directus } from '@/lib/directus';
import { readItems, updateItems, createItems } from '@directus/sdk';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('sectionId');

  if (!sectionId) {
    return NextResponse.json({ error: 'Section ID is required' }, { status: 400 });
  }

  try {
    const sections = await directus.request(readItems('sections', {
      filter: { id: { _eq: sectionId } }
    }));
    const section = sections[0];

    if (!section) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sectionId, content } = body;

    if (!sectionId || !content) {
      return NextResponse.json({ error: 'Section ID and content are required' }, { status: 400 });
    }

    // Create new content version (pokud máš kolekci content_versions, jinak vynech)
    // await directus.request(createItems('content_versions', [{
    //   section_id: sectionId,
    //   content: content as ContentBlock,
    // }]));

    // Update section with new content
    const updatedSections = await directus.request(updateItems('sections', {
      filter: { id: { _eq: sectionId } },
      data: { content: content as ContentBlock }
    }));

    return NextResponse.json(updatedSections[0]);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { sectionId, content } = body;

    if (!sectionId || !content) {
      return NextResponse.json({ error: 'Section ID and content are required' }, { status: 400 });
    }

    const updatedSections = await directus.request(updateItems('sections', {
      filter: { id: { _eq: sectionId } },
      data: { content: content as ContentBlock }
    }));

    return NextResponse.json(updatedSections[0]);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 