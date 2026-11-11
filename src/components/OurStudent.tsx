import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './OurStudent.css'

const triggers: ('two' | 'three' | 'four')[] = ['two', 'three', 'four']

export default function OurStudent() {
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
    const radio = document.getElementById(id) as HTMLInputElement | null
    if (radio) {
      radio.checked = true
      radio.dispatchEvent(new Event('change', { bubbles: true }))
      radio.click()
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
    <section ref={sectionRef} id="our-student" className="relative w-full overflow-hidden bg-[#e2e2f5] py-14 sm:py-20 select-none">
      {/* Section Header: Our Students / Student Experience */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8 relative z-20">
        <div className="inline-flex items-center gap-2 justify-center mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
            OUR STUDENTS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b4b] tracking-tight">
          Student Experience
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
          What the 2020–23 batch says about studying here.
        </p>
      </div>

      {/* 3D Magazine Publication Layout Structure with OUTSIDE Navigation Arrows */}
      <div className="relative max-w-[1340px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Outside Left Navigation Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute left-0 sm:left-2 lg:left-3 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-2xl border-2 border-white transition-all cursor-pointer ${currentIndex === 0
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
          className={`absolute right-0 sm:right-2 lg:right-3 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-2xl border-2 border-white transition-all cursor-pointer ${currentIndex === triggers.length - 1
            ? 'opacity-25 cursor-not-allowed pointer-events-none'
            : 'hover:scale-110 active:scale-95 shadow-orange-500/50'
            }`}
          aria-label="Next spread"
          title="Next spread"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        <div className="our-student-wrapper relative">
          <div className="pages">
            {/* Radio Trigger Inputs */}
            <input
              id="one"
              type="radio"
              name="trigger"
              checked={false}
              readOnly
              style={{ display: 'none' }}
            />
            <input
              id="two"
              type="radio"
              name="trigger"
              checked={activeTrigger === 'two'}
              onChange={() => setActiveTrigger('two')}
            />
            <input
              id="three"
              type="radio"
              name="trigger"
              checked={activeTrigger === 'three'}
              onChange={() => setActiveTrigger('three')}
            />
            <input
              id="four"
              type="radio"
              name="trigger"
              checked={activeTrigger === 'four'}
              onChange={() => setActiveTrigger('four')}
            />

            {/* Former Cover Spread: Removed as requested */}
            <div className="pages_page" aria-hidden="true" style={{ opacity: 0, pointerEvents: 'none', visibility: 'hidden' }}>
              <div className="pages_page__inner" />
            </div>
            <div className="pages_page" aria-hidden="true" style={{ opacity: 0, pointerEvents: 'none', visibility: 'hidden' }}>
              <div className="pages_page__inner" />
            </div>

            {/* PAGE 3: SPREAD 2-3 (LEFT - CRAIG BOTOSH) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Student Experience</div>
                <div className="pagenumber">2 3</div>
                <div className="content">
                  <div className="content_offset">
                    <div className="student-stars">★★★★★</div>
                    <h2>Craig Botosh</h2>
                    <p>
                      BATCH 20-23 · "Hindi Mahavidyalaya is a wonderful platform for exploring one's
                      quest for knowledge and development of business skills."
                    </p>
                  </div>
                  <h1 key={headingKey} className={animateHeading ? 'heading-animated-3d' : 'heading-hidden-3d'}>
                    <span>S</span>
                    <span>t</span>
                    <span>u</span>
                    <span>d</span>
                    <span>e</span>
                    <span>n</span>
                    <span>t</span>
                    <span>&nbsp;</span>
                    <span>E</span>
                    <span>x</span>
                    <span>p</span>
                    <span>e</span>
                    <span>r</span>
                    <span>i</span>
                    <span>e</span>
                    <span>n</span>
                    <span>c</span>
                    <span>e</span>
                    <br />
                    <span>B</span>
                    <span>a</span>
                    <span>t</span>
                    <span>c</span>
                    <span>h</span>
                    <span>&nbsp;</span>
                    <span>2</span>
                    <span>0</span>
                    <span>2</span>
                    <span>0</span>
                    <span>-</span>
                    <span>2</span>
                    <span>0</span>
                    <span>2</span>
                    <span>3</span>
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
                      <span>Taking admission to Hindi Mahavidyalaya</span>
                      <span>was the best decision of my life.</span>
                      <span className="name">Ann Mango</span>
                      <span className="auth">- BATCH 20-23 · ★★★★★</span>
                      <span className="quo">"</span>
                    </h5>
                  </div>
                  <div className="content_picture">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
                      alt="Ann Mango - BATCH 20-23"
                    />
                  </div>
                  <h1 key={`right-${headingKey}`} className={animateHeading ? 'heading-animated-3d' : 'heading-hidden-3d'}>
                    <span>A</span>
                    <span>c</span>
                    <span>a</span>
                    <span>d</span>
                    <span>e</span>
                    <span>m</span>
                    <span>i</span>
                    <span>c</span>
                    <span>&nbsp;</span>
                    <span>R</span>
                    <span>i</span>
                    <span>g</span>
                    <span>o</span>
                    <span>u</span>
                    <span>r</span>
                    <br />
                    <span>&amp;</span>
                    <span>&nbsp;</span>
                    <span>D</span>
                    <span>i</span>
                    <span>s</span>
                    <span>c</span>
                    <span>i</span>
                    <span>p</span>
                    <span>l</span>
                    <span>i</span>
                    <span>n</span>
                    <span>e</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* PAGE 5: SPREAD 4-5 (LEFT - MARTIN CULHANE) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Student Experience</div>
                <div className="pagenumber">4 5</div>
                <div className="content">
                  <div className="content_center">
                    <div className="student-stars">★★★★★</div>
                    <h4>
                      "The faculty members are very good and supportive. I like the practical
                      orientation in teaching methodology."
                    </h4>
                    <h6>Martin Culhane · BATCH 20-23</h6>
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
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=85"
                    alt="Martin Culhane - BATCH 20-23"
                  />
                </div>
                <div className="content">
                  <div className="content_center right">
                    <div className="student-stars">★★★★★</div>
                    <h4>
                      "In addition, we also get exposure about the industry from the Alumni and
                      Corporate Talks."
                    </h4>
                    <h6>Industry Connect &amp; Career Mentorship</h6>
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

            {/* PAGE 7: SPREAD 6-7 (LEFT - PAITYN PHILIPS & SECTIONS) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Student Experience</div>
                <div className="pagenumber">6 7</div>
                <div className="content">
                  <div className="content_section">
                    <h2>Paityn Philips</h2>
                    <p>
                      BATCH 20-23 · ★★★★★ · "I like the Club activities and events organized on a
                      regular basis. Of course, we get the opportunity to unleash our creative
                      instincts and the management skills."
                    </p>
                  </div>
                  <div className="content_section">
                    <h2>Student Clubs</h2>
                    <p>
                      Vibrant student clubs, annual fests, literary symposiums, and sports tournaments
                      fostering creative instincts, leadership, and camaraderie across departments.
                    </p>
                  </div>
                  <div className="content_section">
                    <h2>60+ Years</h2>
                    <p>
                      Celebrating six decades of academic distinction, autonomous university syllabus,
                      NAAC accreditation, and corporate placement excellence.
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
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85"
                    alt="Paityn Philips - BATCH 20-23"
                  />
                </div>
                <div className="content">
                  <div className="content_center right">
                    <div className="student-stars">★★★★★</div>
                    <h4>"Unleashing our creative instincts and management skills."</h4>
                    <h6>Paityn Philips · BATCH 20-23</h6>
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
