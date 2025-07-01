export interface Component {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  position: number;
  style: Record<string, string>;
  children: Component[];
  settings?: ComponentSettings;
}

export interface ComponentSettings {
  responsive?: {
    desktop?: Record<string, string>;
    tablet?: Record<string, string>;
    mobile?: Record<string, string>;
  };
  animations?: {
    type: 'fade' | 'slide' | 'bounce' | 'none';
    duration: number;
    delay: number;
  };
  visibility?: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  components: Component[];
  settings: PageSettings;
  seo?: SEOSettings;
}

export interface PageSettings {
  layout: 'default' | 'full-width' | 'sidebar';
  background: {
    type: 'color' | 'image' | 'gradient';
    value: string;
  };
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface AppData {
  id: string;
  name: string;
  slug: string;
  pages: Page[];
  settings: AppSettings;
  theme: Theme;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface AppSettings {
  domain?: string;
  customDomain?: string;
  analytics?: {
    googleAnalytics?: string;
    facebookPixel?: string;
  };
  integrations?: {
    googleMaps?: string;
    mailchimp?: string;
    stripe?: string;
  };
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

export interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  defaultProps: Record<string, any>;
  defaultStyle: Record<string, string>;
  preview: string;
  tags: string[];
}

export interface ComponentCategory {
  id: string;
  name: string;
  icon: string;
  components: ComponentTemplate[];
}

export type ViewMode = 'desktop' | 'tablet' | 'mobile';
export type ComponentType = 
  | 'hero' 
  | 'text' 
  | 'image' 
  | 'button' 
  | 'form' 
  | 'gallery' 
  | 'testimonial' 
  | 'pricing'
  | 'navigation'
  | 'footer'
  | 'contact'
  | 'about'
  | 'services'
  | 'team'
  | 'blog'
  | 'newsletter'
  | 'social'
  | 'map'
  | 'video'
  | 'audio'
  | 'carousel'
  | 'tabs'
  | 'accordion'
  | 'table'
  | 'chart'
  | 'calendar'
  | 'search'
  | 'login'
  | 'register'; 