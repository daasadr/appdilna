'use client'

import { Check, X } from 'lucide-react'

interface PricingComponentProps {
  props: Record<string, any>
  style: Record<string, any>
  isPreviewMode: boolean
}

export function PricingComponent({
  props,
  style,
  isPreviewMode,
}: PricingComponentProps) {
  const {
    plans = [
      {
        name: 'Základní',
        price: '299 Kč',
        period: 'měsíčně',
        features: ['Funkce 1', 'Funkce 2', 'Funkce 3'],
        popular: false,
        buttonText: 'Vybrat plán',
        buttonLink: '#',
      },
      {
        name: 'Profesionální',
        price: '599 Kč',
        period: 'měsíčně',
        features: ['Vše z Základního', 'Funkce 4', 'Funkce 5', 'Funkce 6'],
        popular: true,
        buttonText: 'Vybrat plán',
        buttonLink: '#',
      },
      {
        name: 'Enterprise',
        price: '999 Kč',
        period: 'měsíčně',
        features: ['Vše z Profesionálního', 'Funkce 7', 'Funkce 8', 'Funkce 9'],
        popular: false,
        buttonText: 'Kontaktovat',
        buttonLink: '#',
      },
    ],
    currency = 'Kč',
    showPeriod = true,
  } = props

  return (
    <div className="py-12" style={style}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Vyberte si svůj plán
          </h2>
          <p className="text-lg text-gray-600">
            Najděte perfektní řešení pro vaše potřeby
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg bg-white p-8 shadow-lg ${
                plan.popular
                  ? 'scale-105 transform ring-2 ring-blue-500'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                  <span className="rounded-full bg-blue-500 px-4 py-1 text-sm font-medium text-white">
                    Nejoblíbenější
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {showPeriod && (
                    <span className="ml-2 text-gray-600">/{plan.period}</span>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={isPreviewMode ? plan.buttonLink : '#'}
                  className={`block w-full rounded-lg px-6 py-3 text-center font-medium transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={e => {
                    if (!isPreviewMode) {
                      e.preventDefault()
                    }
                  }}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
