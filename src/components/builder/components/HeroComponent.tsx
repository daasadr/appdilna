'use client';

interface HeroComponentProps {
  props: Record<string, any>;
  style: Record<string, any>;
  isPreviewMode: boolean;
}

export function HeroComponent({ props, style, isPreviewMode }: HeroComponentProps) {
  const {
    title,
    subtitle,
    buttonText,
    buttonLink = '#',
    backgroundImage = '',
    backgroundColor = '#f8fafc',
    textColor = '#1f2937',
    buttonVariant = 'primary'
  } = props;

  // Explicitní kontrola pro zobrazení textu - prázdný string se zobrazí jako prázdno
  const displayTitle = title === undefined ? 'Vítejte na našich stránkách' : title;
  const displaySubtitle = subtitle === undefined ? 'Vytvořte si úžasnou webovou aplikaci' : subtitle;
  const displayButtonText = buttonText === undefined ? 'Začít' : buttonText;

  const getButtonStyles = () => {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105';
    
    switch (buttonVariant) {
      case 'secondary':
        return `${baseStyles} bg-gray-600 text-white hover:bg-gray-700`;
      case 'outline':
        return `${baseStyles} border-2 border-current text-current hover:bg-current hover:text-white`;
      default:
        return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700`;
    }
  };

  return (
    <div
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={{
        ...style,
        backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
        color: textColor
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: 'brightness(0.7)'
          }}
        />
      )}

      {/* Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ textShadow: backgroundImage ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none' }}
        >
          {displayTitle}
        </h1>
        
        <p 
          className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed"
          style={{ textShadow: backgroundImage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none' }}
        >
          {displaySubtitle}
        </p>
        
        {displayButtonText && (
          <a
            href={isPreviewMode ? buttonLink : '#'}
            className={`inline-block ${getButtonStyles()}`}
            onClick={(e) => {
              if (!isPreviewMode) {
                e.preventDefault();
              }
            }}
          >
            {displayButtonText}
          </a>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
          <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
} 