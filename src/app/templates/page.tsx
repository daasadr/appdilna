'use client';

import React, { useState } from 'react';
import { Template, TemplateType } from '@/types/template';

export default function TemplatesPage() {
  const [selectedType, setSelectedType] = useState<TemplateType>('prebuilt');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vytvořit novou aplikaci</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            selectedType === 'prebuilt'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
          onClick={() => setSelectedType('prebuilt')}
        >
          <h2 className="text-xl font-semibold mb-2">Předpřipravené šablony</h2>
          <p className="text-gray-600">
            Vyberte si z našich profesionálně navržených šablon a přizpůsobte si je podle svých potřeb.
            Ideální pro rychlé vytvoření aplikace.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              Rychlé nasazení
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              Profesionální design
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              Minimální technické znalosti
            </li>
          </ul>
        </div>

        <div
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            selectedType === 'custom'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
          onClick={() => setSelectedType('custom')}
        >
          <h2 className="text-xl font-semibold mb-2">Vlastní šablona</h2>
          <p className="text-gray-600">
            Vytvořte si aplikaci přesně podle svých představ. Začněte s prázdnou šablonou
            a postavte si vlastní strukturu pomocí našich komponent.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              Maximální flexibilita
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              Vlastní rozvržení
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              Pokročilé možnosti přizpůsobení
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {
            // Implementace přesměrování na další krok podle vybraného typu
            console.log(`Selected type: ${selectedType}`);
          }}
        >
          Pokračovat
        </button>
      </div>
    </div>
  );
} 