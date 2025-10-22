'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, CheckCircle, Info, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Confirm Modal Component
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary', // primary, danger, warning, success
  loading = false,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !loading) {
      onClose()
    }
  }

  const variantStyles = {
    primary: {
      icon: Info,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/20',
      buttonBg: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
    },
    danger: {
      icon: AlertTriangle,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/20',
      buttonBg: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-400',
      iconBg: 'bg-yellow-500/20',
      buttonBg: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-400',
      iconBg: 'bg-green-500/20',
      buttonBg: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    },
  }

  const style = variantStyles[variant] || variantStyles.primary
  const Icon = style.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onKeyDown={handleKeyDown}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!loading ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            className="relative glass-effect rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center", style.iconBg)}>
                <Icon className={cn("w-8 h-8", style.iconColor)} />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-300 leading-relaxed">{message}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
              
              <button
                onClick={onConfirm}
                disabled={loading}
                className={cn(
                  "flex-1 px-6 py-3 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2",
                  style.buttonBg
                )}
              >
                {loading && <Loader className="w-5 h-5 animate-spin" />}
                <span>{loading ? 'Processing...' : confirmText}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Image Modal Component
export function ImageModal({
  isOpen,
  onClose,
  src,
  alt = 'Image',
  title,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onKeyDown={handleKeyDown}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative max-w-5xl w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            {title && (
              <div className="absolute -top-12 left-0 text-white font-semibold text-lg">
                {title}
              </div>
            )}

            {/* Image */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              {src && (
                <Image
                  src={src}
                  alt={alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Generic Modal Component
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // sm, md, lg, xl, full
  showClose = true,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onKeyDown={handleKeyDown}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={cn(
              "relative glass-effect rounded-2xl p-8 w-full border border-white/10 shadow-2xl",
              sizeClasses[size]
            )}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Title */}
            {title && (
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
              </div>
            )}

            {/* Content */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
