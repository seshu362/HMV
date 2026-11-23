import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, BookOpen, Shield, Users } from 'lucide-react'
import banner001 from '@/assets/Banners/Banner001.jpg'
import about1 from '@/assets/About/0002.jpeg'
import about2 from '@/assets/About/0006.jpeg'

gsap.registerPlugin(ScrollTrigger)

const facts = [
  { icon: BookOpen, value: '60+', label: 'Years of Legacy' },
  { icon: Users, value: '40,000+', label: 'Alumni Worldwide' },
  { icon: Shield, value: 'NAAC', label: 'Accredited' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text slides in from left
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // Image reveals with clip-path
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.inOut',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // Facts stagger
      gsap.fromTo(
        factsRef.current?.children ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: 'var(--brand-cream, #fdf8f3)',
        padding: 'clamp(2rem, 3.5vw, 2.75rem) clamp(1.25rem, 4vw, 2rem)',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center',
          }}
        >
          {/* LEFT — Text Content */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <div className="section-label" style={{ marginBottom: '1.25rem' }}>
              About the Institution
            </div>

            <h2
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--brand-navy, #1e1b4b)',
                marginBottom: '1.5rem',
              }}
            >
              A Legacy Built on
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Trust & Excellence
              </span>
            </h2>

            <p
              style={{
                color: '#475569',
                fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                lineHeight: 1.75,
                marginBottom: '1.1rem',
              }}
            >
              Hindi Mahavidyalaya (HMV) has been a cornerstone of higher education in Hyderabad
              since 1965. Affiliated to Osmania University and accredited by NAAC, HMV offers a
              rich academic ecosystem that blends traditional values with contemporary pedagogy.
            </p>

            <p
              style={{
                color: '#475569',
                fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                lineHeight: 1.75,
                marginBottom: '2rem',
              }}
            >
              Our institution stands as a beacon for aspiring students seeking quality education
              with practical industry orientation. With an autonomous syllabus and expert faculty,
              we prepare graduates who lead organizations, drive innovation, and shape communities.
            </p>

            {/* Key Facts */}
            <div
              ref={factsRef}
              style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}
            >
              {facts.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: '#fff',
                    border: '1.5px solid rgba(234,88,12,0.12)',
                    borderRadius: '12px',
                    padding: '0.85rem 1.1rem',
                    minWidth: '130px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(234,88,12,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color="#ea580c" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.3rem', color: '#1e1b4b', lineHeight: 1 }}>
                      {value}
                    </div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo('#programmes')}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              Explore Programmes
              <ArrowRight size={15} />
            </button>
          </div>

          {/* RIGHT — Image Showcase */}
          <div ref={imgRef} style={{ opacity: 0 }} className="relative w-full">
            {/* Main Image Card Container */}
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white"
              style={{
                boxShadow: '0 25px 60px -15px rgba(30, 27, 75, 0.18)',
              }}
            >
              {/* Main Entrance Image */}
              <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={banner001}
                  alt="Hindi Mahavidyalaya Main Campus Entrance"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle gradient vignette at bottom for readability of badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10 pointer-events-none" />

                {/* Top-Right Badge: NAAC Accredited */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/90 backdrop-blur-md text-[#1e1b4b] px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/60 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse" />
                  <span>NAAC Accredited Campus</span>
                </div>

                {/* Top-Left Badge: Founded 1965 */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-[#1e1b4b]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/20 flex items-center gap-1.5 shadow-lg">
                  <span className="text-[#f97316]">Estd.</span>
                  <span>1965</span>
                </div>

                {/* Bottom Overlay: Institutional Milestone Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex flex-col items-center justify-center text-white font-extrabold flex-shrink-0 shadow-md shadow-orange-600/30">
                      <span className="text-base leading-none">60+</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90">Years</span>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#1e1b4b] leading-tight">
                        Diamond Jubilee Legacy
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Arts, Commerce, Science &amp; Management Campus
                      </p>
                    </div>
                  </div>

                  {/* Supporting authentic photo avatars */}
                  <div className="hidden sm:flex items-center -space-x-2.5 flex-shrink-0">
                    <img
                      src={about1}
                      alt="Academic Procession"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <img
                      src={about2}
                      alt="Campus Traditions"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
