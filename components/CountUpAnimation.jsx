'use client'

import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function CountUpAnimation({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  className = '',
  title = '',
  icon: Icon,
  delay = 0
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {Icon && (
        <motion.div
          className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      )}
      
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
        {prefix}
        {inView && (
          <CountUp
            start={0}
            end={end}
            duration={duration}
            separator=","
          />
        )}
        {suffix}
      </div>
      
      {title && (
        <p className="text-gray-400 text-sm font-medium">{title}</p>
      )}
    </motion.div>
  )
}
