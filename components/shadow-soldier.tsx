"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"

interface ShadowSoldierProps {
  imageSrc: string
  name: string
  role: string
  level: string
  delay?: number
}

export default function ShadowSoldier({ imageSrc, name, role, level, delay = 0 }: ShadowSoldierProps) {
  const soldierRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for shadow soldier animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: soldierRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: delay,
      })

      // Initial state - grayscale and dark
      gsap.set(soldierRef.current, {
        filter: "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(230deg) saturate(600%)",
      })

      // Reveal animation
      tl.fromTo(
        soldierRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      )

      // Hover effect
      soldierRef.current?.addEventListener("mouseenter", () => {
        gsap.to(soldierRef.current, {
          filter: "grayscale(0%) brightness(100%)",
          scale: 1.05,
          duration: 0.5,
        })
      })

      soldierRef.current?.addEventListener("mouseleave", () => {
        gsap.to(soldierRef.current, {
          filter: "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(230deg) saturate(600%)",
          scale: 1,
          duration: 0.5,
        })
      })
    }, soldierRef)

    return () => ctx.revert()
  }, [delay])

  return (
    <div
      ref={soldierRef}
      className="relative overflow-hidden rounded-lg solo-card cursor-pointer transition-all duration-300"
    >
      <div className="relative h-64 w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-solo-black to-transparent">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold text-white solo-heading">{name}</h3>
            <p className="text-sm text-solo-accent">{role}</p>
          </div>
          <div className="bg-solo-purple/30 px-2 py-1 rounded border border-solo-purple/50">
            <span className="text-xs font-bold solo-heading text-solo-purple-light">LEVEL {level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

