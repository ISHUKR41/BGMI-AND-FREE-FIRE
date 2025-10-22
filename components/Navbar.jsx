'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Gamepad2, Home, Trophy, Shield, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'BGMI', href: '/bgmi', icon: Trophy },
    { name: 'Free Fire', href: '/freefire', icon: Zap },
    { name: 'Admin', href: '/admin', icon: Shield },
  ]

  const isActive = (href) => pathname === href

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "glass-effect border-b border-white/10 shadow-lg"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gamepad2 className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
                Gaming Tournaments
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      className={cn(
                        "px-6 py-3 rounded-xl font-medium transition-all relative group",
                        active
                          ? "text-white"
                          : "text-gray-300 hover:text-white"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-2 relative z-10">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>

                      {/* Active Indicator */}
                      {active && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
                          layoutId="activeTab"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      {/* Hover Effect */}
                      {!active && (
                        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden glass-effect border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-3">
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  const active = isActive(item.href)

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all",
                          active
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-transparent"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under the navbar */}
      <div className="h-20" />
    </>
  )
}
