"use client"

import { useEffect, useRef } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface OptimizedStarryBackgroundProps {
  density?: number
  primaryColor?: string
  secondaryColor?: string
}

export default function OptimizedStarryBackground({
  density = 100,
  primaryColor = "#00ffff",
  secondaryColor = "#FF6A1D",
}: OptimizedStarryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isLowEndDevice = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Detect low-end devices
  const detectLowEndDevice = () => {
    return (
      isLowEndDevice ||
      (typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency !== undefined &&
        navigator.hardwareConcurrency <= 4)
    )
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isLowEnd = detectLowEndDevice()

    // Adjust density for performance
    const actualDensity = isLowEnd ? Math.floor(density / 4) : isMobile ? Math.floor(density / 2) : density

    // Set canvas dimensions
    const resizeCanvas = () => {
      const dpr = isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()

    // Throttle resize events
    let resizeTimeout
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 200)
    }

    window.addEventListener("resize", handleResize)

    // Create stars
    const stars = []

    for (let i = 0; i < actualDensity; i++) {
      const color = Math.random() > 0.8 ? secondaryColor : primaryColor
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        color,
        opacity: Math.random() * 0.5 + 0.3,
        blinkSpeed: Math.random() * 0.01 + 0.005,
      })
    }

    // Animation
    let animationId
    let lastTime = 0
    const fps = isLowEnd ? 15 : 30
    const interval = 1000 / fps

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp
      const deltaTime = timestamp - lastTime

      if (deltaTime > interval) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        // Draw stars
        const time = Date.now() * 0.001

        stars.forEach((star) => {
          // Simple blinking effect
          const blink = Math.sin(time * star.blinkSpeed * 2 * Math.PI)
          const currentOpacity = star.opacity * (0.7 + 0.3 * blink)

          ctx.fillStyle =
            star.color +
            Math.floor(currentOpacity * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        })

        lastTime = timestamp - (deltaTime % interval)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [density, primaryColor, secondaryColor, isLowEndDevice, isMobile])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
}

