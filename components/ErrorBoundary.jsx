'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
          <div className="max-w-2xl w-full">
            {/* Error Card */}
            <div className="glass-effect rounded-2xl p-12 border border-red-500/20 text-center relative overflow-hidden">
              {/* Background effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

              <div className="relative">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle className="w-12 h-12 text-red-400" />
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-4">
                  Oops! Something went wrong
                </h1>

                {/* Description */}
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  We encountered an unexpected error. Don't worry, our team has been notified
                  and we're working on fixing it.
                </p>

                {/* Error Details (in development only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mb-8 text-left">
                    <summary className="cursor-pointer text-red-400 font-semibold mb-4 hover:text-red-300">
                      Error Details (Development Only)
                    </summary>
                    <div className="bg-black/30 rounded-xl p-4 border border-red-500/20">
                      <pre className="text-xs text-red-300 overflow-auto max-h-64">
                        {this.state.error.toString()}
                        {'\n\n'}
                        {this.state.errorInfo?.componentStack}
                      </pre>
                    </div>
                  </details>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={this.handleReset}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Reload Page</span>
                  </button>

                  <Link
                    href="/"
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 border border-white/10 hover:border-white/20"
                  >
                    <Home className="w-5 h-5" />
                    <span>Go Home</span>
                  </Link>
                </div>

                {/* Support Info */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    If this problem persists, please contact our support team
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Error ID: {Date.now()}</p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
