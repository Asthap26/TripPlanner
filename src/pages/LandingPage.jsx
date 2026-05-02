import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Intro from '../components/Intro';
import { 
  Check, ArrowRight, Map, Star, User, Building2, MapPin, Navigation, 
  Calendar, Shield, Zap, Sparkles, Briefcase, Utensils, Car
} from 'lucide-react';

function LandingPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [stats, setStats] = useState({ totalUsers: 0, tripsPlanned: 0, activeDestinations: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5555/api/public/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  const handlePlanClick = (e) => {
    const user = localStorage.getItem('user');
    if (!user) {
      e.preventDefault();
      alert('You have to login or sign in first before creating the trip.');
      navigate('/auth');
    }
  };

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen text-[#A1A1AA] font-sans selection:bg-[#00FF9D] selection:text-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Intro onEnter={() => setHasEntered(true)} />
          </motion.div>
        ) : (
          <motion.div 
            key="main" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* 1. Sticky navbar */}
            <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
                  YATRA<span className="text-[#00FF9D]">sathi</span>
                </Link>
                <nav className="hidden lg:flex items-center gap-8 font-medium text-sm">
                  <Link to="/plan" onClick={handlePlanClick} className="hover:text-white transition-colors">Plan Trip</Link>
                  <Link to="/hotels" className="hover:text-white transition-colors">Hotels</Link>
                  <Link to="/restaurants" className="hover:text-white transition-colors">Restaurants</Link>
                  <Link to="/transport" className="hover:text-white transition-colors">Transport</Link>
                  <Link to="/about" className="hover:text-white transition-colors">About</Link>
                </nav>
                <div className="flex items-center gap-4">
                  <Link to="/auth" className="text-sm font-medium hover:text-white transition-colors hidden sm:block">Login</Link>
                  <Link to="/plan" onClick={handlePlanClick} className="bg-[#00FF9D] text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#00e68d] transition-colors shadow-[0_0_15px_rgba(0,255,157,0.3)]">
                    Start Planning
                  </Link>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 space-y-32 py-20">
              
              {/* 2. Hero */}
              <section className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-10">
                <div className="flex-1 space-y-8 z-10">
                  <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[1.1]">
                    Plan Smarter.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] to-teal-400">Travel Better.</span>
                  </h1>
                  <p className="text-xl max-w-lg leading-relaxed">
                    YATRAsathi uses advanced AI to craft perfect, personalized Indian itineraries in seconds. Stop stressing, start exploring.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link to="/plan" onClick={handlePlanClick} className="bg-[#00FF9D] text-black px-8 py-4 rounded-full font-bold hover:bg-[#00e68d] transition-colors flex items-center gap-2">
                      Build Itinerary <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/dashboard" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                      View Demo Dashboard
                    </Link>
                  </div>
                  <div className="flex gap-6 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white font-bold text-2xl">{stats.tripsPlanned.toLocaleString()}+</p>
                      <p className="text-sm text-gray-500">Trips Planned</p>
                    </div>
                    <div>
                      <p className="text-white font-bold text-2xl">{stats.activeDestinations.toLocaleString()}+</p>
                      <p className="text-sm text-gray-500">Destinations</p>
                    </div>
                    <div>
                      <p className="text-white font-bold text-2xl">{stats.totalUsers.toLocaleString()}+</p>
                      <p className="text-sm text-gray-500">Active Users</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 relative w-full aspect-square max-w-[500px]">
                  {/* CSS 3D Globe Placeholder */}
                  <div className="absolute inset-0 bg-[#0A0A0A] rounded-full border border-white/5 overflow-hidden shadow-[0_0_100px_rgba(0,255,157,0.1)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,157,0.2)_0%,transparent_60%)]"></div>
                    <div className="w-[200%] h-[200%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite]" 
                         style={{ 
                           backgroundImage: 'linear-gradient(rgba(0,255,157,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.2) 1px, transparent 1px)', 
                           backgroundSize: '40px 40px',
                           borderRadius: '50%'
                         }}>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Problem -> Solution */}
              <section className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">The old way of travel planning is broken.</h2>
                  <ul className="space-y-4">
                    {[
                      "Spending hours reading conflicting reviews.",
                      "Opening 20 tabs to compare hotels and transport.",
                      "No idea how to optimize a realistic daily schedule.",
                      "Missing out on hidden local gems."
                    ].map((pain, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 mt-0.5">✕</div>
                        <span className="text-lg">{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 border-l-4 border-l-[#00FF9D] rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF9D]/10 blur-[50px] rounded-full"></div>
                    <h3 className="text-3xl font-bold text-white mb-4">Enter YATRAsathi AI.</h3>
                    <p className="text-lg mb-8 leading-relaxed">We consolidate millions of data points into one seamless platform. Tell us where and when, and get a highly optimized, fully bookable itinerary instantly.</p>
                    <Link to="/plan" onClick={handlePlanClick} className="inline-flex items-center gap-2 text-[#00FF9D] font-bold text-lg hover:underline">
                      See the magic <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* 4. How It Works */}
              <section>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white tracking-tight">How It Works</h2>
                  <p className="mt-4 text-lg">From idea to adventure in five simple steps.</p>
                </div>
                
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="hidden lg:block absolute top-[40px] left-10 right-10 h-0.5 bg-gradient-to-r from-[#00FF9D]/0 via-[#00FF9D]/50 to-[#00FF9D]/0 -z-10"></div>
                  
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    {[
                      { step: 1, title: "Input Specs", desc: "Select destinations, dates, and budget." },
                      { step: 2, title: "AI Magic", desc: "Our engine crafts a personalized route." },
                      { step: 3, title: "Refine", desc: "Swap hotels or tweak activities." },
                      { step: 4, title: "Book All", desc: "One-click transport and stays." },
                      { step: 5, title: "Travel", desc: "Enjoy your seamless journey." }
                    ].map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10 bg-[#0A0A0A] p-4">
                        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-2xl font-bold text-[#00FF9D] mb-6 shadow-[0_0_15px_rgba(0,255,157,0.1)]">
                          {item.step}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 5. Features Grid */}
              <section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Sparkles, title: "Smart Itineraries", desc: "Time-optimized routes that account for actual travel times and traffic patterns." },
                    { icon: MapPin, title: "Hidden Gems", desc: "Discover offbeat locations curated from thousands of real traveler reviews." },
                    { icon: Calendar, title: "Live Availability", desc: "Real-time sync with hotels and transport partners so you never face overbookings." },
                    { icon: Shield, title: "Verified Listings", desc: "Every restaurant and hotel undergoes a strict manual verification process." },
                    { icon: Navigation, title: "Interactive Maps", desc: "Visualize your entire journey step-by-step on integrated 3D maps." },
                    { icon: Zap, title: "Instant Booking", desc: "Reserve your entire trip—cabs, buses, hotels, and activities—in one checkout." }
                  ].map((feat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#00FF9D]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <feat.icon className="w-6 h-6 text-[#00FF9D]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                      <p className="text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. Ecosystem */}
              <section>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white tracking-tight">The YATRAsathi Ecosystem</h2>
                  <p className="mt-4 text-lg">Connecting the entire travel experience.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: Building2, title: "Verified Hotels", desc: "Handpicked stays with AI-verified standards and exclusive pricing.", link: "/hotels", btn: "View Hotels" },
                    { icon: Utensils, title: "Top Restaurants", desc: "Discover local eateries and enjoy guaranteed 20% discounts.", link: "/restaurants", btn: "See Menu" },
                    { icon: Car, title: "Reliable Transport", desc: "Professional drivers and modern fleet for your entire trip.", link: "/transport", btn: "Book Cab" }
                  ].map((eco, i) => (
                    <div key={i} className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                        <eco.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{eco.title}</h3>
                      <p className="mb-8 flex-1">{eco.desc}</p>
                      <Link to={eco.link} className="w-full py-3 rounded-xl border border-[#00FF9D]/50 text-[#00FF9D] font-bold hover:bg-[#00FF9D]/10 transition-colors">
                        {eco.btn}
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. Reviews */}
              <section>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Priya S.", trip: "Kerala Trip", review: "Saved me literally 15 hours of planning. The AI suggested a hidden backwater route we never would have found." },
                    { name: "Rahul M.", trip: "Shimla Family Tour", review: "Booking 2 cabs and 3 hotels in one click was magical. Everything went flawlessly on the ground." },
                    { name: "Ananya D.", trip: "Solo in Goa", review: "The safety ratings and verified cafes gave me so much peace of mind as a solo female traveler." }
                  ].map((review, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
                      <div className="flex gap-1 mb-4">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-[#00FF9D] fill-current" />)}
                      </div>
                      <p className="text-white text-lg italic mb-6 leading-relaxed">"{review.review}"</p>
                      <div>
                        <p className="font-bold text-white">{review.name}</p>
                        <p className="text-sm">{review.trip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>



              {/* 9. Final CTA */}
              <section className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF9D]/10 blur-[100px] rounded-full pointer-events-none"></div>
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 relative z-10">
                  Ready for your next adventure?
                </h2>
                <Link to="/plan" onClick={handlePlanClick} className="inline-block bg-[#00FF9D] text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-[#00e68d] transition-colors shadow-[0_0_40px_rgba(0,255,157,0.4)] relative z-10 hover:scale-105 transform">
                  Start Planning Now
                </Link>
              </section>

            </main>

            {/* 10. Footer */}
            <footer className="border-t border-white/10 py-16 bg-[#050505]">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Link to="/" className="text-3xl font-bold tracking-tighter text-white mb-4 block">
                    YATRA<span className="text-[#00FF9D]">sathi</span>
                  </Link>
                  <p className="max-w-xs text-sm">The smartest way to plan, book, and experience India. Built with AI.</p>
                </div>
                <div className="flex flex-wrap gap-x-12 gap-y-4 md:justify-end">
                  <div className="flex flex-col gap-3 text-sm">
                    <span className="text-white font-bold mb-2">Explore</span>
                    <Link to="/plan" className="hover:text-[#00FF9D] transition-colors">AI Planner</Link>
                    <Link to="/dashboard" className="hover:text-[#00FF9D] transition-colors">My Trips</Link>
                  </div>
                  <div className="flex flex-col gap-3 text-sm">
                    <span className="text-white font-bold mb-2">Company</span>
                    <Link to="/about" className="hover:text-[#00FF9D] transition-colors">About Us</Link>
                    <Link to="/partner-onboarding" className="hover:text-[#00FF9D] transition-colors">List Your Business</Link>
                    <a href="#" className="hover:text-[#00FF9D] transition-colors">Privacy Policy</a>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>© 2026 YATRAsathi. All rights reserved.</p>
                <div className="flex gap-4">
                  <span>Made in India</span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LandingPage;
