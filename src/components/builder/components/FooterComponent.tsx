'use client'

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

interface FooterComponentProps {
  props: Record<string, any>
  style: Record<string, any>
  isPreviewMode: boolean
}

export function FooterComponent({
  props,
  style,
  isPreviewMode,
}: FooterComponentProps) {
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
          { text: 'Kariéra', href: '/kariera' },
        ],
      },
      {
        title: 'Služby',
        items: [
          { text: 'Webové aplikace', href: '/sluzby/webove-aplikace' },
          { text: 'E-commerce', href: '/sluzby/e-commerce' },
          { text: 'Konzultace', href: '/sluzby/konzultace' },
        ],
      },
      {
        title: 'Podpora',
        items: [
          { text: 'Kontakt', href: '/kontakt' },
          { text: 'FAQ', href: '/faq' },
          { text: 'Dokumentace', href: '/dokumentace' },
        ],
      },
    ],
    socialLinks = [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
    contactInfo = {
      email: 'info@spolecnost.cz',
      phone: '+420 123 456 789',
      address: 'Praha 1, Česká republika',
    },
    copyright = '© 2024 Vaše společnost. Všechna práva vyhrazena.',
    showNewsletter = true,
    newsletterText = 'Přihlaste se k odběru novinek',
    newsletterPlaceholder = 'Váš e-mail',
  } = props

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />
      case 'twitter':
        return <Twitter className="h-5 w-5" />
      case 'instagram':
        return <Instagram className="h-5 w-5" />
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />
      default:
        return null
    }
  }

  // Zjisti, zda je patička úplně prázdná
  const isEmpty =
    !props.showLogo &&
    !props.showDescription &&
    !props.showContact &&
    !props.showNewsletter &&
    !logo &&
    !logoImage &&
    !description &&
    (!Array.isArray(links) || links.length === 0) &&
    (!Array.isArray(socialLinks) || socialLinks.length === 0) &&
    !contactInfo?.email &&
    !contactInfo?.phone &&
    !contactInfo?.address &&
    !newsletterText &&
    !newsletterPlaceholder &&
    !copyright

  if (isEmpty) return null

  return (
    <footer className="bg-gray-900 text-white" style={style}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-wrap gap-8 overflow-x-auto md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* Logo a popis */}
          {(props.showLogo !== false || props.showDescription !== false) && (
            <div className="min-w-[220px] flex-shrink-0 lg:col-span-1">
              {props.showLogo !== false && logo && (
                <div className="mb-4">
                  {logoImage ? (
                    <img
                      src={logoImage}
                      alt={logo}
                      className="h-8 w-auto"
                      onError={e => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <span className="text-xl font-bold">{logo}</span>
                  )}
                </div>
              )}
              {props.showDescription !== false && description && (
                <p className="mb-6 break-words text-gray-400">{description}</p>
              )}
              {/* Sociální sítě */}
              {Array.isArray(socialLinks) && socialLinks.length > 0 && (
                <div className="mt-2 flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={isPreviewMode ? social.url : '#'}
                      className="text-gray-400 transition-colors hover:text-white"
                      onClick={e => {
                        if (!isPreviewMode) {
                          e.preventDefault()
                        }
                      }}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigační odkazy */}
          {Array.isArray(links) &&
            links.length > 0 &&
            links.map((section, index) => (
              <div key={index} className="min-w-[180px] flex-shrink-0">
                <h3 className="mb-4 break-words text-lg font-semibold">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((link, linkIndex) => (
                    <li key={linkIndex} className="break-words">
                      <a
                        href={isPreviewMode ? link.href : '#'}
                        className="text-gray-400 transition-colors hover:text-white"
                        onClick={e => {
                          if (!isPreviewMode) {
                            e.preventDefault()
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
          {(props.showContact !== false || props.showNewsletter !== false) && (
            <div className="min-w-[220px] flex-shrink-0">
              {props.showContact !== false &&
                (contactInfo?.email ||
                  contactInfo?.phone ||
                  contactInfo?.address) && (
                  <>
                    <h3 className="mb-4 text-lg font-semibold">Kontakt</h3>
                    <div className="mb-6 space-y-3">
                      {contactInfo?.email && (
                        <div className="flex items-center text-gray-400">
                          <Mail className="mr-2 h-4 w-4" />
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="transition-colors hover:text-white"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      )}
                      {contactInfo?.phone && (
                        <div className="flex items-center text-gray-400">
                          <Phone className="mr-2 h-4 w-4" />
                          <a
                            href={`tel:${contactInfo.phone}`}
                            className="transition-colors hover:text-white"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      )}
                      {contactInfo?.address && (
                        <div className="flex items-center text-gray-400">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{contactInfo.address}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              {props.showNewsletter !== false &&
                (newsletterText || newsletterPlaceholder) && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      {newsletterText}
                    </h4>
                    <div className="flex">
                      <input
                        type="email"
                        placeholder={newsletterPlaceholder}
                        className="flex-1 rounded-l-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isPreviewMode}
                      />
                      <button
                        className="rounded-r-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        disabled={!isPreviewMode}
                      >
                        Odeslat
                      </button>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Copyright */}
        {copyright && (
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="break-words text-sm text-gray-400">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  )
}
