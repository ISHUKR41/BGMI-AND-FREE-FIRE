'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronUp, FileText, Headphones, HelpCircle, Mail, 
  MessageCircle, Phone, Share2, Trophy, Users
} from 'lucide-react'

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const actions = [
    {
      icon: HelpCircle,
      label: 'Support',
      color: 'from-blue-500 to-cyan-500',
      onClick: () => console.log('Support clicked')
    },
    {
      icon: MessageCircle,
      label: 'Live Chat',
      color: 'from-green-500 to-emerald-500',
      onClick: () => console.log('Chat clicked')
    },
    {
      icon: Phone,
      label: 'Contact',
      color: 'from-purple-500 to-pink-500',
      onClick: () => console.log('Contact clicked')
    },
    {
      icon: Trophy,
      label: 'Tournaments',
      color: 'from-yellow-500 to-orange-500',
      onClick: () => console.log('Tournaments clicked')
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col-reverse space-y-reverse space-y-3 mb-4"
          >
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={action.label}
                  variants={itemVariants}
                  onClick={action.onClick}
                  className="group relative flex items-center"
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Tooltip */}
                  <motion.div
                    className="absolute right-16 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {action.label}
                    <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-800 border-t-2 border-t-transparent border-b-2 border-b-transparent" />
                  </motion.div>

                  {/* Button */}
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center shadow-lg
                    bg-gradient-to-r ${action.color} hover:shadow-xl transition-all duration-300
                  `}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center group hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </motion.div>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Background overlay when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export function QuickActions() {
  const [activeAction, setActiveAction] = useState(null)

  const quickActions = [
    { icon: FileText, label: 'Rules', href: '#rules' },
    { icon: Users, label: 'Join Team', href: '#team' },
    { icon: Share2, label: 'Share', action: () => navigator.share?.({ title: 'Gaming Tournament' }) },
    { icon: Mail, label: 'Newsletter', href: '#newsletter' }
  ]

  return (
    <div className="fixed left-6 bottom-6 z-40">
      <div className="flex flex-col space-y-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.label}
              onClick={action.action}
              className="w-12 h-12 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-slate-700/90 transition-all duration-300 group"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setActiveAction(action.label)}
              onHoverEnd={() => setActiveAction(null)}
            >
              <Icon className="w-5 h-5 text-white group-hover:text-purple-400 transition-colors" />
              
              {/* Tooltip */}
              <AnimatePresence>
                {activeAction === action.label && (
                  <motion.div
                    className="absolute left-16 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {action.label}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-slate-800 border-t-2 border-t-transparent border-b-2 border-b-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}