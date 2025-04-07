"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SoloHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const originalImageRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add hover effect for image swap
    const handleMouseEnter = () => {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
      gsap.to(originalImageRef.current, {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.inOut"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.inOut"
      });
      gsap.to(originalImageRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mouseenter', handleMouseEnter);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Create timeline for hero animations
      const tl = gsap.timeline({ 
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          toggleActions: "play reverse play reverse", // This ensures proper reversal
        }
      })

      // Hero background animation
      tl.fromTo(heroRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }
      )

      // Title animation
      tl.fromTo(
        titleRef.current?.querySelectorAll('.char') || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.8 },
        "-=0.5"
      )

      // Name animation
      tl.fromTo(
        nameRef.current?.querySelectorAll('.char') || [],
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
        "-=0.3"
      )

      // Description animation
      tl.fromTo(
        descriptionRef.current?.querySelectorAll('.word') || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.8 },
        "-=0.5"
      )

      // Buttons animation
      tl.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 },
        "-=0.5"
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
        "-=0.5"
      )

      // Fade out on scroll with proper reset
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (heroRef.current) {
            gsap.to(heroRef.current, {
              opacity: 1 - self.progress * 0.7,
              y: self.progress * 100,
              overwrite: true,
              duration: 0
            });
          }
        }
      });

    }, heroRef)

    return () => {
      ctx.revert();
      if (heroElement) {
        heroElement.removeEventListener('mouseenter', handleMouseEnter);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
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

      {/* Hero background images - sketchy and original with hover effect */}
      <div className="absolute inset-0 z-0">
        {/* Sketchy animated image */}
        <div className="absolute inset-0 transition-opacity duration-500" ref={imageRef}>
          <Image
            src="/images/sketchy-animated.jpg" // Replace with your sketchy image path
            alt="Artistic background"
            fill
            priority
            className="object-cover opacity-80"
            quality={100}
          />
        </div>
        
        {/* Original image (hidden by default) */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500" ref={originalImageRef}>
          <Image
            src="/images/hakikat-profile.jpg" // Replace with your original image path
            alt="Hakikat Singh"
            fill
            priority
            className="object-cover"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-900/20 to-black/60 backdrop-blur-[2px]"></div>
      </div>

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






