'use client'

import { useState } from 'react'

interface FormComponentProps {
  props: Record<string, any>
  style: Record<string, any>
  isPreviewMode: boolean
}

export function FormComponent({
  props,
  style,
  isPreviewMode,
}: FormComponentProps) {
  const {
    title,
    fields = ['name', 'email', 'message'],
    submitText,
    submitUrl = '/api/contact',
    successMessage = 'Děkujeme za zprávu!',
    errorMessage = 'Došlo k chybě. Zkuste to prosím znovu.',
  } = props

  // Explicitní kontrola pro zobrazení textu - prázdný string se zobrazí jako prázdno
  const displayTitle = title === undefined ? 'Kontaktujte nás' : title
  const displaySubmitText = submitText === undefined ? 'Odeslat' : submitText

  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPreviewMode) {
      console.log('Formulář by byl odeslán:', formData)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({})
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      name: 'Jméno',
      email: 'E-mail',
      phone: 'Telefon',
      message: 'Zpráva',
      subject: 'Předmět',
      company: 'Společnost',
    }
    return labels[field] || field
  }

  const getFieldType = (field: string) => {
    const types: Record<string, string> = {
      email: 'email',
      phone: 'tel',
      message: 'textarea',
      default: 'text',
    }
    return types[field] || 'text'
  }

  const renderField = (field: string) => {
    const type = getFieldType(field)
    const label = getFieldLabel(field)
    const value = formData[field] || ''

    if (type === 'textarea') {
      return (
        <div key={field} className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label} *
          </label>
          <textarea
            value={value}
            onChange={e => handleInputChange(field, e.target.value)}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Zadejte ${label.toLowerCase()}`}
            disabled={!isPreviewMode}
          />
        </div>
      )
    }

    return (
      <div key={field} className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label} *
        </label>
        <input
          type={type}
          value={value}
          onChange={e => handleInputChange(field, e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`Zadejte ${label.toLowerCase()}`}
          disabled={!isPreviewMode}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md" style={style}>
      <h2 className="mb-6 text-center text-2xl font-bold">{displayTitle}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(renderField)}

        <button
          type="submit"
          disabled={!isPreviewMode || isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Odesílám...' : displaySubmitText}
        </button>
      </form>

      {submitStatus === 'success' && (
        <div className="mt-4 rounded-md border border-green-400 bg-green-100 p-4 text-green-700">
          {successMessage}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 rounded-md border border-red-400 bg-red-100 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      {!isPreviewMode && (
        <div className="mt-4 rounded-md border border-gray-300 bg-gray-100 p-3 text-sm text-gray-600">
          <p className="mb-1 font-medium">Náhled formuláře</p>
          <p>Ve skutečné aplikaci by se formulář odesílal na: {submitUrl}</p>
        </div>
      )}
    </div>
  )
}
