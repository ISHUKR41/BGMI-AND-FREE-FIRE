import mongoose from 'mongoose'

const TournamentSchema = new mongoose.Schema(
  {
    gameType: {
      type: String,
      required: [true, 'Game type is required'],
      enum: ['bgmi', 'freefire'],
    },
    tournamentType: {
      type: String,
      required: [true, 'Tournament type is required'],
      enum: ['solo', 'duo', 'squad'],
    },
    maxSlots: {
      type: Number,
      required: [true, 'Max slots is required'],
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
    approvedCount: {
      type: Number,
      default: 0,
    },
    pendingCount: {
      type: Number,
      default: 0,
    },
    rejectedCount: {
      type: Number,
      default: 0,
    },
    availableSlots: {
      type: Number,
      default: function() {
        return this.maxSlots - this.approvedCount
      }
    },
    isFull: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    qrCodeUrl: {
      type: String,
      trim: true,
    },
    entryFee: {
      type: Number,
      required: true,
    },
    winnerPrize: {
      type: Number,
      required: true,
    },
    runnerUpPrize: {
      type: Number,
      required: true,
    },
    perKillReward: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    roomId: {
      type: String,
      trim: true,
    },
    roomPassword: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'live', 'completed', 'cancelled'],
      default: 'scheduled',
    },
  },
  {
    timestamps: true,
  }
)

// Create compound index for unique tournaments
TournamentSchema.index({ gameType: 1, tournamentType: 1 }, { unique: true })

// Update derived fields before save
TournamentSchema.pre('save', function(next) {
  this.availableSlots = Math.max(0, this.maxSlots - this.approvedCount)
  this.isFull = this.approvedCount >= this.maxSlots
  next()
})

export default mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema)