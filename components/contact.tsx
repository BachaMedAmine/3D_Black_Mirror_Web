"use client"

import { motion } from "framer-motion"
import { Mail, MessageCircle, MapPin } from "lucide-react"
import ReflectiveDavid from "./shared/reflective-david"

export default function Contact() {
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

  // Function to handle email link click with a fallback
  const handleEmailClick = (e) => {
    e.preventDefault(); // Prevent default behavior to handle manually
    const email = "blackmirror.tunis@gmail.com";
    const subject = "Contact from Website";
    const body = "Hello Black Mirror Team,\n\nI am reaching out regarding...";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Attempt to open the mailto link directly in the current window
    window.location.href = mailtoLink;

    // Fallback: If the email client doesn't open, show an alert after a short delay
    setTimeout(() => {
      // Since we can't reliably detect if the email client opened, we show the alert as a precaution
      alert(
        `It looks like your email client might not have opened. You can email us directly at ${email}. Please copy this address and use it in your email client.`
      );
    }, 1000); // Increased delay to give the email client time to open
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-10 overflow-hidden text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#000428] via-[#004e92] to-[#00627a]" />

      {/* Reflective David on right */}
      <ReflectiveDavid position="right" opacity={1} scale={1.3} color="#00a4c9" accentColor="#FF6A1D" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 max-w-2xl w-full mx-auto text-center space-y-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00ffff]"
        >
          Get in Touch
        </motion.h2>

        <div className="flex flex-col gap-6 sm:gap-8 items-center">
          {/* WhatsApp */}
          <motion.a
            variants={itemVariants}
            href="https://wa.me/33763933503"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#00ffff]/40 bg-black/30 backdrop-blur-md hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-5 h-5 text-[#00ffff]" />
            <span className="text-white">+33 7 63 93 35 03</span>
          </motion.a>

          {/* Email */}
          <motion.a
            variants={itemVariants}
            href="#"
            onClick={handleEmailClick}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#FF6A1D]/40 bg-black/30 backdrop-blur-md hover:scale-105 transition-transform"
          >
            <Mail className="w-5 h-5 text-[#FF6A1D]" />
            <span className="text-white">blackmirror.tunis@gmail.com</span>
          </motion.a>

          {/* UK Address */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 px-6 py-3 rounded-lg border border-white/20 bg-black/30 backdrop-blur-md text-left max-w-sm"
          >
            <MapPin className="w-5 h-5 text-white" />
            <div>
              <div className="text-white font-semibold">UK Office</div>
              <div className="text-white/80 text-sm">
                71–75 Shelton Street, Covent Garden, LONDON, WC2H 9JQ, UNITED KINGDOM
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}