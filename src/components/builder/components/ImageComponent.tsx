'use client'

interface ImageComponentProps {
  props: Record<string, any>
  style: Record<string, any>
  isPreviewMode: boolean
}

export function ImageComponent({
  props,
  style,
  isPreviewMode,
}: ImageComponentProps) {
  const {
    src = '/placeholder.jpg',
    alt,
    caption,
    width = '100%',
    height = 'auto',
    borderRadius = '8px',
    objectFit = 'cover',
    shadow = 'none',
  } = props

  // Explicitní kontrola pro zobrazení textu - prázdný string se zobrazí jako prázdno
  const displayAlt = alt === undefined ? 'Obrázek' : alt
  const displayCaption = caption === undefined ? '' : caption

  const getShadowClass = () => {
    switch (shadow) {
      case 'small':
        return 'shadow-sm'
      case 'medium':
        return 'shadow-md'
      case 'large':
        return 'shadow-lg'
      case 'xl':
        return 'shadow-xl'
      default:
        return ''
    }
  }

  return (
    <div className="text-center" style={style}>
      <div className="relative inline-block">
        <img
          src={src}
          alt={displayAlt}
          className={`${getShadowClass()} transition-all duration-300 hover:scale-105`}
          style={{
            width,
            height,
            borderRadius,
            objectFit,
            maxWidth: '100%',
          }}
          onError={e => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder.jpg'
          }}
        />

        {!isPreviewMode && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 hover:bg-opacity-20">
            <div className="text-sm font-medium text-white opacity-0 transition-opacity hover:opacity-100">
              Klikněte pro úpravu
            </div>
          </div>
        )}
      </div>

      {displayCaption && (
        <p className="mt-2 text-sm italic text-gray-600">{displayCaption}</p>
      )}
    </div>
  )
}
