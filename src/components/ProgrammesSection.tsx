import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

// 4 Official streams matching Figma reference 100%
const programmesData = [
  {
    id: 1,
    title: 'Commerce and management',
    courses: 'B.Com | BBA | M.Com | MBA',
    btnLabel: 'See Commerce courses',
    accent: '#26114d',
    lightAccent: '#3b1d75',
  },
  {
    id: 2,
    title: 'Arts',
    courses: 'BA (Hindi) | MA (Hindi)',
    btnLabel: 'See Arts courses',
    accent: '#240f47',
    lightAccent: '#381a6e',
  },
  {
    id: 3,
    title: 'Science',
    courses: 'B.Sc | M.Sc',
    btnLabel: 'See Science courses',
    accent: '#210e42',
    lightAccent: '#351768',
  },
  {
    id: 4,
    title: 'Vocational',
    courses: 'B.Voc',
    btnLabel: 'See Vocational courses',
    accent: '#28124f',
    lightAccent: '#3e1f7a',
  },
]

export default function ProgrammesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section
      id="programmes"
      className="relative pt-6 sm:pt-8 pb-8 sm:pb-10 bg-[#fcfcfd] overflow-hidden flex flex-col justify-center"
    >
      {/* Anchor alias for navbar / footer links */}
      <div id="academics" className="absolute -top-24 pointer-events-none" />
      {/* 1. Header matching Figma: WHAT WE GIVE, Find your programme */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-20 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 justify-center">
          <span className="w-2 h-2 rounded-full bg-[#f95721]" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#f95721]">
            WHAT WE GIVE
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e1b4b] tracking-tight mt-2">
          Find your programme
        </h2>

        <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
          Undergraduate, postgraduate and vocational courses across four streams.
        </p>
      </div>

      {/* 2. Interactive Arc Cards Deck - Calibrated to never overlap title */}
      <div className="arc-deck-container relative w-full flex items-center justify-center py-4 overflow-visible select-none z-10">
        <div className="programmes-arc-wrapper relative">
          {programmesData.map((prog, index) => {
            const cardNum = index + 1
            const isHovered = hoveredCard === cardNum

            return (
              <div
                key={prog.id}
                data-card-i={cardNum}
                style={{ '--card-i': cardNum } as React.CSSProperties}
                className={`arc-card group cursor-pointer ${
                  isHovered ? 'is-active-hover' : ''
                }`}
                onMouseEnter={() => setHoveredCard(cardNum)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Lanyard Top Strap & Chrome Metal Clip */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
                  {/* Black fabric lanyard strap */}
                  <div className="w-4 h-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-t shadow-inner opacity-90" />
                  {/* Metal clip body */}
                  <div className="w-3.5 h-3.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-sm shadow-md border border-slate-300 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-slate-500/50" />
                  </div>
                  {/* Clip swivel hook through hole */}
                  <div className="w-2 h-2.5 border-2 border-slate-400 rounded-b-md -mt-0.5" />
                </div>

                {/* Card Inner Lanyard Badge */}
                <div className="w-full h-full flex flex-col justify-between rounded-[inherit] overflow-hidden shadow-xl shadow-indigo-950/15 border border-slate-200/70 bg-white transition-all duration-300">
                  
                  {/* Top Badge Body: Deep Royal Purple with circular watermark rings */}
                  <div
                    className="relative flex-1 p-4 sm:p-5 flex flex-col items-center justify-between text-center overflow-hidden"
                    style={{
                      background: `linear-gradient(160deg, ${prog.accent} 0%, ${prog.lightAccent} 100%)`,
                    }}
                  >
                    {/* Watermark concentric circular rings matching Figma */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                      <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full border-6 border-white" />
                      <div className="absolute top-2 left-2 w-24 h-24 rounded-full border-4 border-white" />
                      <div className="absolute top-8 right-2 w-20 h-20 rounded-full border-4 border-white" />
                    </div>

                    {/* Badge Clip Slot Punch Hole */}
                    <div className="w-10 h-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-xs shadow-inner mt-0.5 mb-2" />

                    {/* Stream Title */}
                    <h3 className="relative z-10 text-white font-bold text-base sm:text-lg leading-tight my-auto px-1 tracking-tight drop-shadow-sm">
                      {prog.title}
                    </h3>

                    {/* Autonomous Tag */}
                    <div className="relative z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs text-[9px] text-white/85 font-medium tracking-wide">
                      <Sparkles className="w-2.5 h-2.5 text-[#ff8a65]" />
                      <span>Accredited Stream</span>
                    </div>
                  </div>

                  {/* Bottom White Card Section: Degrees & Orange Action Button */}
                  <div className="bg-white p-3.5 sm:p-4 flex flex-col items-center justify-between gap-2.5 text-center rounded-b-[inherit]">
                    {/* Course codes */}
                    <div className="text-slate-800 text-[11px] sm:text-xs font-semibold tracking-tight min-h-[24px] flex items-center justify-center">
                      {prog.courses}
                    </div>

                    {/* Pill Action Button matching Figma */}
                    <a
                      href="#admissions"
                      className="w-full py-2 px-3 rounded-full bg-[#f05a28] hover:bg-[#ea580c] active:scale-95 text-white text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs shadow-orange-500/25 transition-all duration-200"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span>{prog.btnLabel}</span>
                    </a>
                  </div>

                </div>

              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Bottom Button matching Figma: View All programme */}
      <div className="relative z-20 text-center mt-4">
        <a
          href="#programmes"
          className="inline-flex items-center justify-center px-6 py-2 rounded-lg border border-slate-700 hover:border-slate-900 bg-white hover:bg-slate-900 text-slate-800 hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shadow-xs group"
        >
          <span>View All programme</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Embedded CSS with Clean Arc Physics and No Header Overlap */}
      <style>{`
        .programmes-arc-wrapper {
          --card-trans-duration: 800ms;
          --card-trans-easing: cubic-bezier(0.2, 0.8, 0.2, 1);

          --card-border-radius: 16px;
          --card-width: 210px;
          --card-height: 290px;
          --radius: 680px; 
          --cards: 4;
          --arc-size: 0.16;          /* Gentle natural spread */
          --arc-center: 0.75;        /* 12 o'clock apex */
          --arc-start: calc(var(--arc-center) - var(--arc-size) / 2);
          --arc-shift: 0;
          --arc-shift-delta: 0.015;

          position: relative;
          width: var(--card-width);
          height: var(--card-height);
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .programmes-arc-wrapper {
            --card-width: 175px;
            --card-height: 250px;
            --radius: 500px;
            --arc-size: 0.20;
          }
        }

        @media (max-width: 480px) {
          .programmes-arc-wrapper {
            --card-width: 155px;
            --card-height: 230px;
            --radius: 420px;
            --arc-size: 0.24;
          }
        }

        .arc-card {
          --arc-step: calc(var(--arc-size) / (var(--cards) - 1));
          
          position: absolute;
          width: var(--card-width);
          height: var(--card-height);
          border-radius: var(--card-border-radius);

          /* Center of circle placed at (50%, radius + 10px) so the apex is ALWAYS below header */
          offset-path: circle(var(--radius) at 50% calc(var(--radius) + 15px));
          offset-distance: calc(
            (var(--arc-start)
             + (var(--card-i) - 1) * var(--arc-step)
             + var(--arc-shift)
            ) * 100%
          );

          offset-rotate: auto;
          offset-anchor: 50% 0%;
          transition: all var(--card-trans-duration) var(--card-trans-easing);
          will-change: transform, offset-distance, offset-anchor;
        }

        /* Natural Left-to-Right Z-Index Hierarchy */
        .arc-card:nth-child(1) { z-index: 1; }
        .arc-card:nth-child(2) { z-index: 2; }
        .arc-card:nth-child(3) { z-index: 3; }
        .arc-card:nth-child(4) { z-index: 4; }

        /* Hover Expansion Physics */
        .arc-card:hover,
        .arc-card.is-active-hover {
          offset-anchor: 50% 12% !important;
          z-index: 50 !important;
          filter: drop-shadow(0 20px 30px rgba(30, 27, 75, 0.3));
        }

        /* Siblings to the Right Shift Away */
        .arc-card:hover + div {
          --arc-shift: calc(var(--arc-shift-delta) * 2.5);
        }
        .arc-card:hover + div + div {
          --arc-shift: calc(var(--arc-shift-delta) * 1.5);
        }
        .arc-card:hover + div + div + div {
          --arc-shift: calc(var(--arc-shift-delta) * 0.8);
        }

        /* Siblings to the Left Shift Away */
        .arc-card:has(+ *:hover) {
          --arc-shift: calc(var(--arc-shift-delta) * -2.5);
        }
        .arc-card:has(+ * + *:hover) {
          --arc-shift: calc(var(--arc-shift-delta) * -1.5);
        }
        .arc-card:has(+ * + * + *:hover) {
          --arc-shift: calc(var(--arc-shift-delta) * -0.8);
        }
      `}</style>
    </section>
  )
}
