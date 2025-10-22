'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const NotificationTypes = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-400'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-400'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400'
  }
}

export default function AdvancedNotification({
  type = 'info',
  title,
  message,
  isVisible = false,
  onClose,
  duration = 5000,
  position = 'top-right'
}) {
  const [show, setShow] = useState(isVisible)
  
  const config = NotificationTypes[type]
  const Icon = config.icon

  useEffect(() => {
    setShow(isVisible)
    
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false)
        onClose?.()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const handleClose = () => {
    setShow(false)
    onClose?.()
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4', 
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed z-50 max-w-sm w-full ${positionClasses[position]}`}
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className={`
            glass-effect rounded-xl p-4 border backdrop-blur-md
            shadow-lg hover:shadow-xl transition-shadow duration-300
            ${config.bgColor} ${config.borderColor}
          `}>
            <div className="flex items-start space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
              >
                <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0`} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                {title && (
                  <motion.h4
                    className="text-sm font-semibold text-white mb-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {title}
                  </motion.h4>
                )}
                
                <motion.p
                  className="text-sm text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {message}
                </motion.p>
              </div>
              
              <motion.button
                onClick={handleClose}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </motion.button>
            </div>
            
            {/* Progress bar for timed notifications */}
            {duration > 0 && (
              <motion.div
                className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className={`h-full ${config.iconColor.replace('text-', 'bg-').replace('400', '500')}`}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: duration / 1000, ease: 'linear' }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function useAdvancedNotification() {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, notification.duration || 5000)
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return {
    notifications,
    addNotification,
    removeNotification
  }
}
