import { AuthModeToggleProps } from './types'
import { getToggleText } from './utils'

export default function AuthModeToggle({ currentMode, onToggle }: AuthModeToggleProps) {
  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        onClick={onToggle}
        className="text-copper hover:text-copper/80 underline"
      >
        {getToggleText(currentMode)}
      </button>
    </div>
  )
}
