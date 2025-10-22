# ⚡ Quick Start Guide

Get your tournament platform running in 5 minutes!

## 🎯 What You'll Need

- Node.js 18+ installed
- 5 minutes of your time
- MongoDB Atlas account (free)
- Cloudinary account (free)

## 🚀 Steps

### 1. Clone & Install (1 min)

```bash
git clone <your-repo>
cd bgmi-freefire-tournament
npm install
```

### 2. Setup Environment (2 min)

Create `.env.local`:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tournament
JWT_SECRET=any-long-random-string-here-make-it-secure
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Get MongoDB URI:**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Replace password and dbname

**Get Cloudinary Credentials:**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up free
3. Copy Cloud Name, API Key, API Secret from dashboard

### 3. Initialize Database (1 min)

```bash
# Create tournaments
npm run seed:tournaments

# Create admin account
npm run seed:admin
```

### 4. Start Server (30 sec)

```bash
npm run dev
```

### 5. Access Your Site (30 sec)

- **Homepage**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
  - Username: `admin`
  - Password: `admin123` (change this!)

## ✅ You're Done!

Your tournament platform is running! Now:

1. Login to admin panel
2. Upload payment QR codes
3. Test registration
4. Share with players!

## 📱 Test Registration

1. Go to http://localhost:3000
2. Click BGMI or Free Fire
3. Select Solo tournament
4. Fill form with test data
5. Upload any image as payment screenshot
6. Submit!

## 🔐 Admin Panel

1. Go to http://localhost:3000/admin/login
2. Login with `admin` / `admin123`
3. View registrations
4. Approve/reject entries
5. Upload QR codes

## 🚀 Deploy to Production

When ready to go live:

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Deploy to Vercel
# Go to vercel.com and import your repo
# Add environment variables
# Deploy!
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide.

## 🆘 Troubleshooting

**Can't connect to MongoDB?**
- Check connection string format
- Verify password has no special characters or is URL-encoded
- Whitelist your IP (0.0.0.0/0 for all IPs)

**Port 3000 already in use?**
```bash
PORT=3001 npm run dev
```

**Module not found?**
```bash
rm -rf node_modules
npm install
```

## 📚 Next Steps

- Read [SETUP.md](SETUP.md) for detailed setup
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Customize tournament settings in `lib/constants.js`
- Update colors in `tailwind.config.js`

## 🎉 That's It!

You now have a fully functional tournament platform!

Questions? Check the [README.md](README.md) for more details.

Happy tournament hosting! 🏆

