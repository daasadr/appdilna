import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ContentBlock } from '@/types/template';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('sectionId');

  if (!sectionId) {
    return NextResponse.json({ error: 'Section ID is required' }, { status: 400 });
  }

  try {
    const section = await prisma.section.findUnique({
      where: { id: sectionId },
    });

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

    // Create new content version
    await prisma.contentVersion.create({
      data: {
        sectionId,
        content: content as ContentBlock,
      },
    });

    // Update section with new content
    const updatedSection = await prisma.section.update({
      where: { id: sectionId },
      data: { content: content as ContentBlock },
    });

    return NextResponse.json(updatedSection);
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

    const updatedSection = await prisma.section.update({
      where: { id: sectionId },
      data: { content: content as ContentBlock },
    });

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 