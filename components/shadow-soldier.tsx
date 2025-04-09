"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"

interface ShadowSoldierProps {
  imageSrc: string
  name: string
  role: string
  level: string
  shadowSrc: string
  delay?: number
}

export default function ShadowSoldier({
  imageSrc,
  name,
  role,
  level,
  shadowSrc,
  delay = 0
}: ShadowSoldierProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const soldierRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)
  const cardContentRef = useRef<HTMLDivElement>(null)
  const impactFrameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([mistRef.current, shadowRef.current], {
        opacity: 0,
      })
      
      gsap.set(shadowRef.current, {
        y: 100,
        scale: 1.2,
      })

      // Parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return
        
        const rect = containerRef.current.getBoundingClientRect()
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5

        gsap.to(soldierRef.current, {
          rotateY: mouseX * 10,
          rotateX: -mouseY * 10,
          duration: 0.5,
          ease: "power2.out"
        })

        gsap.to(shadowRef.current, {
          x: mouseX * 20,
          y: mouseY * 20,
          duration: 0.5,
          ease: "power2.out"
        })
      }

      // Hover effect timeline
      const hoverTl = gsap.timeline({ paused: true })

      // Impact frame flash with more intensity
      hoverTl.to(impactFrameRef.current, {
        scale: 1.15,
        opacity: 1,
        duration: 0.2,
      }).to(impactFrameRef.current, {
        scale: 1,
        opacity: 0,
        duration: 0.3,
      }, "-=0.1")

      // More dramatic dim and blur for other cards
      hoverTl.to('.shadow-soldier-card:not(:hover)', {
        filter: 'brightness(0.15) blur(4px)',
        scale: 0.92,
        duration: 0.5,
        ease: "power2.out"
      }, 0)

      // Enhanced card rise and glow effect
      hoverTl.to(soldierRef.current, {
        y: -40, // Increased rise height
        scale: 1.08,
        rotationY: 5, // Slight rotation for 3D effect
        boxShadow: '0 30px 60px -12px rgba(151, 71, 255, 0.5), 0 0 20px rgba(151, 71, 255, 0.3)',
        duration: 0.5,
        ease: "power2.out"
      }, 0)

      // Enhanced mist effect
      hoverTl.to(mistRef.current, {
        opacity: 0.9,
        scale: 1.15,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0)

      // Add a background overlay to emphasize the focused card
      hoverTl.to('.overlay-dim', {
        opacity: 0.85,
        duration: 0.5,
      }, 0)

      // Shadow soldier dramatic entrance
      hoverTl.to(shadowRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, 0.1)

      // Content emphasis
      hoverTl.to(cardContentRef.current, {
        y: -10,
        duration: 0.4,
        ease: "power2.out"
      }, 0)

      // Add event listeners
      const element = containerRef.current
      if (element) {
        element.addEventListener("mouseenter", () => {
          hoverTl.play()
          element.addEventListener("mousemove", handleMouseMove)
        })

        element.addEventListener("mouseleave", () => {
          hoverTl.reverse()
          element.removeEventListener("mousemove", handleMouseMove)
          // Reset rotations
          gsap.to([soldierRef.current, shadowRef.current], {
            rotateX: 0,
            rotateY: 0,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={containerRef} className="relative shadow-soldier-card perspective-1000">
      <div
        ref={soldierRef}
        className="relative overflow-hidden rounded-lg solo-card cursor-pointer transition-all duration-300 preserve-3d"
      >
        {/* Base card image */}
        <div className="relative h-64 w-full">
          <Image 
            src={imageSrc || "/placeholder.svg"} 
            alt={name} 
            fill 
            className="object-cover" 
          />
        </div>

        {/* Mist effect */}
        <div 
          ref={mistRef}
          className="absolute inset-0 pointer-events-none solo-mist"
        />
        
        {/* Shadow Soldier Overlay */}
        <div 
          ref={shadowRef}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
          <Image
            src={shadowSrc}
            alt={`${name} Shadow`}
            fill
            className="object-contain mix-blend-luminosity"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(151, 71, 255, 0.5))'
            }}
          />
        </div>

        {/* Card info */}
        <div 
          ref={cardContentRef}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-solo-black to-transparent"
        >
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-lg font-bold text-white solo-heading">{name}</h3>
              <p className="text-sm text-solo-accent">{role}</p>
            </div>
            <div className="bg-solo-purple/30 px-2 py-1 rounded border border-solo-purple/50">
              <span className="text-xs font-bold solo-heading text-solo-purple-light">
                LEVEL {level}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}







