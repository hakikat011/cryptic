"use client"

import { useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ExpandedCardProps {
  project: {
    title: string
    description: string
    longDescription?: string
    image: string
    characterImage?: string
    technologies: string[]
    repoLink: string
    demoLink: string
    category: string
    level: number
    type?: string
    features?: string[]
  }
  onClose: () => void
  isOpen: boolean
}

export default function SoloExpandedCard({ project, onClose, isOpen }: ExpandedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }, [onClose])
  
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, handleEscape, handleClickOutside])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-solo-gray-dark/90 rounded-xl w-full max-w-6xl overflow-hidden border border-solo-purple/30"
          >
            <div className="relative">
              {/* Character ID Card Section */}
              {project.characterImage && (
                <div className="absolute left-0 top-0 h-full w-[300px] bg-solo-purple/10 border-r border-solo-purple/30 z-20">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6"
                  >
                    <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={project.characterImage}
                        alt={`${project.title} character`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-2">
                      <Badge 
                        variant="outline" 
                        className="w-full justify-center border-solo-purple/50 text-solo-purple-light bg-black/50"
                      >
                        RANK {project.level}
                      </Badge>
                      <h3 className="text-xl font-bold text-solo-purple-light text-center">
                        {project.characterName || project.title}
                      </h3>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Main Content - Adjusted margin when character exists */}
              <div className={cn(
                "relative z-10 p-8",
                project.characterImage && "ml-[300px]"
              )}>
                <div className="grid grid-cols-1 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Badge 
                        variant="outline" 
                        className="border-solo-purple/50 text-solo-purple-light bg-black/50"
                      >
                        RANK {project.level}
                      </Badge>
                      {project.type && (
                        <Badge className="bg-solo-purple/30 text-white border-solo-purple/50">
                          {project.type}
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-3xl font-bold mb-4 solo-heading text-solo-purple-light">
                      {project.title}
                    </h2>

                    <div className="prose prose-invert max-w-none mb-6">
                      <p className="text-gray-300">{project.longDescription || project.description}</p>
                    </div>

                    {project.features && (
                      <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-xl font-semibold mb-3 solo-subheading text-solo-purple-light">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {project.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + index * 0.1 }}
                              className="flex items-start gap-2 text-gray-300"
                            >
                              <span className="text-solo-purple">•</span>
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    <motion.div 
                      className="flex flex-wrap gap-2 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.technologies.map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs bg-solo-blue-dark/50 text-solo-accent"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div 
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        variant="outline"
                        className="border-solo-purple/50 text-solo-purple-light hover:bg-solo-purple/10"
                        asChild
                      >
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button className="solo-button" asChild>
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
                    </motion.div>
                  </motion.div>

                  {/* Right Column - Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative h-[400px] rounded-xl overflow-hidden solo-glow-border"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-solo-black via-transparent to-transparent z-10" />
                    {project.characterImage ? (
                      <Image
                        src={project.characterImage}
                        alt={`${project.title} character`}
                        fill
                        className="object-contain z-0"
                      />
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover z-0"
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


