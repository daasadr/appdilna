'use client';

import { useState } from 'react';
import { Component } from '@/types/builder';
import { 
  Settings, 
  Palette, 
  Type, 
  Layout, 
  Eye, 
  EyeOff,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';

interface PropertyPanelProps {
  component: Component;
  onUpdate: (updates: Partial<Component>) => void;
}

export function PropertyPanel({ component, onUpdate }: PropertyPanelProps) {
  const [activeTab, setActiveTab] = useState('content');

  const updateProps = (key: string, value: any) => {
    onUpdate({
      props: {
        ...component.props,
        [key]: value
      }
    });
  };

  const updateStyle = (key: string, value: string) => {
    onUpdate({
      style: {
        ...component.style,
        [key]: value
      }
    });
  };

  const renderContentTab = () => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hlavní nadpis
              </label>
              <input
                type="text"
                value={component.props.title || ''}
                onChange={(e) => updateProps('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Podnadpis
              </label>
              <textarea
                value={component.props.subtitle || ''}
                onChange={(e) => updateProps('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text tlačítka
              </label>
              <input
                type="text"
                value={component.props.buttonText || ''}
                onChange={(e) => updateProps('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Odkaz tlačítka
              </label>
              <input
                type="text"
                value={component.props.buttonLink || ''}
                onChange={(e) => updateProps('buttonLink', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Varianta tlačítka
              </label>
              <select
                value={component.props.buttonVariant || 'primary'}
                onChange={(e) => updateProps('buttonVariant', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="primary">Primární</option>
                <option value="secondary">Sekundární</option>
                <option value="outline">Obrys</option>
              </select>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nadpis
              </label>
              <input
                type="text"
                value={component.props.heading || ''}
                onChange={(e) => updateProps('heading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Obsah
              </label>
              <textarea
                value={component.props.content || ''}
                onChange={(e) => updateProps('content', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zarovnání
              </label>
              <select
                value={component.props.alignment || 'left'}
                onChange={(e) => updateProps('alignment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="left">Vlevo</option>
                <option value="center">Na střed</option>
                <option value="right">Vpravo</option>
                <option value="justify">Do bloku</option>
              </select>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>Nastavení pro tento typ komponenty zatím není k dispozici.</p>
          </div>
        );
    }
  };

  const renderStyleTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Barva pozadí
        </label>
        <input
          type="color"
          value={component.style?.backgroundColor || '#ffffff'}
          onChange={(e) => updateStyle('backgroundColor', e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-md"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Barva textu
        </label>
        <input
          type="color"
          value={component.style?.color || '#000000'}
          onChange={(e) => updateStyle('color', e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-md"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Velikost písma
        </label>
        <input
          type="range"
          min="12"
          max="48"
          value={parseInt(component.style?.fontSize || '16')}
          onChange={(e) => updateStyle('fontSize', `${e.target.value}px`)}
          className="w-full"
        />
        <div className="text-xs text-gray-500 text-center">
          {component.style?.fontSize || '16px'}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Odsazení
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Horní"
            value={parseInt(component.style?.paddingTop || '0')}
            onChange={(e) => updateStyle('paddingTop', `${e.target.value}px`)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="number"
            placeholder="Spodní"
            value={parseInt(component.style?.paddingBottom || '0')}
            onChange={(e) => updateStyle('paddingBottom', `${e.target.value}px`)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderResponsiveTab = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Monitor className="w-4 h-4" />
        <span className="text-sm font-medium">Desktop</span>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Tablet className="w-4 h-4" />
        <span className="text-sm font-medium">Tablet</span>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Smartphone className="w-4 h-4" />
        <span className="text-sm font-medium">Mobil</span>
      </div>
      
      <div className="text-xs text-gray-500">
        Responsive nastavení budou přidána v další verzi.
      </div>
    </div>
  );

  const renderVisibilityTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Viditelné na desktopu</span>
        <button className="p-1">
          <Eye className="w-4 h-4 text-green-600" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Viditelné na tabletu</span>
        <button className="p-1">
          <Eye className="w-4 h-4 text-green-600" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Viditelné na mobilu</span>
        <button className="p-1">
          <Eye className="w-4 h-4 text-green-600" />
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'content', name: 'Obsah', icon: Type },
    { id: 'style', name: 'Styl', icon: Palette },
    { id: 'responsive', name: 'Responsive', icon: Layout },
    { id: 'visibility', name: 'Viditelnost', icon: Eye }
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Vlastnosti</h3>
        <p className="text-sm text-gray-600">{component.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center p-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          );
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
  );
} 