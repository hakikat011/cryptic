"use client"

import { useEffect, useState } from "react"
import { initCustomCursor } from "@/lib/gsap-utils"

export default function SoloCursor() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    initCustomCursor()
  }, [])

  if (!mounted) return null

  return (
    <>
      <div className="solo-cursor"></div>
      <div className="solo-cursor-follower"></div>
    </>
  )
}

