'use client'

import React, { useState } from 'react'
import { ContentBlock } from '@/types/template'
import { RichTextEditor } from '../editor/RichTextEditor'
import { MediaManager } from '../media/MediaManager'

interface ContentEditorProps {
  initialContent?: ContentBlock
  onSave: (content: ContentBlock) => void
  onCancel: () => void
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
  )
  const [showMediaManager, setShowMediaManager] = useState(false)

  const handleTypeChange = (type: ContentBlock['type']) => {
    setContent(prev => ({
      ...prev,
      type,
      data: type === 'text' ? { text: '' } : {},
    }))
  }

  const handleDataChange = (data: Record<string, any>) => {
    setContent(prev => ({
      ...prev,
      data: { ...prev.data, ...data },
    }))
  }

  const handleSave = () => {
    onSave(content)
  }

  const handleImageSelect = (url: string) => {
    handleDataChange({ url })
  }

  const renderEditor = () => {
    switch (content.type) {
      case 'text':
        return (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Text
            </label>
            <RichTextEditor
              initialContent={content.data.text || ''}
              onChange={html => handleDataChange({ text: html })}
            />
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Obrázek
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowMediaManager(true)}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
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
              <label className="block text-sm font-medium text-gray-700">
                Alternativní text
              </label>
              <input
                type="text"
                value={content.data.alt || ''}
                onChange={e => handleDataChange({ alt: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Popis obrázku pro čtečky obrazovky"
              />
            </div>
            {content.data.url && (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Náhled
                </label>
                <img
                  src={content.data.url}
                  alt={content.data.alt || ''}
                  className="h-auto max-w-full rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        )

      case 'video':
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                URL videa
              </label>
              <input
                type="text"
                value={content.data.url || ''}
                onChange={e => handleDataChange({ url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {content.data.url && (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Náhled
                </label>
                <video
                  src={content.data.url}
                  controls
                  className="h-auto max-w-full rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        )

      case 'form':
        return (
          <div className="p-4 text-center text-gray-500">
            Editor formulářů bude implementován později
          </div>
        )

      default:
        return <div>Nepodporovaný typ obsahu</div>
    }
  }

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Typ obsahu
          </label>
          <select
            value={content.type}
            onChange={e =>
              handleTypeChange(e.target.value as ContentBlock['type'])
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="text">Text</option>
            <option value="image">Obrázek</option>
            <option value="video">Video</option>
            <option value="form">Formulář</option>
          </select>
        </div>

        {renderEditor()}

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Zrušit
          </button>
          <button
            onClick={handleSave}
            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
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
  )
}
