import { useState, useEffect } from 'react'
import {
  Volume2,
  Pause,
  Play,
  Phone,
  Mail,
  ChevronDown,
  User,
  Globe
} from 'lucide-react'

const announcements = [
  { id: 1, tag: 'New', text: 'Admissions for 2026-27 are open. Apply online today!', link: '#admissions' },
  { id: 2, tag: 'Notice', text: 'UG and PG Convocation 2026 registration portal is now live.', link: '#notices' },
  { id: 3, tag: 'Results', text: 'B.A., B.Voc, BBA, B.Com, and B.Sc semester examination results announced (April 2026).', link: '#notices' },
  { id: 4, tag: 'Academic', text: 'Osmania University autonomous syllabus revision committee meeting schedule.', link: '#academics' },
]

export default function TopHeader() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [fontSize, setFontSize] = useState<'normal' | 'small' | 'large'>('normal')
  const [lang, setLang] = useState<'EN' | 'HI'>('EN')
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused])

  const adjustFontSize = (size: 'small' | 'normal' | 'large') => {
    setFontSize(size)
    const root = document.documentElement
    if (size === 'small') root.style.fontSize = '14px'
    if (size === 'normal') root.style.fontSize = '16px'
    if (size === 'large') root.style.fontSize = '18px'
  }

  return (
    <div className="w-full text-xs font-sans border-b border-white/[0.08] relative z-40 select-none">
      {/* 1. Top Announcement Marquee Bar (Red/Crimson/Amber Gradient) */}
      <div className="bg-gradient-to-r from-[#9b2c16] via-[#ba3b1f] to-[#7f1d1d] text-white px-3 sm:px-6 py-2 flex items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="p-1 rounded-md bg-white/10 flex items-center justify-center">
            <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </span>
          <span className="font-bold tracking-wider uppercase text-[11px] text-amber-200 hidden sm:inline">
            Announcements
          </span>
        </div>

        {/* Dynamic ticker */}
        <div className="flex-1 overflow-hidden h-5 flex items-center">
          <div className="flex items-center gap-2 transition-all duration-500 ease-out">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-400 text-stone-950 tracking-wider">
              {announcements[currentIdx].tag}
            </span>
            <a
              href={announcements[currentIdx].link}
              className="text-xs font-medium text-white/95 hover:text-amber-200 truncate transition-colors underline-offset-2 hover:underline"
            >
              {announcements[currentIdx].text}
            </a>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="#notices"
            className="text-[11px] font-semibold text-amber-200 hover:text-white px-2 py-0.5 rounded bg-black/20 hover:bg-black/30 transition-all hidden md:inline-block"
          >
            View All
          </a>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded hover:bg-white/15 text-white/80 hover:text-white transition-colors"
            title={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* 2. Secondary Institutional Bar (Deep Violet/Navy matching authentic college palette) */}
      <div className="bg-[#1a0f30] text-white/80 px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-y-1 text-[11px] border-b border-white/[0.04]">
        {/* Contact info */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+914027616330"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span className="font-mono font-medium">+91 40 2761 6330</span>
          </a>
          <span className="text-white/20 hidden sm:inline">|</span>
          <a
            href="mailto:principal@college.hindimahavidyalaya.ac.in"
            className="hidden md:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Mail className="w-3 h-3 text-amber-400" />
            <span className="font-mono truncate max-w-xs">principal@college.hindimahavidyalaya.ac.in</span>
          </a>
        </div>

        {/* Accessibility, Accreditations & Logins */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Font Resizers */}
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            <button
              onClick={() => adjustFontSize('small')}
              className={`px-1 hover:text-white font-mono text-[10px] ${fontSize === 'small' ? 'text-amber-400 font-bold' : 'text-white/60'}`}
              title="Smaller font"
            >
              A-
            </button>
            <button
              onClick={() => adjustFontSize('normal')}
              className={`px-1 hover:text-white font-mono text-[10px] ${fontSize === 'normal' ? 'text-amber-400 font-bold' : 'text-white/60'}`}
              title="Normal font"
            >
              A
            </button>
            <button
              onClick={() => adjustFontSize('large')}
              className={`px-1 hover:text-white font-mono text-[10px] ${fontSize === 'large' ? 'text-amber-400 font-bold' : 'text-white/60'}`}
              title="Larger font"
            >
              A+
            </button>
          </div>

          {/* Hindi / English toggle */}
          <button
            onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 font-medium transition-colors"
          >
            <Globe className="w-3 h-3" />
            <span>{lang === 'EN' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Accreditations */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-semibold tracking-wider text-white/70">
            <a href="https://swayam.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors">SWAYAM</a>
            <span className="text-white/20">·</span>
            <a href="#about" className="hover:text-amber-300 transition-colors">NAAC</a>
            <span className="text-white/20">·</span>
            <a href="#about" className="hover:text-amber-300 transition-colors">UGC</a>
            <span className="text-white/20">·</span>
            <a href="#about" className="hover:text-amber-300 transition-colors">NIRF</a>
          </div>

          {/* Logins Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-all text-[11px]"
            >
              <User className="w-3 h-3 text-amber-300" />
              <span>Logins</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${loginOpen ? 'rotate-180' : ''}`} />
            </button>

            {loginOpen && (
              <div
                className="absolute right-0 mt-1 w-44 rounded-xl bg-[#1a0f30] border border-white/15 shadow-2xl p-1.5 space-y-1 z-50 animate-fade-in"
                onMouseLeave={() => setLoginOpen(false)}
              >
                <a
                  href="#admissions"
                  onClick={() => setLoginOpen(false)}
                  className="block px-3 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 text-xs transition-colors"
                >
                  Student Portal
                </a>
                <a
                  href="#admissions"
                  onClick={() => setLoginOpen(false)}
                  className="block px-3 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 text-xs transition-colors"
                >
                  Faculty &amp; Staff Login
                </a>
                <a
                  href="#admissions"
                  onClick={() => setLoginOpen(false)}
                  className="block px-3 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 text-xs transition-colors"
                >
                  Examination Controller
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

