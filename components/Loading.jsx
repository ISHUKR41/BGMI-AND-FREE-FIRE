'use client'

import { motion } from 'framer-motion'
import { Loader, Gamepad2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Full Page Loading Component
export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Gamepad2 className="w-12 h-12 text-white" />
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.h2>

        {/* Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Loader className="w-8 h-8 mx-auto text-purple-400 animate-spin" />
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          className="flex justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Inline Loader Component
export function InlineLoader({ size = 'md', message, className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return (
    <div className={cn("flex items-center justify-center space-x-3", className)}>
      <Loader className={cn("animate-spin text-purple-400", sizes[size])} />
      {message && <span className="text-gray-300">{message}</span>}
    </div>
  )
}

// Skeleton Loader
export function SkeletonLoader({ className = '', variant = 'text' }) {
  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    circle: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full rounded-xl',
    button: 'h-12 w-32 rounded-lg',
  }

  return (
    <div
      className={cn(
        "bg-white/5 animate-pulse rounded",
        variants[variant],
        className
      )}
    />
  )
}

// Card Skeleton
export function CardSkeleton({ count = 1 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-effect rounded-xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center space-x-4">
            <SkeletonLoader variant="circle" />
            <div className="flex-1 space-y-2">
              <SkeletonLoader variant="title" className="w-1/2" />
              <SkeletonLoader variant="text" className="w-3/4" />
            </div>
          </div>
          <SkeletonLoader variant="text" />
          <SkeletonLoader variant="text" className="w-2/3" />
          <div className="flex space-x-2">
            <SkeletonLoader variant="button" />
            <SkeletonLoader variant="button" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Spinner Component
export function Spinner({ size = 'md', color = 'purple', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  }

  const colors = {
    purple: 'border-purple-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    white: 'border-white',
  }

  return (
    <div
      className={cn(
        "rounded-full border-t-transparent animate-spin",
        sizes[size],
        colors[color],
        className
      )}
    />
  )
}
