'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TypewriterEffect({ 
  words = ['Hello', 'World'], 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delayBetweenWords = 2000,
  loop = true,
  className = ''
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText !== currentWord) {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        } else {
          // Word is complete, start deleting after delay
          setTimeout(() => setIsDeleting(true), delayBetweenWords)
        }
      } else {
        // Deleting
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => {
            if (loop) {
              return (prev + 1) % words.length
            } else {
              return Math.min(prev + 1, words.length - 1)
            }
          })
        } else {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delayBetweenWords, loop])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className={`inline-flex items-center ${className}`}>
      <motion.span
        key={currentText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-block"
      >
        {currentText}
      </motion.span>
      
      <motion.span
        className="inline-block w-1 h-[1em] bg-current ml-1"
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0 }}
      />
    </div>
  )
}

export function AdvancedTypewriter({ 
  words = [], 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delayBetweenWords = 2000,
  className = '',
  onWordComplete,
  onComplete
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isComplete) return

    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText !== currentWord) {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        } else {
          // Word is complete
          onWordComplete?.(currentWord, currentWordIndex)
          
          if (currentWordIndex === words.length - 1) {
            // All words typed
            setIsComplete(true)
            onComplete?.()
            return
          }
          
          // Start deleting after delay
          setTimeout(() => setIsDeleting(true), delayBetweenWords)
        }
      } else {
        // Deleting
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIndex(prev => prev + 1)
        } else {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delayBetweenWords, isComplete, onWordComplete, onComplete])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {currentText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </motion.span>
  )
}

export function GlitchTypewriter({ 
  text = '', 
  glitchIntensity = 3,
  className = ''
}) {
  const [displayText, setDisplayText] = useState('')
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  useEffect(() => {
    let currentIndex = 0
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [text])

  useEffect(() => {
    if (displayText.length === 0) return

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to glitch
        setIsGlitching(true)
        
        setTimeout(() => {
          setIsGlitching(false)
        }, 100)
      }
    }, 500)

    return () => clearInterval(glitchInterval)
  }, [displayText])

  const renderGlitchedText = () => {
    if (!isGlitching) return displayText

    return displayText
      .split('')
      .map((char, index) => {
        if (Math.random() < 0.3) { // 30% of chars get glitched
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          return (
            <motion.span
              key={`${index}-${char}`}
              className="inline-block text-red-400"
              animate={{
                x: [-1, 1, -1, 0],
                y: [-1, 1, -1, 0],
              }}
              transition={{ duration: 0.1 }}
            >
              {randomChar}
            </motion.span>
          )
        }
        return char
      })
  }

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={isGlitching ? 'glitch' : 'normal'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
        >
          {renderGlitchedText()}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}