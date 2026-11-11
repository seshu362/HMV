import { useState, useMemo } from 'react'
import {
  Search,
  Download,
  ExternalLink,
  Filter,
  CheckCircle2,
  FileText
} from 'lucide-react'

type TabType = 'Exam results' | 'Exam Notifications' | 'News' | 'Downloads' | 'All'

interface NoticeItem {
  id: number
  badge: 'New' | 'Results' | 'Timetable' | 'Circular'
  badgeType: 'orange' | 'purple' | 'indigo' | 'slate'
  title: string
  subtitle: string
  category: TabType
  date: string
  fileSize: string
  link?: string
}

const noticesList: NoticeItem[] = [
  {
    id: 1,
    badge: 'New',
    badgeType: 'orange',
    title: 'Admission process 2026-27',
    subtitle: 'Admissions',
    category: 'News',
    date: 'April 2026',
    fileSize: '1.4 MB PDF',
  },
  {
    id: 2,
    badge: 'Results',
    badgeType: 'purple',
    title: 'BA, B.Voc, BBA, B.Com and B.Sc results',
    subtitle: 'April 2026 · Regular and supplementary',
    category: 'Exam results',
    date: 'April 2026',
    fileSize: 'Online Portal',
  },
  {
    id: 3,
    badge: 'Timetable',
    badgeType: 'indigo',
    title: 'Internal I, Semester III and V',
    subtitle: 'July 2026 · Examinations',
    category: 'Exam Notifications',
    date: 'July 2026',
    fileSize: '650 KB PDF',
  },
  {
    id: 4,
    badge: 'New',
    badgeType: 'orange',
    title: 'UG and PG convocation notice 2026',
    subtitle: 'Events',
    category: 'News',
    date: 'May 2026',
    fileSize: '820 KB PDF',
  },
  {
    id: 5,
    badge: 'Timetable',
    badgeType: 'indigo',
    title: 'PG I Year, Semester II regular exams',
    subtitle: 'July 2026 · Examinations',
    category: 'Exam Notifications',
    date: 'July 2026',
    fileSize: '710 KB PDF',
  },
  {
    id: 6,
    badge: 'Results',
    badgeType: 'purple',
    title: 'M.Com, M.Sc & MA Semester IV Final Results',
    subtitle: 'April 2026 · Autonomous Cell',
    category: 'Exam results',
    date: 'April 2026',
    fileSize: 'Online Portal',
  },
  {
    id: 7,
    badge: 'Circular',
    badgeType: 'slate',
    title: 'Official Academic Calendar & Holiday Schedule 2026-27',
    subtitle: 'Downloads · Dean Office',
    category: 'Downloads',
    date: 'June 2026',
    fileSize: '2.1 MB PDF',
  },
]

export default function NoticesSection() {
  const [activeTab, setActiveTab] = useState<TabType>('Exam results')
  const [searchQuery, setSearchQuery] = useState('')
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  const tabs: TabType[] = ['Exam results', 'Exam Notifications', 'News', 'Downloads']

  // Filter notices based on activeTab and searchQuery
  const filteredNotices = useMemo(() => {
    return noticesList.filter((item) => {
      const matchesTab = activeTab === 'All' || item.category === activeTab
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTab && matchesSearch
    })
  }, [activeTab, searchQuery])

  const handleDownload = (id: number) => {
    setDownloadingId(id)
    setTimeout(() => {
      setDownloadingId(null)
    }, 1200)
  }

  return (
    <section id="notices" className="relative pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-20 bg-[#fafafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* ================= 1. Header matching Figma ================= */}
        <div className="text-center mb-10 sm:mb-12">
          {/* Orange dot badge */}
          <div className="inline-flex items-center gap-2 justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
              NOTICES
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e1b4b] tracking-tight mt-3">
            Latest notices
          </h2>
        </div>

        {/* ================= 2. Controls Bar: Tabs & Search Bar ================= */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-6 mb-8">
          
          {/* Left: Filter Tabs matching Figma */}
          <div className="flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1e1b4b] text-white shadow-md shadow-indigo-950/20'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* Right: Search Box & Filter Button matching Figma */}
          <div className="flex items-center gap-2.5">
            {/* Search Input Pill */}
            <div className="relative flex-1 sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices, courses..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] transition-all shadow-xs"
              />
            </div>

            {/* Filter Button */}
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'All' ? 'Exam results' : 'All')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                activeTab === 'All'
                  ? 'bg-[#ea580c] text-white shadow-orange-500/20'
                  : 'bg-[#1e1b4b] hover:bg-[#2e2970] text-white shadow-indigo-950/20'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{activeTab === 'All' ? 'All' : 'Filter'}</span>
            </button>
          </div>

        </div>

        {/* ================= 3. White Notice List Container matching Figma ================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden divide-y divide-slate-100">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => {
              const isDownloading = downloadingId === notice.id

              return (
                <div
                  key={notice.id}
                  className="p-5 sm:p-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors duration-200 group"
                >
                  {/* Left: Badge + Title + Subtitle */}
                  <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                    
                    {/* Badge matching Figma colors */}
                    <div className="pt-0.5">
                      {notice.badgeType === 'orange' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-[#ea580c] border border-orange-200/60 shadow-2xs">
                          {notice.badge}
                        </span>
                      )}
                      {notice.badgeType === 'purple' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/60 shadow-2xs">
                          {notice.badge}
                        </span>
                      )}
                      {notice.badgeType === 'indigo' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 shadow-2xs">
                          {notice.badge}
                        </span>
                      )}
                      {notice.badgeType === 'slate' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60 shadow-2xs">
                          {notice.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-[#1e1b4b] group-hover:text-[#ea580c] transition-colors leading-snug">
                        {notice.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 flex items-center gap-2">
                        <span>{notice.subtitle}</span>
                      </p>
                    </div>

                  </div>

                  {/* Right: Action Buttons matching Figma */}
                  <div className="flex items-center gap-3 self-end md:self-center shrink-0 pt-2 md:pt-0">
                    
                    {/* Download PDF button */}
                    <button
                      type="button"
                      onClick={() => handleDownload(notice.id)}
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      {isDownloading ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                          <span className="text-emerald-700">Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-slate-500" />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>

                    {/* View Site ↗ Pill Button */}
                    <a
                      href="#portal"
                      className="px-5 py-2.5 rounded-xl bg-[#1e1b4b] hover:bg-[#2e2970] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-950/20 transition-all duration-200 hover:scale-102 active:scale-98"
                    >
                      <span>View Site</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                    </a>

                  </div>

                </div>
              )
            })
          ) : (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center">
              <FileText className="w-10 h-10 text-slate-300 mb-3" />
              <p className="text-base font-semibold text-slate-700">No notices found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching with different keywords or switch categories.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
