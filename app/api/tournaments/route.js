import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tournament from '@/models/Tournament'
import Registration from '@/models/Registration'
import { TOURNAMENT_CONFIG } from '@/lib/constants'
import { isAuthenticated } from '@/lib/auth'

// GET all tournaments
export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const gameType = searchParams.get('gameType')
    
    let query = { isActive: true }
    if (gameType) query.gameType = gameType
    
    // Initialize tournaments if they don't exist
    for (const gType of ['bgmi', 'freefire']) {
      for (const tType of ['solo', 'duo', 'squad']) {
        const existing = await Tournament.findOne({ gameType: gType, tournamentType: tType })
        if (!existing) {
          const config = TOURNAMENT_CONFIG[gType][tType]
          await Tournament.create({
            gameType: gType,
            tournamentType: tType,
            maxSlots: config.maxSlots,
            entryFee: config.entryFee,
            winnerPrize: config.winnerPrize,
            runnerUpPrize: config.runnerUpPrize,
            perKillReward: config.perKill,
          })
        }
      }
    }
    
    const tournaments = await Tournament.find(query).sort({ gameType: 1, tournamentType: 1 })
    
    // Update counts for each tournament
    for (let tournament of tournaments) {
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
      
      const rejectedCount = await Registration.countDocuments({
        gameType: tournament.gameType,
        tournamentType: tournament.tournamentType,
        status: 'rejected',
      })
      
      const totalCount = await Registration.countDocuments({
        gameType: tournament.gameType,
        tournamentType: tournament.tournamentType,
      })
      
      tournament.approvedCount = approvedCount
      tournament.pendingCount = pendingCount
      tournament.rejectedCount = rejectedCount
      tournament.registeredCount = totalCount
      tournament.availableSlots = Math.max(0, tournament.maxSlots - approvedCount)
      tournament.isFull = approvedCount >= tournament.maxSlots
      
      await tournament.save()
    }
    
    return NextResponse.json({
      success: true,
      tournaments,
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
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await connectDB()
    
    const { gameType, tournamentType, qrCodeUrl, roomId, roomPassword, startTime, endTime } = await request.json()
    
    if (!gameType || !tournamentType) {
      return NextResponse.json(
        { success: false, message: 'Game type and tournament type are required' },
        { status: 400 }
      )
    }
    
    let tournament = await Tournament.findOne({ gameType, tournamentType })
    
    if (!tournament) {
      const config = TOURNAMENT_CONFIG[gameType]?.[tournamentType]
      if (!config) {
        return NextResponse.json(
          { success: false, message: 'Invalid tournament configuration' },
          { status: 400 }
        )
      }
      
      tournament = await Tournament.create({
        gameType,
        tournamentType,
        maxSlots: config.maxSlots,
        entryFee: config.entryFee,
        winnerPrize: config.winnerPrize,
        runnerUpPrize: config.runnerUpPrize,
        perKillReward: config.perKill,
      })
    }
    
    // Update fields
    if (qrCodeUrl !== undefined) tournament.qrCodeUrl = qrCodeUrl
    if (roomId !== undefined) tournament.roomId = roomId
    if (roomPassword !== undefined) tournament.roomPassword = roomPassword
    if (startTime) tournament.startTime = new Date(startTime)
    if (endTime) tournament.endTime = new Date(endTime)
    
    await tournament.save()
    
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