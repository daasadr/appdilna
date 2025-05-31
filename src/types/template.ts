export type TemplateType = 'prebuilt' | 'custom';

export interface Template {
  id: string;
  name: string;
  description: string;
  type: TemplateType;
  thumbnail?: string;
  category: string;
  components: TemplateComponent[];
  config: TemplateConfig;
  pages: PageDefinition[];
  navigation: NavigationConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface PageDefinition {
  type: PageType;
  name: string;
  isRequired: boolean;
  sections: SectionDefinition[];
  meta: {
    title: string;
    description?: string;
    keywords?: string[];
  };
}

export type PageType = 'home' | 'about' | 'contact' | 'menu' | 'services' | 'gallery' | 'blog' | 'custom';

export interface SectionDefinition {
  type: SectionType;
  name: string;
  isRequired: boolean;
  defaultContent?: ContentBlock;
  allowedContentTypes: ('text' | 'image' | 'video' | 'form')[];
  style?: Record<string, string>;
}

export type SectionType = 'header' | 'hero' | 'content' | 'features' | 'gallery' | 'contact' | 'footer' | 'custom';

export interface NavigationConfig {
  type: NavigationType;
  position: NavigationPosition;
  items: NavigationItem[];
  style?: Record<string, string>;
}

export type NavigationType = 'simple' | 'dropdown' | 'megamenu';
export type NavigationPosition = 'top' | 'bottom' | 'left' | 'right';

export interface NavigationItem {
  label: string;
  pageType: PageType;
  icon?: string;
  children?: NavigationItem[];
}

export interface TemplateComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  content?: ContentBlock[];
  children?: TemplateComponent[];
  style?: Record<string, string>;
  layout?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'form' | 'custom';
  data: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface TemplateConfig {
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
      baseFontSize: string;
    };
    spacing: {
      unit: string;
      scale: number[];
    };
  };
  layout: {
    maxWidth: string;
    columns: number;
    gap: string;
  };
  settings: Record<string, any>;
} 