import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight, ArrowRight, GraduationCap, Award, Users } from 'lucide-react'
import ParticleField from './ParticleField'

// Images
import banner001 from '@/assets/Banners/Banner001.jpg'
import banner002 from '@/assets/Banners/Banner002.jpg'
import banner003 from '@/assets/Banners/Banner003.jpg'
import banner4 from '@/assets/Banners/banner4.jpg'
import banner5 from '@/assets/Banners/banner5.jpg'
import banner6 from '@/assets/Banners/banner6.jpg'
import banner7 from '@/assets/Banners/banner7.jpg'
import banner8 from '@/assets/Banners/banner8.jpg'

interface Slide {
  img: string
  badge: string
  headline: string[]
  tagline: string
  cta: string
  ctaHref: string
  lazy?: boolean
}

const slides: Slide[] = [
  {
    img: banner001,
    badge: 'Autonomous · NAAC Accredited',
    headline: ['Welcome to', 'Hindi Mahavidyalaya'],
    tagline: 'Affiliated to Osmania University · Premier institution of higher learning in Hyderabad since 1965',
    cta: 'Explore Programmes',
    ctaHref: '#programmes',
  },
  {
    img: banner002,
    badge: 'Diamond Jubilee Year 2025',
    headline: ['Six Decades of', 'Academic Excellence'],
    tagline: 'Nurturing 40,000+ alumni across industry, academia, and civil services over 60 glorious years',
    cta: 'Our Legacy',
    ctaHref: '#about',
    lazy: true,
  },
  {
    img: banner003,
    badge: 'Admissions 2026–27 Open',
    headline: ['Begin Your', 'Journey Here'],
    tagline: 'Merit-based admissions now open · UG & PG programmes · 100% placement assistance',
    cta: 'Apply Now',
    ctaHref: '#admissions',
    lazy: true,
  },
  {
    img: banner4,
    badge: 'Academic Excellence',
    headline: ['Shaping Future', 'Leaders'],
    tagline: 'Industry-aligned curriculum, expert faculty, and a thriving campus ecosystem',
    cta: 'View Programmes',
    ctaHref: '#programmes',
  },
  {
    img: banner5,
    badge: 'Campus Life',
    headline: ['A Campus Full', 'of Possibilities'],
    tagline: 'Modern facilities, vibrant student clubs, sports, and cultural events all year round',
    cta: 'Explore Campus',
    ctaHref: '#campus-gallery',
  },
  {
    img: banner6,
    badge: 'Placements',
    headline: ['100% Placement', 'Assistance'],
    tagline: 'Partnered with 50+ leading companies including TCS, Deloitte, Amazon, HDFC Bank and more',
    cta: 'Our Recruiters',
    ctaHref: '#our-recruiters',
  },
  {
    img: banner7,
    badge: 'Student Life',
    headline: ['Discover, Grow', 'and Thrive'],
    tagline: 'Holistic education that develops academic excellence, leadership, and professional readiness',
    cta: 'Student Experience',
    ctaHref: '#our-student',
  },
  {
    img: banner8,
    badge: 'Community',
    headline: ['40,000+ Strong', 'Alumni Network'],
    tagline: 'A powerful alumni community spanning corporate leadership, entrepreneurship, and global careers',
    cta: 'Alumni Corner',
    ctaHref: '#alumni-corner',
  },
]

const stats = [
  { icon: GraduationCap, value: '60+', label: 'Years Legacy' },
  { icon: Users, value: '40K+', label: 'Alumni' },
  { icon: Award, value: 'NAAC', label: 'Accredited' },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [paused, setPaused] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (target: number) => {
      if (isAnimating || target === current) return
      setIsAnimating(true)

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrent(target)
          setIsAnimating(false)
          gsap.set(coverRef.current, { clipPath: 'inset(0 100% 0 0)' })
        },
      })

      // 1. Fade text out
      tl.to(textRef.current, { opacity: 0, y: -12, duration: 0.3, ease: 'power2.in' })

      // 2. Cover sweeps in (left → right)
      tl.set(coverRef.current, { clipPath: 'inset(0 100% 0 0)' })
      tl.to(
        coverRef.current,
        { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.inOut' },
        '-=0.1'
      )

      // 3. At peak coverage, switch image
      tl.call(() => {
        if (imgRef.current) imgRef.current.src = slides[target].img
      })

      // 4. Cover sweeps out (right → left unveil)
      tl.to(coverRef.current, { clipPath: 'inset(0 0% 0 100%)', duration: 0.5, ease: 'power3.inOut' }, '+=0.05')

      // 5. Text fades in
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )

      // 6. Ken Burns on new image
      tl.fromTo(
        imgRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 5, ease: 'none' },
        '-=0.6'
      )
    },
    [current, isAnimating]
  )

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    autoRef.current = setInterval(() => {
      goTo((current + 1) % slides.length)
    }, 5500)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [current, paused, goTo])

  // Initial Ken Burns
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { scale: 1.06 }, { scale: 1, duration: 5.5, ease: 'none' })
    }
    if (textRef.current) {
      gsap.fromTo(textRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' })
    }
    gsap.set(coverRef.current, { clipPath: 'inset(0 100% 0 0)' })
  }, [])

  const slide = slides[current]

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 110px)',
        minHeight: '620px',
        maxHeight: '920px',
        overflow: 'hidden',
        background: '#0f172a',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Particle field */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ParticleField />
      </div>

      {/* Full-bleed background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img
          ref={imgRef}
          src={slides[0].img}
          alt="Campus"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transformOrigin: 'center center',
          }}
        />
        {/* Gradient overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 50%, rgba(15,23,42,0.25) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35%',
            background: 'linear-gradient(to top, rgba(15,23,42,0.75) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Cover for transition */}
      <div
        ref={coverRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: '#ea580c',
          clipPath: 'inset(0 100% 0 0)',
        }}
      />

      {/* Content */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(1.5rem, 4vw, 5rem)',
          maxWidth: '780px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(234,88,12,0.18)',
            border: '1px solid rgba(234,88,12,0.4)',
            borderRadius: '100px',
            padding: '0.3rem 0.9rem',
            marginBottom: '1.5rem',
            width: 'fit-content',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ea580c',
              flexShrink: 0,
              boxShadow: '0 0 8px #ea580c',
            }}
          />
          <span
            style={{
              color: '#fdba74',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {slide.badge}
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontWeight: 900,
            fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '1.25rem',
          }}
        >
          {slide.headline[0]}
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #f97316, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {slide.headline[1]}
          </span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
            fontWeight: 400,
            lineHeight: 1.65,
            maxWidth: '540px',
            marginBottom: '2rem',
          }}
        >
          {slide.tagline}
        </p>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'rgba(234,88,12,0.2)',
                  border: '1px solid rgba(234,88,12,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color="#fb923c" />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.1 }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => scrollTo(slide.ctaHref)}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {slide.cta}
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => scrollTo('#about')}
            className="btn-secondary"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Slide counter + nav arrows + Diamond Jubilee Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3.5vw, 3rem)',
          right: 'clamp(1.25rem, 3vw, 3rem)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.85rem',
        }}
      >
        {/* Diamond Jubilee Badge */}
        <div
          className="hidden sm:flex"
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(234,88,12,0.45)',
            border: '2.5px solid rgba(255,255,255,0.25)',
            marginBottom: '0.25rem',
          }}
        >
          <div style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: '1.5rem', lineHeight: 1 }}>60</div>
          <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.46rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.25 }}>Years<br />Legacy</div>
        </div>

        {/* Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.25rem',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          <span style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>
            {String(current + 1).padStart(2, '0')}
          </span>
          <span>/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { fn: prev, Icon: ChevronLeft, label: 'Previous' },
            { fn: next, Icon: ChevronRight, label: 'Next' },
          ].map(({ fn, Icon, label }) => (
            <button
              key={label}
              onClick={fn}
              aria-label={label}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(234,88,12,0.6)'
                e.currentTarget.style.borderColor = '#ea580c'
                e.currentTarget.style.transform = 'scale(1.08)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      {/* Slide dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.25rem, 3vw, 2.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '24px' : '7px',
              height: '7px',
              borderRadius: '100px',
              background: i === current ? '#ea580c' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 10,
        }}
      >
        <div
          key={current}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #ea580c, #f97316)',
            animation: paused ? 'none' : 'progressBar 5.5s linear forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  )
}
