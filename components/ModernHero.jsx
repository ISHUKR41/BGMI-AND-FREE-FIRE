'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Play, Star, Zap, Trophy, Target } from 'lucide-react'
import TypewriterEffect from './TypewriterEffect'
import { useInView } from 'react-intersection-observer'

export default function ModernHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.1 })

  const heroContent = [
    {
      badge: "🎮 Professional Gaming",
      title: "Compete in Epic",
      subtitle: "BGMI & Free Fire",
      description: "Join India's most competitive gaming tournaments with instant payouts and fair play guarantee",
      cta: "Start Playing",
      accent: "Tournaments"
    },
    {
      badge: "🏆 Win Big Prizes", 
      title: "Dominate the",
      subtitle: "Battlegrounds",
      description: "Win up to ₹350 per match plus per-kill bonuses in our professionally managed esports tournaments",
      cta: "Join Now",
      accent: "Arena"
    },
    {
      badge: "⚡ Real-time Updates",
      title: "Experience the",
      subtitle: "Ultimate Gaming",
      description: "Live slot tracking, instant registration, and seamless payment processing for the best experience",
      cta: "Play Now",
      accent: "Platform"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const current = heroContent[currentIndex]

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Dynamic background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-72 h-72 rounded-full opacity-20 blur-3xl`}
            style={{
              background: `linear-gradient(45deg, ${
                i % 2 === 0 ? '#8b5cf6, #ec4899' : '#f59e0b, #ef4444'
              })`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm"
              >
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold">{current.badge}</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </motion.div>

              {/* Main title */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="text-6xl sm:text-8xl font-bold leading-tight">
                  <span className="block text-white">{current.title}</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    {current.subtitle}
                  </span>
                  <span className="block text-4xl sm:text-6xl text-gray-300">
                    <TypewriterEffect
                      words={[current.accent, "Championship", "Victory"]}
                      typeSpeed={150}
                      deleteSpeed={100}
                      delayBetweenWords={2000}
                    />
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                {current.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              >
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg shadow-xl overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>{current.cta}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                <motion.button
                  className="group px-8 py-4 border-2 border-white/20 rounded-2xl font-semibold text-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>View Tournaments</span>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Stats preview */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-sm text-gray-400">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">₹10L+</div>
              <div className="text-sm text-gray-400">Prize Pool</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">98%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-purple-400 w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
