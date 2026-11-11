interface RecruiterItem {
  id: string
  name: string
  categoryLabel: string
  accentColor: string
  tier?: 'tier-1' | 'marquee'
}

const recruitersList: RecruiterItem[] = [
  {
    id: 'barclays',
    name: 'BARCLAYS',
    categoryLabel: 'Banking & FinTech',
    accentColor: '#00aeef',
    tier: 'tier-1'
  },
  {
    id: 'bigbasket',
    name: 'bigbasket',
    categoryLabel: 'E-Commerce & Supply',
    accentColor: '#84c225',
    tier: 'marquee'
  },
  {
    id: 'cisco',
    name: 'CISCO',
    categoryLabel: 'Networking & Cloud',
    accentColor: '#1ba0d7',
    tier: 'tier-1'
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    categoryLabel: 'IT & Digital Systems',
    accentColor: '#0033a0',
    tier: 'marquee'
  },
  {
    id: 'cultfit',
    name: 'cult.fit',
    categoryLabel: 'HealthTech & Consumer',
    accentColor: '#ff3278'
  },
  {
    id: 'apco',
    name: 'APCO WORLDWIDE',
    categoryLabel: 'Global PR & Strategy',
    accentColor: '#0b2545',
    tier: 'marquee'
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    categoryLabel: 'Audit & Consulting',
    accentColor: '#86bc25',
    tier: 'tier-1'
  },
  {
    id: 'tcs',
    name: 'TCS',
    categoryLabel: 'Enterprise IT Services',
    accentColor: '#2b547e',
    tier: 'marquee'
  },
  {
    id: 'infosys',
    name: 'Infosys',
    categoryLabel: 'Cloud & Next-Gen IT',
    accentColor: '#007cc3',
    tier: 'marquee'
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    categoryLabel: 'Banking & Financial',
    accentColor: '#004c8f',
    tier: 'tier-1'
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    categoryLabel: 'Retail & Commercial Bank',
    accentColor: '#93181a',
    tier: 'marquee'
  },
  {
    id: 'wipro',
    name: 'Wipro',
    categoryLabel: 'Technology & Digital',
    accentColor: '#582c83',
    tier: 'marquee'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    categoryLabel: 'Cloud & E-Commerce',
    accentColor: '#ff9900',
    tier: 'tier-1'
  },
  {
    id: 'genpact',
    name: 'Genpact',
    categoryLabel: 'Analytics & BPM',
    accentColor: '#ff0036'
  },
  {
    id: 'accenture',
    name: 'Accenture',
    categoryLabel: 'Strategy & Technology',
    accentColor: '#a100ff',
    tier: 'tier-1'
  },
  {
    id: 'techmahindra',
    name: 'Tech Mahindra',
    categoryLabel: 'IT & Telecom Services',
    accentColor: '#d6001c'
  }
]

// Split recruiters into two continuous flowing rows
const trackOne = [...recruitersList.slice(0, 8), ...recruitersList.slice(0, 8)]
const trackTwo = [...recruitersList.slice(8), ...recruitersList.slice(8)]

export default function RecruitersSection() {
  return (
    <section id="our-recruiters" className="relative w-full py-12 sm:py-16 bg-white overflow-hidden border-t border-slate-100 select-none">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#1e1b4b 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-8 relative z-20">
          <div className="inline-flex items-center gap-2 justify-center mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f95721]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#f95721]">
              PLACEMENT PARTNERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b4b] tracking-tight">
            Our Recruiters
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Top global enterprises and industry leaders regularly recruiting from Hindi Mahavidyalaya.
          </p>
        </div>

        {/* Continuous Flowing Logo Marquee */}
        <div className="relative overflow-hidden py-1">
          {/* Edge gradient fades for smooth infinite look */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Track 1 (Left Scrolling) */}
          <div className="flex gap-4 sm:gap-6 marquee-flow-left py-2 hover:[animation-play-state:paused]">
            {trackOne.map((item, idx) => (
              <div
                key={`track1-${item.id}-${idx}`}
                className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:border-orange-300 hover:-translate-y-0.5 transition-all cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-wider uppercase shadow-xs flex-shrink-0"
                  style={{
                    backgroundColor: `${item.accentColor}15`,
                    color: item.accentColor,
                    border: `1.5px solid ${item.accentColor}30`
                  }}
                >
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="text-sm font-extrabold text-[#1e1b4b] tracking-wide leading-tight flex items-center gap-1.5 whitespace-nowrap">
                    {item.name}
                    {item.tier === 'tier-1' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Tier-1 Partner" />
                    )}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                    {item.categoryLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Marquee Track 2 (Right Scrolling) */}
          <div className="flex gap-4 sm:gap-6 marquee-flow-right py-2 mt-3 hover:[animation-play-state:paused]">
            {trackTwo.map((item, idx) => (
              <div
                key={`track2-${item.id}-${idx}`}
                className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:border-orange-300 hover:-translate-y-0.5 transition-all cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-wider uppercase shadow-xs flex-shrink-0"
                  style={{
                    backgroundColor: `${item.accentColor}15`,
                    color: item.accentColor,
                    border: `1.5px solid ${item.accentColor}30`
                  }}
                >
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="text-sm font-extrabold text-[#1e1b4b] tracking-wide leading-tight flex items-center gap-1.5 whitespace-nowrap">
                    {item.name}
                    {item.tier === 'tier-1' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Tier-1 Partner" />
                    )}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                    {item.categoryLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Animation Styles */}
      <style>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .marquee-flow-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 34s linear infinite;
        }
        .marquee-flow-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 34s linear infinite;
        }
      `}</style>
    </section>
  )
}
