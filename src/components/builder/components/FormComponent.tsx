'use client';

import { useState } from 'react';

interface FormComponentProps {
  props: Record<string, any>;
  style: Record<string, any>;
  isPreviewMode: boolean;
}

export function FormComponent({ props, style, isPreviewMode }: FormComponentProps) {
  const {
    title = 'Kontaktujte nás',
    fields = ['name', 'email', 'message'],
    submitText = 'Odeslat',
    submitUrl = '/api/contact',
    successMessage = 'Děkujeme za zprávu!',
    errorMessage = 'Došlo k chybě. Zkuste to prosím znovu.'
  } = props;

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPreviewMode) {
      console.log('Formulář by byl odeslán:', formData);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      name: 'Jméno',
      email: 'E-mail',
      phone: 'Telefon',
      message: 'Zpráva',
      subject: 'Předmět',
      company: 'Společnost'
    };
    return labels[field] || field;
  };

  const getFieldType = (field: string) => {
    const types: Record<string, string> = {
      email: 'email',
      phone: 'tel',
      message: 'textarea',
      default: 'text'
    };
    return types[field] || 'text';
  };

  const renderField = (field: string) => {
    const type = getFieldType(field);
    const label = getFieldLabel(field);
    const value = formData[field] || '';

    if (type === 'textarea') {
      return (
        <div key={field} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} *
          </label>
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Zadejte ${label.toLowerCase()}`}
            disabled={!isPreviewMode}
          />
        </div>
      );
    }

    return (
      <div key={field} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} *
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`Zadejte ${label.toLowerCase()}`}
          disabled={!isPreviewMode}
        />
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto" style={style}>
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(renderField)}
        
        <button
          type="submit"
          disabled={!isPreviewMode || isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Odesílám...' : submitText}
        </button>
      </form>

      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      {!isPreviewMode && (
        <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600">
          <p className="font-medium mb-1">Náhled formuláře</p>
          <p>Ve skutečné aplikaci by se formulář odesílal na: {submitUrl}</p>
        </div>
      )}
    </div>
  );
} 