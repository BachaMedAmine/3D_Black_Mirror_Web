"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Set initial value - safely check for window
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)
      setMatches(media.matches)

      // Add debouncing to avoid excessive re-renders
      let debounceTimeout: NodeJS.Timeout

      const listener = () => {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => {
          setMatches(media.matches)
        }, 100)
      }

      // Use the modern event listener pattern
      try {
        // Modern browsers
        media.addEventListener("change", listener)
      } catch (e) {
        // Fallback for older browsers
        media.addListener(listener)
      }

      return () => {
        clearTimeout(debounceTimeout)
        try {
          // Modern browsers
          media.removeEventListener("change", listener)
        } catch (e) {
          // Fallback for older browsers
          media.removeListener(listener)
        }
      }
    }
  }, [query])

  // Return false during SSR to avoid hydration mismatch
  if (!mounted) return false

  return matches
}

