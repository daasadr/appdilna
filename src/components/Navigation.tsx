import Link from 'next/link'
import AuthButton from './AuthButton'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-copper/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-copper font-display text-xl">
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