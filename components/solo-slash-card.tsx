"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import gsap from "gsap"

interface SoloSlashCardProps {
  title: string
  imageSrc: string
  href: string
  position?: "left" | "center" | "right"
  className?: string
  delay?: number
}

export default function SoloSlashCard({
  title,
  imageSrc,
  href,
  position = "center",
  className,
  delay = 0,
}: SoloSlashCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for card animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: delay,
      })

      // Initial state
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 50,
      })

      // Reveal animation
      tl.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Hover effect setup
      const hoverTl = gsap.timeline({ paused: true })
      hoverTl.to(cardRef.current?.querySelector(".card-overlay"), {
        opacity: 0.4,
        duration: 0.3,
      })
      hoverTl.to(
        cardRef.current?.querySelector(".card-title"),
        {
          y: -10,
          duration: 0.3,
        },
        "<",
      )
      hoverTl.to(
        cardRef.current?.querySelector(".card-image"),
        {
          scale: 1.1,
          duration: 0.5,
        },
        "<",
      )

      // Add hover event listeners
      cardRef.current?.addEventListener("mouseenter", () => hoverTl.play())
      cardRef.current?.addEventListener("mouseleave", () => hoverTl.reverse())
    }, cardRef)

    return () => ctx.revert()
  }, [delay])

  // Determine image position based on the position prop
  const imagePosition = position === "left" ? "object-left" : position === "right" ? "object-right" : "object-center"

  return (
    <Link href={href}>
      <div
        ref={cardRef}
        className={cn(
          "relative h-[300px] overflow-hidden cursor-pointer group",
          "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/80 before:z-10",
          // Diagonal slash effect with clip-path
          "after:content-[''] after:absolute after:inset-0 after:bg-solo-purple/20 after:z-0",
          "after:clip-path-[polygon(0_0,100%_0,100%_70%,0_100%)]",
          className,
        )}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0 card-image transition-transform duration-700">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className={cn("object-cover", imagePosition)}
            quality={90}
          />
        </div>

        {/* Overlay for hover effect */}
        <div className="card-overlay absolute inset-0 bg-solo-purple/0 z-20 transition-opacity duration-300"></div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
          <h3 className="card-title text-2xl font-bold text-white solo-heading transform transition-transform duration-300">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  )
}

