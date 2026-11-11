import { useState } from 'react'
import admissionsBg from '../assets/ADMISSIONS_IMG.png'
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react'

export default function AdmissionsSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: 'B.Sc. Computer Science',
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setModalOpen(false)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: 'B.Sc. Computer Science',
      })
    }, 2200)
  }

  return (
    <section
      id="admissions"
      className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#0a0c12]"
    >
      {/* Background Banner with Student in Hallway */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-right md:bg-[center_right] bg-no-repeat select-none pointer-events-none"
        style={{ backgroundImage: `url(${admissionsBg})` }}
      />

      {/* Dark gradient overlay on the left for contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e17]/95 via-[#0c0e17]/80 sm:via-[#0c0e17]/60 to-transparent z-10 pointer-events-none" />

      {/* Left Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-20 py-16 sm:py-20 lg:py-24">
        <div className="max-w-xl text-left">
          
          {/* Main Title matching reference design */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.12] mb-5">
            Ready to join <br />
            the 2026-27 <br />
            batch?
          </h2>

          {/* Subtitle */}
          <p className="text-white/80 text-sm sm:text-base font-normal max-w-md mb-8 sm:mb-10 leading-relaxed">
            Visit the campus, meet the faculty and start your application.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-[#f95721] hover:bg-[#ea580c] text-white font-medium text-sm sm:text-base shadow-lg shadow-orange-600/30 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start your enquiry</span>
            </button>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-5 sm:px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white font-medium text-sm sm:text-base border border-white/60 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Download admission guide</span>
            </button>
          </div>

        </div>
      </div>

      {/* ================= Interactive Application / Enquiry Modal ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e1b4b]">
                  Enquiry Submitted!
                </h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                  Thank you, <span className="text-[#1e1b4b] font-semibold">{formData.fullName}</span>. An admissions counselor will reach out shortly with the 2026-27 admission brochure.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#f95721] mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>2026-27 ADMISSIONS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1e1b4b]">
                    Start Your College Enquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your details to receive syllabus brochures, fee structure, and counselor guidance.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#f95721] focus:ring-1 focus:ring-[#f95721]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#f95721] focus:ring-1 focus:ring-[#f95721]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#f95721] focus:ring-1 focus:ring-[#f95721]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Programme of Interest
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#f95721] focus:ring-1 focus:ring-[#f95721] bg-white"
                    >
                      <option value="B.Sc. Computer Science">B.Sc. Computer Science (Autonomous)</option>
                      <option value="B.Com. Computer Applications">B.Com. Computer Applications</option>
                      <option value="B.Com. Honours">B.Com. (Honours / Regular)</option>
                      <option value="B.A. Mass Communication">B.A. (Journalism &amp; Mass Comm.)</option>
                      <option value="B.Voc. Software Development">B.Voc. Software Development (UGC Funded)</option>
                      <option value="B.B.A. Bachelor of Business Admin">B.B.A. Business Administration</option>
                      <option value="M.Sc. / M.Com. / M.A.">Postgraduate Programmes (M.Com. / M.A.)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#f95721] hover:bg-[#ea580c] text-white font-semibold text-sm tracking-wide shadow-md shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Enquiry &amp; Get Brochure</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
