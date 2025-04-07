"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      const opacity = Math.max(1 - scrollY / 500, 0)
      const translateY = scrollY * 0.5

      heroRef.current.style.opacity = opacity.toString()
      heroRef.current.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.jpeg"
          alt="Dark themed background"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-900/20 to-black/60 backdrop-blur-[2px]"></div>
      </div>
      <div ref={heroRef} className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
          <span className="block text-white enhanced-heading">Hi, I'm</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-300 glow-purple">
            Your Name
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl mb-8 text-purple-100 enhanced-text">
          Developer, Researcher & Financial Engineer
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-purple-700 hover:bg-purple-600 text-white" asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-900/30"
            asChild
          >
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/30"
          onClick={scrollToAbout}
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

