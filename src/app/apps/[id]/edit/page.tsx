'use client';

import React, { useEffect, useState } from 'react';
import { LiveEditor } from '@/components/editor/LiveEditor';
import { Section, ContentBlock } from '@/types/template';
import { useParams } from 'next/navigation';

export default function EditAppPage() {
  const params = useParams();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      // Zde implementujeme načítání sekcí z API
      const response = await fetch(`/api/apps/${params.id}/sections`);
      if (!response.ok) {
        throw new Error('Failed to fetch sections');
      }
      const data = await response.json();
      setSections(data);
      setLoading(false);
    } catch (err) {
      setError('Nepodařilo se načíst obsah aplikace');
      setLoading(false);
    }
  };

  const handleSectionUpdate = async (sectionId: string, content: ContentBlock) => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sectionId,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update section');
      }

      // Aktualizace lokálního stavu
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? { ...section, content }
            : section
        )
      );
    } catch (err) {
      console.error('Error updating section:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <LiveEditor
        sections={sections}
        onSectionUpdate={handleSectionUpdate}
      />
    </div>
  );
} 