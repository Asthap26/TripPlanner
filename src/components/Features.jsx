import React from 'react';
import { motion } from 'framer-motion';
import { Map, Wallet, Calendar, Shield, Sparkles, Navigation } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: <Map />, title: "Smart Routing", desc: "Optimized daily paths to save you 2+ hours of transit time." },
    { icon: <Wallet />, title: "Budget Guardian", desc: "Real-time cost tracking with proactive alert mechanisms." },
    { icon: <Calendar />, title: "Dynamic Pacing", desc: "AI adjustments based on weather, fatigue, and crowds." },
    { icon: <Shield />, title: "Verified Stays", desc: "Only highly-rated, safe accommodations make the cut." },
    { icon: <Sparkles />, title: "Hidden Gems", desc: "Discover local spots missing from standard tourist guides." },
    { icon: <Navigation />, title: "Offline Maps", desc: "Your entire itinerary available without internet." }
  ];

  
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-16"
        >
          Engineered for <span className="text-[var(--accent)]">excellence.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-dim)] text-[var(--accent)] flex items-center justify-center mb-6">
                {React.cloneElement(f.icon, { size: 24 })}
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
