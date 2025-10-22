import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tournament from '@/models/Tournament'
import { TOURNAMENT_CONFIG } from '@/lib/constants'

// Initialize all tournament slots
export async function POST() {
  try {
    await connectDB()
    
    const tournamentTypes = ['solo', 'duo', 'squad']
    const gameTypes = ['bgmi', 'freefire']
    
    const tournaments = []
    
    for (const gameType of gameTypes) {
      for (const tournamentType of tournamentTypes) {
        // Check if tournament already exists
        const existing = await Tournament.findOne({ gameType, tournamentType })
        
        if (!existing) {
          const config = TOURNAMENT_CONFIG[gameType][tournamentType]
          const tournament = await Tournament.create({
            gameType,
            tournamentType,
            maxSlots: config.maxSlots,
            registeredCount: 0,
            approvedCount: 0,
            isActive: true,
          })
          tournaments.push(tournament)
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `${tournaments.length} tournaments initialized`,
      tournaments,
    })
  } catch (error) {
    console.error('Tournament init error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to initialize tournaments' },
      { status: 500 }
    )
  }
}

