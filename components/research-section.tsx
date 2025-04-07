"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink } from "lucide-react"

const papers = [
  {
    title: "Machine Learning Approaches to Algorithmic Trading: A Comparative Study",
    journal: "Journal of Computational Finance",
    year: 2022,
    abstract:
      "This paper compares various machine learning approaches for algorithmic trading, evaluating their performance across different market conditions and asset classes.",
    keywords: ["Machine Learning", "Algorithmic Trading", "Financial Markets"],
    link: "https://example.com/paper1",
  },
  {
    title: "Quantum Computing Applications in Portfolio Optimization",
    journal: "Quantum Finance Review",
    year: 2021,
    abstract:
      "An exploration of how quantum computing algorithms can be applied to solve complex portfolio optimization problems more efficiently than classical approaches.",
    keywords: ["Quantum Computing", "Portfolio Optimization", "Financial Engineering"],
    link: "https://example.com/paper2",
  },
  {
    title: "Neural Networks for Volatility Forecasting in Cryptocurrency Markets",
    journal: "International Journal of Financial Engineering",
    year: 2020,
    abstract:
      "This research presents a novel approach to forecasting volatility in cryptocurrency markets using deep neural networks, demonstrating improved accuracy over traditional methods.",
    keywords: ["Neural Networks", "Volatility Forecasting", "Cryptocurrency"],
    link: "https://example.com/paper3",
  },
]

export default function ResearchSection() {
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
    <section id="research" className="py-20 section-dark-overlay" ref={sectionRef}>
      <h2 className="text-3xl font-bold mb-12 section-heading enhanced-heading">Research Papers</h2>

      <div className="space-y-6">
        {papers.map((paper, index) => (
          <Card
            key={paper.title}
            className="scroll-animation enhanced-card"
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <CardHeader>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <CardTitle className="text-xl enhanced-subheading">{paper.title}</CardTitle>
                <Badge variant="outline" className="border-purple-700/50 text-purple-200">
                  {paper.year}
                </Badge>
              </div>
              <p className="text-purple-400">{paper.journal}</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-purple-200">{paper.abstract}</p>
              <div className="flex flex-wrap gap-2">
                {paper.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-xs bg-purple-900/30 text-purple-200">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-purple-700 hover:bg-purple-600 text-white" asChild>
                <a href={paper.link} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" />
                  Read Paper
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
          <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">
            View All Publications
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>
    </section>
  )
}

