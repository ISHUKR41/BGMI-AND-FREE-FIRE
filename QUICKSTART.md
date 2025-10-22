# ⚡ Quick Start Guide

Get your tournament platform up and running in **less than 5 minutes**!

## 🚀 Fast Setup (3 Steps)

### Step 1: Installation (1 min)

```bash
# Clone and install
git clone <your-repo-url>
cd "BGMI & FREE FIRE"
yarn install  # or: npm install
```

### Step 2: Environment Setup (2 min)

1. **Create `.env.local` file:**

```bash
cp .env.example .env.local
```

2. **Add your credentials:**

```env
# MongoDB (Get from mongodb.com/cloud/atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tournament-db

# JWT Secret (Generate with command below)
JWT_SECRET=your-secret-key

# Cloudinary (Get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Initialize & Run (1 min)

```bash
# Initialize database with tournaments
yarn seed:tournaments  # or: npm run seed:tournaments

# Create admin account
yarn seed:admin  # or: npm run seed:admin

# Start development server
yarn dev  # or: npm run dev
```

## 🎉 You're Ready!

Open [http://localhost:3000](http://localhost:3000)

**Admin Login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Username: `admin`
- Password: `admin123`

---

## 📱 Pages Overview

### Public Pages
- `/` - Homepage with game selection
- `/bgmi` - BGMI tournaments (Solo, Duo, Squad)
- `/freefire` - Free Fire tournaments (Solo, Duo, Squad)

### Admin Pages
- `/admin/login` - Admin login
- `/admin` - Admin dashboard with registration management

---

## 🎯 First Steps After Setup

### 1. Login to Admin Panel
```
http://localhost:3000/admin/login
Username: admin
Password: admin123
```

### 2. Upload Payment QR Code
- Select game type (BGMI/Free Fire)
- Select tournament type (Solo/Duo/Squad)
- Upload your payment QR code image
- Save changes

### 3. Test Registration Flow
- Go to BGMI or Free Fire page
- Select a tournament type
- Fill in registration form
- Upload payment screenshot
- Submit registration

### 4. Manage Registrations
- Go to admin dashboard
- Review pending registrations
- Verify payment screenshots
- Approve or reject registrations

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check MongoDB URI in .env.local
# Ensure IP whitelist includes your IP in MongoDB Atlas
# Format: mongodb+srv://username:password@cluster.mongodb.net/dbname
```

### Admin Login Not Working
```bash
# Re-run admin seed
yarn seed:admin

# Clear browser cache and try again
```

### Cloudinary Upload Fails
```bash
# Verify credentials in .env.local
# Check file size (max 5MB)
# Ensure image format is supported (JPEG, PNG, WebP)
```

---

## 🌐 Deploy to Vercel (1-Click)

### Method 1: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel  # Follow prompts
```

### Method 2: Git Integration
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import repository
4. Add environment variables
5. Deploy!

**Don't forget to add all environment variables in Vercel dashboard!**

---

## 📚 Need More Help?

- **Full Setup Guide:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Features:** [FEATURES.md](./FEATURES.md)
- **Deployment:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Main README:** [README.md](./README.md)

---

## 🎮 Default Credentials

### Admin Account
```
Username: admin
Password: admin123
⚠️  Change password after first login!
```

### Tournament Slots
```
BGMI:
  - Solo: 100 slots (₹20 entry)
  - Duo: 50 teams (₹40 entry)
  - Squad: 25 teams (₹80 entry)

Free Fire:
  - Solo: 48 slots (₹20 entry)
  - Duo: 24 teams (₹40 entry)
  - Squad: 12 teams (₹80 entry)
```

---

## ✅ Quick Checklist

- [ ] Install Node.js 18+
- [ ] Clone repository
- [ ] Run `yarn install`
- [ ] Create `.env.local`
- [ ] Add MongoDB URI
- [ ] Generate JWT secret
- [ ] Add Cloudinary credentials
- [ ] Run `yarn seed:tournaments`
- [ ] Run `yarn seed:admin`
- [ ] Run `yarn dev`
- [ ] Open http://localhost:3000
- [ ] Login to admin panel
- [ ] Upload QR code
- [ ] Test registration
- [ ] 🎉 Start accepting registrations!

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Change admin password
- [ ] Use strong JWT secret (32+ characters)
- [ ] Configure MongoDB Atlas production cluster
- [ ] Set up Cloudinary production account
- [ ] Add custom domain in Vercel
- [ ] Enable HTTPS
- [ ] Test all features
- [ ] Monitor error logs
- [ ] Set up backups
- [ ] Configure analytics (optional)

---

**Happy Gaming! 🎮**
