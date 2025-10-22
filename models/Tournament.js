import mongoose from 'mongoose'

const TournamentSchema = new mongoose.Schema(
  {
    gameType: {
      type: String,
      required: true,
      enum: ['bgmi', 'freefire'],
    },
    tournamentType: {
      type: String,
      required: true,
      enum: ['solo', 'duo', 'squad'],
    },
    maxSlots: {
      type: Number,
      required: true,
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
    approvedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    qrCodeUrl: {
      type: String,
      default: '',
    },
    roomId: {
      type: String,
      default: '',
    },
    roomPassword: {
      type: String,
      default: '',
    },
    scheduledTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Create compound index for faster queries
TournamentSchema.index({ gameType: 1, tournamentType: 1 })

export default mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema)

