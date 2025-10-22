'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Gamepad2, Trophy, Shield } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  
  const isActive = (path) => pathname === path
  
  // Don't show navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Trophy className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
            <span className="text-xl font-bold bg-gradient-gaming bg-clip-text text-transparent">
              Gaming Tournaments
            </span>
          </Link>
          
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link
              href="/"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                isActive('/')
                  ? 'bg-gradient-gaming text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              href="/bgmi"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                isActive('/bgmi')
                  ? 'bg-gradient-bgmi text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>BGMI</span>
            </Link>
            
            <Link
              href="/freefire"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                isActive('/freefire')
                  ? 'bg-gradient-freefire text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Free Fire</span>
            </Link>
            
            <Link
              href="/admin/login"
              className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-gray-300 hover:text-white hover:bg-white/10"
            >
              <span className="hidden sm:inline">Admin</span>
              <span className="sm:hidden">👤</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

