import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { comparePassword, generateToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    await connectDB()
    
    const { username, password } = await request.json()
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      )
    }
    
    // Find admin by username
    const admin = await Admin.findOne({ username }).select('+password')
    
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isPasswordValid = await comparePassword(password, admin.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Update last login
    admin.lastLogin = new Date()
    await admin.save()
    
    // Generate JWT token
    const token = generateToken({
      id: admin._id,
      username: admin.username,
      role: admin.role,
    })
    
    // Set cookie
    const cookieStore = cookies()
    cookieStore.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    )
  }
}
