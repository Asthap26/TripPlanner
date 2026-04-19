import React from 'react';
import { motion } from 'framer-motion';

export default function Ecosystem() {
  return (
    <section className="py-24 relative z-10 border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              A unified travel <br/>ecosystem.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              Everything you need in one powerful interface. No more jumping between 10 different apps.
            </p>
            <ul className="space-y-4">
              {['Flights & Trains', 'Hotels & Hostels', 'Cabs & Transit', 'Activities & Dining'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-medium">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] glass-card rounded-3xl p-8 flex items-center justify-center"
          >
            {/* Abstract UI Representation */}
            <div className="w-full max-w-sm space-y-4">
              <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10 flex items-center px-4">
                <div className="w-24 h-3 bg-white/20 rounded-full"></div>
              </div>
              <div className="h-32 w-full bg-[var(--accent-dim)] rounded-xl border border-[var(--accent)] flex flex-col justify-center px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-16 h-16 rounded-full border border-[var(--accent)] opacity-20"></div>
                </div>
                <div className="w-32 h-4 bg-[var(--accent)] rounded-full mb-3"></div>
                <div className="w-48 h-3 bg-[var(--accent)] opacity-50 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white/5 rounded-xl border border-white/10"></div>
                <div className="h-24 bg-white/5 rounded-xl border border-white/10"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
