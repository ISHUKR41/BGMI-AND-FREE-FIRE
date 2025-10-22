// Script to create initial admin user
// Run with: node scripts/seed-admin.js

require('dotenv').config({ path: '.env.local' })
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables')
  process.exit(1)
}

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  lastLogin: Date,
}, { timestamps: true })

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

async function seedAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({})
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists:', existingAdmin.username)
      console.log('ℹ️  If you want to create a new admin, please delete the existing one first')
      process.exit(0)
    }

    // Create admin
    const username = process.env.ADMIN_USERNAME || 'admin'
    const password = process.env.ADMIN_PASSWORD || 'admin123'

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await Admin.create({
      username,
      password: hashedPassword,
      role: 'admin',
    })

    console.log('✅ Admin created successfully!')
    console.log('📋 Credentials:')
    console.log('   Username:', username)
    console.log('   Password:', password)
    console.log('')
    console.log('⚠️  IMPORTANT: Change the password after first login!')
    console.log('🔗 Login at: /admin/login')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

seedAdmin()

