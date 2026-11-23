import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import convocationImg from '@/assets/About/0030.jpeg'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'Years of Legacy', value: 60, suffix: '+', big: true, accent: true },
  { label: 'Departments', value: 9, suffix: '' },
  { label: 'Industry Mentors', value: 50, suffix: '+' },
  { label: 'Students Mentored', value: 3937, suffix: '+' },
  { label: 'Alumni Worldwide', value: 40000, suffix: '+' },
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

function StatCard({ stat, trigger, delay }: { stat: typeof stats[0]; trigger: boolean; delay: number }) {
  const count = useCountUp(stat.value, 1800, trigger)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      style={{
        background: stat.big ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' : '#fff',
        borderRadius: '20px',
        padding: stat.big ? '2.5rem 2rem' : '1.75rem 1.5rem',
        boxShadow: stat.big
          ? '0 20px 60px rgba(234,88,12,0.35)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        border: stat.big ? 'none' : '1.5px solid rgba(234,88,12,0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s',
        cursor: 'default',
        gridColumn: stat.big ? 'span 2' : 'span 1',
        animationDelay: `${delay}ms`,
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
        e.currentTarget.style.boxShadow = stat.big
          ? '0 32px 80px rgba(234,88,12,0.45)'
          : '0 12px 40px rgba(0,0,0,0.1)'
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = stat.big
          ? '0 20px 60px rgba(234,88,12,0.35)'
          : '0 4px 24px rgba(0,0,0,0.06)'
      }}
    >
      {/* Concentric ring decoration for big card */}
      {stat.big && (
        <>
          <div style={{ position: 'absolute', top: '50%', right: '-20px', transform: 'translateY(-50%)', width: '140px', height: '140px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', right: '-50px', transform: 'translateY(-50%)', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        </>
      )}

      <div
        style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontWeight: 900,
          fontSize: stat.big ? 'clamp(3rem, 5vw, 4.5rem)' : 'clamp(1.8rem, 3vw, 2.8rem)',
          color: stat.big ? '#fff' : '#1e1b4b',
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        {stat.value >= 1000 ? `${Math.floor(count / 1000)}K` : count}{stat.suffix}
      </div>
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: stat.big ? 'rgba(255,255,255,0.75)' : '#94a3b8',
        }}
      >
        {stat.label}
      </div>
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
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)

    // Parallax bg
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: -20,
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
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #fff 0%, #fdf8f3 100%)',
        padding: 'clamp(2rem, 3.5vw, 2.75rem) clamp(1.25rem, 4vw, 2rem)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Parallax background image */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage: `url(${convocationImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06,
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            Our Numbers
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 1.1,
              color: '#1e1b4b',
              letterSpacing: '-0.02em',
            }}
          >
            Decades of Impact,
            <br />
            <span style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Measured in Thousands
            </span>
          </h2>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} trigger={triggered} delay={i * 100} />
          ))}
        </div>

        {/* Bottom quote */}
        <div
          style={{
            marginTop: 'clamp(2rem, 4vw, 3.5rem)',
            textAlign: 'center',
            padding: '1.5rem',
            borderTop: '1px solid rgba(234,88,12,0.12)',
          }}
        >
          <p
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
              color: '#475569',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            "Shaping minds, building careers, and inspiring generations since 1965."
          </p>
          <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ea580c' }}>
            Hindi Mahavidyalaya, Hyderabad
          </div>
        </div>
      </div>
    </section>
  )
}
