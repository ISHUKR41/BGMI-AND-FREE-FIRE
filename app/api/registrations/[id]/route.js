import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Registration from '@/models/Registration'
import Tournament from '@/models/Tournament'
import { isAuthenticated } from '@/lib/auth'

// PATCH - Update registration status (admin only)
export async function PATCH(request, { params }) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await connectDB()
    
    const { id } = params
    const { status, rejectionReason } = await request.json()
    
    if (!status || !['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      )
    }
    
    const registration = await Registration.findById(id)
    
    if (!registration) {
      return NextResponse.json(
        { success: false, message: 'Registration not found' },
        { status: 404 }
      )
    }
    
    const oldStatus = registration.status
    
    // Update registration status
    registration.status = status
    if (rejectionReason) {
      registration.rejectionReason = rejectionReason
    }
    if (status === 'approved') {
      registration.approvedAt = new Date()
    }
    
    await registration.save()
    
    // Update tournament counts
    const tournament = await Tournament.findOne({
      gameType: registration.gameType,
      tournamentType: registration.tournamentType,
    })
    
    if (tournament) {
      // Recalculate approved count
      const approvedCount = await Registration.countDocuments({
        gameType: registration.gameType,
        tournamentType: registration.tournamentType,
        status: 'approved',
      })
      
      tournament.approvedCount = approvedCount
      await tournament.save()
    }
    
    return NextResponse.json({
      success: true,
      message: `Registration ${status} successfully`,
      registration,
    })
  } catch (error) {
    console.error('Update registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update registration' },
      { status: 500 }
    )
  }
}

// DELETE - Delete registration (admin only)
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await connectDB()
    
    const { id } = params
    const registration = await Registration.findById(id)
    
    if (!registration) {
      return NextResponse.json(
        { success: false, message: 'Registration not found' },
        { status: 404 }
      )
    }
    
    const gameType = registration.gameType
    const tournamentType = registration.tournamentType
    
    await Registration.findByIdAndDelete(id)
    
    // Update tournament counts
    const tournament = await Tournament.findOne({ gameType, tournamentType })
    if (tournament) {
      const approvedCount = await Registration.countDocuments({
        gameType,
        tournamentType,
        status: 'approved',
      })
      
      const registeredCount = await Registration.countDocuments({
        gameType,
        tournamentType,
      })
      
      tournament.approvedCount = approvedCount
      tournament.registeredCount = registeredCount
      await tournament.save()
    }
    
    return NextResponse.json({
      success: true,
      message: 'Registration deleted successfully',
    })
  } catch (error) {
    console.error('Delete registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete registration' },
      { status: 500 }
    )
  }
}
// GET - Get single registration
export async function GET(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    const registration = await Registration.findById(id)
    
    if (!registration) {
      return NextResponse.json(
        { success: false, message: 'Registration not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      registration,
    })
  } catch (error) {
    console.error('Get registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch registration' },
      { status: 500 }
    )
  }
}

