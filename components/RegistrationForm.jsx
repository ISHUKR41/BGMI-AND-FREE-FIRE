'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Upload, Send, Loader, IndianRupee, QrCode } from 'lucide-react'
import axios from 'axios'
import Image from 'next/image'

export default function RegistrationForm({ gameType, tournamentType, config, qrCodeUrl, isFull }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false)
  const [screenshotPreview, setScreenshotPreview] = useState(null)
  const [screenshotUrl, setScreenshotUrl] = useState('')
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
  const handleScreenshotUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB')
      return
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }
    
    setUploadingScreenshot(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await axios.post('/api/upload', formData)
      
      if (response.data.success) {
        setScreenshotUrl(response.data.url)
        setScreenshotPreview(URL.createObjectURL(file))
        toast.success('Screenshot uploaded successfully!')
      } else {
        toast.error('Failed to upload screenshot')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload screenshot')
    } finally {
      setUploadingScreenshot(false)
    }
  }
  
  const onSubmit = async (data) => {
    if (!screenshotUrl) {
      toast.error('Please upload payment screenshot')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Prepare registration data
      const registrationData = {
        gameType,
        tournamentType,
        teamName: data.teamName || `${data.teamLeaderName}'s Team`,
        teamLeader: {
          name: data.teamLeaderName,
          gameId: data.teamLeaderGameId,
          whatsapp: data.whatsapp,
        },
        players: [],
        payment: {
          screenshot: screenshotUrl,
          transactionId: data.transactionId,
        },
      }
      
      // Add players based on tournament type
      if (tournamentType === 'duo') {
        registrationData.players.push({
          name: data.player2Name,
          gameId: data.player2GameId,
        })
      } else if (tournamentType === 'squad') {
        registrationData.players.push(
          { name: data.player2Name, gameId: data.player2GameId },
          { name: data.player3Name, gameId: data.player3GameId },
          { name: data.player4Name, gameId: data.player4GameId }
        )
      }
      
      const response = await axios.post('/api/registrations', registrationData)
      
      if (response.data.success) {
        toast.success('Registration submitted successfully! Waiting for admin approval.')
        reset()
        setScreenshotPreview(null)
        setScreenshotUrl('')
      } else {
        toast.error(response.data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error.response?.data?.message || 'Failed to submit registration')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isFull) {
    return (
      <div className="glass-effect rounded-xl p-8 text-center border border-red-500/30">
        <div className="text-6xl mb-4">🔒</div>
        <h3 className="text-2xl font-bold text-red-400 mb-2">Tournament Full</h3>
        <p className="text-gray-400">
          All slots for this tournament have been filled. Please check back later for new tournaments.
        </p>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-effect rounded-xl p-6 border border-white/10 space-y-6">
      <h3 className="text-2xl font-bold bg-gradient-gaming bg-clip-text text-transparent">
        Registration Form
      </h3>
      
      {/* Team Name (for duo/squad) */}
      {tournamentType !== 'solo' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Team Name *
          </label>
          <input
            {...register('teamName', { required: 'Team name is required' })}
            className="input-gaming"
            placeholder="Enter your team name"
          />
          {errors.teamName && (
            <p className="text-red-400 text-sm mt-1">{errors.teamName.message}</p>
          )}
        </div>
      )}
      
      {/* Team Leader Details */}
      <div className="space-y-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <h4 className="font-semibold text-purple-400">Team Leader Details</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {tournamentType === 'solo' ? 'Player Name' : 'Team Leader Name'} *
          </label>
          <input
            {...register('teamLeaderName', { required: 'Name is required' })}
            className="input-gaming"
            placeholder="Enter your name"
          />
          {errors.teamLeaderName && (
            <p className="text-red-400 text-sm mt-1">{errors.teamLeaderName.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Game ID *
          </label>
          <input
            {...register('teamLeaderGameId', { required: 'Game ID is required' })}
            className="input-gaming"
            placeholder="Enter your game ID"
          />
          {errors.teamLeaderGameId && (
            <p className="text-red-400 text-sm mt-1">{errors.teamLeaderGameId.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            WhatsApp Number *
          </label>
          <input
            {...register('whatsapp', { 
              required: 'WhatsApp number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit number'
              }
            })}
            className="input-gaming"
            placeholder="10-digit WhatsApp number"
            type="tel"
            maxLength="10"
          />
          {errors.whatsapp && (
            <p className="text-red-400 text-sm mt-1">{errors.whatsapp.message}</p>
          )}
        </div>
      </div>
      
      {/* Player 2 (for duo/squad) */}
      {(tournamentType === 'duo' || tournamentType === 'squad') && (
        <div className="space-y-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-blue-400">Player 2 Details</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <input
              {...register('player2Name', { required: 'Player 2 name is required' })}
              className="input-gaming"
              placeholder="Enter player 2 name"
            />
            {errors.player2Name && (
              <p className="text-red-400 text-sm mt-1">{errors.player2Name.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Game ID *</label>
            <input
              {...register('player2GameId', { required: 'Player 2 game ID is required' })}
              className="input-gaming"
              placeholder="Enter player 2 game ID"
            />
            {errors.player2GameId && (
              <p className="text-red-400 text-sm mt-1">{errors.player2GameId.message}</p>
            )}
          </div>
        </div>
      )}
      
      {/* Players 3 & 4 (for squad only) */}
      {tournamentType === 'squad' && (
        <>
          <div className="space-y-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h4 className="font-semibold text-green-400">Player 3 Details</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
              <input
                {...register('player3Name', { required: 'Player 3 name is required' })}
                className="input-gaming"
                placeholder="Enter player 3 name"
              />
              {errors.player3Name && (
                <p className="text-red-400 text-sm mt-1">{errors.player3Name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Game ID *</label>
              <input
                {...register('player3GameId', { required: 'Player 3 game ID is required' })}
                className="input-gaming"
                placeholder="Enter player 3 game ID"
              />
              {errors.player3GameId && (
                <p className="text-red-400 text-sm mt-1">{errors.player3GameId.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <h4 className="font-semibold text-yellow-400">Player 4 Details</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
              <input
                {...register('player4Name', { required: 'Player 4 name is required' })}
                className="input-gaming"
                placeholder="Enter player 4 name"
              />
              {errors.player4Name && (
                <p className="text-red-400 text-sm mt-1">{errors.player4Name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Game ID *</label>
              <input
                {...register('player4GameId', { required: 'Player 4 game ID is required' })}
                className="input-gaming"
                placeholder="Enter player 4 game ID"
              />
              {errors.player4GameId && (
                <p className="text-red-400 text-sm mt-1">{errors.player4GameId.message}</p>
              )}
            </div>
          </div>
        </>
      )}
      
      {/* Payment Section */}
      <div className="space-y-4 p-6 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg border border-orange-500/30">
        <div className="flex items-center space-x-2 mb-4">
          <IndianRupee className="w-6 h-6 text-orange-400" />
          <h4 className="font-bold text-xl text-orange-400">Payment Details</h4>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
          <span className="text-gray-300">Entry Fee:</span>
          <div className="flex items-center space-x-1">
            <IndianRupee className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{config.entryFee}</span>
          </div>
        </div>
        
        {qrCodeUrl && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <QrCode className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Scan to Pay</span>
            </div>
            <div className="inline-block p-4 bg-white rounded-lg">
              <Image src={qrCodeUrl} alt="Payment QR Code" width={200} height={200} className="rounded" />
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Payment Screenshot *
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotUpload}
              className="hidden"
              id="screenshot"
            />
            <label
              htmlFor="screenshot"
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-400 transition-colors"
            >
              {uploadingScreenshot ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>{screenshotPreview ? 'Change Screenshot' : 'Upload Screenshot'}</span>
                </>
              )}
            </label>
          </div>
          
          {screenshotPreview && (
            <div className="mt-2">
              <Image src={screenshotPreview} alt="Screenshot preview" width={200} height={200} className="rounded-lg" />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Transaction ID *
          </label>
          <input
            {...register('transactionId', { required: 'Transaction ID is required' })}
            className="input-gaming"
            placeholder="Enter transaction ID from payment"
          />
          {errors.transactionId && (
            <p className="text-red-400 text-sm mt-1">{errors.transactionId.message}</p>
          )}
        </div>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || uploadingScreenshot}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Submit Registration</span>
          </>
        )}
      </button>
    </form>
  )
}

