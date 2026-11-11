import {
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react'

export default function FooterSection() {
  return (
    <footer id="contact" className="relative w-full bg-[#3d2766] text-white overflow-hidden select-none">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Identity & Crest using favicon.svg (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/favicon.svg"
                alt="Hindi Mahavidyalaya Crest"
                className="w-12 h-12 rounded-full object-contain bg-white/10 p-1 border border-white/20 shadow-md flex-shrink-0"
              />
              <div>
                <h3 className="text-white font-extrabold text-base tracking-wider uppercase leading-snug">
                  HINDI MAHAVIDYALAYA
                </h3>
                <p className="text-[11px] font-bold text-[#f95721] tracking-wider uppercase">
                  AUTONOMOUS &amp; NAAC RE-ACCREDITED
                </p>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm font-normal">
              Arts, Commerce, Science and P.G. Centre, affiliated to Osmania University.
            </p>

            {/* Social Media Circular Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all text-xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all text-xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all text-xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (4 cols, 2 sub-columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#f95721]">
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-white/85">
              <div className="space-y-2.5">
                <div><a href="#about" className="hover:text-white hover:underline transition-colors">Insight</a></div>
                <div><a href="#admissions" className="hover:text-white hover:underline transition-colors">Admission Procedure</a></div>
                <div><a href="#admissions" className="hover:text-white hover:underline transition-colors">Apply Online</a></div>
                <div><a href="#notices" className="hover:text-white hover:underline transition-colors">Mandatory Disclosure</a></div>
                <div><a href="#about" className="hover:text-white hover:underline transition-colors">FAQs</a></div>
              </div>
              <div className="space-y-2.5">
                <div><a href="#about" className="hover:text-white hover:underline transition-colors">President's Message</a></div>
                <div><a href="#life-on-campus" className="hover:text-white hover:underline transition-colors">Student Accommodation</a></div>
                <div><a href="#about" className="hover:text-white hover:underline transition-colors">Meet the team</a></div>
                <div><a href="#contact" className="hover:text-white hover:underline transition-colors">Contact</a></div>
                <div><a href="#academics" className="hover:text-white hover:underline transition-colors">Careers</a></div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Us (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#f95721]">
              CONTACT US
            </h4>
            <div className="space-y-3.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f95721] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Nallakunta, Hyderabad,<br />
                  Telangana 500 044
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f95721] flex-shrink-0" />
                <a href="tel:+914027616330" className="hover:text-white transition-colors">
                  +91 40 2761 6330
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f95721] flex-shrink-0" />
                <a href="mailto:info@hindimahavidyalaya.ac.in" className="hover:text-white transition-colors truncate">
                  info@hindimahavidyalaya.ac.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Map Card matching the reference design (3 cols) */}
          <div className="lg:col-span-3">
            <a
              href="https://maps.google.com/?q=Hindi+Mahavidyalaya+Nallakunta+Hyderabad"
              target="_blank"
              rel="noreferrer"
              title="Open Hindi Mahavidyalaya on Google Maps"
              className="group block relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-[#f7f5ec] transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Stylized Hyderabad Map SVG */}
              <svg
                viewBox="0 0 320 200"
                className="w-full h-full object-cover"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Land background */}
                <rect width="320" height="200" fill="#f6f3eb" />
                
                {/* Parks / Green patches */}
                <path d="M 0 0 L 80 0 L 60 50 L 0 40 Z" fill="#e5efe3" />
                <path d="M 240 140 L 320 120 L 320 200 L 250 200 Z" fill="#e5efe3" />
                <circle cx="270" cy="40" r="30" fill="#e5efe3" />

                {/* River Musi / Water Body */}
                <path
                  d="M 230 0 C 240 40, 245 80, 255 120 C 265 160, 275 180, 320 200 L 320 0 Z"
                  fill="#98d8ee"
                  opacity="0.85"
                />

                {/* Road network */}
                <path d="M 0 100 Q 150 90, 320 120" stroke="#f6d396" strokeWidth="6" fill="none" />
                <path d="M 70 0 Q 80 100, 110 200" stroke="#ffffff" strokeWidth="5" fill="none" />
                <path d="M 0 50 Q 160 60, 250 30" stroke="#ffffff" strokeWidth="3.5" fill="none" />
                <path d="M 120 0 Q 150 110, 260 170" stroke="#f6d396" strokeWidth="4.5" fill="none" />
                <path d="M 0 140 Q 130 140, 250 130" stroke="#ffffff" strokeWidth="4" fill="none" />
                <path d="M 190 60 L 320 50" stroke="#f6d396" strokeWidth="3" fill="none" />

                {/* Road centerlines */}
                <path d="M 0 100 Q 150 90, 320 120" stroke="#fcdca3" strokeWidth="3" fill="none" />

                {/* Area labels matching screenshot */}
                <text x="18" y="28" fill="#1e1b4b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                  A HILLS
                </text>
                <text x="18" y="38" fill="#475569" fontSize="7" fontFamily="sans-serif">
                  హిల్స్
                </text>

                <text x="15" y="112" fill="#1e1b4b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                  TNAM
                </text>
                <text x="15" y="122" fill="#475569" fontSize="7" fontFamily="sans-serif">
                  పట్నం
                </text>

                {/* Big Hyderabad Title */}
                <text x="95" y="65" fill="#1e1b4b" fontSize="18" fontWeight="bold" fontFamily="sans-serif">
                  Hyderabad
                </text>
                <text x="95" y="86" fill="#1e1b4b" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
                  హైదరాబాద్
                </text>

                {/* Nampally & Kachiguda markers */}
                <text x="98" y="125" fill="#1e1b4b" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
                  NAMPALLY
                </text>
                <text x="108" y="137" fill="#475569" fontSize="7" fontFamily="sans-serif">
                  నాంపల్లి
                </text>

                <text x="185" y="122" fill="#1e1b4b" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
                  KACHIGUDA
                </text>
                <text x="195" y="134" fill="#475569" fontSize="7" fontFamily="sans-serif">
                  కాచిగూడ
                </text>

                <text x="285" y="125" fill="#1e1b4b" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
                  AM
                </text>

                {/* Hindi Mahavidyalaya College Pin Landmark */}
                <g transform="translate(160, 68)">
                  <circle cx="0" cy="0" r="10" fill="#f95721" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="5" fill="#f95721" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="8" y="-9" width="62" height="15" rx="3" fill="#1e1b4b" />
                  <text x="12" y="1" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
                    Nallakunta (HMV)
                  </text>
                </g>
              </svg>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <span>Open Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="w-full bg-[#2c1b50] border-t border-white/10 py-3.5 px-6 sm:px-10 lg:px-14 text-[11px] text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-center sm:text-left">
            &copy; Hindi Mahavidyalaya. All Rights Reserved.
          </p>
          <p className="text-center sm:text-right text-white/50">
            Nallakunta, Hyderabad
          </p>
        </div>
      </div>
    </footer>
  )
}
