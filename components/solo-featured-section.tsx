"use client"

import { useEffect, useRef } from "react"
import SoloSlashCard from "./solo-slash-card"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

export default function SoloFeaturedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for section animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      })

      // Heading animation
      tl.fromTo(headingRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="featured" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 solo-grid-pattern opacity-10 z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-solo-purple/10 rounded-full blur-[100px] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={headingRef} className="text-3xl font-bold mb-12 solo-heading text-white">
          Featured <span className="text-solo-purple">Systems</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SoloSlashCard
            title="Quantum Algorithms"
            imageSrc="/images/quantum-research.jpg"
            href="#projects?category=quantum"
            position="center"
            delay={0}
          />
          <SoloSlashCard
            title="Trading Systems"
            imageSrc="/images/sherlock-project.jpg"
            href="#projects?category=trading"
            position="center"
            delay={0.2}
          />
          <SoloSlashCard
            title="Research Papers"
            imageSrc="/images/monte-carlo.jpg"
            href="#projects?category=research"
            position="center"
            delay={0.4}
          />
        </div>

        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            className="border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
            asChild
          >
            <a href="#projects">
              View All Projects
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

