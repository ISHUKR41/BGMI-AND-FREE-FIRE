'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

// Animated Number Counter
export function AnimatedCounter({ value, duration = 2, delay = 0, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime - delay * 1000) / (duration * 1000), 1)

      if (progress > 0) {
        setCount(Math.floor(value * progress))
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, delay, isInView])

  return (
    <span ref={nodeRef}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Stat Card with Animated Counter
export function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  className = '',
  valueColor = 'text-white',
  iconColor = 'text-purple-400',
}) {
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={nodeRef}
      className={cn(
        "gaming-card rounded-xl p-6 relative overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>

      <div className="relative">
        {Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mb-4"
          >
            <Icon className={cn("w-8 h-8", iconColor)} />
          </motion.div>
        )}

        <motion.div
          className={cn("text-4xl font-bold mb-2", valueColor)}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} duration={2} delay={0.3} />
        </motion.div>

        <motion.div
          className="text-gray-400 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Prize Counter with Currency Animation
export function PrizeCounter({ amount, label, className = '' }) {
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true })

  return (
    <div ref={nodeRef} className={cn("text-center", className)}>
      <motion.div
        className="text-5xl font-bold text-yellow-400 mb-2"
        initial={{ scale: 0, rotate: -20 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
      >
        ₹<AnimatedCounter value={amount} duration={2.5} delay={0.3} />
      </motion.div>
      
      {label && (
        <motion.div
          className="text-gray-400 text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
        >
          {label}
        </motion.div>
      )}
    </div>
  )
}

// Progress Bar with Animation
export function AnimatedProgressBar({ 
  current, 
  max, 
  label, 
  showPercentage = true,
  className = '',
  barColor = 'from-purple-500 to-pink-500'
}) {
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true })
  const percentage = max > 0 ? (current / max) * 100 : 0

  return (
    <div ref={nodeRef} className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">{label}</span>
          {showPercentage && (
            <span className="font-semibold text-white">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}

      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", barColor)}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        />
      </div>

      {current !== undefined && max !== undefined && (
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{current.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}

// Slot Counter with Animation
export function SlotCounterAnimation({ available, total, className = '' }) {
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true })
  const filled = total - available

  return (
    <div ref={nodeRef} className={cn("flex items-center justify-center space-x-8", className)}>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-4xl font-bold text-red-400">
          <AnimatedCounter value={filled} duration={2} />
        </div>
        <div className="text-sm text-gray-400 mt-1">Filled</div>
      </motion.div>

      <motion.div
        className="text-6xl font-bold text-gray-600"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.4, type: 'spring' }}
      >
        /
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-4xl font-bold text-green-400">
          <AnimatedCounter value={available} duration={2} />
        </div>
        <div className="text-sm text-gray-400 mt-1">Available</div>
      </motion.div>
    </div>
  )
}
