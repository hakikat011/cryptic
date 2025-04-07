"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import SplitType from "split-type"
import Lenis from "@studio-freight/lenis"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

// Initialize smooth scrolling
export const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenis
}

// Text reveal animation using split-type instead of SplitText
export const revealText = (element: string, delay = 0) => {
  const splitText = new SplitType(element, { types: ["chars", "words", "lines"] })

  gsap.from(splitText.chars || [], {
    opacity: 0,
    y: 20,
    rotationX: -90,
    stagger: 0.02,
    duration: 1,
    ease: "power4.out",
    delay,
  })

  return splitText
}

// Image reveal animation
export const revealImage = (element: string, delay = 0) => {
  gsap.to(element, {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    duration: 1.5,
    ease: "power4.inOut",
    delay,
  })
}

// Card reveal animation
export const revealCard = (element: string, delay = 0) => {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay,
  })
}

// Parallax effect
export const createParallax = (element: string, speed = 0.5) => {
  gsap.to(element, {
    y: () => `${speed * 100}%`,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })
}

// Shadow soldier animation
export const animateShadowSoldier = (element: string) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })

  tl.from(element, {
    opacity: 0,
    scale: 0.8,
    filter: "grayscale(100%) brightness(0%)",
    duration: 1.5,
    ease: "power3.out",
  })

  return tl
}

// Status window animation
export const animateStatusWindow = (element: string, stats: string) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })

  tl.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
  })

  tl.from(
    stats,
    {
      width: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.inOut",
    },
    "-=0.4",
  )

  return tl
}

// Notification animation
export const showNotification = (element: string, autoHide = true) => {
  const tl = gsap.timeline()

  tl.to(element, {
    x: 0,
    duration: 0.5,
    ease: "power3.out",
  })

  if (autoHide) {
    tl.to(element, {
      x: "100%",
      duration: 0.5,
      ease: "power3.in",
      delay: 3,
    })
  }

  return tl
}

// Custom cursor animation
export const initCustomCursor = () => {
  const cursor = document.querySelector(".solo-cursor")
  const follower = document.querySelector(".solo-cursor-follower")

  if (!cursor || !follower) return

  gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 })

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power1.out",
    })

    gsap.to(follower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: "power3.out",
    })
  })
}

// Leveling up animation
export const levelUpAnimation = (element: string) => {
  const tl = gsap.timeline()

  tl.to(element, {
    scale: 1.2,
    boxShadow: "0 0 30px rgba(151, 71, 255, 0.8)",
    duration: 0.5,
    ease: "power2.out",
  })

  tl.to(element, {
    scale: 1,
    boxShadow: "0 0 15px rgba(151, 71, 255, 0.5)",
    duration: 0.5,
    ease: "elastic.out(1, 0.3)",
  })

  return tl
}

// Hook for using GSAP animations
export const useGSAPAnimation = (animationFunc: Function, dependencies: any[] = []) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current) {
      const animation = animationFunc(elementRef.current)

      return () => {
        if (animation && animation.kill) {
          animation.kill()
        }
      }
    }
  }, dependencies)

  return elementRef
}

