export interface AuthFormData {
  name: string
  email: string
  password: string
}

export interface AuthModalProps {
  mode?: 'login' | 'register'
  onClose?: () => void
}

export interface AuthFormProps {
  mode: 'login' | 'register'
  formData: AuthFormData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

export interface AuthMessageProps {
  message: string | null
  isSuccess: boolean
}

export interface GoogleSignInButtonProps {
  onSignIn: () => void
}

export interface AuthModeToggleProps {
  currentMode: 'login' | 'register'
  onToggle: () => void
}

export interface UserProfileProps {
  user: {
    name?: string | null
    email?: string | null
  }
  onSignOut: () => void
}
