"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, ArrowRight } from "lucide-react"

const categories = [
  { id: "all", label: "All Projects" },
  { id: "financial", label: "Financial & Quant AI" },
  { id: "simulations", label: "Simulations & Optimization" },
  { id: "random", label: "Random Bits" },
]

const projects = [
  {
    title: "Algorithmic Trading Platform",
    description:
      "A comprehensive platform for developing, testing, and deploying algorithmic trading strategies with real-time market data integration and risk management tools.",
    image: "/placeholder.svg?height=400&width=600",
    category: "financial",
    technologies: ["Python", "TensorFlow", "React", "Node.js"],
    demoLink: "https://example.com/demo",
    repoLink: "https://github.com/example/repo",
  },
  {
    title: "Portfolio Optimization Tool",
    description:
      "An advanced tool that uses modern portfolio theory and machine learning to optimize investment portfolios based on risk tolerance and return objectives.",
    image: "/placeholder.svg?height=400&width=600",
    category: "financial",
    technologies: ["Python", "PyTorch", "Pandas", "Plotly"],
    demoLink: "https://example.com/demo",
    repoLink: "https://github.com/example/repo",
  },
  {
    title: "Market Sentiment Analyzer",
    description:
      "A natural language processing system that analyzes financial news, social media, and market reports to gauge market sentiment and predict price movements.",
    image: "/placeholder.svg?height=400&width=600",
    category: "financial",
    technologies: ["Python", "NLTK", "Transformers", "FastAPI"],
    demoLink: "https://example.com/demo",
    repoLink: "https://github.com/example/repo",
  },
  {
    title: "Supply Chain Optimization System",
    description:
      "A simulation-based system that optimizes supply chain logistics using genetic algorithms and reinforcement learning to minimize costs and delivery times.",
    image: "/placeholder.svg?height=400&width=600",
    category: "simulations",
    technologies: ["Python", "OR-Tools", "TensorFlow", "D3.js"],
    demoLink: "https://example.com/demo",
    repoLink: "https://github.com/example/repo",
  },
  {
    title: "Quantum Computing Simulator",
    description:
      "A simulator for quantum computing algorithms that allows researchers to test and visualize quantum circuits and algorithms without quantum hardware.",
    image: "/placeholder.svg?height=400&width=600",
    category: "simulations",
    technologies: ["Python", "Qiskit", "NumPy", "React"],
    demoLink: "https://example.com/demo",
    repoLink: "https://github.com/example/repo",
  },
  {
    title: "Neural Network Visualizer",
    description:
      "An interactive tool for visualizing and understanding neural network architectures, training processes, and decision boundaries.",
    image: "/placeholder.svg?height=400&width=600",
    category: "random",
    technologies: ["JavaScript", "TensorFlow.js", "Three.js", "D3.js"],
    demoLink: "https://example.com/demo",
    repoLink: "https://github.com/example/repo",
  },
  {
    title: "Cryptocurrency Analysis Dashboard",
    description:
      "A real-time dashboard for analyzing cryptocurrency markets, including price predictions, volatility analysis, and correlation studies.",
    image: "/placeholder.svg?height=400&width=600",
    category: "financial",
    technologies: ["React", "Node.js", "WebSockets", "D3.js"],
    demoLink: "https://example.com/demo",
    repoLink: "https://github.com/example/repo",
  },
]

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all")
  const sectionRef = useRef<HTMLDivElement>(null)

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-animation")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section id="projects" className="py-20 section-dark-overlay" ref={sectionRef}>
      <h2 className="text-3xl font-bold mb-12 section-heading enhanced-heading">Projects</h2>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-black/50 border border-purple-800/30">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-100"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <Card
            key={project.title}
            className="project-card scroll-animation overflow-hidden enhanced-card"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-48 w-full">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl enhanced-subheading">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs bg-purple-900/30 text-purple-200">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-700/50 text-purple-300 hover:bg-purple-900/30 hover:text-purple-100"
                asChild
              >
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
              <Button size="sm" className="bg-purple-700 hover:bg-purple-600 text-white" asChild>
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          variant="outline"
          className="border-purple-700/50 text-purple-300 hover:bg-purple-900/30 hover:text-purple-100"
          asChild
        >
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            View More on GitHub
            <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>
    </section>
  )
}

