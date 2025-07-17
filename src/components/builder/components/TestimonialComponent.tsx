'use client'

import { Star } from 'lucide-react'

interface TestimonialComponentProps {
  props: Record<string, any>
  style: Record<string, any>
  isPreviewMode: boolean
}

export function TestimonialComponent({
  props,
  style,
  isPreviewMode,
}: TestimonialComponentProps) {
  const {
    text = 'Skvělá služba! Doporučuji všem.',
    author = 'Jan Novák',
    company = 'Společnost s.r.o.',
    rating = 5,
    avatar = '',
    position = 'CEO',
  } = props

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-current text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div
      className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg"
      style={style}
    >
      {/* Rating */}
      <div className="mb-4 flex justify-center">
        <div className="flex space-x-1">{renderStars(rating)}</div>
      </div>

      {/* Quote */}
      <blockquote className="mb-6 text-center text-lg italic text-gray-700">
        "{text}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-center">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="mr-4 h-12 w-12 rounded-full object-cover"
            onError={e => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        )}

        <div className="text-center">
          <div className="font-semibold text-gray-900">{author}</div>
          {position && <div className="text-sm text-gray-600">{position}</div>}
          {company && <div className="text-sm text-gray-500">{company}</div>}
        </div>
      </div>
    </div>
  )
}
