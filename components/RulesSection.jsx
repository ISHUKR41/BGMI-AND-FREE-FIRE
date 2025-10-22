'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function RulesSection({ gameType }) {
  const [expandedSection, setExpandedSection] = useState('general')

  // Import rules based on gameType
  const rulesData = gameType === 'bgmi' ? require('@/lib/constants').RULES.bgmi : require('@/lib/constants').RULES.freefire

  const sections = [
    { id: 'general', label: '📋 General Rules', key: 'generalRules', color: 'blue' },
    { id: 'solo', label: '⚔️ Solo Tournament', key: 'soloRules', color: 'purple' },
    { id: 'duo', label: '👥 Duo Tournament', key: 'duoRules', color: 'green' },
    { id: 'squad', label: '🎯 Squad Tournament', key: 'squadRules', color: 'orange' },
    { id: 'payment', label: '💳 Payment & Refund Policy', key: 'paymentRules', color: 'yellow' },
    { id: 'disqualification', label: '⛔ Disqualification Criteria', key: 'disqualificationCriteria', color: 'red' },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-blue-500/30 bg-blue-500/5',
      purple: 'border-purple-500/30 bg-purple-500/5',
      green: 'border-green-500/30 bg-green-500/5',
      orange: 'border-orange-500/30 bg-orange-500/5',
      yellow: 'border-yellow-500/30 bg-yellow-500/5',
      red: 'border-red-500/30 bg-red-500/5',
    }
    return colors[color]
  }

  const getHeaderColor = (color) => {
    const colors = {
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      green: 'text-green-400',
      orange: 'text-orange-400',
      yellow: 'text-yellow-400',
      red: 'text-red-400',
    }
    return colors[color]
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Tournament Rules & Regulations
        </span>
      </h2>

      {/* Rules Accordion */}
      <div className="space-y-4">
        {sections.map((section) => {
          const content = rulesData[section.key]
          const isExpanded = expandedSection === section.id
          const colorClasses = getColorClasses(section.color)
          const headerColor = getHeaderColor(section.color)

          return (
            <div
              key={section.id}
              className={`glass-effect rounded-lg border transition-all duration-300 overflow-hidden ${colorClasses}`}
            >
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-opacity"
              >
                <span className={`text-lg font-bold ${headerColor}`}>
                  {section.label}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  } ${headerColor}`}
                />
              </button>

              {isExpanded && (
                <div className="px-6 py-4 border-t border-white/10 bg-black/20">
                  {section.key === 'generalRules' && (
                    <div className="space-y-4">
                      {content.map((rule, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="font-semibold text-white flex items-center space-x-2">
                            <span className="text-blue-400">✓</span>
                            <span>{rule.title}</span>
                          </h4>
                          <p className="text-gray-300 text-sm ml-6">{rule.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {(section.key === 'soloRules' || section.key === 'duoRules' || section.key === 'squadRules') && (
                    <div className="space-y-3">
                      {content.map((rule, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-purple-400 font-bold flex-shrink-0">{index + 1}.</span>
                          <div>
                            <h4 className="font-semibold text-white">{rule.title}</h4>
                            <p className="text-gray-300 text-sm">{rule.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.key === 'paymentRules' && (
                    <ul className="space-y-3">
                      {content.map((rule, index) => (
                        <li key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-yellow-400 font-bold flex-shrink-0">→</span>
                          <span className="text-gray-300 text-sm">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.key === 'disqualificationCriteria' && (
                    <ul className="space-y-3">
                      {content.map((criteria, index) => (
                        <li key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                          <span className="text-gray-300 text-sm">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Important Notice */}
      <div className="mt-8 glass-effect rounded-lg p-6 border border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-start space-x-4">
          <span className="text-3xl flex-shrink-0">⚠️</span>
          <div>
            <h4 className="font-bold text-yellow-400 mb-3 text-lg">Important Reminders</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Registration will be approved only after payment verification</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Match details (Room ID & Password) will be shared after approval</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Make sure all player details are correct before submission</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>WhatsApp number should be active for match communications</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Admin decisions are final and binding in all disputes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

