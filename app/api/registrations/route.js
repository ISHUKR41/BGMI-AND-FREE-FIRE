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

    // Enhanced validation
    const validationErrors = []

    // Required fields validation
    if (!gameType) validationErrors.push('Game type is required')
    if (!tournamentType) validationErrors.push('Tournament type is required')
    if (!teamLeader) validationErrors.push('Team leader information is required')
    if (!payment) validationErrors.push('Payment information is required')

    // Game type validation
    if (gameType && !['bgmi', 'freefire'].includes(gameType)) {
      validationErrors.push('Invalid game type. Must be either bgmi or freefire')
    }

    // Tournament type validation
    if (tournamentType && !['solo', 'duo', 'squad'].includes(tournamentType)) {
      validationErrors.push('Invalid tournament type. Must be solo, duo, or squad')
    }

    // Team leader validation
    if (teamLeader) {
      if (!teamLeader.name || teamLeader.name.trim().length < 2) {
        validationErrors.push('Team leader name must be at least 2 characters')
      }
      if (!teamLeader.gameId) {
        validationErrors.push('Team leader game ID is required')
      }
      if (!teamLeader.whatsapp || !/^[6-9]\d{9}$/.test(teamLeader.whatsapp)) {
        validationErrors.push('Valid WhatsApp number is required (10 digits starting with 6-9)')
      }

      // Game-specific ID validation
      if (teamLeader.gameId) {
        if (gameType === 'bgmi' && !/^\d{10}$/.test(teamLeader.gameId)) {
          validationErrors.push('BGMI ID must be exactly 10 digits')
        }
        if (gameType === 'freefire' && !/^\d{12}$/.test(teamLeader.gameId)) {
          validationErrors.push('Free Fire UID must be exactly 12 digits')
        }
      }
    }

    // Payment validation
    if (payment) {
      if (!payment.screenshot) {
        validationErrors.push('Payment screenshot is required')
      }
      if (!payment.transactionId || payment.transactionId.trim().length < 5) {
        validationErrors.push('Transaction ID must be at least 5 characters')
      }
    }

    // Player validation for duo/squad
    if (tournamentType === 'duo' && (!players || players.length !== 1)) {
      validationErrors.push('Duo tournament requires exactly 1 additional player')
    }

    if (tournamentType === 'squad' && (!players || players.length !== 3)) {
      validationErrors.push('Squad tournament requires exactly 3 additional players')
    }

    // Validate each player
    if (players && players.length > 0) {
      players.forEach((player, index) => {
        if (!player.name || player.name.trim().length < 2) {
          validationErrors.push(`Player ${index + 2} name must be at least 2 characters`)
        }
        if (!player.gameId) {
          validationErrors.push(`Player ${index + 2} game ID is required`)
        }

        // Game-specific ID validation for players
        if (player.gameId) {
          if (gameType === 'bgmi' && !/^\d{10}$/.test(player.gameId)) {
            validationErrors.push(`Player ${index + 2} BGMI ID must be exactly 10 digits`)
          }
          if (gameType === 'freefire' && !/^\d{12}$/.test(player.gameId)) {
            validationErrors.push(`Player ${index + 2} Free Fire UID must be exactly 12 digits`)
          }
        }
      })
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        },
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
        {
          success: false,
          message: 'Tournament is full',
          availableSlots: 0,
          maxSlots: config.maxSlots
        },
        { status: 400 }
      )
    }

    // Check for duplicate registration (same team leader game ID)
    const duplicateRegistration = await Registration.findOne({
      gameType,
      tournamentType,
      'teamLeader.gameId': teamLeader.gameId,
      status: { $in: ['pending', 'approved'] }
    })

    if (duplicateRegistration) {
      return NextResponse.json(
        {
          success: false,
          message: 'You have already registered for this tournament',
          registrationId: duplicateRegistration._id
        },
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

    // Ensure tournament exists and update counts
    let tournament = await Tournament.findOne({ gameType, tournamentType })
    if (!tournament) {
      tournament = await Tournament.create({
        gameType,
        tournamentType,
        maxSlots: config.maxSlots,
        registeredCount: 1,
        approvedCount: 0,
        isActive: true,
      })
    } else {
      tournament.registeredCount = tournament.registeredCount + 1
      await tournament.save()
    }

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully! Waiting for admin approval.',
      registration: {
        id: registration._id,
        teamName: registration.teamName,
        gameType: registration.gameType,
        tournamentType: registration.tournamentType,
        status: registration.status,
        submittedAt: registration.submittedAt
      },
      slotInfo: {
        availableSlots: config.maxSlots - approvedCount - 1, // -1 for current registration
        maxSlots: config.maxSlots,
        currentCount: approvedCount + 1
      }
    })
  } catch (error) {
    console.error('Create registration error:', error)

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Duplicate registration detected' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create registration', error: error.message },
      { status: 500 }
    )
  }
}

