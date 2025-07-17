import { AuthMessageProps } from './types'

export default function AuthMessage({ message, isSuccess }: AuthMessageProps) {
  if (!message) return null

  return (
    <div
      className={`mt-4 text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}
    >
      {message}
    </div>
  )
}
