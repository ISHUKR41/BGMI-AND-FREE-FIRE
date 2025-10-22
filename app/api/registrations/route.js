import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Registration from '@/models/Registration'
import Tournament from '@/models/Tournament'
import { TOURNAMENT_CONFIG } from '@/lib/constants'
import { isAuthenticated } from '@/lib/auth'

// GET all registrations (admin only, with filters)
export async function GET(request) {
  try {
    // Check authentication for admin
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const gameType = searchParams.get('gameType')
    const tournamentType = searchParams.get('tournamentType')
    const status = searchParams.get('status')
    
    let query = {}
    
    if (gameType) query.gameType = gameType
    if (tournamentType) query.tournamentType = tournamentType
    if (status) query.status = status
    
    const registrations = await Registration.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      registrations,
      count: registrations.length,
    })
  } catch (error) {
    console.error('Get registrations error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}

// POST - Create new registration
export async function POST(request) {
  try {
    await connectDB()
    
    const data = await request.json()
    
    const { gameType, tournamentType, teamName, teamLeader, players, payment } = data
    
    // Validate required fields
    if (!gameType || !tournamentType || !teamLeader || !payment) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Check if slots are available
    const approvedCount = await Registration.countDocuments({
      gameType,
      tournamentType,
      status: 'approved',
    })
    
    const config = TOURNAMENT_CONFIG[gameType][tournamentType]
    
    if (approvedCount >= config.maxSlots) {
      return NextResponse.json(
        { success: false, message: 'Tournament is full' },
        { status: 400 }
      )
    }
    
    // Validate player count
    const playerCount = players ? players.length + 1 : 1 // +1 for team leader
    
    if (tournamentType === 'solo' && playerCount !== 1) {
      return NextResponse.json(
        { success: false, message: 'Solo tournament requires exactly 1 player' },
        { status: 400 }
      )
    }
    
    if (tournamentType === 'duo' && playerCount !== 2) {
      return NextResponse.json(
        { success: false, message: 'Duo tournament requires exactly 2 players' },
        { status: 400 }
      )
    }
    
    if (tournamentType === 'squad' && playerCount !== 4) {
      return NextResponse.json(
        { success: false, message: 'Squad tournament requires exactly 4 players' },
        { status: 400 }
      )
    }
    
    // Create registration
    const registration = await Registration.create({
      gameType,
      tournamentType,
      teamName: teamName || `${teamLeader.name}'s Team`,
      teamLeader,
      players: players || [],
      payment,
      status: 'pending',
      submittedAt: new Date(),
    })
    
    // Ensure tournament exists
    let tournament = await Tournament.findOne({ gameType, tournamentType })
    if (!tournament) {
      tournament = await Tournament.create({
        gameType,
        tournamentType,
        maxSlots: config.maxSlots,
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully! Waiting for admin approval.',
      registration,
    })
  } catch (error) {
    console.error('Create registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create registration', error: error.message },
      { status: 500 }
    )
  }
}

