import { useState } from 'react'
import { MapPin, Sparkles, BookOpen, Laptop, Trophy, Users, ArrowUpRight } from 'lucide-react'

interface FacilityItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  category: 'All' | 'Academic' | 'Labs' | 'Sports'
  tag: string
  metric: string
  icon: typeof BookOpen
}

const facilities: FacilityItem[] = [
  {
    id: 'heritage',
    title: 'Heritage Quadrangle & Main Administrative Block',
    subtitle: 'Collegiate Architecture',
    description:
      'Historic collegiate architecture in the heart of Nallakunta, featuring spacious ventilated smart lecture halls and student counseling suites.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85',
    category: 'Academic',
    tag: 'Main Campus',
    metric: 'Estd 1961 · 4.5 Acres',
    icon: Users,
  },
  {
    id: 'library',
    title: 'Central Digital E-Library & Reading Pavilions',
    subtitle: 'Knowledge Repository',
    description:
      'Over 55,000 print volumes, DELNET subscriptions, national research journals, and air-conditioned digital terminals for scholars.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=85',
    category: 'Academic',
    tag: 'Digital Learning',
    metric: '55,000+ Titles · INFLIBNET',
    icon: BookOpen,
  },
  {
    id: 'labs',
    title: 'AI Computing & Multimedia Language Centre',
    subtitle: 'Technology Infrastructure',
    description:
      'High-speed networked computing laboratories equipped with modern programming suites, data analytics tools, and linguistic software.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=85',
    category: 'Labs',
    tag: 'Computing Center',
    metric: '240+ High-End Terminals',
    icon: Laptop,
  },
  {
    id: 'sports',
    title: 'Inter-Collegiate Sports Grounds & Indoor Gym',
    subtitle: 'Athletics & Physical Wellness',
    description:
      'Full-size grounds for cricket, basketball, volleyball, table tennis, and a dedicated fitness gymnasium under experienced coaches.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=85',
    category: 'Sports',
    tag: 'Sports Complex',
    metric: 'Cricket, Volleyball & Fitness',
    icon: Trophy,
  },
]

export default function CampusSection() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Academic' | 'Labs' | 'Sports'>('All')

  const filtered =
    activeFilter === 'All' ? facilities : facilities.filter((f) => f.category === activeFilter)

  return (
    <section id="campus" className="relative py-20 lg:py-28 bg-[#fafafc] border-t border-slate-200/80 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
                CAMPUS &amp; FACILITIES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b4b] tracking-tight leading-tight">
              Where Learning Meets <br className="hidden sm:block" />
              <span className="text-[#f95721]">Inspiration</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              World-class infrastructure designed to foster intellectual discovery, scientific exploration, and vibrant community life in Hyderabad.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Academic', 'Labs', 'Sports'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#1e1b4b] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
                }`}
              >
                {filter === 'All' ? 'All Facilities' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((item, idx) => {
            const Icon = item.icon
            const isFeatured = idx === 0 && activeFilter === 'All'

            return (
              <article
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2' : ''
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative w-full overflow-hidden bg-slate-900 ${
                    isFeatured ? 'h-[300px] sm:h-[380px]' : 'h-[240px] sm:h-[270px]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#1e1b4b] uppercase tracking-wider shadow-xs border border-white/60">
                      <Icon className="w-3.5 h-3.5 text-[#f95721]" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between text-white">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-[#ff8a65] tracking-wide uppercase">
                        {item.subtitle}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-bold leading-tight text-white group-hover:text-[#ffedd5] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white items-center justify-center border border-white/30 group-hover:bg-[#f95721] group-hover:border-[#f95721] transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Lower Content */}
                <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1e1b4b] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{item.metric}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Location & Visiting Info */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#f95721] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1e1b4b]">
                Visit Our Historic Hyderabad Campus
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Nallakunta, Hyderabad, 500044 · Open Mon-Sat 9:00 AM – 5:00 PM for guided prospective admissions tours.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-6 py-2.5 rounded-full bg-[#1e1b4b] hover:bg-[#2d296c] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-2"
          >
            <span>Plan Campus Visit</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
          </a>
        </div>

      </div>
    </section>
  )
}
