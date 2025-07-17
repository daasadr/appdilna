'use client'

import React, { useState } from 'react'
import { ContentDisplay } from '../content/ContentDisplay'
import { ContentEditor } from '../content/ContentEditor'
import { ContentBlock, Section } from '@/types/template'

interface LiveEditorProps {
  sections: Section[]
  onSectionUpdate: (sectionId: string, content: ContentBlock) => Promise<void>
  appId: string
}

export const LiveEditor: React.FC<LiveEditorProps> = ({
  sections,
  onSectionUpdate,
  appId,
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [isPublishing, setIsPublishing] = useState(false)
  const [lastPublishedAt, setLastPublishedAt] = useState<Date | null>(null)

  const handleEdit = (sectionId: string) => {
    setEditingSection(sectionId)
  }

  const handleSave = async (sectionId: string, content: ContentBlock) => {
    try {
      await onSectionUpdate(sectionId, content)
      setEditingSection(null)
    } catch (error) {
      console.error('Error updating section:', error)
      // Zde můžeme přidat notifikaci o chybě
    }
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    try {
      const response = await fetch(`/api/apps/${appId}/publish`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to publish changes')
      }

      const data = await response.json()
      setLastPublishedAt(new Date(data.publishedAt))

      // Můžeme přidat notifikaci o úspěšném publikování
      alert('Změny byly úspěšně publikovány!')
    } catch (error) {
      console.error('Error publishing changes:', error)
      alert('Nepodařilo se publikovat změny. Zkuste to prosím znovu.')
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Horní panel s nástroji */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('desktop')}
              className={`rounded p-2 ${
                viewMode === 'desktop'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`rounded p-2 ${
                viewMode === 'mobile'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </button>
            {lastPublishedAt && (
              <span className="text-sm text-gray-500">
                Poslední publikace: {new Date(lastPublishedAt).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              className={`rounded-lg bg-indigo-600 px-4 py-2 text-white transition-all ${
                isPublishing
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-indigo-700'
              }`}
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <span className="flex items-center">
                  <svg
                    className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Publikuji...
                </span>
              ) : (
                'Publikovat změny'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Kontejner pro náhled */}
      <div className="pb-8 pt-16">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-sm' : 'max-w-6xl'
          }`}
        >
          {sections.map(section => (
            <div
              key={section.id}
              className="group relative mb-8 rounded-lg hover:outline hover:outline-2 hover:outline-indigo-200"
            >
              {editingSection === section.id ? (
                <div className="rounded-lg bg-white p-4 shadow-lg">
                  <ContentEditor
                    initialContent={section.content as ContentBlock}
                    onSave={content => handleSave(section.id, content)}
                    onCancel={() => setEditingSection(null)}
                  />
                </div>
              ) : (
                <ContentDisplay
                  content={section.content as ContentBlock}
                  isEditable={true}
                  onEdit={() => handleEdit(section.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
