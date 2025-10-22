import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tournament from '@/models/Tournament'
import { TOURNAMENT_CONFIG } from '@/lib/constants'

export async function POST() {
  try {
    await connectDB()
    
    const tournaments = []
    
    // Initialize all tournament types for both games
    for (const gameType of ['bgmi', 'freefire']) {
      for (const tournamentType of ['solo', 'duo', 'squad']) {
        const config = TOURNAMENT_CONFIG[gameType][tournamentType]
        
        let tournament = await Tournament.findOne({ gameType, tournamentType })
        
        if (!tournament) {
          tournament = await Tournament.create({
            gameType,
            tournamentType,
            maxSlots: config.maxSlots,
            entryFee: config.entryFee,
            winnerPrize: config.winnerPrize,
            runnerUpPrize: config.runnerUpPrize,
            perKillReward: config.perKill,
            isActive: true,
          })
        }
        
        tournaments.push(tournament)
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tournaments initialized successfully',
      tournaments,
    })
  } catch (error) {
    console.error('Tournament initialization error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to initialize tournaments' },
      { status: 500 }
    )
  }
}