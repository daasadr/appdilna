'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (response.status === 201) {
      setSuccess('Účet byl úspěšně vytvořen!')
      setTimeout(() => router.push('/'), 1500)
    } else if (response.status === 409) {
      setError('Uživatel s tímto emailem již existuje.')
    } else {
      setError('Nastala neočekávaná chyba, zkuste to prosím znovu.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow-md"
    >
      <h2 className="mb-4 text-center font-display text-2xl text-copper">
        Registrace
      </h2>
      {error && <div className="text-center text-red-600">{error}</div>}
      {success && <div className="text-center text-green-600">{success}</div>}
      <div>
        <label htmlFor="name" className="mb-1 block">
          Jméno
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block">
          Heslo
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-copper py-2 font-bold text-white transition hover:bg-copper/90"
      >
        Registrovat
      </button>
    </form>
  )
}
