'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryComponentProps {
  props: Record<string, any>;
  style: Record<string, any>;
  isPreviewMode: boolean;
}

export function GalleryComponent({ props, style, isPreviewMode }: GalleryComponentProps) {
  const {
    images = [
      { src: '/placeholder.jpg', alt: 'Obrázek 1', caption: 'Popis obrázku 1' },
      { src: '/placeholder.jpg', alt: 'Obrázek 2', caption: 'Popis obrázku 2' },
      { src: '/placeholder.jpg', alt: 'Obrázek 3', caption: 'Popis obrázku 3' },
      { src: '/placeholder.jpg', alt: 'Obrázek 4', caption: 'Popis obrázku 4' },
      { src: '/placeholder.jpg', alt: 'Obrázek 5', caption: 'Popis obrázku 5' },
      { src: '/placeholder.jpg', alt: 'Obrázek 6', caption: 'Popis obrázku 6' }
    ],
    columns = 3,
    showCaptions = true,
    lightbox = true,
    title = 'Naše galerie'
  } = props;

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const getGridCols = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 5:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5';
      case 6:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const openLightbox = (index: number) => {
    if (lightbox && isPreviewMode) {
      setSelectedImage(index);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="py-8" style={style}>
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      )}
      
      <div className={`grid ${getGridCols()} gap-4`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.jpg';
              }}
            />
            
            {showCaptions && image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm">{image.caption}</p>
              </div>
            )}
            
            {lightbox && isPreviewMode && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <span className="text-sm">Klikněte pro zvětšení</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
            />
            
            {showCaptions && images[selectedImage].caption && (
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <p className="text-lg">{images[selectedImage].caption}</p>
              </div>
            )}
            
            <div className="absolute top-4 left-4 text-white text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 