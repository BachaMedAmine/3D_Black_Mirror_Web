"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const isMobileRef = useRef(typeof window !== "undefined" && window.innerWidth <= 768) // Avoid state for static value

  useEffect(() => {
    const duration = isMobileRef.current ? 1800 : 2500
    const timer = setTimeout(() => setIsLoading(false), duration)
    return () => clearTimeout(timer)
  }, []) // Empty dependency array since isMobileRef is static

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0F3C]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              className="w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity, // Use Infinity directly for clarity
                ease: "linear",
                type: isMobileRef.current ? "tween" : "spring", // Use ref instead of state
              }}
            >
              <div className="absolute w-full h-full border-t-2 border-r-2 border-[#FF6A1D] rounded-full" />
              <div
                className="absolute w-full h-full border-b-2 border-l-2 border-[#80BFFF] rounded-full"
                style={{ transform: "rotate(45deg)" }}
              />
            </motion.div>
            <motion.p
              className="mt-8 text-lg font-medium tracking-widest text-white"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: isMobileRef.current ? "linear" : "easeInOut",
              }}
            >
              INITIALIZING BLACK MIRROR
            </motion.p>
            <div className="mt-4 h-1 w-48 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#001F99] to-[#FF6A1D]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: isMobileRef.current ? 1.5 : 2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}