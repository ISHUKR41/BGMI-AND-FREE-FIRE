'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Trophy, Target, Zap, Shield, ArrowRight, Gamepad2, Users, IndianRupee, Star, Play, Award } from 'lucide-react'
import { GAME_INFO, TOURNAMENT_CONFIG } from '@/lib/constants'
import { StatCard, PrizeCounter, AnimatedCounter } from '@/components/AnimatedCounter'
import ParticleBackground from '@/components/ParticleBackground'
import TypewriterEffect from '@/components/TypewriterEffect'
import CountUpAnimation from '@/components/CountUpAnimation'
import InteractiveBackground from '@/components/InteractiveBackground'
import AdvancedLoader from '@/components/AdvancedLoader'
import FloatingActionButton from '@/components/FloatingActionButton'
import TooltipWrapper from '@/components/TooltipWrapper'
import ModernHero from '@/components/ModernHero'
import ModernFeatures from '@/components/ModernFeatures'
import ModernGameCards from '@/components/ModernGameCards'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 })

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
      {/* Advanced Interactive Background */}
      <InteractiveBackground />
      <ParticleBackground />
      
      <Navbar />

      {/* Modern Hero Section */}
      <ModernHero />

      {/* Modern Features Section */}
      <ModernFeatures />

      {/* Modern Games Section */}
      <ModernGameCards />

      {/* Prize Pool Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Prize Pool</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* BGMI Prizes */}
            <motion.div
              className="glass-effect rounded-2xl p-8 border border-orange-500/30 relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>

              <div className="relative">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-400">BGMI Tournaments</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      </div>
                      <span className="text-gray-300 font-medium">Winner Prize</span>
                    </div>
                    <div className="flex items-center space-x-2 text-yellow-400 font-bold text-2xl">
                      <IndianRupee className="w-6 h-6" />
                      <span>350</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-xl border border-gray-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="text-gray-300 font-medium">Runner Up</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 font-bold text-2xl">
                      <IndianRupee className="w-6 h-6" />
                      <span>250</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-gray-300 font-medium">Per Kill</span>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-400 font-bold text-2xl">
                      <IndianRupee className="w-6 h-6" />
                      <span>9</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Free Fire Prizes */}
            <motion.div
              className="glass-effect rounded-2xl p-8 border border-red-500/30 relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>

              <div className="relative">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-400">Free Fire Tournaments</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      </div>
                      <span className="text-gray-300 font-medium">Winner Prize</span>
                    </div>
                    <div className="flex items-center space-x-2 text-yellow-400 font-bold text-2xl">
                      <IndianRupee className="w-6 h-6" />
                      <span>350</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-xl border border-gray-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="text-gray-300 font-medium">Runner Up</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 font-bold text-2xl">
                      <IndianRupee className="w-6 h-6" />
                      <span>150</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-gray-300 font-medium">Per Kill</span>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-400 font-bold text-2xl">
                      <IndianRupee className="w-6 h-6" />
                      <span>5</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center glass-effect rounded-3xl p-12 md:p-16 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-orange-500/10"></div>

            <div className="relative">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8"
                initial={{ y: 50, rotate: -10 }}
                whileInView={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Ready to Show Your{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Skills?
                </span>
              </motion.h2>

              <motion.p
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Join thousands of players competing for amazing prizes in our professional gaming tournaments!
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="/bgmi" className="btn-bgmi px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                  Register for BGMI
                </Link>
                <Link href="/freefire" className="btn-freefire px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                  Register for Free Fire
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gaming Tournaments
              </span>
            </motion.div>

            <motion.p
              className="text-gray-400 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              &copy; 2025 Professional Gaming Platform. All rights reserved.
            </motion.p>

            <motion.p
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Play responsibly. 18+ only. | Fair play guaranteed.
            </motion.p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  )
}

