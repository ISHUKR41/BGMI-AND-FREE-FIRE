import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo',
})

// Upload image to Cloudinary
export async function uploadImage(file, folder = 'tournament-screenshots') {
  try {
    // Convert file to base64 if needed
    let fileData
    
    if (file instanceof Blob || file instanceof File) {
      const buffer = await file.arrayBuffer()
      const base64 = Buffer.from(buffer).toString('base64')
      fileData = `data:${file.type};base64,${base64}`
    } else if (typeof file === 'string') {
      fileData = file
    } else {
      throw new Error('Invalid file format')
    }
    
    const result = await cloudinary.uploader.upload(fileData, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 1200, crop: 'limit' },
      ],
    })
    
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return {
      success: false,
      error: error.message || 'Failed to upload image',
    }
  }
}

// Delete image from Cloudinary
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return {
      success: result.result === 'ok',
      result,
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Upload multiple images
export async function uploadMultipleImages(files, folder = 'tournament-screenshots') {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder))
    const results = await Promise.all(uploadPromises)
    
    const successfulUploads = results.filter(r => r.success)
    const failedUploads = results.filter(r => !r.success)
    
    return {
      success: failedUploads.length === 0,
      uploads: successfulUploads,
      failed: failedUploads,
      totalUploaded: successfulUploads.length,
      totalFailed: failedUploads.length,
    }
  } catch (error) {
    console.error('Multiple upload error:', error)
    return {
      success: false,
      error: error.message,
      uploads: [],
      failed: [],
    }
  }
}

// Get image URL with transformations
export function getTransformedImageUrl(publicId, options = {}) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options
  
  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    fetch_format: format,
  })
}

export default cloudinary
