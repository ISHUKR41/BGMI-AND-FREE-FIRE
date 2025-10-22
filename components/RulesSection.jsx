'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Shield, AlertTriangle, Trophy, CreditCard, Ban, Info } from 'lucide-react'
import { RULES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function RulesSection({ gameType }) {
  const [activeSection, setActiveSection] = useState(null)
  const rules = RULES[gameType]

  const sections = [
    {
      id: 'general',
      title: 'General Rules',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      data: rules?.generalRules || [],
    },
    {
      id: 'solo',
      title: 'Solo Match Rules',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500/30',
      data: rules?.soloRules || [],
    },
    {
      id: 'duo',
      title: 'Duo Match Rules',
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
      data: rules?.duoRules || [],
    },
    {
      id: 'squad',
      title: 'Squad Match Rules',
      icon: Trophy,
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/30',
      data: rules?.squadRules || [],
    },
    {
      id: 'payment',
      title: 'Payment & Prize Rules',
      icon: CreditCard,
      color: 'from-yellow-500 to-orange-500',
      borderColor: 'border-yellow-500/30',
      data: rules?.paymentRules || [],
    },
    {
      id: 'disqualification',
      title: 'Disqualification Criteria',
      icon: Ban,
      color: 'from-red-500 to-pink-500',
      borderColor: 'border-red-500/30',
      data: rules?.disqualificationCriteria || [],
    },
  ]

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId)
  }

  if (!rules) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center border border-white/10">
        <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <p className="text-gray-400">Rules not available for this game type.</p>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={cn(
            "bg-gradient-to-r bg-clip-text text-transparent",
            gameType === 'bgmi' 
              ? "from-orange-400 to-red-400" 
              : "from-red-400 to-pink-400"
          )}>
            Tournament Rules
          </span>
        </motion.h2>
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Please read all rules carefully before participating in the tournament.
        </motion.p>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => {
          const Icon = section.icon
          const isActive = activeSection === section.id

          return (
            <motion.div
              key={section.id}
              className={cn(
                "glass-effect rounded-xl border overflow-hidden transition-all duration-300",
                section.borderColor,
                isActive ? "shadow-lg" : ""
              )}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    `bg-gradient-to-br ${section.color}/20`
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{section.title}</h3>
                    <p className="text-sm text-gray-400">
                      {section.data.length} rule{section.data.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 space-y-4">
                      {section.data.map((rule, ruleIndex) => (
                        <motion.div
                          key={ruleIndex}
                          className={cn(
                            "p-4 rounded-lg border",
                            `bg-gradient-to-r ${section.color}/10 ${section.borderColor}`
                          )}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * ruleIndex }}
                        >
                          {typeof rule === 'string' ? (
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-white/60 rounded-full flex-shrink-0 mt-2"></div>
                              <p className="text-gray-300 leading-relaxed">{rule}</p>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-3 h-3 bg-white/80 rounded-full flex-shrink-0"></div>
                                <h4 className="font-semibold text-white">{rule.title}</h4>
                              </div>
                              <p className="text-gray-300 leading-relaxed pl-5">{rule.description}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Important Notice */}
      <motion.div
        className={cn(
          "p-6 rounded-xl border",
          gameType === 'bgmi' 
            ? "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30"
            : "bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/30"
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start space-x-4">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            gameType === 'bgmi' 
              ? "bg-gradient-to-br from-orange-500/20 to-red-500/20"
              : "bg-gradient-to-br from-red-500/20 to-pink-500/20"
          )}>
            <Info className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h4 className="font-bold text-yellow-400 mb-2">Important Notice</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• By participating in this tournament, you agree to all the rules and regulations mentioned above.</p>
              <p>• Admin decisions are final and binding. No appeals will be entertained after match completion.</p>
              <p>• Prize distribution will be done within 24 hours of match completion to the team leader's registered account.</p>
              <p>• Any violation of fair play policy will result in immediate disqualification and permanent ban.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}