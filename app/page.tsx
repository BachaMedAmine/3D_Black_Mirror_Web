import Hero from "@/components/hero"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"
import NavMenu from "@/components/nav-menu"
import OptimizedStarryBackground from "@/components/shared/optimized-starry-background"
import { Suspense, lazy } from "react"

// Simple loading component for section lazy loading
const SectionLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#00ffff] border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Lazy load components for better performance
const LazyAbout = lazy(() => import("@/components/about"))
const LazyApproach = lazy(() => import("@/components/approach"))
const LazyProjects = lazy(() => import("@/components/projects"))
const LazyWhyUs = lazy(() => import("@/components/why-us"))
const LazyContact = lazy(() => import("@/components/contact"))

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#00a4c9] text-white overflow-hidden">
      {/* Optimized starry background with teal and orange stars */}
      <OptimizedStarryBackground density={150} primaryColor="#00ffff" secondaryColor="#FF6A1D" />

      <LoadingScreen />
      <CustomCursor />
      <NavMenu />

      <Hero />

      <Suspense fallback={<SectionLoading />}>
        <LazyAbout />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <LazyApproach />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <LazyProjects />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <LazyWhyUs />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <LazyContact />
      </Suspense>
    </main>
  )
}

