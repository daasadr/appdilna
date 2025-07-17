'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryComponentProps {
  props: Record<string, any>
  style: Record<string, any>
  isPreviewMode: boolean
}

export function GalleryComponent({
  props,
  style,
  isPreviewMode,
}: GalleryComponentProps) {
  const {
    images = [
      { src: '/placeholder.jpg', alt: 'Obrázek 1', caption: 'Popis obrázku 1' },
      { src: '/placeholder.jpg', alt: 'Obrázek 2', caption: 'Popis obrázku 2' },
      { src: '/placeholder.jpg', alt: 'Obrázek 3', caption: 'Popis obrázku 3' },
      { src: '/placeholder.jpg', alt: 'Obrázek 4', caption: 'Popis obrázku 4' },
      { src: '/placeholder.jpg', alt: 'Obrázek 5', caption: 'Popis obrázku 5' },
      { src: '/placeholder.jpg', alt: 'Obrázek 6', caption: 'Popis obrázku 6' },
    ],
    columns = 3,
    showCaptions = true,
    lightbox = true,
    title = 'Naše galerie',
  } = props

  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const getGridCols = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      case 5:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
      case 6:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  const openLightbox = (index: number) => {
    if (lightbox && isPreviewMode) {
      setSelectedImage(index)
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1
      )
    }
  }

  return (
    <div className="py-8" style={style}>
      {title && (
        <h2 className="mb-8 text-center text-3xl font-bold">{title}</h2>
      )}

      <div className={`grid ${getGridCols()} gap-4`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={e => {
                const target = e.target as HTMLImageElement
                target.src = '/placeholder.jpg'
              }}
            />

            {showCaptions && image.caption && (
              <div className="absolute bottom-0 left-0 right-0 translate-y-full transform bg-black bg-opacity-50 p-3 text-white transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm">{image.caption}</p>
              </div>
            )}

            {lightbox && isPreviewMode && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30">
                <div className="text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm">Klikněte pro zvětšení</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-h-full max-w-4xl p-4">
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-white hover:text-gray-300"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform text-white hover:text-gray-300"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-h-full max-w-full object-contain"
            />

            {showCaptions && images[selectedImage].caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                <p className="text-lg">{images[selectedImage].caption}</p>
              </div>
            )}

            <div className="absolute left-4 top-4 text-sm text-white">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
