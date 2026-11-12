import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import ParticleField from './ParticleField'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react'

// Original collegiate banners from Hindi Mahavidyalaya
import banner1 from '../assets/Banners/banner1.jpg'
import banner2 from '../assets/Banners/banner2.jpeg'
import banner3 from '../assets/Banners/banner3.jpg'
import banner4 from '../assets/Banners/banner4.jpg'
import banner5 from '../assets/Banners/banner5.jpg'
import banner6 from '../assets/Banners/banner6.jpg'
import banner7 from '../assets/Banners/banner7.jpg'
import banner8 from '../assets/Banners/banner8.jpg'

const slides = [
  {
    id: 1,
    title: 'Welcome to Hindi Mahavidyalaya',
    tagline: 'Autonomous & NAAC Re-Accredited Institution in Nallakunta, Hyderabad, Affiliated to Osmania University.',
    image: banner1,
    alt: 'Hindi Mahavidyalaya Main Campus Entrance Arch in Nallakunta, Hyderabad',
  },
  {
    id: 2,
    title: '60 Years of Academic Distinction',
    tagline: 'Distinguished academic leadership, Chancellor procession and NCC Guard of Honour upholding traditions of excellence.',
    image: banner2,
    alt: 'Convocation Academic Procession with NCC Cadets and University Dignitaries',
    objectPosition: 'center top',
  },
  {
    id: 3,
    title: 'Dedicated & Renowned Faculty',
    tagline: 'Empowering learners with visionary mentorship, deep scholastic values, and holistic educational pedagogy.',
    image: banner3,
    alt: 'Distinguished Faculty Members of Hindi Mahavidyalaya',
  },
  {
    id: 4,
    title: 'Conferring Degrees of Distinction',
    tagline: 'Proud graduates stepping forward into promising corporate, scientific, and research leadership careers.',
    image: banner4,
    alt: 'Graduation Day Ceremony at Hindi Mahavidyalaya with Degree Recipients',
  },
  {
    id: 5,
    title: 'Champions in Sports & Athletics',
    tagline: 'State and university championship trophies in fencing, athletics, and collegiate competitive sports.',
    image: banner5,
    alt: 'Hindi Mahavidyalaya Sports Tournament Champions with University Trophies',
  },
  {
    id: 6,
    title: 'Vibrant Heritage & Cultural Celebrations',
    tagline: 'Fostering cultural unity, annual celebrations, fine arts, and rich Indian heritage on campus.',
    image: banner6,
    alt: 'Annual Cultural Celebration and Saraswati Pooja at Hindi Mahavidyalaya',
  },
  {
    id: 7,
    title: 'NSS & Community Social Leadership',
    tagline: 'Instilling civic responsibility, environmental awareness campaigns, and community empowerment.',
    image: banner7,
    alt: 'National Service Scheme (NSS) Student Outreach and Social Awareness Campaign',
  },
  {
    id: 8,
    title: 'NCC Guard of Honour & Leadership',
    tagline: 'National Cadet Corps instilling unwavering discipline, character, patriotism, and leadership.',
    image: banner8,
    alt: 'NCC Cadets Guard of Honour Welcoming University Chancellor and Chief Guests',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef(0)
  const isTransitioningRef = useRef(false)

  // Keep ref synchronized
  useEffect(() => {
    currentRef.current = current
  }, [current])

  // Initial title entrance animation
  useEffect(() => {
    const slideEls = containerRef.current?.querySelectorAll('.slideshow .slide')
    const initialTitle = slideEls?.[0]?.querySelector('.slide-title')
    if (initialTitle) {
      gsap.fromTo(
        initialTitle,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15, force3D: true }
      )
    }
  }, [])

  // Core transition: Bars go down one by one, active slide swaps, bars come up one by one
  const triggerSlide = useCallback((targetIndex: number) => {
    if (isTransitioningRef.current || targetIndex === currentRef.current) return
    isTransitioningRef.current = true

    const bars = barsRef.current?.querySelectorAll('.bar')
    const slideEls = containerRef.current?.querySelectorAll('.slideshow .slide')
    const currentSlide = slideEls?.[currentRef.current]
    const targetSlide = slideEls?.[targetIndex]
    const currentTitle = currentSlide?.querySelector('.slide-title')
    const targetTitle = targetSlide?.querySelector('.slide-title')

    if (!bars || bars.length === 0) {
      setCurrent(targetIndex)
      currentRef.current = targetIndex
      isTransitioningRef.current = false
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false
      }
    })

    // 1. Current text floats up and fades (with 3D hardware transform)
    if (currentTitle) {
      tl.to(currentTitle, { y: -40, opacity: 0, duration: 0.4, ease: 'power2.in', force3D: true }, 0)
    }

    // 2. Bars go DOWN one by one from the top (scaleY 0 -> 1, GPU accelerated)
    tl.set(bars, { transformOrigin: 'top center', scaleY: 0, force3D: true }, 0)
    tl.to(
      bars,
      {
        scaleY: 1,
        duration: 0.7,
        ease: 'power4.inOut',
        stagger: 0.065,
        force3D: true
      },
      0.04
    )

    // 3. At apex when screen is 100% black: swap the slides cleanly without CSS transition delay
    tl.call(() => {
      slideEls?.forEach((s, idx) => {
        const el = s as HTMLElement
        el.style.opacity = idx === targetIndex ? '1' : '0'
        el.style.zIndex = idx === targetIndex ? '10' : '0'
        el.style.pointerEvents = idx === targetIndex ? 'auto' : 'none'
      })
      setCurrent(targetIndex)
      currentRef.current = targetIndex
    })

    // 4. Brief 50ms hold so new photo is completely rendered with zero seam
    tl.to({}, { duration: 0.05 })

    // 5. Bars COME UP one by one to reveal the new slide (scaleY 1 -> 0 from top)
    tl.to(
      bars,
      {
        scaleY: 0,
        duration: 0.7,
        ease: 'power4.inOut',
        stagger: 0.065,
        force3D: true
      }
    )

    // 6. New slide's title and subtitle glide up into view
    if (targetTitle) {
      tl.fromTo(
        targetTitle,
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', force3D: true },
        '-=0.4'
      )
    }
  }, [])

  // Auto slide interval (4 seconds per banner, pauses on hover)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      const nextIndex = (currentRef.current + 1) % slides.length
      triggerSlide(nextIndex)
    }, 4000)
    return () => clearInterval(interval)
  }, [isPaused, triggerSlide])

  const handlePrev = () => {
    const prevIndex = currentRef.current === 0 ? slides.length - 1 : currentRef.current - 1
    triggerSlide(prevIndex)
  }

  const handleNext = () => {
    const nextIndex = (currentRef.current + 1) % slides.length
    triggerSlide(nextIndex)
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[calc(100vh-125px)] min-h-[580px] flex items-center justify-center overflow-hidden bg-[#111] select-none text-white"
    >
      {/* 1. Slideshow Container */}
      <div className="slideshow absolute inset-0 w-full h-full bg-[#111] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="slide absolute inset-0 w-full h-full overflow-hidden"
            style={{
              opacity: index === 0 ? 1 : 0,
              zIndex: index === 0 ? 10 : 0,
              pointerEvents: index === 0 ? 'auto' : 'none'
            }}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover select-none"
              style={{
                objectPosition: (slide as any).objectPosition || 'center center',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />

            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45" />

            {/* Slide Title & Content Container */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div
                className="slide-title max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center pointer-events-auto"
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.08] mb-4 sm:mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {slide.tagline}
                </p>

                <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
                  <a
                    href="#admissions"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-orange-950/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#academics"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-black/40 hover:bg-black/60 border border-white/60 hover:border-white text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all flex items-center justify-center"
                  >
                    <span>Explore programmes</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Three.js Subtle Particle Field */}
      <ParticleField />

      {/* 3. Transition Bars: CSS Grid 8 columns with 3D hardware acceleration and zero layout jitter */}
      <div
        ref={barsRef}
        className="bars absolute inset-0 z-20 grid grid-cols-8 w-full h-full pointer-events-none overflow-hidden"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bar w-full h-full bg-[#111]"
            style={{
              transform: 'scaleY(0)',
              transformOrigin: 'top center',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d'
            }}
          />
        ))}
      </div>

      {/* 4. Left & Right Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/30 hover:border-white text-white/90 hover:text-white backdrop-blur-md transition-all flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/30 hover:border-white text-white/90 hover:text-white backdrop-blur-md transition-all flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* 5. Navigation Dots */}
      <div className="nav-dots absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 m-0 p-0 list-none bg-black/40 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => triggerSlide(idx)}
            className={`relative block w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current
                ? 'bg-[#ea580c] scale-125 shadow-[0_0_8px_rgba(234,88,12,0.8)]'
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* 6. Diamond Jubilee 60 Years Medallion Badge */}
      <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-30 hidden md:flex flex-col items-center select-none group cursor-pointer transition-transform duration-300 hover:scale-105">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-2xl shadow-black/70">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0b3164] via-[#082348] to-[#041226] border border-amber-300/40 p-1 flex flex-col items-center justify-center text-center">
            <span className="text-[7px] sm:text-[8px] font-bold tracking-widest text-amber-300 uppercase">
              Diamond Jubilee
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-200 leading-none my-0.5 tracking-tight font-serif">
              60
            </span>
            <span className="text-[7px] tracking-wider text-white/90 uppercase font-semibold">
              Years
            </span>
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] border border-amber-300/40 rounded-full text-[7px] sm:text-[8px] font-bold text-white uppercase tracking-wider shadow-md whitespace-nowrap">
            हिन्दी महाविद्यालय
          </div>
        </div>
      </div>
    </section>
  )
}
