"use client"

import React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Brain, Star } from "lucide-react"

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [stars, setStars] = useState<JSX.Element[]>([])

  useEffect(() => {
    const starArray = Array.from({ length: 100 }).map((_, i) => {
      const top = `${Math.random() * 100}%`
      const left = `${Math.random() * 100}%`
      const width = `${Math.random() * 2 + 1}px`
      const height = `${Math.random() * 2 + 1}px`
      const opacity = Math.random() * 0.5 + 0.3
      const duration = Math.random() * 5 + 3
      const delay = Math.random() * 5

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top,
            left,
            width,
            height,
            opacity,
            animation: `twinkle ${duration}s infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      )
    })

    setStars(starArray)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const features = [
    {
      id: 1,
      title: "Collaborative Nexus",
      description: "We sync with your orbit, decoding your unique frequency to exceed all projections.",
      icon: <Zap className="w-8 h-8 text-[#FF6A1D]" />,
    },
    {
      id: 2,
      title: "Quantum Creators",
      description: "Our crew of visionaries channels passion into results that defy gravity.",
      icon: <Brain className="w-8 h-8 text-[#001F99]" />,
    },
    {
      id: 3,
      title: "Eternal Excellence",
      description: "We pledge to uphold the highest integrity, delivering service that echoes through the cosmos.",
      icon: <Star className="w-8 h-8 text-[#80BFFF]" />,
    },
  ]

  return (
    <section
      id="why-us"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background with stars */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0F3C] opacity-90"></div>
        <div className="absolute inset-0">{stars}</div>
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
          className="text-3xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A1D] to-[#001F99]"
        >
          Beyond the Horizon
        </motion.h2>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="relative bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg"
              whileHover={{
                y: -5,
                boxShadow: `0 10px 30px -10px ${index === 0 ? "#FF6A1D" : index === 1 ? "#001F99" : "#80BFFF"}30`,
              }}
            >
              <div className="absolute -top-4 -left-4 p-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3 text-white">{feature.title}</h3>
              <p className="text-[#FFFFFF]">{feature.description}</p>

              {/* Holographic border effect */}
              <div className="absolute inset-0 -z-10 rounded-lg opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A1D] to-[#001F99] rounded-lg animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CSS for twinkling stars */}
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  )
}