import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Registration from '@/models/Registration'
import { isAuthenticated, getTokenFromRequest, verifyToken } from '@/lib/auth'

// PATCH - Update registration status (approve/reject) - Admin only
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
    
    if (!status || !['approved', 'rejected'].includes(status)) {
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
    
    // Check if already processed
    if (registration.status !== 'pending') {
      return NextResponse.json(
        { success: false, message: `Registration already ${registration.status}` },
        { status: 400 }
      )
    }
    
    // Get admin info from token
    const token = getTokenFromRequest(request)
    const decoded = verifyToken(token)
    
    // Update registration
    registration.status = status
    registration.approvedAt = new Date()
    registration.approvedBy = decoded.username
    
    if (status === 'rejected' && rejectionReason) {
      registration.rejectionReason = rejectionReason
    }
    
    await registration.save()
    
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

// DELETE - Delete registration (Admin only)
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
    
    const registration = await Registration.findByIdAndDelete(id)
    
    if (!registration) {
      return NextResponse.json(
        { success: false, message: 'Registration not found' },
        { status: 404 }
      )
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

