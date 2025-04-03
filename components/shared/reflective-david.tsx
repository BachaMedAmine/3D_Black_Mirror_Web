"use client"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import * as THREE from "three"

interface ReflectiveDavidProps {
  position?: "left" | "right" | "center"
  opacity?: number
  scale?: number
  color?: string
  accentColor?: string
  className?: string
}

export default function ReflectiveDavid({
  position = "right",
  opacity = 1,
  scale = 1,
  color = "#00a4c9",
  accentColor = "#FF6A1D",
  className = "",
}: ReflectiveDavidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [webGLError, setWebGLError] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  const positionStyles = {
    left: { right: "auto", left: isMobile ? "-20%" : "0" },
    right: { left: "auto", right: isMobile ? "-20%" : "0" },
    center: { left: "50%", transform: "translateX(-50%)" },
  }

  const mobileScale = isMobile ? scale * 0.7 : scale

  useEffect(() => {
    const detectLowEndDevice = () => {
      return (
        typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency !== undefined &&
        navigator.hardwareConcurrency <= 4
      )
    }
    setIsLowEndDevice(detectLowEndDevice())
  }, [])

  useEffect(() => {
    const detectWebGLSupport = () => {
      try {
        if (!window.WebGLRenderingContext) return false
        return true
      } catch (e) {
        return false
      }
    }

    if (!detectWebGLSupport()) {
      setWebGLError(true)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || webGLError) return

    const container = containerRef.current
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 5

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isLowEndDevice,
      })

      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowEndDevice ? 1 : 2))
      container.appendChild(renderer.domElement)
    } catch (e) {
      console.error("Error creating WebGL renderer", e)
      setWebGLError(true)
      return
    }

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(isLowEndDevice ? 128 : 256, {
      format: THREE.RGBAFormat,
      generateMipmaps: !isLowEndDevice,
      minFilter: isLowEndDevice ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter,
    })

    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)

    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const starsCount = isLowEndDevice ? 200 : 500
    const starsVertices = []
    for (let i = 0; i < starsCount; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    const headGeometry = new THREE.SphereGeometry(1.5, isLowEndDevice ? 32 : 64, isLowEndDevice ? 32 : 64)

    const headMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      metalness: 1.0,
      roughness: 0.05,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 2.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      ior: 2.0,
      transmission: 0.1,
    })

    const head = new THREE.Mesh(headGeometry, headMaterial)
    scene.add(head)

    const mainLight = new THREE.PointLight(0xffffff, 2, 50)
    mainLight.position.set(5, 5, 5)
    scene.add(mainLight)

    const accentLight = new THREE.PointLight(accentColor, 2, 50)
    accentLight.position.set(-5, -5, 5)
    scene.add(accentLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    if (!isLowEndDevice && !isMobile) {
      const rippleTexture = new THREE.TextureLoader().load("/placeholder.svg?height=256&width=256")
      rippleTexture.wrapS = THREE.RepeatWrapping
      rippleTexture.wrapT = THREE.RepeatWrapping

      headMaterial.displacementMap = rippleTexture
      headMaterial.displacementScale = 0.03
      headMaterial.displacementBias = 0

      const animateRipple = () => {
        const time = Date.now() * 0.001
        headMaterial.displacementScale = 0.02 + Math.sin(time * 0.5) * 0.01
        requestAnimationFrame(animateRipple)
      }

      animateRipple()
    }

    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (!containerRef.current) return
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
      }, 200)
    }

    window.addEventListener("resize", handleResize)

    let frameId: number
    let lastTime = 0
    const targetFPS = isLowEndDevice ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      frameId = requestAnimationFrame(animate)
      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) return
      lastTime = currentTime - (deltaTime % frameInterval)

      head.visible = false
      cubeCamera.update(renderer, scene)
      head.visible = true

      const time = Date.now() * 0.001
      const targetRotationY = Math.sin(time * 0.15) * 0.15
      const targetRotationX = Math.sin(time * 0.1) * 0.08
      head.rotation.y += (targetRotationY - head.rotation.y) * 0.02
      head.rotation.x += (targetRotationX - head.rotation.x) * 0.02

      const mainTargetX = Math.sin(time * 0.15) * 5
      const mainTargetZ = Math.cos(time * 0.15) * 5
      mainLight.position.x += (mainTargetX - mainLight.position.x) * 0.02
      mainLight.position.z += (mainTargetZ - mainLight.position.z) * 0.02

      const accentTargetX = Math.sin(time * 0.15 + Math.PI) * 5
      const accentTargetZ = Math.cos(time * 0.15 + Math.PI) * 5
      accentLight.position.x += (accentTargetX - accentLight.position.x) * 0.02
      accentLight.position.z += (accentTargetZ - accentLight.position.z) * 0.02

      stars.rotation.y = time * 0.03

      renderer.render(scene, camera)
    }

    animate(0)
    setLoaded(true)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", handleResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      headGeometry.dispose()
      headMaterial.dispose()
      renderer.dispose()
      stars.geometry.dispose()
      if (stars.material instanceof THREE.Material) {
        stars.material.dispose()
      }

      scene.clear()
    }
  }, [color, accentColor, isMobile, isLowEndDevice, webGLError])

  return (
    <div
      ref={containerRef}
      className={`absolute bottom-0 h-full overflow-hidden pointer-events-none z-0 ${className}`}
      style={{
        ...positionStyles[position],
        opacity: loaded ? opacity : 0,
        transition: "opacity 0.5s ease-in-out",
        width: position === "center" ? "100%" : "50%",
      }}
    >
      {webGLError && <div className="absolute inset-0 bg-gradient-to-br from-[#00a4c9] to-[#00627a] opacity-50"></div>}
    </div>
  )
}