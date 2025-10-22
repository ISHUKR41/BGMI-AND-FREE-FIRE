'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function InteractiveBackground() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      }
    }

    const animate = () => {
      const orbs = container.querySelectorAll('.interactive-orb')
      orbs.forEach((orb, index) => {
        const speed = 0.02 + (index * 0.01)
        const x = mouseRef.current.x + Math.sin(Date.now() * speed) * 20
        const y = mouseRef.current.y + Math.cos(Date.now() * speed) * 20
        
        orb.style.transform = `translate(${x}%, ${y}%)`
      })
      
      rafRef.current = requestAnimationFrame(animate)
    }

    container.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden -z-20"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900" />
      
      {/* Interactive orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`interactive-orb absolute w-96 h-96 rounded-full opacity-10 blur-3xl`}
          style={{
            background: `radial-gradient(circle, ${
              i % 4 === 0 
                ? 'rgba(139, 92, 246, 0.4)' 
                : i % 4 === 1 
                ? 'rgba(236, 72, 153, 0.4)' 
                : i % 4 === 2
                ? 'rgba(249, 115, 22, 0.4)'
                : 'rgba(34, 197, 94, 0.4)'
            }, transparent)`,
            left: `${15 + i * 10}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            x: [-10, 10],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const nodes = []
    let animationId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createNodes = () => {
      const nodeCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          connections: []
        })
      }
    }

    const updateNodes = () => {
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })
    }

    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)'
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.2
            ctx.globalAlpha = opacity
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const drawNodes = () => {
      nodes.forEach((node) => {
        ctx.globalAlpha = node.opacity
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.globalAlpha = node.opacity * 0.5
        ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      updateNodes()
      drawConnections()
      drawNodes()
      
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createNodes()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      nodes.length = 0
      createNodes()
    })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-40"
    />
  )
}