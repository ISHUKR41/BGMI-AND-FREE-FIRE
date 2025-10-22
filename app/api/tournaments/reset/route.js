import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tournament from '@/models/Tournament'
import Registration from '@/models/Registration'
import { isAuthenticated } from '@/lib/auth'

// Reset tournament (delete all registrations) - Admin only
export async function POST(request) {
  try {
    // Check authentication
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
    await Tournament.findOneAndUpdate(
      { gameType, tournamentType },
      {
        registeredCount: 0,
        approvedCount: 0,
      }
    )
    
    return NextResponse.json({
      success: true,
      message: `Tournament reset successfully. ${deleteResult.deletedCount} registrations deleted.`,
    })
  } catch (error) {
    console.error('Reset tournament error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to reset tournament' },
      { status: 500 }
    )
  }
}

