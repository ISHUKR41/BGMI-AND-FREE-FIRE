'use client'

import { Trophy, Medal, Target, IndianRupee } from 'lucide-react'

export default function PriceCard({ config, tournamentType }) {
  return (
    <div className="glass-effect rounded-xl p-6 border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold capitalize">{tournamentType} Prize Pool</h3>
        <div className="px-4 py-2 bg-gradient-gaming rounded-lg">
          <div className="flex items-center space-x-1">
            <IndianRupee className="w-5 h-5" />
            <span className="text-lg font-bold">{config.entryFee}</span>
          </div>
          <p className="text-xs text-gray-300">Entry Fee</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
          <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
          <p className="text-sm text-gray-300">Winner</p>
          <div className="flex items-center space-x-1 mt-1">
            <IndianRupee className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">{config.winnerPrize}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-lg p-4 border border-gray-400/30">
          <Medal className="w-8 h-8 text-gray-300 mb-2" />
          <p className="text-sm text-gray-300">Runner Up</p>
          <div className="flex items-center space-x-1 mt-1">
            <IndianRupee className="w-5 h-5 text-gray-300" />
            <span className="text-2xl font-bold text-gray-300">{config.runnerUpPrize}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
          <Target className="w-8 h-8 text-purple-400 mb-2" />
          <p className="text-sm text-gray-300">Per Kill</p>
          <div className="flex items-center space-x-1 mt-1">
            <IndianRupee className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">{config.perKill}</span>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Max Players/Teams:</span>
          <span className="font-semibold text-white">{config.maxSlots}</span>
        </div>
      </div>
    </div>
  )
}

