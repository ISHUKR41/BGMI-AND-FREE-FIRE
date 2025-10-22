import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function for conditional class merging (like shadcn/ui)
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format date for display
export function formatDate(date, format = 'PPp') {
  if (!date) return 'N/A'
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return 'Invalid Date'
  
  return dateObj.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Format currency in Indian Rupees
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Truncate text with ellipsis
export function truncate(str, length = 50) {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

// Generate random string for IDs
export function generateId(length = 8) {
  return Math.random().toString(36).substring(2, length + 2)
}

// Debounce function
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Sleep/delay function
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Validate image file
export function isValidImageFile(file) {
  if (!file) return false
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload an image (JPEG, PNG, WebP, or GIF)' }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Maximum size is 5MB' }
  }
  
  return { valid: true }
}

// Copy to clipboard
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

// Get initials from name
export function getInitials(name) {
  if (!name) return '??'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Format phone number
export function formatPhoneNumber(phone) {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`
  }
  return phone
}

// Get tournament status color
export function getStatusColor(status) {
  const colors = {
    pending: 'text-yellow-400 bg-yellow-500/20',
    approved: 'text-green-400 bg-green-500/20',
    rejected: 'text-red-400 bg-red-500/20',
    active: 'text-blue-400 bg-blue-500/20',
    completed: 'text-gray-400 bg-gray-500/20',
  }
  return colors[status] || 'text-gray-400 bg-gray-500/20'
}

// Calculate available slots
export function calculateAvailableSlots(maxSlots, approvedCount) {
  const available = maxSlots - approvedCount
  return Math.max(0, available)
}

// Check if tournament is full
export function isTournamentFull(maxSlots, approvedCount) {
  return approvedCount >= maxSlots
}

// Get game display name
export function getGameDisplayName(gameType) {
  const names = {
    bgmi: 'BGMI',
    freefire: 'Free Fire',
  }
  return names[gameType] || gameType
}

// Get tournament type display name
export function getTournamentTypeDisplayName(tournamentType) {
  const names = {
    solo: 'Solo',
    duo: 'Duo',
    squad: 'Squad',
  }
  return names[tournamentType] || tournamentType
}
