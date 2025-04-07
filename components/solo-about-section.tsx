"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, LineChart, Cpu, BrainCircuit, Layers } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skills = [
  { name: "Python", category: "Backend & Systems" },
  { name: "Node.js", category: "Backend & Systems" },
  { name: "Quantum Algorithm Integration", category: "Backend & Systems" },
  { name: "GitHub Actions", category: "CI/CD & Automation" },
  { name: "Vercel", category: "CI/CD & Automation" },
  { name: "Redis", category: "CI/CD & Automation" },
  { name: "TensorFlow", category: "AI/ML Engineering" },
  { name: "PyTorch", category: "AI/ML Engineering" },
  { name: "NLP", category: "AI/ML Engineering" },
  { name: "Reinforcement Learning", category: "AI/ML Engineering" },
  { name: "Algorithmic Trading", category: "Quantitative Development" },
  { name: "Risk Management", category: "Quantitative Development" },
  { name: "Zerodha Kite API", category: "Quantitative Development" },
  { name: "CUDA", category: "Simulations" },
  { name: "Quantum Monte Carlo", category: "Simulations" },
  { name: "Hybrid HHL Solvers", category: "Simulations" },
  { name: "React", category: "Full-Stack Development" },
  { name: "Next.js", category: "Full-Stack Development" },
  { name: "TypeScript", category: "Full-Stack Development" },
  { name: "Supabase", category: "Full-Stack Development" },
]

const categories = [
  { name: "Backend & Systems", icon: <Layers className="h-5 w-5 text-solo-purple-light" /> },
  { name: "CI/CD & Automation", icon: <Code className="h-5 w-5 text-solo-purple-light" /> },
  { name: "AI/ML Engineering", icon: <BrainCircuit className="h-5 w-5 text-solo-purple-light" /> },
  { name: "Quantitative Development", icon: <LineChart className="h-5 w-5 text-solo-purple-light" /> },
  { name: "Simulations", icon: <Cpu className="h-5 w-5 text-solo-purple-light" /> },
  { name: "Full-Stack Development", icon: <Database className="h-5 w-5 text-solo-purple-light" /> },
]

export default function SoloAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const statusWindowRef = useRef<HTMLDivElement>(null)

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
      tl.fromTo(".section-heading", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 })

      // Text paragraphs animation
      tl.fromTo(
        textRef.current?.querySelectorAll("p"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 },
        "-=0.4",
      )

      // Image animation
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          onComplete: () => {
            // Add subtle floating animation
            gsap.to(imageRef.current, {
              y: 10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            })
          },
        },
        "-=0.6",
      )

      // Status window animation
      tl.fromTo(statusWindowRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")

      // Status bars animation
      tl.fromTo(
        ".solo-progress-bar",
        { width: 0 },
        { width: "var(--progress-width)", stagger: 0.1, duration: 1, ease: "power2.out" },
        "-=0.4",
      )

      // Skills categories animation
      tl.fromTo(
        skillsRef.current?.querySelectorAll(".solo-card"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        "-=0.8",
      )

      // Skills badges animation
      tl.fromTo(
        ".skill-badge",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.03, duration: 0.5 },
        "-=0.4",
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 solo-grid-pattern opacity-10 z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-solo-purple/10 rounded-full blur-[100px] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={textRef}>
            <h2 className="text-3xl font-bold mb-6 section-heading solo-heading text-white">
              About <span className="text-solo-purple">Me</span>
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Hi! I'm Hakikat, a developer passionate about solving real-world financial challenges with
                <span className="text-solo-purple-light font-semibold"> AI and quantum-inspired tools</span>. My work
                centers on building systems like <span className="text-solo-purple-light font-semibold">Sherlock</span>{" "}
                (adaptive trading algorithms) and{" "}
                <span className="text-solo-purple-light font-semibold">Morzart Edge</span> (sentiment-driven strategies)
                that balance innovation with practicality.
              </p>
              <p className="text-gray-300">
                I thrive on collaboration, learning, and turning complex ideas into tools that deliver measurable
                results. My expertise lies in developing sophisticated algorithms for financial modeling, risk
                assessment, and optimization using cutting-edge AI and quantum computing techniques.
              </p>
              <p className="text-gray-300">
                When not coding, you'll find me experimenting with{" "}
                <span className="text-solo-purple-light font-semibold">CUDA-enhanced fluid simulations</span>, cheering
                for FC Barcelona, or laughing at my failed attempts to out-engineer Houdini's particle systems.
              </p>
            </div>

            {/* Status Window */}
            <div ref={statusWindowRef} className="status-window mt-8">
              <h3 className="status-window-title">Developer Status</h3>

              <div className="status-window-stat">
                <span className="status-window-stat-name">Level</span>
                <span className="status-window-stat-value">S</span>
              </div>

              <div className="status-window-stat">
                <span className="status-window-stat-name">Specialization</span>
                <span className="status-window-stat-value">Quantum Finance</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mt-4 mb-1">
                  <span className="text-solo-accent">AI/ML Engineering</span>
                  <span className="text-white">95%</span>
                </div>
                <div className="solo-progress-container">
                  <div className="solo-progress-bar" style={{ "--progress-width": "95%" } as React.CSSProperties}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mt-4 mb-1">
                  <span className="text-solo-accent">Quantitative Development</span>
                  <span className="text-white">92%</span>
                </div>
                <div className="solo-progress-container">
                  <div className="solo-progress-bar" style={{ "--progress-width": "92%" } as React.CSSProperties}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mt-4 mb-1">
                  <span className="text-solo-accent">Full-Stack Development</span>
                  <span className="text-white">88%</span>
                </div>
                <div className="solo-progress-container">
                  <div className="solo-progress-bar" style={{ "--progress-width": "88%" } as React.CSSProperties}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mt-4 mb-1">
                  <span className="text-solo-accent">Quantum Computing</span>
                  <span className="text-white">85%</span>
                </div>
                <div className="solo-progress-container">
                  <div className="solo-progress-bar" style={{ "--progress-width": "85%" } as React.CSSProperties}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div ref={imageRef} className="relative h-64 mb-8 overflow-hidden rounded-lg solo-glow-border">
              <Image
                src="/images/hakikat-profile.jpg"
                alt="Hakikat Singh"
                fill
                className="object-cover"
                quality={100}
              />

              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-solo-blue-dark/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-sm text-solo-accent solo-subheading">CHARACTER PROFILE</div>
                <div className="text-xl text-white solo-heading">HAKIKAT SINGH</div>
              </div>
            </div>

            <div ref={skillsRef}>
              <h3 className="text-xl font-semibold mb-4 solo-subheading text-solo-purple-light">Skills & Expertise</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {categories.map((category) => (
                  <Card key={category.name} className="solo-card">
                    <CardContent className="p-4 flex items-center space-x-3">
                      {category.icon}
                      <span className="font-medium text-white">{category.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="outline"
                    className="skill-badge text-sm py-1 border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

