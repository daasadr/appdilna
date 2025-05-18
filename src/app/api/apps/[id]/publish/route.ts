import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Načteme všechny aktuální sekce
    const sections = await prisma.section.findMany({
      where: {
        page: {
          templateId: params.id
        }
      },
      include: {
        page: true
      },
      orderBy: {
        order: 'asc'
      }
    });

    // 2. Získáme poslední verzi
    const lastVersion = await prisma.publishedVersion.findFirst({
      where: { templateId: params.id },
      orderBy: { version: 'desc' }
    });

    const newVersion = (lastVersion?.version || 0) + 1;

    // 3. Vytvoříme novou publikovanou verzi
    await prisma.$transaction([
      // Nastavíme všechny předchozí verze jako neaktivní
      prisma.publishedVersion.updateMany({
        where: { 
          templateId: params.id,
          isLive: true
        },
        data: { isLive: false }
      }),
      // Vytvoříme novou aktivní verzi
      prisma.publishedVersion.create({
        data: {
          templateId: params.id,
          sections: sections,
          version: newVersion,
          isLive: true
        }
      }),
      // Aktualizujeme template
      prisma.template.update({
        where: { id: params.id },
        data: { 
          lastPublishedAt: new Date(),
          published: true
        }
      })
    ]);

    // 4. Revalidujeme cache pro veřejnou část aplikace
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