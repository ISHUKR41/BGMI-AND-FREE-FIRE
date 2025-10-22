'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Shield, Eye, EyeOff, Loader, Lock, User, ArrowRight, Gamepad2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken')
    if (token) {
      router.push('/admin')
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post('/api/auth/login', formData)
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token)
        toast.success('Login successful!')
        router.push('/admin')
      } else {
        toast.error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInitializeAdmin = async () => {
    setIsInitializing(true)
    
    try {
      const response = await axios.post('/api/auth/init')
      
      if (response.data.success) {
        toast.success(
          `${response.data.message}${
            response.data.credentials 
              ? `\n\nCredentials:\nUsername: ${response.data.credentials.username}\nPassword: ${response.data.credentials.password}`
              : ''
          }`,
          { duration: 8000 }
        )
        
        // Auto-fill the form if new admin was created
        if (response.data.credentials) {
          setFormData({
            username: response.data.credentials.username,
            password: response.data.credentials.password,
          })
        }
      } else {
        toast.error(response.data.message || 'Initialization failed')
      }
    } catch (error) {
      console.error('Init error:', error)
      toast.error('Failed to initialize admin')
    } finally {
      setIsInitializing(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full relative">
        {/* Login Card */}
        <motion.div
          className="glass-effect rounded-2xl p-8 border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

          <div className="relative">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Admin Login
              </h1>
              <p className="text-gray-400">Access the tournament dashboard</p>
            </motion.div>

            {/* Login Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input-gaming pl-10"
                    placeholder="Enter username or email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-gaming pl-10 pr-10"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Initialize Admin Button */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-gray-400 mb-4">
                First time setup? Initialize the admin account.
              </p>
              <button
                onClick={handleInitializeAdmin}
                disabled={isInitializing}
                className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl transition-all duration-300 disabled:opacity-50 border border-white/10 hover:border-white/20"
              >
                {isInitializing ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Initializing...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Initialize Admin</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Back to Tournament</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Demo Credentials Info */}
        <motion.div
          className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-blue-300 mb-2">
            <strong>Default Credentials:</strong>
          </p>
          <p className="text-xs text-gray-400">
            Username: <span className="font-mono text-blue-400">admin</span><br />
            Password: <span className="font-mono text-blue-400">admin123</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}