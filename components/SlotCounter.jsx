'use client'

import { Users, TrendingUp } from 'lucide-react'

export default function SlotCounter({ available, total, isFull }) {
  const percentage = ((total - available) / total) * 100
  
  return (
    <div className="glass-effect rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Slot Availability</h3>
        </div>
        {isFull && (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
            Full
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Available Slots</span>
          <span className={`text-2xl font-bold ${isFull ? 'text-red-400' : 'text-green-400'}`}>
            {available}/{total}
          </span>
        </div>
        
        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isFull ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-gaming'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Filled: {percentage.toFixed(0)}%</span>
          <div className="flex items-center space-x-1 text-purple-400">
            <TrendingUp className="w-4 h-4" />
            <span>{total - available} Registered</span>
          </div>
        </div>
      </div>
    </div>
  )
}

