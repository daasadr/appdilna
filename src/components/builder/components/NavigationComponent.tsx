'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationComponentProps {
  props: Record<string, any>
  style: Record<string, any>
  isPreviewMode: boolean
}

export function NavigationComponent({
  props,
  style,
  isPreviewMode,
}: NavigationComponentProps) {
  const {
    logo = 'Logo',
    logoImage = '',
    links = [
      { text: 'Domů', href: '/' },
      { text: 'O nás', href: '/o-nas' },
      { text: 'Služby', href: '/sluzby' },
      { text: 'Kontakt', href: '/kontakt' },
    ],
    ctaText = 'Začít',
    ctaLink = '#',
    transparent = false,
    sticky = false,
  } = props

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav
      className={`${transparent ? 'bg-transparent' : 'bg-white'} ${sticky ? 'sticky top-0 z-50' : ''} shadow-sm`}
      style={style}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
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
              <span className="text-xl font-bold text-gray-900">{logo}</span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={isPreviewMode ? link.href : '#'}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                  onClick={e => {
                    if (!isPreviewMode) {
                      e.preventDefault()
                    }
                  }}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href={isPreviewMode ? ctaLink : '#'}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              onClick={e => {
                if (!isPreviewMode) {
                  e.preventDefault()
                }
              }}
            >
              {ctaText}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 bg-white px-2 pb-3 pt-2 shadow-lg sm:px-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={isPreviewMode ? link.href : '#'}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:text-gray-900"
                onClick={e => {
                  if (!isPreviewMode) {
                    e.preventDefault()
                  }
                  setIsMobileMenuOpen(false)
                }}
              >
                {link.text}
              </a>
            ))}
            <div className="pt-4">
              <a
                href={isPreviewMode ? ctaLink : '#'}
                className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white transition-colors hover:bg-blue-700"
                onClick={e => {
                  if (!isPreviewMode) {
                    e.preventDefault()
                  }
                  setIsMobileMenuOpen(false)
                }}
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
