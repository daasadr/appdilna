// Typy pro kolekce
export interface Schema {
  apps: {
    id: string
    name: string
    slug: string
    template_id?: string
    settings: Record<string, any>
    status: 'draft' | 'published'
    user_owner?: string
    app_title?: string
    welcome_message?: string
    pages?: any[]
    theme?: {
      colors: {
        primary: string
        secondary: string
        accent: string
        background: string
        text: string
      }
      fonts: {
        heading: string
        body: string
      }
      spacing: string
      borderRadius: string
    }
    createdAt?: string
    updatedAt?: string
  }

  content_types: {
    id: string
    app_id: string
    name: string
    slug: string
    fields: {
      name: string
      type: 'text' | 'rich_text' | 'image' | 'number'
      required: boolean
      options?: Record<string, any>
    }[]
  }

  content: {
    id: string
    app_id: string
    type_id: string
    data: Record<string, any>
    status: 'draft' | 'published'
  }

  sections: {
    id: string
    app_id: string
    name: string
    content: any[]
    order: number
    createdAt?: string
    updatedAt?: string
  }

  published_versions: {
    id: string
    app_id: string
    version: number
    sections: any[]
    published_at: string
    created_at?: string
  }

  templates: {
    id: string
    name: string
    description?: string
    thumbnail?: string
    sections: any[]
    settings: Record<string, any>
    created_at?: string
    updated_at?: string
  }
}
