"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar } from "lucide-react"
import gsap from "gsap"
import ShadowSoldier from "./shadow-soldier"

const experiences = [
  {
    title: "Lead Developer",
    company: "IMBUEIT (US Tech Startup)",
    period: "2024 - Present",
    description:
      "Built a social crowdfunding platform (LinkedIn meets Kickstarter) using Next.js and Supabase. Led a team of 3 interns to automate CI/CD workflows, slashing deployment time by 40%. Designed a clean UI with TailwindCSS, improving user retention by 15%.",
    skills: ["Next.js", "Supabase", "CI/CD", "TailwindCSS", "Team Leadership"],
    level: "S",
  },
  {
    title: "AI & Quant Researcher",
    company: "Independent",
    period: "2023 - Present",
    description:
      "Designed Sherlock, an RL-based trading bot, achieving 12% MoM returns in volatile markets. Built Morzart Edge, integrating NLP sentiment analysis with QuantConnect backtesting. Created Alpha Forge, an NLP framework to validate AI models pre-deployment.",
    skills: ["Reinforcement Learning", "NLP", "QuantConnect", "Algorithmic Trading", "Sentiment Analysis"],
    level: "S",
  },
  {
    title: "Open-Source Contributor",
    company: "Various Projects",
    period: "2023 - 2024",
    description:
      "Developed CUDA-enhanced fluid simulations for real-time risk modeling. Contributed to IBM's Qiskit, refining quantum circuit optimizations for finance.",
    skills: ["CUDA", "Fluid Simulations", "Qiskit", "Quantum Computing", "Risk Modeling"],
    level: "A",
  },
]

const shadowSoldiers = [
  {
    name: "Sherlock",
    role: "Adaptive Trading Bot",
    level: "S",
    imageSrc: "/images/sherlock-soldier.jpg",
  },
  {
    name: "Morzart Edge",
    role: "Sentiment Analysis",
    level: "A+",
    imageSrc: "/images/morzart-soldier.jpg",
  },
  {
    name: "Alpha Forge",
    role: "NLP Framework",
    level: "A",
    imageSrc: "/images/alpha-soldier.jpg",
  },
  {
    name: "Quantum HHL",
    role: "Linear System Solver",
    level: "S+",
    imageSrc: "/images/quantum-soldier.jpg",
  },
]

export default function SoloExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const soldiersRef = useRef<HTMLDivElement>(null)

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
      tl.fromTo(headingRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 })

      // Timeline line animation
      tl.fromTo(
        ".experience-timeline::before",
        { height: 0 },
        { height: "100%", duration: 1.5, ease: "power3.inOut" },
        "-=0.4",
      )

      // Experience cards animation
      tl.fromTo(".experience-card", { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: 0.3, duration: 0.8 }, "-=1.2")

      // Timeline dots animation
      tl.fromTo(
        ".timeline-dot",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.3, duration: 0.5, ease: "back.out(1.7)" },
        "-=1.5",
      )

      // Shadow soldiers heading animation
      tl.fromTo(".soldiers-heading", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")

      // Shadow soldiers description animation
      tl.fromTo(".soldiers-description", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.6")
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 solo-grid-pattern opacity-10 z-0"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-solo-blue/10 rounded-full blur-[100px] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={headingRef} className="text-3xl font-bold mb-12 solo-heading text-white">
          Professional <span className="text-solo-purple">Experience</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={timelineRef} className="relative experience-timeline pl-8">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-12 relative">
                <div className="timeline-dot absolute left-0 w-4 h-4 rounded-full bg-gradient-to-r from-solo-purple to-solo-blue -translate-x-1/2 mt-1.5 z-10"></div>
                <Card className="experience-card solo-card">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <CardTitle className="text-xl solo-subheading text-solo-purple-light">{exp.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 border-solo-purple/50 text-solo-purple-light"
                      >
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </Badge>
                    </div>
                    <div className="flex items-center text-solo-accent">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {exp.company}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-300">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs bg-solo-blue-dark/50 text-solo-accent"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className="bg-solo-purple/30 px-2 py-1 rounded border border-solo-purple/50">
                        <span className="text-xs font-bold solo-heading text-solo-purple-light">RANK {exp.level}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div ref={soldiersRef}>
            <h3 className="soldiers-heading text-2xl font-bold mb-4 solo-heading text-white">
              <span className="text-solo-purple">Shadow</span> Soldiers
            </h3>
            <p className="soldiers-description text-gray-300 mb-8">
              These are the AI systems and algorithms I've mastered and can summon at will. Each represents a domain of
              expertise that I've leveled up through years of research and real-world application.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {shadowSoldiers.map((soldier, index) => (
                <ShadowSoldier
                  key={soldier.name}
                  imageSrc={soldier.imageSrc}
                  name={soldier.name}
                  role={soldier.role}
                  level={soldier.level}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

