// Shared button styles for auth components
export const woodButtonStyle = {
  backgroundImage: "url('/images/wood.png')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff8e1',
  textShadow: '0 1px 8px #181818, 0 1px 0 #b87333',
  boxShadow: '0 2px 12px #0006, 0 1px 0 #fff4 inset',
  borderWidth: '2px',
  borderColor: '#6b4f27',
}

// Helper function to format user display name
export const formatUserDisplayName = (user: { name?: string | null; email?: string | null }) => {
  return user.name || user.email || 'Unknown User'
}

// Helper function to get button text based on mode and loading state
export const getButtonText = (mode: 'login' | 'register', isLoading: boolean) => {
  if (isLoading) {
    return mode === 'register' ? 'Registruji...' : 'Přihlašuji...'
  }
  return mode === 'register' ? 'Registrovat' : 'Přihlásit se'
}

// Helper function to get toggle text based on current mode
export const getToggleText = (currentMode: 'login' | 'register') => {
  return currentMode === 'login'
    ? 'Nemáte účet? Registrujte se'
    : 'Máte účet? Přihlaste se'
}
