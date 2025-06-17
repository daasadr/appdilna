import { ContentDisplay } from '@/components/content/ContentDisplay';
import { ContentBlock } from '@/types/template';
import { notFound } from 'next/navigation';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export const revalidate = 3600; // Revalidace každou hodinu

async function getPublishedVersion(id: string) {
  const versions = await directus.request(readItems('published_versions', {
    filter: {
      template_id: { _eq: id },
      isLive: { _eq: true }
    },
    sort: ['-version'],
    limit: 1
  }));
  return versions[0] || null;
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