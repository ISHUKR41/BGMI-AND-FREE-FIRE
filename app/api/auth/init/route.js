import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { hashPassword } from '@/lib/auth'

export async function POST() {
  try {
    await connectDB()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    
    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: 'Admin already exists',
        admin: {
          username: existingAdmin.username,
          email: existingAdmin.email,
        }
      })
    }
    
    // Create default admin
    const hashedPassword = await hashPassword('admin123')
    
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@tournament.com',
      password: hashedPassword,
      role: 'super_admin',
      permissions: [
        'view_registrations',
        'approve_registrations',
        'reject_registrations',
        'delete_registrations',
        'manage_tournaments',
        'upload_qr_codes',
        'reset_tournaments',
        'view_analytics',
        'manage_admins'
      ]
    })
    
    return NextResponse.json({
      success: true,
      message: 'Default admin created successfully',
      admin: {
        username: admin.username,
        email: admin.email,
      },
      credentials: {
        username: 'admin',
        password: 'admin123'
      }
    })
  } catch (error) {
    console.error('Init admin error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to initialize admin' },
      { status: 500 }
    )
  }
}