'use client';

import { 
  Save, 
  Eye, 
  EyeOff, 
  Monitor, 
  Tablet, 
  Smartphone,
  Undo,
  Redo,
  Settings,
  Download,
  Share2
} from 'lucide-react';
import { ViewMode } from '@/types/builder';

interface ToolbarProps {
  appName: string;
  onSave: () => void;
  onPreview: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isPreviewMode: boolean;
}

export function Toolbar({
  appName,
  onSave,
  onPreview,
  viewMode,
  onViewModeChange,
  isPreviewMode
}: ToolbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{appName}</h1>
            <p className="text-sm text-gray-500">Builder</p>
          </div>
          
          <div className="h-6 w-px bg-gray-300" />
          
          {/* View Mode Controls */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('desktop')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'desktop' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
              title="Desktop náhled"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('tablet')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'tablet' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
              title="Tablet náhled"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('mobile')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'mobile' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
              title="Mobilní náhled"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <button
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            title="Zpět"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            title="Znovu"
          >
            <Redo className="w-4 h-4" />
          </button>
          
          <div className="h-6 w-px bg-gray-300" />
          
          {/* Preview Toggle */}
          <button
            onClick={onPreview}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isPreviewMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span className="text-sm font-medium">Ukončit náhled</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Náhled</span>
              </>
            )}
          </button>
          
          <div className="h-6 w-px bg-gray-300" />
          
          {/* Save */}
          <button
            onClick={onSave}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Uložit</span>
          </button>
          
          {/* More Actions */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 