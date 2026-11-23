import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, BookOpen } from 'lucide-react'

// Authentic collegiate banner imagery for all programmes
import banner001 from '@/assets/Banners/Banner001.jpg'
import banner002 from '@/assets/Banners/Banner002.jpg'
import banner003 from '@/assets/Banners/Banner003.jpg'
import banner4 from '@/assets/Banners/banner4.jpg'
import banner5 from '@/assets/Banners/banner5.jpg'
import banner6 from '@/assets/Banners/banner6.jpg'
import banner7 from '@/assets/Banners/banner7.jpg'
import banner8 from '@/assets/Banners/banner8.jpg'
import aboutMemento from '@/assets/About/0008.jpeg'
import aboutDegree from '@/assets/About/0014.jpeg'
import aboutSpeech from '@/assets/About/0007-2.jpeg'

interface ProgrammeItem {
  id: number
  title: string
  stream: string
  level: string
  courses: string
  tagline: string
  image: string
  accentColor: string
}

const programmesList: ProgrammeItem[] = [
  {
    id: 1,
    title: 'B.Com. Computer Applications',
    stream: 'Commerce & Management',
    level: 'Undergraduate · 3 Years',
    courses: 'Accounting, Tally, Business Analytics, Web Development',
    tagline: 'Leading-edge commerce education integrating modern software and business systems.',
    image: banner003,
    accentColor: '#2563eb',
  },
  {
    id: 2,
    title: 'B.Sc. Computer Science',
    stream: 'Science & Technology',
    level: 'Undergraduate · 3 Years',
    courses: 'Data Structures, AI, Python, Database Systems',
    tagline: 'Cutting-edge software engineering, algorithms, and practical computing laboratories.',
    image: banner001,
    accentColor: '#059669',
  },
  {
    id: 3,
    title: 'B.B.A. Business Administration',
    stream: 'Management Studies',
    level: 'Undergraduate · 3 Years',
    courses: 'Marketing, Human Resource, Financial Planning, Operations',
    tagline: 'Cultivating leadership, executive decision-making, and entrepreneurial competencies.',
    image: banner6,
    accentColor: '#d97706',
  },
  {
    id: 4,
    title: 'B.A. Hindi Literature',
    stream: 'Arts & Humanities',
    level: 'Undergraduate · 3 Years',
    courses: 'Linguistics, Classical Literature, Translation, Creative Writing',
    tagline: 'Deep scholastic immersion in rich linguistic traditions and literary arts.',
    image: banner4,
    accentColor: '#db2777',
  },
  {
    id: 5,
    title: 'B.Voc. Software Development',
    stream: 'Vocational & IT',
    level: 'UGC Sponsored · 3 Years',
    courses: 'Full-Stack Development, Cloud Systems, UI/UX, Internships',
    tagline: 'Direct industry skill development with 100% applied internships and corporate placement.',
    image: banner5,
    accentColor: '#0891b2',
  },
  {
    id: 6,
    title: 'B.Com. (Honours / Regular)',
    stream: 'Commerce & Finance',
    level: 'Undergraduate · 3 Years',
    courses: 'Corporate Tax, Auditing, Financial Markets, Banking Law',
    tagline: 'Comprehensive grounding for CA, CMA, banking, and multinational financial roles.',
    image: banner7,
    accentColor: '#7c3aed',
  },
  {
    id: 7,
    title: 'B.Sc. Mathematics & Statistics',
    stream: 'Science & Data',
    level: 'Undergraduate · 3 Years',
    courses: 'Pure Mathematics, Statistical Inference, Numerical Analysis',
    tagline: 'Analytical rigour and mathematical foundation for tech, data science, and research.',
    image: banner8,
    accentColor: '#0d9488',
  },
  {
    id: 8,
    title: 'B.A. Mass Communication',
    stream: 'Arts & Media',
    level: 'Undergraduate · 3 Years',
    courses: 'Broadcast Journalism, Digital Media, PR, Video Production',
    tagline: 'Professional training in contemporary journalism, media ethics, and multimedia storytelling.',
    image: banner002,
    accentColor: '#ea580c',
  },
  {
    id: 9,
    title: 'M.Com. Master of Commerce',
    stream: 'Postgraduate Studies',
    level: 'Postgraduate · 2 Years',
    courses: 'Advanced Accounting, Strategic Finance, Corporate Governance',
    tagline: 'Autonomous university postgraduate syllabus with advanced research and industry seminars.',
    image: aboutMemento,
    accentColor: '#4f46e5',
  },
  {
    id: 10,
    title: 'M.Sc. Computer Science',
    stream: 'Postgraduate Studies',
    level: 'Postgraduate · 2 Years',
    courses: 'Machine Learning, Cloud Architecture, Advanced Algorithms',
    tagline: 'Postgraduate research and software engineering preparing tech leaders of tomorrow.',
    image: aboutDegree,
    accentColor: '#059669',
  },
  {
    id: 11,
    title: 'M.A. Hindi Language & Literature',
    stream: 'Postgraduate Studies',
    level: 'Postgraduate · 2 Years',
    courses: 'Hindi Poetics, Comparative Literature, Scholastic Research',
    tagline: 'Advanced research and post-graduate distinction in language, literature, and philology.',
    image: aboutSpeech,
    accentColor: '#c2410c',
  },
  {
    id: 12,
    title: 'M.B.A. Business Management',
    stream: 'M.C. Gupta College of Business',
    level: 'AICTE Approved · 2 Years',
    courses: 'Finance, Marketing, HR, Enterprise Strategy, Analytics',
    tagline: 'Prestigious business management curriculum with corporate tie-ups and campus drives.',
    image: banner002,
    accentColor: '#be123c',
  },
]

export default function ProgrammesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const totalCards = programmesList.length

  const goTo = useCallback((idx: number) => {
    setActiveIndex((idx + totalCards) % totalCards)
  }, [totalCards])

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  // Drag / swipe controls
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const diff = e.clientX - dragStartX.current
    if (Math.abs(diff) > 55) {
      if (diff > 0) prev()
      else next()
      dragStartX.current = e.clientX
    }
  }

  const handlePointerUp = () => setIsDragging(false)

  // Current active item
  const currentItem = programmesList[activeIndex]

  // Calculate arc geometry for each card relative to active card
  // This guarantees NO cards are ever upside down!
  const getCardStyle = (index: number) => {
    let diff = index - activeIndex
    // Circular wrap to shortest path: -6 to +6
    if (diff > totalCards / 2) diff -= totalCards
    if (diff < -totalCards / 2) diff += totalCards

    const absDiff = Math.abs(diff)

    // Hide any cards that curve beyond the visible 180° top arc
    if (absDiff > 3) {
      return {
        opacity: 0,
        pointerEvents: 'none' as const,
        transform: `translateX(${diff > 0 ? 550 : -550}px) translateY(140px) scale(0.6)`,
        zIndex: 0,
        visibility: 'hidden' as const,
      }
    }

    // Geometry along the circular arc
    // diff = 0 (center apex): x = 0, y = 0, rot = 0deg, scale = 1.05
    // diff = ±1: x = ±220px, y = 28px, rot = ±12deg, scale = 0.92
    // diff = ±2: x = ±400px, y = 78px, rot = ±24deg, scale = 0.8
    // diff = ±3: x = ±540px, y = 135px, rot = ±34deg, scale = 0.68
    const sign = diff < 0 ? -1 : 1
    const xPositions = [0, 220, 395, 540]
    const yPositions = [0, 28, 76, 132]
    const rotations = [0, 12, 23, 33]
    const scales = [1.06, 0.92, 0.8, 0.68]
    const opacities = [1, 0.85, 0.5, 0.2]
    const blurs = [0, 0.5, 2, 4]

    const x = sign * xPositions[absDiff]
    const y = yPositions[absDiff]
    const rot = sign * rotations[absDiff]
    const scale = scales[absDiff]
    const opacity = opacities[absDiff]
    const blur = blurs[absDiff]
    const zIndex = 30 - absDiff * 8

    return {
      transform: `translateX(calc(-50% + ${x}px)) translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      zIndex,
      visibility: 'visible' as const,
    }
  }

  return (
    <section
      id="programmes"
      className="relative w-full pt-8 sm:pt-10 pb-8 sm:pb-10 overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #fdf8f3 0%, #faf6f0 50%, #ffffff 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Anchor for nav links */}
      <div id="academics" className="absolute -top-24 pointer-events-none" />

      {/* Subtle light background ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-[#ea580c]/10 via-amber-500/5 to-transparent blur-3xl" />
        <div className="w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center">
        {/* Section Header with warm institutional palette */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 justify-center mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c]">
              WHAT WE OFFER
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1e1b4b] leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Find Your Programme
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2 max-w-xl mx-auto leading-relaxed">
            Autonomous curriculum across Commerce, Science, Arts &amp; Vocational streams.
            Rotate the cards or use arrows to discover every course.
          </p>
        </div>

        {/* Circular Wheel Stage */}
        <div className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center overflow-visible">
          {/* Card Wheel Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {programmesList.map((prog, index) => {
              const isActive = index === activeIndex
              const cardStyle = getCardStyle(index)

              return (
                <div
                  key={prog.id}
                  data-title={prog.title}
                  onClick={(e) => {
                    e.stopPropagation()
                    goTo(index)
                  }}
                  style={cardStyle}
                  className={`arc-card absolute top-2 left-1/2 cursor-pointer transition-all duration-500 ease-out ${isActive ? 'is-active' : ''
                    }`}
                  title={prog.title}
                >
                  {/* Card Body: Crisp White Theme with Shadow */}
                  <div
                    className={`w-[195px] sm:w-[220px] aspect-[4/5.4] relative rounded-2xl overflow-hidden bg-white shadow-xl transition-all duration-300 ${isActive
                      ? 'border-2 border-[#ea580c] shadow-2xl shadow-orange-950/20'
                      : 'border border-slate-200/90 hover:border-slate-300'
                      }`}
                  >
                    {/* Course Banner Image */}
                    <img
                      src={prog.image}
                      alt={prog.title}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/10" />

                    {/* Top Stream Pill */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 pointer-events-none">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm text-white"
                        style={{
                          backgroundColor: `${prog.accentColor}cc`,
                        }}
                      >
                        {prog.stream.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-bold font-mono text-white/80 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Bottom Card Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3.5 text-left pointer-events-none">
                      <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                        {prog.level.split('·')[0]}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5 drop-shadow-md line-clamp-2">
                        {prog.title}
                      </h3>
                      <p className="text-[10px] text-slate-200 font-medium line-clamp-1 mt-1 opacity-90">
                        {prog.courses}
                      </p>
                    </div>

                    {/* Active Highlight Glow */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-[inherit] ring-2 ring-[#ea580c] ring-offset-2 pointer-events-none" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Floating Left Arrow */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#ea580c] text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous programme"
            title="Previous programme"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Floating Right Arrow */}
          <button
            type="button"
            onClick={next}
            className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#ea580c] text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next programme"
            title="Next programme"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Active Programme Detail Spotlight Panel - Light Card */}
        <div className="relative z-30 mt-3 sm:mt-4 max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-orange-100 shadow-xl shadow-orange-950/5 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentItem.stream}</span>
          </div>

          <h3
            className="text-xl sm:text-2xl font-bold text-[#1e1b4b] tracking-tight leading-snug"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {currentItem.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg leading-relaxed">
            {currentItem.tagline}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span className="font-bold text-[#1e1b4b]">Curriculum Focus:</span>
            <span>{currentItem.courses}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-3.5 border-t border-slate-100 w-full">
            <a
              href="#admissions"
              className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for this Course</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#notices"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Syllabus &amp; Details</span>
            </a>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-1.5 mt-4">
            {programmesList.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer border-none p-0 ${i === activeIndex
                  ? 'w-6 h-2 bg-[#ea580c]'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                aria-label={`Go to programme ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
