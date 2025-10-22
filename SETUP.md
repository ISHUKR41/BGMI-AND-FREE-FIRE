# 🛠️ Local Development Setup Guide

Complete guide to set up and run the BGMI & Free Fire Tournament Platform locally.

## 📋 Prerequisites

Before you start, make sure you have:

- ✅ **Node.js** (v18+) - [Download](https://nodejs.org/)
- ✅ **npm** (v9+) or **yarn**
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ **MongoDB Atlas Account** (Free tier) - [Create Account](https://www.mongodb.com/cloud/atlas)
- ✅ **Cloudinary Account** (Free tier) - [Create Account](https://cloudinary.com/users/register/free)
- ✅ **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/bgmi-freefire-tournament.git

# Navigate to project directory
cd bgmi-freefire-tournament
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages including:
- Next.js 14
- React 18
- MongoDB Mongoose
- Tailwind CSS
- React Hook Form
- And more...

### Step 3: Setup MongoDB Atlas

#### Create a MongoDB Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" or "Sign In"
3. Create a new account if needed

#### Create a Cluster

1. Click **"Build a Database"**
2. Choose **FREE** tier (M0 - Free)
3. Select your preferred region (Mumbai recommended for India)
4. Click **"Create Cluster"**
5. Wait 2-3 minutes for cluster to be created

#### Create Database User

1. In left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username (e.g., `tournament_user`)
5. Enter password (save this somewhere safe!)
6. Set role to **"Read and write to any database"**
7. Click **"Add User"**

#### Whitelist Your IP

1. In left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** (add `0.0.0.0/0`)
4. Click **"Confirm"**

#### Get Connection String

1. Go to **"Database"** in left sidebar
2. Click **"Connect"** button next to your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace:
   - `<username>` with your database user
   - `<password>` with your database password
   - `<dbname>` with `tournament`

Example:
```
mongodb+srv://tournament_user:MySecurePass123@cluster0.abc123.mongodb.net/tournament?retryWrites=true&w=majority
```

### Step 4: Setup Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to **Dashboard**
4. Copy these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

You'll need these for environment variables.

### Step 5: Create Environment Variables

Create a `.env.local` file in the root directory:

```bash
# In project root
touch .env.local
```

Edit `.env.local` and add:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://tournament_user:MySecurePass123@cluster0.abc123.mongodb.net/tournament?retryWrites=true&w=majority

# JWT Secret (generate a random string, 32+ characters)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Local Development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

**To generate a random JWT_SECRET:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 6: Start Development Server

```bash
npm run dev
```

Output:
```
> bgmi-freefire-tournament@1.0.0 dev
> next dev

  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🗄️ Database Setup

### Initialize Tournaments (Optional)

Run this script to create all tournaments:

```bash
# This will create 6 tournament records (BGMI/FF × Solo/Duo/Squad)
npm run seed:tournaments
```

### Create Admin User

Run this script to create the first admin:

```bash
npm run seed:admin
```

You'll be prompted to enter admin credentials.

## 🧪 Testing the Application

### Test Player Registration Flow

1. Go to `http://localhost:3000`
2. Click on **"BGMI Tournaments"** or **"Free Fire Tournaments"**
3. Select **"Solo"**, **"Duo"**, or **"Squad"**
4. Fill out the registration form:
   - Player/Team Name
   - Game ID
   - WhatsApp Number (10 digits)
   - Player 2, 3, 4 details (for Duo/Squad)
5. Upload a payment screenshot (any image for testing)
6. Enter a transaction ID
7. Click **"Submit Registration"**

You should see a success message!

### Test Admin Panel

1. Go to `http://localhost:3000/admin/login`
2. Login with credentials you created:
   - Username: `admin` (or whatever you set)
   - Password: (your password)
3. Browse registrations
4. Approve/Reject test registrations
5. Upload QR codes
6. Test tournament reset

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Seed tournaments
npm run seed:tournaments

# Seed admin user
npm run seed:admin

# Seed both
npm run seed:all
```

## 🔍 Project Structure

```
bgmi-freefire-tournament/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   ├── admin/                    # Admin pages
│   ├── bgmi/                     # BGMI tournament page
│   ├── freefire/                 # Free Fire tournament page
│   ├── globals.css               # Global styles
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Homepage
├── components/                   # React components
│   ├── Navbar.jsx
│   ├── TournamentTabs.jsx
│   ├── RegistrationForm.jsx
│   ├── SlotCounter.jsx
│   ├── PriceCard.jsx
│   └── RulesSection.jsx
├── lib/                          # Utility libraries
│   ├── auth.js                   # JWT utilities
│   ├── mongodb.js                # MongoDB connection
│   ├── cloudinary.js             # Cloudinary setup
│   └── constants.js              # Tournament config
├── models/                       # MongoDB schemas
│   ├── Admin.js
│   ├── Registration.js
│   └── Tournament.js
├── public/                       # Static assets
├── scripts/                      # Seed scripts
│   ├── seed-admin.js
│   └── seed-tournaments.js
├── .env.example                  # Environment template
├── .env.local                    # Local environment (create this)
├── next.config.js                # Next.js config
├── tailwind.config.js            # Tailwind config
└── package.json                  # Dependencies
```

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
1. Check MongoDB connection string in `.env.local`
2. Verify database username and password
3. Check if MongoDB cluster is running
4. Ensure IP whitelist includes 0.0.0.0/0

### "CLOUDINARY_CLOUD_NAME is not defined"

**Solutions:**
1. Check `.env.local` file exists in project root
2. Verify all Cloudinary variables are set
3. Restart development server after adding env variables

### "Port 3000 is already in use"

```bash
# Use a different port
npm run dev -- -p 3001
```

Or kill the process using port 3000.

### "Styling looks broken"

```bash
# Rebuild Tailwind
rm -rf .next
npm run dev
```

### "Database queries are slow"

Check MongoDB Atlas:
1. View query performance in "Performance Advisor"
2. Check connection stats
3. Consider upgrading cluster tier (if needed)

## 🚀 Next Steps

1. **Customize Tournament Settings**
   - Edit `lib/constants.js`
   - Modify prices, slots, rewards

2. **Change Colors/Branding**
   - Edit `app/globals.css`
   - Modify Tailwind config
   - Update game titles and descriptions

3. **Add Features**
   - Email notifications
   - WhatsApp API integration
   - Leaderboards
   - Player statistics

4. **Deploy to Production**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Deploy to Vercel
   - Setup custom domain

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)

## 💡 Tips & Best Practices

1. **Always use `.env.local` for secrets** - Never commit to Git
2. **Keep JWT_SECRET secure** - Use strong random strings
3. **Test thoroughly locally** - Before deploying
4. **Monitor MongoDB usage** - Free tier has limits
5. **Update dependencies** - Run `npm update` monthly
6. **Use browser DevTools** - For debugging

## ✅ Development Checklist

- [ ] Node.js v18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with all variables
- [ ] MongoDB connection string verified
- [ ] Cloudinary credentials added
- [ ] Development server running (`npm run dev`)
- [ ] Homepage loads at localhost:3000
- [ ] Can navigate between pages
- [ ] Registration form displays
- [ ] Admin login works
- [ ] Tournaments initialized
- [ ] Ready to customize!

## 🤝 Contributing

Want to improve this project? 

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- Check [README.md](./README.md) for overview
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- Review this guide for setup issues
- Check console for error messages

---

**Happy coding! 🎮**

