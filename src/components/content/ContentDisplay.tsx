'use client';

import React from 'react';
import { ContentBlock } from '@/types/template';

interface ContentDisplayProps {
  content: ContentBlock;
  isEditable?: boolean;
  onEdit?: () => void;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({
  content,
  isEditable = false,
  onEdit,
}) => {
  const renderContent = () => {
    switch (content.type) {
      case 'text':
        return (
          <div className="prose max-w-none">
            {content.data.text}
          </div>
        );
      case 'image':
        return (
          <img
            src={content.data.url}
            alt={content.data.alt || ''}
            className="max-w-full h-auto"
          />
        );
      case 'video':
        return (
          <video
            src={content.data.url}
            controls
            className="max-w-full"
          />
        );
      case 'form':
        return (
          <div className="form-container">
            {/* Form rendering logic here */}
            <p>Form component - to be implemented</p>
          </div>
        );
      default:
        return <div>Nepodporovaný typ obsahu</div>;
    }
  };

  return (
    <div className="relative">
      {isEditable && (
        <button
          onClick={onEdit}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </button>
      )}
      <div className="content-wrapper">
        {renderContent()}
      </div>
    </div>
  );
}; 