import { createDirectus, rest, readItems, createItems } from '@directus/sdk';

// Typy pro kolekce
export interface Schema {
  apps: {
    id: string;
    name: string;
    slug: string;
    template_id: string;
    settings: Record<string, any>;
    status: 'draft' | 'published';
  };
  
  content_types: {
    id: string;
    app_id: string;
    name: string;
    slug: string;
    fields: {
      name: string;
      type: 'text' | 'rich_text' | 'image' | 'number';
      required: boolean;
      options?: Record<string, any>;
    }[];
  };
  
  content: {
    id: string;
    app_id: string;
    type_id: string;
    data: Record<string, any>;
    status: 'draft' | 'published';
  };
}

export const directus = createDirectus<Schema>('https://dir.appdilna.cz').with(rest()); 