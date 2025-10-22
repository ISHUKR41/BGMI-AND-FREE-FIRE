'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Zap, Shield, Trophy, Target, Clock, Users, 
  Smartphone, Gamepad2, TrendingUp, Award,
  CheckCircle, Star, Sparkles
} from 'lucide-react'

export default function ModernFeatures() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant registration and real-time slot updates with zero lag",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      icon: Shield, 
      title: "100% Secure",
      description: "Military-grade security with encrypted payments and data protection",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10", 
      borderColor: "border-green-500/20"
    },
    {
      icon: Trophy,
      title: "Guaranteed Prizes",
      description: "Instant payouts within 24 hours of match completion",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: Target,
      title: "Fair Play Assured",
      description: "Advanced anti-cheat systems and professional match monitoring",
      color: "from-blue-400 to-cyan-500", 
      bgColor: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your gaming needs",
      color: "from-indigo-400 to-purple-500",
      bgColor: "from-indigo-500/10 to-purple-500/10",
      borderColor: "border-indigo-500/20"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized", 
      description: "Seamless experience across all devices and screen sizes",
      color: "from-pink-400 to-rose-500",
      bgColor: "from-pink-500/10 to-rose-500/10",
      borderColor: "border-pink-500/20"
    }
  ]

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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
      
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
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Why Choose Us</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Built for
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Champions
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of competitive gaming with our cutting-edge platform
            designed for serious players who demand excellence.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`
                  glass-effect rounded-2xl p-8 border transition-all duration-300 h-full
                  ${feature.borderColor} hover:border-opacity-60
                  bg-gradient-to-br ${feature.bgColor}
                `}>
                  {/* Icon */}
                  <motion.div
                    className={`
                      w-16 h-16 rounded-2xl mb-6 flex items-center justify-center
                      bg-gradient-to-br ${feature.color} shadow-lg
                    `}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}/10, ${feature.color.split(' ')[3]}/5)`
                    }}
                  />

                  {/* Checkmark for completed features */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: inView ? 1 : 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </motion.div>
                </div>

                {/* Glow effect */}
                <motion.div
                  className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl
                    bg-gradient-to-br ${feature.color}
                  `}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg shadow-xl overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Experience the Difference</span>
              <Star className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
