'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.status === 201) {
      setSuccess('Účet byl úspěšně vytvořen!');
      setTimeout(() => router.push('/'), 1500);
    } else if (response.status === 409) {
      setError('Uživatel s tímto emailem již existuje.');
    } else {
      setError('Nastala neočekávaná chyba, zkuste to prosím znovu.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
      <h2 className="text-2xl font-display text-copper mb-4 text-center">Registrace</h2>
      {error && <div className="text-red-600 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}
      <div>
        <label htmlFor="name" className="block mb-1">Jméno</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">Heslo</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
      </div>
      <button type="submit" className="w-full py-2 rounded-full bg-copper text-white font-bold hover:bg-copper/90 transition">Registrovat</button>
    </form>
  );
} 