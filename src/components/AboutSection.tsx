import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// Authentic Hindi Mahavidyalaya leadership and convocation imagery
import aboutPrincipal1 from '../assets/About/IMG_0667.jpeg'
import aboutPrincipal2 from '../assets/About/DrBalaKumar.jpeg'
import aboutProcession from '../assets/About/0002.jpeg'
import aboutJyoti from '../assets/About/0006.jpeg'
import aboutSpeech from '../assets/About/0007-2.jpeg'
import aboutMemento from '../assets/About/0008.jpeg'
import aboutDegree from '../assets/About/0014.jpeg'
import aboutGroup from '../assets/About/0030.jpeg'

// Authentic collegiate campus banners for secondary stacks
import banner1 from '../assets/Banners/banner1.jpg'
import banner3 from '../assets/Banners/banner3.jpg'
import banner4 from '../assets/Banners/banner4.jpg'
import banner5 from '../assets/Banners/banner5.jpg'
import banner6 from '../assets/Banners/banner6.jpg'
import banner7 from '../assets/Banners/banner7.jpg'
import banner8 from '../assets/Banners/banner8.jpg'

// 3 Curated card groups with 100% authentic Hindi Mahavidyalaya imagery
const cardGroupsData = [
  {
    index: 0,
    title: 'Leadership & Academic Convocation',
    // Alternating Little cards (1, 3, 5, 7) and Big cards (2, 4, 6, 8)
    // First Big Card (index 1) displays IMG_0667.jpeg (Principal Dr. Bala Kumar) in front
    cards: [
      { type: 'little', image: aboutJyoti },
      { type: 'big', image: aboutPrincipal1 }, // IMG_0667.jpeg - Displayed first in front
      { type: 'little', image: aboutMemento },
      { type: 'big', image: aboutPrincipal2 }, // DrBalaKumar.jpeg
      { type: 'little', image: aboutProcession },
      { type: 'big', image: aboutDegree },     // 0014.jpeg
      { type: 'little', image: aboutSpeech },
      { type: 'big', image: aboutGroup },      // 0030.jpeg
    ],
  },
  {
    index: 1,
    title: 'Campus Heritage & Leadership',
    cards: [
      { type: 'little', image: aboutProcession },
      { type: 'big', image: banner1 },
      { type: 'little', image: aboutJyoti },
      { type: 'big', image: banner3 },
      { type: 'little', image: aboutMemento },
      { type: 'big', image: banner8 },
      { type: 'little', image: aboutSpeech },
      { type: 'big', image: aboutPrincipal1 },
    ],
  },
  {
    index: 2,
    title: 'Student Life, Sports & Culture',
    cards: [
      { type: 'little', image: aboutDegree },
      { type: 'big', image: banner5 },
      { type: 'little', image: aboutGroup },
      { type: 'big', image: banner6 },
      { type: 'little', image: aboutMemento },
      { type: 'big', image: banner7 },
      { type: 'little', image: aboutJyoti },
      { type: 'big', image: banner4 },
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
      className="relative w-full bg-white pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10 overflow-hidden border-t border-slate-100"
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
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center pt-4 pb-2 sm:pt-6 sm:pb-4">
            
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
          z-index: 10;
          transition: transform 800ms cubic-bezier(.05,.43,.25,.95), opacity 300ms ease;
        }

        .card-group:hover > .little-card {
          opacity: 1;
          pointer-events: auto;
        }

        /* Hovering any individual image card brings it completely to the front with full z-index */
        .card-group .card:hover {
          z-index: 50 !important;
          cursor: pointer;
        }

        /* 100% Exact Hyperplexed Resting Rotations - First Big Card (:nth-child(2)) is the frontmost visible card */
        .card-group > .big-card:nth-child(2) {
          transform: translateX(-10%) rotate(-1deg);
          z-index: 5;
        }

        .card-group > .big-card:nth-child(4) {
          transform: rotate(2deg);
          z-index: 4;
        }

        .card-group > .big-card:nth-child(6) {
          transform: translateX(-6%) rotate(-3deg);
          z-index: 3;
        }

        .card-group > .big-card:nth-child(8) {
          transform: translate(10%, 3%) rotate(5deg);
          z-index: 2;
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
