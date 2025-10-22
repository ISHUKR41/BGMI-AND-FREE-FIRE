import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import Admin from '@/models/Admin'

// This route is for initial admin setup only
// After first admin is created, this route should be disabled or protected
export async function POST(request) {
  try {
    await connectDB()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({})
    
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: 'Admin already exists' },
        { status: 400 }
      )
    }
    
    const { username, password } = await request.json()
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create admin
    const admin = await Admin.create({
      username,
      password: hashedPassword,
      role: 'admin',
    })
    
    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        username: admin.username,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Admin init error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

