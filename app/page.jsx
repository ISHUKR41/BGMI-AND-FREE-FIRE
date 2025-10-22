'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Trophy, Target, Zap, Shield, ArrowRight, Gamepad2, Users, IndianRupee } from 'lucide-react'
import { GAME_INFO, TOURNAMENT_CONFIG } from '@/lib/constants'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 animate-slide-up">
            <div className="inline-block px-4 py-2 bg-gradient-gaming rounded-full text-sm font-semibold mb-4">
              🎮 Professional Gaming Platform
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
              <span className="bg-gradient-gaming bg-clip-text text-transparent">
                Compete. Dominate.
              </span>
              <br />
              <span className="text-white">Win Big!</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join India's most exciting BGMI and Free Fire tournaments. Play with the best, 
              showcase your skills, and win amazing cash prizes!
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Link href="/bgmi" className="btn-bgmi flex items-center space-x-2 group">
                <span>BGMI Tournaments</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="/freefire" className="btn-freefire flex items-center space-x-2 group">
                <span>Free Fire Tournaments</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="bg-gradient-gaming bg-clip-text text-transparent">Our Platform?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="gaming-card rounded-xl p-6">
              <Trophy className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Big Prizes</h3>
              <p className="text-gray-400">
                Win up to ₹350 per match plus per-kill bonuses
              </p>
            </div>
            
            <div className="gaming-card rounded-xl p-6">
              <Zap className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Quick Registration</h3>
              <p className="text-gray-400">
                Register in minutes and get instant confirmation
              </p>
            </div>
            
            <div className="gaming-card rounded-xl p-6">
              <Shield className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Fair Play</h3>
              <p className="text-gray-400">
                Strict anti-cheat policies and fair competition
              </p>
            </div>
            
            <div className="gaming-card rounded-xl p-6">
              <Target className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Multiple Modes</h3>
              <p className="text-gray-400">
                Solo, Duo, and Squad tournaments available
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Games Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Available <span className="bg-gradient-gaming bg-clip-text text-transparent">Tournaments</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BGMI Card */}
            <div className="gaming-card rounded-2xl overflow-hidden group">
              <div className="h-64 bg-gradient-bgmi relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gamepad2 className="w-32 h-32 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-bgmi bg-clip-text text-transparent">
                  {GAME_INFO.bgmi.fullName}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {GAME_INFO.bgmi.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {GAME_INFO.bgmi.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-bgmi rounded-full"></div>
                      <span className="text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                    <div className="text-2xl font-bold text-orange-400">100</div>
                    <div className="text-xs text-gray-400">Solo</div>
                  </div>
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                    <div className="text-2xl font-bold text-orange-400">50</div>
                    <div className="text-xs text-gray-400">Duo</div>
                  </div>
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                    <div className="text-2xl font-bold text-orange-400">25</div>
                    <div className="text-xs text-gray-400">Squad</div>
                  </div>
                </div>
                
                <Link href="/bgmi" className="btn-bgmi w-full flex items-center justify-center space-x-2 group">
                  <span>Join BGMI Tournament</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Free Fire Card */}
            <div className="gaming-card rounded-2xl overflow-hidden group">
              <div className="h-64 bg-gradient-freefire relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gamepad2 className="w-32 h-32 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-freefire bg-clip-text text-transparent">
                  {GAME_INFO.freefire.fullName}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {GAME_INFO.freefire.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {GAME_INFO.freefire.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-freefire rounded-full"></div>
                      <span className="text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-red-500/10 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-red-400" />
                    <div className="text-2xl font-bold text-red-400">48</div>
                    <div className="text-xs text-gray-400">Solo</div>
                  </div>
                  <div className="text-center p-3 bg-red-500/10 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-red-400" />
                    <div className="text-2xl font-bold text-red-400">24</div>
                    <div className="text-xs text-gray-400">Duo</div>
                  </div>
                  <div className="text-center p-3 bg-red-500/10 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-red-400" />
                    <div className="text-2xl font-bold text-red-400">12</div>
                    <div className="text-xs text-gray-400">Squad</div>
                  </div>
                </div>
                
                <Link href="/freefire" className="btn-freefire w-full flex items-center justify-center space-x-2 group">
                  <span>Join Free Fire Tournament</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Prize Pool Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-gaming bg-clip-text text-transparent">Prize Pool</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BGMI Prizes */}
            <div className="glass-effect rounded-xl p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold mb-6 text-orange-400">BGMI Tournaments</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-lg">
                  <span className="text-gray-300">Winner Prize</span>
                  <div className="flex items-center space-x-1 text-yellow-400 font-bold text-xl">
                    <IndianRupee className="w-5 h-5" />
                    <span>350</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-500/10 rounded-lg">
                  <span className="text-gray-300">Runner Up</span>
                  <div className="flex items-center space-x-1 text-gray-300 font-bold text-xl">
                    <IndianRupee className="w-5 h-5" />
                    <span>250</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg">
                  <span className="text-gray-300">Per Kill</span>
                  <div className="flex items-center space-x-1 text-purple-400 font-bold text-xl">
                    <IndianRupee className="w-5 h-5" />
                    <span>9</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Free Fire Prizes */}
            <div className="glass-effect rounded-xl p-8 border border-red-500/30">
              <h3 className="text-2xl font-bold mb-6 text-red-400">Free Fire Tournaments</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-lg">
                  <span className="text-gray-300">Winner Prize</span>
                  <div className="flex items-center space-x-1 text-yellow-400 font-bold text-xl">
                    <IndianRupee className="w-5 h-5" />
                    <span>350</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-500/10 rounded-lg">
                  <span className="text-gray-300">Runner Up</span>
                  <div className="flex items-center space-x-1 text-gray-300 font-bold text-xl">
                    <IndianRupee className="w-5 h-5" />
                    <span>150</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg">
                  <span className="text-gray-300">Per Kill</span>
                  <div className="flex items-center space-x-1 text-purple-400 font-bold text-xl">
                    <IndianRupee className="w-5 h-5" />
                    <span>5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass-effect rounded-2xl p-12 border border-white/10">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Show Your Skills?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of players competing for amazing prizes!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/bgmi" className="btn-bgmi">
              Register for BGMI
            </Link>
            <Link href="/freefire" className="btn-freefire">
              Register for Free Fire
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Gaming Tournaments. All rights reserved.</p>
          <p className="mt-2 text-sm">Play responsibly. 18+ only.</p>
        </div>
      </footer>
    </div>
  )
}

