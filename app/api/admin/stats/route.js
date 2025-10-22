import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Registration from '@/models/Registration'
import Tournament from '@/models/Tournament'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request) {
  try {
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
    
    let matchFilter = {}
    if (gameType) matchFilter.gameType = gameType
    if (tournamentType) matchFilter.tournamentType = tournamentType
    
    // Get registration stats
    const registrationStats = await Registration.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])
    
    // Get tournament stats
    const tournamentStats = await Tournament.aggregate([
      { $match: { isActive: true, ...matchFilter } },
      {
        $group: {
          _id: null,
          totalSlots: { $sum: '$maxSlots' },
          totalApproved: { $sum: '$approvedCount' },
          totalPending: { $sum: '$pendingCount' },
          totalRejected: { $sum: '$rejectedCount' },
          activeTournaments: { $sum: 1 }
        }
      }
    ])
    
    // Get game-wise breakdown
    const gameBreakdown = await Registration.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: {
            gameType: '$gameType',
            tournamentType: '$tournamentType',
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            gameType: '$_id.gameType',
            tournamentType: '$_id.tournamentType'
          },
          statusCounts: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          },
          total: { $sum: '$count' }
        }
      }
    ])
    
    // Calculate totals
    const totalRegistrations = registrationStats.reduce((sum, stat) => sum + stat.count, 0)
    const approvedCount = registrationStats.find(stat => stat._id === 'approved')?.count || 0
    const pendingCount = registrationStats.find(stat => stat._id === 'pending')?.count || 0
    const rejectedCount = registrationStats.find(stat => stat._id === 'rejected')?.count || 0
    
    const tournamentStat = tournamentStats[0] || {}
    
    return NextResponse.json({
      success: true,
      stats: {
        totalRegistrations,
        approvedCount,
        pendingCount,
        rejectedCount,
        totalSlots: tournamentStat.totalSlots || 0,
        availableSlots: (tournamentStat.totalSlots || 0) - approvedCount,
        activeTournaments: tournamentStat.activeTournaments || 0,
        gameBreakdown,
        registrationStats,
        tournamentStats: tournamentStat
      }
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}