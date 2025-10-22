import mongoose from 'mongoose'

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gameId: {
    type: String,
    required: true,
    trim: true,
  },
})

const RegistrationSchema = new mongoose.Schema(
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
    teamName: {
      type: String,
      trim: true,
    },
    teamLeader: {
      name: {
        type: String,
        required: [true, 'Team leader name is required'],
        trim: true,
      },
      gameId: {
        type: String,
        required: [true, 'Game ID is required'],
        trim: true,
      },
      whatsapp: {
        type: String,
        required: [true, 'WhatsApp number is required'],
        trim: true,
      },
    },
    players: [PlayerSchema],
    payment: {
      screenshot: {
        type: String,
        required: [true, 'Payment screenshot is required'],
      },
      transactionId: {
        type: String,
        required: [true, 'Transaction ID is required'],
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    approvedAt: {
      type: Date,
    },
    approvedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for faster queries
RegistrationSchema.index({ gameType: 1, tournamentType: 1, status: 1 })
RegistrationSchema.index({ status: 1, createdAt: -1 })

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema)

