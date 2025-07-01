'use client';

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterComponentProps {
  props: Record<string, any>;
  style: Record<string, any>;
  isPreviewMode: boolean;
}

export function FooterComponent({ props, style, isPreviewMode }: FooterComponentProps) {
  const {
    logo = 'Logo',
    logoImage = '',
    description = 'Vytváříme úžasné webové aplikace pro moderní podnikání.',
    links = [
      {
        title: 'Společnost',
        items: [
          { text: 'O nás', href: '/o-nas' },
          { text: 'Tým', href: '/tym' },
          { text: 'Kariéra', href: '/kariera' }
        ]
      },
      {
        title: 'Služby',
        items: [
          { text: 'Webové aplikace', href: '/sluzby/webove-aplikace' },
          { text: 'E-commerce', href: '/sluzby/e-commerce' },
          { text: 'Konzultace', href: '/sluzby/konzultace' }
        ]
      },
      {
        title: 'Podpora',
        items: [
          { text: 'Kontakt', href: '/kontakt' },
          { text: 'FAQ', href: '/faq' },
          { text: 'Dokumentace', href: '/dokumentace' }
        ]
      }
    ],
    socialLinks = [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' }
    ],
    contactInfo = {
      email: 'info@spolecnost.cz',
      phone: '+420 123 456 789',
      address: 'Praha 1, Česká republika'
    },
    copyright = '© 2024 Vaše společnost. Všechna práva vyhrazena.',
    showNewsletter = true,
    newsletterText = 'Přihlaste se k odběru novinek',
    newsletterPlaceholder = 'Váš e-mail'
  } = props;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-900 text-white" style={style}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo a popis */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              {logoImage ? (
                <img
                  src={logoImage}
                  alt={logo}
                  className="h-8 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-xl font-bold">{logo}</span>
              )}
            </div>
            <p className="text-gray-400 mb-6">
              {description}
            </p>
            
            {/* Sociální sítě */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={isPreviewMode ? social.url : '#'}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    if (!isPreviewMode) {
                      e.preventDefault();
                    }
                  }}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigační odkazy */}
          {links.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={isPreviewMode ? link.href : '#'}
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={(e) => {
                        if (!isPreviewMode) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Kontakt a newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{contactInfo.address}</span>
              </div>
            </div>

            {showNewsletter && (
              <div>
                <h4 className="text-sm font-semibold mb-2">{newsletterText}</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder={newsletterPlaceholder}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    disabled={!isPreviewMode}
                  />
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={!isPreviewMode}
                  >
                    Odeslat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
} 