"use client"

import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface DavidOverlayProps {
  position?: "left" | "right" | "center"
  opacity?: number
  scale?: number
  className?: string
}

export default function DavidOverlay({
  position = "center",
  opacity = 0.2,
  scale = 1,
  className = "",
}: DavidOverlayProps) {
  const [loaded, setLoaded] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Position styles
  const positionStyles = {
    left: { right: "auto", left: isMobile ? "-20%" : "0" },
    right: { left: "auto", right: isMobile ? "-20%" : "0" },
    center: { left: "50%", transform: "translateX(-50%)" },
  }

  // Scale adjustment for mobile
  const mobileScale = isMobile ? scale * 0.7 : scale

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`absolute bottom-0 h-full overflow-hidden pointer-events-none z-0 ${className}`}
      style={{
        ...positionStyles[position],
        opacity: loaded ? opacity : 0,
        transition: "opacity 0.5s ease-in-out",
        width: position === "center" ? "100%" : "50%",
      }}
    >
      {/* Actual David statue image - using a placeholder for now */}
      <div
        className="w-full h-full bg-contain bg-no-repeat bg-bottom"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=400')",
          transform: `scale(${mobileScale})`,
          filter: "grayscale(100%)",
          // Add a subtle glow effect to make it more visible
          boxShadow: "0 0 50px rgba(255, 255, 255, 0.1)",
        }}
        aria-hidden="true"
      />

      {/* Add a text label for debugging - will be removed in production */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-2 py-1 rounded text-xs text-white">
        David Statue Overlay
      </div>
    </div>
  )
}

