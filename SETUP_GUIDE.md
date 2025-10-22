# 🚀 Complete Setup Guide for BGMI & Free Fire Tournament Platform

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Admin Account Setup](#admin-account-setup)
7. [Deployment to Vercel](#deployment-to-vercel)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Yarn** or **npm** - Package manager
- **Git** - Version control
- **MongoDB Atlas Account** (free tier) - [Sign up](https://cloud.mongodb.com)
- **Cloudinary Account** (free tier) - [Sign up](https://cloudinary.com)

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "BGMI & FREE FIRE"
```

### 2. Install Dependencies

```bash
# Using Yarn (recommended)
yarn install

# OR using npm
npm install
```

---

## 🔐 Environment Variables

### 1. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env.local
```

### 2. Configure MongoDB

#### Option A: MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Update `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tournament-db?retryWrites=true&w=majority
```

#### Option B: Local MongoDB

```env
MONGODB_URI=mongodb://localhost:27017/tournament-db
```

### 3. Generate JWT Secret

Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and add to `.env.local`:

```env
JWT_SECRET=<your-generated-secret>
```

### 4. Configure Cloudinary

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy your credentials
3. Update `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 5. Complete Environment File

Your `.env.local` should look like this:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tournament-db
JWT_SECRET=your-generated-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🗄️ Database Setup

### Initialize Tournaments

Create the default tournament structure:

```bash
# Using Yarn
yarn seed:tournaments

# Using npm
npm run seed:tournaments
```

This creates:
- **BGMI**: Solo (100 slots), Duo (50 slots), Squad (25 slots)
- **Free Fire**: Solo (48 slots), Duo (24 slots), Squad (12 slots)

### Create Admin Account

Create the default admin account:

```bash
# Using Yarn
yarn seed:admin

# Using npm
npm run seed:admin
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT:** Change the password immediately after first login!

---

## 🚀 Running the Application

### Development Mode

```bash
# Using Yarn
yarn dev

# Using npm
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build
yarn build

# Start
yarn start
```

---

## 👨‍💼 Admin Account Setup

### 1. Login to Admin Panel

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with credentials:
   - Username: `admin`
   - Password: `admin123`

### 2. Upload Payment QR Code

1. Go to Admin Dashboard
2. Select game type (BGMI or Free Fire)
3. Select tournament type (Solo, Duo, Squad)
4. Upload your payment QR code
5. QR code will be displayed to users during registration

### 3. Manage Registrations

- View all registrations
- Filter by status (Pending, Approved, Rejected)
- Approve or reject registrations
- View payment screenshots
- Reset tournaments when needed

---

## 🌐 Deployment to Vercel

### 1. Prepare for Deployment

Ensure all environment variables are set:

```bash
# Verify build works locally
yarn build
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure environment variables:
   - Add all variables from `.env.local`
5. Click "Deploy"

### 3. Configure Environment Variables on Vercel

In Vercel Dashboard → Settings → Environment Variables, add:

```
MONGODB_URI = mongodb+srv://...
JWT_SECRET = your-secret
CLOUDINARY_CLOUD_NAME = your-name
CLOUDINARY_API_KEY = your-key
CLOUDINARY_API_SECRET = your-secret
NODE_ENV = production
NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
```

### 4. Post-Deployment

After deployment:

1. Run seed scripts on production:
   ```bash
   # SSH into Vercel (if needed) or use Vercel CLI
   vercel env pull .env.local
   yarn seed:all
   ```

2. Access your admin panel at: `https://your-domain.vercel.app/admin/login`

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Check MongoDB URI in `.env.local`
- Ensure MongoDB Atlas IP whitelist includes your IP (or use `0.0.0.0/0` for development)
- Verify database user credentials

#### 2. Cloudinary Upload Fails

**Error:** `Failed to upload image`

**Solution:**
- Verify Cloudinary credentials in `.env.local`
- Check Cloudinary dashboard for upload errors
- Ensure file size is under 5MB

#### 3. JWT Authentication Issues

**Error:** `Unauthorized` or `Invalid token`

**Solution:**
- Clear browser local storage
- Re-login to admin panel
- Verify JWT_SECRET is set correctly

#### 4. Next.js Build Errors

**Error:** Build fails on Vercel

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
yarn install
yarn build
```

#### 5. Environment Variables Not Loading

**Solution:**
- Restart development server after changing `.env.local`
- Verify file name is exactly `.env.local`
- Check for typos in variable names

### Need Help?

If you encounter issues:

1. Check browser console for errors
2. Check server logs: `yarn dev` output
3. Verify all environment variables are set
4. Ensure MongoDB is accessible
5. Clear cache and cookies

---

## 🎯 Quick Start Checklist

- [ ] Install Node.js (v18+)
- [ ] Clone repository
- [ ] Run `yarn install`
- [ ] Create `.env.local` with all variables
- [ ] Set up MongoDB Atlas
- [ ] Configure Cloudinary
- [ ] Run `yarn seed:tournaments`
- [ ] Run `yarn seed:admin`
- [ ] Run `yarn dev`
- [ ] Login at `/admin/login`
- [ ] Upload payment QR code
- [ ] Test registration flow
- [ ] Deploy to Vercel

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## 🎉 You're All Set!

Your tournament platform is now ready to use. Start accepting registrations and managing tournaments!

For questions or support, please refer to the main [README.md](./README.md) file.


