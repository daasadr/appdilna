import { AuthFormProps } from './types'
import { getButtonText, woodButtonStyle } from './utils'

export default function AuthForm({ mode, formData, onInputChange, onSubmit, isLoading }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'register' && (
        <div>
          <label htmlFor="name" className="block text-copper mb-2">Jméno</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="w-full px-4 py-2 rounded-lg border border-copper/40 focus:outline-none focus:border-copper"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-copper mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          className="w-full px-4 py-2 rounded-lg border border-copper/40 focus:outline-none focus:border-copper"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-copper mb-2">Heslo</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
          className="w-full px-4 py-2 rounded-lg border border-copper/40 focus:outline-none focus:border-copper"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 rounded-full shadow-lg border border-copper/40 hover:scale-105 transition-transform duration-200"
        style={woodButtonStyle}
      >
        {getButtonText(mode, isLoading)}
      </button>
    </form>
  )
}
