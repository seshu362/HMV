import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Users, Award, BookOpen, Briefcase, Sparkles } from 'lucide-react'
import convocationImg from '@/assets/About/0030.jpeg'

gsap.registerPlugin(ScrollTrigger)

interface StatItem {
  id: string
  label: string
  value: number
  suffix: string
  displayFormat?: (val: number) => string
  subtext: string
  tag: string
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
  accentBg: string
  accentText: string
  accentBorder: string
  featured?: boolean
}

const statsData: StatItem[] = [
  {
    id: 'legacy',
    label: 'Years of Academic Distinction',
    value: 60,
    suffix: '+',
    subtext: 'Pioneering higher education in Hyderabad with autonomous curriculum and academic excellence since 1965.',
    tag: 'Estd. 1965',
    icon: GraduationCap,
    accentBg: 'bg-orange-50',
    accentText: 'text-[#ea580c]',
    accentBorder: 'border-orange-200/80',
    featured: true,
  },
  {
    id: 'alumni',
    label: 'Global Alumni Network',
    value: 40000,
    suffix: '+',
    displayFormat: (v) => `${Math.floor(v / 1000)}K+`,
    subtext: 'Thriving leaders spanning Fortune 500 corporations, public administration, entrepreneurship, and global research.',
    tag: 'Worldwide',
    icon: Users,
    accentBg: 'bg-indigo-50',
    accentText: 'text-[#1e1b4b]',
    accentBorder: 'border-indigo-100',
  },
  {
    id: 'placements',
    label: 'Placement Support',
    value: 100,
    suffix: '%',
    subtext: 'Dedicated career development, interview masterclasses, and corporate placement drives with 50+ corporate recruiters.',
    tag: 'Career Ready',
    icon: Award,
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-700',
    accentBorder: 'border-emerald-100',
  },
  {
    id: 'departments',
    label: 'Autonomous Departments',
    value: 9,
    suffix: '',
    subtext: 'Specialized faculties across Computer Science, Artificial Intelligence, Commerce, Management, Arts & Vocational IT.',
    tag: 'Autonomous',
    icon: BookOpen,
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-700',
    accentBorder: 'border-blue-100',
  },
  {
    id: 'mentors',
    label: 'Industry Mentors & Leaders',
    value: 50,
    suffix: '+',
    subtext: 'Executive guest lectures, industrial visits, live project juries, and corporate skill-building workshops.',
    tag: 'Industry Tie-ups',
    icon: Briefcase,
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-700',
    accentBorder: 'border-rose-100',
  },
  {
    id: 'students',
    label: 'Active Student Scholars',
    value: 3900,
    suffix: '+',
    displayFormat: (v) => `${(v / 1000).toFixed(1)}K+`,
    subtext: 'Empowering future leaders through cutting-edge laboratories, active collegiate clubs, sports, and NCC/NSS vitality.',
    tag: 'Campus Vitality',
    icon: Sparkles,
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-700',
    accentBorder: 'border-amber-100',
  },
]

function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let frame: number
    const start = performance.now()
    const run = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(ease * target))
      if (p < 1) frame = requestAnimationFrame(run)
      else setCount(target)
    }
    frame = requestAnimationFrame(run)
    return () => cancelAnimationFrame(frame)
  }, [trigger, target, duration])
  return count
}

function ModernStatCard({
  stat,
  trigger,
}: {
  stat: StatItem
  trigger: boolean
}) {
  const count = useCountUp(stat.value, 1800, trigger)
  const Icon = stat.icon

  const displayValue = stat.displayFormat
    ? stat.displayFormat(count)
    : `${count}${stat.suffix}`

  return (
    <div
      className={`group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl transition-all duration-300 flex flex-col justify-between ${
        stat.featured
          ? 'bg-gradient-to-br from-orange-50/70 via-white to-white border-2 border-orange-200 shadow-[0_4px_24px_rgba(234,88,12,0.08)] hover:shadow-[0_16px_36px_rgba(234,88,12,0.18)] hover:-translate-y-1'
          : 'bg-white border border-slate-200/80 shadow-[0_2px_16px_rgba(30,27,75,0.03)] hover:shadow-[0_12px_32px_rgba(30,27,75,0.08)] hover:border-orange-200/60 hover:-translate-y-1'
      }`}
    >
      {/* Top row: Icon badge + Tag pill */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${stat.accentBg} ${stat.accentText}`}
          >
            <Icon size={22} strokeWidth={2.2} />
          </div>
          <span
            className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${stat.accentBg} ${stat.accentText} border ${stat.accentBorder}`}
          >
            {stat.tag}
          </span>
        </div>

        {/* Big Crisp Numeral */}
        <div
          className="font-serif font-black text-4xl sm:text-5xl text-[#1e1b4b] tracking-tight mt-5 mb-1.5 leading-none group-hover:text-[#ea580c] transition-colors duration-200"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          {displayValue}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#1e1b4b] tracking-tight">
          {stat.label}
        </h3>
      </div>

      {/* Subtext description */}
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-3 pt-3 border-t border-slate-100">
        {stat.subtext}
      </p>
    </div>
  )
}

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    // IntersectionObserver for count-up
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTriggered(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)

    // Parallax background
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => {
      obs.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="legacy"
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 50%, #ffffff 100%)',
        padding: 'clamp(2rem, 3.5vw, 2.75rem) clamp(1.25rem, 4vw, 2rem)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Soft Ambient Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(234,88,12,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Parallax archival background watermark */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage: `url(${convocationImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.04,
          zIndex: 0,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 justify-center mb-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/70 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#ea580c]">
              SIX DECADES OF EXCELLENCE
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1e1b4b] leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Decades of Impact,{' '}
            <span className="bg-gradient-to-r from-[#ea580c] to-[#f97316] bg-clip-text text-transparent">
              Measured in Thousands
            </span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            Celebrating sixty years of academic rigor, corporate employability, and community leadership under Osmania University.
          </p>
        </div>

        {/* Symmetrical 6-Card Bento Metrics Grid (3x2 on desktop, 2x3 on tablet, 1 col on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {statsData.map((stat) => (
            <ModernStatCard key={stat.id} stat={stat} trigger={triggered} />
          ))}
        </div>

        {/* Bottom Commemorative Trust Bar */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-orange-50/70 via-amber-50/40 to-orange-50/70 border border-orange-200/60 p-5 sm:p-6 text-center shadow-xs">
            <p
              className="text-slate-700 italic text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              &ldquo;Shaping minds, building careers, and inspiring generations since 1965.&rdquo;
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-bold tracking-wider uppercase text-slate-500">
              <span className="text-[#ea580c]">Hindi Mahavidyalaya</span>
              <span className="text-slate-300">•</span>
              <span>Estd. 1965</span>
              <span className="text-slate-300">•</span>
              <span>NAAC Accredited</span>
              <span className="text-slate-300">•</span>
              <span>Autonomous Institution</span>
              <span className="text-slate-300">•</span>
              <span>Affiliated to Osmania University</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
