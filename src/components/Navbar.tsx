import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '@/assets/logo.svg'
import {
  Search,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar
} from 'lucide-react'

interface NavbarProps {
  onSearch?: (query: string) => void
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [admissionsDropdown, setAdmissionsDropdown] = useState(false)
  const [academicsDropdown, setAcademicsDropdown] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.nav-link-anim', {
        y: -6,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
        delay: 0.1,
      })
      if (logoRef.current) {
        gsap.from(logoRef.current, {
          x: -15,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    }, navRef)
    return () => ctx.revert()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    setAdmissionsDropdown(false)
    setAcademicsDropdown(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) onSearch(searchQuery)
    const el = document.querySelector('#academics') || document.querySelector('#notices')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 left-0 w-full z-40 bg-white transition-all duration-200 select-none ${
        scrolled
          ? 'shadow-md border-b border-stone-200/90 py-2'
          : 'border-b border-stone-200/80 py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* 1. Official College Crest & Branding (exact match to Figma logo) */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center group flex-shrink-0"
          title="Hindi Mahavidyalaya Autonomous"
        >
          <img
            ref={logoRef}
            src={logo}
            alt="Hindi Mahavidyalaya - Autonomous & NAAC Re-Accredited"
            className="h-12 sm:h-14 md:h-[62px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
          />
        </a>

        {/* 2. Desktop Navigation Links (exact match to Figma design) */}
        <div className="hidden xl:flex items-center gap-4 lg:gap-5 whitespace-nowrap">
          {/* Home Pill */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="nav-link-anim px-5 py-2 rounded-full bg-[#fff4ed] text-[#ea580c] font-semibold text-sm transition-all hover:bg-[#ffe8db] whitespace-nowrap"
          >
            Home
          </a>

          {/* About us - strictly single line */}
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="nav-link-anim text-sm font-medium text-stone-700 hover:text-[#ea580c] transition-colors whitespace-nowrap py-2"
          >
            About us
          </a>

          {/* Admissions Dropdown - strictly single line */}
          <div
            className="relative"
            onMouseEnter={() => setAdmissionsDropdown(true)}
            onMouseLeave={() => setAdmissionsDropdown(false)}
          >
            <button
              onClick={() => setAdmissionsDropdown(!admissionsDropdown)}
              className="nav-link-anim flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-[#ea580c] transition-colors py-2 cursor-pointer whitespace-nowrap"
            >
              <span>Admissions</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 stroke-[2.2]" />
            </button>

            {admissionsDropdown && (
              <div className="absolute top-full left-0 w-64 pt-1 z-50 animate-fade-in">
                <div className="rounded-2xl bg-white border border-stone-200 p-2 shadow-xl space-y-1">
                  <a
                    href="#admissions"
                    onClick={(e) => handleNavClick(e, '#admissions')}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-stone-700 hover:text-[#ea580c] hover:bg-[#fff4ed] transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#ea580c]" />
                    <div>
                      <div className="font-semibold">Admissions 2026-27</div>
                      <div className="text-[10px] text-stone-400">Apply online for UG &amp; PG</div>
                    </div>
                  </a>
                  <a
                    href="#admissions"
                    onClick={(e) => handleNavClick(e, '#admissions')}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-stone-700 hover:text-[#ea580c] hover:bg-stone-50 transition-all"
                  >
                    <Calendar className="w-4 h-4 text-[#ea580c]" />
                    <div>
                      <div className="font-semibold">Dates &amp; Eligibility</div>
                      <div className="text-[10px] text-stone-400">Merit list &amp; fee details</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Academics Dropdown - strictly single line */}
          <div
            className="relative"
            onMouseEnter={() => setAcademicsDropdown(true)}
            onMouseLeave={() => setAcademicsDropdown(false)}
          >
            <button
              onClick={() => setAcademicsDropdown(!academicsDropdown)}
              className="nav-link-anim flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-[#ea580c] transition-colors py-2 cursor-pointer whitespace-nowrap"
            >
              <span>Academics</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 stroke-[2.2]" />
            </button>

            {academicsDropdown && (
              <div className="absolute top-full left-0 w-64 pt-1 z-50 animate-fade-in">
                <div className="rounded-2xl bg-white border border-stone-200 p-2 shadow-xl space-y-1">
                  <a
                    href="#academics"
                    onClick={(e) => handleNavClick(e, '#academics')}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-stone-700 hover:text-[#ea580c] hover:bg-[#fff4ed] transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-[#ea580c]" />
                    <div>
                      <div className="font-semibold">Undergraduate (UG)</div>
                      <div className="text-[10px] text-stone-400">B.A., B.Com, B.Sc., BBA, B.Voc</div>
                    </div>
                  </a>
                  <a
                    href="#academics"
                    onClick={(e) => handleNavClick(e, '#academics')}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-stone-700 hover:text-[#ea580c] hover:bg-stone-50 transition-all"
                  >
                    <GraduationCap className="w-4 h-4 text-[#ea580c]" />
                    <div>
                      <div className="font-semibold">Postgraduate (PG)</div>
                      <div className="text-[10px] text-stone-400">M.A. &amp; M.Com Courses</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Examinations - strictly single line */}
          <a
            href="#notices"
            onClick={(e) => handleNavClick(e, '#notices')}
            className="nav-link-anim text-sm font-medium text-stone-700 hover:text-[#ea580c] transition-colors whitespace-nowrap py-2"
          >
            Examinations
          </a>

          {/* Student life - strictly single line */}
          <a
            href="#our-student"
            onClick={(e) => handleNavClick(e, '#our-student')}
            className="nav-link-anim text-sm font-medium text-stone-700 hover:text-[#ea580c] transition-colors whitespace-nowrap py-2"
          >
            Student life
          </a>

          {/* Recruiters - strictly single line */}
          <a
            href="#our-recruiters"
            onClick={(e) => handleNavClick(e, '#our-recruiters')}
            className="nav-link-anim text-sm font-medium text-stone-700 hover:text-[#ea580c] transition-colors whitespace-nowrap py-2"
          >
            Recruiters
          </a>
        </div>

        {/* 3. Search Bar & Apply Now Button (exact match to Figma) */}
        <div className="flex items-center gap-3">
          {/* Search Box with Magnifying Glass */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:block w-48 lg:w-56 xl:w-64"
          >
            <input
              type="text"
              placeholder="Search notices, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#f3f4f6] hover:bg-[#eceef0] focus:bg-white border border-transparent focus:border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
          </form>

          {/* Apply Now Primary Button */}
          <a
            href="#admissions"
            onClick={(e) => handleNavClick(e, '#admissions')}
            className="px-6 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm tracking-wide shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center flex-shrink-0 cursor-pointer"
          >
            Apply Now
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Open Mobile Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 top-[115px] bg-white/98 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto animate-fade-in shadow-2xl">
          <div className="space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search notices, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#ea580c]"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            </form>

            <nav className="flex flex-col space-y-1 pt-2">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                className="px-4 py-3 rounded-xl text-base font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className="px-4 py-3 rounded-xl text-base font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                About us
              </a>
              <a
                href="#admissions"
                onClick={(e) => handleNavClick(e, '#admissions')}
                className="px-4 py-3 rounded-xl text-base font-semibold text-[#ea580c] hover:bg-orange-50 transition-colors flex items-center justify-between"
              >
                <span>Admissions 2026-27</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#ea580c]">Open</span>
              </a>
              <a
                href="#academics"
                onClick={(e) => handleNavClick(e, '#academics')}
                className="px-4 py-3 rounded-xl text-base font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                Academics (UG / PG)
              </a>
              <a
                href="#notices"
                onClick={(e) => handleNavClick(e, '#notices')}
                className="px-4 py-3 rounded-xl text-base font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                Examinations &amp; Notices
              </a>
              <a
                href="#our-student"
                onClick={(e) => handleNavClick(e, '#our-student')}
                className="px-4 py-3 rounded-xl text-base font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                Campus &amp; Student Life
              </a>
              <a
                href="#our-recruiters"
                onClick={(e) => handleNavClick(e, '#our-recruiters')}
                className="px-4 py-3 rounded-xl text-base font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                Our Recruiters &amp; Placements
              </a>
              <a
                href="#alumni-corner"
                onClick={(e) => handleNavClick(e, '#alumni-corner')}
                className="px-4 py-3 rounded-xl text-base font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                Alumni Corner
              </a>
            </nav>
          </div>

          <div className="pt-6 border-t border-stone-200 space-y-3">
            <a
              href="#admissions"
              onClick={(e) => handleNavClick(e, '#admissions')}
              className="w-full py-3.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-center block shadow-lg shadow-orange-500/25"
            >
              Apply Online Now
            </a>
            <p className="text-center text-xs text-stone-500">
              Hindi Mahavidyalaya · Nallakunta, Hyderabad
            </p>
          </div>
        </div>
      )}
    </nav>
  )
}
