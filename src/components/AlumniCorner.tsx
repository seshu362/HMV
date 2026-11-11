import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './AlumniCorner.css'
import alumniGirl1 from '@/assets/Students/magnific_inidan-student_6AF8HQpiJO.png'
import alumniBoy1 from '@/assets/Students/magnific_inidan-student_jUdzXehLD0.png'
import alumniGirl2 from '@/assets/Students/premium_photo-1661481422770-29567015ece6.avif'

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
            ALUMNI NETWORK
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b4b] tracking-tight">
          Alumni Corner
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
          Where our distinguished alumni from the 2018–21 batch are leading today.
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

            {/* PAGE 3: SPREAD 2-3 (LEFT - POOJA AGARWAL) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Alumni Corner</div>
                <div className="pagenumber">2 3</div>
                <div className="content">
                  <div className="content_offset">
                    <div className="student-stars">★★★★★</div>
                    <h2>Pooja Agarwal</h2>
                    <p>
                      BATCH 18–21 · Senior Financial Analyst – Deloitte India · "As an autonomous institution
                      affiliated with Osmania University, Hindi Mahavidyalaya provided the rigorous analytical
                      foundation and corporate exposure that empowered me to excel in global corporate finance."
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

            {/* PAGE 4: SPREAD 2-3 (RIGHT - POOJA AGARWAL) */}
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
                      <span>I feel immense pride in having graduated from Hindi Mahavidyalaya.</span>
                      <span>The college instilled rigorous professional ethics and analytical discipline.</span>
                      <span className="name">Pooja Agarwal</span>
                      <span className="auth">Senior Financial Analyst – Deloitte India · BATCH 18–21 · ★★★★★</span>
                      <span className="quo">"</span>
                    </h5>
                  </div>
                  <div className="content_picture">
                    <img
                      src={alumniGirl1}
                      alt="Pooja Agarwal - BATCH 18-21"
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

            {/* PAGE 5: SPREAD 4-5 (LEFT - VIKRAMADITYA RAO) */}
            <div className="pages_page">
              <div className="pages_page__inner">
                <div className="logo">Alumni Corner</div>
                <div className="pagenumber">4 5</div>
                <div className="content">
                  <div className="content_center">
                    <div className="student-stars">★★★★★</div>
                    <h4>
                      "Hindi Mahavidyalaya blends autonomous academic freedom with industry-aligned
                      technical curriculum. The dedicated faculties continually challenge students to
                      solve real-world problems and graduate as market-ready tech leaders."
                    </h4>
                    <h6>Vikramaditya Rao · Lead Data Scientist – Capgemini (BATCH 18–21)</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE 6: SPREAD 4-5 (RIGHT - VIKRAMADITYA RAO SPREAD) */}
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
                    src={alumniBoy1}
                    alt="Vikramaditya Rao - BATCH 18-21"
                  />
                </div>
                <div className="content">
                  <div className="content_center right">
                    <div className="student-stars">★★★★★</div>
                    <h4>
                      "The modern computer labs, seminar presentations, and faculty guidance gave me
                      the analytical confidence to architect enterprise AI solutions at scale."
                    </h4>
                    <h6>AI Systems &amp; Predictive Analytics · Capgemini</h6>
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
                    <h2>15,000+ Alumni Network</h2>
                    <p>
                      BATCH 18–21 &amp; Beyond · Driving innovation across Deloitte, Capgemini, HDFC Bank,
                      TCS, public services, and entrepreneurial ventures worldwide.
                    </p>
                  </div>
                  <div className="content_section">
                    <h2>Executive Mentorship</h2>
                    <p>
                      Senior alumni return each semester to conduct mock technical interviews, resume
                      workshops, and career mentoring for graduating students.
                    </p>
                  </div>
                  <div className="content_section">
                    <h2>60+ Years Legacy</h2>
                    <p>
                      Honouring six decades of academic distinction, autonomous excellence, NAAC
                      accreditation, and values-rooted student transformation.
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
                    src={alumniGirl2}
                    alt="Divya Sai Sri - BATCH 18-21"
                  />
                </div>
                <div className="content">
                  <div className="content_center right">
                    <div className="student-stars">★★★★★</div>
                    <h4>"Lifelong connection, values-driven leadership, and proud alumni heritage."</h4>
                    <h6>Divya Sai Sri · Assistant Vice President, HDFC Bank · Alumni Council</h6>
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

