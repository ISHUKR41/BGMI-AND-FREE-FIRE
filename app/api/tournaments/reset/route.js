import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tournament from '@/models/Tournament'
import Registration from '@/models/Registration'
import { isAuthenticated } from '@/lib/auth'

export async function POST(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await connectDB()
    
    const { gameType, tournamentType } = await request.json()
    
    if (!gameType || !tournamentType) {
      return NextResponse.json(
        { success: false, message: 'Game type and tournament type are required' },
        { status: 400 }
      )
    }
    
    // Delete all registrations for this tournament
    const deleteResult = await Registration.deleteMany({
      gameType,
      tournamentType,
    })
    
    // Reset tournament counts
    const tournament = await Tournament.findOne({ gameType, tournamentType })
    if (tournament) {
      tournament.registeredCount = 0
      tournament.approvedCount = 0
      tournament.pendingCount = 0
      tournament.rejectedCount = 0
      tournament.availableSlots = tournament.maxSlots
      tournament.isFull = false
      tournament.roomId = null
      tournament.roomPassword = null
      tournament.status = 'scheduled'
      await tournament.save()
    }
    
    return NextResponse.json({
      success: true,
      message: `Tournament reset successfully. Deleted ${deleteResult.deletedCount} registrations.`,
      tournament,
    })
  } catch (error) {
    console.error('Reset tournament error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to reset tournament' },
      { status: 500 }
    )
  }
}