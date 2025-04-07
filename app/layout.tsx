import type React from "react"
import type { Metadata } from "next"
import { Rajdhani, Barlow } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SoloNavbar from "@/components/solo-navbar"
import SoloFooter from "@/components/solo-footer"
import SoloCursor from "@/components/solo-cursor"

// Font definitions
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
})

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Solo Leveling Portfolio | Developer & Researcher",
  description:
    "Professional portfolio with Solo Leveling theme showcasing coding skills, experience, and research projects",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.variable} ${barlow.variable} bg-solo-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SoloNavbar />
            <main className="flex-1">{children}</main>
            <SoloFooter />
            <SoloCursor />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'