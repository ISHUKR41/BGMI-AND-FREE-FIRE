'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  Shield, LogOut, Gamepad2, RefreshCw, Check, X, Trash2,
  Clock, CheckCircle, XCircle, Filter, Image as ImageIcon,
  QrCode, Upload, Loader, Users, Trophy, Target, Star,
  Eye, EyeOff, Search, Download, AlertTriangle, UserCheck,
  BarChart3, TrendingUp, Activity, Zap, Crown, Award,
  Settings, Bell, HelpCircle, ChevronDown, ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ConfirmModal, ImageModal } from '@/components/Modal'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import { StatCard } from '@/components/AnimatedCounter'
import AdvancedLoader from '@/components/AdvancedLoader'
import ParticleBackground from '@/components/ParticleBackground'
import InteractiveBackground from '@/components/InteractiveBackground'
import { useInView } from 'react-intersection-observer'

export default function ModernAdminDashboard() {
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
  const [expandedCards, setExpandedCards] = useState({})
  const [showSidebar, setShowSidebar] = useState(true)
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    approvedCount: 0,
    pendingCount: 0,
    rejectedCount: 0,
  })

  const router = useRouter()
  const { ref, inView } = useInView({ threshold: 0.1 })
  
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    fetchData()
    
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [activeGame, activeTournament, statusFilter, router])
  
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const headers = { Authorization: `Bearer ${token}` }
      
      let url = `/api/registrations?gameType=${activeGame}&tournamentType=${activeTournament}`
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`
      }
      
      const regResponse = await axios.get(url, { headers })
      setRegistrations(regResponse.data.registrations || [])
      
      const allRegs = regResponse.data.registrations || []
      setStats({
        totalRegistrations: allRegs.length,
        approvedCount: allRegs.filter(r => r.status === 'approved').length,
        pendingCount: allRegs.filter(r => r.status === 'pending').length,
        rejectedCount: allRegs.filter(r => r.status === 'rejected').length,
      })
      
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
        toast.error('Failed to fetch data')
      }
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    setProcessing(prev => ({ ...prev, [id]: true }))
    
    try {
      const token = localStorage.getItem('adminToken')
      await axios.patch(`/api/registrations/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setRegistrations(prev => 
        prev.map(reg => 
          reg._id === id ? { ...reg, status: newStatus } : reg
        )
      )
      
      toast.success(`Registration ${newStatus} successfully`)
      fetchData()
    } catch (error) {
      console.error('Status change error:', error)
      toast.error('Failed to update status')
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleDelete = async (id) => {
    setProcessing(prev => ({ ...prev, [id]: true }))
    
    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`/api/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setRegistrations(prev => prev.filter(reg => reg._id !== id))
      toast.success('Registration deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete registration')
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleResetTournament = async () => {
    setUploadingQR(true)
    
    try {
      const token = localStorage.getItem('adminToken')
      await axios.post(`/api/tournaments/reset`, {
        gameType: activeGame,
        tournamentType: activeTournament
      }, { headers: { Authorization: `Bearer ${token}` } })
      
      toast.success('Tournament reset successfully')
      fetchData()
    } catch (error) {
      console.error('Reset error:', error)
      toast.error('Failed to reset tournament')
    } finally {
      setUploadingQR(false)
    }
  }

  const handleQRUpload = async (qrCodeUrl) => {
    setUploadingQR(true)
    
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put('/api/tournaments', {
        gameType: activeGame,
        tournamentType: activeTournament,
        qrCodeUrl
      }, { headers: { Authorization: `Bearer ${token}` } })
      
      toast.success('QR code updated successfully')
      fetchData()
    } catch (error) {
      console.error('QR upload error:', error)
      toast.error('Failed to update QR code')
    } finally {
      setUploadingQR(false)
    }
  }

  const filteredRegistrations = registrations.filter(reg => 
    reg.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.teamLeader?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.teamLeader?.whatsapp?.includes(searchTerm)
  )

  const toggleCardExpansion = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  if (loading) {
    return <AdvancedLoader isVisible={true} message="Loading Admin Dashboard..." />
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <InteractiveBackground />
      <ParticleBackground />
      
      {/* Modern Header */}
      <motion.header
        className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </motion.button>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-400">Tournament Management System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={fetchData}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-5 h-5 text-blue-400" />
              </motion.button>

              <motion.button
                onClick={() => {
                  localStorage.removeItem('adminToken')
                  router.push('/admin/login')
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Modern Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 bg-slate-800/50 backdrop-blur-xl border-r border-white/10 min-h-screen"
            >
              <div className="p-6 space-y-6">
                {/* Game Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Gamepad2 className="w-5 h-5 mr-2 text-purple-400" />
                    Game Selection
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'bgmi', name: 'BGMI', color: 'from-orange-500 to-red-500' },
                      { id: 'freefire', name: 'Free Fire', color: 'from-red-500 to-pink-500' }
                    ].map((game) => (
                      <motion.button
                        key={game.id}
                        onClick={() => setActiveGame(game.id)}
                        className={cn(
                          "p-3 rounded-xl font-semibold transition-all duration-300",
                          activeGame === game.id
                            ? `bg-gradient-to-r ${game.color} text-white shadow-lg`
                            : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {game.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Tournament Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                    Tournament Type
                  </h3>
                  <div className="space-y-2">
                    {['solo', 'duo', 'squad'].map((type) => (
                      <motion.button
                        key={type}
                        onClick={() => setActiveTournament(type)}
                        className={cn(
                          "w-full p-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-between",
                          activeTournament === type
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="capitalize">{type}</span>
                        {activeTournament === type && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-blue-400" />
                    Status Filter
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: 'all', name: 'All', count: stats.totalRegistrations, color: 'gray' },
                      { id: 'pending', name: 'Pending', count: stats.pendingCount, color: 'yellow' },
                      { id: 'approved', name: 'Approved', count: stats.approvedCount, color: 'green' },
                      { id: 'rejected', name: 'Rejected', count: stats.rejectedCount, color: 'red' }
                    ].map((status) => (
                      <motion.button
                        key={status.id}
                        onClick={() => setStatusFilter(status.id)}
                        className={cn(
                          "w-full p-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-between",
                          statusFilter === status.id
                            ? `bg-${status.color}-600 text-white shadow-lg`
                            : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{status.name}</span>
                        <span className="px-2 py-1 bg-slate-600 rounded-full text-xs">
                          {status.count}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-orange-400" />
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => setShowConfirmModal(true)}
                      className="w-full p-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset Tournament
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <StatCard
                title="Total Registrations"
                value={stats.totalRegistrations}
                icon={Users}
                color="from-blue-500 to-cyan-500"
                trend="+12%"
              />
              <StatCard
                title="Approved"
                value={stats.approvedCount}
                icon={CheckCircle}
                color="from-green-500 to-emerald-500"
                trend="+8%"
              />
              <StatCard
                title="Pending"
                value={stats.pendingCount}
                icon={Clock}
                color="from-yellow-500 to-orange-500"
                trend="+5%"
              />
              <StatCard
                title="Rejected"
                value={stats.rejectedCount}
                icon={XCircle}
                color="from-red-500 to-pink-500"
                trend="-2%"
              />
            </motion.div>

            {/* Search and Controls */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-center justify-between"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
            </motion.div>

            {/* Registrations List */}
            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
                Registrations
                <span className="ml-3 px-3 py-1 bg-slate-800 rounded-full text-sm font-normal">
                  {filteredRegistrations.length}
                </span>
              </h2>

              <div className="space-y-4">
                {filteredRegistrations.map((registration, index) => (
                  <motion.div
                    key={registration._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {registration.teamName || 'Solo Player'}
                            </h3>
                            <p className="text-gray-400">
                              {registration.tournamentType.toUpperCase()} • {registration.gameType.toUpperCase()}
                            </p>
                          </div>
                          <motion.div
                            className={cn(
                              "px-3 py-1 rounded-full text-sm font-semibold",
                              registration.status === 'approved' && "bg-green-500/20 text-green-400 border border-green-500/30",
                              registration.status === 'pending' && "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
                              registration.status === 'rejected' && "bg-red-500/20 text-red-400 border border-red-500/30"
                            )}
                            whileHover={{ scale: 1.05 }}
                          >
                            {registration.status.toUpperCase()}
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-white mb-2">Team Leader</h4>
                            <p className="text-gray-300">{registration.teamLeader?.name}</p>
                            <p className="text-sm text-gray-400">{registration.teamLeader?.whatsapp}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-2">Game ID</h4>
                            <p className="text-gray-300 font-mono">{registration.teamLeader?.gameId}</p>
                          </div>
                        </div>

                        {registration.players && registration.players.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-white mb-2">Team Members</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {registration.players.map((player, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                  <span className="text-gray-300">{player.name}</span>
                                  <span className="text-gray-500">({player.gameId})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {registration.payment && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-white mb-2">Payment Details</h4>
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-300">
                                Transaction ID: {registration.payment.transactionId}
                              </span>
                              {registration.payment.screenshot && (
                                <motion.button
                                  onClick={() => {
                                    setImageModalSrc(registration.payment.screenshot)
                                    setShowImageModal(true)
                                  }}
                                  className="flex items-center space-x-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <ImageIcon className="w-4 h-4" />
                                  <span>View Screenshot</span>
                                </motion.button>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="text-sm text-gray-400">
                          Registered: {new Date(registration.submittedAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        {registration.status === 'pending' && (
                          <>
                            <motion.button
                              onClick={() => handleStatusChange(registration._id, 'approved')}
                              disabled={processing[registration._id]}
                              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors disabled:opacity-50"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {processing[registration._id] ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </motion.button>
                            <motion.button
                              onClick={() => handleStatusChange(registration._id, 'rejected')}
                              disabled={processing[registration._id]}
                              className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors disabled:opacity-50"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </>
                        )}
                        <motion.button
                          onClick={() => {
                            setConfirmAction(() => () => handleDelete(registration._id))
                            setConfirmMessage('Are you sure you want to delete this registration?')
                            setShowConfirmModal(true)
                          }}
                          disabled={processing[registration._id]}
                          className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          if (confirmAction) {
            confirmAction()
            setShowConfirmModal(false)
          }
        }}
        title="Confirm Action"
        message={confirmMessage}
      />

      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        src={imageModalSrc}
        alt="Payment Screenshot"
      />
    </div>
  )
}
