import { createDirectus, rest, staticToken, readItems, createItems, readUsers, createUsers } from '@directus/sdk';

// Typy pro kolekce
export interface Schema {
  apps: {
    id: string;
    name: string;
    slug: string;
    template_id?: string;
    settings: Record<string, any>;
    status: 'draft' | 'published';
    user_owner?: string;
    app_title?: string;
    welcome_message?: string;
    pages?: any[];
    theme?: {
      colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
      };
      fonts: {
        heading: string;
        body: string;
      };
      spacing: string;
      borderRadius: string;
    };
    createdAt?: string;
    updatedAt?: string;
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

export const directus = createDirectus<Schema>(process.env.DIRECTUS_URL!)
  .with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN!))
  .with(rest()); 