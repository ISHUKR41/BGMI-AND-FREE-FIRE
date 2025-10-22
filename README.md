# 🎮 BGMI & Free Fire Tournament Platform

A professional, modern tournament management platform for BGMI and Free Fire games. Built with Next.js 14, MongoDB, and Tailwind CSS.

## ✨ Features

### For Players
- 🏆 **Multiple Tournament Modes**: Solo, Duo, and Squad tournaments for both games
- 💰 **Transparent Prize Pool**: Clear pricing and reward structure
- 📱 **Real-time Slot Tracking**: See available slots in real-time
- 🔒 **Secure Payment**: Upload payment screenshot and transaction ID
- ⚡ **Instant Registration**: Quick and easy registration process
- 📊 **Live Updates**: Tournament status updates every 30 seconds

### For Admins
- 🛡️ **Secure Admin Panel**: JWT-based authentication
- ✅ **Approval System**: Approve or reject registrations with payment verification
- 📸 **Payment Verification**: View payment screenshots and transaction IDs
- 📊 **Tournament Management**: Track registrations, slots, and statistics
- 🔄 **Tournament Reset**: Reset tournaments when needed
- 🎯 **QR Code Management**: Upload and manage payment QR codes
- 📱 **Responsive Dashboard**: Manage from any device

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **File Storage**: Cloudinary
- **Authentication**: JWT with bcrypt
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **Notifications**: React Hot Toast
- **Deployment**: Vercel (optimized)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd bgmi-freefire-tournament
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Environment Variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tournament?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Next.js URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Deployment to Vercel

### Prerequisites

1. **MongoDB Atlas Account** (Free tier available)
   - Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string
   - Whitelist all IPs (0.0.0.0/0) for Vercel deployment

2. **Cloudinary Account** (Free tier available)
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Get your cloud name, API key, and API secret

### Deployment Steps

1. **Install Vercel CLI** (optional)
```bash
npm i -g vercel
```

2. **Deploy via Vercel Dashboard** (Recommended)
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel project settings
   - Deploy!

3. **Deploy via CLI**
```bash
vercel
```

4. **Add Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Redeploy if needed

### Post-Deployment Setup

1. **Initialize Tournaments**
   - Visit: `https://your-domain.vercel.app/api/tournaments/init`
   - This creates all tournament slots (one-time setup)

2. **Create Admin Account**
   - Visit: `https://your-domain.vercel.app/api/auth/init`
   - Send POST request with username and password:
   ```json
   {
     "username": "admin",
     "password": "your-secure-password"
   }
   ```
   - OR use a tool like Postman/Insomnia
   - **Important**: After creating the first admin, this route should be disabled

3. **Login to Admin Panel**
   - Visit: `https://your-domain.vercel.app/admin/login`
   - Use the credentials you created

## 📋 Tournament Configuration

### BGMI Tournaments

| Mode | Entry Fee | Winner | Runner Up | Per Kill | Max Slots |
|------|-----------|--------|-----------|----------|-----------|
| Solo | ₹20 | ₹350 | ₹250 | ₹9 | 100 |
| Duo | ₹40 | ₹350 | ₹250 | ₹9 | 50 |
| Squad | ₹80 | ₹350 | ₹250 | ₹9 | 25 |

### Free Fire Tournaments

| Mode | Entry Fee | Winner | Runner Up | Per Kill | Max Slots |
|------|-----------|--------|-----------|----------|-----------|
| Solo | ₹20 | ₹350 | ₹150 | ₹5 | 48 |
| Duo | ₹40 | ₹350 | ₹150 | ₹5 | 24 |
| Squad | ₹80 | ₹350 | ₹150 | ₹5 | 12 |

## 🎯 Usage Guide

### For Players

1. **Choose Your Game**
   - Visit homepage and select BGMI or Free Fire

2. **Select Tournament Mode**
   - Choose between Solo, Duo, or Squad

3. **Check Availability**
   - See available slots in real-time

4. **Fill Registration Form**
   - Enter team/player details
   - All fields are required

5. **Make Payment**
   - Scan QR code or use provided payment method
   - Take screenshot of payment confirmation

6. **Submit Registration**
   - Upload payment screenshot
   - Enter transaction ID
   - Submit form

7. **Wait for Approval**
   - Admin will verify payment
   - You'll see status change from "Pending" to "Approved"

### For Admins

1. **Login**
   - Go to `/admin/login`
   - Enter credentials

2. **View Registrations**
   - Select game (BGMI/Free Fire)
   - Select tournament type (Solo/Duo/Squad)
   - Filter by status (All/Pending/Approved/Rejected)

3. **Verify Payments**
   - Click on payment screenshot to view full size
   - Check transaction ID

4. **Approve/Reject**
   - Click Approve for valid registrations
   - Click Reject for invalid ones (optional reason)

5. **Manage QR Codes**
   - Upload payment QR codes for each tournament
   - Change QR codes when needed

6. **Reset Tournament**
   - Delete all registrations for a tournament
   - Use when starting a new tournament

## 🔒 Security Features

- JWT-based authentication for admin
- Password hashing with bcrypt
- HTTP-only cookies for token storage
- Protected API routes
- Input validation with Zod
- XSS protection
- CSRF protection (via same-site cookies)

## 🎨 Design Features

- Modern gradient backgrounds
- Glassmorphism effects
- Smooth animations and transitions
- Responsive design (mobile-first)
- Dark mode optimized
- Gaming-themed color palette
- Loading states and skeletons
- Toast notifications

## 📱 Mobile Responsive

- Fully responsive design
- Touch-friendly interface
- Optimized for all screen sizes
- Mobile navigation
- Swipe gestures support

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify connection string is correct
- Whitelist your IP or use 0.0.0.0/0 for all IPs
- Check if cluster is running

### Cloudinary Upload Fails
- Verify API credentials
- Check file size (max 5MB)
- Ensure image format is supported

### Admin Login Issues
- Ensure admin account is created via `/api/auth/init`
- Check JWT_SECRET is set in environment variables
- Clear browser cookies and try again

### Deployment Errors
- Verify all environment variables are set in Vercel
- Check build logs for specific errors
- Ensure MongoDB allows connections from anywhere

## 🔄 Update Configuration

To change tournament settings, edit `lib/constants.js`:

```javascript
export const TOURNAMENT_CONFIG = {
  bgmi: {
    solo: {
      maxSlots: 100,
      entryFee: 20,
      // ... other settings
    },
  },
}
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For issues or questions:
- Open an issue on GitHub
- Contact admin team

## 🚧 Future Enhancements

- [ ] Email notifications
- [ ] SMS notifications via WhatsApp API
- [ ] Live match tracking
- [ ] Leaderboards
- [ ] Player statistics
- [ ] Multiple admins with roles
- [ ] Tournament scheduling
- [ ] Automated room ID sharing
- [ ] Payment gateway integration
- [ ] Multi-language support

---

**Made with ❤️ for the gaming community**

