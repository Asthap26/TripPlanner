import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Heart, Globe, Users, Target, ShieldCheck, ArrowLeft, 
  Map, MessageCircle, Star
} from 'lucide-react';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00FF9D] selection:text-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white" title="Back">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              YATRA<span className="text-[#00FF9D]">sathi</span>
            </Link>
          </div>
          <Link to="/plan" className="bg-[#00FF9D] text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-[#00e68d] transition-colors">
            Try AI Planner
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#00FF9D] mb-6">
            <Sparkles className="w-3 h-3" /> Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">
            We are redefining how the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] to-teal-400">world explores India.</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            YATRAsathi is an AI-first travel platform dedicated to removing the friction from trip planning, making every journey across India personalized, safe, and unforgettable.
          </p>
        </motion.div>

        <section className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF9D]/10 blur-[50px] rounded-full group-hover:bg-[#00FF9D]/20 transition-colors"></div>
            <div className="w-12 h-12 rounded-2xl bg-[#00FF9D]/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-[#00FF9D]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              We envision a future where travel planning is as easy as a single sentence. By leveraging advanced Large Language Models and real-time partner networks, we aim to be the ultimate companion for every traveler in India.
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">How drawn towards we are</h3>
            <p className="text-gray-400 leading-relaxed">
              We are deeply committed to the local ecosystem. We don't just plan trips; we empower local restaurant owners, transport providers, and activity curators by connecting them directly with travelers who value authenticity and quality.
            </p>
          </div>
        </section>

        <section className="space-y-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-12">The YATRAsathi Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, label: "Verified Data" },
                { icon: Globe, label: "India-First" },
                { icon: Users, label: "Community" },
                { icon: Sparkles, label: "Innovation" }
              ].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <val.icon className="w-8 h-8 text-gray-300" />
                  </div>
                  <span className="text-sm font-semibold">{val.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#00FF9D]/10 to-transparent border border-white/10 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-bold mb-6 italic">"Join us on this journey to map every corner of India with intelligence and care."</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden border-2 border-[#00FF9D]">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Founder" />
              </div>
              <div className="text-left">
                <p className="font-bold">Team YATRAsathi</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Built for the future of travel</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-bold mb-2">Have questions?</h4>
            <p className="text-sm text-gray-400">Our support team is always here to help you plan.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Contact Us
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default AboutPage;
