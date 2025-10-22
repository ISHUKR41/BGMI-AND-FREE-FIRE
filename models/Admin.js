import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email'
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ['admin', 'super_admin'],
      default: 'admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    permissions: [{
      type: String,
      enum: [
        'view_registrations',
        'approve_registrations',
        'reject_registrations',
        'delete_registrations',
        'manage_tournaments',
        'upload_qr_codes',
        'reset_tournaments',
        'view_analytics',
        'manage_admins'
      ],
    }],
    profileImage: {
      type: String,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
AdminSchema.index({ username: 1 })
AdminSchema.index({ email: 1 })
AdminSchema.index({ isActive: 1 })

// Methods
AdminSchema.methods.toJSON = function() {
  const admin = this.toObject()
  delete admin.password
  return admin
}

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema)