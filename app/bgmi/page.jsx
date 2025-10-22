'use client'

import Navbar from '@/components/Navbar'
import TournamentTabs from '@/components/TournamentTabs'
import RulesSection from '@/components/RulesSection'
import { GAME_INFO } from '@/lib/constants'
import { Gamepad2, Info } from 'lucide-react'

export default function BGMIPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-bgmi rounded-full text-sm font-semibold mb-4">
              <Gamepad2 className="w-4 h-4" />
              <span>BGMI Tournament</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-bgmi bg-clip-text text-transparent">
                {GAME_INFO.bgmi.fullName}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {GAME_INFO.bgmi.description}
            </p>
          </div>
          
          {/* Game Info */}
          <div className="glass-effect rounded-xl p-6 mb-8 border border-orange-500/20">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-3">About BGMI</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {GAME_INFO.bgmi.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-bgmi rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tournament Tabs */}
          <div className="mb-12">
            <TournamentTabs gameType="bgmi" />
          </div>
          
          {/* Rules Section */}
          <div className="mb-8">
            <RulesSection gameType="bgmi" />
          </div>
        </div>
      </div>
    </div>
  )
}

