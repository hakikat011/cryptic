"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Github, Linkedin, Twitter, FileText } from "lucide-react"
import VideoBackground from "./video-background"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Anime Video Background */}
      <VideoBackground videoSrc="/videos/anime-background.mp4" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-12 section-heading enhanced-heading">Get In Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="enhanced-card bg-black/70 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl enhanced-subheading">Send a Message</CardTitle>
              <CardDescription className="text-purple-200">
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-purple-200">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-purple-900/20 border-purple-700/30 text-purple-100 placeholder:text-purple-400/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-purple-200">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="bg-purple-900/20 border-purple-700/30 text-purple-100 placeholder:text-purple-400/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-purple-200">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={5}
                    required
                    className="bg-purple-900/20 border-purple-700/30 text-purple-100 placeholder:text-purple-400/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {isSubmitted && (
                  <div className="p-3 bg-purple-500/20 border border-purple-500/50 rounded-md text-center text-purple-100">
                    Message sent successfully!
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 backdrop-blur-sm p-6 rounded-lg border border-purple-800/20 bg-black/50">
            <div>
              <h3 className="text-xl font-semibold mb-4 enhanced-subheading">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-purple-400" />
                  <a href="mailto:your.email@example.com" className="hover:underline text-purple-200">
                    your.email@example.com
                  </a>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-3 text-purple-400" />
                  <span className="text-purple-200">Available for freelance and full-time opportunities</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 enhanced-subheading">Connect With Me</h3>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-700 text-purple-400 hover:bg-purple-900/30 hover:text-purple-200"
                  asChild
                >
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-700 text-purple-400 hover:bg-purple-900/30 hover:text-purple-200"
                  asChild
                >
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-700 text-purple-400 hover:bg-purple-900/30 hover:text-purple-200"
                  asChild
                >
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 enhanced-subheading">Resume</h3>
              <p className="mb-4 text-purple-200">
                Download my resume to learn more about my education, work experience, and skills.
              </p>
              <Button className="bg-purple-700 hover:bg-purple-600 text-white" asChild>
                <a href="/resume.pdf" download>
                  <FileText className="h-4 w-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

