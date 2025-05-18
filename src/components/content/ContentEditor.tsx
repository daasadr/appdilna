'use client';

import React, { useState } from 'react';
import { ContentBlock } from '@/types/template';
import { RichTextEditor } from '../editor/RichTextEditor';
import { MediaManager } from '../media/MediaManager';

interface ContentEditorProps {
  initialContent?: ContentBlock;
  onSave: (content: ContentBlock) => void;
  onCancel: () => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  initialContent,
  onSave,
  onCancel,
}) => {
  const [content, setContent] = useState<ContentBlock>(
    initialContent || {
      id: crypto.randomUUID(),
      type: 'text',
      data: { text: '' },
    }
  );
  const [showMediaManager, setShowMediaManager] = useState(false);

  const handleTypeChange = (type: ContentBlock['type']) => {
    setContent((prev) => ({
      ...prev,
      type,
      data: type === 'text' ? { text: '' } : {},
    }));
  };

  const handleDataChange = (data: Record<string, any>) => {
    setContent((prev) => ({
      ...prev,
      data: { ...prev.data, ...data },
    }));
  };

  const handleSave = () => {
    onSave(content);
  };

  const handleImageSelect = (url: string) => {
    handleDataChange({ url });
  };

  const renderEditor = () => {
    switch (content.type) {
      case 'text':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
            <RichTextEditor
              initialContent={content.data.text || ''}
              onChange={(html) => handleDataChange({ text: html })}
            />
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Obrázek</label>
              <div className="mt-1 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowMediaManager(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Vybrat obrázek
                </button>
                {content.data.url && (
                  <span className="text-sm text-gray-500">
                    Vybraný obrázek: {content.data.url.split('/').pop()}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Alternativní text</label>
              <input
                type="text"
                value={content.data.alt || ''}
                onChange={(e) => handleDataChange({ alt: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Popis obrázku pro čtečky obrazovky"
              />
            </div>
            {content.data.url && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Náhled</label>
                <img
                  src={content.data.url}
                  alt={content.data.alt || ''}
                  className="max-w-full h-auto rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">URL videa</label>
              <input
                type="text"
                value={content.data.url || ''}
                onChange={(e) => handleDataChange({ url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {content.data.url && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Náhled</label>
                <video
                  src={content.data.url}
                  controls
                  className="max-w-full h-auto rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        );

      case 'form':
        return (
          <div className="text-gray-500 text-center p-4">
            Editor formulářů bude implementován později
          </div>
        );

      default:
        return <div>Nepodporovaný typ obsahu</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Typ obsahu</label>
          <select
            value={content.type}
            onChange={(e) => handleTypeChange(e.target.value as ContentBlock['type'])}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="text">Text</option>
            <option value="image">Obrázek</option>
            <option value="video">Video</option>
            <option value="form">Formulář</option>
          </select>
        </div>

        {renderEditor()}

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Zrušit
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
          >
            Uložit
          </button>
        </div>
      </div>

      {showMediaManager && (
        <MediaManager
          onSelect={handleImageSelect}
          onClose={() => setShowMediaManager(false)}
        />
      )}
    </div>
  );
}; 