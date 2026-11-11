import { useEffect, useRef } from 'react'

// Authentic Promise section card backgrounds from Hindi Mahavidyalaya
import strongAcademicsImg from '../assets/Promise/Strong academics for tomorrow.jpg'
import holisticMentorshipImg from '../assets/Promise/Holistic mentorship & campus vitality.jpg'
import careerPathwaysImg from '../assets/Promise/Career pathways & global enterprise.jpg'
import heritageLanguageImg from '../assets/Promise/Heritage, language & national pride.jpg'
import inclusiveEducationImg from '../assets/Promise/Inclusive education for all learners.jpg'

export default function PromiseSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    class MzaCarousel {
      root: HTMLElement
      viewport: HTMLElement
      track: HTMLElement
      slides: HTMLElement[]
      prevBtn: HTMLButtonElement
      nextBtn: HTMLButtonElement
      pagination: HTMLElement
      progressBar: HTMLElement
      isFF: boolean
      n: number
      slideW: number = 800
      dots: HTMLButtonElement[] = []
      ro: ResizeObserver | null = null
      opts: any
      state: any

      constructor(root: HTMLElement, opts = {}) {
        this.root = root
        this.viewport = root.querySelector('.mzaCarousel-viewport') as HTMLElement
        this.track = root.querySelector('.mzaCarousel-track') as HTMLElement
        this.slides = Array.from(root.querySelectorAll('.mzaCarousel-slide'))
        this.prevBtn = root.querySelector('.mzaCarousel-prev') as HTMLButtonElement
        this.nextBtn = root.querySelector('.mzaCarousel-next') as HTMLButtonElement
        this.pagination = root.querySelector('.mzaCarousel-pagination') as HTMLElement
        this.progressBar = root.querySelector('.mzaCarousel-progressBar') as HTMLElement
        this.isFF = typeof (window as any).InstallTrigger !== 'undefined'
        this.n = this.slides.length
        this.state = {
          index: 0,
          pos: 0,
          width: 0,
          height: 0,
          gap: 28,
          dragging: false,
          pointerId: null,
          x0: 0,
          v: 0,
          t0: 0,
          animating: false,
          hovering: false,
          startTime: 0,
          pausedAt: 0,
          rafId: 0,
          alive: true,
        }
        this.opts = Object.assign(
          {
            gap: 28,
            peek: 0.15,
            rotateY: 34,
            zDepth: 150,
            scaleDrop: 0.09,
            blurMax: 2.0,
            activeLeftBias: 0.12,
            interval: 4500,
            transitionMs: 900,
            keyboard: true,
            breakpoints: [
              {
                mq: '(max-width: 1200px)',
                gap: 24,
                peek: 0.12,
                rotateY: 28,
                zDepth: 120,
                scaleDrop: 0.08,
                activeLeftBias: 0.1,
              },
              {
                mq: '(max-width: 1000px)',
                gap: 18,
                peek: 0.09,
                rotateY: 22,
                zDepth: 90,
                scaleDrop: 0.07,
                activeLeftBias: 0.09,
              },
              {
                mq: '(max-width: 768px)',
                gap: 14,
                peek: 0.06,
                rotateY: 16,
                zDepth: 70,
                scaleDrop: 0.06,
                activeLeftBias: 0.08,
              },
              {
                mq: '(max-width: 560px)',
                gap: 12,
                peek: 0.05,
                rotateY: 12,
                zDepth: 60,
                scaleDrop: 0.05,
                activeLeftBias: 0.07,
              },
            ],
          },
          opts
        )
        if (this.isFF) {
          this.opts.rotateY = 10
          this.opts.zDepth = 0
          this.opts.blurMax = 0
        }
        this._init()
      }

      _init() {
        this._setupDots()
        this._bind()
        this._preloadImages()
        this._measure()
        this.goTo(0, false)
        this._startCycle()
        this._loop()
      }

      _preloadImages() {
        this.slides.forEach((sl) => {
          const card = sl.querySelector('.mzaCard') as HTMLElement
          if (!card) return
          const bg = getComputedStyle(card).getPropertyValue('--mzaCard-bg')
          const m = /url\((?:'|")?([^'")]+)(?:'|")?\)/.exec(bg)
          if (m && m[1]) {
            const img = new Image()
            img.src = m[1]
          }
        })
      }

      _setupDots() {
        this.pagination.innerHTML = ''
        this.dots = this.slides.map((_, i) => {
          const b = document.createElement('button')
          b.type = 'button'
          b.className = 'mzaCarousel-dot'
          b.setAttribute('role', 'tab')
          b.setAttribute('aria-label', `Go to slide ${i + 1}`)
          b.addEventListener('click', () => {
            this.goTo(i)
          })
          this.pagination.appendChild(b)
          return b
        })
      }

      _bind() {
        this.prevBtn?.addEventListener('click', () => this.prev())
        this.nextBtn?.addEventListener('click', () => this.next())

        if (this.opts.keyboard) {
          this.root.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev()
            if (e.key === 'ArrowRight') this.next()
          })
        }

        const pe = this.viewport
        pe.addEventListener('pointerdown', (e) => this._onDragStart(e))
        pe.addEventListener('pointermove', (e) => this._onDragMove(e))
        pe.addEventListener('pointerup', (e) => this._onDragEnd(e))
        pe.addEventListener('pointercancel', (e) => this._onDragEnd(e))

        this.root.addEventListener('mouseenter', () => {
          this.state.hovering = true
          this.state.pausedAt = performance.now()
        })
        this.root.addEventListener('mouseleave', () => {
          if (this.state.pausedAt) {
            this.state.startTime += performance.now() - this.state.pausedAt
            this.state.pausedAt = 0
          }
          this.state.hovering = false
        })

        this.ro = new ResizeObserver(() => this._measure())
        this.ro.observe(this.viewport)

        this.opts.breakpoints.forEach((bp: any) => {
          const m = window.matchMedia(bp.mq)
          const apply = () => {
            Object.keys(bp).forEach((k) => {
              if (k !== 'mq') this.opts[k] = bp[k]
            })
            this._measure()
            this._render()
          }
          if (m.addEventListener) m.addEventListener('change', apply)
          else (m as any).addListener(apply)
          if (m.matches) apply()
        })

        this.viewport.addEventListener('pointermove', (e) => this._onTilt(e))
      }

      _measure() {
        if (!this.state.alive) return
        const viewRect = this.viewport.getBoundingClientRect()
        const rootRect = this.root.getBoundingClientRect()
        const pagRect = this.pagination.getBoundingClientRect()
        const bottomGap = Math.max(
          12,
          Math.round(rootRect.bottom - pagRect.bottom)
        )
        const pagSpace = pagRect.height + bottomGap
        const availH = viewRect.height - pagSpace
        const cardH = Math.max(320, Math.min(600, Math.round(availH)))
        this.state.width = viewRect.width
        this.state.height = viewRect.height
        this.state.gap = this.opts.gap
        this.slideW = Math.min(880, this.state.width * (1 - this.opts.peek * 2))
        this.root.style.setProperty('--mzaPagH', `${pagSpace}px`)
        this.root.style.setProperty('--mzaCardH', `${cardH}px`)
      }

      _onTilt(e: PointerEvent) {
        const r = this.viewport.getBoundingClientRect()
        const mx = (e.clientX - r.left) / r.width - 0.5
        const my = (e.clientY - r.top) / r.height - 0.5
        this.root.style.setProperty('--mzaTiltX', (my * -6).toFixed(3))
        this.root.style.setProperty('--mzaTiltY', (mx * 6).toFixed(3))
      }

      _onDragStart(e: PointerEvent) {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        this.state.dragging = true
        this.state.pointerId = e.pointerId
        try {
          this.viewport.setPointerCapture(e.pointerId)
        } catch {}
        this.state.x0 = e.clientX
        this.state.t0 = performance.now()
        this.state.v = 0
        this.state.pausedAt = performance.now()
      }

      _onDragMove(e: PointerEvent) {
        if (!this.state.dragging || e.pointerId !== this.state.pointerId) return
        const dx = e.clientX - this.state.x0
        const dt = Math.max(16, performance.now() - this.state.t0)
        this.state.v = dx / dt
        const slideSpan = this.slideW + this.state.gap
        this.state.pos = this._mod(this.state.index - dx / slideSpan, this.n)
        this._render()
      }

      _onDragEnd(e: PointerEvent) {
        if (!this.state.dragging || (e && e.pointerId !== this.state.pointerId)) return
        this.state.dragging = false
        try {
          if (this.state.pointerId != null) {
            this.viewport.releasePointerCapture(this.state.pointerId)
          }
        } catch {}
        this.state.pointerId = null
        if (this.state.pausedAt) {
          this.state.startTime += performance.now() - this.state.pausedAt
          this.state.pausedAt = 0
        }
        const v = this.state.v
        const threshold = 0.18
        let target = Math.round(
          this.state.pos - Math.sign(v) * (Math.abs(v) > threshold ? 0.5 : 0)
        )
        this.goTo(this._mod(target, this.n))
      }

      _startCycle() {
        this.state.startTime = performance.now()
        this._renderProgress(0)
      }

      _loop() {
        const step = (t: number) => {
          if (!this.state.alive) return
          if (!this.state.dragging && !this.state.hovering && !this.state.animating) {
            const elapsed = t - this.state.startTime
            const p = Math.min(1, elapsed / this.opts.interval)
            this._renderProgress(p)
            if (elapsed >= this.opts.interval) this.next()
          }
          this.state.rafId = requestAnimationFrame(step)
        }
        this.state.rafId = requestAnimationFrame(step)
      }

      _renderProgress(p: number) {
        if (this.progressBar) {
          this.progressBar.style.transform = `scaleX(${p})`
        }
      }

      prev() {
        this.goTo(this._mod(this.state.index - 1, this.n))
      }

      next() {
        this.goTo(this._mod(this.state.index + 1, this.n))
      }

      goTo(i: number, animate = true) {
        const start = this.state.pos || this.state.index
        const end = this._nearest(start, i)
        const dur = animate ? this.opts.transitionMs : 0
        const t0 = performance.now()
        const ease = (x: number) => 1 - Math.pow(1 - x, 4)
        this.state.animating = true
        const step = (now: number) => {
          if (!this.state.alive) return
          const t = Math.min(1, (now - t0) / dur)
          const p = dur ? ease(t) : 1
          this.state.pos = start + (end - start) * p
          this._render()
          if (t < 1) requestAnimationFrame(step)
          else this._afterSnap(i)
        }
        requestAnimationFrame(step)
      }

      _afterSnap(_i?: number) {
        this.state.index = this._mod(Math.round(this.state.pos), this.n)
        this.state.pos = this.state.index
        this.state.animating = false
        this._render(true)
        this._startCycle()
      }

      _nearest(from: number, target: number) {
        let d = target - Math.round(from)
        if (d > this.n / 2) d -= this.n
        if (d < -this.n / 2) d += this.n
        return Math.round(from) + d
      }

      _mod(i: number, n: number) {
        return ((i % n) + n) % n
      }

      _render(markActive = false) {
        if (!this.state.alive) return
        const span = this.slideW + this.state.gap
        const tiltX = parseFloat(this.root.style.getPropertyValue('--mzaTiltX') || '0')
        const tiltY = parseFloat(this.root.style.getPropertyValue('--mzaTiltY') || '0')

        for (let i = 0; i < this.n; i++) {
          let d = i - this.state.pos
          if (d > this.n / 2) d -= this.n
          if (d < -this.n / 2) d += this.n
          const weight = Math.max(0, 1 - Math.abs(d) * 2)
          const biasActive = -this.slideW * this.opts.activeLeftBias * weight
          const tx = d * span + biasActive
          const depth = -Math.abs(d) * this.opts.zDepth
          const rot = -d * this.opts.rotateY
          const scale = 1 - Math.min(Math.abs(d) * this.opts.scaleDrop, 0.42)
          const blur = Math.min(Math.abs(d) * this.opts.blurMax, this.opts.blurMax)
          const z = Math.round(1000 - Math.abs(d) * 10)
          const s = this.slides[i]

          if (this.isFF) {
            s.style.transform = `translate(${tx}px,-50%) scale(${scale})`
            s.style.filter = 'none'
          } else {
            s.style.transform = `translate3d(${tx}px,-50%,${depth}px) rotateY(${rot}deg) scale(${scale})`
            s.style.filter = `blur(${blur}px)`
          }
          s.style.zIndex = `${z}`
          if (markActive) {
            s.dataset.state = Math.round(this.state.index) === i ? 'active' : 'rest'
          }
          const card = s.querySelector('.mzaCard') as HTMLElement
          if (card) {
            const parBase = Math.max(-1, Math.min(1, -d))
            const parX = parBase * 48 + tiltY * 2.0
            const parY = tiltX * -1.5
            const bgX = parBase * -64 + tiltY * -2.4
            card.style.setProperty('--mzaParX', `${parX.toFixed(2)}px`)
            card.style.setProperty('--mzaParY', `${parY.toFixed(2)}px`)
            card.style.setProperty('--mzaParBgX', `${bgX.toFixed(2)}px`)
            card.style.setProperty('--mzaParBgY', `${(parY * 0.35).toFixed(2)}px`)
          }
        }
        const active = this._mod(Math.round(this.state.pos), this.n)
        this.dots.forEach((d, i) =>
          d.setAttribute('aria-selected', i === active ? 'true' : 'false')
        )
      }

      destroy() {
        this.state.alive = false
        if (this.state.rafId) cancelAnimationFrame(this.state.rafId)
        if (this.ro) this.ro.disconnect()
      }
    }

    const carousel = new MzaCarousel(root, { transitionMs: 900 })

    return () => {
      carousel.destroy()
    }
  }, [])

  return (
    <section id="promise" className="mza-section w-full relative overflow-hidden select-none">
      
      {/* Header matching Figma: • OUR PROMISE, Why Hindi Mahavidyalaya? */}
      <div className="text-center pt-14 pb-4 px-4 relative z-20">
        <div className="inline-flex items-center gap-2 justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
            OUR PROMISE
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e7ecf2] tracking-tight mt-3">
          Why Hindi Mahavidyalaya?
        </h2>

        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Three things every student takes away.
        </p>
      </div>

      {/* Exact 200% MzaCarousel DOM Structure with Educational Visuals & Content */}
      <div
        ref={rootRef}
        className="mzaCarousel"
        id="mzaCarousel"
        aria-roledescription="carousel"
        aria-label="Featured cards"
      >
        <div className="mzaCarousel-viewport" tabIndex={0}>
          <div className="mzaCarousel-track">
            
            {/* Slide 1: Learn */}
            <article className="mzaCarousel-slide" role="group" aria-roledescription="slide" aria-label="1 of 5">
              <div
                className="mzaCard"
                style={{ '--mzaCard-bg': `url("${strongAcademicsImg}")` } as React.CSSProperties}
              >
                <header className="mzaCard-head mzaPar-1">
                  <h2 className="mzaCard-title">Strong academics for tomorrow</h2>
                  <p className="mzaCard-kicker">LEARN · Autonomous & Digital Classrooms</p>
                </header>
                <p className="mzaCard-text mzaPar-2">
                  Autonomous status keeps our syllabus current and industry-aligned. Digital classrooms, an e-library, and modern labs support every stream.
                </p>
                <footer className="mzaCard-actions mzaPar-3">
                  <a href="#programmes" className="mzaBtn inline-block text-center no-underline">
                    Explore Academics
                  </a>
                </footer>
              </div>
            </article>

            {/* Slide 2: Grow */}
            <article className="mzaCarousel-slide" role="group" aria-roledescription="slide" aria-label="2 of 5">
              <div
                className="mzaCard"
                style={{ '--mzaCard-bg': `url("${holisticMentorshipImg}")` } as React.CSSProperties}
              >
                <header className="mzaCard-head mzaPar-1">
                  <h2 className="mzaCard-title">Holistic mentorship & campus vitality</h2>
                  <p className="mzaCard-kicker">GROW · 1:1 Guidance & Cultural Leadership</p>
                </header>
                <p className="mzaCard-text mzaPar-2">
                  Dedicated mentors guide every student 1:1, encouraging debate championships, NSS & NCC discipline, and competitive collegiate sports.
                </p>
                <footer className="mzaCard-actions mzaPar-3">
                  <a href="#about" className="mzaBtn inline-block text-center no-underline">
                    Discover Campus Life
                  </a>
                </footer>
              </div>
            </article>

            {/* Slide 3: Lead */}
            <article className="mzaCarousel-slide" role="group" aria-roledescription="slide" aria-label="3 of 5">
              <div
                className="mzaCard"
                style={{ '--mzaCard-bg': `url("${careerPathwaysImg}")` } as React.CSSProperties}
              >
                <header className="mzaCard-head mzaPar-1">
                  <h2 className="mzaCard-title">Career pathways & global enterprise</h2>
                  <p className="mzaCard-kicker">LEAD · Top Corporate Placements</p>
                </header>
                <p className="mzaCard-text mzaPar-2">
                  From day one, practical industry internships, on-campus corporate recruitment drives, and an influential 40,000+ alumni network prepare you to lead.
                </p>
                <footer className="mzaCard-actions mzaPar-3">
                  <a href="#events" className="mzaBtn inline-block text-center no-underline">
                    View Placements
                  </a>
                </footer>
              </div>
            </article>

            {/* Slide 4: Inspire */}
            <article className="mzaCarousel-slide" role="group" aria-roledescription="slide" aria-label="4 of 5">
              <div
                className="mzaCard"
                style={{ '--mzaCard-bg': `url("${heritageLanguageImg}")` } as React.CSSProperties}
              >
                <header className="mzaCard-head mzaPar-1">
                  <h2 className="mzaCard-title">Heritage, language & national pride</h2>
                  <p className="mzaCard-kicker">INSPIRE · Multilingual & Cultural Forum</p>
                </header>
                <p className="mzaCard-text mzaPar-2">
                  Rooted in 60+ years of multilingual heritage and national Hindi scholarship, empowering voices in national debate forums and translation initiatives.
                </p>
                <footer className="mzaCard-actions mzaPar-3">
                  <a href="#legacy" className="mzaBtn inline-block text-center no-underline">
                    Explore Heritage
                  </a>
                </footer>
              </div>
            </article>

            {/* Slide 5: Empower */}
            <article className="mzaCarousel-slide" role="group" aria-roledescription="slide" aria-label="5 of 5">
              <div
                className="mzaCard"
                style={{ '--mzaCard-bg': `url("${inclusiveEducationImg}")` } as React.CSSProperties}
              >
                <header className="mzaCard-head mzaPar-1">
                  <h2 className="mzaCard-title">Inclusive education for all learners</h2>
                  <p className="mzaCard-kicker">EMPOWER · Scholarships & Merit Grants</p>
                </header>
                <p className="mzaCard-text mzaPar-2">
                  Affordable education backed by state and central post-matric scholarships, merit fee concessions, and an active women empowerment cell.
                </p>
                <footer className="mzaCard-actions mzaPar-3">
                  <a href="#notices" className="mzaBtn inline-block text-center no-underline">
                    View Admissions
                  </a>
                </footer>
              </div>
            </article>

          </div>
        </div>

        {/* Controls */}
        <div className="mzaCarousel-controls" aria-label="Controls">
          <button className="mzaCarousel-prev" aria-label="Previous slide" type="button">‹</button>
          <button className="mzaCarousel-next" aria-label="Next slide" type="button">›</button>
        </div>

        {/* Pagination Dots */}
        <div className="mzaCarousel-pagination" role="tablist" aria-label="Slide navigation"></div>

        {/* Progress Bar */}
        <div className="mzaCarousel-progress" aria-hidden="true">
          <span className="mzaCarousel-progressBar"></span>
        </div>
      </div>

      {/* Exact 200% Embedded CSS from your provided code */}
      <style>{`
        .mza-section {
          background: radial-gradient(
              1200px 600px at 10% -10%,
              #1a2140 0%,
              transparent 40%
            ),
            radial-gradient(900px 600px at 110% 10%, rgba(249, 87, 33, 0.12) 0%, transparent 40%),
            linear-gradient(180deg, #0a0d12 0%, #0c1117 100%);
          color: #e7ecf2;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        :root {
          --mzaC-fg: #e7ecf2;
          --mzaC-accent: #f95721;
          --mzaC-accent2: #ea580c;
          --mzaC-glass: rgba(255, 255, 255, 0.06);
          --mzaC-glow: rgba(249, 87, 33, 0.45);
          --mzaC-slideW: min(880px, 90vw);
          --mzaC-peek: 0.15;
          --mzaPagH: 64px;
          --mzaCardH: clamp(380px, 62vh, 600px);
        }

        .mzaCarousel {
          position: relative;
          height: clamp(540px, 75vh, 680px);
          max-width: 100vw;
          margin: 0 auto;
          padding: 0 18px;
          overflow: hidden;
          contain: layout paint;
          touch-action: none;
        }

        .mzaCarousel-viewport {
          position: relative;
          outline: none;
          overflow: hidden;
          height: 100%;
        }

        .mzaCarousel-track {
          position: relative;
          height: calc(100% - var(--mzaPagH, 64px) - max(env(safe-area-inset-bottom), 12px));
          transform-style: preserve-3d;
          perspective: 1200px;
          overflow: hidden;
        }

        .mzaCarousel-slide {
          position: absolute;
          top: calc(50% + 5px);
          left: 50%;
          width: var(--mzaC-slideW, min(880px, 90vw));
          height: min(var(--mzaCardH, 500px), calc(100% - 30px));
          transform-style: preserve-3d;
          display: grid;
          place-items: center;
          border-radius: 22px;
          overflow: hidden;
          will-change: transform, filter;
        }

        .mzaCard {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          overflow: hidden;
          background: var(--mzaC-glass, rgba(255, 255, 255, 0.06));
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
          backdrop-filter: saturate(120%) blur(4px);
          transform: translateZ(0);
          cursor: grab;
        }

        .mzaCard::before {
          content: "";
          position: absolute;
          inset: -2%;
          background-image: var(--mzaCard-bg);
          background-size: cover;
          background-position: center;
          filter: contrast(1.02) saturate(1.08) brightness(0.9);
          transform: translateZ(-60px) scale(1.18)
            translate3d(var(--mzaParBgX, 0px), var(--mzaParBgY, 0px), 0);
          transition: transform 800ms cubic-bezier(0.2, 0.7, 0, 1),
            filter 800ms cubic-bezier(0.2, 0.7, 0, 1);
        }

        .mzaCard::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.45) 45%,
            rgba(0, 0, 0, 0.35) 100%
          );
        }

        .mzaCard-head {
          position: absolute;
          inset: 24px auto auto 24px;
          z-index: 2;
          max-width: 80%;
        }

        .mzaCard-title {
          margin: 0;
          font-weight: 800;
          letter-spacing: 0.2px;
          font-size: clamp(22px, 3.1vw, 38px);
          text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
          line-height: 110%;
          color: #fff;
          cursor: text;
        }

        .mzaCard-kicker {
          margin: 0.5rem 0;
          color: var(--mzaC-accent, #f95721);
          font-size: clamp(12px, 1.7vw, 14px);
          font-weight: 600;
          text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.6);
          cursor: text;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mzaCard-text {
          display: -webkit-box;
          line-clamp: 3;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          position: absolute;
          inset: auto 24px 85px 24px;
          z-index: 2;
          max-width: 60ch;
          background-color: rgba(0, 0, 0, 0.45);
          padding: 16px 20px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-wrap: balance;
          cursor: text;
          color: #ddd;
        }

        .mzaCard-actions {
          position: absolute;
          inset: auto auto 20px 24px;
          z-index: 2;
        }

        .mzaBtn {
          appearance: none;
          border: 1px solid #f95721;
          border-radius: 14px;
          padding: 12px 24px;
          font-weight: 700;
          font-size: 14px;
          color: #ffffff;
          background-image: linear-gradient(
            180deg,
            #f95721,
            #ea580c
          );
          box-shadow: 0 4px 18px rgba(249, 87, 33, 0.45);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .mzaBtn:active {
          transform: translateY(1px);
          box-shadow: 0 3px 10px rgba(249, 87, 33, 0.25);
        }

        .mzaCarousel-controls {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
          z-index: 20;
        }

        .mzaCarousel-prev,
        .mzaCarousel-next {
          pointer-events: auto;
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 0;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
          color: var(--mzaC-fg, #e7ecf2);
          font-size: 22px;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .mzaCarousel-prev {
          margin-left: 12px;
        }

        .mzaCarousel-next {
          margin-right: 12px;
        }

        .mzaCarousel-prev:hover,
        .mzaCarousel-next:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .mzaCarousel-prev:active,
        .mzaCarousel-next:active {
          transform: scale(0.95);
        }

        .mzaCarousel-pagination {
          position: absolute;
          left: 0;
          right: 0;
          bottom: max(20px, env(safe-area-inset-bottom));
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          pointer-events: auto;
          z-index: 20;
        }

        .mzaCarousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.25);
          border: 0;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .mzaCarousel-dot[aria-selected="true"] {
          background: linear-gradient(180deg, #f95721, #ea580c);
          transform: scale(1.35);
        }

        .mzaCarousel-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 25;
          overflow: hidden;
        }

        .mzaCarousel-progressBar {
          display: block;
          height: 100%;
          width: 100vw;
          transform-origin: left;
          transform: scaleX(0);
          will-change: transform;
          background: linear-gradient(90deg, #f95721, #ea580c);
        }

        .mzaCarousel-slide[data-state="active"] .mzaCard::before {
          filter: contrast(1.06) saturate(1.12) brightness(1.02);
        }

        .mzaCarousel-slide[data-state="active"] .mzaCard {
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset;
        }

        .mzaPar-1,
        .mzaPar-2,
        .mzaPar-3 {
          will-change: transform;
          transition: transform 500ms cubic-bezier(0.2, 0.7, 0, 1);
        }

        .mzaPar-1 {
          transform: translate3d(
            calc(var(--mzaParX, 0px) * 0.35),
            calc(var(--mzaParY, 0px) * 0.35),
            0
          );
        }

        .mzaPar-2 {
          transform: translate3d(
            calc(var(--mzaParX, 0px) * 0.25),
            calc(var(--mzaParY, 0px) * 0.25),
            0
          );
        }

        .mzaPar-3 {
          transform: translate3d(
            calc(var(--mzaParX, 0px) * 0.18),
            calc(var(--mzaParY, 0px) * 0.18),
            0
          );
        }

        @media (max-width: 1000px) {
          :root {
            --mzaC-slideW: min(92vw, 620px);
          }
          .mzaCard-head {
            inset: 16px auto auto 16px;
          }
          .mzaCard-title {
            font-size: clamp(20px, 5.4vw, 30px);
          }
          .mzaCard-kicker {
            font-size: clamp(12px, 3.6vw, 13px);
          }
          .mzaCard-text {
            inset: auto 16px 62px 16px;
          }
        }

        @media (max-width: 768px) {
          :root {
            --mzaC-slideW: min(94vw, 560px);
          }
          .mzaCard-text,
          .mzaCard-title,
          .mzaCard-kicker {
            max-width: 65%;
          }
        }

        @media (max-width: 560px) {
          :root {
            --mzaC-slideW: min(96vw, 520px);
          }
        }
      `}</style>
    </section>
  )
}
