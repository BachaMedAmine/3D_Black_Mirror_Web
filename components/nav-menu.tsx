"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isLandscape = useMediaQuery("(orientation: landscape) and (max-height: 500px)")

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "approach", label: "Approach" },
    
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]
 
  useEffect(() => {
    // Throttle scroll events for better performance
    let isThrottled = false
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (isThrottled) return

      isThrottled = true

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 100

        // Only process if we've scrolled a meaningful amount
        if (Math.abs(scrollPosition - lastScrollY) < 50) {
          isThrottled = false
          return
        }

        lastScrollY = scrollPosition

        const sections = document.querySelectorAll("section")

        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          const sectionId = section.getAttribute("id") || ""

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId)
          }
        })

        isThrottled = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3 sm:py-4 pt-safe ${isLandscape ? "py-2" : ""}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo/Brand - now positioned on the left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className={`text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-white ${isLandscape ? "text-base" : ""}`}
        >
          BLACK MIRROR
        </motion.div>

        {/* Mobile menu button */}
        {isMobile && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </motion.button>
        )}

        {/* Desktop menu - now centered */}
        {!isMobile && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
           className="absolute left-[40%] top-6 transform -translate-x-[45%]  flex items-center space-x-4 sm:space-x-8 px-4 sm:px-6 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10"
          >
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="relative">
                <span
                  className={cn(
                    "text-xs sm:text-sm font-medium tracking-wider transition-colors",
                    activeSection === item.id ? "text-[#FF6A1D]" : "text-[#FFFFFF] hover:text-[#80BFFF]",
                  )}
                >
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6A1D] to-[#001F99]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.nav>
        )}

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobile && isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-[#050510]/95 backdrop-blur-md pt-safe pb-safe"
            >
              {isLandscape ? (
                <nav className="flex flex-row flex-wrap justify-center gap-4">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "text-lg px-4 font-medium tracking-wider transition-colors",
                        activeSection === item.id ? "text-[#FF6A1D]" : "text-[#FFFFFF] hover:text-[#80BFFF]",
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              ) : (
                <nav className="flex flex-col items-center">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "text-xl sm:text-2xl font-medium tracking-wider transition-colors my-3",
                        activeSection === item.id ? "text-[#FF6A1D]" : "text-[#FFFFFF] hover:text-[#80BFFF]",
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 },
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

