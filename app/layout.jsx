import { Toaster } from 'react-hot-toast'
import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'

export const metadata = {
  title: 'BGMI & Free Fire Tournament - Professional Gaming Platform',
  description: 'Join professional BGMI and Free Fire tournaments. Compete in Solo, Duo, and Squad matches. Win exciting prizes!',
  keywords: 'BGMI, Free Fire, Tournament, Gaming, Esports, Battle Royale',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
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
        </ErrorBoundary>
      </body>
    </html>
  )
}

