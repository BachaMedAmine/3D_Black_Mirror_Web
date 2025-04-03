"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Github, Twitter, Instagram } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import ReflectiveDavid from "./shared/reflective-david"

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log(formState)
    // Reset form
    setFormState({ name: "", email: "", message: "" })
    // Show success message
    alert("Message sent successfully!")
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background with teal gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#00a4c9] to-[#00627a]"></div>

      {/* Reflective David */}
      <ReflectiveDavid position="right" opacity={1} scale={1.2} color="#00a4c9" accentColor="#FF6A1D" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-5xl w-full mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="text-[#00ffff] text-xl sm:text-2xl font-medium">MOB (TUN): +216 97 111 001</div>
              <div className="text-[#00ffff] text-xl sm:text-2xl font-medium">MOB (UK): +33 76 393 3503</div>
              <div className="text-[#FF6A1D] text-xl sm:text-2xl font-medium">BLACKMIRROR.TUNIS@GMAIL.COM</div>
            </div>

            <div className="pt-6">
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-black/20 border border-[#00ffff]/30 flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(0, 255, 255, 0.2)",
                  }}
                >
                  <Twitter className="w-5 h-5 text-[#00ffff]" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-black/20 border border-[#FF6A1D]/30 flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 106, 29, 0.2)",
                  }}
                >
                  <Instagram className="w-5 h-5 text-[#FF6A1D]" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-black/20 border border-[#00ffff]/30 flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(0, 255, 255, 0.2)",
                  }}
                >
                  <Github className="w-5 h-5 text-[#00ffff]" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-black/20 backdrop-blur-sm border border-[#FF6A1D]/30 p-6 rounded-lg"
            >
              <h3 className="text-[#FF6A1D] font-semibold mb-4">Send Us a Message</h3>

              <div>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-black/30 border-[#FF6A1D]/30 focus:border-[#FF6A1D] text-white placeholder:text-[#FFFFFF]/70"
                  required
                />
              </div>

              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="bg-black/30 border-[#00ffff]/30 focus:border-[#00ffff] text-white placeholder:text-[#FFFFFF]/70"
                  required
                />
              </div>

              <div>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="bg-black/30 border-[#FF6A1D]/30 focus:border-[#FF6A1D] text-white placeholder:text-[#FFFFFF]/70 min-h-[150px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-transparent border border-[#FF6A1D] hover:bg-[#FF6A1D]/10 text-white relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF6A1D]/20 to-[#00ffff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

