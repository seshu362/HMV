import { useEffect, useRef } from 'react'
import sphereItems from './sphereItems.json'
import './CampusGallery.css'

export default function CampusGallery() {
  const mainRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mainEl = mainRef.current
    const sphereEl = sphereRef.current
    const frameEl = frameRef.current
    const viewerEl = viewerRef.current

    if (!mainEl || !sphereEl || !frameEl || !viewerEl) return

    const MAX_POLAR_ROT_DEG = 3
    const PAN_SENSITIVITY = 18
    const TRANSITION_DUR_MS = 300

    const state = {
      rotation: { x: 0, y: 0 },
      startRotation: { x: 0, y: 0 },
      inertiaFrame: null as number | null,
      cancelTap: false,
      isPointerDown: false,
      hasMoved: false,
      startX: 0,
      startY: 0,
      lastMoveTime: 0,
      lastMoveX: 0,
      lastMoveY: 0,
      velocityX: 0,
      velocityY: 0
    }

    const clamp = (val: number, min: number, max: number) =>
      Math.min(Math.max(val, min), max)

    const applyTransform = () => {
      sphereEl.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${state.rotation.x}deg) rotateY(${state.rotation.y}deg)`
    }

    const stopInertia = () => {
      if (state.inertiaFrame) {
        cancelAnimationFrame(state.inertiaFrame)
        state.inertiaFrame = null
      }
    }

    const startInertia = (velocityX: number, velocityY: number) => {
      let vx = velocityX * 100
      let vy = velocityY * 100

      const friction = 0.92
      const minVelocity = 0.1
      const maxFrames = 120
      let frameCount = 0

      const step = () => {
        vx *= friction
        vy *= friction

        if (Math.abs(vx) < minVelocity && Math.abs(vy) < minVelocity) {
          state.inertiaFrame = null
          return
        }

        const proposedX = state.rotation.x - vy / 200
        state.rotation.x = clamp(proposedX, -MAX_POLAR_ROT_DEG, MAX_POLAR_ROT_DEG)
        state.rotation.y += vx / 200

        applyTransform()

        frameCount++
        if (frameCount > maxFrames) {
          state.inertiaFrame = null
          return
        }

        state.inertiaFrame = requestAnimationFrame(step)
      }

      stopInertia()
      state.inertiaFrame = requestAnimationFrame(step)
    }

    // Pointer gesture handlers
    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest('.viewer .enlarge')) return
      if (mainEl.getAttribute('data-enlarging') === 'true') return

      state.isPointerDown = true
      state.hasMoved = false
      state.cancelTap = false
      stopInertia()

      state.startX = e.clientX
      state.startY = e.clientY
      state.lastMoveX = e.clientX
      state.lastMoveY = e.clientY
      state.lastMoveTime = performance.now()
      state.velocityX = 0
      state.velocityY = 0

      state.startRotation.x = state.rotation.x
      state.startRotation.y = state.rotation.y
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!state.isPointerDown) return

      const deltaX = e.clientX - state.startX
      const deltaY = e.clientY - state.startY

      if (!state.hasMoved && Math.hypot(deltaX, deltaY) > 5) {
        state.hasMoved = true
        state.cancelTap = true
        try {
          mainEl.setPointerCapture(e.pointerId)
        } catch {}
      }

      if (!state.hasMoved) return

      const now = performance.now()
      const dt = Math.max(now - state.lastMoveTime, 1)
      state.velocityX = (e.clientX - state.lastMoveX) / dt
      state.velocityY = (e.clientY - state.lastMoveY) / dt
      state.lastMoveX = e.clientX
      state.lastMoveY = e.clientY
      state.lastMoveTime = now

      const proposedX = state.startRotation.x - deltaY / PAN_SENSITIVITY
      state.rotation.y = state.startRotation.y + deltaX / PAN_SENSITIVITY
      state.rotation.x = clamp(proposedX, -MAX_POLAR_ROT_DEG, MAX_POLAR_ROT_DEG)

      applyTransform()
    }

    const handlePointerUp = (e: PointerEvent) => {
      if (!state.isPointerDown) return
      state.isPointerDown = false

      if (e.pointerId && mainEl.hasPointerCapture(e.pointerId)) {
        try {
          mainEl.releasePointerCapture(e.pointerId)
        } catch {}
      }

      if (state.hasMoved) {
        startInertia(state.velocityX, state.velocityY)
        setTimeout(() => {
          state.cancelTap = false
        }, 120)
      } else {
        state.cancelTap = false
      }
    }

    mainEl.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    // Taps & Enlarging
    const getTransformRotation = (el: HTMLElement) => {
      const str = el.style.transform || ''
      const matchX = str.match(/rotateX\((-?\d+(\.\d+)?)deg\)/)
      const matchY = str.match(/rotateY\((-?\d+(\.\d+)?)deg\)/)
      return {
        rotateX: matchX ? parseFloat(matchX[1]) : state.rotation.x,
        rotateY: matchY ? parseFloat(matchY[1]) : state.rotation.y
      }
    }

    const getRotationXY = (el: HTMLElement) => {
      const style = window.getComputedStyle(el)
      const transform = style.transform

      if (transform && transform !== 'none' && transform.startsWith('matrix3d')) {
        const match = transform.match(/matrix3d\((.+)\)/)
        if (match) {
          const values = match[1].split(',').map(parseFloat)
          const rotateX = Math.asin(-values[9]) * (180 / Math.PI)
          const rotateY = Math.atan2(values[8], values[10]) * (180 / Math.PI)
          if (!isNaN(rotateX) && !isNaN(rotateY)) {
            return { rotateX, rotateY }
          }
        }
      }

      // Robust fallback calculated directly from grid coordinates
      const itemStr = el.getAttribute('data-item') || '0,0'
      const [x, y] = itemStr.split(',').map(parseFloat)
      return {
        rotateY: 4.86486 * (x + 0.5),
        rotateX: 4.86486 * (y - 0.5)
      }
    }

    const handleClickScrim = () => {
      const el = mainEl.querySelector('[data-focused="true"]') as HTMLElement | null
      if (!el) return
      const parentEl = el.closest('.item') as HTMLElement | null
      if (!parentEl) return

      const referenceDiv = parentEl.querySelector('.item__image--reference')
      if (referenceDiv) referenceDiv.remove()

      const enlargedImg = viewerEl.querySelector('.enlarge')
      if (enlargedImg) enlargedImg.remove()

      parentEl.style.setProperty('--rot-y-delta', '0deg')
      parentEl.style.setProperty('--rot-x-delta', '0deg')
      el.style.transform = ''
      el.style.zIndex = '0'

      setTimeout(() => {
        mainEl.setAttribute('data-enlarging', 'false')
        document.body.setAttribute('data-enlarging', 'false')
        el.setAttribute('data-focused', 'false')
      }, TRANSITION_DUR_MS)
    }

    const handleClick = (el: HTMLElement, parentEl: HTMLElement) => {
      if (state.cancelTap || state.hasMoved) return
      if (mainEl.getAttribute('data-enlarging') === 'true') return

      el.setAttribute('data-focused', 'true')

      const parentRotation = getRotationXY(parentEl)
      const globalRotation = getTransformRotation(sphereEl)

      const normalizeDegrees = (deg: number) => ((deg % 360) + 360) % 360
      const parentY = normalizeDegrees(parentRotation.rotateY)
      const globalY = normalizeDegrees(globalRotation.rotateY)

      let rotY = -(parentY + globalY) % 360
      if (rotY < -180) rotY += 360

      parentEl.style.setProperty('--rot-y-delta', `${rotY}deg`)

      const rotX = -parentRotation.rotateX - globalRotation.rotateX
      parentEl.style.setProperty('--rot-x-delta', `${rotX}deg`)

      const referenceDiv = document.createElement('div')
      parentEl.appendChild(referenceDiv)
      referenceDiv.style.opacity = '0'
      referenceDiv.classList.add('item__image', 'item__image--reference')
      referenceDiv.style.transform = `rotateX(${-parentRotation.rotateX}deg) rotateY(${-parentRotation.rotateY}deg)`

      const sourceRect = referenceDiv.getBoundingClientRect()
      const targetRect = frameEl.getBoundingClientRect()
      const deltaScaleX = targetRect.width / (sourceRect.width || 1)
      const deltaScaleY = targetRect.height / (sourceRect.height || 1)
      const deltaScale = Math.min(deltaScaleX, deltaScaleY)

      el.style.transform = `scale(${deltaScale}) translateZ(30px)`
      el.style.zIndex = '3'

      const img = document.createElement('img')
      const initialSrc = parentEl.getAttribute('data-src') || ''
      img.src = initialSrc
      img.alt = 'Life on campus enlarged'

      // Preload high-res Unsplash image and swap smoothly once ready
      const higherSrc = `https://images.unsplash.com${initialSrc
        .replace('.jpg', '')
        .replace('https://assets.codepen.io/215059', '')}?w=1200&h=1200&fit=crop`
      const hiRes = new Image()
      hiRes.onload = () => {
        img.src = higherSrc
      }
      hiRes.src = higherSrc

      setTimeout(() => {
        const renderedRect = el.getBoundingClientRect()
        const mainRect = mainEl.getBoundingClientRect()
        const enlargementEl = document.createElement('div')

        Object.assign(enlargementEl.style, {
          top: renderedRect.top - mainRect.top + 'px',
          left: renderedRect.left - mainRect.left + 'px',
          width: renderedRect.width + 'px',
          height: renderedRect.height + 'px',
          opacity: '0'
        })

        setTimeout(() => {
          enlargementEl.style.opacity = '1'
          mainEl.setAttribute('data-enlarging', 'true')
          document.body.setAttribute('data-enlarging', 'true')
        }, 50)

        enlargementEl.classList.add('enlarge')
        enlargementEl.appendChild(img)
        viewerEl.appendChild(enlargementEl)
      }, TRANSITION_DUR_MS)
    }

    // Single unified click dispatcher using event delegation
    const handleMainClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      // Clicked on scrim or enlarged image -> close
      if (target.closest('.scrim') || target.closest('.viewer .enlarge')) {
        handleClickScrim()
        return
      }

      if (state.cancelTap || state.hasMoved) return

      // Clicked an item image or tile
      const imageEl = target.closest('.item__image') as HTMLElement | null
      const parentEl = target.closest('.item') as HTMLElement | null

      if (imageEl && parentEl) {
        handleClick(imageEl, parentEl)
      } else if (parentEl) {
        const imgChild = parentEl.querySelector('.item__image') as HTMLElement | null
        if (imgChild) handleClick(imgChild, parentEl)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClickScrim()
    }

    mainEl.addEventListener('click', handleMainClick)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      stopInertia()
      mainEl.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      mainEl.removeEventListener('click', handleMainClick)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <section
      id="life-on-campus"
      className="relative w-full pt-10 sm:pt-14 pb-12 sm:pb-16 bg-[#eceef0] overflow-hidden select-none border-t border-slate-200"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-4 sm:mb-6 relative z-20">
        <div className="inline-flex items-center gap-2 justify-center mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
            OUR CAMPUS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b4b] tracking-tight">
          Life on campus
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
          NCC, NSS, sport, the library and the hostel.
        </p>
      </div>

      {/* 3D Sphere Interactive Photo Gallery Stage */}
      <div ref={mainRef} className="campus-gallery-stage">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {sphereItems.map((item, idx) => (
              <div
                key={idx}
                className="item"
                data-src={item.src}
                data-item={`${item.x},${item.y}`}
                data-item-size={`${item.sx},${item.sy}`}
                style={{
                  '--offset-x': item.x,
                  '--offset-y': item.y,
                  '--item-size-x': item.sx,
                  '--item-size-y': item.sy
                } as React.CSSProperties}
              >
                <div className="item__image">
                  <img
                    src={item.src}
                    alt={`Life on campus ${idx + 1}`}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />

        <div ref={viewerRef} className="viewer">
          <div className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </div>
    </section>
  )
}
