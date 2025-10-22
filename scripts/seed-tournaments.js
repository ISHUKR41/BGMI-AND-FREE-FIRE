// Script to initialize all tournaments
// Run with: node scripts/seed-tournaments.js

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables')
  process.exit(1)
}

const TournamentSchema = new mongoose.Schema({
  gameType: String,
  tournamentType: String,
  maxSlots: Number,
  registeredCount: { type: Number, default: 0 },
  approvedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  qrCodeUrl: String,
  roomId: String,
  roomPassword: String,
  scheduledTime: Date,
}, { timestamps: true })

const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema)

const TOURNAMENT_CONFIG = {
  bgmi: {
    solo: { maxSlots: 100 },
    duo: { maxSlots: 50 },
    squad: { maxSlots: 25 },
  },
  freefire: {
    solo: { maxSlots: 48 },
    duo: { maxSlots: 24 },
    squad: { maxSlots: 12 },
  },
}

async function seedTournaments() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    const tournamentTypes = ['solo', 'duo', 'squad']
    const gameTypes = ['bgmi', 'freefire']

    let created = 0
    let existing = 0

    for (const gameType of gameTypes) {
      for (const tournamentType of tournamentTypes) {
        const exists = await Tournament.findOne({ gameType, tournamentType })
        
        if (!exists) {
          const config = TOURNAMENT_CONFIG[gameType][tournamentType]
          await Tournament.create({
            gameType,
            tournamentType,
            maxSlots: config.maxSlots,
            registeredCount: 0,
            approvedCount: 0,
            isActive: true,
          })
          console.log(`✅ Created: ${gameType.toUpperCase()} ${tournamentType}`)
          created++
        } else {
          console.log(`ℹ️  Exists: ${gameType.toUpperCase()} ${tournamentType}`)
          existing++
        }
      }
    }

    console.log('')
    console.log('📊 Summary:')
    console.log(`   Created: ${created}`)
    console.log(`   Existing: ${existing}`)
    console.log(`   Total: ${created + existing}`)
    console.log('')
    console.log('✅ Tournament initialization complete!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

seedTournaments()

