'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import TournamentTabs from '@/components/TournamentTabs'
import RulesSection from '@/components/RulesSection'
import { GAME_INFO } from '@/lib/constants'
import { Gamepad2, Info, Star, Trophy, Users, Clock, Shield, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import FloatingActionButton from '@/components/FloatingActionButton'
import ParticleBackground from '@/components/ParticleBackground'
import InteractiveBackground from '@/components/InteractiveBackground'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function BGMIPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1 })
  const { ref: infoRef, inView: infoInView } = useInView({ threshold: 0.3 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navbar />

      <div className="pt-24 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="text-center mb-16"
            initial="initial"
            animate={headerInView ? "animate" : "initial"}
            variants={stagger}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full text-sm font-semibold mb-6 border border-orange-500/30 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <Gamepad2 className="w-5 h-5 text-orange-400" />
              <span>BGMI Tournament</span>
              <Star className="w-4 h-4 text-yellow-400" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                {GAME_INFO.bgmi.fullName}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              {GAME_INFO.bgmi.description}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className="glass-effect rounded-xl p-4 border border-orange-500/20 text-center">
                <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">100</div>
                <div className="text-xs text-gray-400">Solo Players</div>
              </div>
              <div className="glass-effect rounded-xl p-4 border border-orange-500/20 text-center">
                <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">50</div>
                <div className="text-xs text-gray-400">Duo Teams</div>
              </div>
              <div className="glass-effect rounded-xl p-4 border border-orange-500/20 text-center">
                <Target className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-400">25</div>
                <div className="text-xs text-gray-400">Squad Teams</div>
              </div>
              <div className="glass-effect rounded-xl p-4 border border-orange-500/20 text-center">
                <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Game Info */}
          <motion.div
            ref={infoRef}
            className="glass-effect rounded-2xl p-8 mb-12 border border-orange-500/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>

            <div className="relative">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-orange-400">About BGMI</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GAME_INFO.bgmi.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20"
                    initial={{ opacity: 0, x: -30 }}
                    animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex-shrink-0 mt-1 animate-pulse"></div>
                    <span className="text-gray-300 leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tournament Tabs */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TournamentTabs gameType="bgmi" />
          </motion.div>

          {/* Rules Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <RulesSection gameType="bgmi" />
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  )
}

