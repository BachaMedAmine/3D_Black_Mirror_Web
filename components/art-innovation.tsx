"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Palette, Code, Lightbulb, Zap } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import DavidOverlay from "./shared/david-overlay"

export default function ArtInnovation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const isSmallScreen = useMediaQuery("(max-width: 640px)")

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

  const pillars = [
    {
      icon: <Palette className="w-8 h-8 text-[#FF6A1D]" />,
      title: "Classical Inspiration",
      description:
        "We draw from timeless artistic principles, finding inspiration in classical masterpieces like Michelangelo's David—symbols of perfect proportion, emotional depth, and technical mastery.",
    },
    {
      icon: <Code className="w-8 h-8 text-[#80BFFF]" />,
      title: "Technological Execution",
      description:
        "Our technical expertise transforms artistic vision into digital reality, using cutting-edge tools to create experiences that push the boundaries of what's possible.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-[#FF6A1D]" />,
      title: "Conceptual Thinking",
      description:
        "Every project begins with a powerful concept that bridges art and technology, creating meaningful connections between brands and their audiences.",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#80BFFF]" />,
      title: "Cultural Resonance",
      description:
        "We infuse our work with cultural significance, creating designs that speak to both local heritage and global trends.",
    },
  ]

  return (
    <section
      id="art-innovation"
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#050510]"></div>

      {/* David overlay - increased opacity and added debug border */}
      <DavidOverlay position="center" opacity={0.4} scale={1.2} className="border border-white/10" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-white"
        >
          <span className="relative">
            Art Meets Innovation
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A1D] to-[#001F99] blur-sm opacity-70">
              Art Meets Innovation
            </span>
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-center text-[#FF6A1D] text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
        >
          Where Renaissance Ideals Meet Digital Frontiers
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mb-16 bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-lg"
        >
          <p className="text-white text-sm sm:text-base leading-relaxed">
            At Black Mirror, we believe that true innovation emerges at the intersection of classical artistry and
            cutting-edge technology. Like Michelangelo who revolutionized art through his mastery of form and emotion,
            we strive to create work that stands the test of time while pushing the boundaries of what's possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg relative overflow-hidden group"
              whileHover={{
                y: -5,
                boxShadow:
                  index % 2 === 0
                    ? "0 10px 25px -5px rgba(255, 106, 29, 0.3)"
                    : "0 10px 25px -5px rgba(128, 191, 255, 0.3)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>

              <div className="flex items-center mb-4">
                {pillar.icon}
                <h3 className="ml-3 text-white text-lg font-semibold">{pillar.title}</h3>
              </div>

              <p className="text-white/80 text-sm sm:text-base">{pillar.description}</p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-16 text-center">
          <button className="cyber-button group">
            <span className="relative z-10 flex items-center">
              Explore Our Methodology
              <svg
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

