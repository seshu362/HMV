import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import logo from '@/assets/logo.svg'

interface NavItem {
  label: string
  href: string
  dropdown?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#hero' },
  {
    label: 'About',
    href: '#about',
    dropdown: [
      { label: 'About HMV', href: '#about' },
      { label: 'Vision & Mission', href: '#about' },
      { label: 'Principal\'s Message', href: '#about' },
      { label: 'Governance', href: '#about' },
    ],
  },
  {
    label: 'Academics',
    href: '#programmes',
    dropdown: [
      { label: 'UG Programmes', href: '#programmes' },
      { label: 'PG Programmes', href: '#programmes' },
      { label: 'Autonomous Syllabus', href: '#programmes' },
      { label: 'Examination', href: '#programmes' },
    ],
  },
  {
    label: 'Admissions',
    href: '#admissions',
    dropdown: [
      { label: 'How to Apply', href: '#admissions' },
      { label: 'Eligibility', href: '#admissions' },
      { label: 'Fee Structure', href: '#admissions' },
      { label: 'Scholarships', href: '#admissions' },
    ],
  },
  { label: 'Notices', href: '#notices' },
  {
    label: 'Campus',
    href: '#campus-gallery',
    dropdown: [
      { label: 'Campus Gallery', href: '#campus-gallery' },
      { label: 'Facilities', href: '#campus-gallery' },
      { label: 'Library', href: '#campus-gallery' },
    ],
  },
  { label: 'Contact', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('hero')
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sections = ['hero', 'about', 'programmes', 'notices', 'our-student', 'our-recruiters', 'admissions', 'campus-gallery', 'footer']
    const observers: IntersectionObserver[] = []
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Close mobile on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(label)
  }
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const isActive = (item: NavItem) => {
    const sectionId = item.href.replace('#', '')
    return activeSection === sectionId || item.dropdown?.some(d => d.href.replace('#', '') === activeSection)
  }

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
    setActiveDropdown(null)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 left-0 right-0 w-full z-[900] transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-slate-100'
            : 'bg-white shadow-xs border-b border-slate-100/80'
        }`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className="flex items-center flex-shrink-0 group cursor-pointer bg-transparent border-none p-0"
              style={{ textDecoration: 'none' }}
            >
              <img src={logo} alt="HMV Logo" className="h-12 w-auto" />
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                  onMouseLeave={() => item.dropdown && handleDropdownLeave()}
                >
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer border-none ${
                      isActive(item)
                        ? 'text-[#ea580c] bg-orange-50'
                        : 'text-slate-700 hover:text-[#ea580c] hover:bg-orange-50/60'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  {item.dropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: '50%',
                        minWidth: '210px',
                        background: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(226,232,240,0.8)',
                        padding: '6px',
                        zIndex: 100,
                        transition: 'opacity 0.2s, transform 0.2s',
                        opacity: activeDropdown === item.label ? 1 : 0,
                        transform: activeDropdown === item.label
                          ? 'translateX(-50%) translateY(0)'
                          : 'translateX(-50%) translateY(-8px)',
                        pointerEvents: activeDropdown === item.label ? 'all' : 'none',
                        clipPath: activeDropdown === item.label
                          ? 'inset(0 0 0 0 round 12px)'
                          : 'inset(0 0 100% 0 round 12px)',
                      }}
                    >
                      {item.dropdown.map(sub => (
                        <button
                          key={sub.label}
                          onClick={() => scrollTo(sub.href)}
                          className="w-full text-left flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 hover:text-[#ea580c] hover:bg-orange-50 rounded-lg transition-colors font-medium cursor-pointer border-none bg-transparent"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <ChevronRight size={12} className="text-[#ea580c] opacity-70 flex-shrink-0" />
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <button
                onClick={() => scrollTo('#admissions')}
                className="ml-3 btn-primary"
                style={{ padding: '0.55rem 1.3rem', fontSize: '0.8rem' }}
              >
                Apply Now
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#ea580c] hover:bg-orange-50 transition-colors border-none bg-transparent cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-[850] lg:hidden transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
        }}
      />

      {/* Mobile Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[900] lg:hidden"
        style={{
          width: 'min(85vw, 360px)',
          background: '#fff',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.15)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.25rem 1rem',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="HMV Logo" style={{ height: '36px', width: 'auto' }} />
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '0.9rem', color: '#fff', lineHeight: 1.1 }}>
                Hindi Mahavidyalaya
              </div>
              <div style={{ fontSize: '0.57rem', fontWeight: 600, letterSpacing: '0.1em', color: '#ea580c', textTransform: 'uppercase' }}>
                Estd. 1965
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '6px', color: '#fff', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Nav Items */}
        <div style={{ flex: 1, padding: '0.75rem 0.75rem', overflowY: 'auto' }}>
          {navItems.map(item => (
            <div key={item.label}>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    if (!item.dropdown) scrollTo(item.href)
                    else setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                  }}
                  className={`flex-1 flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all border-none cursor-pointer ${
                    isActive(item) ? 'text-[#ea580c] bg-orange-50' : 'text-slate-700 bg-transparent hover:bg-slate-50'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                      style={{ color: '#ea580c' }}
                    />
                  )}
                </button>
              </div>

              {/* Mobile Sub-menu */}
              {item.dropdown && (
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: mobileExpanded === item.label ? '400px' : '0',
                    transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div style={{ paddingLeft: '1rem', paddingBottom: '0.25rem' }}>
                    {item.dropdown.map(sub => (
                      <button
                        key={sub.label}
                        onClick={() => scrollTo(sub.href)}
                        className="w-full text-left flex items-center gap-2 px-3 py-2.5 text-sm text-slate-500 hover:text-[#ea580c] hover:bg-orange-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <ChevronRight size={11} style={{ color: '#ea580c', flexShrink: 0 }} />
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Drawer CTA */}
        <div style={{ padding: '1rem 1.25rem 1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={() => scrollTo('#admissions')}
            className="btn-primary w-full justify-center"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Apply for 2026-27
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.75rem' }}>
            Admissions closing soon · Merit-based selection
          </p>
        </div>
      </div>
    </>
  )
}
