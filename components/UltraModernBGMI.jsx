'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Gamepad2, Trophy, Target, Users, Zap, Shield, 
  Star, Crown, Award, Play, ArrowRight, CheckCircle,
  Clock, IndianRupee, Swords, Flame, Eye, EyeOff
} from 'lucide-react'
import Link from 'next/link'
import ParticleBackground from './ParticleBackground'
import InteractiveBackground from './InteractiveBackground'
import TournamentTabs from './TournamentTabs'
import RulesSection from './RulesSection'
import CountUpAnimation from './CountUpAnimation'
import AdvancedLoader from './AdvancedLoader'

export default function UltraModernBGMI() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('overview')
  const { ref, inView } = useInView({ threshold: 0.1 })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: Trophy,
      title: "Epic Battles",
      description: "Experience the ultimate battle royale with realistic graphics and intense gameplay",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Target,
      title: "Precision Shooting",
      description: "Master the art of precision shooting with advanced weapon systems and mechanics",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: Shield,
      title: "Strategic Gameplay",
      description: "Plan your moves, coordinate with teammates, and dominate the battlefield",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Fast Action",
      description: "Quick matches with adrenaline-pumping action and instant results",
      color: "from-purple-400 to-pink-500"
    }
  ]

  const tournamentTypes = [
    {
      type: 'solo',
      name: 'Solo',
      players: 100,
      entryFee: 20,
      winner: 350,
      runnerUp: 250,
      perKill: 9,
      icon: Swords,
      color: 'from-orange-500 to-red-500',
      description: 'Test your individual skills in the ultimate solo battle'
    },
    {
      type: 'duo',
      name: 'Duo',
      players: 50,
      entryFee: 40,
      winner: 350,
      runnerUp: 250,
      perKill: 9,
      icon: Users,
      color: 'from-red-500 to-pink-500',
      description: 'Team up with a partner and dominate together'
    },
    {
      type: 'squad',
      name: 'Squad',
      players: 25,
      entryFee: 80,
      winner: 350,
      runnerUp: 250,
      perKill: 9,
      icon: Crown,
      color: 'from-pink-500 to-purple-500',
      description: 'Lead your squad to victory in epic team battles'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  if (loading) {
    return <AdvancedLoader isVisible={true} message="Loading BGMI Tournament..." />
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <InteractiveBackground />
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            className="text-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Game Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30 backdrop-blur-sm"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-orange-400">BGMI</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-8xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Battlegrounds
              </span>
              <br />
              <span className="text-white">Mobile India</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Join the ultimate battle royale experience! Compete with the best players,
              showcase your skills, and win amazing cash prizes in our professional BGMI tournaments.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <CountUpAnimation
                end={1000}
                suffix="+"
                title="Players"
                icon={Users}
                duration={2}
                delay={0}
              />
              <CountUpAnimation
                end={50000}
                prefix="₹"
                title="Prize Pool"
                icon={Trophy}
                duration={2.2}
                delay={0.2}
              />
              <CountUpAnimation
                end={100}
                suffix="+"
                title="Tournaments"
                icon={Award}
                duration={1.8}
                delay={0.4}
              />
              <CountUpAnimation
                end={98}
                suffix="%"
                title="Success Rate"
                icon={Target}
                duration={1.6}
                delay={0.6}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { id: 'overview', name: 'Overview', icon: Eye },
              { id: 'tournaments', name: 'Tournaments', icon: Trophy },
              { id: 'rules', name: 'Rules', icon: Shield }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
                  ${activeSection === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-slate-800 hover:bg-slate-700 text-gray-300'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'overview' && (
          <motion.section
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="py-20 px-4"
          >
            <div className="max-w-7xl mx-auto">
              {/* Features Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={index}
                      className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Tournament Types Preview */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-center mb-12">
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Tournament Types
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {tournamentTypes.map((tournament, index) => {
                    const Icon = tournament.icon
                    return (
                      <motion.div
                        key={tournament.type}
                        className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                      >
                        <div className={`w-20 h-20 bg-gradient-to-br ${tournament.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 text-white">{tournament.name}</h3>
                        <p className="text-gray-400 mb-6">{tournament.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Max Players:</span>
                            <span className="text-white font-bold">{tournament.players}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Entry Fee:</span>
                            <span className="text-orange-400 font-bold">₹{tournament.entryFee}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Winner Prize:</span>
                            <span className="text-green-400 font-bold">₹{tournament.winner}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Per Kill:</span>
                            <span className="text-purple-400 font-bold">₹{tournament.perKill}</span>
                          </div>
                        </div>

                        <motion.button
                          className={`w-full py-3 bg-gradient-to-r ${tournament.color} rounded-xl font-semibold text-white hover:shadow-lg transition-all duration-300`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveSection('tournaments')}
                        >
                          View Details
                        </motion.button>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {activeSection === 'tournaments' && (
          <motion.section
            key="tournaments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="py-20 px-4"
          >
            <div className="max-w-7xl mx-auto">
              <TournamentTabs gameType="bgmi" />
            </div>
          </motion.section>
        )}

        {activeSection === 'rules' && (
          <motion.section
            key="rules"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="py-20 px-4"
          >
            <div className="max-w-7xl mx-auto">
              <RulesSection gameType="bgmi" />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="glass-effect rounded-3xl p-12 md:p-16 border border-orange-500/30 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10" />
            
            <div className="relative">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Dominate?</span>
              </h2>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of players competing for amazing prizes in our professional BGMI tournaments!
              </p>

              <motion.button
                onClick={() => setActiveSection('tournaments')}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl font-semibold text-lg text-white hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Playing Now</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
