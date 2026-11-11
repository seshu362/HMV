import { useState } from 'react'
import { ArrowLeft, ArrowRight, Clock, MapPin, ChevronRight, Sparkles } from 'lucide-react'

// Authentic Hindi Mahavidyalaya News & Events imagery
import republicDayImg from '../assets/NEWS AND EVENTS/76TH REPUBLIC DAY 2025.jpg'
import hindiDiwasImg from '../assets/NEWS AND EVENTS/Celebration of Hindi Diwas.jpg'
import convocationImg from '../assets/NEWS AND EVENTS/Convocation Day on 15 Feb 2017.jpg'
import ganeshChaturthiImg from '../assets/NEWS AND EVENTS/Ganesh Chaturthi celebrations in college.jpg'
import annualFunctionImg from '../assets/NEWS AND EVENTS/Grand Celebration of Annual Function 2025 in Hindi Mahavidyalaya.jpg'
import womensDay2018Img from "../assets/NEWS AND EVENTS/INTERNATIONAL WOMEN'S DAY 2018.jpg"
import womensDay2025Img from "../assets/NEWS AND EVENTS/International Women's Day 2025 Celebrated in Hindi Mahavidyalaya College.jpg"
import scienceDayImg from '../assets/NEWS AND EVENTS/NATIONAL SCIENCE DAY 2025.jpg'
import swachhBharatImg from '../assets/NEWS AND EVENTS/swachh Bharat NCC.jpg'
import teachersDayImg from '../assets/NEWS AND EVENTS/Teachers day celebrations 2025.jpg'
import telanganaDayImg from '../assets/NEWS AND EVENTS/Telangana Formation Day Flag Hosting.jpg'

const eventsData = [
  {
    id: 1,
    tag: 'ANNUAL DAY',
    month: 'MARCH',
    day: '22',
    title: 'Grand Celebration of Annual Function 2025 in Hindi Mahavidyalaya',
    time: '4:00 PM Onwards',
    venue: 'Main Auditorium, Hindi Mahavidyalaya, Nallakunta, Hyderabad',
    description:
      'Celebration of academic milestones, vibrant cultural performances, theatrical dramas, and annual collegiate award distributions.',
    image: annualFunctionImg,
    dotColor: '#ea580c',
  },
  {
    id: 2,
    tag: 'REPUBLIC DAY',
    month: 'JANUARY',
    day: '26',
    title: '76th Republic Day Celebrations 2025',
    time: '8:30 AM Onwards',
    venue: 'Main Campus Grounds, Hindi Mahavidyalaya',
    description:
      'Unfurling of the National Tricolour, NCC guard of honour, inspiring patriotic addresses, and ceremonial parade honouring the 76th Republic Day.',
    image: republicDayImg,
    dotColor: '#1e1b4b',
  },
  {
    id: 3,
    tag: 'SCIENCE EXPO',
    month: 'FEBRUARY',
    day: '28',
    title: 'National Science Day 2025',
    time: '9:30 AM to 4:30 PM',
    venue: 'Science Laboratories & Exhibition Hall, HMV Campus',
    description:
      'Interactive science exhibitions, working research prototypes, student scientific paper presentations, and inter-collegiate quiz competitions.',
    image: scienceDayImg,
    dotColor: '#2e1065',
  },
  {
    id: 4,
    tag: "WOMEN'S DAY",
    month: 'MARCH',
    day: '08',
    title: "International Women's Day 2025 Celebrated in Hindi Mahavidyalaya College",
    time: '10:00 AM to 2:00 PM',
    venue: 'Central Seminar Hall, Hindi Mahavidyalaya',
    description:
      'Commemorating women empowerment with keynote speeches from women leaders, student symposiums, and special felicitations of distinguished achievers.',
    image: womensDay2025Img,
    dotColor: '#ea580c',
  },
  {
    id: 5,
    tag: 'HINDI DIWAS',
    month: 'SEPTEMBER',
    day: '14',
    title: 'Celebration of Hindi Diwas',
    time: '10:00 AM to 4:00 PM',
    venue: 'Central Auditorium, Hindi Mahavidyalaya',
    description:
      'National Hindi Diwas commemoration with literary symposia, debate championships, kavi sammelan, and celebration of linguistic heritage.',
    image: hindiDiwasImg,
    dotColor: '#1e1b4b',
  },
  {
    id: 6,
    tag: "TEACHERS' DAY",
    month: 'SEPTEMBER',
    day: '05',
    title: 'Teachers Day Celebrations 2025',
    time: '11:00 AM Onwards',
    venue: 'College Auditorium, Hindi Mahavidyalaya',
    description:
      'Heartfelt tribute to revered educators and mentors featuring student cultural performances, traditional guru vandana, and faculty felicitations.',
    image: teachersDayImg,
    dotColor: '#ea580c',
  },
  {
    id: 7,
    tag: 'CONVOCATION',
    month: 'FEBRUARY',
    day: '15',
    title: 'Convocation Day on 15 Feb 2017',
    time: '10:30 AM Onwards',
    venue: 'Auditorium & Convocation Hall, Hindi Mahavidyalaya',
    description:
      'Conferring graduation degrees, university medals, and academic honours to undergraduate and postgraduate batches by university leaders.',
    image: convocationImg,
    dotColor: '#1e1b4b',
  },
  {
    id: 8,
    tag: 'NCC OUTREACH',
    month: 'OCTOBER',
    day: '02',
    title: 'Swachh Bharat NCC Campaign',
    time: '7:30 AM to 11:30 AM',
    venue: 'Nallakunta & Surrounding Hyderabad Community',
    description:
      'Civic cleanliness drive, public sanitation awareness rally, and social service movement spearheaded by the college NCC and NSS units.',
    image: swachhBharatImg,
    dotColor: '#2e1065',
  },
  {
    id: 9,
    tag: 'FESTIVAL',
    month: 'SEPTEMBER',
    day: '07',
    title: 'Ganesh Chaturthi Celebrations in College',
    time: '9:30 AM Onwards',
    venue: 'College Campus, Hindi Mahavidyalaya',
    description:
      'Traditional festive puja, devotional cultural prayers, eco-friendly idol installation, and festive community celebrations by students and staff.',
    image: ganeshChaturthiImg,
    dotColor: '#ea580c',
  },
  {
    id: 10,
    tag: 'STATE DAY',
    month: 'JUNE',
    day: '02',
    title: 'Telangana Formation Day Flag Hosting',
    time: '9:00 AM Onwards',
    venue: 'Administrative Block Plaza, Hindi Mahavidyalaya',
    description:
      'Ceremonial state flag unfurling, rendition of state songs, and celebrations honoring the rich cultural heritage and progress of Telangana.',
    image: telanganaDayImg,
    dotColor: '#1e1b4b',
  },
  {
    id: 11,
    tag: "WOMEN'S DAY",
    month: 'MARCH',
    day: '08',
    title: "INTERNATIONAL WOMEN'S DAY 2018",
    time: '11:00 AM to 3:00 PM',
    venue: 'Seminar Hall, Hindi Mahavidyalaya',
    description:
      'Honouring women faculties, inspiring talks on women in leadership, and student presentations on gender equality and societal development.',
    image: womensDay2018Img,
    dotColor: '#2e1065',
  },
]

export default function NewsEventsSection() {
  const [activeIdx, setActiveIdx] = useState(0)

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % eventsData.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + eventsData.length) % eventsData.length)
  }

  return (
    <section id="events" className="relative py-20 lg:py-28 bg-[#fafafc] overflow-hidden">
      
      {/* Halftone Dot Grid across the ENTIRE Section */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(234, 88, 12, 0.25) 1.3px, transparent 1.3px)`,
          backgroundSize: '14px 14px',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 50%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: Heading, Description & Action ================= */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
                NEWS AND EVENTS
              </span>
            </div>

            {/* Heading matching Figma */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b4b] leading-[1.15] tracking-tight mb-6">
              Featured news and events
            </h2>

            {/* Paragraph matching Figma */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              From our annual sport days to social events, there's never a dull moment at the College. We believe in fostering a strong sense of community, and our events are a testament to that. Stay updated on all the latest news and events by visiting our website regularly.
            </p>

            {/* Learn More button & Navigation Arrows */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#all-events"
                className="px-6 py-2.5 rounded-lg border border-slate-700 hover:border-slate-900 bg-white hover:bg-slate-900 text-slate-800 hover:text-white text-sm font-medium transition-all shadow-xs"
              >
                Learn More
              </a>

              {/* Prev / Next Buttons matching Figma */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous event"
                  className="w-10 h-10 rounded-full border border-slate-300 hover:border-slate-800 bg-white text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next event"
                  className="w-10 h-10 rounded-full border border-slate-300 hover:border-slate-800 bg-white text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Large 3D Stacked Card Deck ================= */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center pt-8 pb-4">
            
            {/* Expanded Stack Container for Big Cards */}
            <div className="event-stack-container relative w-full max-w-[620px] h-[550px] sm:h-[580px]">
              {eventsData.map((event, idx) => {
                const position = (idx - activeIdx + eventsData.length) % eventsData.length
                const isFront = position === 0
                const isSecond = position === 1
                const isThird = position === 2
                const isHidden = position > 2

                return (
                  <article
                    key={event.id}
                    onClick={() => {
                      if (!isFront && !isHidden) setActiveIdx(idx)
                    }}
                    style={
                      {
                        zIndex: isFront ? 30 : isSecond ? 20 : isThird ? 10 : 0,
                        transform: isFront
                          ? 'translateY(0px) scale(1)'
                          : isSecond
                          ? 'translateY(-2.5rem) scale(0.95)'
                          : isThird
                          ? 'translateY(-4.8rem) scale(0.90)'
                          : 'translateY(-5.5rem) scale(0.85)',
                        opacity: isFront ? 1 : isSecond ? 0.85 : isThird ? 0.65 : 0,
                        pointerEvents: isHidden ? 'none' : 'auto',
                        visibility: isHidden ? 'hidden' : 'visible',
                      } as React.CSSProperties
                    }
                    className={`event-stacked-card absolute inset-x-0 top-6 sm:top-8 bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-900/15 border border-slate-200/80 overflow-hidden transition-all duration-500 ease-in-out select-none ${
                      isFront ? 'cursor-default' : isHidden ? 'pointer-events-none' : 'cursor-pointer hover:opacity-95'
                    }`}
                  >
                    {/* Card Header matching snippet with Close/Next label &#10539; */}
                    <header className="px-5 sm:px-6 py-3.5 bg-gradient-to-r from-slate-900 to-[#1e1b4b] text-white flex items-center justify-between border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          {event.tag} · {event.month} {event.day}
                        </span>
                      </div>
                      
                      {/* Cycle Icon matching snippet (&#10539;) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNext()
                        }}
                        aria-label="Next card"
                        className="text-white/80 hover:text-white hover:rotate-90 transition-transform duration-300 text-lg font-bold px-1.5 py-0.5 rounded-md hover:bg-white/10 cursor-pointer"
                        title="Next Event"
                      >
                        &#10539;
                      </button>
                    </header>

                    {/* BIG Full-Width Hero Event Image */}
                    <div className="relative w-full h-[240px] sm:h-[280px] bg-slate-900 overflow-hidden group">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      
                      {/* Top Floating Glass Badge matching Figma */}
                      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider border border-white/15">
                        {event.tag}
                      </div>

                      {/* Subtle gradient vignette at bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>

                    {/* Event Details Content Tray */}
                    <div className="p-5 sm:p-6 bg-white flex flex-col justify-between space-y-4">
                      
                      {/* Orange Calendar Date Badge + Title matching Figma */}
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#ff5722] to-[#f4511e] text-white flex flex-col items-center justify-center shadow-lg shadow-orange-500/25">
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 leading-none">
                            {event.month}
                          </span>
                          <span className="text-xl sm:text-2xl font-black leading-none mt-1">
                            {event.day}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-[#1e1b4b] leading-snug line-clamp-2">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      {/* Meta information: Time & Venue */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#ff5722] shrink-0" />
                          <span><strong className="text-slate-800">Time:</strong> {event.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                          <span className="line-clamp-1"><strong className="text-slate-800">Venue:</strong> {event.venue}</span>
                        </div>
                      </div>

                      {/* Wide Dark Navy Learn More Pill Button matching Figma */}
                      <div className="pt-1">
                        <a
                          href="#event-detail"
                          className="w-full py-3 px-5 rounded-2xl bg-[#1e1b4b] hover:bg-[#2e2970] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm shadow-indigo-950/20 transition-all duration-200"
                        >
                          <span>Learn More</span>
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>

                    </div>
                  </article>
                )
              })}
            </div>

            {/* Step Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-xs sm:max-w-md mx-auto">
              {eventsData.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Go to event ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIdx === i ? 'w-8 bg-[#ff5722]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
