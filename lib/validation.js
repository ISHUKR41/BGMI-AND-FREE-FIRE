// Validation utilities for forms and API requests

// Validate BGMI ID (10 digits)
export function validateBGMIId(id) {
  if (!id) return { valid: false, error: 'BGMI ID is required' }
  const cleaned = id.toString().trim()
  if (!/^\d{10}$/.test(cleaned)) {
    return { valid: false, error: 'BGMI ID must be exactly 10 digits' }
  }
  return { valid: true }
}

// Validate Free Fire UID (12 digits)
export function validateFreeFireUID(uid) {
  if (!uid) return { valid: false, error: 'Free Fire UID is required' }
  const cleaned = uid.toString().trim()
  if (!/^\d{12}$/.test(cleaned)) {
    return { valid: false, error: 'Free Fire UID must be exactly 12 digits' }
  }
  return { valid: true }
}

// Validate WhatsApp number (Indian mobile number)
export function validateWhatsAppNumber(number) {
  if (!number) return { valid: false, error: 'WhatsApp number is required' }
  const cleaned = number.toString().replace(/\D/g, '')
  
  if (cleaned.length !== 10) {
    return { valid: false, error: 'WhatsApp number must be 10 digits' }
  }
  
  if (!/^[6-9]/.test(cleaned)) {
    return { valid: false, error: 'WhatsApp number must start with 6-9' }
  }
  
  return { valid: true, value: cleaned }
}

// Validate player name
export function validatePlayerName(name) {
  if (!name) return { valid: false, error: 'Player name is required' }
  const cleaned = name.trim()
  
  if (cleaned.length < 2) {
    return { valid: false, error: 'Player name must be at least 2 characters' }
  }
  
  if (cleaned.length > 50) {
    return { valid: false, error: 'Player name must not exceed 50 characters' }
  }
  
  if (!/^[a-zA-Z0-9\s._-]+$/.test(cleaned)) {
    return { valid: false, error: 'Player name contains invalid characters' }
  }
  
  return { valid: true, value: cleaned }
}

// Validate team name
export function validateTeamName(name) {
  if (!name) return { valid: false, error: 'Team name is required' }
  const cleaned = name.trim()
  
  if (cleaned.length < 3) {
    return { valid: false, error: 'Team name must be at least 3 characters' }
  }
  
  if (cleaned.length > 50) {
    return { valid: false, error: 'Team name must not exceed 50 characters' }
  }
  
  if (!/^[a-zA-Z0-9\s._-]+$/.test(cleaned)) {
    return { valid: false, error: 'Team name contains invalid characters' }
  }
  
  return { valid: true, value: cleaned }
}

// Validate transaction ID
export function validateTransactionId(id) {
  if (!id) return { valid: false, error: 'Transaction ID is required' }
  const cleaned = id.trim()
  
  if (cleaned.length < 5) {
    return { valid: false, error: 'Transaction ID must be at least 5 characters' }
  }
  
  if (cleaned.length > 100) {
    return { valid: false, error: 'Transaction ID too long' }
  }
  
  return { valid: true, value: cleaned }
}

// Validate email
export function validateEmail(email) {
  if (!email) return { valid: false, error: 'Email is required' }
  const cleaned = email.trim().toLowerCase()
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(cleaned)) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  return { valid: true, value: cleaned }
}

// Validate password
export function validatePassword(password) {
  if (!password) return { valid: false, error: 'Password is required' }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' }
  }
  
  if (password.length > 100) {
    return { valid: false, error: 'Password too long' }
  }
  
  // Check for at least one letter and one number
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain both letters and numbers' }
  }
  
  return { valid: true }
}

// Validate game ID based on game type
export function validateGameId(gameType, gameId) {
  if (gameType === 'bgmi') {
    return validateBGMIId(gameId)
  } else if (gameType === 'freefire') {
    return validateFreeFireUID(gameId)
  }
  return { valid: false, error: 'Invalid game type' }
}

// Validate registration data
export function validateRegistrationData(data) {
  const errors = []
  
  // Validate game type
  if (!data.gameType || !['bgmi', 'freefire'].includes(data.gameType)) {
    errors.push('Invalid game type')
  }
  
  // Validate tournament type
  if (!data.tournamentType || !['solo', 'duo', 'squad'].includes(data.tournamentType)) {
    errors.push('Invalid tournament type')
  }
  
  // Validate team leader
  if (!data.teamLeader) {
    errors.push('Team leader information is required')
  } else {
    const nameValidation = validatePlayerName(data.teamLeader.name)
    if (!nameValidation.valid) errors.push(nameValidation.error)
    
    const gameIdValidation = validateGameId(data.gameType, data.teamLeader.gameId)
    if (!gameIdValidation.valid) errors.push(gameIdValidation.error)
    
    const whatsappValidation = validateWhatsAppNumber(data.teamLeader.whatsapp)
    if (!whatsappValidation.valid) errors.push(whatsappValidation.error)
  }
  
  // Validate players based on tournament type
  if (data.tournamentType === 'duo') {
    if (!data.players || data.players.length !== 1) {
      errors.push('Duo tournament requires exactly 1 additional player')
    }
  } else if (data.tournamentType === 'squad') {
    if (!data.players || data.players.length !== 3) {
      errors.push('Squad tournament requires exactly 3 additional players')
    }
  }
  
  // Validate each player
  if (data.players && data.players.length > 0) {
    data.players.forEach((player, index) => {
      const nameValidation = validatePlayerName(player.name)
      if (!nameValidation.valid) errors.push(`Player ${index + 2}: ${nameValidation.error}`)
      
      const gameIdValidation = validateGameId(data.gameType, player.gameId)
      if (!gameIdValidation.valid) errors.push(`Player ${index + 2}: ${gameIdValidation.error}`)
    })
  }
  
  // Validate payment
  if (!data.payment) {
    errors.push('Payment information is required')
  } else {
    if (!data.payment.screenshot) {
      errors.push('Payment screenshot is required')
    }
    
    const transactionIdValidation = validateTransactionId(data.payment.transactionId)
    if (!transactionIdValidation.valid) errors.push(transactionIdValidation.error)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// Sanitize string to prevent XSS
export function sanitizeString(str) {
  if (!str) return ''
  return str
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000)
}

// Validate file upload
export function validateFileUpload(file, options = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  } = options
  
  if (!file) return { valid: false, error: 'No file provided' }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` }
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1)
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` }
  }
  
  return { valid: true }
}
