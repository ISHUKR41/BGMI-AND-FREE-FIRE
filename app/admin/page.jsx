'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  Shield, LogOut, Gamepad2, RefreshCw, Check, X, Trash2,
  Clock, CheckCircle, XCircle, Filter, Image as ImageIcon,
  QrCode, Upload, Loader, Users, Trophy, Target, Star,
  Eye, EyeOff, Search, Download, AlertTriangle, UserCheck
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ConfirmModal, ImageModal } from '@/components/Modal'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import { StatCard } from '@/components/AnimatedCounter'
import AdvancedLoader from '@/components/AdvancedLoader'
import ParticleBackground from '@/components/ParticleBackground'

export default function AdminDashboard() {
  const [activeGame, setActiveGame] = useState('bgmi')
  const [activeTournament, setActiveTournament] = useState('solo')
  const [registrations, setRegistrations] = useState([])
  const [tournaments, setTournaments] = useState({})
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState({})
  const [uploadingQR, setUploadingQR] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [showImageModal, setShowImageModal] = useState(false)
  const [imageModalSrc, setImageModalSrc] = useState('')
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    approvedCount: 0,
    pendingCount: 0,
    rejectedCount: 0,
  })

  const router = useRouter()
  
  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    fetchData()
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    
    return () => clearInterval(interval)
  }, [activeGame, activeTournament, statusFilter, router])
  
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const headers = { Authorization: `Bearer ${token}` }
      
      // Fetch registrations
      let url = `/api/registrations?gameType=${activeGame}&tournamentType=${activeTournament}`
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`
      }
      
      const regResponse = await axios.get(url, { headers })
      setRegistrations(regResponse.data.registrations || [])
      
      // Calculate stats
      const allRegs = regResponse.data.registrations || []
      setStats({
        totalRegistrations: allRegs.length,
        approvedCount: allRegs.filter(r => r.status === 'approved').length,
        pendingCount: allRegs.filter(r => r.status === 'pending').length,
        rejectedCount: allRegs.filter(r => r.status === 'rejected').length,
      })
      
      // Fetch tournaments
      const tourResponse = await axios.get(`/api/tournaments?gameType=${activeGame}`)
      const tourMap = {}
      if (tourResponse.data.tournaments) {
        tourResponse.data.tournaments.forEach(t => {
          tourMap[t.tournamentType] = t
        })
      }
      setTournaments(tourMap)
      
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
      } else {
        setLoading(false)
      }
    }
  }
  
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout')
      localStorage.removeItem('adminToken')
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    }
  }

  // Enhanced confirmation handlers
  const handleConfirmAction = (action, id, actionType) => {
    let message = ''
    switch (actionType) {
      case 'approve':
        message = 'Are you sure you want to approve this registration?'
        break
      case 'reject':
        message = 'Are you sure you want to reject this registration?'
        break
      case 'delete':
        message = 'Are you sure you want to delete this registration? This action cannot be undone.'
        break
      case 'reset':
        message = `Are you sure you want to reset ${activeGame.toUpperCase()} ${activeTournament} tournament? This will delete all registrations!`
        break
      default:
        message = 'Are you sure you want to perform this action?'
    }

    setConfirmMessage(message)
    setConfirmAction({ action, id, actionType })
    setShowConfirmModal(true)
  }

  const executeConfirmAction = async () => {
    if (!confirmAction) return

    const { action, id, actionType } = confirmAction

    try {
      if (actionType === 'reset') {
        await handleResetTournament()
      } else if (actionType === 'approve') {
        await handleApprove(id)
      } else if (actionType === 'reject') {
        await handleReject(id)
      } else if (actionType === 'delete') {
        await handleDelete(id)
      }
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setShowConfirmModal(false)
      setConfirmAction(null)
    }
  }

  const handleImageClick = (src) => {
    setImageModalSrc(src)
    setShowImageModal(true)
  }

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(reg => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    return (
      reg.teamName?.toLowerCase().includes(searchLower) ||
      reg.teamLeader?.name?.toLowerCase().includes(searchLower) ||
      reg.teamLeader?.gameId?.toLowerCase().includes(searchLower) ||
      reg.teamLeader?.whatsapp?.includes(searchTerm) ||
      reg.payment?.transactionId?.toLowerCase().includes(searchLower)
    )
  })
  
  const handleApprove = async (id) => {
    setProcessing({ ...processing, [id]: 'approving' })
    
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.patch(
        `/api/registrations/${id}`,
        { status: 'approved' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      if (response.data.success) {
        toast.success('Registration approved!')
        fetchData()
      }
    } catch (error) {
      console.error('Approve error:', error)
      toast.error(error.response?.data?.message || 'Failed to approve')
    } finally {
      setProcessing({ ...processing, [id]: null })
    }
  }
  
  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason (optional):')
    
    setProcessing({ ...processing, [id]: 'rejecting' })
    
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.patch(
        `/api/registrations/${id}`,
        { status: 'rejected', rejectionReason: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      if (response.data.success) {
        toast.success('Registration rejected!')
        fetchData()
      }
    } catch (error) {
      console.error('Reject error:', error)
      toast.error(error.response?.data?.message || 'Failed to reject')
    } finally {
      setProcessing({ ...processing, [id]: null })
    }
  }
  
  const handleDelete = async (id) => {
    setProcessing({ ...processing, [id]: 'deleting' })
    
    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`/api/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      toast.success('Registration deleted!')
      fetchData()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete')
    } finally {
      setProcessing({ ...processing, [id]: null })
    }
  }
  
  const handleResetTournament = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.post(
        '/api/tournaments/reset',
        { gameType: activeGame, tournamentType: activeTournament },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      if (response.data.success) {
        toast.success('Tournament reset successfully!')
        fetchData()
      }
    } catch (error) {
      console.error('Reset error:', error)
      toast.error('Failed to reset tournament')
    }
  }
  
  const handleQRUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploadingQR(true)
    
    try {
      // Upload file
      const formData = new FormData()
      formData.append('file', file)
      
      const uploadResponse = await axios.post('/api/upload', formData)
      
      if (uploadResponse.data.success) {
        // Update tournament with QR code
        const token = localStorage.getItem('adminToken')
        await axios.put(
          '/api/tournaments',
          {
            gameType: activeGame,
            tournamentType: activeTournament,
            qrCodeUrl: uploadResponse.data.url
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        
        toast.success('QR Code updated successfully!')
        fetchData()
      }
    } catch (error) {
      console.error('QR upload error:', error)
      toast.error('Failed to upload QR code')
    } finally {
      setUploadingQR(false)
    }
  }
  
  const currentTournament = tournaments[activeTournament] || {}

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Advanced Background */}
      <ParticleBackground />
      
      {/* Enhanced Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/15 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-500/15 to-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-effect rounded-2xl p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl"></div>

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-400 text-lg">Professional Tournament Management</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={fetchData}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
                  title="Refresh Data"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-5 h-5 text-purple-400" />
                </motion.button>

                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-400 rounded-xl transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatCard
            title="Total Registrations"
            value={stats.totalRegistrations}
            icon={Users}
            className="glass-effect border border-white/10"
          />
          <StatCard
            title="Approved"
            value={stats.approvedCount}
            icon={CheckCircle}
            className="glass-effect border border-green-500/20"
          />
          <StatCard
            title="Pending"
            value={stats.pendingCount}
            icon={Clock}
            className="glass-effect border border-yellow-500/20"
          />
          <StatCard
            title="Rejected"
            value={stats.rejectedCount}
            icon={XCircle}
            className="glass-effect border border-red-500/20"
          />
        </motion.div>

        {/* Game Selector */}
        <motion.div
          className="flex gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => setActiveGame('bgmi')}
            className={cn(
              "flex-1 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden",
              activeGame === 'bgmi'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                : 'glass-effect text-gray-300 hover:text-white border border-white/10 hover:border-orange-500/30 hover:bg-orange-500/5'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <Gamepad2 className="w-6 h-6" />
              <span>BGMI</span>
            </div>
            {activeGame === 'bgmi' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20"
                layoutId="activeGame"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>

          <motion.button
            onClick={() => setActiveGame('freefire')}
            className={cn(
              "flex-1 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden",
              activeGame === 'freefire'
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
                : 'glass-effect text-gray-300 hover:text-white border border-white/10 hover:border-red-500/30 hover:bg-red-500/5'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <Gamepad2 className="w-6 h-6" />
              <span>Free Fire</span>
            </div>
            {activeGame === 'freefire' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20"
                layoutId="activeGame"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        </motion.div>
        
        {/* Tournament Type Selector */}
        <div className="flex gap-4 mb-6">
          {['solo', 'duo', 'squad'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveTournament(type)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all capitalize ${
                activeTournament === type
                  ? 'bg-gradient-gaming text-white'
                  : 'glass-effect text-gray-300 hover:text-white'
              }`}
            >
              {type}
              {tournaments[type] && (
                <span className="ml-2 text-xs opacity-80">
                  ({tournaments[type].approvedCount || 0}/{tournaments[type].maxSlots || 0})
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Tournament Info & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="glass-effect rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4">Slot Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Slots:</span>
                <span className="font-bold">{currentTournament.maxSlots || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Approved:</span>
                <span className="font-bold text-green-400">{currentTournament.approvedCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pending:</span>
                <span className="font-bold text-yellow-400">{currentTournament.pendingCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Available:</span>
                <span className="font-bold text-blue-400">{currentTournament.availableSlots || currentTournament.maxSlots || 0}</span>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <QrCode className="w-5 h-5 mr-2" />
              Payment QR Code
            </h3>
            
            {currentTournament.qrCodeUrl ? (
              <div className="space-y-3">
                <Image 
                  src={currentTournament.qrCodeUrl} 
                  alt="QR Code" 
                  width={150}
                  height={150}
                  className="rounded-lg mx-auto bg-white p-2 cursor-pointer"
                  onClick={() => handleImageClick(currentTournament.qrCodeUrl)}
                />
                <label className="btn-primary text-sm flex items-center justify-center space-x-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Change QR</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleQRUpload}
                    className="hidden"
                    disabled={uploadingQR}
                  />
                </label>
              </div>
            ) : (
              <label className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition-colors block">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-400">Upload QR Code</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQRUpload}
                  className="hidden"
                  disabled={uploadingQR}
                />
              </label>
            )}
          </div>
          
          <div className="glass-effect rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <button
              onClick={() => handleConfirmAction(null, null, 'reset')}
              className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Tournament</span>
            </button>
          </div>
        </div>
        
        {/* Status Filter */}
        <div className="glass-effect rounded-xl p-4 mb-6 border border-white/10">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                    statusFilter === status
                      ? 'bg-gradient-gaming text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Registrations List */}
        <div className="space-y-4">
          {loading ? (
            <motion.div 
              className="glass-effect rounded-xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AdvancedLoader type="gaming" size="lg" text="Loading registrations..." />
            </motion.div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="glass-effect rounded-xl p-12 text-center">
              <p className="text-gray-400">No registrations found</p>
            </div>
          ) : (
            filteredRegistrations.map((reg) => (
              <div key={reg._id} className="glass-effect rounded-xl p-6 border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Registration Details */}
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{reg.teamName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reg.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        reg.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {reg.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Team Leader:</span>
                        <span className="font-medium">{reg.teamLeader.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Game ID:</span>
                        <span className="font-mono">{reg.teamLeader.gameId}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">WhatsApp:</span>
                        <span>{reg.teamLeader.whatsapp}</span>
                      </div>
                      
                      {reg.players && reg.players.length > 0 && (
                        <div className="pt-2 border-t border-white/10">
                          <span className="text-gray-400 text-xs">Team Members:</span>
                          <div className="mt-1 space-y-1">
                            {reg.players.map((player, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-xs">
                                <span className="text-gray-500">#{idx + 2}</span>
                                <span>{player.name}</span>
                                <span className="text-gray-500">({player.gameId})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(reg.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-400">Payment Details</h4>
                    
                    {reg.payment?.screenshot && (
                      <div 
                        className="cursor-pointer"
                        onClick={() => handleImageClick(reg.payment.screenshot)}
                      >
                        <Image 
                          src={reg.payment.screenshot} 
                          alt="Payment Screenshot" 
                          width={200}
                          height={200}
                          className="rounded-lg hover:opacity-80 transition-opacity"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-400">Transaction ID:</span>
                      <span className="font-mono text-xs">{reg.payment?.transactionId}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {reg.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(reg._id)}
                          disabled={processing[reg._id]}
                          className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                          {processing[reg._id] === 'approving' ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          <span>Approve</span>
                        </button>
                        
                        <button
                          onClick={() => handleReject(reg._id)}
                          disabled={processing[reg._id]}
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                          {processing[reg._id] === 'rejecting' ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                          <span>Reject</span>
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => handleDelete(reg._id)}
                      disabled={processing[reg._id]}
                      className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {processing[reg._id] === 'deleting' ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={executeConfirmAction}
        title="Confirm Action"
        message={confirmMessage}
        confirmText="Confirm"
        cancelText="Cancel"
        variant={confirmAction?.actionType === 'delete' || confirmAction?.actionType === 'reset' ? 'danger' : 'primary'}
        loading={Object.values(processing).some(Boolean)}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        src={imageModalSrc}
        alt="Payment Screenshot"
        title="Payment Screenshot"
      />
    </div>
  )
}