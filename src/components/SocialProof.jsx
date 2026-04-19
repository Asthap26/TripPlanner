import React from 'react';
import { motion } from 'framer-motion';

export default function SocialProof() {
  const reviews = [
    { name: "Arjun M.", role: "Solo Backpacker", text: "Saved me $400 on my Vietnam trip and found hostels I didn't even know existed. Unreal." },
    { name: "Priya & Rahul", role: "Honeymooners", text: "We wanted a mix of luxury and local street food in Bali. YATRAsathi nailed the exact vibe we were looking for." },
    { name: "Karan S.", role: "Digital Nomad", text: "The offline maps and proactive weather reroutes saved me when a typhoon hit Taipei." }
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Don't just take our word.</h2>
          <p className="text-[var(--text-secondary)] text-lg">Thousands of travelers trust the engine.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(star => <span key={star} className="text-[var(--accent)]">★</span>)}
              </div>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">"{r.text}"</p>
              <div>
                <div className="text-white font-semibold">{r.name}</div>
                <div className="text-sm text-[var(--accent)]">{r.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
