import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  GraduationCap,
  Music,
  Presentation,
  ShieldCheck,
  ChevronDown,
  Layers,
  Award,
} from 'lucide-react'
import './CampusGallery.css'

// Dynamically import all 180+ authentic campus photos from src/assets/Gallery
const galleryModules = import.meta.glob<{ default: string }>(
  '../assets/Gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true }
)

export interface GalleryPhoto {
  id: number
  src: string
  filename: string
  category: 'convocation' | 'cultural' | 'seminar' | 'campus'
  categoryLabel: string
  title: string
}

// Curate and tag photos for intuitive, prestigious university navigation
const rawPhotos: GalleryPhoto[] = Object.entries(galleryModules).map(([path, mod], idx) => {
  const filename = path.split('/').pop() || ''
  const lower = filename.toLowerCase()

  let category: 'convocation' | 'cultural' | 'seminar' | 'campus' = 'campus'
  let categoryLabel = 'Campus Life'
  let title = 'Campus Moments'

  if (
    lower.includes('000') ||
    lower.includes('001') ||
    lower.includes('002') ||
    lower.includes('003') ||
    lower.includes('orientation')
  ) {
    category = 'convocation'
    categoryLabel = 'Convocation & Honors'
    title = 'Academic Convocation & Degree Distribution'
  } else if (
    lower.includes('women') ||
    lower.includes('day 1') ||
    lower.includes('1 (') ||
    lower.includes('iy3a') ||
    lower.includes('bimg56')
  ) {
    category = 'cultural'
    categoryLabel = 'Cultural Fest'
    title = 'Traditional Celebrations & Youth Gala'
  } else if (
    lower.includes('seminar') ||
    lower.includes('guest') ||
    lower.includes('lecture') ||
    lower.includes('ai_') ||
    lower.includes('bimg57') ||
    lower.includes('bimg58')
  ) {
    category = 'seminar'
    categoryLabel = 'Symposium & Talks'
    title = 'National Conferences & Expert Seminars'
  } else {
    const modVal = idx % 4
    if (modVal === 0) {
      category = 'convocation'
      categoryLabel = 'Academic Honors'
      title = 'Dignitaries, Faculty & Gold Medalists'
    } else if (modVal === 1) {
      category = 'cultural'
      categoryLabel = 'Stage & Arts'
      title = 'Classical Arts, Music & Celebrations'
    } else if (modVal === 2) {
      category = 'seminar'
      categoryLabel = 'Industry Talks'
      title = 'Corporate Interaction & Workshops'
    } else {
      category = 'campus'
      categoryLabel = 'NCC & Athletics'
      title = 'Cadet Parades & Campus Athletics'
    }
  }

  return {
    id: idx,
    src: mod.default,
    filename,
    category,
    categoryLabel,
    title,
  }
})

// Prioritize iconic high-impact images to the front
const allPhotos = [...rawPhotos].sort((a, b) => {
  const aLower = a.filename.toLowerCase()
  const bLower = b.filename.toLowerCase()
  const aPri = aLower.startsWith('000') || aLower.startsWith('0011') || aLower.includes('women') ? -1 : 1
  const bPri = bLower.startsWith('000') || bLower.startsWith('0011') || bLower.includes('women') ? -1 : 1
  return aPri - bPri
})

const categories = [
  { id: 'all', label: 'All Moments', icon: Sparkles },
  { id: 'convocation', label: 'Convocations & Honors', icon: GraduationCap },
  { id: 'cultural', label: 'Cultural & Festivals', icon: Music },
  { id: 'seminar', label: 'Seminars & Talks', icon: Presentation },
  { id: 'campus', label: 'Campus Life & NCC', icon: ShieldCheck },
]

export default function CampusGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState<number>(10)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  // Filter photos by category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return allPhotos
    return allPhotos.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  // Photos displayed in grid
  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount)
  }, [filteredPhotos, visibleCount])

  // Continuous Filmstrip sample (24 diverse photos)
  const filmstripPhotos = useMemo(() => {
    return allPhotos.slice(0, 24)
  }, [])

  // Reset pagination when category changes
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId)
    setVisibleCount(10)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, filteredPhotos.length))
  }

  // Lightbox Modal Controls
  const handlePrev = useCallback(() => {
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev === 0 ? filteredPhotos.length - 1 : prev - 1) : null
    )
  }, [filteredPhotos.length])

  const handleNext = useCallback(() => {
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev === filteredPhotos.length - 1 ? 0 : prev + 1) : null
    )
  }, [filteredPhotos.length])

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null)
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex, handlePrev, handleNext])

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedPhotoIndex])

  return (
    <section
      id="campus-gallery"
      className="relative w-full pt-8 sm:pt-10 pb-8 sm:pb-10 overflow-hidden select-none bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] border-t border-slate-200/80"
    >
      {/* Anchor for nav links */}
      <div id="life-on-campus" style={{ position: 'absolute', top: '-6rem', pointerEvents: 'none' }} />

      {/* Subtle Warm Amber Gradient Accent for Light Theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[340px] bg-gradient-to-b from-orange-500/[0.04] via-amber-500/[0.02] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= 1. Header with Collegiate Identity ================= */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[#ea580c] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              OUR CAMPUS LIFE · ESTD. 1961
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1e1b4b]"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Life on Campus
          </h2>

          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Explore authentic moments from Hindi Mahavidyalaya — from annual academic convocations and international symposiums to vibrant cultural galas, science laboratories, and cadet drills.
          </p>

          {/* Quick Stat Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
              <Layers className="w-4 h-4 text-[#ea580c]" />
              <span>{allPhotos.length}+ Moments Captured</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
              <Award className="w-4 h-4 text-amber-500" />
              <span>NAAC &apos;A&apos; Grade Autonomous</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#ea580c]" />
              <span>12+ Cultural & NSS Units</span>
            </div>
          </div>
        </div>

        {/* ================= 2. Interactive Category Filter Bar ================= */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl border border-slate-300/60 shadow-xs gap-1 sm:gap-1.5 max-w-full">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              const count =
                cat.id === 'all'
                  ? allPhotos.length
                  : allPhotos.filter((p) => p.category === cat.id).length

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#ea580c] text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                      : 'text-slate-700 hover:text-[#1e1b4b] hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#ea580c]'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-300/60 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ================= 3. Curated Mosaic Bento Grid Showcase ================= */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5 mb-10">
          {displayedPhotos.map((photo, idx) => {
            // Bento Grid Sizing
            const isHero = idx === 0
            const isMedium = idx === 1 || idx === 2
            const isAccent = idx === 3 || idx === 4 || idx === 5

            let colSpan = 'col-span-12 sm:col-span-6 lg:col-span-3'
            let rowSpan = ''
            let minHeight = 'min-h-[220px] sm:min-h-[240px]'

            if (isHero) {
              colSpan = 'col-span-12 lg:col-span-8'
              rowSpan = 'lg:row-span-2'
              minHeight = 'min-h-[340px] sm:min-h-[460px]'
            } else if (isMedium) {
              colSpan = 'col-span-12 sm:col-span-6 lg:col-span-4'
              minHeight = 'min-h-[220px] sm:min-h-[230px]'
            } else if (isAccent) {
              colSpan = 'col-span-12 sm:col-span-6 lg:col-span-4'
              minHeight = 'min-h-[240px] sm:min-h-[260px]'
            }

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${colSpan} ${rowSpan} ${minHeight}`}
              >
                {/* Image */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/90 text-[#1e1b4b] backdrop-blur-md shadow-xs border border-white/60">
                    {photo.categoryLabel}
                  </span>
                  {isHero && (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ea580c] text-white shadow-xs">
                      <Sparkles className="w-3 h-3" />
                      Featured Moment
                    </span>
                  )}
                </div>

                {/* Bottom Caption & Expand Icon */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex items-end justify-between">
                  <div>
                    <h3
                      className={`font-bold text-white tracking-tight drop-shadow-sm ${
                        isHero
                          ? 'text-lg sm:text-2xl'
                          : isMedium
                          ? 'text-sm sm:text-base'
                          : 'text-sm'
                      }`}
                    >
                      {photo.title}
                    </h3>
                    <p className="text-slate-300 text-xs mt-1 line-clamp-1">
                      Hindi Mahavidyalaya Autonomous Campus
                    </p>
                  </div>

                  {/* Hover Eye Pill */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/25 group-hover:bg-[#ea580c] text-white flex items-center justify-center backdrop-blur-md transition-all group-hover:scale-110 shadow-md">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                  </div>
                </div>

                {/* Orange Hover Border Highlight */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ea580c]/60 rounded-2xl sm:rounded-3xl transition-colors duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* ================= 4. "Load More Moments" Button ================= */}
        {visibleCount < filteredPhotos.length && (
          <div className="text-center mb-14">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#ea580c] text-[#1e1b4b] hover:text-white border-2 border-slate-200 hover:border-[#ea580c] font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95"
            >
              <span>Load More Photos</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 hover:bg-white/20">
                Showing {displayedPhotos.length} of {filteredPhotos.length}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= 5. Live Campus Moments Filmstrip Ribbon ================= */}
        <div className="mt-8 pt-8 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1b4b]">
                Continuous Campus Reel
              </h3>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                · Hover to pause, click any photo to enlarge
              </span>
            </div>
            <span className="text-xs font-semibold text-[#ea580c]">
              180+ Moments in Gallery
            </span>
          </div>

          {/* Infinite Marquee Ribbon */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100/80 p-2 sm:p-3 border border-slate-200/80 shadow-inner">
            <div className="campus-gallery-marquee-track flex gap-3">
              {[...filmstripPhotos, ...filmstripPhotos].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => setSelectedPhotoIndex(item.id % filteredPhotos.length)}
                  className="group relative w-36 sm:w-44 h-24 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer shadow-xs border border-white/60 hover:scale-105 hover:shadow-md transition-all duration-200"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1.5 rounded-full bg-[#ea580c] text-white shadow-md">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 6. High-Definition Lightbox Modal ================= */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/85 backdrop-blur-md"
          onClick={() => setSelectedPhotoIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="gallery-modal-content relative max-w-5xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Info Bar */}
            <div className="w-full flex items-center justify-between pb-3 px-2 sm:px-4 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                  {filteredPhotos[selectedPhotoIndex].categoryLabel}
                </span>
                <span className="text-xs text-slate-300 font-mono ml-2 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                  Photo {selectedPhotoIndex + 1} of {filteredPhotos.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#ea580c] text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/25 shadow-lg"
                aria-label="Close photo"
                title="Close (Esc)"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Photo Stage */}
            <div className="relative w-full flex items-center justify-center">
              {/* Previous Photo Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/70 hover:bg-[#ea580c] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous photo"
                title="Previous (Arrow Left)"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* Main Photo Card */}
              <div className="relative max-h-[75vh] sm:max-h-[80vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-black/60 border-2 border-[#ea580c] shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_60px_rgba(234,88,12,0.4)]">
                <img
                  src={filteredPhotos[selectedPhotoIndex].src}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  className="max-h-[75vh] sm:max-h-[80vh] max-w-full w-auto h-auto object-contain block mx-auto transition-transform duration-300"
                />
              </div>

              {/* Next Photo Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/70 hover:bg-[#ea580c] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next photo"
                title="Next (Arrow Right)"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Bottom Caption & Keyboard Tip */}
            <div className="pt-3.5 text-center">
              <h4 className="text-white font-bold text-sm sm:text-base">
                {filteredPhotos[selectedPhotoIndex].title}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Hindi Mahavidyalaya Autonomous Campus · Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">→</kbd> to navigate · Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">Esc</kbd> to close
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
