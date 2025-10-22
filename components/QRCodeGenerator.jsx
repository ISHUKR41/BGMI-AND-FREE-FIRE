'use client'

import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function QRCodeGenerator({
  value,
  size = 200,
  bgColor = '#ffffff',
  fgColor = '#000000',
  level = 'M', // L, M, Q, H
  includeMargin = true,
  imageSettings,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!value || !canvasRef.current) return

    const generateQR = async () => {
      try {
        await QRCode.toCanvas(canvasRef.current, value, {
          width: size,
          margin: includeMargin ? 2 : 0,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: level,
        })

        // Add logo/image in center if provided
        if (imageSettings && imageSettings.src) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          const img = new Image()
          
          img.onload = () => {
            const imgSize = imageSettings.height || size * 0.2
            const x = (size - imgSize) / 2
            const y = (size - imgSize) / 2
            
            // Draw white background for logo
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(x - 5, y - 5, imgSize + 10, imgSize + 10)
            
            // Draw logo
            ctx.drawImage(img, x, y, imgSize, imgSize)
          }
          
          img.src = imageSettings.src
        }
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }

    generateQR()
  }, [value, size, bgColor, fgColor, level, includeMargin, imageSettings])

  if (!value) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-200 rounded-lg",
          className
        )}
        style={{ width: size, height: size }}
      >
        <p className="text-gray-500 text-sm">No data</p>
      </div>
    )
  }

  return (
    <motion.div
      className={cn("inline-block rounded-lg overflow-hidden shadow-lg", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
      />
    </motion.div>
  )
}
// Download QR Code as Image
export function downloadQRCode(canvas, filename = 'qrcode.png') {
  if (!canvas) return

  const url = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Get QR Code as Data URL
export function getQRCodeDataURL(value, options = {}) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(value, {
      width: options.size || 200,
      margin: options.margin !== undefined ? options.margin : 2,
      color: {
        dark: options.fgColor || '#000000',
        light: options.bgColor || '#ffffff',
      },
      errorCorrectionLevel: options.level || 'M',
    }, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}

