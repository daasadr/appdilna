'use client';

import { useState } from 'react';
import { ComponentCategory, ComponentTemplate } from '@/types/builder';
import { 
  Layout, 
  Type, 
  Image, 
  MousePointer, 
  Mail, 
  Image as ImageIcon,
  MessageSquare,
  CreditCard,
  Navigation,
  Phone,
  Users,
  FileText,
  Settings,
  Globe,
  MapPin,
  Play,
  Music,
  Grid,
  List,
  BarChart3,
  Calendar,
  Search,
  LogIn,
  UserPlus
} from 'lucide-react';

interface ComponentLibraryProps {
  onComponentDrop: (componentType: string, position: number) => void;
}

const componentCategories: ComponentCategory[] = [
  {
    id: 'layout',
    name: 'Rozvržení',
    icon: 'Layout',
    components: [
      {
        id: 'hero',
        name: 'Hero sekce',
        category: 'layout',
        icon: 'Layout',
        description: 'Hlavní úvodní sekce s nadpisem a tlačítkem',
        defaultProps: {
          title: 'Vítejte na našich stránkách',
          subtitle: 'Vytvořte si úžasnou webovou aplikaci',
          buttonText: 'Začít',
          buttonLink: '#',
          backgroundImage: '/hero-bg.jpg'
        },
        defaultStyle: {
          textAlign: 'center',
          padding: '80px 20px'
        },
        preview: '/previews/hero.png',
        tags: ['úvod', 'hlavní', 'nadpis']
      },
      {
        id: 'navigation',
        name: 'Navigace',
        category: 'layout',
        icon: 'Navigation',
        description: 'Hlavní menu s odkazy',
        defaultProps: {
          logo: 'Logo',
          links: [
            { text: 'Domů', href: '/' },
            { text: 'O nás', href: '/o-nas' },
            { text: 'Kontakt', href: '/kontakt' }
          ]
        },
        defaultStyle: {
          backgroundColor: '#ffffff',
          padding: '1rem'
        },
        preview: '/previews/navigation.png',
        tags: ['menu', 'navigace', 'logo']
      },
      {
        id: 'footer',
        name: 'Patička',
        category: 'layout',
        icon: 'Settings',
        description: 'Spodní část stránky s odkazy a informacemi',
        defaultProps: {
          copyright: '© 2024 Vaše společnost',
          links: [
            { text: 'Ochrana osobních údajů', href: '/privacy' },
            { text: 'Podmínky použití', href: '/terms' }
          ]
        },
        defaultStyle: {
          backgroundColor: '#f8f9fa',
          padding: '2rem 0'
        },
        preview: '/previews/footer.png',
        tags: ['patička', 'copyright', 'odkazy']
      }
    ]
  },
  {
    id: 'content',
    name: 'Obsah',
    icon: 'Type',
    components: [
      {
        id: 'text',
        name: 'Text blok',
        category: 'content',
        icon: 'Type',
        description: 'Základní textový blok s formátováním',
        defaultProps: {
          content: 'Zde napište svůj text...',
          heading: 'Nadpis',
          alignment: 'left'
        },
        defaultStyle: {
          fontSize: '16px',
          lineHeight: '1.6'
        },
        preview: '/previews/text.png',
        tags: ['text', 'obsah', 'formátování']
      },
      {
        id: 'image',
        name: 'Obrázek',
        category: 'content',
        icon: 'Image',
        description: 'Obrázek s možností úpravy velikosti a stylu',
        defaultProps: {
          src: '/placeholder.jpg',
          alt: 'Popis obrázku',
          caption: ''
        },
        defaultStyle: {
          maxWidth: '100%',
          borderRadius: '8px'
        },
        preview: '/previews/image.png',
        tags: ['obrázek', 'fotografie', 'media']
      },
      {
        id: 'video',
        name: 'Video',
        category: 'content',
        icon: 'Play',
        description: 'Video z YouTube nebo vlastní soubor',
        defaultProps: {
          url: '',
          title: 'Video',
          autoplay: false
        },
        defaultStyle: {
          width: '100%',
          aspectRatio: '16/9'
        },
        preview: '/previews/video.png',
        tags: ['video', 'youtube', 'media']
      }
    ]
  },
  {
    id: 'interactive',
    name: 'Interaktivní',
    icon: 'MousePointer',
    components: [
      {
        id: 'button',
        name: 'Tlačítko',
        category: 'interactive',
        icon: 'MousePointer',
        description: 'Klikatelné tlačítko s různými styly',
        defaultProps: {
          text: 'Klikněte zde',
          variant: 'primary',
          size: 'medium',
          link: '#'
        },
        defaultStyle: {
          padding: '12px 24px',
          borderRadius: '6px',
          cursor: 'pointer'
        },
        preview: '/previews/button.png',
        tags: ['tlačítko', 'akce', 'link']
      },
      {
        id: 'form',
        name: 'Kontaktní formulář',
        category: 'interactive',
        icon: 'Mail',
        description: 'Formulář pro odeslání zprávy',
        defaultProps: {
          title: 'Kontaktujte nás',
          fields: ['name', 'email', 'message'],
          submitText: 'Odeslat'
        },
        defaultStyle: {
          maxWidth: '500px',
          margin: '0 auto'
        },
        preview: '/previews/form.png',
        tags: ['formulář', 'kontakt', 'odeslání']
      },
      {
        id: 'search',
        name: 'Vyhledávání',
        category: 'interactive',
        icon: 'Search',
        description: 'Vyhledávací pole s výsledky',
        defaultProps: {
          placeholder: 'Hledat...',
          results: []
        },
        defaultStyle: {
          width: '100%',
          maxWidth: '400px'
        },
        preview: '/previews/search.png',
        tags: ['vyhledávání', 'hledat', 'filtry']
      }
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: 'CreditCard',
    components: [
      {
        id: 'testimonial',
        name: 'Reference',
        category: 'business',
        icon: 'MessageSquare',
        description: 'Reference zákazníků s hodnocením',
        defaultProps: {
          text: 'Skvělá služba! Doporučuji všem.',
          author: 'Jan Novák',
          company: 'Společnost s.r.o.',
          rating: 5
        },
        defaultStyle: {
          textAlign: 'center',
          padding: '2rem'
        },
        preview: '/previews/testimonial.png',
        tags: ['reference', 'hodnocení', 'zákazník']
      },
      {
        id: 'pricing',
        name: 'Ceník',
        category: 'business',
        icon: 'CreditCard',
        description: 'Tabulka s cenami a funkcemi',
        defaultProps: {
          plans: [
            {
              name: 'Základní',
              price: '299 Kč',
              features: ['Funkce 1', 'Funkce 2'],
              popular: false
            }
          ]
        },
        defaultStyle: {
          display: 'grid',
          gap: '1rem'
        },
        preview: '/previews/pricing.png',
        tags: ['ceník', 'ceny', 'plány']
      },
      {
        id: 'team',
        name: 'Tým',
        category: 'business',
        icon: 'Users',
        description: 'Představení členů týmu',
        defaultProps: {
          members: [
            {
              name: 'Jan Novák',
              position: 'CEO',
              photo: '/team/jan.jpg',
              bio: 'Zakladatel společnosti'
            }
          ]
        },
        defaultStyle: {
          display: 'grid',
          gap: '2rem'
        },
        preview: '/previews/team.png',
        tags: ['tým', 'lidé', 'představení']
      }
    ]
  }
];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Layout, Type, Image, MousePointer, Mail, ImageIcon, MessageSquare,
    CreditCard, Navigation, Phone, Users, FileText, Settings, Globe,
    MapPin, Play, Music, Grid, List, BarChart3, Calendar, Search,
    LogIn, UserPlus
  };
  return icons[iconName] || Layout;
};

export function ComponentLibrary({ onComponentDrop }: ComponentLibraryProps) {
  const [activeCategory, setActiveCategory] = useState('layout');

  const handleComponentClick = (component: ComponentTemplate) => {
    // Přidáme komponentu na konec stránky
    onComponentDrop(component.id, 999); // Velké číslo pro přidání na konec
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Komponenty</h2>
        <p className="text-sm text-gray-600">Klikněte pro přidání komponenty</p>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-gray-200">
        {componentCategories.map((category) => {
          const IconComponent = getIconComponent(category.icon);
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-1 flex items-center justify-center p-3 text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {componentCategories
            .find(cat => cat.id === activeCategory)
            ?.components.map((component) => {
              const IconComponent = getIconComponent(component.icon);
              return (
                <div
                  key={component.id}
                  onClick={() => handleComponentClick(component)}
                  className="p-3 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {component.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {component.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
} 