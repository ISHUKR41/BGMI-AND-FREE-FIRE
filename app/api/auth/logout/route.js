import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = cookies()
    
    // Clear the admin token cookie
    cookieStore.set('adminToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/',
    })
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    )
  }
}