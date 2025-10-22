'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Upload, Send, Loader, IndianRupee, QrCode, CheckCircle, AlertCircle, User, Phone, Hash, Users, Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function RegistrationForm({ gameType, tournamentType, config, qrCodeUrl, isFull }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false)
  const [screenshotPreview, setScreenshotPreview] = useState(null)
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      teamName: '',
      teamLeaderName: '',
      teamLeaderGameId: '',
      whatsapp: '',
      player2Name: '',
      player2GameId: '',
      player3Name: '',
      player3GameId: '',
      player4Name: '',
      player4GameId: '',
      transactionId: '',
    }
  })

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
        setShowPreview(true)
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

  const removeScreenshot = () => {
    setScreenshotPreview(null)
    setScreenshotUrl('')
    setShowPreview(false)
  }

  // Form validation schemas
  const validateGameId = (value) => {
    if (gameType === 'bgmi') {
      return /^\d{10}$/.test(value) || 'BGMI ID must be 10 digits'
    } else if (gameType === 'freefire') {
      return /^\d{12}$/.test(value) || 'Free Fire UID must be 12 digits'
    }
    return true
  }

  const validateWhatsApp = (value) => {
    return /^[6-9]\d{9}$/.test(value) || 'Please enter a valid 10-digit Indian mobile number'
  }

  // Input field component with validation
  const InputField = ({
    label,
    name,
    type = 'text',
    placeholder,
    validation,
    icon: Icon,
    required = false,
    className = ''
  }) => (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-semibold text-gray-200 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          {...register(name, validation)}
          type={type}
          className={cn(
            "input-gaming",
            Icon && "pl-10",
            errors[name] && "border-red-400 focus:border-red-400"
          )}
          placeholder={placeholder}
        />
        {errors[name] && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
        )}
      </div>
      {errors[name] && (
        <motion.p
          className="text-red-400 text-sm mt-1 flex items-center space-x-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AlertCircle className="w-4 h-4" />
          <span>{errors[name].message}</span>
        </motion.p>
      )}
    </motion.div>
  )
  
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
      <motion.div
        className="glass-effect rounded-2xl p-8 text-center border border-red-500/30 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10"></div>
        <div className="relative">
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔒
          </motion.div>
          <h3 className="text-2xl font-bold text-red-400 mb-2">Tournament Full</h3>
          <p className="text-gray-400">
            All slots for this tournament have been filled. Please check back later for new tournaments.
          </p>
        </div>
      </motion.div>
    )
  }

  const gameGradient = gameType === 'bgmi'
    ? 'from-orange-500/20 to-red-500/20 border-orange-500/30'
    : 'from-red-500/20 to-pink-500/20 border-red-500/30'

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "glass-effect rounded-2xl p-8 border relative overflow-hidden",
        gameGradient
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>

      <div className="relative">
        <motion.div
          className="flex items-center space-x-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            gameType === 'bgmi' ? 'bg-gradient-to-br from-orange-400 to-red-500' : 'bg-gradient-to-br from-red-400 to-pink-500'
          )}>
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Registration Form</h3>
            <p className="text-sm text-gray-400">Fill in your details to join the tournament</p>
          </div>
        </motion.div>
        {/* Team Name (for duo/squad) */}
        {tournamentType !== 'solo' && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <InputField
              label="Team Name"
              name="teamName"
              placeholder="Enter your team name"
              validation={{ required: 'Team name is required' }}
              icon={Users}
              required
            />
          </motion.div>
        )}

        {/* Team Leader Details */}
        <motion.div
          className="space-y-6 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="font-semibold text-purple-400 text-lg">Team Leader Details</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label={tournamentType === 'solo' ? 'Player Name' : 'Team Leader Name'}
              name="teamLeaderName"
              placeholder="Enter your name"
              validation={{ required: 'Name is required' }}
              icon={User}
              required
            />

            <InputField
              label="Game ID"
              name="teamLeaderGameId"
              placeholder={`Enter your ${gameType.toUpperCase()} ${gameType === 'bgmi' ? 'ID' : 'UID'}`}
              validation={{
                required: 'Game ID is required',
                validate: validateGameId
              }}
              icon={Hash}
              required
            />
          </div>

          <InputField
            label="WhatsApp Number"
            name="whatsapp"
            placeholder="10-digit WhatsApp number"
            validation={{
              required: 'WhatsApp number is required',
              validate: validateWhatsApp
            }}
            icon={Phone}
            type="tel"
            required
          />
        </motion.div>

        {/* Player 2 (for duo/squad) */}
        {(tournamentType === 'duo' || tournamentType === 'squad') && (
          <motion.div
            className="space-y-6 p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="font-semibold text-blue-400 text-lg">Player 2 Details</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Name"
                name="player2Name"
                placeholder="Enter player 2 name"
                validation={{ required: 'Player 2 name is required' }}
                icon={User}
                required
              />

              <InputField
                label="Game ID"
                name="player2GameId"
                placeholder={`Enter player 2 ${gameType.toUpperCase()} ${gameType === 'bgmi' ? 'ID' : 'UID'}`}
                validation={{
                  required: 'Player 2 game ID is required',
                  validate: validateGameId
                }}
                icon={Hash}
                required
              />
            </div>
          </motion.div>
        )}

        {/* Players 3 & 4 (for squad only) */}
        {tournamentType === 'squad' && (
          <>
            <motion.div
              className="space-y-6 p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-green-400" />
                </div>
                <h4 className="font-semibold text-green-400 text-lg">Player 3 Details</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Name"
                  name="player3Name"
                  placeholder="Enter player 3 name"
                  validation={{ required: 'Player 3 name is required' }}
                  icon={User}
                  required
                />

                <InputField
                  label="Game ID"
                  name="player3GameId"
                  placeholder={`Enter player 3 ${gameType.toUpperCase()} ${gameType === 'bgmi' ? 'ID' : 'UID'}`}
                  validation={{
                    required: 'Player 3 game ID is required',
                    validate: validateGameId
                  }}
                  icon={Hash}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-6 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-yellow-400" />
                </div>
                <h4 className="font-semibold text-yellow-400 text-lg">Player 4 Details</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Name"
                  name="player4Name"
                  placeholder="Enter player 4 name"
                  validation={{ required: 'Player 4 name is required' }}
                  icon={User}
                  required
                />

                <InputField
                  label="Game ID"
                  name="player4GameId"
                  placeholder={`Enter player 4 ${gameType.toUpperCase()} ${gameType === 'bgmi' ? 'ID' : 'UID'}`}
                  validation={{
                    required: 'Player 4 game ID is required',
                    validate: validateGameId
                  }}
                  icon={Hash}
                  required
                />
              </div>
            </motion.div>
          </>
        )}

        {/* Payment Section */}
        <motion.div
          className="space-y-6 p-6 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl border border-orange-500/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-orange-400" />
            </div>
            <h4 className="font-bold text-xl text-orange-400">Payment Details</h4>
          </div>

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <span className="text-gray-300 font-medium">Entry Fee:</span>
                <div className="text-sm text-gray-400">Pay via QR code below</div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-6 h-6 text-green-400" />
                <span className="text-3xl font-bold text-green-400">{config.entryFee}</span>
              </div>
              <div className="text-sm text-gray-400">per {tournamentType}</div>
            </div>
          </div>

          {qrCodeUrl && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm font-semibold text-gray-300">Scan to Pay</span>
              </div>
              <div className="inline-block p-4 bg-white rounded-xl shadow-2xl relative">
                <Image src={qrCodeUrl} alt="Payment QR Code" width={200} height={200} className="rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl pointer-events-none"></div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-200">
              Payment Screenshot <span className="text-red-400">*</span>
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
                className={cn(
                  "flex items-center justify-center space-x-3 w-full px-6 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300",
                  uploadingScreenshot
                    ? "border-purple-400 bg-purple-500/10"
                    : screenshotPreview
                      ? "border-green-400 bg-green-500/10 hover:bg-green-500/20"
                      : "border-gray-600 hover:border-purple-400 hover:bg-purple-500/10"
                )}
              >
                <AnimatePresence mode="wait">
                  {uploadingScreenshot ? (
                    <motion.div
                      key="uploading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-3"
                    >
                      <Loader className="w-5 h-5 animate-spin text-purple-400" />
                      <span className="text-purple-400 font-medium">Uploading...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-3"
                    >
                      <Upload className="w-5 h-5" />
                      <span className="font-medium">
                        {screenshotPreview ? 'Change Screenshot' : 'Upload Screenshot'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </label>
            </div>

            <AnimatePresence>
              {showPreview && screenshotPreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative inline-block"
                >
                  <Image src={screenshotPreview} alt="Screenshot preview" width={200} height={200} className="rounded-xl shadow-lg" />
                  <button
                    onClick={removeScreenshot}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <InputField
            label="Transaction ID"
            name="transactionId"
            placeholder="Enter transaction ID from payment"
            validation={{ required: 'Transaction ID is required' }}
            icon={Hash}
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || uploadingScreenshot}
          className={cn(
            "w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            isSubmitting || uploadingScreenshot
              ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
              : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
          )}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={!isSubmitting && !uploadingScreenshot ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting && !uploadingScreenshot ? { scale: 0.98 } : {}}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <Loader className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </motion.div>
            ) : (
              <motion.div
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <Send className="w-5 h-5" />
                <span>Submit Registration</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.form>
  )
}

