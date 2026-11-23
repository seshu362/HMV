import { useState } from 'react'
import { Phone, Mail, ChevronRight, Globe, Type } from 'lucide-react'

// Inline SVG social icons (lucide-react may not export these)
const InstagramIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const announcements = [
  '📢 Admissions Open for 2026-27 Batch — Apply Now',
  '🎓 NAAC Accredited Institution — Diamond Jubilee Year',
  '📰 New Autonomous Syllabus Effective from Academic Year 2026',
  '🏆 100% Placement Assistance — 50+ Recruiting Partners',
  '📅 Last Date to Apply: 31st March 2026 — Don\'t Miss Out',
  '🌟 60+ Years of Academic Excellence & Trust',
]

const marqueeText = announcements.join('   ·   ') + '   ·   ' + announcements.join('   ·   ') + '   ·   '

export default function TopHeader() {
  const [_fontSize, setFontSize] = useState(16)

  const changeFontSize = (delta: number) => {
    setFontSize(prev => {
      const next = Math.min(20, Math.max(13, prev + delta))
      document.documentElement.style.fontSize = `${next}px`
      return next
    })
  }

  return (
    <div className="top-header-wrapper" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Row 1: Crimson Announcement Ticker */}
      <div
        className="top-header-ticker h-[30px] sm:h-[34px]"
        style={{
          background: 'linear-gradient(90deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Label */}
        <div
          style={{
            flexShrink: 0,
            background: '#ea580c',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0 0.75rem',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#fff',
              animation: 'pulseRing 1.6s ease-out infinite',
              flexShrink: 0,
            }}
          />
          LATEST
        </div>

        {/* Gradient fade left */}
        <div
          style={{
            position: 'absolute',
            left: '80px',
            top: 0,
            bottom: 0,
            width: '30px',
            background: 'linear-gradient(to right, #991b1b, transparent)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        {/* Scrolling text */}
        <div style={{ overflow: 'hidden', flex: 1, position: 'relative' }}>
          <div
            className="marquee-track"
            style={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              lineHeight: '34px',
              paddingRight: '2rem',
            }}
          >
            {marqueeText}
          </div>
        </div>

        {/* Gradient fade right */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '60px',
            background: 'linear-gradient(to left, #7f1d1d, transparent)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Row 2: Dark Navy Utility Bar - Clean single row on desktop, hidden on mobile to avoid vertical screen clutter */}
      <div
        className="hidden md:flex items-center justify-between"
        style={{
          background: '#0f172a',
          borderBottom: '1px solid rgba(234,88,12,0.15)',
          padding: '0 1rem',
          gap: '1rem',
          minHeight: '38px',
        }}
      >
        {/* Left: Contact Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
          <a
            href="tel:+914023261380"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'rgba(255,255,255,0.65)',
              fontSize: '0.68rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#ea580c')}
            onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            <Phone size={11} />
            +91 40-2326-1380
          </a>
          <a
            href="mailto:info@hindimv.edu.in"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'rgba(255,255,255,0.65)',
              fontSize: '0.68rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#ea580c')}
            onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            <Mail size={11} />
            info@hindimv.edu.in
          </a>
        </div>

        {/* Right: Social + Accessibility + Login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Social Icons */}
          {[
            { Icon: InstagramIcon, href: '#', label: 'Instagram' },
            { Icon: YoutubeIcon, href: '#', label: 'YouTube' },
            { Icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                textDecoration: 'none',
              }}
              onMouseOver={e => {
                e.currentTarget.style.color = '#ea580c'
                e.currentTarget.style.borderColor = 'rgba(234,88,12,0.5)'
                e.currentTarget.style.background = 'rgba(234,88,12,0.08)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon />
            </a>
          ))}

          {/* Divider */}
          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />

          {/* Font Size Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Type size={10} /> A
            </span>
            {[
              { label: 'A−', delta: -1 },
              { label: 'A+', delta: 1 },
            ].map(({ label, delta }) => (
              <button
                key={label}
                onClick={() => changeFontSize(delta)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  padding: '1px 5px',
                  cursor: 'pointer',
                  lineHeight: 1.6,
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(234,88,12,0.15)'
                  e.currentTarget.style.color = '#ea580c'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />

          {/* Login Links */}
          {[
            { label: 'Student Login', href: '#' },
            { label: 'Admin Login', href: '#' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                color: 'rgba(255,255,255,0.55)',
                fontSize: '0.65rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#ea580c')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              <ChevronRight size={9} />
              {label}
            </a>
          ))}

          {/* Language */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.65rem',
              cursor: 'pointer',
            }}
          >
            <Globe size={10} />
            EN
          </div>
        </div>
      </div>
    </div>
  )
}
