import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with fallback for missing env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo',
})

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'Only image files are allowed' },
        { status: 400 }
      )
    }
    
    // If Cloudinary is not properly configured, return a dummy URL
    if (process.env.NODE_ENV === 'development' && (
      !process.env.CLOUDINARY_CLOUD_NAME || 
      process.env.CLOUDINARY_CLOUD_NAME === 'demo'
    )) {
      // Create a base64 data URL for development
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const dataUrl = `data:${file.type};base64,${base64}`
      
      return NextResponse.json({
        success: true,
        message: 'File uploaded successfully (development mode)',
        url: dataUrl,
        publicId: `dev_${Date.now()}_${file.name}`,
      })
    }
    
    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'tournament-payments',
      resource_type: 'auto',
      quality: 'auto:good',
      format: 'webp',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    })
    
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: result.secure_url,
      publicId: result.public_id,
    })
  } catch (error) {
    console.error('Upload error:', error)
    
    // If Cloudinary fails, try to return base64 as fallback
    try {
      const formData = await request.formData()
      const file = formData.get('file')
      
      if (file) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        const dataUrl = `data:${file.type};base64,${base64}`
        
        return NextResponse.json({
          success: true,
          message: 'File uploaded successfully (fallback mode)',
          url: dataUrl,
          publicId: `fallback_${Date.now()}`,
        })
      }
    } catch (fallbackError) {
      console.error('Fallback upload error:', fallbackError)
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    )
  }
}