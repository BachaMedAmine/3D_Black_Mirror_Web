"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [webGLError, setWebGLError] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const isMediumScreen = useMediaQuery("(max-width: 768px)")
  const isLandscape = useMediaQuery("(orientation: landscape) and (max-height: 500px)")

  useEffect(() => {
    const detectWebGLSupport = () => {
      const canvas = document.createElement("canvas")
      try {
        if (!window.WebGLRenderingContext) return false
        if (!canvas.getContext("webgl") && !canvas.getContext("experimental-webgl")) return false
        return true
      } catch (e) {
        return false
      }
    }
    if (!detectWebGLSupport()) setWebGLError(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), isSmallScreen ? 1500 : 2600)
    return () => clearTimeout(timer)
  }, [isSmallScreen])

  useEffect(() => {
    if (!canvasRef.current || !isLoaded || webGLError) return

    const isMobile = window.innerWidth < 768
    const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: !isMobile && !isLowEndDevice,
        powerPreference: "high-performance",
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5)) // Cap at 1.5 for efficiency
      if (!isMobile && !isLowEndDevice) {
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.2 // Slightly reduced from 1.5
      }
    } catch (e) {
      console.error("Error creating WebGL renderer", e)
      setWebGLError(true)
      return
    }

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(isMobile || isLowEndDevice ? 256 : 512, { // Reduced from 1024
      format: THREE.RGBAFormat,
      generateMipmaps: !isLowEndDevice,
      minFilter: isLowEndDevice ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter,
    })
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)

    let mirrorWidth = 4
    let mirrorHeight = 2.25
    if (isLandscape || isSmallScreen) {
      mirrorWidth = 3
      mirrorHeight = 1.7
    }

    const createEnvironment = () => {
      const starsGeometry = new THREE.BufferGeometry()
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.03,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
      const starsVertices = []
      for (let i = 0; i < 1000; i++) { // Reduced from 2000
        const x = (Math.random() - 0.5) * 25
        const y = (Math.random() - 0.5) * 25
        const z = (Math.random() - 0.5) * 25
        starsVertices.push(x, y, z)
      }
      starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
      const stars = new THREE.Points(starsGeometry, starsMaterial)
      scene.add(stars)

      const orangeLight = new THREE.PointLight(0xff6a1d, 1.5, 15)
      orangeLight.position.set(3, 2, 3)
      scene.add(orangeLight)

      const cyanLight = new THREE.PointLight(0x00ffff, 1.5, 15)
      cyanLight.position.set(-3, -2, 3)
      scene.add(cyanLight)

      return { stars, orangeLight, cyanLight }
    }

    const environment = createEnvironment()

    const mirrorGeometry = new THREE.BoxGeometry(mirrorWidth, mirrorHeight, 0.2, 16, 16, 16) // Reduced from 32
    const mirrorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00a4c9,
      metalness: 0.95,
      roughness: 0.02,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 2.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      ior: 2.5,
      transmission: 0.15,
      sheen: 1.0,
      sheenColor: new THREE.Color(0x00ffff),
      sheenRoughness: 0.2,
    })
    const mirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial)
    scene.add(mirror)

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    })
    const glowGeometry = new THREE.BoxGeometry(mirrorWidth + 0.2, mirrorHeight + 0.2, 0.3)
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    glow.position.z = -0.05
    scene.add(glow)

    const cyanLight = new THREE.PointLight(0x00ffff, 3, 50)
    cyanLight.position.set(5, 5, 5)
    scene.add(cyanLight)

    const orangeLight = new THREE.PointLight(0xff6a1d, 3, 50)
    orangeLight.position.set(-5, -5, 5)
    scene.add(orangeLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const rimLight = new THREE.PointLight(0xffffff, 1, 10)
    rimLight.position.set(0, 0, 5)
    scene.add(rimLight)

    let controls = null
    if (!isMobile) {
      try {
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.enableZoom = false
        controls.enablePan = false
        controls.rotateSpeed = 0.5
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.3
        controls.minPolarAngle = Math.PI / 2 - 0.5
        controls.maxPolarAngle = Math.PI / 2 + 0.5
      } catch (e) {
        console.error("Error initializing OrbitControls", e)
      }
    }

    if (!isMobile && !isLowEndDevice) {
      const rippleTexture = new THREE.TextureLoader().load("/placeholder.svg?height=256&width=256")
      rippleTexture.wrapS = THREE.RepeatWrapping
      rippleTexture.wrapT = THREE.RepeatWrapping
      mirrorMaterial.displacementMap = rippleTexture
      mirrorMaterial.displacementScale = 0.05
      mirrorMaterial.displacementBias = 0
    }
    let resizeTimeout: ReturnType<typeof setTimeout>

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)

        const newIsLandscape = window.innerWidth > window.innerHeight && window.innerHeight < 500
        if (newIsLandscape !== isLandscape || window.innerWidth < 640 !== isSmallScreen) {
          let newWidth = 4
          let newHeight = 2.25
          if (newIsLandscape || window.innerWidth < 640) {
            newWidth = 3
            newHeight = 1.7
          }
          mirror.geometry.dispose()
          mirror.geometry = new THREE.BoxGeometry(newWidth, newHeight, 0.2, 16, 16, 16)
          glow.geometry.dispose()
          glow.geometry = new THREE.BoxGeometry(newWidth + 0.2, newHeight + 0.2, 0.3)
        }
      }, 100)
    }
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)

    let frameId: number;
    let lastTime = 0
    let frameCount = 0
    const targetFPS = isMobile || isLowEndDevice ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime:number) => {
      frameId = requestAnimationFrame(animate)
      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) return
      lastTime = currentTime - (deltaTime % frameInterval)

      frameCount++
      if (frameCount % 5 === 0) { // Update reflections every 5 frames
        mirror.visible = false
        cubeCamera.update(renderer, scene)
        mirror.visible = true
      }

      const time = Date.now() * 0.001
      if (environment.stars) environment.stars.rotation.y = time * 0.03

      mirror.rotation.y += 0.008
      mirror.rotation.x += 0.004
      glow.rotation.y = mirror.rotation.y
      glow.rotation.x = mirror.rotation.x
      glow.material.opacity = 0.2 + Math.sin(time * 0.5) * 0.1

      if (mirrorMaterial.displacementMap) { // Ripple in main loop
        mirrorMaterial.displacementScale = 0.04 + Math.sin(time * 0.3) * 0.02
      }

      if (environment.orangeLight) {
        environment.orangeLight.position.x = Math.sin(time * 0.5) * 5
        environment.orangeLight.position.z = Math.cos(time * 0.5) * 5
        environment.orangeLight.intensity = 1.5 + Math.sin(time * 0.7) * 0.3
      }
      if (environment.cyanLight) {
        environment.cyanLight.position.x = Math.sin(time * 0.5 + Math.PI) * 5
        environment.cyanLight.position.z = Math.cos(time * 0.5 + Math.PI) * 5
        environment.cyanLight.intensity = 1.5 + Math.cos(time * 0.7) * 0.3
      }

      const cyanTargetX = Math.sin(time * 0.3) * 5
      const cyanTargetZ = Math.cos(time * 0.3) * 5
      cyanLight.position.x += (cyanTargetX - cyanLight.position.x) * 0.05
      cyanLight.position.z += (cyanTargetZ - cyanLight.position.z) * 0.05

      const orangeTargetX = Math.sin(time * 0.3 + Math.PI) * 5
      const orangeTargetZ = Math.cos(time * 0.3 + Math.PI) * 5
      orangeLight.position.x += (orangeTargetX - orangeLight.position.x) * 0.05
      orangeLight.position.z += (orangeTargetZ - orangeLight.position.z) * 0.05

      if (controls) controls.update()
      renderer.render(scene, camera)
    }
    animate(0)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
      renderer.dispose()
      if (controls) controls.dispose()
      mirrorGeometry.dispose()
      mirrorMaterial.dispose()
      glowGeometry.dispose()
      glowMaterial.dispose()
      if (environment.stars) {
        environment.stars.geometry.dispose()
        if (environment.stars.material instanceof THREE.Material) environment.stars.material.dispose()
      }
      scene.clear()
    }
  }, [isLoaded, isSmallScreen, isMediumScreen, isLandscape, webGLError])

  return (
    <section id="home" className="relative h-screen-safe flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00a4c9] to-[#00627a]"></div>
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-gradient-radial from-[#FF6A1D]/30 via-transparent to-transparent animate-pulse"
          style={{ transformOrigin: "center", animation: "pulse 8s infinite" }}
        ></div>
      </div>
      {webGLError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-[#00a4c9] to-[#00627a] opacity-80"></div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
      <div className="relative z-10 text-center px-4 max-w-4xl">
      <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 3, duration: 0.8 }}
  className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-white ${isLandscape ? "mt-0 mb-1" : ""}`}
>
  <span className="relative inline-block">
    BLACK MIRROR
    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A1D] to-[#001F99] blur-[2px] opacity-100 brightness-125">
      BLACK MIRROR
    </span>
  </span>
</motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.8 }}
          className={`mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-[#FF6A1D] font-medium tracking-wide ${isLandscape ? "mb-1" : ""}`}
          style={{ textShadow: "0 0 10px rgba(255, 106, 29, 0.5)" }}
        >
          Reflecting Tomorrow's Communication
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.8 }}
          className={`mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-white/80 ${isLandscape ? "mb-2" : ""}`}
        >
          A Tunisian agency redefining the creative cosmos
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className={`mt-4 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-transparent border border-[#00ffff] hover:border-[#FF6A1D] text-white rounded-full relative overflow-hidden group text-sm sm:text-base`}
        >
          <span className="relative z-10">Enter the Mirror</span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/20 to-[#FF6A1D]/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></span>
          <span className="absolute -inset-px bg-gradient-to-r from-[#00ffff] to-[#FF6A1D] opacity-50 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
        </motion.button>
      </div>
    </section>
  )
}