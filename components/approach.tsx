"use client"

import { useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"

export default function Approach() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }), [])

  const orbs = useMemo(() => [
    { id: 1, label: "Traditional Media", color: "#FFFFFF", delay: 0 },
    { id: 2, label: "Digital Platforms", color: "#FF6A1D", delay: 0.5 },
    { id: 3, label: "Social Networks", color: "#001F99", delay: 1 },
    { id: 4, label: "Experience", color: "#80BFFF", delay: 1.5 },
  ], [])

  const gridLines = useMemo(() => (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-[#FF6A1D]/5"
          style={{ top: `${(i * 100) / 20}%` }}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-[#FF6A1D]/5"
          style={{ left: `${(i * 100) / 20}%` }}
        />
      ))}
    </>
  ), [])

  return (
    <section
      id="approach"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0F3C] opacity-90" />
        <div className="absolute inset-0">{gridLines}</div>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-white"
        >
          <span className="relative">
            The Nexus: Your Cosmic Reflection
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A1D] to-transparent blur-sm opacity-70">
              The Nexus: Your Cosmic Reflection
            </span>
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-[#FFFFFF] leading-relaxed">
              We saw potential in the void—screens as black mirrors to unveil a brand's soul. With interactive
              campaigns, narrative-driven web experiences, and amplified social strategies, we harness emerging tech to
              transcend limits.
            </p>

            <h3
              className="text-xl font-semibold text-[#FF6A1D] mt-8"
              style={{ textShadow: "0 0 5px rgba(255, 106, 29, 0.3)" }}
            >
              360° Cosmic Design
            </h3>

            <p className="text-[#FFFFFF] leading-relaxed">
              Step into a multidimensional communication matrix. Our 360° approach weaves a strategic constellation
              across all planes—analog, digital, social, experiential. Every node is precision-engineered for synergy,
              delivering a narrative that resonates across time and space.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative h-80 md:h-96">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6A1D] to-[#001F99] blur-md" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
              <span className="text-xs text-white font-medium">CORE</span>
            </div>

            {orbs.map((orb, index) => (
              <motion.div
                key={orb.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -index * 5,
                }}
                style={{ transformOrigin: "center" }}
              >
                <motion.div
                  className="relative"
                  style={{ left: 0, top: -120 - index * 20 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                    style={{ width: `${240 + index * 40}px`, height: `${240 + index * 40}px` }}
                  />
                  <div className="relative">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "black",
                        boxShadow: `0 0 15px ${orb.color}`,
                        border: `2px solid ${orb.color}`,
                      }}
                    />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-xs text-white">
                      {orb.label}
                    </div>
                    <div
                      className="absolute top-1/2 left-1/2 h-px -translate-y-1/2"
                      style={{
                        width: `${120 + index * 20}px`,
                        background: `linear-gradient(to right, ${orb.color}, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}