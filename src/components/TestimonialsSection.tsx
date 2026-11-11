import { useState } from 'react'
import { Sparkles, ZoomIn, ZoomOut, Maximize2, Quote } from 'lucide-react'

interface TestimonialCard {
  id: string
  name: string
  role: string
  batch: string
  quote: string
  image: string
  tx: string
  tz: string
  ry: string
}

const testimonialsData: TestimonialCard[] = [
  {
    id: 'testi-1',
    name: 'Pooja Sharma',
    role: 'Senior Software Engineer, Google Cloud',
    batch: 'B.Sc. Computer Science (2018-2021)',
    quote:
      'The autonomous curriculum and hands-on digital laboratory sessions at Hindi Mahavidyalaya laid a solid algorithmic foundation that propelled my career in cloud engineering.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    tx: '-90%',
    tz: '-70vmin',
    ry: '60deg',
  },
  {
    id: 'testi-2',
    name: 'Dr. Rajeshwar Rao',
    role: 'Associate Professor & Osmania Gold Medalist',
    batch: 'MA Hindi & Research Scholar (2012-2015)',
    quote:
      'Studying under dedicated mentors who treat every mentee as family transformed my intellectual journey. HMV instills values, oratorical confidence, and academic discipline.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    tx: '0%',
    tz: '-110vmin',
    ry: '0deg',
  },
  {
    id: 'testi-3',
    name: 'Arjun Verma',
    role: 'Financial Analyst, Deloitte India',
    batch: 'B.Com Honours & MBA (2017-2020)',
    quote:
      'From Day 1 campus placement training to mock interviews by alumni, Hindi Mahavidyalaya gave me the corporate exposure needed to secure my dream role at a Big 4 firm.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    tx: '90%',
    tz: '-70vmin',
    ry: '-60deg',
  },
]

export default function TestimonialsSection() {
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const getContainerTransform = () => {
    if (!focusedId) return 'rotateY(0deg) translate3d(0, 0, 0)'
    const card = testimonialsData.find((c) => c.id === focusedId)
    if (!card) return 'rotateY(0deg) translate3d(0, 0, 0)'

    const txVal = parseFloat(card.tx)
    const itx = txVal === 0 ? '0%' : `${-txVal}%`
    const tzMatch = card.tz.match(/(-?\d+)(.*)/)
    const itz = tzMatch ? `${-Number(tzMatch[1])}${tzMatch[2]}` : '0vmin'
    const ryVal = parseFloat(card.ry)
    const iry = ryVal === 0 ? '0deg' : `${-ryVal}deg`

    return `rotateY(${iry}) translate3d(${itx}, 0, ${itz})`
  }

  const handleCardClick = (id: string) => {
    setFocusedId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="testimonials"
      className="testi-3d-section relative py-20 lg:py-28 overflow-hidden select-none"
    >
      {/* Dark Stage Illumination matching the triptych room */}
      <div className="absolute inset-0 bg-radial from-[#1e2433] via-[#0e121a] to-[#080b10] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(249, 87, 33, 0.4) 1.2px, transparent 1.2px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 100%)',
        }}
      />

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-20 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
            STUDENT VOICES
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mt-3">
          Alumni &amp; Student Stories
        </h2>

        <p className="text-slate-400 text-xs sm:text-sm mt-2 flex items-center justify-center gap-2">
          <span>Click any card to zoom into 3D story view</span>
          {focusedId ? (
            <span className="inline-flex items-center gap-1 text-[#ff7043] font-semibold">
              <ZoomOut className="w-3.5 h-3.5" /> (Click again to reset)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-500">
              <ZoomIn className="w-3.5 h-3.5" />
            </span>
          )}
        </p>
      </div>

      {/* 3D Triptych Gallery Stage */}
      <div className="testi-viewport relative w-full h-[54vmin] min-h-[420px] max-h-[600px] flex items-center justify-center">
        <main
          className="testi-3d-main relative"
          style={{
            transform: getContainerTransform(),
          }}
        >
          {testimonialsData.map((card) => {
            const isCurrentFocus = focusedId === card.id

            return (
              <article
                key={card.id}
                id={card.id}
                className="testi-3d-article absolute inset-0"
                style={{
                  transform: `translate3d(${card.tx}, 0, ${card.tz}) rotateY(${card.ry})`,
                }}
              >
                <button
                  type="button"
                  onClick={() => handleCardClick(card.id)}
                  aria-label={`Read story of ${card.name}`}
                  className={`testi-card-btn relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300 group ${
                    isCurrentFocus
                      ? 'border-[#ff7043] ring-4 ring-[#ff7043]/30'
                      : 'border-white/15 hover:border-white/40'
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Quote Icon */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/15 flex items-center gap-1.5">
                      <Quote className="w-3 h-3 text-[#ff7043]" />
                      <span>Alumni Spotlight</span>
                    </span>

                    <span className="w-7 h-7 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/15 group-hover:text-[#ff7043] transition-colors">
                      {isCurrentFocus ? (
                        <ZoomOut className="w-3.5 h-3.5" />
                      ) : (
                        <Maximize2 className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </div>

                  {/* Overlay Details */}
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-left pointer-events-none">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#ff7043] font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{card.batch}</span>
                    </div>
                    <h3 className="text-white text-base sm:text-lg font-bold leading-snug drop-shadow-md">
                      {card.name}
                    </h3>
                    <p className="text-xs text-[#ff8a65] font-semibold">{card.role}</p>
                    <p className="text-slate-300 text-xs mt-2 line-clamp-3 font-normal opacity-90 italic">
                      "{card.quote}"
                    </p>
                  </div>
                </button>
              </article>
            )
          })}
        </main>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-12 relative z-20">
        <button
          type="button"
          onClick={() => setFocusedId(null)}
          aria-label="Overview mode"
          className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            focusedId === null ? 'w-8 bg-[#f95721]' : 'w-2.5 bg-slate-600 hover:bg-slate-500'
          }`}
          title="Overview Mode"
        />

        {testimonialsData.map((card) => {
          const isSelected = focusedId === card.id

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              aria-label={`Focus on ${card.name}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isSelected ? 'w-8 bg-[#f95721]' : 'w-2.5 bg-slate-600 hover:bg-slate-500'
              }`}
              title={card.name}
            />
          )
        })}
      </div>

      <style>{`
        .testi-viewport {
          perspective: 800px;
          perspective-origin: 50% 50%;
        }

        .testi-3d-main {
          transform-style: preserve-3d;
          width: min(50vmin, 380px);
          height: min(68vmin, 480px);
          transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .testi-3d-article {
          position: absolute;
          inset: 0;
          -webkit-box-reflect: below 20px linear-gradient(transparent 65%, rgba(255, 255, 255, 0.18));
          transform-style: preserve-3d;
        }

        .testi-card-btn {
          cursor: pointer;
          outline: none;
          background: #111722;
          transform: translateZ(0);
        }

        .testi-card-btn:hover {
          transform: scale(1.03) translateY(-3%);
        }

        .testi-card-btn:focus-visible {
          box-shadow: 0 0 0 3px #ff7043;
        }
      `}</style>
    </section>
  )
}

