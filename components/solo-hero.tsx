"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import gsap from "gsap"
import SplitType from "split-type"

export default function SoloHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Create timeline for hero animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Split text for character animations using SplitType
      const titleSplit = new SplitType(titleRef.current!, { types: "chars" })
      const nameSplit = new SplitType(nameRef.current!, { types: "chars" })
      const descSplit = new SplitType(descriptionRef.current!, { types: "words" })

      // Hero background animation
      tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })

      // Title animation
      tl.fromTo(
        titleSplit.chars || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.8 },
        "-=0.5",
      )

      // Name animation with glow effect
      tl.fromTo(
        nameSplit.chars || [],
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 1,
          onComplete: () => {
            gsap.to(nameRef.current, {
              textShadow: "0 0 20px rgba(151, 71, 255, 0.8)",
              repeat: -1,
              yoyo: true,
              duration: 2,
            })
          },
        },
        "-=0.3",
      )

      // Description animation
      tl.fromTo(
        descSplit.words || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.8 },
        "-=0.5",
      )

      // Image reveal animation
      tl.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5 },
        "-=0.8",
      )

      // Buttons animation
      tl.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 },
        "-=1",
      )

      // Scroll indicator animation
      tl.fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          onComplete: () => {
            gsap.to(".scroll-indicator", {
              y: 10,
              repeat: -1,
              yoyo: true,
              duration: 1.5,
              ease: "power1.inOut",
            })
          },
        },
        "-=0.5",
      )

      // Parallax scroll effect
      gsap.to(imageRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Fade out on scroll
      gsap.to(heroRef.current, {
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-solo-black solo-animated-bg">
      {/* Animated grid background */}
      <div className="absolute inset-0 solo-grid-pattern opacity-20"></div>

      {/* Hero background image - high quality and clear */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.jpeg"
          alt="Dark themed background"
          fill
          priority
          className="object-cover opacity-80"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-900/20 to-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Purple glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-solo-purple/20 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-solo-blue/20 rounded-full blur-[100px] z-0"></div>

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 solo-heading">
          <span className="block text-white">I AM</span>
          <span
            ref={nameRef}
            className="bg-clip-text text-transparent bg-gradient-to-r from-solo-purple to-solo-blue solo-glow-text"
          >
            HAKIKAT SINGH
          </span>
        </h1>
        <p
          ref={descriptionRef}
          className="text-xl md:text-2xl text-center max-w-2xl mb-8 text-solo-purple-light solo-subheading"
        >
          AI-Driven Quant Developer | Tech Explorer
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="solo-button animate-shadow-pulse" asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-solo-purple text-solo-purple-light hover:bg-solo-purple/10 animate-border-glow"
            asChild
          >
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </div>
      </div>

      {/* Character image */}
      <div ref={imageRef} className="absolute right-0 bottom-0 h-[90vh] w-1/2 z-0 opacity-90 hidden lg:block">
        <Image
          src="/images/quantum-character.png"
          alt="Quantum Developer Character"
          fill
          priority
          className="object-contain object-bottom"
          quality={100}
        />
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 scroll-indicator">
        <Button
          variant="ghost"
          size="icon"
          className="text-solo-purple-light hover:text-solo-purple hover:bg-solo-purple/10"
          onClick={scrollToAbout}
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

