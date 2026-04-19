import React from 'react';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Ready to <span className="text-[var(--accent)]">depart?</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-12">
            Join 50,000+ travelers experiencing the future of trip engineering.
          </p>
          <button className="group relative px-8 py-5 bg-[var(--accent)] text-black font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Initialize Journey <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
