import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Users, Map, ChevronDown, ChevronUp, Mail, Send, CheckCircle2 
} from 'lucide-react';

function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "Is YATRAsathi free to use?", a: "Yes, our core AI travel planning features are completely free for travelers. We make money through partner commissions when you book hotels or transport through our platform." },
    { q: "How accurate are the AI travel plans?", a: "Our AI processes over 10,000 data points including real-time weather, crowd levels, travel times, and verified user reviews to create highly optimized and practical itineraries." },
    { q: "Can I modify the generated itinerary?", a: "Absolutely! The AI gives you a solid foundation, but you have full control to swap activities, change hotels, or adjust timings to suit your preferences." },
    { q: "How do restaurants get listed?", a: "Businesses undergo a manual verification process by our team within 48 hours of registration to ensure quality and authenticity for our users." },
    { q: "Is my payment information secure?", a: "Yes, all transactions are processed through bank-level encrypted payment gateways. We do not store your credit card details on our servers." }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00FF9D] selection:text-black">
      
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          <div className="flex gap-6 items-center text-sm font-medium">
            <Link to="/plan" className="hover:text-[#00FF9D] transition-colors">Start Planning</Link>
            <Link to="/partner-onboarding" className="text-gray-400 hover:text-white transition-colors">For Partners</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-32 px-4 flex flex-col items-center text-center overflow-hidden">
        {/* Subtle dot grid background */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        <div className="relative z-10 max-w-[680px] mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8">
            We're building the future of travel planning in India.
          </h1>
          <p className="text-xl text-gray-400">
            YATRAsathi combines cutting-edge Artificial Intelligence with deep local insights to craft hyper-personalized journeys that take the stress out of planning.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 pb-32 space-y-32 relative z-10">
        
        {/* PILLARS */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#00FF9D]/20 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6 text-[#00FF9D]" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Our proprietary algorithms optimize routes, manage budgets, and predict ideal visiting times with unprecedented accuracy.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Community-Driven</h3>
            <p className="text-gray-400 text-sm leading-relaxed">We leverage thousands of verified tips and reviews from real Indian travelers to uncover hidden gems and practical advice.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Map className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">India-First</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Designed specifically for the nuances of Indian travel — from negotiating local transport to finding authentic regional cuisine.</p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/10 rounded-[3rem] p-8 md:p-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How the AI Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">A seamless blend of complex data processing wrapped in a simple, elegant interface.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-[#00FF9D]/0 via-[#00FF9D]/50 to-[#00FF9D]/0 -z-10"></div>
            
            <div className="flex-1 text-center bg-black/50 p-6 rounded-3xl border border-white/5 backdrop-blur z-10 w-full">
              <div className="w-12 h-12 rounded-full bg-white/10 text-xl font-bold flex items-center justify-center mx-auto mb-4 text-gray-300">1</div>
              <h4 className="font-bold mb-2">You share your vision</h4>
              <p className="text-sm text-gray-500">Dates, budget, and vibe.</p>
            </div>
            
            <ChevronRight className="w-8 h-8 text-[#00FF9D] hidden md:block" />
            <ChevronDown className="w-8 h-8 text-[#00FF9D] md:hidden" />

            <div className="flex-1 text-center bg-[#00FF9D]/5 p-6 rounded-3xl border border-[#00FF9D]/20 backdrop-blur z-10 w-full shadow-[0_0_30px_rgba(0,255,157,0.1)]">
              <div className="w-12 h-12 rounded-full bg-[#00FF9D]/20 text-xl font-bold flex items-center justify-center mx-auto mb-4 text-[#00FF9D]">2</div>
              <h4 className="font-bold mb-2 text-[#00FF9D]">AI crunches data</h4>
              <p className="text-sm text-gray-400">Analyzing 10k+ variables in seconds.</p>
            </div>

            <ChevronRight className="w-8 h-8 text-[#00FF9D] hidden md:block" />
            <ChevronDown className="w-8 h-8 text-[#00FF9D] md:hidden" />

            <div className="flex-1 text-center bg-black/50 p-6 rounded-3xl border border-white/5 backdrop-blur z-10 w-full">
              <div className="w-12 h-12 rounded-full bg-white/10 text-xl font-bold flex items-center justify-center mx-auto mb-4 text-gray-300">3</div>
              <h4 className="font-bold mb-2">Your perfect plan</h4>
              <p className="text-sm text-gray-500">Ready to book and experience.</p>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Passionate builders combining tech expertise with a love for exploration.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Astha Patel", role: "Founder & CEO", initials: "AP" },
              { name: "Rohan Singh", role: "Head of AI", initials: "RS" },
              { name: "Priya Menon", role: "Design Lead", initials: "PM" },
              { name: "Kabir Das", role: "Operations", initials: "KD" }
            ].map((member, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 text-center hover:bg-white/[0.04] transition-colors group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-300 group-hover:scale-105 transition-transform">
                  {member.initials}
                </div>
                <h4 className="font-bold">{member.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{member.role}</p>
                <div className="text-gray-500 hover:text-blue-400 cursor-pointer transition-colors w-fit mx-auto">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-bold">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#00FF9D]' : ''}`} />
                  </button>
                  <div className={`px-6 text-gray-400 text-sm overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT FORM */}
          <section>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00FF9D]/10 blur-2xl rounded-full"></div>
              
              <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
              <p className="text-sm text-gray-400 mb-8">Have a question or want to partner with us?</p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Name</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Email</label>
                  <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Subject</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D] appearance-none">
                    <option>General Inquiry</option>
                    <option>Partnership</option>
                    <option>Report an Issue</option>
                    <option>Press</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Message</label>
                  <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D] min-h-[120px]"></textarea>
                </div>
                <button className="w-full bg-white text-black py-4 rounded-xl font-bold mt-4 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </section>

        </div>

      </main>

      {/* FOOTER (Simple version to match landing page spec) */}
      <footer className="border-t border-white/10 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tighter mb-2">YATRA<span className="text-[#00FF9D]">sathi</span></h2>
            <p className="text-sm text-gray-500">© 2026 YATRAsathi. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
