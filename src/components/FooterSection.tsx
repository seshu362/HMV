import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'

// SVG social icons (lucide-react version may not export these)
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const quickLinks = [
  { label: 'About HMV', href: '#about' },
  { label: 'Admission Procedure', href: '#admissions' },
  { label: 'Apply Online', href: '#admissions' },
  { label: 'Mandatory Disclosure', href: '#notices' },
  { label: 'President\'s Message', href: '#about' },
  { label: 'Student Accommodation', href: '#campus-gallery' },
  { label: 'Meet the Team', href: '#about' },
  { label: 'Contact', href: '#footer' },
  { label: 'FAQs', href: '#about' },
  { label: 'Careers', href: '#academics' },
]

const academics = [
  { label: 'B.Com / BBA / M.Com', href: '#programmes' },
  { label: 'BA (Hindi) / MA (Hindi)', href: '#programmes' },
  { label: 'B.Sc / M.Sc', href: '#programmes' },
  { label: 'B.Voc Programme', href: '#programmes' },
  { label: 'Autonomous Syllabus', href: '#programmes' },
  { label: 'Examination Cell', href: '#notices' },
]

export default function FooterSection() {
  const socialLinks = [
    { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
    { Icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
    { Icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer
      id="footer"
      style={{
        background: '#0f172a',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* anchor for contact id used in nav */}
      <div id="contact" style={{ position: 'absolute', top: 0, pointerEvents: 'none' }} />

      {/* Subtle background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(234,88,12,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Top glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '200px',
          background: 'radial-gradient(ellipse at center top, rgba(234,88,12,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(2.25rem, 3.5vw, 3rem) clamp(1.25rem, 4vw, 2rem) 2.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img
                src="/favicon.svg"
                alt="HMV Logo"
                style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', padding: '4px', border: '1px solid rgba(255,255,255,0.15)' }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: '#fff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                  }}
                >
                  Hindi Mahavidyalaya
                </div>
                <div
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#ea580c',
                    marginTop: '2px',
                  }}
                >
                  Autonomous · NAAC Accredited
                </div>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '240px' }}>
              Arts, Commerce, Science and P.G. Centre. Affiliated to Osmania University since 1965. Shaping futures for 60+ years.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(234,88,12,0.2)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.5)'; e.currentTarget.style.color = '#ea580c' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ea580c', marginBottom: '1.25rem' }}>
              Quick Links
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {quickLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', textDecoration: 'none',
                    transition: 'color 0.2s, transform 0.2s', display: 'block',
                  }}
                  onMouseOver={e => { e.currentTarget.style.color = '#ea580c'; e.currentTarget.style.transform = 'translateX(3px)' }}
                  onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Academics */}
          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ea580c', marginBottom: '1.25rem' }}>
              Academics
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {academics.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', textDecoration: 'none',
                    transition: 'color 0.2s, transform 0.2s', display: 'block',
                  }}
                  onMouseOver={e => { e.currentTarget.style.color = '#ea580c'; e.currentTarget.style.transform = 'translateX(3px)' }}
                  onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: '1.75rem' }}>
              <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ea580c', marginBottom: '0.9rem' }}>
                Stay Updated
              </h4>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1, padding: '0.6rem 0.9rem', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', fontSize: '0.78rem', outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <button
                  style={{
                    padding: '0.6rem 0.75rem', borderRadius: '8px',
                    background: '#ea580c', border: 'none', color: '#fff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#c2410c' }}
                  onMouseOut={e => { e.currentTarget.style.background = '#ea580c' }}
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Contact + Map */}
          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ea580c', marginBottom: '1.25rem' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
              {[
                { Icon: MapPin, content: 'Nallakunta, Hyderabad,\nTelangana 500 044', href: undefined },
                { Icon: Phone, content: '+91 40 2761 6330', href: 'tel:+914027616330' },
                { Icon: Mail, content: 'info@hindimahavidyalaya.ac.in', href: 'mailto:info@hindimahavidyalaya.ac.in' },
              ].map(({ Icon, content, href }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(234,88,12,0.12)', border: '1px solid rgba(234,88,12,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={13} color="#ea580c" />
                  </div>
                  {href ? (
                    <a href={href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', lineHeight: 1.5, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseOver={e => { e.currentTarget.style.color = '#ea580c' }}
                      onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                    >{content}</a>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{content}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Map card */}
            <a
              href="https://maps.google.com/?q=Hindi+Mahavidyalaya+Nallakunta+Hyderabad"
              target="_blank"
              rel="noreferrer"
              title="Open on Google Maps"
              style={{
                display: 'block', borderRadius: '14px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.3s, box-shadow 0.3s',
                aspectRatio: '16/9',
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <svg viewBox="0 0 320 200" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="200" fill="#f6f3eb" />
                <path d="M 0 0 L 80 0 L 60 50 L 0 40 Z" fill="#e5efe3" />
                <path d="M 240 140 L 320 120 L 320 200 L 250 200 Z" fill="#e5efe3" />
                <circle cx="270" cy="40" r="30" fill="#e5efe3" />
                <path d="M 230 0 C 240 40, 245 80, 255 120 C 265 160, 275 180, 320 200 L 320 0 Z" fill="#98d8ee" opacity="0.85" />
                <path d="M 0 100 Q 150 90, 320 120" stroke="#f6d396" strokeWidth="6" fill="none" />
                <path d="M 70 0 Q 80 100, 110 200" stroke="#ffffff" strokeWidth="5" fill="none" />
                <path d="M 0 50 Q 160 60, 250 30" stroke="#ffffff" strokeWidth="3.5" fill="none" />
                <path d="M 120 0 Q 150 110, 260 170" stroke="#f6d396" strokeWidth="4.5" fill="none" />
                <path d="M 0 140 Q 130 140, 250 130" stroke="#ffffff" strokeWidth="4" fill="none" />
                <text x="95" y="65" fill="#1e1b4b" fontSize="18" fontWeight="bold" fontFamily="sans-serif">Hyderabad</text>
                <text x="98" y="125" fill="#1e1b4b" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">NALLAKUNTA</text>
                <g transform="translate(160, 68)">
                  <circle cx="0" cy="0" r="10" fill="#f95721" fillOpacity="0.25" />
                  <circle cx="0" cy="0" r="5" fill="#f95721" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="8" y="-9" width="62" height="15" rx="3" fill="#1e1b4b" />
                  <text x="12" y="1" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">Nallakunta (HMV)</text>
                </g>
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 0 1.5rem' }} />

        {/* Sub-footer */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          <p>© {new Date().getFullYear()} Hindi Mahavidyalaya, Hyderabad. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.color = '#ea580c' }}
                onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
