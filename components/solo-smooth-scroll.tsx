"use client"

import { useEffect } from "react"
import { initSmoothScroll } from "@/lib/gsap-utils"

export default function SoloSmoothScroll() {
  useEffect(() => {
    const lenis = initSmoothScroll()

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}

