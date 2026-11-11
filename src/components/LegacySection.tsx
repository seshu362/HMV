import { useEffect, useRef, useState } from 'react'

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [counts, setCounts] = useState({
    legacy: 0,
    departments: 0,
    mentors: 0,
    mentees: 0,
    alumni: 0,
  })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Smooth Count-Up Animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()
          const duration = 1800 // 1.8 seconds

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3)

            setCounts({
              legacy: Math.floor(ease * 60),
              departments: Math.floor(ease * 9),
              mentors: Math.floor(ease * 50),
              mentees: Math.floor(ease * 3937),
              alumni: Math.floor(ease * 40000),
            })

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCounts({
                legacy: 60,
                departments: 9,
                mentors: 50,
                mentees: 3937,
                alumni: 40000,
              })
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section
      id="legacy"
      ref={sectionRef}
      className="relative pt-4 sm:pt-6 md:pt-8 pb-32 sm:pb-40 md:pb-48 bg-white overflow-hidden"
    >
      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Tag badge */}
        <div className="inline-flex items-center gap-2 justify-center">
          <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff5722]">
            WHAT WE HAVE
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e1b4b] tracking-tight mt-3">
          Six decades of shaping learners
        </h2>

        {/* Subtitle */}
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          A legacy built by mentors, carried forward by thousands of students and alumni.
        </p>
      </div>

      {/* Cards Layout - Matching Figma 100% */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* Big Orange Card: Years of Legacy */}
          <div className="md:col-span-5 bg-[#ff5722] text-white rounded-3xl p-7 sm:p-9 shadow-xl shadow-orange-500/15 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Tag */}
            <div>
              <span className="text-white/80 text-[11px] font-bold tracking-widest uppercase">
                YEARS OF LEGACY
              </span>
            </div>

            {/* Giant Display Stat */}
            <div className="my-6 sm:my-8">
              <span className="text-white font-extrabold text-7xl sm:text-8xl tracking-tight leading-none">
                {counts.legacy}+
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="text-white/95 text-sm sm:text-base leading-relaxed font-normal">
                Over six decades of education rooted in values, open to every learner.
              </p>
            </div>
          </div>

          {/* 2x2 Grid of 4 White Stat Cards */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            
            {/* 1. Departments */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  DEPARTMENTS
                </span>
              </div>
              <div className="my-3">
                <span className="text-[#1e1b4b] text-4xl sm:text-5xl font-extrabold tracking-tight">
                  {counts.departments < 10 ? `0${counts.departments}` : counts.departments}
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-snug">
                Academic departments offering a range of programmes
              </p>
            </div>

            {/* 2. Mentors */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  MENTORS
                </span>
              </div>
              <div className="my-3">
                <span className="text-[#1e1b4b] text-4xl sm:text-5xl font-extrabold tracking-tight">
                  {counts.mentors}
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-snug">
                Dedicated mentors guiding students every day
              </p>
            </div>

            {/* 3. Mentees */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  MENTEES
                </span>
              </div>
              <div className="my-3">
                <span className="text-[#1e1b4b] text-4xl sm:text-5xl font-extrabold tracking-tight">
                  {counts.mentees.toLocaleString()}
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-snug">
                Students currently supported by our mentors
              </p>
            </div>

            {/* 4. Alumni */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  ALUMNI
                </span>
              </div>
              <div className="my-3">
                <span className="text-[#1e1b4b] text-4xl sm:text-5xl font-extrabold tracking-tight">
                  {counts.alumni.toLocaleString()}
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-snug">
                Graduates who have passed through our college
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Convocation Graduates Background Image with Soft Vignette/Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 md:h-96 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/convocation_graduates.png"
          alt="Hindi Mahavidyalaya Graduates Convocation"
          className="w-full h-full object-cover object-top opacity-85"
        />
        {/* Soft gradient masks to blend cleanly into white background */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  )
}
