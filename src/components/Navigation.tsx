import Link from 'next/link'
import AuthButton from './AuthButton'

export default function Navigation() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-copper/20 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-display text-xl text-copper">
              Very App
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/pwa" className="text-copper hover:text-copper/80">
              O PWA
            </Link>
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
