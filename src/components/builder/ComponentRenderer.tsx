'use client';

import { Component, ViewMode } from '@/types/builder';
import { HeroComponent } from './components/HeroComponent';
import { TextComponent } from './components/TextComponent';
import { ImageComponent } from './components/ImageComponent';
import { ButtonComponent } from './components/ButtonComponent';
import { FormComponent } from './components/FormComponent';
import { GalleryComponent } from './components/GalleryComponent';
import { TestimonialComponent } from './components/TestimonialComponent';
import { PricingComponent } from './components/PricingComponent';
import { NavigationComponent } from './components/NavigationComponent';
import { FooterComponent } from './components/FooterComponent';

interface ComponentRendererProps {
  component: Component;
  isSelected: boolean;
  isPreviewMode: boolean;
  viewMode: ViewMode;
}

export function ComponentRenderer({
  component,
  isSelected,
  isPreviewMode,
  viewMode
}: ComponentRendererProps) {
  const getResponsiveStyles = () => {
    const baseStyles = component.style || {};
    
    if (component.settings?.responsive) {
      const responsive = component.settings.responsive;
      
      switch (viewMode) {
        case 'mobile':
          return { ...baseStyles, ...responsive.mobile };
        case 'tablet':
          return { ...baseStyles, ...responsive.tablet };
        default:
          return { ...baseStyles, ...responsive.desktop };
      }
    }
    
    return baseStyles;
  };

  const getAnimationStyles = () => {
    if (!component.settings?.animations || isPreviewMode) return {};
    
    const animation = component.settings.animations;
    if (animation.type === 'none') return {};
    
    return {
      animation: `${animation.type} ${animation.duration}ms ease-in-out ${animation.delay}ms both`
    };
  };

  const getVisibilityStyles = () => {
    if (!component.settings?.visibility) return {};
    
    const visibility = component.settings.visibility;
    
    switch (viewMode) {
      case 'mobile':
        return { display: visibility.mobile ? 'block' : 'none' };
      case 'tablet':
        return { display: visibility.tablet ? 'block' : 'none' };
      default:
        return { display: visibility.desktop ? 'block' : 'none' };
    }
  };

  const combinedStyles = {
    ...getResponsiveStyles(),
    ...getAnimationStyles(),
    ...getVisibilityStyles()
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'hero':
        return (
          <HeroComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'text':
        return (
          <TextComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'image':
        return (
          <ImageComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'button':
        return (
          <ButtonComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'form':
        return (
          <FormComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'gallery':
        return (
          <GalleryComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'testimonial':
        return (
          <TestimonialComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'pricing':
        return (
          <PricingComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'navigation':
        return (
          <NavigationComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      case 'footer':
        return (
          <FooterComponent
            props={component.props}
            style={combinedStyles}
            isPreviewMode={isPreviewMode}
          />
        );
      
      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <p>Neznámý typ komponenty: {component.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`transition-all duration-200 ${
        isSelected && !isPreviewMode ? 'outline-2 outline-blue-500 outline-offset-2' : ''
      }`}
      style={combinedStyles}
    >
      {renderComponent()}
    </div>
  );
} 