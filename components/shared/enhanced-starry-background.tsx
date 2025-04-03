"use client"

import { useEffect, useRef } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface EnhancedStarryBackgroundProps {
  density?: number
  speed?: number
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

export default function EnhancedStarryBackground({
  density = 100,
  speed = 0.05,
  opacity = 0.7,
  primaryColor = "#00ffff",
  secondaryColor = "#FF6A1D",
}: EnhancedStarryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isLowEndDevice = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isMobile = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Adjust density for performance
    const actualDensity = isLowEndDevice ? Math.floor(density / 3) : isMobile ? Math.floor(density / 2) : density

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars
    const stars: {
      x: number
      y: number
      size: number
      speed: number
      color: string
      twinkleSpeed: number
      twinklePhase: number
      opacity: number
    }[] = []

    for (let i = 0; i < actualDensity; i++) {
      // Randomly choose between primary and secondary color
      const color = Math.random() > 0.8 ? secondaryColor : primaryColor

      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * speed + 0.05,
        color,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Create a few larger "special" stars
    for (let i = 0; i < actualDensity / 20; i++) {
      const color = Math.random() > 0.5 ? secondaryColor : primaryColor
      const size = Math.random() * 3 + 2

      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speed: Math.random() * speed * 0.5 + 0.02,
        color,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.3 + 0.7,
      })
    }

    // Animation
    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Calculate twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase)
        const currentOpacity = star.opacity * (0.7 + 0.3 * twinkle)

        // Draw star with glow effect for larger stars
        if (star.size > 2) {
          // Draw glow
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
          gradient.addColorStop(0, `${star.color}`)
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw star core
        ctx.fillStyle = `${star.color}${Math.floor(currentOpacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Move stars
        if (!isLowEndDevice) {
          star.y += star.speed

          // Reset position if star goes off screen
          if (star.y > canvas.height) {
            star.y = 0
            star.x = Math.random() * canvas.width
          }
        }
      })

      // Occasionally add a shooting star
      if (Math.random() < 0.003 && !isLowEndDevice) {
        const shootingStar = {
          startX: Math.random() * canvas.width,
          startY: (Math.random() * canvas.height) / 3,
          length: Math.random() * 100 + 50,
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 4,
          speed: Math.random() * 15 + 10,
          progress: 0,
          color: Math.random() > 0.5 ? primaryColor : secondaryColor,
        }

        const animateShootingStar = () => {
          if (shootingStar.progress >= 1) return

          shootingStar.progress += 0.02

          const fadeInOut = Math.sin(shootingStar.progress * Math.PI)
          const currentX =
            shootingStar.startX + Math.cos(shootingStar.angle) * shootingStar.speed * shootingStar.progress * 20
          const currentY =
            shootingStar.startY + Math.sin(shootingStar.angle) * shootingStar.speed * shootingStar.progress * 20

          ctx.strokeStyle = `${shootingStar.color}${Math.floor(fadeInOut * 255)
            .toString(16)
            .padStart(2, "0")}`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(currentX, currentY)
          ctx.lineTo(
            currentX - Math.cos(shootingStar.angle) * shootingStar.length * fadeInOut,
            currentY - Math.sin(shootingStar.angle) * shootingStar.length * fadeInOut,
          )
          ctx.stroke()

          requestAnimationFrame(animateShootingStar)
        }

        animateShootingStar()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [density, speed, opacity, isLowEndDevice, isMobile, primaryColor, secondaryColor])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
}

