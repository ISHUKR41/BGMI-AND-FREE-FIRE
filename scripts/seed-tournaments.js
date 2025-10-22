const mongoose = require('mongoose')

// Tournament configuration
const TOURNAMENT_CONFIG = {
  bgmi: {
    solo: { maxSlots: 100, entryFee: 20, winnerPrize: 350, runnerUpPrize: 250, perKill: 9 },
    duo: { maxSlots: 50, entryFee: 40, winnerPrize: 350, runnerUpPrize: 250, perKill: 9 },
    squad: { maxSlots: 25, entryFee: 80, winnerPrize: 350, runnerUpPrize: 250, perKill: 9 },
  },
  freefire: {
    solo: { maxSlots: 48, entryFee: 20, winnerPrize: 350, runnerUpPrize: 150, perKill: 5 },
    duo: { maxSlots: 24, entryFee: 40, winnerPrize: 350, runnerUpPrize: 150, perKill: 5 },
    squad: { maxSlots: 12, entryFee: 80, winnerPrize: 350, runnerUpPrize: 150, perKill: 5 },
  },
}

// Simple tournament schema for seeding
const TournamentSchema = new mongoose.Schema({
  gameType: { type: String, required: true },
  tournamentType: { type: String, required: true },
  maxSlots: { type: Number, required: true },
  registeredCount: { type: Number, default: 0 },
  approvedCount: { type: Number, default: 0 },
  pendingCount: { type: Number, default: 0 },
  rejectedCount: { type: Number, default: 0 },
  availableSlots: { type: Number },
  isFull: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  qrCodeUrl: String,
  entryFee: { type: Number, required: true },
  winnerPrize: { type: Number, required: true },
  runnerUpPrize: { type: Number, required: true },
  perKillReward: { type: Number, required: true },
  status: { type: String, default: 'scheduled' },
}, { timestamps: true })

// Create compound index
TournamentSchema.index({ gameType: 1, tournamentType: 1 }, { unique: true })

const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema)

async function seedTournaments() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tournament-db'
    
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    const tournaments = []
    
    // Initialize all tournament types for both games
    for (const gameType of ['bgmi', 'freefire']) {
      for (const tournamentType of ['solo', 'duo', 'squad']) {
        const config = TOURNAMENT_CONFIG[gameType][tournamentType]
        
        const existingTournament = await Tournament.findOne({ gameType, tournamentType })
        
        if (!existingTournament) {
          const tournament = await Tournament.create({
            gameType,
            tournamentType,
            maxSlots: config.maxSlots,
            entryFee: config.entryFee,
            winnerPrize: config.winnerPrize,
            runnerUpPrize: config.runnerUpPrize,
            perKillReward: config.perKill,
            availableSlots: config.maxSlots,
            isActive: true,
          })
          
          tournaments.push(tournament)
          console.log(`Created tournament: ${gameType.toUpperCase()} ${tournamentType}`)
        } else {
          console.log(`Tournament already exists: ${gameType.toUpperCase()} ${tournamentType}`)
        }
      }
    }
    
    console.log(`\nTournaments initialized successfully!`)
    console.log(`Total tournaments: ${tournaments.length}`)

  } catch (error) {
    console.error('Error seeding tournaments:', error)
  } finally {
    await mongoose.disconnect()
  }
}

if (require.main === module) {
  seedTournaments()
}

module.exports = seedTournaments