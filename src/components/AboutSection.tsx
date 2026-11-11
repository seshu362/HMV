import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// 3 Curated card groups with verified, fast-loading free Unsplash imagery
const cardGroupsData = [
  {
    index: 0,
    title: 'Heritage & Convocation',
    // Alternating Little cards (1, 3, 5, 7) and Big cards (2, 4, 6, 8)
    cards: [
      { type: 'little', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    index: 1,
    title: 'Research & Digital Labs',
    cards: [
      { type: 'little', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    index: 2,
    title: 'Campus Life & Sports',
    cards: [
      { type: 'little', image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
      { type: 'little', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80' },
      { type: 'big', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80' },
    ],
  },
]

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [statuses, setStatuses] = useState<Record<number, string>>({
    0: 'active',
    1: 'unknown',
    2: 'unknown',
  })

  // Next stack transition
  const handleNext = () => {
    const nextIndex = activeIndex + 1 <= cardGroupsData.length - 1 ? activeIndex + 1 : 0

    setStatuses((prev) => ({
      ...prev,
      [activeIndex]: 'after',
      [nextIndex]: 'becoming-active-from-before',
    }))

    setTimeout(() => {
      setStatuses((prev) => ({
        ...prev,
        [nextIndex]: 'active',
      }))
      setActiveIndex(nextIndex)
    }, 20)
  }

  // Previous stack transition
  const handlePrev = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : cardGroupsData.length - 1

    setStatuses((prev) => ({
      ...prev,
      [activeIndex]: 'before',
      [nextIndex]: 'becoming-active-from-after',
    }))

    setTimeout(() => {
      setStatuses((prev) => ({
        ...prev,
        [nextIndex]: 'active',
      }))
      setActiveIndex(nextIndex)
    }, 20)
  }

  return (
    <section
      id="about"
      className="relative w-full bg-white py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: Typography & Content ================= */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-6 z-10">
            {/* Tag pill: Orange bullet + ABOUT US */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ea580c]">
                ABOUT US
              </span>
            </div>

            {/* Main Title matching Figma */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1e1b4b] tracking-tight leading-[1.15] mb-6">
              A college of Hindi, learning and life
            </h2>

            {/* Description Paragraph matching Figma */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
              Founded in 1961, Hindi Mahavidyalaya is an autonomous, NAAC re-accredited
              college affiliated to Osmania University. Our students learn in digital
              classrooms and build skills in debate, leadership and enterprise.
            </p>

            {/* Read our story Button */}
            <a
              href="#story"
              className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-slate-900 bg-white hover:bg-slate-900 text-slate-900 hover:text-white font-semibold text-sm sm:text-base tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>Read our story</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* ================= RIGHT COLUMN: Exact Card Swiper Component ================= */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-10 sm:py-16">
            
            {/* Card Swiper Container */}
            <div className="card-swiper relative w-full flex flex-col items-center justify-center">
              
              {/* Groups Stack Container */}
              <div className="card-groups relative w-[240px] sm:w-[280px] md:w-[300px] aspect-[5/7]">
                {cardGroupsData.map((group) => {
                  const status = statuses[group.index] || 'unknown'

                  return (
                    <div
                      key={group.index}
                      data-index={group.index}
                      data-status={status}
                      className="card-group absolute top-0 left-0 w-full h-full aspect-[5/7]"
                    >
                      {/* 8 Cards in Exact Alternating Little (1, 3, 5, 7) and Big (2, 4, 6, 8) Order */}
                      {group.cards.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className={`card ${c.type === 'big' ? 'big-card' : 'little-card'}`}
                          style={{ backgroundImage: `url("${c.image}")` }}
                        />
                      ))}
                    </div>
                  )
                })}
              </div>

              {/* Swiper Buttons: Only Left & Right Arrows, No Numbers */}
              <div className="card-swiper-buttons mt-12 sm:mt-14 flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous card stack"
                  className="w-12 h-12 rounded-full border-2 border-slate-300 hover:border-[#ea580c] bg-white text-slate-700 hover:text-[#ea580c] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next card stack"
                  className="w-12 h-12 rounded-full border-2 border-slate-300 hover:border-[#ea580c] bg-white text-slate-700 hover:text-[#ea580c] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Embedded CSS for 100% Exact Hyperplexed Card Swiper Effect */}
      <style>{`
        .card-groups,
        .card-group,
        .card {
          aspect-ratio: 5 / 7;
        }

        .card-group {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: transform 400ms ease;
        }

        .card-group[data-status="unknown"] {
          transform: scale(0);
          transition: none;
        }

        .card-group[data-status="active"] {
          transition-delay: 300ms;
          transform: scale(1);
        }

        .card-group[data-status="after"] {
          transform: translateX(50%) scale(0);
        }

        .card-group[data-status="before"] {
          transform: translateX(-50%) scale(0);
        }

        .card-group[data-status="becoming-active-from-after"] {
          transform: translateX(50%) scale(0);
          transition: none;
        }

        .card-group[data-status="becoming-active-from-before"] {
          transform: translateX(-50%) scale(0);
          transition: none;
        }

        .card {
          background-color: rgba(255, 255, 255, 0.05);
          position: absolute;
          transition: transform 800ms cubic-bezier(.05,.43,.25,.95);
          background-position: center;
          background-size: cover;
          box-shadow: -1vmin 1vmin 2vmin rgba(0, 0, 0, 0.25);
        }

        .big-card {
          width: 100%;
          height: 100%;
          border-radius: 1.25rem;
          border: 4px solid white;
        }

        .little-card {
          width: 38%;
          height: 38%;
          border-radius: 1rem;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          box-shadow: -1vmin 1vmin 2vmin rgba(0, 0, 0, 0.25);
          pointer-events: none;
          border: 3px solid white;
          transition: transform 800ms cubic-bezier(.05,.43,.25,.95), opacity 300ms ease;
        }

        .card-group:hover > .little-card {
          opacity: 1;
        }

        /* 100% Exact Hyperplexed Resting Rotations */
        .card-group > .big-card:nth-child(2) {
          transform: translateX(-10%) rotate(-1deg);
        }

        .card-group > .big-card:nth-child(4) {
          transform: rotate(2deg);
        }

        .card-group > .big-card:nth-child(6) {
          transform: translateX(-6%) rotate(-3deg);
        }

        .card-group > .big-card:nth-child(8) {
          transform: translate(10%, 3%) rotate(5deg);
        }

        /* 100% Exact Hyperplexed Hover Fan-out Effects */
        .card-group:hover > .card {  
          box-shadow: -2vmin 2vmin 3vmin rgba(0, 0, 0, 0.4);
        }

        .card-group:hover > .big-card:nth-child(2) {
          transform: translate(-75%, 16%) rotate(-24deg);
        }

        .card-group:hover > .big-card:nth-child(4) {
          transform: translate(-25%, 8%) rotate(-8deg);
        }

        .card-group:hover > .big-card:nth-child(6) {
          transform: translate(25%, 8%) rotate(8deg);
        }

        .card-group:hover > .big-card:nth-child(8) {
          transform: translate(75%, 16%) rotate(24deg);
        }

        .card-group:hover > .little-card:nth-child(1) {
          transform: translate(200%, -160%) rotate(-15deg);
        }

        .card-group:hover > .little-card:nth-child(3) {
          transform: translate(160%, 170%) rotate(15deg);
        }

        .card-group:hover > .little-card:nth-child(5) {
          transform: translate(-200%, -170%) rotate(15deg);
        }

        .card-group:hover > .little-card:nth-child(7) {
          transform: translate(-280%, 140%) rotate(-15deg);
        }
      `}</style>
    </section>
  )
}
