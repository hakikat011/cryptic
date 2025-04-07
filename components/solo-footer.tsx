"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react"
import gsap from "gsap"
import { useEffect, useRef } from "react"

export default function SoloFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for footer animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      })

      // Logo animation
      tl.fromTo(".footer-logo", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })

      // Copyright text animation
      tl.fromTo(".footer-copyright", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.6")

      // Social icons animation
      tl.fromTo(".footer-social", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.6")
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer
      ref={footerRef}
      className="border-t border-solo-purple/20 bg-solo-black/90 backdrop-blur-md relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 solo-grid-pattern opacity-10 z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-solo-purple/5 rounded-full blur-[100px] z-0"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="/"
              className="footer-logo text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-solo-purple-light to-solo-blue solo-heading"
            >
              HAKIKAT SINGH
            </Link>
            <p className="footer-copyright text-sm text-gray-400 mt-2">
              &copy; {new Date().getFullYear()} Hakikat Singh. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="footer-social text-solo-purple-light hover:text-solo-purple hover:bg-solo-purple/10"
              asChild
            >
              <a href="https://github.com/hakikat" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="footer-social text-solo-purple-light hover:text-solo-purple hover:bg-solo-purple/10"
              asChild
            >
              <a href="https://linkedin.com/in/hakikat" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="footer-social text-solo-purple-light hover:text-solo-purple hover:bg-solo-purple/10"
              asChild
            >
              <a href="https://twitter.com/hakikat" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="footer-social text-solo-purple-light hover:text-solo-purple hover:bg-solo-purple/10"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

