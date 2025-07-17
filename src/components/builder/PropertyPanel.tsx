'use client'

import { useState } from 'react'
import { Component } from '@/types/builder'
import {
  Settings,
  Palette,
  Type,
  Layout,
  Eye,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
} from 'lucide-react'

interface PropertyPanelProps {
  component: Component
  onUpdate: (updates: Partial<Component>) => void
}

export function PropertyPanel({ component, onUpdate }: PropertyPanelProps) {
  const [activeTab, setActiveTab] = useState('content')

  const updateProps = (key: string, value: any) => {
    onUpdate({
      props: {
        ...component.props,
        [key]: value,
      },
    })
  }

  const updateStyle = (key: string, value: string) => {
    onUpdate({
      style: {
        ...component.style,
        [key]: value,
      },
    })
  }

  const renderContentTab = () => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Hlavní nadpis
              </label>
              <input
                type="text"
                value={component.props.title || ''}
                onChange={e => updateProps('title', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Podnadpis
              </label>
              <textarea
                value={component.props.subtitle || ''}
                onChange={e => updateProps('subtitle', e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Text tlačítka
              </label>
              <input
                type="text"
                value={component.props.buttonText || ''}
                onChange={e => updateProps('buttonText', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Odkaz tlačítka
              </label>
              <input
                type="text"
                value={component.props.buttonLink || ''}
                onChange={e => updateProps('buttonLink', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Varianta tlačítka
              </label>
              <select
                value={component.props.buttonVariant || 'primary'}
                onChange={e => updateProps('buttonVariant', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="primary">Primární</option>
                <option value="secondary">Sekundární</option>
                <option value="outline">Obrys</option>
              </select>
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nadpis
              </label>
              <input
                type="text"
                value={component.props.heading || ''}
                onChange={e => updateProps('heading', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Obsah
              </label>
              <textarea
                value={component.props.content || ''}
                onChange={e => updateProps('content', e.target.value)}
                rows={6}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Zarovnání
              </label>
              <select
                value={component.props.alignment || 'left'}
                onChange={e => updateProps('alignment', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="left">Vlevo</option>
                <option value="center">Na střed</option>
                <option value="right">Vpravo</option>
                <option value="justify">Do bloku</option>
              </select>
            </div>
          </div>
        )

      case 'footer':
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Logo (text)
              </label>
              <input
                type="text"
                value={component.props.logo || ''}
                onChange={e => updateProps('logo', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Popis
              </label>
              <textarea
                value={component.props.description || ''}
                onChange={e => updateProps('description', e.target.value)}
                rows={2}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Copyright
              </label>
              <input
                type="text"
                value={component.props.copyright || ''}
                onChange={e => updateProps('copyright', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                value={component.props.contactInfo?.email || ''}
                onChange={e =>
                  updateProps('contactInfo', {
                    ...component.props.contactInfo,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <input
                type="text"
                value={component.props.contactInfo?.phone || ''}
                onChange={e =>
                  updateProps('contactInfo', {
                    ...component.props.contactInfo,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Adresa
              </label>
              <input
                type="text"
                value={component.props.contactInfo?.address || ''}
                onChange={e =>
                  updateProps('contactInfo', {
                    ...component.props.contactInfo,
                    address: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Text newsletteru
              </label>
              <input
                type="text"
                value={component.props.newsletterText || ''}
                onChange={e => updateProps('newsletterText', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Placeholder newsletteru
              </label>
              <input
                type="text"
                value={component.props.newsletterPlaceholder || ''}
                onChange={e =>
                  updateProps('newsletterPlaceholder', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sekce odkazů
              </label>
              {(component.props.links || []).map(
                (section: any, sectionIdx: number) => (
                  <div
                    key={sectionIdx}
                    className="mb-4 rounded border bg-gray-50 p-2"
                  >
                    <input
                      type="text"
                      value={section.title || ''}
                      onChange={e => {
                        const newLinks = [...component.props.links]
                        newLinks[sectionIdx] = {
                          ...newLinks[sectionIdx],
                          title: e.target.value,
                        }
                        updateProps('links', newLinks)
                      }}
                      className="mb-2 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      placeholder="Název sekce"
                    />
                    {(section.items || []).map((item: any, itemIdx: number) => (
                      <div key={itemIdx} className="mb-1 flex gap-2">
                        <input
                          type="text"
                          value={item.text || ''}
                          onChange={e => {
                            const newLinks = [...component.props.links]
                            newLinks[sectionIdx].items[itemIdx] = {
                              ...item,
                              text: e.target.value,
                            }
                            updateProps('links', newLinks)
                          }}
                          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
                          placeholder="Text odkazu"
                        />
                        <input
                          type="text"
                          value={item.href || ''}
                          onChange={e => {
                            const newLinks = [...component.props.links]
                            newLinks[sectionIdx].items[itemIdx] = {
                              ...item,
                              href: e.target.value,
                            }
                            updateProps('links', newLinks)
                          }}
                          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
                          placeholder="URL"
                        />
                        <button
                          type="button"
                          className="px-2 text-xs text-red-500"
                          onClick={() => {
                            const newLinks = [...component.props.links]
                            newLinks[sectionIdx].items.splice(itemIdx, 1)
                            updateProps('links', newLinks)
                          }}
                          title="Smazat odkaz"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-1 text-xs text-blue-600"
                      onClick={() => {
                        const newLinks = [...component.props.links]
                        newLinks[sectionIdx].items.push({ text: '', href: '' })
                        updateProps('links', newLinks)
                      }}
                    >
                      + Přidat odkaz
                    </button>
                    <button
                      type="button"
                      className="ml-2 text-xs text-red-500"
                      onClick={() => {
                        const newLinks = [...component.props.links]
                        newLinks.splice(sectionIdx, 1)
                        updateProps('links', newLinks)
                      }}
                    >
                      Smazat sekci
                    </button>
                  </div>
                )
              )}
              <button
                type="button"
                className="text-xs text-blue-600"
                onClick={() => {
                  const newLinks = [...(component.props.links || [])]
                  newLinks.push({ title: '', items: [] })
                  updateProps('links', newLinks)
                }}
              >
                + Přidat sekci
              </button>
            </div>
            {/* Sociální sítě */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sociální sítě
              </label>
              {(component.props.socialLinks || []).map(
                (social: any, idx: number) => (
                  <div key={idx} className="mb-1 flex items-center gap-2">
                    <select
                      value={social.platform}
                      onChange={e => {
                        const newSocial = [...component.props.socialLinks]
                        newSocial[idx] = {
                          ...newSocial[idx],
                          platform: e.target.value,
                        }
                        updateProps('socialLinks', newSocial)
                      }}
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    >
                      <option value="facebook">Facebook</option>
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                    <input
                      type="text"
                      value={social.url || ''}
                      onChange={e => {
                        const newSocial = [...component.props.socialLinks]
                        newSocial[idx] = {
                          ...newSocial[idx],
                          url: e.target.value,
                        }
                        updateProps('socialLinks', newSocial)
                      }}
                      className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
                      placeholder="URL"
                    />
                    <button
                      type="button"
                      className="px-2 text-xs text-red-500"
                      onClick={() => {
                        const newSocial = [...component.props.socialLinks]
                        newSocial.splice(idx, 1)
                        updateProps('socialLinks', newSocial)
                      }}
                      title="Smazat sociální síť"
                    >
                      ✕
                    </button>
                  </div>
                )
              )}
              <button
                type="button"
                className="text-xs text-blue-600"
                onClick={() => {
                  const newSocial = [...(component.props.socialLinks || [])]
                  newSocial.push({ platform: 'facebook', url: '' })
                  updateProps('socialLinks', newSocial)
                }}
              >
                + Přidat sociální síť
              </button>
            </div>
            {/* Přepínače sekcí */}
            <div className="mt-2 flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={component.props.showLogo !== false}
                  onChange={e => updateProps('showLogo', e.target.checked)}
                />
                Zobrazit logo
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={component.props.showDescription !== false}
                  onChange={e =>
                    updateProps('showDescription', e.target.checked)
                  }
                />
                Zobrazit popis
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={component.props.showContact !== false}
                  onChange={e => updateProps('showContact', e.target.checked)}
                />
                Zobrazit kontakt
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={component.props.showNewsletter !== false}
                  onChange={e =>
                    updateProps('showNewsletter', e.target.checked)
                  }
                />
                Zobrazit newsletter
              </label>
            </div>
          </div>
        )

      default:
        return (
          <div className="py-8 text-center text-gray-500">
            <p>Nastavení pro tento typ komponenty zatím není k dispozici.</p>
          </div>
        )
    }
  }

  const renderStyleTab = () => (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Barva pozadí
        </label>
        <input
          type="color"
          value={component.style?.backgroundColor || '#ffffff'}
          onChange={e => updateStyle('backgroundColor', e.target.value)}
          className="h-10 w-full rounded-md border border-gray-300"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Barva textu
        </label>
        <input
          type="color"
          value={component.style?.color || '#000000'}
          onChange={e => updateStyle('color', e.target.value)}
          className="h-10 w-full rounded-md border border-gray-300"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Velikost písma
        </label>
        <input
          type="range"
          min="12"
          max="48"
          value={parseInt(component.style?.fontSize || '16')}
          onChange={e => updateStyle('fontSize', `${e.target.value}px`)}
          className="w-full"
        />
        <div className="text-center text-xs text-gray-500">
          {component.style?.fontSize || '16px'}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Odsazení
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Horní"
            value={parseInt(component.style?.paddingTop || '0')}
            onChange={e => updateStyle('paddingTop', `${e.target.value}px`)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Spodní"
            value={parseInt(component.style?.paddingBottom || '0')}
            onChange={e => updateStyle('paddingBottom', `${e.target.value}px`)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  )

  const renderResponsiveTab = () => (
    <div className="space-y-4">
      <div className="mb-4 flex items-center space-x-2">
        <Monitor className="h-4 w-4" />
        <span className="text-sm font-medium">Desktop</span>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <Tablet className="h-4 w-4" />
        <span className="text-sm font-medium">Tablet</span>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <Smartphone className="h-4 w-4" />
        <span className="text-sm font-medium">Mobil</span>
      </div>

      <div className="text-xs text-gray-500">
        Responsive nastavení budou přidána v další verzi.
      </div>
    </div>
  )

  const renderVisibilityTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Viditelné na desktopu</span>
        <button className="p-1">
          <Eye className="h-4 w-4 text-green-600" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Viditelné na tabletu</span>
        <button className="p-1">
          <Eye className="h-4 w-4 text-green-600" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Viditelné na mobilu</span>
        <button className="p-1">
          <Eye className="h-4 w-4 text-green-600" />
        </button>
      </div>
    </div>
  )

  const tabs = [
    { id: 'content', name: 'Obsah', icon: Type },
    { id: 'style', name: 'Styl', icon: Palette },
    { id: 'responsive', name: 'Responsive', icon: Layout },
    { id: 'visibility', name: 'Viditelnost', icon: Eye },
  ]

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800">Vlastnosti</h3>
        <p className="text-sm text-gray-600">{component.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center p-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <IconComponent className="mr-2 h-4 w-4" />
              {tab.name}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'style' && renderStyleTab()}
        {activeTab === 'responsive' && renderResponsiveTab()}
        {activeTab === 'visibility' && renderVisibilityTab()}
      </div>
    </div>
  )
}
