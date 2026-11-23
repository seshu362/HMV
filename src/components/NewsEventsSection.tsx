import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import republicDayImg from '../assets/NEWS AND EVENTS/76TH REPUBLIC DAY 2025.jpg'
import hindiDiwasImg from '../assets/NEWS AND EVENTS/Celebration of Hindi Diwas.jpg'
import convocationImg from '../assets/NEWS AND EVENTS/Convocation Day on 15 Feb 2017.jpg'
import ganeshChaturthiImg from '../assets/NEWS AND EVENTS/Ganesh Chaturthi celebrations in college.jpg'
import annualFunctionImg from '../assets/NEWS AND EVENTS/Grand Celebration of Annual Function 2025 in Hindi Mahavidyalaya.jpg'
import womensDay2018Img from "../assets/NEWS AND EVENTS/INTERNATIONAL WOMEN'S DAY 2018.jpg"
import womensDay2025Img from "../assets/NEWS AND EVENTS/International Women's Day 2025 Celebrated in Hindi Mahavidyalaya College.jpg"
import scienceDayImg from '../assets/NEWS AND EVENTS/NATIONAL SCIENCE DAY 2025.jpg'
import swachhBharatImg from '../assets/NEWS AND EVENTS/swachh Bharat NCC.jpg'
import teachersDayImg from '../assets/NEWS AND EVENTS/Teachers day celebrations 2025.jpg'
import telanganaDayImg from '../assets/NEWS AND EVENTS/Telangana Formation Day Flag Hosting.jpg'

gsap.registerPlugin(ScrollTrigger)

const eventsData = [
  { id: 1, tag: 'ANNUAL DAY', month: 'MARCH', day: '22', title: 'Grand Celebration of Annual Function 2025 in Hindi Mahavidyalaya', time: '4:00 PM Onwards', venue: 'Main Auditorium, Hindi Mahavidyalaya, Nallakunta, Hyderabad', description: 'Celebration of academic milestones, vibrant cultural performances, theatrical dramas, and annual collegiate award distributions.', image: annualFunctionImg },
  { id: 2, tag: 'REPUBLIC DAY', month: 'JANUARY', day: '26', title: '76th Republic Day Celebrations 2025', time: '8:30 AM Onwards', venue: 'Main Campus Grounds, Hindi Mahavidyalaya', description: 'Unfurling of the National Tricolour, NCC guard of honour, inspiring patriotic addresses, and ceremonial parade honouring the 76th Republic Day.', image: republicDayImg },
  { id: 3, tag: 'SCIENCE EXPO', month: 'FEBRUARY', day: '28', title: 'National Science Day 2025', time: '9:30 AM to 4:30 PM', venue: 'Science Laboratories & Exhibition Hall, HMV Campus', description: 'Interactive science exhibitions, working research prototypes, student scientific paper presentations, and inter-collegiate quiz competitions.', image: scienceDayImg },
  { id: 4, tag: "WOMEN'S DAY", month: 'MARCH', day: '08', title: "International Women's Day 2025 Celebrated in Hindi Mahavidyalaya College", time: '10:00 AM to 2:00 PM', venue: 'Central Seminar Hall, Hindi Mahavidyalaya', description: "Commemorating women empowerment with keynote speeches from women leaders, student symposiums, and special felicitations of distinguished achievers.", image: womensDay2025Img },
  { id: 5, tag: 'TEACHERS DAY', month: 'SEPTEMBER', day: '05', title: "Teachers' Day Celebrations 2025", time: '10:00 AM Onwards', venue: 'Main Auditorium, Hindi Mahavidyalaya', description: 'Heartfelt tributes, student felicitations, cultural performances, and gratitude ceremonies celebrating the dedication of HMV faculty.', image: teachersDayImg },
  { id: 6, tag: 'HINDI DIWAS', month: 'SEPTEMBER', day: '14', title: 'Celebration of Hindi Diwas 2025', time: '11:00 AM to 1:00 PM', venue: 'Central Hall, Hindi Mahavidyalaya, Hyderabad', description: 'Hindi poetry recitation, literary competitions, and cultural programs celebrating the richness of the Hindi language and literature.', image: hindiDiwasImg },
  { id: 7, tag: 'TELANGANA DAY', month: 'JUNE', day: '02', title: 'Telangana Formation Day Flag Hosting', time: '8:00 AM Onwards', venue: 'Main Campus, Hindi Mahavidyalaya, Nallakunta', description: 'Solemn flag hoisting ceremony celebrating the formation of Telangana state with tributes to the statehood movement leaders.', image: telanganaDayImg },
  { id: 8, tag: 'NCC DRIVE', month: 'OCTOBER', day: '02', title: 'Swachh Bharat NCC Campus Drive 2025', time: '7:30 AM Onwards', venue: 'HMV Campus Grounds and Surrounding Areas', description: 'NCC cadets and volunteers lead a campus-wide cleanliness drive, awareness rally, and plantation initiative for Swachh Bharat Mission.', image: swachhBharatImg },
  { id: 9, tag: 'GANESH FESTIVAL', month: 'SEPTEMBER', day: '07', title: 'Ganesh Chaturthi Celebrations in College 2025', time: '10:00 AM Onwards', venue: 'Main Campus, Hindi Mahavidyalaya', description: 'Vibrant campus celebrations with student-organized cultural programs, rangoli competitions, and community festivities during the auspicious festival.', image: ganeshChaturthiImg },
  { id: 10, tag: "WOMEN'S DAY", month: 'MARCH', day: '08', title: "International Women's Day 2018 — HMV Celebrates", time: '10:00 AM to 1:00 PM', venue: 'College Seminar Hall, Nallakunta, Hyderabad', description: "Commemorating women empowerment and gender equality with student awareness programs, speeches, and special recognition of women achievers.", image: womensDay2018Img },
  { id: 11, tag: 'CONVOCATION', month: 'FEBRUARY', day: '15', title: 'Convocation Day 15 Feb 2017 — HMV Degree Ceremony', time: '10:30 AM Onwards', venue: 'Main Auditorium, Hindi Mahavidyalaya, Hyderabad', description: 'Landmark annual convocation ceremony with Osmania University affiliation, conferring degrees upon graduating students across all departments.', image: convocationImg },
]

export default function NewsEventsSection() {
  const [featured, setFeatured] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )
      gsap.fromTo(
        sideRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Animate featured image on change
  const handleSetFeatured = (idx: number) => {
    if (idx === featured) return
    gsap.fromTo(featuredRef.current, { opacity: 0.3, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' })
    setFeatured(idx)
  }

  const ev = eventsData[featured]
  const sideEvents = eventsData.filter((_, i) => i !== featured).slice(0, 4)

  const prev = () => handleSetFeatured((featured - 1 + eventsData.length) % eventsData.length)
  const next = () => handleSetFeatured((featured + 1) % eventsData.length)

  return (
    <section
      id="news-events"
      ref={sectionRef}
      style={{
        background: '#fff',
        padding: 'clamp(2rem, 3.5vw, 2.75rem) clamp(1.25rem, 4vw, 2rem)',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>News & Events</div>
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
              Campus Life &
              <br />
              <span style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Celebrations
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[{ fn: prev, Icon: ChevronLeft }, { fn: next, Icon: ChevronRight }].map(({ fn, Icon }, i) => (
              <button
                key={i}
                onClick={fn}
                style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: '#fff', border: '1.5px solid #e2e8f0', color: '#1e1b4b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#ea580c'; e.currentTarget.style.borderColor = '#ea580c'; e.currentTarget.style.color = '#fff' }}
                onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#1e1b4b' }}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Grid: Featured LEFT + Side Cards RIGHT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Featured Event */}
          <div
            ref={featuredRef}
            style={{ opacity: 0, borderRadius: '20px', overflow: 'hidden', position: 'relative', minHeight: '480px', cursor: 'pointer' }}
          >
            <img
              src={ev.image}
              alt={ev.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.4) 55%, transparent 100%)',
              }}
            />
            {/* Tag */}
            <div
              style={{
                position: 'absolute', top: '1.5rem', left: '1.5rem',
                background: '#ea580c', color: '#fff', borderRadius: '100px',
                padding: '0.3rem 0.9rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
              }}
            >
              {ev.tag}
            </div>
            {/* Date badge */}
            <div
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px',
                padding: '0.6rem 0.9rem', textAlign: 'center',
              }}
            >
              <div style={{ color: '#fb923c', fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.5rem', lineHeight: 1 }}>{ev.day}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{ev.month}</div>
            </div>
            {/* Content */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
              <h3
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#fff',
                  lineHeight: 1.25, marginBottom: '0.75rem',
                }}
              >
                {ev.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                {ev.description}
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem' }}>
                  <Clock size={12} /> {ev.time}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem' }}>
                  <MapPin size={12} /> {ev.venue}
                </span>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div ref={sideRef} style={{ opacity: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sideEvents.map((e) => (
              <div
                key={e.id}
                onClick={() => handleSetFeatured(eventsData.indexOf(e))}
                style={{
                  display: 'flex', gap: '1rem', background: '#fff',
                  borderRadius: '14px', border: '1.5px solid #f1f5f9',
                  padding: '1rem', cursor: 'pointer', transition: 'all 0.25s',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  flex: 1,
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#ea580c40'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(234,88,12,0.1)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <div style={{ width: '75px', height: '75px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={e.image} alt={e.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ background: 'rgba(234,88,12,0.08)', color: '#ea580c', fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '100px', letterSpacing: '0.08em', flexShrink: 0 }}>
                      {e.tag}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>{e.day} {e.month}</span>
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1e1b4b', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {e.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.4rem', color: '#94a3b8', fontSize: '0.68rem' }}>
                    <Clock size={10} /> {e.time}
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: '#ea580c', flexShrink: 0, alignSelf: 'center' }} />
              </div>
            ))}

            {/* View all */}
            <button
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%', padding: '0.9rem', borderRadius: '12px',
                background: '#fdf8f3', border: '1.5px solid rgba(234,88,12,0.15)',
                color: '#ea580c', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s', letterSpacing: '0.03em',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#ea580c'; e.currentTarget.style.color = '#fff' }}
              onMouseOut={e => { e.currentTarget.style.background = '#fdf8f3'; e.currentTarget.style.color = '#ea580c' }}
            >
              View All Events
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '1.75rem' }}>
          {eventsData.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSetFeatured(i)}
              style={{
                width: i === featured ? '20px' : '7px', height: '7px', borderRadius: '100px',
                background: i === featured ? '#ea580c' : '#cbd5e1',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
