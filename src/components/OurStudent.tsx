import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, ArrowRight } from 'lucide-react'
import student1 from '@/assets/Students/Pexels Photo by ab_h_i s_h_ek_09.png'
import student2 from '@/assets/Students/Pexels Photo by Anil  Sharma.png'
import student3 from '@/assets/Students/Pexels Photo by Utpal Adhikary.png'
import student4 from '@/assets/Students/Pexels Photo by Vijay Meena.png'
import sportsChampionImg from '@/assets/Achievements/Ou tournament 2.jpg'
import convocationImg from '@/assets/Achievements/0015.jpeg'
import seminarImg from '@/assets/Achievements/0022.jpeg'
import gateImg from '@/assets/About/0002.jpeg'
import banner002 from '@/assets/Banners/Banner002.jpg'
import banner003 from '@/assets/Banners/Banner003.jpg'
import './OurStudent.css'

export default function OurStudent() {
  const [openPages, setOpenPages] = useState<boolean[]>([false, false, false, false, false])
  const sceneRef = useRef<HTMLDivElement>(null)

  const anyOpen = openPages.some(Boolean)
  const openCount = openPages.filter(Boolean).length

  // Toggle page
  const togglePage = useCallback((index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setOpenPages((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }, [])

  // Close all pages (back to cover)
  const closeAll = useCallback(() => {
    setOpenPages([false, false, false, false, false])
  }, [])

  // Next page
  const flipNext = useCallback(() => {
    const firstClosed = openPages.findIndex((open) => !open)
    if (firstClosed !== -1) {
      setOpenPages((prev) => {
        const next = [...prev]
        next[firstClosed] = true
        return next
      })
    }
  }, [openPages])

  // Previous page
  const flipPrev = useCallback(() => {
    for (let i = openPages.length - 1; i >= 0; i--) {
      if (openPages[i]) {
        setOpenPages((prev) => {
          const next = [...prev]
          next[i] = false
          return next
        })
        break
      }
    }
  }, [openPages])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowRight') flipNext()
      if (e.key === 'ArrowLeft') flipPrev()
      if (e.key === 'Escape') closeAll()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [flipNext, flipPrev, closeAll])

  return (
    <section id="our-student" className="student-section-wrapper relative w-full pt-8 sm:pt-10 pb-6 sm:pb-8 select-none">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-6 relative z-20">
        <div className="inline-flex items-center gap-2 justify-center mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#ea580c]">
            OUR STUDENTS
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          Student Experience
        </h2>

        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
          Flip through our 3D yearbook to discover student journeys, campus life &amp; corporate placements.
        </p>
      </div>

      {/* 3D Book Scene */}
      <div
        ref={sceneRef}
        className="scene cursor-pointer"
        onClick={closeAll}
      >
        {/* Background Typography */}
        <div className="bg-typography">
          <span>Student</span>
          <span>Experience</span>
        </div>

        {/* 3D Book Container */}
        <div
          className={`galeria-book-3d ${anyOpen ? 'book-open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ========================================================
              LEAF 0 (--i: 0): Cover & Inside Page 1
              ======================================================== */}
          <div
            className={`galeria-book-3d__item ${openPages[0] ? 'is-open' : ''}`}
            style={{ '--i': 0 } as React.CSSProperties}
            onClick={(e) => togglePage(0, e)}
            title="Page 1: Book Cover"
          >
            {/* Front 0: Book Cover */}
            <div className="page-wrap front">
              <img
                src={banner003}
                alt="HMV Students"
                className="page-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 p-4 sm:p-5 flex flex-col justify-between text-center border border-white/20 rounded-none">
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                  ESTD. 1965 · AUTONOMOUS
                </div>

                <div>
                  <div className="w-10 h-0.5 bg-[#ea580c] mx-auto mb-2.5" />
                  <h3
                    className="text-lg sm:text-xl font-black text-white uppercase tracking-wider leading-tight"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Student
                    <br />
                    <span className="text-[#ea580c]">Chronicle</span>
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-slate-300 tracking-widest uppercase mt-1.5">
                    Batch 2020 — 2024
                  </p>
                  <div className="w-10 h-0.5 bg-[#ea580c] mx-auto mt-2.5" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-[#ea580c] hover:bg-[#c2410c] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105">
                    <span>Click to Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Back 0: Inside Cover - Gate */}
            <div className="page-wrap back">
              <img
                src={gateImg}
                alt="Campus Entrance"
                className="page-img"
              />
              <div className="page-overlay">
                <span className="page-kicker">HERITAGE CAMPUS</span>
                <h4 className="page-name">A Legacy of Trust</h4>
                <p className="page-tag">Affiliated to Osmania University</p>
              </div>
            </div>
          </div>

          {/* ========================================================
              LEAF 1 (--i: 1): Kavya Photo & Convocation
              ======================================================== */}
          <div
            className={`galeria-book-3d__item ${openPages[1] ? 'is-open' : ''}`}
            style={{ '--i': 1 } as React.CSSProperties}
            onClick={(e) => togglePage(1, e)}
            title="Page 2: Kavya Reddy & Convocation"
          >
            {/* Front 1: Kavya Reddy */}
            <div className="page-wrap front">
              <img
                src={student1}
                alt="Kavya Reddy"
                className="page-img"
              />
              <div className="page-overlay">
                <span className="page-kicker">LEADERSHIP &amp; COMMERCE</span>
                <h4 className="page-name">Kavya Reddy</h4>
                <p className="page-tag">B.Com · Placed at Deloitte</p>
              </div>
            </div>

            {/* Back 1: Convocation Degrees */}
            <div className="page-wrap back">
              <img
                src={convocationImg}
                alt="Convocation Ceremony"
                className="page-img"
              />
              <div className="page-overlay">
                <span className="page-kicker">ACADEMIC HONOURS</span>
                <h4 className="page-name">University Gold Medalists</h4>
                <p className="page-tag">Honours conferred at Annual Convocation</p>
              </div>
            </div>
          </div>

          {/* ========================================================
              LEAF 2 (--i: 2): Rahul Photo & Symposium
              ======================================================== */}
          <div
            className={`galeria-book-3d__item ${openPages[2] ? 'is-open' : ''}`}
            style={{ '--i': 2 } as React.CSSProperties}
            onClick={(e) => togglePage(2, e)}
            title="Page 3: Rahul Sharma & Innovation Labs"
          >
            {/* Front 2: Rahul Sharma */}
            <div className="page-wrap front">
              <img
                src={student2}
                alt="Rahul Sharma"
                className="page-img"
              />
              <div className="page-overlay">
                <span className="page-kicker">TECH &amp; INNOVATION</span>
                <h4 className="page-name">Rahul Sharma</h4>
                <p className="page-tag">B.Sc AI &amp; CS · Placed at Barclays</p>
              </div>
            </div>

            {/* Back 2: Auditorium Symposium */}
            <div className="page-wrap back">
              <img
                src={seminarImg}
                alt="Student Symposium"
                className="page-img"
              />
              <div className="page-overlay">
                <span className="page-kicker">CAMPUS VITALITY</span>
                <h4 className="page-name">National Student Seminars</h4>
                <p className="page-tag">Hands-on workshops &amp; industrial visits</p>
              </div>
            </div>
          </div>

          {/* ========================================================
              LEAF 3 (--i: 3): Pooja Photo & Sports Podium
              ======================================================== */}
          <div
            className={`galeria-book-3d__item ${openPages[3] ? 'is-open' : ''}`}
            style={{ '--i': 3 } as React.CSSProperties}
            onClick={(e) => togglePage(3, e)}
            title="Page 4: Pooja Verma & Sports Champions"
          >
            {/* Front 3: Pooja Verma */}
            <div className="page-wrap front">
              <img
                src={student3}
                alt="Pooja Verma"
                className="page-img"
              />
              <div className="page-overlay">
                <span className="page-kicker">MANAGEMENT &amp; DEBATE</span>
                <h4 className="page-name">Pooja Verma</h4>
                <p className="page-tag">B.B.A · Student Council Leader</p>
              </div>
            </div>

            {/* Back 3: Sports Podium */}
            <div className="page-wrap back">
              <img
                src={sportsChampionImg}
                alt="Sports Champions"
                className="page-img"
              />
              <div className="page-overlay">
                <span className="page-kicker">SPORTS &amp; NCC</span>
                <h4 className="page-name">Inter-University Champions</h4>
                <p className="page-tag">State athletic gold medalists &amp; NCC cadets</p>
              </div>
            </div>
          </div>

          {/* ========================================================
              LEAF 4 (--i: 4): Vijay Photo & Back Cover
              ======================================================== */}
          <div
            className={`galeria-book-3d__item ${openPages[4] ? 'is-open' : ''}`}
            style={{ '--i': 4 } as React.CSSProperties}
            onClick={(e) => togglePage(4, e)}
            title="Page 5: Amit Kumar & Back Cover"
          >
            {/* Front 4: Amit Kumar */}
            <div className="page-wrap front">
              <img
                src={student4}
                alt="Amit Kumar"
                className="page-img"
              />
              <div className="page-overlay">
                <span className="page-kicker">SCIENCE &amp; RESEARCH</span>
                <h4 className="page-name">Amit Kumar</h4>
                <p className="page-tag">B.Sc Data Science · Research Fellow</p>
              </div>
            </div>

            {/* Back 4: Back Cover */}
            <div className="page-wrap back">
              <img
                src={banner002}
                alt="HMV Building"
                className="page-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50 p-4 sm:p-5 flex flex-col justify-between text-center border border-white/20 rounded-none">
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                  DIAMOND JUBILEE YEAR
                </div>

                <div>
                  <div className="w-10 h-0.5 bg-[#ea580c] mx-auto mb-2" />
                  <h4
                    className="text-sm sm:text-base font-bold text-white uppercase"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Hindi Mahavidyalaya
                  </h4>
                  <p className="text-[10px] text-slate-300 mt-1">
                    40,000+ Alumni Worldwide
                  </p>
                  <div className="w-10 h-0.5 bg-[#ea580c] mx-auto mt-2" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <a
                    href="#admissions"
                    className="py-1.5 px-3 rounded-none bg-[#ea580c] hover:bg-[#c2410c] text-white text-[11px] font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer no-underline shadow-lg"
                  >
                    <span>Apply for Admission</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={closeAll}
                    className="py-1 px-3 rounded-none bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-semibold text-center transition-all border border-white/20 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Close Book</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Controls Bar */}
        <div className="book-controls-bar" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={flipPrev}
            disabled={!anyOpen}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${
              anyOpen
                ? 'bg-white/20 hover:bg-[#ea580c] text-white border-white/30 cursor-pointer shadow-lg hover:scale-105 active:scale-95'
                : 'bg-white/5 text-slate-600 border-white/10 cursor-not-allowed opacity-40'
            }`}
            aria-label="Previous Page"
            title="Previous Page (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Indicator */}
          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/15 text-xs text-white flex items-center gap-2 shadow-xl">
            <span className="font-mono font-bold text-[#ea580c] text-[11px]">
              {openCount === 0 ? 'Cover' : `Page ${openCount * 2} / 10`}
            </span>
            {anyOpen && (
              <>
                <span className="text-slate-600">·</span>
                <button
                  type="button"
                  onClick={closeAll}
                  className="text-[10px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer border-none bg-transparent p-0"
                >
                  <RotateCcw className="w-3 h-3 text-[#ea580c]" />
                  <span>Reset</span>
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={flipNext}
            disabled={openCount === openPages.length}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${
              openCount < openPages.length
                ? 'bg-white/20 hover:bg-[#ea580c] text-white border-white/30 cursor-pointer shadow-lg hover:scale-105 active:scale-95'
                : 'bg-white/5 text-slate-600 border-white/10 cursor-not-allowed opacity-40'
            }`}
            aria-label="Next Page"
            title="Next Page (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
