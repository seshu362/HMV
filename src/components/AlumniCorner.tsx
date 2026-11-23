import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './AlumniCorner.css'
import alumniWomanOffice from '@/assets/Alumni/casual-clothes-portrait-attractive-young-woman-standing-office-with-black-bag.jpg'
import alumniManLaptop from '@/assets/Alumni/smiling-indian-man-casual-close-with-laptop-backpack-pastel-wall.jpg'
import alumniWomanStudent from '@/assets/Alumni/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAzL2ZyZWVpbWFnZXNjb21wYW55X3Bob3RvX29mX3lvdW5nX2luZGlhbl9naXJsX2hvbGRpbmdfc3R1ZGVudF9iYV8zN2QyNjU4Yi0yOWIwLTQyZmQtODhmYy04OGU3ZTcxYmVlNDcucG5n.jpeg'

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
    setAnimateHeading(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHeadingKey((prev) => prev + 1)
        setAnimateHeading(true)
      })
    })
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
      className="relative w-full overflow-hidden bg-[#e2e2f5] pt-8 sm:pt-10 pb-8 sm:pb-10 select-none border-t border-slate-200/60"
    >
      {/* Section Header: Our Students / Alumni Corner */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-6 sm:mb-8 relative z-20">
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

            {/* PAGE 3: SPREAD 2-3 (LEFT - ANANYA SHARMA) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Alumni Corner</div>
                <div className="pagenumber">2 3</div>
                <div className="content">
                  <div className="content_offset">
                    <div className="student-stars">★★★★★</div>
                    <h2>Ananya Sharma</h2>
                    <div className="alumni-role-tag">
                      Regional Operations Manager · Reliance Retail
                    </div>
                    <div className="alumni-batch-badge">
                      B.Com (Honours) · Batch 2018 — 2021
                    </div>
                    <p>
                      "As one of the premier autonomous colleges in Hyderabad, Hindi Mahavidyalaya shaped me from day one to face the corporate world with commercial acumen, confidence, and leadership."
                    </p>
                    <div className="alumni-stat-badge">
                      Campus Placement · 7.5 LPA Package
                    </div>
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

            {/* PAGE 4: SPREAD 2-3 (RIGHT - ANANYA SHARMA) */}
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
                      <span className="name">Ananya Sharma</span>
                      <span className="auth">Regional Operations Manager – Reliance Retail · B.Com (Hons) · ★★★★★</span>
                      <span className="quo">"</span>
                    </h5>
                  </div>
                  <div className="content_picture">
                    <img
                      src={alumniWomanOffice}
                      alt="Ananya Sharma - Regional Operations Manager, Reliance Retail"
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

            {/* PAGE 5: SPREAD 4-5 (LEFT - RAHUL VERMA) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Alumni Corner</div>
                <div className="pagenumber">4 5</div>
                <div className="content">
                  <div className="content_offset">
                    <div className="student-stars">★★★★★</div>
                    <h2>Rahul Verma</h2>
                    <div className="alumni-role-tag">
                      Senior Software Engineer · Capgemini
                    </div>
                    <div className="alumni-batch-badge">
                      B.Sc (Computer Science) · Batch 2018 — 2021
                    </div>
                    <p>
                      "Hindi Mahavidyalaya has an innovative methodology for shaping career-ready students. The coding labs, faculty mentorship, and industrial seminars gave me the foundation to thrive in multinational software engineering."
                    </p>
                    <div className="alumni-stat-badge">
                      Campus Placement · 8.4 LPA Package
                    </div>
                  </div>
                  <h1
                    key={`heading-p5-${headingKey}`}
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

            {/* PAGE 6: SPREAD 4-5 (RIGHT - RAHUL VERMA) */}
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
                      <span>The campus environment and guest speaker seminars gave me the launchpad</span>
                      <span>for multinational enterprise software architecture.</span>
                      <span className="name">Rahul Verma</span>
                      <span className="auth">Senior Software Engineer – Capgemini · B.Sc CS · ★★★★★</span>
                      <span className="quo">"</span>
                    </h5>
                  </div>
                  <div className="content_picture">
                    <img
                      src={alumniManLaptop}
                      alt="Rahul Verma - Senior Software Engineer, Capgemini"
                    />
                  </div>
                  <h1
                    key={`right-p6-${headingKey}`}
                    className={animateHeading ? 'heading-animated-3d' : 'heading-hidden-3d'}
                  >
                    <span>S</span>
                    <span>o</span>
                    <span>f</span>
                    <span>t</span>
                    <span>w</span>
                    <span>a</span>
                    <span>r</span>
                    <span>e</span>
                    <br />
                    <span>&amp;</span>
                    <span>&nbsp;</span>
                    <span>C</span>
                    <span>l</span>
                    <span>o</span>
                    <span>u</span>
                    <span>d</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* PAGE 7: SPREAD 6-7 (LEFT - RAMYA KRISHNAN) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Alumni Corner</div>
                <div className="pagenumber">6 7</div>
                <div className="content">
                  <div className="content_offset">
                    <div className="student-stars">★★★★★</div>
                    <h2>Ramya Krishnan</h2>
                    <div className="alumni-role-tag">
                      Brand Operations Specialist · Shoppers Stop
                    </div>
                    <div className="alumni-batch-badge">
                      B.B.A (Management) · Batch 2018 — 2021
                    </div>
                    <p>
                      "From organizing inter-collegiate business symposiums to interactive case-study presentations, Hindi Mahavidyalaya cultivated the strategic acumen and team management skills I rely on every day."
                    </p>
                    <div className="alumni-stat-badge">
                      Campus Placement · 6.8 LPA Package
                    </div>
                  </div>
                  <h1
                    key={`heading-p7-${headingKey}`}
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

            {/* PAGE 8: SPREAD 6-7 (RIGHT - RAMYA KRISHNAN) */}
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
                      <span>Hindi Mahavidyalaya shaped my leadership, strategic thinking,</span>
                      <span>and corporate communication from day one.</span>
                      <span className="name">Ramya Krishnan</span>
                      <span className="auth">Brand Operations Specialist – Shoppers Stop · B.B.A · ★★★★★</span>
                      <span className="quo">"</span>
                    </h5>
                  </div>
                  <div className="content_picture">
                    <img
                      src={alumniWomanStudent}
                      alt="Ramya Krishnan - Brand Operations Specialist, Shoppers Stop"
                    />
                  </div>
                  <h1
                    key={`right-p8-${headingKey}`}
                    className={animateHeading ? 'heading-animated-3d' : 'heading-hidden-3d'}
                  >
                    <span>G</span>
                    <span>r</span>
                    <span>o</span>
                    <span>w</span>
                    <span>t</span>
                    <span>h</span>
                    <br />
                    <span>&amp;</span>
                    <span>&nbsp;</span>
                    <span>I</span>
                    <span>m</span>
                    <span>p</span>
                    <span>a</span>
                    <span>c</span>
                    <span>t</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spread Navigation Indicators */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {triggers.map((trigger, idx) => (
            <button
              key={trigger}
              type="button"
              onClick={(e) => setTrigger(trigger, e)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeTrigger === trigger
                  ? 'w-8 bg-[#ea580c]'
                  : 'w-2.5 bg-slate-400/50 hover:bg-slate-500'
              }`}
              aria-label={`Go to alumni spread ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

