'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Target, IndianRupee, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PriceCard({ config, tournamentType }) {
  const prizeInfo = [
    {
      label: 'Entry Fee',
      value: config.entryFee,
      icon: IndianRupee,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      description: `per ${tournamentType}`,
    },
    {
      label: 'Winner Prize',
      value: config.winnerPrize,
      icon: Trophy,
      gradient: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-500/30',
      iconColor: 'text-yellow-400',
      description: '1st Place',
    },
    {
      label: 'Runner Up',
      value: config.runnerUpPrize,
      icon: Award,
      gradient: 'from-gray-500/20 to-slate-500/20',
      borderColor: 'border-gray-500/30',
      iconColor: 'text-gray-300',
      description: '2nd Place',
    },
    {
      label: 'Per Kill',
      value: config.perKill,
      icon: Target,
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      description: 'Each elimination',
    },
  ]

  return (
    <motion.div
      className="glass-effect rounded-2xl p-8 border border-white/10 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Prize Pool</h3>
            <p className="text-sm text-gray-400">Tournament rewards</p>
          </div>
        </div>

        {/* Prize Cards */}
        <div className="space-y-4">
          {prizeInfo.map((prize, index) => {
            const Icon = prize.icon
            return (
              <motion.div
                key={prize.label}
                className={cn(
                  "p-6 rounded-xl border relative overflow-hidden",
                  `bg-gradient-to-br ${prize.gradient}`,
                  prize.borderColor
                )}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                whileHover={{ scale: 1.02, translateX: 5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm",
                        `bg-gradient-to-br ${prize.gradient}`
                      )}>
                        <Icon className={cn("w-7 h-7", prize.iconColor)} />
                      </div>
                      
                      {/* Glow effect */}
                      <div className={cn(
                        "absolute inset-0 rounded-xl blur-lg opacity-50",
                        `bg-gradient-to-br ${prize.gradient}`
                      )}></div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-300 mb-1">{prize.label}</div>
                      <div className="text-xs text-gray-400">{prize.description}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <IndianRupee className={cn("w-6 h-6", prize.iconColor)} />
                      <span className={cn("text-3xl font-bold", prize.iconColor)}>
                        {prize.value}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              </motion.div>
            )
          })}
        </div>

        {/* Total Potential Earnings */}
        <motion.div
          className="mt-6 p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-xl border border-green-500/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-300">Max Potential Earnings</div>
                  <div className="text-xs text-gray-400">Winner + Kill rewards</div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <IndianRupee className="w-5 h-5 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">
                    {config.winnerPrize + (config.perKill * 15)}+
                  </span>
                </div>
                <div className="text-xs text-gray-400">Estimated</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-blue-300 text-center leading-relaxed">
            💡 <span className="font-semibold">Pro Tip:</span> Combine placement rewards with kill bonuses to maximize your earnings!
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
