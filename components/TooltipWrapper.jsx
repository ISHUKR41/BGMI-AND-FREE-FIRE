'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TooltipWrapper({ 
  children, 
  tooltip, 
  position = 'top',
  delay = 0.3,
  className = '' 
}) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900'
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setTimeout(() => setIsVisible(true), delay * 1000)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap
              ${positionClasses[position]}
            `}
          >
            {tooltip}
            <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function AdvancedTooltip({ 
  children, 
  content,
  title,
  position = 'top',
  theme = 'dark',
  showArrow = true,
  interactive = false,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState(null)

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setIsVisible(true), 300)
    setHoverTimeout(timeout)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    if (!interactive) setIsVisible(false)
  }

  const themeClasses = {
    dark: 'bg-gray-900 text-white border-gray-700',
    light: 'bg-white text-gray-900 border-gray-200 shadow-lg',
    primary: 'bg-purple-600 text-white border-purple-500',
    success: 'bg-green-600 text-white border-green-500',
    warning: 'bg-yellow-600 text-white border-yellow-500',
    error: 'bg-red-600 text-white border-red-500'
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
              absolute z-50 p-3 rounded-lg border backdrop-blur-sm max-w-xs
              ${themeClasses[theme]}
              ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
              ${position === 'left' ? 'right-full mr-2' : position === 'right' ? 'left-full ml-2' : 'left-1/2 transform -translate-x-1/2'}
            `}
            onMouseEnter={() => interactive && setIsVisible(true)}
            onMouseLeave={() => interactive && setIsVisible(false)}
          >
            {title && (
              <div className="font-semibold text-sm mb-1">{title}</div>
            )}
            <div className="text-sm leading-relaxed">{content}</div>
            
            {showArrow && (
              <div 
                className={`
                  absolute w-0 h-0 border-4
                  ${position === 'top' 
                    ? 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent' 
                    : 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent'
                  }
                  ${theme === 'dark' ? 'border-t-gray-900' : theme === 'light' ? 'border-t-white' : `border-t-${theme.split('-')[0]}-600`}
                `}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}