import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tournament from '@/models/Tournament'
import Registration from '@/models/Registration'
import { TOURNAMENT_CONFIG } from '@/lib/constants'
import { isAuthenticated, getTokenFromRequest, verifyToken } from '@/lib/auth'

// GET all tournaments with current slot counts
export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const gameType = searchParams.get('gameType')
    const tournamentType = searchParams.get('tournamentType')
    
    let query = { isActive: true }
    
    if (gameType) query.gameType = gameType
    if (tournamentType) query.tournamentType = tournamentType
    
    const tournaments = await Tournament.find(query)
    
    // Calculate current registration counts
    const tournamentsWithCounts = await Promise.all(
      tournaments.map(async (tournament) => {
        const approvedCount = await Registration.countDocuments({
          gameType: tournament.gameType,
          tournamentType: tournament.tournamentType,
          status: 'approved',
        })
        
        const pendingCount = await Registration.countDocuments({
          gameType: tournament.gameType,
          tournamentType: tournament.tournamentType,
          status: 'pending',
        })
        
        return {
          _id: tournament._id,
          gameType: tournament.gameType,
          tournamentType: tournament.tournamentType,
          maxSlots: tournament.maxSlots,
          approvedCount,
          pendingCount,
          availableSlots: tournament.maxSlots - approvedCount,
          isFull: approvedCount >= tournament.maxSlots,
          qrCodeUrl: tournament.qrCodeUrl,
          roomId: tournament.roomId,
          roomPassword: tournament.roomPassword,
          scheduledTime: tournament.scheduledTime,
        }
      })
    )
    
    return NextResponse.json({
      success: true,
      tournaments: tournamentsWithCounts,
    })
  } catch (error) {
    console.error('Get tournaments error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tournaments' },
      { status: 500 }
    )
  }
}

// PUT - Update tournament (admin only)
export async function PUT(request) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await connectDB()
    
    const { gameType, tournamentType, qrCodeUrl, roomId, roomPassword, scheduledTime } = await request.json()
    
    if (!gameType || !tournamentType) {
      return NextResponse.json(
        { success: false, message: 'Game type and tournament type are required' },
        { status: 400 }
      )
    }
    
    // Find or create tournament
    let tournament = await Tournament.findOne({ gameType, tournamentType })
    
    if (!tournament) {
      // Create new tournament
      const config = TOURNAMENT_CONFIG[gameType][tournamentType]
      tournament = await Tournament.create({
        gameType,
        tournamentType,
        maxSlots: config.maxSlots,
        qrCodeUrl: qrCodeUrl || '',
        roomId: roomId || '',
        roomPassword: roomPassword || '',
        scheduledTime: scheduledTime || null,
      })
    } else {
      // Update existing tournament
      if (qrCodeUrl !== undefined) tournament.qrCodeUrl = qrCodeUrl
      if (roomId !== undefined) tournament.roomId = roomId
      if (roomPassword !== undefined) tournament.roomPassword = roomPassword
      if (scheduledTime !== undefined) tournament.scheduledTime = scheduledTime
      await tournament.save()
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tournament updated successfully',
      tournament,
    })
  } catch (error) {
    console.error('Update tournament error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update tournament' },
      { status: 500 }
    )
  }
}

