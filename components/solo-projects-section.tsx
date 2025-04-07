"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, ArrowRight, FileText } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const categories = [
  { id: "all", label: "All Projects" },
  { id: "research", label: "Research & Publications" },
  { id: "trading", label: "Trading Systems" },
  { id: "quantum", label: "Quantum Computing" },
]

const projects = [
  {
    title: "Hybrid Classical-Quantum Algorithms for Financial Linear Systems",
    description:
      "Combined CUDA-accelerated preconditioning with quantum HHL, solving sparse systems 50% faster than classical methods.",
    image: "/images/quantum-research.jpg",
    category: "research",
    technologies: ["Quantum HHL", "CUDA", "Linear Algebra", "Financial Modeling"],
    demoLink: "https://example.com/quantum-hhl-paper",
    repoLink: "https://github.com/hakikat/quantum-hhl",
    level: "S+",
    type: "Thesis",
    date: "October 2024",
  },
  {
    title: "Quantum Monte Carlo for Portfolio Optimization",
    description:
      "Applied quantum algorithms to high-dimensional risk modeling, outperforming classical benchmarks in portfolio optimization scenarios.",
    image: "/images/monte-carlo.jpg",
    category: "research",
    technologies: ["Quantum Monte Carlo", "Portfolio Theory", "Risk Modeling", "Qiskit"],
    demoLink: "https://example.com/quantum-monte-carlo",
    repoLink: "https://github.com/hakikat/quantum-monte-carlo",
    level: "S",
    type: "Thesis",
    date: "August 2024",
  },
  {
    title: "Dynamic Caching for Adaptive Databases",
    description:
      "Reduced query latency by 35% through workload-driven algorithm switching in high-frequency trading database systems.",
    image: "/images/database-research.jpg",
    category: "research",
    technologies: ["Database Optimization", "Caching Algorithms", "Performance Tuning", "Redis"],
    demoLink: "https://example.com/dynamic-caching",
    repoLink: "https://github.com/hakikat/dynamic-caching",
    level: "A",
    type: "Thesis",
    date: "November 2023",
  },
  {
    title: "Sherlock Trading System",
    description:
      "An RL-based trading bot achieving 12% MoM returns in volatile markets through adaptive learning and risk management.",
    image: "/images/sherlock-project.jpg",
    category: "trading",
    technologies: ["Reinforcement Learning", "Python", "TensorFlow", "Zerodha API"],
    demoLink: "https://example.com/sherlock",
    repoLink: "https://github.com/hakikat/sherlock",
    level: "S",
  },
  {
    title: "Morzart Edge",
    description:
      "NLP-powered sentiment analysis system for trading strategies, integrating with QuantConnect for backtesting and validation.",
    image: "/images/morzart-project.jpg",
    category: "trading",
    technologies: ["NLP", "Sentiment Analysis", "QuantConnect", "PyTorch"],
    demoLink: "https://example.com/morzart",
    repoLink: "https://github.com/hakikat/morzart",
    level: "A+",
  },
  {
    title: "Quantum Circuit Optimizer",
    description:
      "Contributed to IBM's Qiskit by refining quantum circuit optimizations specifically for financial applications.",
    image: "/images/quantum-circuit.jpg",
    category: "quantum",
    technologies: ["Qiskit", "Quantum Gates", "Circuit Optimization", "Python"],
    demoLink: "https://example.com/quantum-optimizer",
    repoLink: "https://github.com/hakikat/quantum-optimizer",
    level: "S",
  },
]

export default function SoloProjectsSection() {
  const [activeTab, setActiveTab] = useState("all")
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

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

      // Tabs animation
      tl.fromTo(tabsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")

      // Create staggered animations for project cards
      const animateProjects = () => {
        gsap.fromTo(
          ".project-card",
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all",
          },
        )
      }

      // Initial animation
      tl.add(() => animateProjects(), "-=0.2")

      // Re-animate when tab changes
      return () => {
        animateProjects()
      }
    }, sectionRef)

    // Re-run animations when tab changes
    const reanimateCards = () => {
      gsap.fromTo(
        ".project-card",
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        },
      )
    }

    reanimateCards()

    return () => ctx.revert()
  }, [activeTab])

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 solo-grid-pattern opacity-10 z-0"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-solo-blue/10 rounded-full blur-[100px] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={headingRef} className="text-3xl font-bold mb-12 solo-heading text-white">
          <span className="text-solo-purple">Projects</span> & Research
        </h2>

        <div ref={tabsRef}>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-solo-gray-dark/50 border border-solo-purple/30">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-solo-purple/30 data-[state=active]:text-solo-purple-light"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.title} className="project-card solo-card overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-solo-black/80 px-2 py-1 rounded border border-solo-purple/50">
                  <span className="text-xs font-bold solo-heading text-solo-purple-light">RANK {project.level}</span>
                </div>
                {project.type && (
                  <div className="absolute top-2 left-2 bg-solo-purple/30 px-2 py-1 rounded border border-solo-purple/50">
                    <span className="text-xs font-bold solo-heading text-white">{project.type}</span>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl solo-subheading text-solo-purple-light">{project.title}</CardTitle>
                {project.date && <div className="text-sm text-solo-accent">{project.date}</div>}
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-solo-blue-dark/50 text-solo-accent">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
                  asChild
                >
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
                <Button size="sm" className="solo-button" asChild>
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    {project.category === "research" ? (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Paper
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </>
                    )}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            className="border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
            asChild
          >
            <a href="https://github.com/hakikat" target="_blank" rel="noopener noreferrer">
              View More on GitHub
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

