import { useState, useEffect, useRef } from 'react'
import { Sparkles, Award, X } from 'lucide-react'

// Authentic Hindi Mahavidyalaya achievements and sports photography
import achieveConvocationAward from '../assets/Achievements/0015.jpeg'
import achieveInauguration from '../assets/Achievements/ai_0003.jpeg'
import achieveSportsPodium from '../assets/Achievements/Ou tournament 2.jpg'
import achieveAuditoriumAssembly from '../assets/Achievements/0022.jpeg'
import achieveNccArmyAward from '../assets/Achievements/Ou tournament 3.jpg'
import achieveGraduationSpeech from '../assets/Achievements/0007-2.jpeg'
import achieveMementoHonour from '../assets/Achievements/0008.jpeg'
import achieveCouncilAwards from '../assets/Achievements/Ou tournament 5.jpg'

interface AchievementCard {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
}

const achievementItems: AchievementCard[] = [
  {
    id: 1,
    title: 'University Gold Medalists',
    subtitle: 'Academic Honours',
    description: 'Vice Chancellor and academic dignitaries conferring degrees and gold medals to distinction scholars at the Convocation.',
    image: achieveConvocationAward,
  },
  {
    id: 2,
    title: 'Academic Facility Inauguration',
    subtitle: 'Autonomous Milestones',
    description: 'Governing Council patrons and Principal Dr. Bala Kumar inaugurating modern academic laboratories and digital learning centers.',
    image: achieveInauguration,
  },
  {
    id: 3,
    title: 'National Games & OU Championship',
    subtitle: 'Sports Excellence',
    description: 'Hindi Mahavidyalaya collegiate fencing, athletics, and sports medalists achieving top podium victories at inter-university championships.',
    image: achieveSportsPodium,
  },
  {
    id: 4,
    title: 'Convocation Ceremony Assembly',
    subtitle: '60th Academic Convocation',
    description: 'Hundreds of proud undergraduate and postgraduate scholars assembled in ceremonial academic robes at the college auditorium.',
    image: achieveAuditoriumAssembly,
  },
  {
    id: 5,
    title: 'NCC Defence Commendation',
    subtitle: 'National Cadet Corps',
    description: 'NCC women cadets receiving prestigious military commendation awards from senior Indian Army leadership for exceptional discipline.',
    image: achieveNccArmyAward,
  },
  {
    id: 6,
    title: 'Graduation Day Keynote Address',
    subtitle: 'Academic Leadership',
    description: 'Distinguished university guests and academic dignitaries addressing graduates on ethical leadership and corporate excellence.',
    image: achieveGraduationSpeech,
  },
  {
    id: 7,
    title: 'Felicitation of Eminent Guests',
    subtitle: 'Collegiate Honours',
    description: 'Honouring university leadership, visiting patrons, and scholars with commemorative mementos and citations of appreciation.',
    image: achieveMementoHonour,
  },
  {
    id: 8,
    title: 'Governing Council Merit Awards',
    subtitle: 'Scholastic Distinction',
    description: 'M.C. Gupta College of Business Management Governing Council and college trustees felicitating top scholars with merit certificates.',
    image: achieveCouncilAwards,
  },
]

export default function AchievementsSection() {
  const [activeModalItem, setActiveModalItem] = useState<AchievementCard | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const ringRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(0)
  const isDraggingRef = useRef(false)
  const isDragEngagedRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const startAngleRef = useRef(0)
  const cardPointerDownRef = useRef({ x: 0, y: 0, time: 0 })

  // Escape key closes spotlight card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 60FPS Continuous Animation loop with interactive drag override
  useEffect(() => {
    let animId: number

    const tick = () => {
      if (!isDraggingRef.current && !isHovered && !activeModalItem) {
        angleRef.current = (angleRef.current + 0.16) % 360
        if (ringRef.current) {
          ringRef.current.style.transform = `rotateX(10deg) translateY(32px) rotateY(${angleRef.current}deg)`
        }
      }
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [isHovered, activeModalItem])

  // Pointer Drag-to-Rotate handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    isDragEngagedRef.current = false
    startXRef.current = e.clientX
    startYRef.current = e.clientY
    startAngleRef.current = angleRef.current
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - startXRef.current
    const dy = e.clientY - startYRef.current

    // Only engage dragging if pointer moved > 8px
    if (Math.hypot(dx, dy) > 8) {
      if (!isDragEngagedRef.current) {
        isDragEngagedRef.current = true
        setIsDragging(true)
        try {
          e.currentTarget.setPointerCapture(e.pointerId)
        } catch { }
      }
      angleRef.current = startAngleRef.current + dx * 0.42
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateX(10deg) translateY(32px) rotateY(${angleRef.current}deg)`
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false
    setIsDragging(false)
    if (isDragEngagedRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch { }
    }
  }

  const openCardSpotlight = (item: AchievementCard, idx: number) => {
    setActiveModalItem(item)

    // Smoothly turn the ring to bring the chosen card front and center
    const targetAngle = -(idx + 1) * 45
    angleRef.current = targetAngle
    if (ringRef.current) {
      ringRef.current.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
      ringRef.current.style.transform = `rotateX(10deg) translateY(32px) rotateY(${targetAngle}deg)`
      setTimeout(() => {
        if (ringRef.current) {
          ringRef.current.style.transition = ''
        }
      }, 700)
    }
  }

  return (
    <section
      id="achievements"
      className="achievements-3d-section relative w-full flex flex-col justify-between items-center bg-white overflow-hidden select-none border-t border-slate-100 pt-8 sm:pt-10 pb-6 sm:pb-8"
    >
      {/* ================= 1. Header with Maintained Balanced Clearance ================= */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-20 shrink-0 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 justify-center mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
            OUR ACHIEVEMENTS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1b4b] tracking-tight leading-tight">
          Achievements &amp; Collaborations
        </h2>

        {/* Subtitle with guaranteed clear margin to the 3D cards below */}
        <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
          Celebrating six decades of academic distinction, research breakthroughs, and university honours.
        </p>
      </div>

      {/* ================= 2. 3D Turntable Carousel Stage with Drag-to-Rotate ================= */}
      <div
        className={`carousel-stage-container relative w-full flex-1 min-h-[420px] h-[420px] sm:h-[440px] flex items-center justify-center overflow-visible touch-none pt-0 pb-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Soft Radial Ambient Floor Disc */}
        <div
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[680px] h-[260px] rounded-full pointer-events-none opacity-20 blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.28) 0%, rgba(30, 27, 75, 0.1) 50%, transparent 80%)',
          }}
        />

        {/* 
          Stable 3D Carousel Ring:
          - Sunk down with translateY(32px) so it has a clean, natural margin and NEVER overlaps the subtitle.
          - Tilted at rotateX(10deg).
          - Drag with cursor or touch to rotate smoothly in any direction.
        */}
        <div
          ref={ringRef}
          className="carousel-ring"
          style={{
            transform: 'rotateX(10deg) translateY(32px) rotateY(0deg)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {achievementItems.map((item, idx) => {
            const cardNum = idx + 1
            return (
              <div
                key={item.id}
                className={`carousel-card c${cardNum}`}
                onPointerDown={(e) => {
                  cardPointerDownRef.current = { x: e.clientX, y: e.clientY, time: Date.now() }
                }}
                onPointerUp={(e) => {
                  const dx = Math.abs(e.clientX - cardPointerDownRef.current.x)
                  const dy = Math.abs(e.clientY - cardPointerDownRef.current.y)
                  const dt = Date.now() - cardPointerDownRef.current.time
                  if (dx < 12 && dy < 12 && dt < 600) {
                    openCardSpotlight(item, idx)
                  }
                }}
                onClick={() => {
                  if (!isDragEngagedRef.current) {
                    openCardSpotlight(item, idx)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details of ${item.title}`}
              >
                {/* 
                  FRONT OF CARD:
                  Displayed when card faces the viewer.
                  backface-visibility: hidden ensures back face never bleeds through!
                */}
                <div className="card-face card-front">
                  {/* Photo Thumbnail */}
                  <div
                    className="card-img"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                    }}
                  >
                    <div className="card-tag">
                      <Sparkles className="w-2 h-2 text-[#f95721]" />
                      <span>{item.subtitle}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <p className="card-title" title={item.title}>
                    {item.title}
                  </p>

                  {/* Description */}
                  <span className="card-desc">
                    {item.description}
                  </span>
                </div>

                {/* 
                  BACK OF CARD:
                  Displayed when card rotates to the back of the ring.
                  backface-visibility: hidden + rotateY(180deg) ensures
                  text is NEVER mirrored or backwards!
                */}
                <div className="card-face card-back">
                  {/* Sheen gloss overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/70 to-transparent pointer-events-none" />

                  {/* Embossed collegiate emblem */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center p-3">
                    <div className="w-11 h-11 rounded-full border border-orange-300/60 bg-gradient-to-br from-orange-50 to-amber-100/50 flex items-center justify-center shadow-xs mb-2">
                      <Award className="w-5 h-5 text-[#ea580c]" />
                    </div>
                    <span className="text-[10px] font-black tracking-wider text-[#1e1b4b] uppercase leading-tight">
                      Hindi Mahavidyalaya
                    </span>
                    <span className="text-[7.5px] font-bold text-[#ea580c] tracking-widest uppercase mt-0.5">
                      Autonomous
                    </span>
                    <div className="w-10 h-0.5 bg-orange-400/30 my-1.5 rounded-full" />
                    <span className="text-[7.5px] font-medium text-slate-500 uppercase tracking-wide">
                      Estd. 1961 · Hyderabad
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ================= 3. Interactive Navigation & Instruction Tip ================= */}
      <p className="text-slate-400 text-[11px] sm:text-xs mt-3 flex items-center justify-center gap-1.5 pointer-events-none z-10">
        <Sparkles className="w-3 h-3 text-[#ea580c]" />
        <span>Click any card to bring it front &amp; read details · Drag to spin</span>
      </p>

      {/* ================= 4. Spotlight Card: Comes Up to Front for Clear Reading ================= */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalPop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            {/* Big Crisp Photo */}
            <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden bg-slate-100">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close details"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Floating Pill Tag */}
              <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#ea580c] shadow-lg flex items-center gap-1.5 border border-white/60">
                <Sparkles className="w-3.5 h-3.5 text-[#f95721]" />
                <span>{activeModalItem.subtitle}</span>
              </div>
            </div>

            {/* Content Details: High Legibility */}
            <div className="p-6 sm:p-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1e1b4b] leading-snug">
                {activeModalItem.title}
              </h3>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {activeModalItem.description}
              </p>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Hindi Mahavidyalaya · Honours &amp; Achievements
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#1e1b4b] hover:bg-[#ea580c] text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3D CSS: Non-Overlapping Highlight & Responsive Layout ================= */}
      <style>{`
        /* Stage perspective centered dead-on */
        .carousel-stage-container {
          perspective: 1200px;
          perspective-origin: 50% 50%;
        }

        /* 
         * Central Spindle:
         * Positioned comfortably down so it NEVER collides with the subtitle!
         */
        .carousel-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          transform-origin: 0 0;
          will-change: transform;
        }

        /*
         * Each Card Wrapper:
         * Size: 205px wide x 265px tall
         * Center offset: left: -102px; top: -132px;
         * Generous 55px gap between cards in the 330px radius ring so NO overlap occurs!
         */
        .carousel-card {
          position: absolute;
          left: -102px;
          top: -132px;
          width: 205px;
          height: 265px;
          transform-style: preserve-3d;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Front & Back Faces */
        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 24px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05);
          -webkit-box-reflect: below 5px linear-gradient(transparent 70%, rgba(0, 0, 0, 0.12));
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        /* Front Face (White Card) */
        .card-front {
          background-color: #ffffff;
          padding: 8px;
          color: #1e1b4b;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          transform: rotateY(0deg);
        }

        /* Back Face (Reflective Collegiate Seal with left-to-right orientation) */
        .card-back {
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 50%, #edf2f7 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: rotateY(180deg) scaleX(-1);
        }

        /*
         * HOVER HIGHLIGHT:
         * Moves forward by 28px in local Z space ('comes little bit front'),
         * scales up smoothly by 1.05x, elevates shadow with orange glow,
         * with ZERO overlap on adjacent cards!
         */
        .carousel-card:hover .card-face {
          border-color: #f95721;
          border-width: 1.5px;
          box-shadow: 0 20px 40px -4px rgba(249, 87, 33, 0.3), 0 8px 16px -4px rgba(0, 0, 0, 0.12);
        }

        /* Card Image */
        .card-front .card-img {
          width: 189px;
          height: 128px;
          border-radius: 7px;
          filter: brightness(0.97);
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .card-front .card-tag {
          position: absolute;
          top: 5px;
          left: 5px;
          padding: 2px 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(4px);
          font-size: 7.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #ea580c;
          display: flex;
          align-items: center;
          gap: 2px;
          border: 1px solid rgba(234, 88, 12, 0.25);
          box-shadow: 0 2px 5px rgba(0,0,0,0.06);
        }

        .card-front p.card-title {
          font-size: 13px;
          font-weight: 700;
          margin-top: 5px;
          margin-bottom: 2px;
          color: #1e1b4b;
          text-align: center;
          padding: 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 189px;
          line-height: 1.2;
        }

        .card-front span.card-desc {
          font-size: 10px;
          text-align: center;
          padding: 0 4px 2px 4px;
          color: #64748b;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* 
         * 8 Cards Cylindrically Distributed:
         * Radius = 330px
         * Cards stand upright.
         * On hover, transforms add translateZ(28px) scale(1.05) to come forward smoothly!
         */
        .c1 { transform: rotateY(calc(360deg / 8 * 1)) translateZ(330px); }
        .c1:hover { transform: rotateY(calc(360deg / 8 * 1)) translateZ(358px) scale(1.05); z-index: 40; }

        .c2 { transform: rotateY(calc(360deg / 8 * 2)) translateZ(330px); }
        .c2:hover { transform: rotateY(calc(360deg / 8 * 2)) translateZ(358px) scale(1.05); z-index: 40; }

        .c3 { transform: rotateY(calc(360deg / 8 * 3)) translateZ(330px); }
        .c3:hover { transform: rotateY(calc(360deg / 8 * 3)) translateZ(358px) scale(1.05); z-index: 40; }

        .c4 { transform: rotateY(calc(360deg / 8 * 4)) translateZ(330px); }
        .c4:hover { transform: rotateY(calc(360deg / 8 * 4)) translateZ(358px) scale(1.05); z-index: 40; }

        .c5 { transform: rotateY(calc(360deg / 8 * 5)) translateZ(330px); }
        .c5:hover { transform: rotateY(calc(360deg / 8 * 5)) translateZ(358px) scale(1.05); z-index: 40; }

        .c6 { transform: rotateY(calc(360deg / 8 * 6)) translateZ(330px); }
        .c6:hover { transform: rotateY(calc(360deg / 8 * 6)) translateZ(358px) scale(1.05); z-index: 40; }

        .c7 { transform: rotateY(calc(360deg / 8 * 7)) translateZ(330px); }
        .c7:hover { transform: rotateY(calc(360deg / 8 * 7)) translateZ(358px) scale(1.05); z-index: 40; }

        .c8 { transform: rotateY(calc(360deg / 8 * 8)) translateZ(330px); }
        .c8:hover { transform: rotateY(calc(360deg / 8 * 8)) translateZ(358px) scale(1.05); z-index: 40; }

        /* 
         * Responsive Scale:
         * Desktop: scale 1
         * Tablet: scale 0.78
         * Mobile: scale 0.60
         */
        @media screen and (max-width: 992px) {
          .carousel-ring {
            scale: 0.78;
          }
        }

        @media screen and (max-width: 640px) {
          .carousel-ring {
            scale: 0.60;
          }
        }

        @keyframes modalPop {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
