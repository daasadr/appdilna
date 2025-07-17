import { UserProfileProps } from './types'
import { formatUserDisplayName, woodButtonStyle } from './utils'

export default function UserProfile({ user, onSignOut }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-copper">Jste přihlášen(a) jako {formatUserDisplayName(user)}</span>
      <button
        onClick={onSignOut}
        className="px-4 py-2 rounded-full shadow-lg border border-copper/40 hover:scale-105 transition-transform duration-200"
        style={woodButtonStyle}
      >
        Odhlásit se
      </button>
    </div>
  )
}
