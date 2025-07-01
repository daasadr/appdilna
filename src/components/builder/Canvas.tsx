'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Page, Component, ViewMode } from '@/types/builder';
import { ComponentRenderer } from './ComponentRenderer';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  EyeOff,
  Trash2,
  Copy,
  Move
} from 'lucide-react';

interface CanvasProps {
  page: Page;
  selectedComponent: Component | null;
  onComponentSelect: (component: Component | null) => void;
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void;
  onComponentDelete: (componentId: string) => void;
  viewMode: ViewMode;
  isPreviewMode: boolean;
}

function SortableComponent({ 
  component, 
  selectedComponent, 
  onComponentSelect, 
  onComponentUpdate, 
  onComponentDelete, 
  viewMode, 
  isPreviewMode 
}: {
  component: Component;
  selectedComponent: Component | null;
  onComponentSelect: (component: Component | null) => void;
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void;
  onComponentDelete: (componentId: string) => void;
  viewMode: ViewMode;
  isPreviewMode: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleComponentClick = (event: React.MouseEvent) => {
    if (isPreviewMode) return;
    
    event.stopPropagation();
    onComponentSelect(component);
  };

  const duplicateComponent = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newComponent: Component = {
      ...component,
      id: `component-${Date.now()}-${Math.random()}`,
      position: component.position + 1
    };
    onComponentUpdate(component.id, { position: component.position });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'z-50 opacity-50' : ''}`}
      onClick={handleComponentClick}
    >
      {/* Component Controls */}
      {!isPreviewMode && selectedComponent?.id === component.id && (
        <div className="absolute -top-2 -right-2 z-10 flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1">
          <button
            onClick={duplicateComponent}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Duplikovat"
          >
            <Copy className="w-3 h-3 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComponentDelete(component.id);
            }}
            className="p-1 hover:bg-red-100 rounded transition-colors"
            title="Smazat"
          >
            <Trash2 className="w-3 h-3 text-red-600" />
          </button>
        </div>
      )}

      {/* Component Selection Border */}
      <div
        className={`transition-all duration-200 ${
          selectedComponent?.id === component.id
            ? 'ring-2 ring-blue-500 ring-offset-2'
            : 'group-hover:ring-1 group-hover:ring-gray-300 group-hover:ring-offset-1'
        }`}
      >
        {/* Drag Handle */}
        {!isPreviewMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute -left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
          >
            <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
              <Move className="w-2 h-2 text-white" />
            </div>
          </div>
        )}

        {/* Component Renderer */}
        <ComponentRenderer
          component={component}
          isSelected={selectedComponent?.id === component.id}
          isPreviewMode={isPreviewMode}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}

export function Canvas({
  page,
  selectedComponent,
  onComponentSelect,
  onComponentUpdate,
  onComponentDelete,
  viewMode,
  isPreviewMode
}: CanvasProps) {
  const getViewModeStyles = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-6xl mx-auto';
    }
  };

  const handleCanvasClick = () => {
    if (isPreviewMode) return;
    onComponentSelect(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* View Mode Controls */}
      {!isPreviewMode && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Náhled:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => onComponentUpdate('viewMode', { viewMode: 'desktop' })}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'desktop' 
                      ? 'bg-white shadow-sm' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onComponentUpdate('viewMode', { viewMode: 'tablet' })}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'tablet' 
                      ? 'bg-white shadow-sm' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onComponentUpdate('viewMode', { viewMode: 'mobile' })}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'mobile' 
                      ? 'bg-white shadow-sm' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {page.components.length} komponent
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-4">
        <div
          className={`min-h-full bg-white rounded-lg shadow-sm border-2 border-gray-200 ${getViewModeStyles()}`}
          onClick={handleCanvasClick}
        >
          {/* Page Content */}
          <div className="p-4">
            {page.components.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Move className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Prázdná stránka</h3>
                <p className="text-sm text-center max-w-md">
                  Klikněte na komponenty v levém panelu a začněte budovat svou aplikaci
                </p>
              </div>
            ) : (
              page.components.map((component) => (
                <SortableComponent
                  key={component.id}
                  component={component}
                  selectedComponent={selectedComponent}
                  onComponentSelect={onComponentSelect}
                  onComponentUpdate={onComponentUpdate}
                  onComponentDelete={onComponentDelete}
                  viewMode={viewMode}
                  isPreviewMode={isPreviewMode}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 