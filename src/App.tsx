import { useEffect } from 'react'
import Lenis from 'lenis'
import TopHeader from './components/TopHeader'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import LegacySection from './components/LegacySection'
import ProgrammesSection from './components/ProgrammesSection'
import NewsEventsSection from './components/NewsEventsSection'
import NoticesSection from './components/NoticesSection'
import PromiseSection from './components/PromiseSection'
import AchievementsSection from './components/AchievementsSection'
import OurStudent from './components/OurStudent'
import RecruitersSection from './components/RecruitersSection'
import AlumniCorner from './components/AlumniCorner'
import CampusGallery from './components/CampusGallery'
import AdmissionsSection from './components/AdmissionsSection'
import FooterSection from './components/FooterSection'



export default function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    let animationFrameId: number

    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-white text-[#111827] flex flex-col font-sans antialiased overflow-x-hidden selection:bg-[#ea580c]/20 selection:text-[#ea580c]">
      {/* 1. Official Announcement Ticker & Accreditation Bar */}
      <TopHeader />

      {/* 2. Main Navigation with Official Crest & Search */}
      <Navbar />

      {/* 3. Main Sections */}
      <main className="flex-1 w-full">
        {/* Hero Photographic Carousel with Staggered Transition */}
        <HeroSection />

        {/* About Us Section with Card Swiper */}
        <AboutSection />

        {/* Six Decades of Shaping Learners Legacy & Stats Section */}
        <LegacySection />

        {/* What We Give: Find Your Programme Arc Deck Section */}
        <ProgrammesSection />

        {/* News & Events Section: 3D Stacked Deck */}
        <NewsEventsSection />

        {/* Latest Notices Section with Interactive Tabs & Search Filter */}
        <NoticesSection />

        {/* Our Promise: Why Hindi Mahavidyalaya 3D Perspective Coverflow Carousel */}
        <PromiseSection />

        {/* Our Achievements: 3D Orbit Carousel with Floor Reflection */}
        <AchievementsSection />

        {/* Our Student: 3D Interactive Magazine Publication */}
        <OurStudent />

        {/* Our Recruiters: Corporate Placement Ecosystem & Spotlight */}
        <RecruitersSection />

        {/* Alumni Corner: 3D Interactive Magazine Publication */}
        <AlumniCorner />

        {/* Life on Campus: 3D Sphere Interactive Photo Gallery */}
        <CampusGallery />

        {/* Admissions Portal: 4-Step Process & Online Application Form */}
        <AdmissionsSection />
      </main>

      {/* 4. Official Collegiate Footer */}
      <FooterSection />
    </div>
  )
}
