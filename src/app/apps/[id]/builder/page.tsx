'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { ComponentLibrary } from '@/components/builder/ComponentLibrary'
import { Canvas } from '@/components/builder/Canvas'
import { PropertyPanel } from '@/components/builder/PropertyPanel'
import { Toolbar } from '@/components/builder/Toolbar'
import { Component, Page, AppData } from '@/types/builder'
import { componentCategories } from '@/components/builder/ComponentLibrary'

export default function BuilderPage() {
  const params = useParams()
  const appId = params.id as string

  const [appData, setAppData] = useState<AppData | null>(null)
  const [currentPage, setCurrentPage] = useState<Page | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null
  )
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>(
    'desktop'
  )
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Načtení dat aplikace
  useEffect(() => {
    if (appId) {
      loadAppData(appId)
    }
  }, [appId])

  const loadAppData = async (id: string) => {
    try {
      const response = await fetch(`/api/apps/${id}`)
      const data = await response.json()
      setAppData(data)
      setCurrentPage(data.pages[0] || null)
    } catch (error) {
      console.error('Chyba při načítání aplikace:', error)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || !currentPage) return

    // Přesun komponenty na stránce
    if (active.id !== over.id) {
      const oldIndex = currentPage.components.findIndex(
        comp => comp.id === active.id
      )
      const newIndex = currentPage.components.findIndex(
        comp => comp.id === over.id
      )

      const newComponents = arrayMove(
        currentPage.components,
        oldIndex,
        newIndex
      )

      setCurrentPage({
        ...currentPage,
        components: newComponents,
      })
    }
  }

  const handleComponentDrop = (componentType: string, position: number) => {
    if (!currentPage) return

    const newComponent = createComponentFromType(componentType, position)
    const newComponents = [...currentPage.components]
    newComponents.splice(position, 0, newComponent)

    setCurrentPage({
      ...currentPage,
      components: newComponents,
    })
  }

  const createComponentFromType = (
    type: string,
    position: number
  ): Component => {
    const componentTypes: Record<string, any> = {
      hero: {
        name: 'Hero sekce',
        defaultProps: {
          title: 'Vítejte',
          subtitle: 'Vaše úžasná aplikace',
          buttonText: 'Začít',
          buttonLink: '#',
          buttonVariant: 'primary',
        },
      },
      text: {
        name: 'Text blok',
        defaultProps: {
          content: 'Zde napište svůj text...',
          heading: '',
          alignment: 'left',
        },
      },
      image: {
        name: 'Obrázek',
        defaultProps: {
          src: '/placeholder.jpg',
          alt: 'Obrázek',
          caption: '',
        },
      },
      button: {
        name: 'Tlačítko',
        defaultProps: {
          text: 'Klikněte zde',
          variant: 'primary',
          size: 'medium',
          link: '#',
        },
      },
      form: {
        name: 'Kontaktní formulář',
        defaultProps: {
          title: 'Kontaktujte nás',
          fields: ['name', 'email', 'message'],
          submitText: 'Odeslat',
        },
      },
      gallery: {
        name: 'Galerie',
        defaultProps: {
          images: [],
          columns: 3,
        },
      },
      testimonial: {
        name: 'Reference',
        defaultProps: {
          text: 'Skvělá služba!',
          author: 'Zákazník',
          company: 'Společnost s.r.o.',
          rating: 5,
        },
      },
      pricing: {
        name: 'Ceník',
        defaultProps: {
          plans: [
            {
              name: 'Základní',
              price: '299 Kč',
              features: ['Funkce 1', 'Funkce 2'],
              popular: false,
            },
          ],
        },
      },
    }

    // Pokud typ není v componentTypes, použij defaultProps z knihovny (prázdné)
    let componentType = componentTypes[type]
    let style = {}
    if (!componentType) {
      // Zkus najít v ComponentLibrary
      let found
      for (const cat of componentCategories) {
        found = cat.components.find((c: any) => c.id === type)
        if (found) break
      }
      if (found) {
        componentType = { name: found.name, defaultProps: found.defaultProps }
        style = found.defaultStyle || {}
      } else {
        componentType = { name: type, defaultProps: {} }
        style = {}
      }
    }
    return {
      id: `component-${Date.now()}-${Math.random()}`,
      type: type,
      name: componentType.name,
      props: componentType.defaultProps,
      position,
      style,
      children: [],
    }
  }

  const updateComponent = (
    componentId: string,
    updates: Partial<Component>
  ) => {
    if (!currentPage) return

    const newComponents = currentPage.components.map(comp =>
      comp.id === componentId ? { ...comp, ...updates } : comp
    )

    setCurrentPage({
      ...currentPage,
      components: newComponents,
    })
  }

  const deleteComponent = (componentId: string) => {
    if (!currentPage) return

    const newComponents = currentPage.components.filter(
      comp => comp.id !== componentId
    )
    setCurrentPage({
      ...currentPage,
      components: newComponents,
    })
    setSelectedComponent(null)
  }

  const saveApp = async () => {
    if (!appData || !currentPage) return

    try {
      await fetch(`/api/apps/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...appData,
          pages: appData.pages.map(page =>
            page.id === currentPage.id ? currentPage : page
          ),
        }),
      })

      // Zobrazit notifikaci o uložení
      console.log('Aplikace uložena')
    } catch (error) {
      console.error('Chyba při ukládání:', error)
    }
  }

  if (!appData || !currentPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Načítání...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Toolbar */}
      <Toolbar
        appName={appData.name}
        onSave={saveApp}
        onPreview={() => setIsPreviewMode(!isPreviewMode)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isPreviewMode={isPreviewMode}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Component Library */}
        {!isPreviewMode && (
          <div className="w-80 overflow-y-auto border-r border-gray-200 bg-white">
            <ComponentLibrary onComponentDrop={handleComponentDrop} />
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex flex-1 flex-col">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentPage.components.map(comp => comp.id)}
              strategy={verticalListSortingStrategy}
            >
              <Canvas
                page={currentPage}
                selectedComponent={selectedComponent}
                onComponentSelect={setSelectedComponent}
                onComponentUpdate={updateComponent}
                onComponentDelete={deleteComponent}
                viewMode={viewMode}
                isPreviewMode={isPreviewMode}
                onViewModeChange={setViewMode}
              />
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <div className="rounded-lg border-2 border-blue-500 bg-white p-4 shadow-lg">
                  Přesouvání komponenty...
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Property Panel */}
        {!isPreviewMode && selectedComponent && (
          <div className="w-80 overflow-y-auto border-l border-gray-200 bg-white">
            <PropertyPanel
              component={selectedComponent}
              onUpdate={updates => {
                updateComponent(selectedComponent.id, updates)
                setSelectedComponent(prev =>
                  prev ? { ...prev, ...updates } : prev
                )
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
