"use client"

import { useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { Globe, Award, Calendar, Users } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"

const ReflectiveDavid = dynamic(() => import("./shared/reflective-david"), { ssr: false })

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 }) // Set once: true for single trigger
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const isLandscape = useMediaQuery("(orientation: landscape) and (max-height: 500px)")

  // Memoize variants to prevent recreation
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

  // Memoize achievements array to avoid recreation
  const achievements = useMemo(() => [
    {
      icon: <Award className="w-6 h-6 text-[#FF6A1D]" />,
      title: "Award-Winning",
      description: "Multiple international design awards for innovative campaigns",
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#00ffff]" />,
      title: "Est. 2015",
      description: "Founded in Tunis with a vision to revolutionize creative communication",
    },
    {
      icon: <Users className="w-6 h-6 text-[#FF6A1D]" />,
      title: "Global Reach",
      description: "Serving clients across 3 continents with culturally resonant messaging",
    },
  ], [])

  // Memoize data streams to reduce re-renders
  const dataStreams = useMemo(() => 
    Array.from({ length: isSmallScreen || isLandscape ? 4 : 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-b from-[#FF6A1D] to-transparent origin-top"
        style={{
          rotate: `${i * (isSmallScreen || isLandscape ? 90 : 45)}deg`,
          opacity: 0.5,
          height: isSmallScreen || isLandscape ? "12px" : "20px",
        }}
        animate={{
          scaleY: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.25,
        }}
      />
    )), 
    [isSmallScreen, isLandscape]
  )

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 md:px-8 overflow-hidden"
    >
     
      <ReflectiveDavid position="left" opacity={1} scale={1.2} color="#00a4c9" accentColor="#FF6A1D" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className={`text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#00ffff] ${isLandscape ? "mb-4 text-xl sm:text-2xl" : ""}`}
        >
          Our Legacy of Innovation
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-center text-[#FF6A1D] text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
          style={{ textShadow: "0 0 10px rgba(255, 106, 29, 0.5)" }}
        >
          Born in Tunisia, Reaching the Stars
        </motion.p>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${isLandscape ? "gap-4" : ""}`}>
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-white text-sm sm:text-base leading-relaxed">
              <span className="text-[#FF6A1D] font-semibold">Black Mirror</span> was founded in 2015 in Tunis by a
              collective of visionary designers, developers, and strategists united by a shared belief: that
              communication should transcend the ordinary and challenge perceptions.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Our name reflects our philosophy—we serve as the reflective surface that reveals the true essence of your
              brand, amplified through innovative design and strategic thinking. Like the black mirrors of ancient times
              that showed not just appearances but deeper truths, we reveal the authentic core of your brand identity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-black/20 backdrop-blur-sm border border-[#00ffff]/30 p-4 rounded-lg"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 106, 29, 0.3)" }}
                >
                  <div className="flex items-center mb-2">
                    {item.icon}
                    <h3 className="ml-2 text-white font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className={`relative mx-auto ${isSmallScreen || isLandscape ? "w-40 h-40" : "w-64 h-64"}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className={`${isSmallScreen || isLandscape ? "w-20 h-20" : "w-32 h-32"} text-[#00ffff]`} />
              </div>
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF6A1D] via-transparent to-[#00ffff] opacity-30" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-[#FF6A1D] via-transparent to-[#00ffff] opacity-30" />
              </div>
              <div className="absolute inset-0 rounded-full border border-[#FF6A1D]/30 animate-pulse" />
              <div
                className="absolute inset-0 rounded-full border border-[#00ffff]/20 animate-pulse"
                style={{ animationDelay: "500ms" }}
              />
              {dataStreams}
            </div>

            <div className="mt-8 space-y-4">
              <motion.div
                variants={itemVariants}
                className="bg-black/20 backdrop-blur-sm border border-[#FF6A1D]/30 p-4 rounded-lg"
              >
                <h3 className="text-[#FF6A1D] font-semibold mb-2">Our Mission</h3>
                <p className="text-white/80 text-sm">
                  To transcend conventional boundaries in communication, crafting immersive brand experiences that
                  resonate across cultural divides and technological platforms.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-black/20 backdrop-blur-sm border border-[#00ffff]/30 p-4 rounded-lg"
              >
                <h3 className="text-[#00ffff] font-semibold mb-2">Our Vision</h3>
                <p className="text-white/80 text-sm">
                  To be the premier creative force bridging North African innovation with global design excellence,
                  setting new standards for meaningful brand communication.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}