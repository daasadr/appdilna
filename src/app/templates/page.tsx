'use client'

import React, { useState } from 'react'
import { Template, TemplateType } from '@/types/template'

export default function TemplatesPage() {
  const [selectedType, setSelectedType] = useState<TemplateType>('prebuilt')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Vytvořit novou aplikaci</h1>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div
          className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
            selectedType === 'prebuilt'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
          onClick={() => setSelectedType('prebuilt')}
        >
          <h2 className="mb-2 text-xl font-semibold">Předpřipravené šablony</h2>
          <p className="text-gray-600">
            Vyberte si z našich profesionálně navržených šablon a přizpůsobte si
            je podle svých potřeb. Ideální pro rychlé vytvoření aplikace.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              <svg
                className="mr-2 h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              Rychlé nasazení
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="mr-2 h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              Profesionální design
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="mr-2 h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              Minimální technické znalosti
            </li>
          </ul>
        </div>

        <div
          className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
            selectedType === 'custom'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
          onClick={() => setSelectedType('custom')}
        >
          <h2 className="mb-2 text-xl font-semibold">Vlastní šablona</h2>
          <p className="text-gray-600">
            Vytvořte si aplikaci přesně podle svých představ. Začněte s prázdnou
            šablonou a postavte si vlastní strukturu pomocí našich komponent.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              <svg
                className="mr-2 h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              Maximální flexibilita
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="mr-2 h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              Vlastní rozvržení
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="mr-2 h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              Pokročilé možnosti přizpůsobení
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <button
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          onClick={() => {
            // Implementace přesměrování na další krok podle vybraného typu
            console.log(`Selected type: ${selectedType}`)
          }}
        >
          Pokračovat
        </button>
      </div>
    </div>
  )
}
