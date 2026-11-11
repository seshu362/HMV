import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './AlumniCorner.css'

const triggers: ('two' | 'three' | 'four')[] = ['two', 'three', 'four']

export default function AlumniCorner() {
  const [activeTrigger, setActiveTrigger] = useState<'two' | 'three' | 'four'>('two')
  const [animateHeading, setAnimateHeading] = useState(false)
  const [headingKey, setHeadingKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const currentIndex = triggers.indexOf(activeTrigger)

  const setTrigger = (id: 'two' | 'three' | 'four', e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setActiveTrigger(id)
    if (id === 'two') {
      setAnimateHeading(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeadingKey((prev) => prev + 1)
          setAnimateHeading(true)
        })
      })
    }
    const radio = document.getElementById(`alumni-${id}`) as HTMLInputElement | null
    if (radio) {
      radio.checked = true
      radio.dispatchEvent(new Event('change', { bubbles: true }))
      radio.click()
    }
  }

  const handlePrev = (e?: React.MouseEvent) => {
    if (currentIndex > 0) {
      setTrigger(triggers[currentIndex - 1], e)
    }
  }

  const handleNext = (e?: React.MouseEvent) => {
    if (currentIndex < triggers.length - 1) {
      setTrigger(triggers[currentIndex + 1], e)
    }
  }

  // Trigger 3D heading effect on initial scroll/open and whenever section enters viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateHeading(false)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setHeadingKey((prev) => prev + 1)
              setAnimateHeading(true)
            })
          })
        } else {
          setAnimateHeading(false)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Keyboard navigation: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowRight' && currentIndex < triggers.length - 1) {
        setTrigger(triggers[currentIndex + 1])
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setTrigger(triggers[currentIndex - 1])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  return (
    <section
      ref={sectionRef}
      id="alumni-corner"
      className="relative w-full overflow-hidden bg-[#e2e2f5] py-14 sm:py-20 select-none border-t border-slate-200/60"
    >
      {/* Section Header: Our Students / Alumni Corner */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8 relative z-20">
        <div className="inline-flex items-center gap-2 justify-center mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
            OUR STUDENTS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b4b] tracking-tight">
          Alumni Corner
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
          Where the 2018–21 batch is working today.
        </p>
      </div>

      {/* 3D Magazine Publication Layout Structure with OUTSIDE Navigation Arrows */}
      <div className="relative max-w-[1340px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Outside Left Navigation Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute left-0 sm:left-2 lg:left-3 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-2xl border-2 border-white transition-all cursor-pointer ${
            currentIndex === 0
              ? 'opacity-25 cursor-not-allowed pointer-events-none'
              : 'hover:scale-110 active:scale-95 shadow-orange-500/50'
          }`}
          aria-label="Previous spread"
          title="Previous spread"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Outside Right Navigation Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === triggers.length - 1}
          className={`absolute right-0 sm:right-2 lg:right-3 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-2xl border-2 border-white transition-all cursor-pointer ${
            currentIndex === triggers.length - 1
              ? 'opacity-25 cursor-not-allowed pointer-events-none'
              : 'hover:scale-110 active:scale-95 shadow-orange-500/50'
          }`}
          aria-label="Next spread"
          title="Next spread"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        <div className="alumni-corner-wrapper relative">
          <div className="pages">
            {/* Radio Trigger Inputs */}
            <input
              id="alumni-one"
              type="radio"
              name="trigger-alumni"
              checked={false}
              readOnly
              style={{ display: 'none' }}
            />
            <input
              id="alumni-two"
              type="radio"
              name="trigger-alumni"
              checked={activeTrigger === 'two'}
              onChange={() => setActiveTrigger('two')}
            />
            <input
              id="alumni-three"
              type="radio"
              name="trigger-alumni"
              checked={activeTrigger === 'three'}
              onChange={() => setActiveTrigger('three')}
            />
            <input
              id="alumni-four"
              type="radio"
              name="trigger-alumni"
              checked={activeTrigger === 'four'}
              onChange={() => setActiveTrigger('four')}
            />

            {/* Former Cover Spread: Hidden placeholder for exact 3D page count */}
            <div
              className="pages_page"
              aria-hidden="true"
              style={{ opacity: 0, pointerEvents: 'none', visibility: 'hidden' }}
            >
              <div className="pages_page__inner" />
            </div>
            <div
              className="pages_page"
              aria-hidden="true"
              style={{ opacity: 0, pointerEvents: 'none', visibility: 'hidden' }}
            >
              <div className="pages_page__inner" />
            </div>

            {/* PAGE 3: SPREAD 2-3 (LEFT - CRAIG BOTOSH) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Alumni Corner</div>
                <div className="pagenumber">2 3</div>
                <div className="content">
                  <div className="content_picture">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85"
                      alt="Craig Botosh - BATCH 18-21"
                    />
                  </div>
                  <div className="content_offset">
                    <div className="student-stars">★★★★★</div>
                    <h2>Craig Botosh</h2>
                    <p>
                      BATCH 18–21 · Personal Shopper – Shoppers Stop · "As one of the top institutions
                      in Hyderabad, Telangana, Hindi Mahavidyalaya shaped me from day one to face the
                      corporate world with confidence and professional leadership."
                    </p>
                  </div>
                  <h1
                    key={headingKey}
                    className={animateHeading ? 'heading-animated-3d' : 'heading-hidden-3d'}
                  >
                    <span>A</span>
                    <span>l</span>
                    <span>u</span>
                    <span>m</span>
                    <span>n</span>
                    <span>i</span>
                    <span>&nbsp;</span>
                    <span>C</span>
                    <span>o</span>
                    <span>r</span>
                    <span>n</span>
                    <span>e</span>
                    <span>r</span>
                    <br />
                    <span>B</span>
                    <span>a</span>
                    <span>t</span>
                    <span>c</span>
                    <span>h</span>
                    <span>&nbsp;</span>
                    <span>2</span>
                    <span>0</span>
                    <span>1</span>
                    <span>8</span>
                    <span>-</span>
                    <span>2</span>
                    <span>0</span>
                    <span>2</span>
                    <span>1</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* PAGE 4: SPREAD 2-3 (RIGHT - ANN MANGO) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="hamburger">
                  <div className="hamburger_part" />
                  <div className="hamburger_part" />
                  <div className="hamburger_part" />
                </div>
                <div className="bg" />
                <div className="footer">
                  <i className="fab fa-google-plus-g" />
                  <i className="fas fa-retweet" />
                  <i className="far fa-heart" />
                  <i className="far fa-share-square" />
                </div>
                <div className="content">
                  <div className="content_quote">
                    <h5>
                      <span className="quo">
                        <i>"</i>
                      </span>
                      <span>I feel proud that I was a student of Hindi Mahavidyalaya.</span>
                      <span>The institute gave me solid knowledge and professional ethics.</span>
                      <span className="name">Ann Mango</span>
                      <span className="auth">Regional Manager - Reliance Retail · BATCH 18–21 · ★★★★★</span>
                      <span className="quo">"</span>
                    </h5>
                  </div>
                  <div className="content_picture">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"
                      alt="Ann Mango - BATCH 18-21"
                    />
                  </div>
                  <h1
                    key={`right-${headingKey}`}
                    className={animateHeading ? 'heading-animated-3d' : 'heading-hidden-3d'}
                  >
                    <span>L</span>
                    <span>e</span>
                    <span>a</span>
                    <span>d</span>
                    <span>e</span>
                    <span>r</span>
                    <span>s</span>
                    <span>h</span>
                    <span>i</span>
                    <span>p</span>
                    <br />
                    <span>&amp;</span>
                    <span>&nbsp;</span>
                    <span>E</span>
                    <span>x</span>
                    <span>c</span>
                    <span>e</span>
                    <span>l</span>
                    <span>l</span>
                    <span>e</span>
                    <span>n</span>
                    <span>c</span>
                    <span>e</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* PAGE 5: SPREAD 4-5 (LEFT - MARTIN CULHANE) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Alumni Corner</div>
                <div className="pagenumber">4 5</div>
                <div className="content">
                  <div className="content_center">
                    <div className="student-stars">★★★★★</div>
                    <h4>
                      "Hindi Mahavidyalaya has the most innovative methodology for building the
                      career of its students. From the time of inception, the team has a clear
                      mindset to give industries market-ready talent."
                    </h4>
                    <h6>Martin Culhane · Sr. HR Manager – Capgemini (BATCH 18–21)</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE 6: SPREAD 4-5 (RIGHT - MARTIN CULHANE SPREAD) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="hamburger">
                  <div className="hamburger_part" />
                  <div className="hamburger_part" />
                  <div className="hamburger_part" />
                </div>
                <div className="bg" />
                <div className="content_centerimage">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85"
                    alt="Martin Culhane - BATCH 18-21"
                  />
                </div>
                <div className="content">
                  <div className="content_center right">
                    <div className="student-stars">★★★★★</div>
                    <h4>
                      "The campus environment, guest speaker seminars, and corporate drives gave me
                      the ideal launchpad for multinational human resource leadership."
                    </h4>
                    <h6>Talent Leadership &amp; Corporate Mentorship · Capgemini</h6>
                  </div>
                </div>
                <div className="footer">
                  <i className="fab fa-google-plus-g" />
                  <i className="fas fa-retweet" />
                  <i className="far fa-heart" />
                  <i className="far fa-share-square" />
                </div>
              </div>
            </div>

            {/* PAGE 7: SPREAD 6-7 (LEFT - ALUMNI NETWORK & GLOBAL IMPACT) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Alumni Corner</div>
                <div className="pagenumber">6 7</div>
                <div className="content">
                  <div className="content_section">
                    <h2>15,000+ Alumni</h2>
                    <p>
                      BATCH 18–21 &amp; Beyond · Leading in technology, finance, civil services, retail
                      management, and entrepreneurship across India and international hubs.
                    </p>
                  </div>
                  <div className="content_section">
                    <h2>Industry Mentorship</h2>
                    <p>
                      Senior alumni return regularly to conduct mock interviews, resume bootcamps, and
                      mentorship for graduating students preparing for campus drives.
                    </p>
                  </div>
                  <div className="content_section">
                    <h2>60+ Years Legacy</h2>
                    <p>
                      Honouring six decades of academic distinction, autonomous university syllabus,
                      NAAC accreditation, and transformative corporate career journeys.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE 8: SPREAD 6-7 (RIGHT - BACK COVER) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="hamburger">
                  <div className="hamburger_part" />
                  <div className="hamburger_part" />
                  <div className="hamburger_part" />
                </div>
                <div className="bg" />
                <div className="content_centerimage">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=85"
                    alt="HMV Alumni Community"
                  />
                </div>
                <div className="content">
                  <div className="content_center right">
                    <div className="student-stars">★★★★★</div>
                    <h4>"Lifelong connection, global leadership, and transformative alumni success."</h4>
                    <h6>Hindi Mahavidyalaya Alumni Association</h6>
                  </div>
                </div>
                <div className="footer">
                  <i className="fab fa-google-plus-g" />
                  <i className="fas fa-retweet" />
                  <i className="far fa-heart" />
                  <i className="far fa-share-square" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

