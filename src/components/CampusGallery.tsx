import { useState, useEffect, useRef, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import sphereCoords from './sphereItems.json'
import './CampusGallery.css'

interface SphereCoord {
  x: number
  y: number
  sx: number
  sy: number
}

// Dynamically import all authentic campus photos from src/assets/Gallery
const galleryModules = import.meta.glob<{ default: string }>(
  '../assets/Gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true }
)
const galleryUrls = Object.values(galleryModules).map((mod) => mod.default)

const sphereItems = (sphereCoords as SphereCoord[]).map((coord, idx) => ({
  ...coord,
  src: galleryUrls.length > 0 ? galleryUrls[idx % galleryUrls.length] : ''
}))

export default function CampusGallery() {
  const mainRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const itemPointerDownRef = useRef({ x: 0, y: 0, time: 0 })

  // 3D Sphere inertia & dragging state
  useEffect(() => {
    const mainEl = mainRef.current
    const sphereEl = sphereRef.current

    if (!mainEl || !sphereEl) return

    const MAX_POLAR_ROT_DEG = 3
    const PAN_SENSITIVITY = 18

    const state = {
      rotation: { x: 0, y: 0 },
      startRotation: { x: 0, y: 0 },
      inertiaFrame: null as number | null,
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

    // Pointer gesture handlers on sphere stage
    const handlePointerDown = (e: PointerEvent) => {
      state.isPointerDown = true
      state.hasMoved = false
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

      if (!state.hasMoved && Math.hypot(deltaX, deltaY) > 8) {
        state.hasMoved = true
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
      }
    }

    mainEl.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      stopInertia()
      mainEl.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [])

  // Keyboard navigation when image is enlarged
  useEffect(() => {
    if (selectedImageIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev === 0 ? sphereItems.length - 1 : prev - 1) : null
        )
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev === sphereItems.length - 1 ? 0 : prev + 1) : null
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex])

  const handlePrev = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev === 0 ? sphereItems.length - 1 : prev - 1) : null
    )
  }, [])

  const handleNext = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev === sphereItems.length - 1 ? 0 : prev + 1) : null
    )
  }, [])

  const handleCardClick = (idx: number) => {
    setSelectedImageIndex(idx)
  }

  return (
    <section
      id="life-on-campus"
      className="relative w-full pt-10 sm:pt-14 pb-12 sm:pb-16 bg-[#eceef0] overflow-hidden select-none border-t border-slate-200"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-3 sm:mb-4 relative z-20">
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
          NCC, NSS, sports, library, laboratories and student vitality.
        </p>

        {/* Interactive Helper Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-300/80 text-xs text-slate-600 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
          <span>Click any image to enlarge &amp; highlight · Drag to spin sphere</span>
        </div>
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
                onPointerDown={(e) => {
                  itemPointerDownRef.current = { x: e.clientX, y: e.clientY, time: Date.now() }
                }}
                onPointerUp={(e) => {
                  const dx = Math.abs(e.clientX - itemPointerDownRef.current.x)
                  const dy = Math.abs(e.clientY - itemPointerDownRef.current.y)
                  const dt = Date.now() - itemPointerDownRef.current.time
                  if (dx < 10 && dy < 10 && dt < 500) {
                    handleCardClick(idx)
                  }
                }}
                onClick={() => handleCardClick(idx)}
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
      </div>

      {/* ================= Lightbox Spotlight Modal: Enlarged & Highlighted ================= */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedImageIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalPop 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            {/* Top Info Bar */}
            <div className="w-full flex items-center justify-between pb-3 px-2 sm:px-4 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f95721] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                  Campus Life Spotlight
                </span>
                <span className="text-xs text-slate-300 font-mono ml-2 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                  Photo {selectedImageIndex + 1} of {sphereItems.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ea580c] text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/20 shadow-lg"
                aria-label="Close photo"
                title="Close (Esc)"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Highlighted Image Stage with glowing collegiate border */}
            <div className="relative w-full flex items-center justify-center">
              {/* Previous Photo Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#ea580c] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous photo"
                title="Previous (Arrow Left)"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* High-Resolution Centered Image */}
              <div className="relative max-h-[75vh] sm:max-h-[80vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-black/50 border-2 border-[#ea580c]/60 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(234,88,12,0.4)]">
                <img
                  src={sphereItems[selectedImageIndex].src}
                  alt={`Life on campus photo ${selectedImageIndex + 1}`}
                  className="max-h-[75vh] sm:max-h-[80vh] max-w-full w-auto h-auto object-contain block mx-auto transition-transform duration-300"
                />
              </div>

              {/* Next Photo Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#ea580c] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next photo"
                title="Next (Arrow Right)"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Bottom Keyboard Hint */}
            <div className="pt-3 text-center text-xs text-slate-300 font-medium">
              Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">→</kbd> to navigate · Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">Esc</kbd> or click outside to close
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Smooth Modal Animation */}
      <style>{`
        @keyframes modalPop {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(16px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
