import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata = {
  title: 'BGMI & Free Fire Tournament - Professional Gaming Platform',
  description: 'Join professional BGMI and Free Fire tournaments. Compete in Solo, Duo, and Squad matches. Win exciting prizes!',
  keywords: 'BGMI, Free Fire, Tournament, Gaming, Esports, Battle Royale',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}

