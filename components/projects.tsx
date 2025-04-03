"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const isLandscape = useMediaQuery("(orientation: landscape) and (max-height: 500px)")

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

  const projects = [
    {
      id: 1,
      title: "Daoud Grove",
      subtitle: "Conception et réalisation d'étiquettes/storytelling",
      description:
        "Designed branding and packaging for Daoud Grove, an organic olive oil brand. Created labels with a focus on storytelling, highlighting the family farm's heritage in Tunisia and the purity of their extra virgin olive oil.",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
    {
      id: 2,
      title: "Habiba Jewellery",
      subtitle: "Création concept et direction artistique/photos shoot/storytelling",
      description:
        "Developed a luxurious concept for Habiba Jewellery, including artistic direction and a photoshoot. The campaign featured elegant jewelry paired with a high-end dining setup, emphasizing sophistication and craftsmanship.",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
    {
      id: 3,
      title: "Bank ABC",
      subtitle: "Création et adaptation des affiches et visuels agence",
      description:
        "Created and adapted posters and agency visuals for Bank ABC, focusing on various banking services like construction loans, savings, digital banking, and personal loans. The campaign aimed to engage customers with clear, vibrant visuals.",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
  ]

  const clientLogos = [
    { name: "Divorce Tunisie", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Al Mouna", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Daoud Grove", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Wafa Haute Couture", logo: "/placeholder.svg?height=60&width=120" },
    { name: "GIZ", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Forum de la Mer Bizerte", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Smug's", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Aza Collection", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Alter Vita", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Habiba Jewellery", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Dar Essalem", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Fabrika Vecchia", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Enty", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section
      id="projects"
      className="relative min-h-screen py-16 sm:py-20 px-4 md:px-8 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0A0F3C, #001F99)" }}
    >
      {/* Background with radial gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0F3C] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#001F99]/20 to-transparent opacity-50"></div>
      </div>

      {/* Section Title */}
      <div className="relative z-10 mb-8 sm:mb-16">
        <div className="bg-[#FF6A1D] py-2 sm:py-4 px-4 sm:px-6 inline-block">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">Projets</h2>
        </div>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="space-y-8 sm:space-y-16">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-lg shadow-md border border-[#D3D3D3] overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-black">{project.title}</h3>
                  <p className="text-[#FF6A1D] text-sm sm:text-base font-medium">{project.subtitle}</p>
                  <p className="text-black text-sm sm:text-base">{project.description}</p>

                  <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-[#FF6A1D] text-white rounded-md flex items-center space-x-2 hover:bg-[#FF6A1D]/80 transition-colors">
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="rounded-md overflow-hidden border border-[#D3D3D3]">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos Scrolling Section */}
        <motion.div variants={itemVariants} className="mt-16 sm:mt-24">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8 text-center">Our Clients</h3>

          <div className="relative w-full overflow-hidden py-6 sm:py-8">
            {/* Gradient overlay for fade effect - left side */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10 bg-gradient-to-r from-[#0A0F3C] to-transparent"></div>

            {/* Gradient overlay for fade effect - right side */}
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10 bg-gradient-to-l from-[#0A0F3C] to-transparent"></div>

            {/* Scrolling container - using CSS transform instead of animation for better performance */}
            <div className="logos-scroll-container flex">
              {/* First set of logos */}
              <div className="logos-scroll flex space-x-[30px] sm:space-x-[50px] will-change-transform">
                {clientLogos.map((client, index) => (
                  <div
                    key={`logo-1-${index}`}
                    className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-md p-3 sm:p-4 flex items-center justify-center h-16 sm:h-20 w-24 sm:w-32"
                  >
                    <img
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate set of logos for seamless looping */}
              <div className="logos-scroll flex space-x-[30px] sm:space-x-[50px] will-change-transform">
                {clientLogos.map((client, index) => (
                  <div
                    key={`logo-2-${index}`}
                    className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-md p-3 sm:p-4 flex items-center justify-center h-16 sm:h-20 w-24 sm:w-32"
                  >
                    <img
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CSS for scrolling animation - optimized for performance */}
        <style jsx global>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          .logos-scroll {
            animation: scroll 30s linear infinite;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .logos-scroll {
              animation-duration: 60s;
            }
          }
          
          .logos-scroll-container:hover .logos-scroll {
            animation-play-state: paused;
          }
          
          /* Ensure animation works on all devices */
          @media (max-width: 640px) {
            .logos-scroll {
              animation: scroll 20s linear infinite;
            }
          }
        `}</style>
      </motion.div>
    </section>
  )
}

