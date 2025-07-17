import { AuthFormProps } from './types'
import { getButtonText, woodButtonStyle } from './utils'

export default function AuthForm({
  mode,
  formData,
  onInputChange,
  onSubmit,
  isLoading,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'register' && (
        <div>
          <label htmlFor="name" className="mb-2 block text-copper">
            Jméno
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="w-full rounded-lg border border-copper/40 px-4 py-2 focus:border-copper focus:outline-none"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-2 block text-copper">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          className="w-full rounded-lg border border-copper/40 px-4 py-2 focus:border-copper focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-copper">
          Heslo
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
          className="w-full rounded-lg border border-copper/40 px-4 py-2 focus:border-copper focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full border border-copper/40 py-2 shadow-lg transition-transform duration-200 hover:scale-105"
        style={woodButtonStyle}
      >
        {getButtonText(mode, isLoading)}
      </button>
    </form>
  )
}
