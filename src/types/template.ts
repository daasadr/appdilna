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
  createdAt: Date;
  updatedAt: Date;
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