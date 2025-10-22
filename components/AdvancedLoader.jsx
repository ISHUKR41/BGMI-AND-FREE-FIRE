'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Trophy, Zap, Target } from 'lucide-react'

export default function AdvancedLoader({ isVisible = true, message = "Loading..." }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  const iconVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  const dotVariants = {
    animate: {
      y: [-10, 10],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }

  const orbVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          {/* Background animated orbs */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={orbVariants}
                animate="animate"
                className="absolute w-32 h-32 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${
                    i % 3 === 0 
                      ? 'rgba(139, 92, 246, 0.3)' 
                      : i % 3 === 1 
                      ? 'rgba(236, 72, 153, 0.3)' 
                      : 'rgba(249, 115, 22, 0.3)'
                  }, transparent)`,
                  left: `${15 + i * 12}%`,
                  top: `${10 + i * 15}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Main loader content */}
          <div className="relative text-center space-y-8">
            {/* Main icon with rotating effect */}
            <motion.div
              variants={iconVariants}
              animate="animate"
              className="relative flex items-center justify-center"
            >
              {/* Outer ring */}
              <motion.div
                className="absolute w-24 h-24 border-2 border-purple-500/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute w-16 h-16 border-2 border-pink-500/50 rounded-full border-t-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner icon */}
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(139, 92, 246, 0.3)",
                    "0 0 40px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gamepad2 className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>

            {/* Animated icons around main loader */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[Trophy, Zap, Target].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-8 h-8 text-white/60"
                  animate={{
                    rotate: 360,
                    x: Math.cos((index * 120) * Math.PI / 180) * 60,
                    y: Math.sin((index * 120) * Math.PI / 180) * 60,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5
                  }}
                >
                  <Icon className="w-full h-full" />
                </motion.div>
              ))}
            </div>

            {/* Loading text */}
            <div className="space-y-4">
              <motion.h2
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {message}
              </motion.h2>

              {/* Animated dots */}
              <motion.div
                variants={dotsVariants}
                animate="animate"
                className="flex items-center justify-center space-x-2"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={dotVariants}
                    className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  />
                ))}
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{
                  x: ["-100%", "100%"],
                  scaleX: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Gaming-themed loading messages */}
            <motion.div
              className="text-sm text-gray-400"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span
                key={message}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Preparing your gaming experience...
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full border-2 border-purple-500/30 border-t-purple-500 rounded-full" />
    </motion.div>
  )
}

export function SkeletonCard() {
  return (
    <div className="glass-effect rounded-xl p-6 space-y-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-white/10 rounded-xl" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-white/10 rounded-lg w-3/4" />
          <div className="h-3 bg-white/5 rounded-lg w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-white/5 rounded-lg" />
        <div className="h-3 bg-white/5 rounded-lg w-5/6" />
        <div className="h-3 bg-white/5 rounded-lg w-4/6" />
      </div>
      <div className="flex space-x-2">
        <div className="h-8 bg-white/10 rounded-lg flex-1" />
        <div className="h-8 bg-white/10 rounded-lg w-24" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-4">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="glass-effect rounded-lg p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded-lg w-32" />
                <div className="h-3 bg-white/5 rounded-lg w-24" />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-20 h-8 bg-white/10 rounded-lg" />
              <div className="w-20 h-8 bg-white/10 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}