import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'

// Authentic Promise section imagery from Hindi Mahavidyalaya
import strongAcademicsImg from '@/assets/Promise/Strong academics for tomorrow.jpg'
import holisticMentorshipImg from '@/assets/Promise/Holistic mentorship & campus vitality.jpg'
import careerPathwaysImg from '@/assets/Promise/Career pathways & global enterprise.jpg'
import heritageLanguageImg from '@/assets/Promise/Heritage, language & national pride.jpg'
import inclusiveEducationImg from '@/assets/Promise/Inclusive education for all learners.jpg'

interface PromiseSlide {
  id: number
  title: string
  highlight: string
  kicker: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
}

const slides: PromiseSlide[] = [
  {
    id: 1,
    title: 'Strong Academics',
    highlight: 'for Tomorrow',
    kicker: 'LEARN · Autonomous University Curriculum',
    description:
      'Modern autonomous syllabus affiliated with Osmania University, continuous evaluation, and dedicated research-oriented faculty mentors guiding you every step.',
    image: strongAcademicsImg,
    ctaText: 'Explore Academics',
    ctaLink: '#academics',
  },
  {
    id: 2,
    title: 'Holistic Mentorship',
    highlight: '& Campus Vitality',
    kicker: 'THRIVE · NCC, NSS & Student Clubs',
    description:
      'A vibrant collegiate ecosystem fostering student leadership, national cadet service, cultural festivals, sports tournaments, and lifelong camaraderie.',
    image: holisticMentorshipImg,
    ctaText: 'Explore Campus',
    ctaLink: '#campus-gallery',
  },
  {
    id: 3,
    title: 'Career Pathways',
    highlight: '& Global Enterprise',
    kicker: 'LEAD · Top Corporate Placements',
    description:
      'From day one, practical industry internships, on-campus corporate recruitment drives, and an influential 40,000+ alumni network prepare you to lead with confidence.',
    image: careerPathwaysImg,
    ctaText: 'View Placements',
    ctaLink: '#our-recruiters',
  },
  {
    id: 4,
    title: 'Heritage & Language',
    highlight: '& National Pride',
    kicker: 'INSPIRE · Multilingual Scholastic Forum',
    description:
      'Rooted in 60+ years of multilingual heritage and national Hindi scholarship, empowering student voices in national debate forums, literature, and translation initiatives.',
    image: heritageLanguageImg,
    ctaText: 'Our Legacy',
    ctaLink: '#about',
  },
  {
    id: 5,
    title: 'Inclusive Education',
    highlight: 'for All Learners',
    kicker: 'EMPOWER · Scholarships & Merit Grants',
    description:
      'Affordable higher education backed by central and state post-matric scholarships, merit fee concessions, and an active collegiate women empowerment cell.',
    image: inclusiveEducationImg,
    ctaText: 'Apply for Admission',
    ctaLink: '#admissions',
  },
]

export default function PromiseSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Smoothly glide viewport to display the starting card a little bit down, eliminating empty top space
  const scrollToStartingCard = useCallback(() => {
    const el = document.getElementById('promise')
    if (!el) return

    // Offset of +18 scrolls past any top gap so the starting card sits neatly in view
    const targetOffset = 18

    // 1. Lenis smooth scroll
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: unknown, opts: unknown) => void } }).__lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(el, { offset: targetOffset, duration: 0.75 })
      return
    }

    // 2. Native fallback
    const rect = el.getBoundingClientRect()
    const targetY = window.scrollY + rect.top + targetOffset
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    })
  }, [])

  const goTo = useCallback(
    (idx: number, shouldScroll = true) => {
      setActiveIndex((idx + slides.length) % slides.length)
      setAnimKey((prev) => prev + 1)
      if (shouldScroll) {
        // Run on next animation frame so React render state doesn't cancel scroll
        requestAnimationFrame(() => {
          scrollToStartingCard()
        })
      }
    },
    [scrollToStartingCard]
  )

  const next = useCallback(() => goTo(activeIndex + 1, true), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1, true), [activeIndex, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev])

  const slide = slides[activeIndex]

  return (
    <section
      id="promise"
      ref={sectionRef}
      className="relative w-full pt-8 sm:pt-10 pb-8 sm:pb-10 bg-white text-slate-800 overflow-hidden select-none scroll-mt-14"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#1e1b4b 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 justify-center mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#ea580c]">
              OUR PROMISE
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1e1b4b] leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Why Hindi Mahavidyalaya?
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
            Five core pillars that define our 60-year educational legacy.
          </p>
        </div>

        {/* Editorial Slider Container matching Kathy Kato layout */}
        <div className="editorial-slider-container relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-4 items-center" key={animKey}>
            {/* Desktop Left Overlapping Title Column */}
            <div className="hidden md:block md:col-span-4 z-20 -mr-10">
              <div className="editorial-intro p-6 sm:p-8 lg:p-10 bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-slate-100">
                <div className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider mb-2">
                  {slide.kicker}
                </div>
                <h3
                  className="editorial-title text-2xl lg:text-4xl font-extrabold text-[#1e1b4b] leading-[1.15]"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  <span className="text-[#1e1b4b]">{slide.title}</span>{' '}
                  <span className="text-[#ea580c] underline decoration-[#ea580c]/40 underline-offset-4">
                    {slide.highlight}
                  </span>
                </h3>
              </div>
            </div>

            {/* Right Image + Description Container */}
            <div className="col-span-1 md:col-span-8 z-10 w-full">
              {/* Image Holder with revealRight Wipe Effect */}
              <div className="editorial-image-holder relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/9] max-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                {/* Wipe Cover Mask */}
                <div className="editorial-reveal-cover absolute inset-0 bg-white z-10 pointer-events-none" />

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Counter Pill */}
                <div className="absolute top-4 right-4 z-20 bg-slate-950/70 backdrop-blur-md text-white text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/20">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
              </div>

              {/* Mobile Title View (Visible only on mobile screens) */}
              <div className="block md:hidden mt-4">
                <div className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider mb-1">
                  {slide.kicker}
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#1e1b4b] leading-tight"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  <span>{slide.title}</span>{' '}
                  <span className="text-[#ea580c] underline decoration-[#ea580c]/40 underline-offset-4">
                    {slide.highlight}
                  </span>
                </h3>
              </div>

              {/* Description & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 sm:mt-5">
                <p className="editorial-description text-xs sm:text-sm md:text-base text-slate-600 max-w-xl leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex-shrink-0">
                  <a
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e1b4b] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Architectural Hairline Controls (matching provided code) */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200/80">
            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer border-none p-0 ${i === activeIndex
                    ? 'w-8 h-2 bg-[#ea580c]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-500'
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Hairline Previous / Next Box Buttons */}
            <div className="editorial-controls flex items-center">
              <button
                type="button"
                onClick={prev}
                className="editorial-btn previous"
                aria-label="Previous slide"
                title="Previous slide"
              >
                <span className="editorial-icon arrow-left" />
              </button>
              <button
                type="button"
                onClick={next}
                className="editorial-btn next"
                aria-label="Next slide"
                title="Next slide"
              >
                <span className="editorial-icon arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded CSS Animations matching provided CodePen */}
      <style>{`
        /* Card Lift / Move Up on Navigation */
        .editorial-slider-container {
          animation: editorialCardMoveUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes editorialCardMoveUp {
          0% {
            opacity: 0.85;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Reveal Wipe Mask Animation */
        .editorial-reveal-cover {
          transform-origin: 100% 50%;
          animation: editorialRevealRight 0.85s cubic-bezier(0.23, 1, 0.75, 1) forwards;
        }

        @keyframes editorialRevealRight {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }

        /* Desktop Title Fade In Left */
        .editorial-intro {
          animation: editorialFadeInLeft 0.75s 0.25s ease forwards;
          opacity: 0;
        }

        @keyframes editorialFadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Description Fade In */
        .editorial-description {
          animation: editorialFadeIn 0.8s 0.35s ease forwards;
          opacity: 0;
        }

        @keyframes editorialFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Hairline Boxy Controls matching Kathy Kato CSS */
        .editorial-controls {
          display: flex;
        }

        .editorial-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          background: #ffffff;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
          color: #1e1b4b;
        }

        .editorial-btn.previous {
          border: 1px solid #cbd5e1;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        .editorial-btn.next {
          border-top: 1px solid #cbd5e1;
          border-right: 1px solid #cbd5e1;
          border-bottom: 1px solid #cbd5e1;
          border-left: none;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        .editorial-btn:hover {
          background: #1e1b4b;
          color: #ffffff;
          border-color: #1e1b4b;
        }

        .editorial-icon {
          position: relative;
          width: 20px;
          height: 2px;
          background-color: currentColor;
          transition: transform 0.2s ease;
        }

        .editorial-btn:hover .editorial-icon {
          transform: scale(1.25);
        }

        .editorial-icon.arrow-left::before {
          content: '';
          position: absolute;
          left: 1px;
          top: -4px;
          width: 9px;
          height: 9px;
          border-top: solid 2px currentColor;
          border-right: solid 2px currentColor;
          transform: rotate(-135deg);
        }

        .editorial-icon.arrow-right::before {
          content: '';
          position: absolute;
          right: 1px;
          top: -4px;
          width: 9px;
          height: 9px;
          border-top: solid 2px currentColor;
          border-right: solid 2px currentColor;
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  )
}
