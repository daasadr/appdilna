'use client';

import { Check, X } from 'lucide-react';

interface PricingComponentProps {
  props: Record<string, any>;
  style: Record<string, any>;
  isPreviewMode: boolean;
}

export function PricingComponent({ props, style, isPreviewMode }: PricingComponentProps) {
  const {
    plans = [
      {
        name: 'Základní',
        price: '299 Kč',
        period: 'měsíčně',
        features: ['Funkce 1', 'Funkce 2', 'Funkce 3'],
        popular: false,
        buttonText: 'Vybrat plán',
        buttonLink: '#'
      },
      {
        name: 'Profesionální',
        price: '599 Kč',
        period: 'měsíčně',
        features: ['Vše z Základního', 'Funkce 4', 'Funkce 5', 'Funkce 6'],
        popular: true,
        buttonText: 'Vybrat plán',
        buttonLink: '#'
      },
      {
        name: 'Enterprise',
        price: '999 Kč',
        period: 'měsíčně',
        features: ['Vše z Profesionálního', 'Funkce 7', 'Funkce 8', 'Funkce 9'],
        popular: false,
        buttonText: 'Kontaktovat',
        buttonLink: '#'
      }
    ],
    currency = 'Kč',
    showPeriod = true
  } = props;

  return (
    <div className="py-12" style={style}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vyberte si svůj plán
          </h2>
          <p className="text-lg text-gray-600">
            Najděte perfektní řešení pro vaše potřeby
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-lg p-8 ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 transform scale-105' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Nejoblíbenější
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {showPeriod && (
                    <span className="text-gray-600 ml-2">
                      /{plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={isPreviewMode ? plan.buttonLink : '#'}
                  className={`block w-full py-3 px-6 rounded-lg font-medium text-center transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={(e) => {
                    if (!isPreviewMode) {
                      e.preventDefault();
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
  );
} 