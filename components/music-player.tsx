"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, SkipForward, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const tracks = [
  {
    title: "Track 1",
    src: "/audio/track1.mp3",
  },
  {
    title: "Track 2",
    src: "/audio/track2.mp3",
  },
  {
    title: "Track 3",
    src: "/audio/track3.mp3",
  },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false) // Add this line to track playing state

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(tracks[currentTrackIndex].src)
    audioRef.current.loop = false
    audioRef.current.volume = 0.4
    audioRef.current.muted = isMuted

    // Add event listener for when the track ends
    const handleTrackEnd = () => {
      nextTrack()
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleTrackEnd)
    }

    // Show player after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("ended", handleTrackEnd)
      }
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    const playNewTrack = async () => {
      if (audioRef.current) {
        try {
          // Stop current track
          audioRef.current.pause()
          
          // Load new track
          audioRef.current.src = tracks[currentTrackIndex].src
          
          // Play new track if it was playing before
          if (isPlayingRef.current) {
            await audioRef.current.play()
          }
        } catch (error) {
          console.error("Error switching tracks:", error)
        }
      }
    }

    playNewTrack()
  }, [currentTrackIndex])

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause()
        } else {
          await audioRef.current.play()
        }
        isPlayingRef.current = !isPlaying // Update the ref
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error("Error toggling play state:", error)
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length)
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black/70 backdrop-blur-md p-2 rounded-full border border-purple-800/50 shadow-lg transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="text-xs text-purple-300 px-2 hidden sm:block">
        {tracks[currentTrackIndex].title}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-purple-300 hover:text-purple-100 hover:bg-purple-900/30"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-purple-300 hover:text-purple-100 hover:bg-purple-900/30"
        onClick={nextTrack}
      >
        <SkipForward size={16} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-purple-300 hover:text-purple-100 hover:bg-purple-900/30"
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>
    </div>
  )
}


