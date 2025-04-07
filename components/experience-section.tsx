"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Senior Financial Engineer",
    company: "Quant Solutions Inc.",
    period: "2020 - Present",
    description:
      "Lead the development of quantitative models for risk assessment and portfolio optimization. Implemented machine learning algorithms to predict market trends and optimize trading strategies.",
    skills: ["Python", "TensorFlow", "Financial Modeling", "Risk Analysis"],
  },
  {
    title: "Quantitative Analyst",
    company: "FinTech Innovations",
    period: "2017 - 2020",
    description:
      "Developed and maintained algorithmic trading systems. Created statistical models for market analysis and prediction. Collaborated with the engineering team to implement and optimize trading algorithms.",
    skills: ["R", "Python", "Statistical Modeling", "Algorithmic Trading"],
  },
  {
    title: "Software Developer",
    company: "Tech Solutions Ltd.",
    period: "2015 - 2017",
    description:
      "Designed and implemented full-stack web applications. Worked on database optimization and backend architecture. Collaborated with cross-functional teams to deliver high-quality software products.",
    skills: ["JavaScript", "React", "Node.js", "SQL"],
  },
]

export default function ExperienceSection() {
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
    <section id="experience" className="py-20 section-dark-overlay">
      <h2 className="text-3xl font-bold mb-12 section-heading enhanced-heading">Professional Experience</h2>

      <div className="relative experience-timeline pl-8">
        {experiences.map((exp, index) => (
          <div key={index} className="scroll-animation mb-12" style={{ transitionDelay: `${index * 0.2}s` }}>
            <div className="absolute left-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 -translate-x-1/2 mt-1.5"></div>
            <Card className="enhanced-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <CardTitle className="text-xl enhanced-subheading">{exp.title}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1 border-purple-700/50 text-purple-200">
                    <Calendar className="h-3 w-3" />
                    {exp.period}
                  </Badge>
                </div>
                <div className="flex items-center text-purple-400">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {exp.company}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-purple-200">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs bg-purple-900/30 text-purple-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}

