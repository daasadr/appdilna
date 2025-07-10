'use client';

interface TextComponentProps {
  props: Record<string, any>;
  style: Record<string, any>;
  isPreviewMode: boolean;
}

export function TextComponent({ props, style, isPreviewMode }: TextComponentProps) {
  const {
    content,
    heading,
    alignment = 'left',
    fontSize = '16px',
    fontWeight = 'normal',
    lineHeight = '1.6',
    color = '#1f2937',
    backgroundColor = 'transparent',
    padding = '1rem',
    margin = '0',
    maxWidth = 'none',
    textTransform = 'none',
    fontStyle = 'normal',
    textDecoration = 'none'
  } = props;

  // Explicitní kontrola pro zobrazení textu - prázdný string se zobrazí jako prázdno
  const displayContent = content === undefined ? 'Zde napište svůj text...' : content;
  const displayHeading = heading === undefined ? '' : heading;

  const getAlignmentClass = () => {
    switch (alignment) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'justify':
        return 'text-justify';
      default:
        return 'text-left';
    }
  };

  const getTextTransformClass = () => {
    switch (textTransform) {
      case 'uppercase':
        return 'uppercase';
      case 'lowercase':
        return 'lowercase';
      case 'capitalize':
        return 'capitalize';
      default:
        return '';
    }
  };

  const getFontStyleClass = () => {
    switch (fontStyle) {
      case 'italic':
        return 'italic';
      default:
        return 'not-italic';
    }
  };

  const getTextDecorationClass = () => {
    switch (textDecoration) {
      case 'underline':
        return 'underline';
      case 'line-through':
        return 'line-through';
      default:
        return 'no-underline';
    }
  };

  return (
    <div
      className={`${getAlignmentClass()} ${getTextTransformClass()} ${getFontStyleClass()} ${getTextDecorationClass()}`}
      style={{
        ...style,
        fontSize,
        fontWeight,
        lineHeight,
        color,
        backgroundColor,
        padding,
        margin,
        maxWidth: maxWidth === 'none' ? 'none' : maxWidth
      }}
    >
      {displayHeading && (
        <h2 className="text-2xl font-bold mb-4">
          {displayHeading}
        </h2>
      )}
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: displayContent }}
      />
    </div>
  );
} 