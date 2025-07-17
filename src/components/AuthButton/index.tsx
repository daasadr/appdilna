'use client'

import { signOut, useSession } from 'next-auth/react'
import AuthForm from './AuthForm'
import AuthMessage from './AuthMessage'
import AuthModeToggle from './AuthModeToggle'
import GoogleSignInButton from './GoogleSignInButton'
import UserProfile from './UserProfile'
import { AuthModalProps } from './types'
import { useAuthForm } from './useAuthForm'

export default function AuthModal({ mode = 'login', onClose }: AuthModalProps) {
  const { data: session, status } = useSession()
  const {
    currentMode,
    formData,
    isLoading,
    message,
    isSuccess,
    handleInputChange,
    handleSubmit,
    switchMode,
    handleGoogleSignIn,
  } = useAuthForm(mode, onClose)

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center">
        <div className="text-copper">Načítání...</div>
      </div>
    )
  }

  if (session) {
    return <UserProfile user={session.user!} onSignOut={() => signOut()} />
  }

  return (
    <div>
      <h2 className="mb-6 text-center font-display text-2xl text-copper">
        {currentMode === 'register' ? 'Registrace' : 'Přihlášení'}
      </h2>

      <AuthForm
        mode={currentMode}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <AuthMessage message={message} isSuccess={isSuccess} />

      <AuthModeToggle currentMode={currentMode} onToggle={switchMode} />

      <GoogleSignInButton onSignIn={handleGoogleSignIn} />
    </div>
  )
}
