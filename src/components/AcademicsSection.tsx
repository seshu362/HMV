import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const programmes = [
  {
    title: 'Bachelor of Arts',
    code: 'B.A.',
    subjects: 'Hindi, English, Economics, Political Science, History, Public Administration',
    duration: '3 Years',
    icon: '📚',
  },
  {
    title: 'Bachelor of Commerce',
    code: 'B.Com.',
    subjects: 'General, Computers, Honours',
    duration: '3 Years',
    icon: '📊',
  },
  {
    title: 'Bachelor of Science',
    code: 'B.Sc.',
    subjects: 'Mathematics, Statistics, Computer Science, Electronics, Chemistry, Biotechnology',
    duration: '3 Years',
    icon: '🔬',
  },
  {
    title: 'B.Voc. Programmes',
    code: 'B.Voc.',
    subjects: 'Web Technologies, Software Development',
    duration: '3 Years',
    icon: '💻',
  },
  {
    title: 'BBA',
    code: 'B.B.A.',
    subjects: 'Business Administration & Management',
    duration: '3 Years',
    icon: '🏢',
  },
  {
    title: 'Post Graduate',
    code: 'M.A. / M.Com.',
    subjects: 'Hindi, Commerce, Economics, Political Science',
    duration: '2 Years',
    icon: '🎓',
  },
]

export default function AcademicsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.acad-heading', {
        scrollTrigger: {
          trigger: '.acad-heading',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.prog-card', {
        scrollTrigger: {
          trigger: '.prog-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="academics" ref={sectionRef} className="relative py-24 sm:py-32 lg:py-40">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(194,97,47,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#c2612f] font-medium">
            Programmes Offered
          </span>
          <h2
            className="acad-heading mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shaping Careers with
            <span className="text-gradient-warm"> Diverse Learning</span>
          </h2>
        </div>

        {/* Programme Cards */}
        <div className="prog-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {programmes.map((prog) => (
            <div
              key={prog.code}
              className="prog-card group relative p-6 sm:p-8 rounded-2xl glass hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#c2612f]/20 transition-all duration-500 cursor-default"
            >
              {/* Icon */}
              <span className="text-3xl sm:text-4xl mb-4 block">{prog.icon}</span>

              {/* Code badge */}
              <span className="inline-block mb-3 px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#c2612f] bg-[#c2612f]/10 rounded-full border border-[#c2612f]/15">
                {prog.code} · {prog.duration}
              </span>

              {/* Title */}
              <h3
                className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-[#e8a87c] transition-colors"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {prog.title}
              </h3>

              {/* Subjects */}
              <p className="text-xs sm:text-sm text-white/40 leading-relaxed">{prog.subjects}</p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c2612f] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
