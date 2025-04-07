"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, LineChart, Cpu, BrainCircuit, Layers } from "lucide-react"

const skills = [
  { name: "JavaScript/TypeScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "SQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PyTorch", category: "AI/ML" },
  { name: "Quantitative Finance", category: "Finance" },
  { name: "Algorithmic Trading", category: "Finance" },
  { name: "Risk Management", category: "Finance" },
]

const categories = [
  { name: "Frontend", icon: <Code className="h-5 w-5 text-purple-400" /> },
  { name: "Backend", icon: <Layers className="h-5 w-5 text-purple-400" /> },
  { name: "Database", icon: <Database className="h-5 w-5 text-purple-400" /> },
  { name: "AI/ML", icon: <BrainCircuit className="h-5 w-5 text-purple-400" /> },
  { name: "Finance", icon: <LineChart className="h-5 w-5 text-purple-400" /> },
  { name: "Hardware", icon: <Cpu className="h-5 w-5 text-purple-400" /> },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

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
    <section id="about" className="py-20 section-dark-overlay" ref={sectionRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="scroll-animation">
          <h2 className="text-3xl font-bold mb-6 section-heading enhanced-heading">About Me</h2>
          <div className="space-y-4">
            <p className="text-purple-200">
              I'm a passionate developer and researcher specializing in financial engineering, quantitative analysis,
              and AI-driven solutions. With a background in both software development and financial mathematics, I
              bridge the gap between technology and finance.
            </p>
            <p className="text-purple-200">
              My expertise lies in developing sophisticated algorithms for financial modeling, risk assessment, and
              optimization. I'm particularly interested in applying machine learning techniques to solve complex
              financial problems and create innovative solutions.
            </p>
            <p className="text-purple-200">
              When I'm not coding or researching, you can find me exploring the latest advancements in technology,
              contributing to open-source projects, or diving into new programming languages and frameworks.
            </p>
          </div>
        </div>

        <div className="scroll-animation" style={{ transitionDelay: "0.2s" }}>
          <div className="relative h-64 mb-8 overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=400&width=600" alt="Profile" fill className="object-cover" />
          </div>

          <h3 className="text-xl font-semibold mb-4 enhanced-subheading">Skills & Expertise</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {categories.map((category) => (
              <Card key={category.name} className="enhanced-card">
                <CardContent className="p-4 flex items-center space-x-3">
                  {category.icon}
                  <span className="font-medium text-purple-200">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.name} variant="outline" className="text-sm py-1 border-purple-700/50 text-purple-200">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

