'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { 
  ArrowRight, Gamepad2, Users, IndianRupee, Trophy, Target,
  Zap, Play, Star, Crown, Medal, Swords
} from 'lucide-react'
import { GAME_INFO, TOURNAMENT_CONFIG } from '@/lib/constants'
import CountUpAnimation from './CountUpAnimation'

export default function ModernGameCards() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  const gameCards = [
    {
      id: 'bgmi',
      title: 'BGMI',
      fullName: 'Battlegrounds Mobile India',
      description: 'Battle royale at its finest. Compete in the ultimate survival game with realistic graphics and intense gameplay.',
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30',
      glowColor: 'shadow-orange-500/25',
      icon: '🔥',
      features: [
        'Realistic battle royale experience',
        'Multiple game modes available', 
        'Advanced weapon systems',
        'Strategic gameplay elements',
        'Professional tournament support'
      ],
      tournaments: {
        solo: { maxPlayers: 100, entryFee: 20 },
        duo: { maxTeams: 50, entryFee: 40 },
        squad: { maxTeams: 25, entryFee: 80 }
      },
      prizes: {
        winner: 350,
        runnerUp: 250,
        perKill: 9
      },
      href: '/bgmi'
    },
    {
      id: 'freefire',
      title: 'Free Fire',
      fullName: 'Garena Free Fire MAX',
      description: 'Fast-paced battle royale with unique characters and abilities. Quick matches, intense action.',
      gradient: 'from-red-500 via-pink-500 to-purple-600',
      bgGradient: 'from-red-500/20 to-pink-500/20', 
      borderColor: 'border-red-500/30',
      glowColor: 'shadow-red-500/25',
      icon: '⚡',
      features: [
        'Fast-paced 10-minute matches',
        'Unique character abilities',
        'Dynamic weapon combinations',
        'Strategic team gameplay',
        'Mobile-optimized controls'
      ],
      tournaments: {
        solo: { maxPlayers: 48, entryFee: 20 },
        duo: { maxTeams: 24, entryFee: 40 },
        squad: { maxTeams: 12, entryFee: 80 }
      },
      prizes: {
        winner: 350,
        runnerUp: 150,
        perKill: 5
      },
      href: '/freefire'
    }
  ]

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Swords className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Choose Your Battle</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Elite Gaming
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Tournaments
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of players competing in India's most prestigious mobile gaming tournaments.
            Professional management, instant payouts, and fair play guaranteed.
          </p>
        </motion.div>

        {/* Game cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {gameCards.map((game, index) => (
            <motion.div
              key={game.id}
              variants={cardVariants}
              className="group relative"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`
                glass-effect rounded-3xl overflow-hidden border transition-all duration-500 h-full
                ${game.borderColor} hover:border-opacity-80 ${game.glowColor} hover:shadow-2xl
              `}>
                {/* Header section with icon */}
                <div className={`h-80 bg-gradient-to-br ${game.bgGradient} relative overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="grid grid-cols-8 h-full">
                      {[...Array(64)].map((_, i) => (
                        <div
                          key={i}
                          className="border border-white/5 animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Main icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className={`w-40 h-40 rounded-3xl flex items-center justify-center shadow-2xl bg-gradient-to-br ${game.gradient}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-6xl">{game.icon}</span>
                    </motion.div>
                  </div>

                  {/* Game badge */}
                  <div className="absolute top-6 right-6">
                    <div className={`px-4 py-2 backdrop-blur-sm rounded-full border ${game.borderColor}`}>
                      <span className="text-sm font-semibold text-white">{game.title}</span>
                    </div>
                  </div>

                  {/* Live indicator */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-green-300">LIVE</span>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-8 space-y-8">
                  {/* Title and description */}
                  <div>
                    <motion.h3
                      className={`text-3xl font-bold mb-3 bg-gradient-to-r ${game.gradient} bg-clip-text text-transparent`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {game.fullName}
                    </motion.h3>

                    <p className="text-gray-300 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span>Key Features</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {game.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          viewport={{ once: true }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${game.gradient} flex-shrink-0`} />
                          <span className="text-sm text-gray-400">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tournament slots */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <span>Tournament Capacity</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(game.tournaments).map(([mode, config]) => (
                        <div 
                          key={mode}
                          className={`text-center p-4 rounded-xl border ${game.borderColor} bg-gradient-to-br ${game.bgGradient}`}
                        >
                          <div className="text-sm uppercase font-semibold text-gray-400 mb-1">{mode}</div>
                          <div className={`text-2xl font-bold bg-gradient-to-r ${game.gradient} bg-clip-text text-transparent`}>
                            {config.maxPlayers || config.maxTeams}
                          </div>
                          <div className="text-xs text-gray-500">
                            {config.maxPlayers ? 'Players' : 'Teams'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prize structure */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span>Prize Structure</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                        <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                        <div className="flex items-center justify-center space-x-1 text-yellow-400 font-bold text-lg">
                          <IndianRupee className="w-4 h-4" />
                          <span>{game.prizes.winner}</span>
                        </div>
                        <div className="text-xs text-gray-400">Winner</div>
                      </div>

                      <div className="text-center p-4 bg-gradient-to-br from-gray-500/10 to-slate-500/10 rounded-xl border border-gray-500/20">
                        <Medal className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <div className="flex items-center justify-center space-x-1 text-gray-300 font-bold text-lg">
                          <IndianRupee className="w-4 h-4" />
                          <span>{game.prizes.runnerUp}</span>
                        </div>
                        <div className="text-xs text-gray-400">Runner Up</div>
                      </div>

                      <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                        <Target className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                        <div className="flex items-center justify-center space-x-1 text-purple-400 font-bold text-lg">
                          <IndianRupee className="w-4 h-4" />
                          <span>{game.prizes.perKill}</span>
                        </div>
                        <div className="text-xs text-gray-400">Per Kill</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={game.href} className="block">
                    <motion.button
                      className={`
                        w-full flex items-center justify-center space-x-3 group px-8 py-4 text-lg font-semibold rounded-2xl
                        bg-gradient-to-r ${game.gradient} hover:shadow-lg hover:${game.glowColor} transition-all duration-300
                      `}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-5 h-5" />
                      <span>Join {game.title} Tournament</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </Link>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl
                    bg-gradient-to-br ${game.gradient}
                  `}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-20 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <CountUpAnimation
            end={100000}
            prefix="₹"
            title="Total Prizes Won"
            icon={Trophy}
            duration={2.5}
            delay={0}
          />
          <CountUpAnimation
            end={5000}
            suffix="+"
            title="Active Players"
            icon={Users}
            duration={2.2}
            delay={0.2}
          />
          <CountUpAnimation
            end={150}
            suffix="+"
            title="Tournaments Held"
            icon={Gamepad2}
            duration={2}
            delay={0.4}
          />
          <CountUpAnimation
            end={99}
            suffix="%"
            title="Player Satisfaction"
            icon={Star}
            duration={1.8}
            delay={0.6}
          />
        </motion.div>
      </div>
    </section>
  )
}
