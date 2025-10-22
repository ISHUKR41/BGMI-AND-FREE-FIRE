# 🎮 Professional Gaming Tournament Platform

A modern, professional tournament management system for BGMI and Free Fire with real-time slot tracking, admin dashboard, and secure payment integration.

## ✨ Features

- **🎯 Multi-Game Support**: BGMI and Free Fire tournaments
- **👥 Tournament Types**: Solo, Duo, and Squad matches  
- **💰 Prize Management**: Automated prize distribution system
- **📱 Responsive Design**: Works on all devices
- **🔒 Secure Authentication**: JWT-based admin authentication
- **📊 Real-time Updates**: Live slot tracking and registration counts
- **💳 Payment Integration**: QR code payment with screenshot verification
- **🎨 Modern UI**: GitHub/Vercel-inspired professional design
- **⚡ Performance**: Optimized for Vercel deployment

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Upload**: Cloudinary integration
- **Animations**: Framer Motion
- **UI Components**: Custom components with modern design
- **Deployment**: Vercel-ready configuration

## 📋 Tournament Configuration

### BGMI Tournaments
- **Solo**: 100 players, ₹20 entry, ₹350 winner, ₹250 runner-up, ₹9 per kill
- **Duo**: 50 teams, ₹40 entry, ₹350 winner, ₹250 runner-up, ₹9 per kill  
- **Squad**: 25 teams, ₹80 entry, ₹350 winner, ₹250 runner-up, ₹9 per kill

### Free Fire Tournaments
- **Solo**: 48 players, ₹20 entry, ₹350 winner, ₹150 runner-up, ₹5 per kill
- **Duo**: 24 teams, ₹40 entry, ₹350 winner, ₹150 runner-up, ₹5 per kill
- **Squad**: 12 teams, ₹80 entry, ₹350 winner, ₹150 runner-up, ₹5 per kill

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tournament-platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure Environment Variables**
```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

5. **Seed Initial Data**
```bash
npm run seed:all
```

6. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
tournament-platform/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── bgmi/              # BGMI tournament page
│   ├── freefire/          # Free Fire tournament page
│   └── page.jsx           # Homepage
├── components/            # React components
├── lib/                   # Utility functions
├── models/                # MongoDB models
├── public/                # Static assets
└── scripts/               # Database seeding scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout  
- `POST /api/auth/init` - Initialize default admin

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `PUT /api/tournaments` - Update tournament (admin)
- `POST /api/tournaments/reset` - Reset tournament (admin)

### Registrations  
- `GET /api/registrations` - Get registrations (admin)
- `POST /api/registrations` - Create registration
- `PATCH /api/registrations/[id]` - Approve/reject registration
- `DELETE /api/registrations/[id]` - Delete registration

### Upload
- `POST /api/upload` - Upload payment screenshot

## 👨‍💼 Admin Features

### Default Admin Credentials
- **Username**: `admin`  
- **Password**: `admin123`
- **Email**: `admin@tournament.com`

### Admin Dashboard
- View all registrations by game and tournament type
- Approve/reject registrations with payment verification
- Upload and manage QR codes for payments
- Real-time slot tracking and statistics
- Reset tournaments and manage data
- Filter registrations by status

## 🎨 Design Features

- **Modern Glass Morphism**: Transparent backgrounds with blur effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Grid**: Tailwind CSS responsive layouts  
- **Gaming Theme**: Dark theme with colorful accents
- **Professional Typography**: Optimized fonts and spacing
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
```bash
npm i -g vercel
vercel
```

2. **Add Environment Variables** in Vercel dashboard

3. **Deploy**
```bash
vercel --prod
```

### Environment Variables for Production
- Set up MongoDB Atlas cluster
- Configure Cloudinary account  
- Generate secure JWT secret
- Update environment variables in Vercel

## 🔒 Security Features

- JWT authentication with httpOnly cookies
- Password hashing with bcrypt
- Input validation and sanitization
- File upload validation
- CORS protection
- SQL injection prevention with Mongoose

## 📱 Mobile Responsiveness

- Fully responsive design for all screen sizes
- Touch-friendly interface
- Optimized mobile navigation
- Fast loading on mobile networks
- Progressive Web App ready

## 🧪 Testing

```bash
# Run linting
npm run lint

# Check for type errors  
npm run type-check

# Build for production
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Framer Motion for smooth animations
- MongoDB for the database solution
- Cloudinary for image management

---

**Built with ❤️ for the gaming community**