import SoloHero from "@/components/solo-hero"
import SoloAboutSection from "@/components/solo-about-section"
import SoloExperienceSection from "@/components/solo-experience-section"
import SoloProjectsSection from "@/components/solo-projects-section"
import ResearchSection from "@/components/research-section"
import ContactSection from "@/components/contact-section"
import SoloSmoothScroll from "@/components/solo-smooth-scroll"
import SoloFeaturedSection from "@/components/solo-featured-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen solo-theme">
      <SoloSmoothScroll />
      <SoloHero />
      <div className="container mx-auto px-4 py-8">
        <SoloAboutSection />
        <SoloFeaturedSection />
        <SoloExperienceSection />
        <SoloProjectsSection />
        <ResearchSection />
        <ContactSection />
      </div>
    </div>
  )
}

