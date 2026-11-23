import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Shield, Award, Users } from 'lucide-react'
import banner003 from '@/assets/Banners/Banner003.jpg'

gsap.registerPlugin(ScrollTrigger)

const trustPillars = [
  { icon: Shield, label: 'NAAC Accredited', sub: 'Recognized quality' },
  { icon: Award, label: 'Merit-Based', sub: 'Transparent selection' },
  { icon: Users, label: '60+ Year Legacy', sub: '40,000+ alumni' },
]

const courses = [
  'B.Sc. Computer Science (Autonomous)',
  'B.Com. Computer Applications',
  'B.Com. (Honours / Regular)',
  'B.A. (Journalism & Mass Comm.)',
  'B.Voc. Software Development (UGC Funded)',
  'B.B.A. Business Administration',
  'Postgraduate Programmes (M.Com. / M.A.)',
]

export default function AdmissionsSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', course: courses[0] })
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure content is visible immediately even if ScrollTrigger is delayed
    if (textRef.current) textRef.current.style.opacity = '1'
    if (formRef.current) formRef.current.style.opacity = '1'

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      )
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 32, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      )
    }, sectionRef)

    // Recalculate ScrollTrigger positions in case components above resized
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ fullName: '', email: '', phone: '', course: courses[0] })
    }, 3000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid #e2e8f0',
    fontSize: '0.85rem',
    color: '#1e1b4b',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <section
      id="admissions"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
        minHeight: '580px',
      }}
    >
      {/* Full-bleed background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={banner003}
          alt="Admissions"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.8) 50%, rgba(10,15,30,0.6) 100%)',
          }}
        />
      </div>


      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(2rem, 3.5vw, 2.75rem) clamp(1.25rem, 4vw, 2rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(2.5rem, 5vw, 5rem)',
          alignItems: 'center',
        }}
      >
        {/* LEFT: Text */}
        <div ref={textRef}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(234,88,12,0.18)', border: '1px solid rgba(234,88,12,0.4)',
              borderRadius: '100px', padding: '0.3rem 0.9rem', marginBottom: '1.5rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ea580c', boxShadow: '0 0 8px #ea580c' }} />
            <span style={{ color: '#fdba74', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Admissions 2026–27 Open
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.08,
              color: '#fff',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to join
            <br />
            <span style={{ background: 'linear-gradient(90deg, #f97316, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              the 2026-27 batch?
            </span>
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
              lineHeight: 1.75,
              maxWidth: '440px',
              marginBottom: '2.5rem',
            }}
          >
            Visit the campus, meet the faculty, and start your application.
            Merit-based, transparent admissions with 100% placement assistance.
          </p>

          {/* Trust pillars */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {trustPillars.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.65rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', padding: '0.75rem 1rem', backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    width: '34px', height: '34px', borderRadius: '8px',
                    background: 'rgba(234,88,12,0.2)', border: '1px solid rgba(234,88,12,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <Icon size={16} color="#fb923c" />
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.78rem', lineHeight: 1.2 }}>{label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.63rem', fontWeight: 500 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Form */}
        <div ref={formRef}>
          <div
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1.5px solid rgba(255,255,255,0.4)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
            }}
          >
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
                  }}
                >
                  <CheckCircle2 size={30} color="#10b981" />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.5rem', color: '#1e1b4b', marginBottom: '0.75rem' }}>
                  Enquiry Submitted!
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '300px', margin: '0 auto' }}>
                  Thank you, <strong style={{ color: '#1e1b4b' }}>{formData.fullName}</strong>. An admissions counselor will reach out shortly with the 2026-27 brochure.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Form header */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ea580c', marginBottom: '0.4rem' }}>
                    2026-27 Admissions
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.4rem', color: '#1e1b4b', lineHeight: 1.2 }}>
                    Start Your Enquiry
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                    Get syllabus brochures, fee details & counselor guidance
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem', letterSpacing: '0.03em' }}>
                      Full Name *
                    </label>
                    <input
                      type="text" required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = '#ea580c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(234,88,12,0.1)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Email *</label>
                      <input
                        type="email" required
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = '#ea580c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(234,88,12,0.1)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Phone *</label>
                      <input
                        type="tel" required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = '#ea580c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(234,88,12,0.1)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
                      />
                    </div>
                  </div>

                  {/* Programme */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Programme of Interest</label>
                    <select
                      value={formData.course}
                      onChange={e => setFormData({ ...formData, course: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#ea580c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(234,88,12,0.1)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      {courses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: '100%', padding: '0.9rem', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                      color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                      border: 'none', cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      boxShadow: '0 8px 24px rgba(234,88,12,0.35)',
                      transition: 'transform 0.2s, box-shadow 0.2s', marginTop: '0.25rem',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(234,88,12,0.45)' }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(234,88,12,0.35)' }}
                  >
                    Submit Enquiry & Get Brochure
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
