'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Page, Component, ViewMode } from '@/types/builder'
import { ComponentRenderer } from './ComponentRenderer'
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  Move,
} from 'lucide-react'

interface CanvasProps {
  page: Page
  selectedComponent: Component | null
  onComponentSelect: (component: Component | null) => void
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void
  onComponentDelete: (componentId: string) => void
  viewMode: ViewMode
  isPreviewMode: boolean
}

function SortableComponent({
  component,
  selectedComponent,
  onComponentSelect,
  onComponentUpdate,
  onComponentDelete,
  viewMode,
  isPreviewMode,
}: {
  component: Component
  selectedComponent: Component | null
  onComponentSelect: (component: Component | null) => void
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void
  onComponentDelete: (componentId: string) => void
  viewMode: ViewMode
  isPreviewMode: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleComponentClick = (event: React.MouseEvent) => {
    if (isPreviewMode) return

    event.stopPropagation()
    onComponentSelect(component)
  }

  const duplicateComponent = (event: React.MouseEvent) => {
    event.stopPropagation()
    const newComponent: Component = {
      ...component,
      id: `component-${Date.now()}-${Math.random()}`,
      position: component.position + 1,
    }
    onComponentUpdate(component.id, { position: component.position })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative ${isDragging ? 'z-50 opacity-50' : ''}`}
      onClick={handleComponentClick}
    >
      {/* Component Controls */}
      {!isPreviewMode && selectedComponent?.id === component.id && (
        <div className="absolute -right-2 -top-2 z-10 flex items-center space-x-1 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          <button
            onClick={duplicateComponent}
            className="rounded p-1 transition-colors hover:bg-gray-100"
            title="Duplikovat"
          >
            <Copy className="h-3 w-3 text-gray-600" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation()
              onComponentDelete(component.id)
            }}
            className="rounded p-1 transition-colors hover:bg-red-100"
            title="Smazat"
          >
            <Trash2 className="h-3 w-3 text-red-600" />
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
            className="absolute -left-2 top-1/2 -translate-y-1/2 transform cursor-move opacity-0 transition-opacity group-hover:opacity-100"
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-600">
              <Move className="h-2 w-2 text-white" />
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
  )
}

export function Canvas({
  page,
  selectedComponent,
  onComponentSelect,
  onComponentUpdate,
  onComponentDelete,
  viewMode,
  isPreviewMode,
  onViewModeChange,
}: CanvasProps & { onViewModeChange: (mode: ViewMode) => void }) {
  const getViewModeStyles = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      default:
        return 'max-w-6xl mx-auto'
    }
  }

  const handleCanvasClick = () => {
    if (isPreviewMode) return
    onComponentSelect(null)
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-100">
      {/* View Mode Controls */}
      {!isPreviewMode && (
        <div className="border-b border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Náhled:</span>
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => onViewModeChange('desktop')}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === 'desktop'
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onViewModeChange('tablet')}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === 'tablet'
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onViewModeChange('mobile')}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === 'mobile'
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
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
          className={`min-h-full rounded-lg border-2 border-gray-200 bg-white shadow-sm ${getViewModeStyles()}`}
          onClick={handleCanvasClick}
          style={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          {/* Page Content */}
          <div className="p-4">
            {page.components.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Move className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Prázdná stránka</h3>
                <p className="max-w-md text-center text-sm">
                  Klikněte na komponenty v levém panelu a začněte budovat svou
                  aplikaci
                </p>
              </div>
            ) : (
              page.components.map(component => (
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
  )
}
