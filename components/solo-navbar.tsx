"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText, Github, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import gsap from "gsap"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
]

export default function SoloNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)

    // Animate navbar items on load
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(".nav-logo", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })

    tl.fromTo(".nav-item", { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.5")

    tl.fromTo(".nav-social", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5 }, "-=0.5")

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-solo-black/80 backdrop-blur-md border-b border-solo-purple/20" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="nav-logo text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-solo-purple-light to-solo-blue solo-heading animate-text-flicker"
          >
            HAKIKAT SINGH
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-item text-sm font-medium text-gray-300 hover:text-solo-purple-light transition-colors solo-subheading`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="nav-social border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
                asChild
              >
                <a href="https://github.com/hakikat" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="nav-social border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
                asChild
              >
                <a
                  href="https://linkedin.com/in/hakikat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button className="nav-social solo-button" asChild>
                <a href="/resume.pdf" download>
                  <FileText className="h-4 w-4 mr-2" />
                  Resume
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-solo-purple-light"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-solo-black/90 backdrop-blur-md border-b border-solo-purple/20">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-solo-purple-light transition-colors solo-subheading"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-3 pt-4">
              <Button
                variant="outline"
                size="icon"
                className="border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
                asChild
              >
                <a href="https://github.com/hakikat" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
                asChild
              >
                <a
                  href="https://linkedin.com/in/hakikat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button className="solo-button" asChild>
                <a href="/resume.pdf" download>
                  <FileText className="h-4 w-4 mr-2" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

