"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element with correct path
    audioRef.current = new Audio("/audios/bgm-bg.mp3")
    audioRef.current.loop = true // Ensure looping is enabled
    audioRef.current.volume = 0.1 // Set volume to 20%

    // Add ended event listener as a backup for looping
    const handleEnded = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    }
    
    audioRef.current.addEventListener('ended', handleEnded)

    // Show player after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current.pause()
      }
      clearTimeout(timer)
    }
  }, [])

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause()
        } else {
          await audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error("Error toggling audio:", error)
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 bg-black/70 backdrop-blur-md p-2 rounded-full border border-purple-800/50 shadow-lg transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-purple-300 hover:text-purple-100 hover:bg-purple-900/30"
        onClick={togglePlay}
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </Button>
    </div>
  )
}

