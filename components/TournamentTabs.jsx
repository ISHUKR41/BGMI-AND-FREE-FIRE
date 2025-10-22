'use client'

import { useState, useEffect } from 'react'
import { Users, UserSquare, UsersRound } from 'lucide-react'
import SlotCounter from './SlotCounter'
import PriceCard from './PriceCard'
import RegistrationForm from './RegistrationForm'
import { TOURNAMENT_CONFIG } from '@/lib/constants'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function TournamentTabs({ gameType }) {
  const [activeTab, setActiveTab] = useState('solo')
  const [tournaments, setTournaments] = useState({})
  const [loading, setLoading] = useState(true)
  
  const tabs = [
    { id: 'solo', name: 'Solo', icon: Users },
    { id: 'duo', name: 'Duo', icon: UserSquare },
    { id: 'squad', name: 'Squad', icon: UsersRound },
  ]
  
  useEffect(() => {
    fetchTournaments()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchTournaments, 30000)
    
    return () => clearInterval(interval)
  }, [gameType])
  
  const fetchTournaments = async () => {
    try {
      const response = await axios.get(`/api/tournaments?gameType=${gameType}`)
      
      if (response.data.success) {
        const tournamentsMap = {}
        response.data.tournaments.forEach(tournament => {
          tournamentsMap[tournament.tournamentType] = tournament
        })
        setTournaments(tournamentsMap)
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error)
      // Don't show error toast on initial load
    } finally {
      setLoading(false)
    }
  }
  
  const currentTournament = tournaments[activeTab]
  const config = TOURNAMENT_CONFIG[gameType][activeTab]
  
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const tournament = tournaments[tab.id]
          const isFull = tournament?.isFull || false
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? gameType === 'bgmi'
                    ? 'bg-gradient-bgmi text-white shadow-lg shadow-orange-500/50'
                    : 'bg-gradient-freefire text-white shadow-lg shadow-red-500/50'
                  : 'glass-effect text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </div>
              {tournament && (
                <div className="text-xs mt-2 opacity-90">
                  {isFull ? (
                    <span className="text-red-200">FULL</span>
                  ) : (
                    <span>{tournament.availableSlots}/{tournament.maxSlots} Available</span>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>
      
      {loading ? (
        <div className="glass-effect rounded-xl p-12 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading tournament data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <SlotCounter
              available={currentTournament?.availableSlots || config.maxSlots}
              total={config.maxSlots}
              isFull={currentTournament?.isFull || false}
            />
            <PriceCard config={config} tournamentType={activeTab} />
          </div>
          
          {/* Right Column */}
          <div>
            <RegistrationForm
              gameType={gameType}
              tournamentType={activeTab}
              config={config}
              qrCodeUrl={currentTournament?.qrCodeUrl}
              isFull={currentTournament?.isFull || false}
            />
          </div>
        </div>
      )}
    </div>
  )
}

