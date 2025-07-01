'use client';

import { Star } from 'lucide-react';

interface TestimonialComponentProps {
  props: Record<string, any>;
  style: Record<string, any>;
  isPreviewMode: boolean;
}

export function TestimonialComponent({ props, style, isPreviewMode }: TestimonialComponentProps) {
  const {
    text = 'Skvělá služba! Doporučuji všem.',
    author = 'Jan Novák',
    company = 'Společnost s.r.o.',
    rating = 5,
    avatar = '',
    position = 'CEO'
  } = props;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto" style={style}>
      {/* Rating */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-1">
          {renderStars(rating)}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-lg italic text-center mb-6">
        "{text}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-center">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full mr-4 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
        
        <div className="text-center">
          <div className="font-semibold text-gray-900">{author}</div>
          {position && (
            <div className="text-sm text-gray-600">{position}</div>
          )}
          {company && (
            <div className="text-sm text-gray-500">{company}</div>
          )}
        </div>
      </div>
    </div>
  );
} 