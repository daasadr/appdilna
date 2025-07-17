import { GoogleSignInButtonProps } from './types'

export default function GoogleSignInButton({
  onSignIn,
}: GoogleSignInButtonProps) {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-copper/40"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white/90 px-2 text-copper">
            nebo pokračujte s
          </span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3">
        <button
          type="button"
          onClick={onSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-copper/40 px-4 py-2 hover:bg-gray-50"
        >
          <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
          Google
        </button>
      </div>
    </div>
  )
}
