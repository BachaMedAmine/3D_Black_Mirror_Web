"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Palette, Code } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ArtInnovationSection() {
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

  return (
    <section
      id="art-innovation-section"
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#050510]"></div>

      {/* David statue as main feature */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="h-full max-h-[80vh] w-auto opacity-40 grayscale"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=400')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "contrast(1.2)",
          }}
        ></div>

        {/* Add a text label for debugging - will be removed in production */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-2 py-1 rounded text-xs text-white">
          David Statue (Main Feature)
        </div>
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
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-white"
        >
          <span className="relative">
            Classical Art Meets Digital Innovation
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A1D] to-[#001F99] blur-sm opacity-70">
              Classical Art Meets Digital Innovation
            </span>
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-center text-[#FF6A1D] text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
        >
          The Renaissance Spirit in Modern Communication
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mb-16 bg-black/60 backdrop-blur-sm border border-white/10 p-6 rounded-lg"
        >
          <p className="text-white text-sm sm:text-base leading-relaxed">
            Just as Michelangelo's David represents the pinnacle of Renaissance artistry—a perfect balance of technical
            mastery and emotional depth—Black Mirror strives to create work that embodies both classical principles and
            cutting-edge innovation. We believe that the most powerful communication emerges at the intersection of
            timeless artistic values and modern technological capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={itemVariants}
            className="bg-black/60 backdrop-blur-sm border border-white/10 p-6 rounded-lg relative overflow-hidden group"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(255, 106, 29, 0.3)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>

            <div className="flex items-center mb-4">
              <Palette className="w-8 h-8 text-[#FF6A1D]" />
              <h3 className="ml-3 text-white text-lg font-semibold">Classical Inspiration</h3>
            </div>

            <p className="text-white/80 text-sm sm:text-base">
              Like the masters of the Renaissance who studied classical forms to create revolutionary art, we draw from
              timeless design principles while pushing the boundaries of what's possible in digital communication.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/60 backdrop-blur-sm border border-white/10 p-6 rounded-lg relative overflow-hidden group"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(128, 191, 255, 0.3)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>

            <div className="flex items-center mb-4">
              <Code className="w-8 h-8 text-[#80BFFF]" />
              <h3 className="ml-3 text-white text-lg font-semibold">Digital Craftsmanship</h3>
            </div>

            <p className="text-white/80 text-sm sm:text-base">
              Our technical expertise transforms artistic vision into digital reality, using cutting-edge tools with the
              same dedication to craft that Michelangelo brought to his marble sculptures.
            </p>
          </motion.div>
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

