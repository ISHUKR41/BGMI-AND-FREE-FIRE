'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Shield, LogIn, Loader } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = async (data) => {
    setIsLoggingIn(true)
    
    try {
      const response = await axios.post('/api/auth/login', data)
      
      if (response.data.success) {
        toast.success('Login successful!')
        localStorage.setItem('adminToken', response.data.token)
        router.push('/admin')
      } else {
        toast.error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Invalid credentials')
    } finally {
      setIsLoggingIn(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <span>←</span>
          <span>Back to Home</span>
        </Link>
        
        {/* Login Card */}
        <div className="glass-effect rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gaming rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-gray-400">Access tournament management dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                {...register('username', { required: 'Username is required' })}
                className="input-gaming"
                placeholder="Enter your username"
                autoComplete="username"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                className="input-gaming"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-sm text-gray-400">
              This area is restricted to authorized administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

