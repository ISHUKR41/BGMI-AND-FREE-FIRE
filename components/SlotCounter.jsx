'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SlotCounter({ available, total, isFull }) {
  const percentage = total > 0 ? ((total - available) / total) * 100 : 0
  const filled = total - available
  
  return (
    <motion.div
      className="glass-effect rounded-2xl p-8 border border-white/10 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              isFull
                ? "bg-gradient-to-br from-red-500/20 to-pink-500/20"
                : "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
            )}>
              <Users className={cn(
                "w-6 h-6",
                isFull ? "text-red-400" : "text-purple-400"
              )} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Slot Status</h3>
              <p className="text-sm text-gray-400">Live tournament slots</p>
            </div>
          </div>
          
          {isFull && (
            <motion.div
              className="px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <span className="text-sm font-semibold text-red-400">FULL</span>
            </motion.div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="h-4 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className={cn(
                "h-full rounded-full",
                isFull
                  ? "bg-gradient-to-r from-red-500 to-pink-500"
                  : percentage > 75
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          {/* Percentage label */}
          <div className="absolute -top-8 left-0 right-0 flex justify-between text-sm">
            <span className="text-gray-400">0%</span>
            <span className={cn(
              "font-semibold",
              isFull ? "text-red-400" : percentage > 75 ? "text-yellow-400" : "text-purple-400"
            )}>
              {percentage.toFixed(0)}% Filled
            </span>
            <span className="text-gray-400">100%</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-400">{filled}</div>
            <div className="text-xs text-gray-400 mt-1">Filled</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400">{available}</div>
            <div className="text-xs text-gray-400 mt-1">Available</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-400">{total}</div>
            <div className="text-xs text-gray-400 mt-1">Total</div>
          </motion.div>
        </div>

        {/* Status Message */}
        <motion.div
          className={cn(
            "mt-6 p-4 rounded-xl text-center",
            isFull
              ? "bg-red-500/10 border border-red-500/20"
              : available <= 5
              ? "bg-yellow-500/10 border border-yellow-500/20"
              : "bg-green-500/10 border border-green-500/20"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className={cn(
            "text-sm font-medium",
            isFull
              ? "text-red-400"
              : available <= 5
              ? "text-yellow-400"
              : "text-green-400"
          )}>
            {isFull
              ? "🔒 Tournament is currently full. Check back later!"
              : available <= 5
              ? `⚡ Only ${available} slot${available !== 1 ? 's' : ''} remaining! Register now!`
              : `✨ ${available} slot${available !== 1 ? 's' : ''} available. Register now!`
            }
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
