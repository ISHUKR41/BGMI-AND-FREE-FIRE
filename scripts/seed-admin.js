const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Simple admin schema for seeding
const AdminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  permissions: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

async function seedAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tournament-db'
    
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    
    if (existingAdmin) {
      console.log('Admin already exists!')
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('admin123', salt)

    // Create admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@tournament.com',
      password: hashedPassword,
      role: 'super_admin',
      permissions: [
        'view_registrations',
        'approve_registrations',
        'reject_registrations',
        'delete_registrations',
        'manage_tournaments',
        'upload_qr_codes',
        'reset_tournaments',
        'view_analytics',
        'manage_admins'
      ]
    })

    console.log('Admin created successfully!')
    console.log('Username: admin')
    console.log('Password: admin123')
    console.log('Email: admin@tournament.com')

  } catch (error) {
    console.error('Error seeding admin:', error)
  } finally {
    await mongoose.disconnect()
  }
}

if (require.main === module) {
  seedAdmin()
}

module.exports = seedAdmin