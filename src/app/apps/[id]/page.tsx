import { PrismaClient } from '@prisma/client';
import { ContentDisplay } from '@/components/content/ContentDisplay';
import { ContentBlock } from '@/types/template';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export const revalidate = 3600; // Revalidace každou hodinu

async function getPublishedVersion(id: string) {
  const publishedVersion = await prisma.publishedVersion.findFirst({
    where: {
      templateId: id,
      isLive: true
    },
    orderBy: {
      version: 'desc'
    }
  });

  if (!publishedVersion) {
    return null;
  }

  return publishedVersion;
}

export default async function AppPage({ params }: { params: { id: string } }) {
  const publishedVersion = await getPublishedVersion(params.id);

  if (!publishedVersion) {
    notFound();
  }

  const sections = publishedVersion.sections as any[];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {sections.map((section: any) => (
          <div key={section.id} className="mb-8">
            <ContentDisplay
              content={section.content as ContentBlock}
              isEditable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 