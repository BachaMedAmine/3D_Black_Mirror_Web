"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Calendar, Users } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"

const ReflectiveDavid = dynamic(() => import("./shared/reflective-david"), { ssr: false })

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  const achievements = [
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
  ]

  return (
    <section
      id="about"
      className={`relative min-h-screen py-16 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#000428] via-[#004e92] to-[#00627a]`}
      style={{
        backgroundImage: isSmallScreen
          ? undefined
          : `
              linear-gradient(to left, rgba(0, 0, 0, 0.4), transparent),
              url('/david-bg.png')
            `,
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      {!isSmallScreen && (
        <ReflectiveDavid
          position="left"
          opacity={1}
          scale={1.2}
          color="#00a4c9"
          accentColor="#FF6A1D"
        />
      )}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-6xl"
      >
        <motion.h2
          variants={itemVariants}
          className="text-center text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 text-[#00ffff]"
        >
          Our Legacy of Innovation
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-center text-[#FF6A1D] text-base sm:text-lg md:text-xl mb-10 max-w-3xl mx-auto"
          style={{ textShadow: "0 0 10px rgba(255, 106, 29, 0.5)" }}
        >
          Born in Tunisia, Reaching the Stars
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="space-y-6 text-white text-sm sm:text-base">
            <p>
              <span className="text-[#FF6A1D] font-semibold">Black Mirror</span> was founded in 2015 in Tunis by a
              collective of visionary designers, developers, and strategists united by a shared belief: that
              communication should transcend the ordinary and challenge perceptions.
            </p>
            <p>
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
                  whileHover={{ y: -5 }}
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

          <motion.div variants={itemVariants} className="space-y-6">
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}