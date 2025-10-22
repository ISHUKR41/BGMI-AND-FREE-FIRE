import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

export async function GET() {
  try {
    await connectDB()
    
    return NextResponse.json({
      success: true,
      message: 'API is healthy',
      timestamp: new Date().toISOString(),
      status: 'OK',
      database: 'Connected',
      version: '1.0.0'
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'API health check failed',
        timestamp: new Date().toISOString(),
        status: 'ERROR',
        database: 'Disconnected',
        error: error.message
      },
      { status: 500 }
    )
  }
}