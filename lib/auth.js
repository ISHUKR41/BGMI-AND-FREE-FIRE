import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production-please-use-a-strong-secret'
const TOKEN_EXPIRY = '7d' // 7 days

// Generate JWT token
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  })
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error('Token verification failed:', error.message)
    return null
  }
}

// Get token from request
export function getTokenFromRequest(request) {
  // Try to get from Authorization header
  const authHeader = request.headers.get('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Try to get from cookies
  const cookieStore = cookies()
  const token = cookieStore.get('adminToken')
  if (token) {
    return token.value
  }
  
  return null
}

// Check if user is authenticated
export function isAuthenticated(request) {
  const token = getTokenFromRequest(request)
  if (!token) return false
  
  const decoded = verifyToken(token)
  return decoded !== null
}

// Get user from request
export function getUserFromRequest(request) {
  const token = getTokenFromRequest(request)
  if (!token) return null
  
  return verifyToken(token)
}

// Create authentication middleware
export function requireAuth(handler) {
  return async (request, context) => {
    if (!isAuthenticated(request)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Unauthorized' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
    
    return handler(request, context)
  }
}
// Hash password using bcryptjs
export async function hashPassword(password) {
  const bcrypt = require('bcryptjs')
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Compare password with hash
export async function comparePassword(password, hash) {
  const bcrypt = require('bcryptjs')
  return bcrypt.compare(password, hash)
}

// Generate secure random string
export function generateSecureToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

