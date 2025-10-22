# 🚀 Deployment Guide

Complete step-by-step guide to deploy your BGMI & Free Fire Tournament Platform to Vercel.

## 📋 Prerequisites

Before deploying, you need:

1. ✅ MongoDB Atlas account (free tier)
2. ✅ Cloudinary account (free tier)
3. ✅ Vercel account (free tier)
4. ✅ GitHub account (optional but recommended)

---

## 1️⃣ Setup MongoDB Atlas

### Step 1: Create Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new project

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select region closest to your users (Mumbai for India)
4. Click "Create Cluster"

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these!)
5. Set role to "Read and write to any database"
6. Click "Add User"

### Step 4: Whitelist IP Addresses
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add `0.0.0.0/0`)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `tournament`

Example:
```
mongodb+srv://admin:MyPassword123@cluster0.xxxxx.mongodb.net/tournament?retryWrites=true&w=majority
```

---

## 2️⃣ Setup Cloudinary

### Step 1: Create Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account

### Step 2: Get Credentials
1. Go to Dashboard
2. Copy these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## 3️⃣ Deploy to Vercel

### Method 1: GitHub + Vercel (Recommended)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

#### Step 3: Add Environment Variables
1. Go to Project Settings
2. Click "Environment Variables"
3. Add these variables:

| Name | Value |
|------|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Any random 32+ character string |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `NEXT_PUBLIC_BASE_URL` | Your Vercel URL (e.g., https://yourproject.vercel.app) |

**Generate JWT_SECRET:**
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Just use a long random string
# Example: my-super-secret-jwt-key-that-is-very-long-and-secure-12345
```

#### Step 4: Redeploy
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"

### Method 2: Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Deploy
```bash
vercel
```

Follow the prompts and add environment variables when asked.

---

## 4️⃣ Post-Deployment Setup

### Step 1: Initialize Tournaments

Using browser or Postman, make a POST request to:
```
https://your-domain.vercel.app/api/tournaments/init
```

This creates all tournament slots (BGMI & Free Fire - Solo, Duo, Squad).

You can also just visit this URL in your browser.

### Step 2: Create Admin Account

#### Option A: Using Postman/Insomnia

1. Make POST request to:
```
https://your-domain.vercel.app/api/auth/init
```

2. Body (JSON):
```json
{
  "username": "admin",
  "password": "YourSecurePassword123!"
}
```

#### Option B: Using cURL

```bash
curl -X POST https://your-domain.vercel.app/api/auth/init \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YourSecurePassword123!"}'
```

#### Option C: Using Browser Console

1. Open your website in browser
2. Press F12 to open DevTools
3. Go to Console tab
4. Paste this code:

```javascript
fetch('/api/auth/init', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'YourSecurePassword123!'
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

### Step 3: Secure the Init Route

**IMPORTANT**: After creating the first admin, the `/api/auth/init` route will automatically reject new admin creation (security feature already built-in).

### Step 4: Test Admin Login

1. Go to `https://your-domain.vercel.app/admin/login`
2. Login with credentials you created
3. Upload QR codes for tournaments
4. Test registration flow

---

## 5️⃣ Upload Payment QR Codes

### Step 1: Login to Admin Panel
1. Go to `/admin/login`
2. Enter credentials

### Step 2: Upload QR Codes
For each tournament (BGMI Solo, Duo, Squad and Free Fire Solo, Duo, Squad):

1. Select game tab (BGMI or Free Fire)
2. Select tournament type (Solo, Duo, or Squad)
3. Click "Upload QR Code"
4. Select your payment QR code image
5. Repeat for all 6 tournaments

---

## 6️⃣ Testing

### Test Registration Flow
1. Go to homepage
2. Click on BGMI or Free Fire
3. Select Solo tournament
4. Fill registration form
5. Upload a test payment screenshot
6. Submit registration

### Test Admin Approval
1. Login to admin panel
2. Find the test registration
3. View payment screenshot
4. Approve or reject

### Test Slot Tracking
1. Make multiple registrations
2. Check if slot counter updates
3. Approve registrations
4. Verify slot count decreases

---

## 🔧 Troubleshooting

### Build Fails on Vercel

**Error: "Module not found"**
```bash
# Clear cache and redeploy
vercel --force
```

**Error: "Cannot connect to MongoDB"**
- Check if MongoDB connection string is correct in environment variables
- Verify IP whitelist includes 0.0.0.0/0
- Check if database user has correct permissions

### Runtime Errors

**Error: "Cloudinary upload failed"**
- Verify Cloudinary credentials in environment variables
- Check if file size is under 5MB
- Ensure image format is supported (jpg, png, gif, webp)

**Error: "Unauthorized" in Admin Panel**
- Clear browser cookies
- Login again
- Check if JWT_SECRET is set

### Performance Issues

**Slow Page Load**
- Enable Vercel Edge Caching
- Optimize images with Next.js Image component (already done)
- Use Vercel Analytics to identify bottlenecks

---

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor build status
- Check analytics
- View error reports

### MongoDB Atlas
- Monitor database usage
- View query performance
- Check connection stats

### Cloudinary
- Monitor upload usage
- Check storage usage
- View transformation stats

---

## 🔄 Updates and Maintenance

### Deploy Updates
1. Make changes to code
2. Push to GitHub
3. Vercel auto-deploys (if connected to GitHub)

### Manual Deployment
```bash
git add .
git commit -m "Update message"
git push origin main
```

### Rollback Deployment
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find working deployment
4. Click "..." → "Promote to Production"

---

## 🔐 Security Best Practices

1. ✅ Use strong JWT_SECRET (32+ random characters)
2. ✅ Use strong admin password
3. ✅ Regularly backup MongoDB database
4. ✅ Monitor for suspicious registrations
5. ✅ Keep dependencies updated
6. ✅ Enable Vercel's security features
7. ✅ Use environment variables for all secrets

---

## 📞 Support

If you encounter issues:

1. Check deployment logs in Vercel
2. Check MongoDB Atlas logs
3. Check browser console for errors
4. Review error messages carefully
5. Refer to this guide

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Cloudinary account created
- [ ] Cloudinary credentials obtained
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Project deployed successfully
- [ ] Tournaments initialized
- [ ] Admin account created
- [ ] QR codes uploaded (6 total)
- [ ] Test registration completed
- [ ] Admin approval tested
- [ ] Slot tracking verified

---

**Congratulations! 🎉 Your tournament platform is now live!**

Share your website URL and start accepting registrations!

