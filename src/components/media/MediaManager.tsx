'use client'

import React, { useState } from 'react'
import { UploadButton } from '@uploadthing/react'
import { OurFileRouter } from '@/utils/uploadthing'

interface MediaManagerProps {
  onSelect: (url: string) => void
  onClose: () => void
}

interface UploadedImage {
  url: string
  uploadedAt: Date
}

export const MediaManager: React.FC<MediaManagerProps> = ({
  onSelect,
  onClose,
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)

  const handleUploadComplete = (res: { url: string }[]) => {
    const newImages = res.map(file => ({
      url: file.url,
      uploadedAt: new Date(),
    }))
    setUploadedImages(prev => [...newImages, ...prev])
  }

  const handleSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex max-h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Správce médií</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
              console.error('Upload error:', error)
              alert('Chyba při nahrávání: ' + error.message)
            }}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 ${
                  selectedUrl === image.url
                    ? 'border-indigo-600'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedUrl(image.url)}
              >
                <img
                  src={image.url}
                  alt={`Uploaded ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {selectedUrl === image.url && (
                  <div className="absolute right-2 top-2 rounded-full bg-indigo-600 p-1">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2 border-t pt-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Zrušit
          </button>
          <button
            onClick={handleSelect}
            disabled={!selectedUrl}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
              selectedUrl
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            Vybrat
          </button>
        </div>
      </div>
    </div>
  )
}
