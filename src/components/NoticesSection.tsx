import { useState, useMemo, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Download, ExternalLink, Filter, CheckCircle2, FileText } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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
  { id: 1, badge: 'New', badgeType: 'orange', title: 'Admission process 2026-27', subtitle: 'Admissions', category: 'News', date: 'April 2026', fileSize: '1.4 MB PDF' },
  { id: 2, badge: 'Results', badgeType: 'purple', title: 'BA, B.Voc, BBA, B.Com and B.Sc results', subtitle: 'April 2026 · Regular and supplementary', category: 'Exam results', date: 'April 2026', fileSize: 'Online Portal' },
  { id: 3, badge: 'Timetable', badgeType: 'indigo', title: 'Internal I, Semester III and V', subtitle: 'July 2026 · Examinations', category: 'Exam Notifications', date: 'July 2026', fileSize: '650 KB PDF' },
  { id: 4, badge: 'New', badgeType: 'orange', title: 'UG and PG convocation notice 2026', subtitle: 'Events', category: 'News', date: 'May 2026', fileSize: '820 KB PDF' },
  { id: 5, badge: 'Timetable', badgeType: 'indigo', title: 'PG I Year, Semester II regular exams', subtitle: 'July 2026 · Examinations', category: 'Exam Notifications', date: 'July 2026', fileSize: '710 KB PDF' },
  { id: 6, badge: 'Results', badgeType: 'purple', title: 'M.Com, M.Sc & MA Semester IV Final Results', subtitle: 'April 2026 · Autonomous Cell', category: 'Exam results', date: 'April 2026', fileSize: 'Online Portal' },
  { id: 7, badge: 'Circular', badgeType: 'slate', title: 'Official Academic Calendar & Holiday Schedule 2026-27', subtitle: 'Downloads · Dean Office', category: 'Downloads', date: 'June 2026', fileSize: '2.1 MB PDF' },
]

const badgeStyles: Record<string, { bg: string; color: string; border: string }> = {
  orange: { bg: 'rgba(234,88,12,0.08)', color: '#ea580c', border: 'rgba(234,88,12,0.2)' },
  purple: { bg: 'rgba(168,85,247,0.08)', color: '#9333ea', border: 'rgba(168,85,247,0.2)' },
  indigo: { bg: 'rgba(99,102,241,0.08)', color: '#6366f1', border: 'rgba(99,102,241,0.2)' },
  slate:  { bg: 'rgba(100,116,139,0.08)', color: '#64748b', border: 'rgba(100,116,139,0.2)' },
}

export default function NoticesSection() {
  const [activeTab, setActiveTab] = useState<TabType>('Exam results')
  const [searchQuery, setSearchQuery] = useState('')
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const tabs: TabType[] = ['Exam results', 'Exam Notifications', 'News', 'Downloads']

  const filteredNotices = useMemo(() => {
    return noticesList.filter(item => {
      const matchesTab = activeTab === 'All' || item.category === activeTab
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTab && matchesSearch
    })
  }, [activeTab, searchQuery])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Stagger list items on tab change
  useEffect(() => {
    if (!listRef.current) return
    const items = Array.from(listRef.current.children)
    gsap.fromTo(items,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
    )
  }, [activeTab, searchQuery])

  const handleDownload = (id: number) => {
    setDownloadingId(id)
    setTimeout(() => setDownloadingId(null), 1200)
  }

  return (
    <section
      id="notices"
      ref={sectionRef}
      style={{
        background: 'var(--brand-cream, #fdf8f3)',
        padding: 'clamp(2rem, 3.5vw, 2.75rem) clamp(1.25rem, 4vw, 2rem)',
        fontFamily: 'Inter, sans-serif',
        opacity: 0,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
            Notices & Circulars
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#1e1b4b',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Latest Notices
          </h2>
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Tabs pill group */}
          <div
            style={{
              display: 'flex',
              gap: '0.25rem',
              background: '#fff',
              padding: '5px',
              borderRadius: '14px',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              overflowX: 'auto',
              flexWrap: 'nowrap',
            }}
          >
            {tabs.map(tab => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                    background: isActive ? '#1e1b4b' : 'transparent',
                    color: isActive ? '#fff' : '#64748b',
                    boxShadow: isActive ? '0 4px 12px rgba(30,27,75,0.25)' : 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* Search + Filter */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flex: '0 0 auto' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search notices..."
                style={{
                  paddingLeft: '36px', paddingRight: '12px', paddingTop: '0.55rem', paddingBottom: '0.55rem',
                  borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#fff',
                  fontSize: '0.78rem', color: '#1e1b4b', outline: 'none',
                  fontFamily: 'Inter, sans-serif', width: '200px',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#ea580c' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0' }}
              />
            </div>
            <button
              onClick={() => setActiveTab(activeTab === 'All' ? 'Exam results' : 'All')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.55rem 1rem', borderRadius: '10px',
                background: activeTab === 'All' ? '#ea580c' : '#1e1b4b',
                color: '#fff', border: 'none', cursor: 'pointer',
                fontSize: '0.78rem', fontWeight: 600, fontFamily: 'Inter, sans-serif',
                transition: 'background 0.2s',
              }}
            >
              <Filter size={13} />
              {activeTab === 'All' ? 'All' : 'Filter'}
            </button>
          </div>
        </div>

        {/* Notice list */}
        <div
          style={{
            background: '#fff',
            borderRadius: '20px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}
        >
          <div ref={listRef}>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice, i) => {
                const bs = badgeStyles[notice.badgeType]
                const isDownloading = downloadingId === notice.id
                return (
                  <div
                    key={notice.id}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      borderBottom: i < filteredNotices.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background 0.2s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = '#fdf8f3' }}
                    onMouseOut={e => { e.currentTarget.style.background = '#fff' }}
                  >
                    {/* Left */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '0' }}>
                      <span
                        style={{
                          display: 'inline-flex', alignItems: 'center',
                          padding: '0.25rem 0.65rem', borderRadius: '100px',
                          fontSize: '0.65rem', fontWeight: 700,
                          background: bs.bg, color: bs.color,
                          border: `1px solid ${bs.border}`,
                          whiteSpace: 'nowrap', flexShrink: 0,
                        }}
                      >
                        {notice.badge}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <h3
                          style={{
                            fontWeight: 700, fontSize: '0.88rem', color: '#1e1b4b',
                            lineHeight: 1.35, marginBottom: '0.25rem',
                          }}
                        >
                          {notice.title}
                        </h3>
                        <p style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>
                          {notice.subtitle} · {notice.date} · {notice.fileSize}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                      <button
                        onClick={() => handleDownload(notice.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.35rem',
                          padding: '0.45rem 0.9rem', borderRadius: '8px',
                          background: 'transparent', border: '1px solid #e2e8f0',
                          color: '#475569', fontSize: '0.75rem', fontWeight: 600,
                          cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                        }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = '#ea580c40'; e.currentTarget.style.color = '#ea580c' }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569' }}
                      >
                        {isDownloading ? <><CheckCircle2 size={13} style={{ color: '#10b981' }} /><span style={{ color: '#10b981' }}>Done</span></> : <><Download size={13} />PDF</>}
                      </button>
                      <a
                        href="#portal"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.35rem',
                          padding: '0.45rem 0.9rem', borderRadius: '8px',
                          background: '#1e1b4b', color: '#fff',
                          fontSize: '0.75rem', fontWeight: 600,
                          textDecoration: 'none', transition: 'background 0.2s',
                        }}
                        onMouseOver={e => { e.currentTarget.style.background = '#ea580c' }}
                        onMouseOut={e => { e.currentTarget.style.background = '#1e1b4b' }}
                      >
                        View <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                )
              })
            ) : (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <FileText size={36} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                <p style={{ fontWeight: 700, color: '#475569', fontSize: '0.9rem' }}>No notices found</p>
                <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                  Try different keywords or switch categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
