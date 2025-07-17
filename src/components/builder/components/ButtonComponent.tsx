'use client'

interface ButtonComponentProps {
  props: Record<string, any>
  style: Record<string, any>
  isPreviewMode: boolean
}

export function ButtonComponent({
  props,
  style,
  isPreviewMode,
}: ButtonComponentProps) {
  const {
    text,
    variant = 'primary',
    size = 'medium',
    link = '#',
    icon = '',
    fullWidth = false,
    disabled = false,
  } = props

  // Explicitní kontrola pro zobrazení textu - prázdný string se zobrazí jako prázdno
  const displayText = text === undefined ? 'Klikněte zde' : text

  const getVariantClasses = () => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

    switch (variant) {
      case 'secondary':
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500`
      case 'outline':
        return `${baseClasses} border-2 border-current text-current hover:bg-current hover:text-white focus:ring-current`
      case 'ghost':
        return `${baseClasses} bg-transparent text-current hover:bg-gray-100 focus:ring-gray-500`
      case 'danger':
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`
      case 'success':
        return `${baseClasses} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm'
      case 'large':
        return 'px-8 py-4 text-lg'
      default:
        return 'px-6 py-3 text-base'
    }
  }

  const getWidthClass = () => {
    return fullWidth ? 'w-full' : ''
  }

  const getDisabledClasses = () => {
    return disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'hover:scale-105 active:scale-95'
  }

  return (
    <div className="text-center" style={style}>
      <a
        href={isPreviewMode ? link : '#'}
        className={`${getVariantClasses()} ${getSizeClasses()} ${getWidthClass()} ${getDisabledClasses()}`}
        onClick={e => {
          if (!isPreviewMode || disabled) {
            e.preventDefault()
          }
        }}
        style={{
          pointerEvents: disabled ? 'none' : 'auto',
        }}
      >
        {icon && (
          <span className="mr-2">
            {/* Zde by mohla být ikona */}
            {icon}
          </span>
        )}
        {displayText}
      </a>
    </div>
  )
}
