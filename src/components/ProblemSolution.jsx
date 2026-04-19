import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function ProblemSolution() {
  const problems = [
    "Juggling 10+ tabs for flights, hotels, and cabs",
    "Generic itineraries that don't match your vibe",
    "Hidden costs and unpredictable budget overruns",
    "Wasting hours mapping out daily routes"
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Problem */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
            <h2 className="text-2xl font-bold mb-6 text-white">The Old Way</h2>
            <ul className="space-y-5">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-4 text-[var(--text-secondary)]">
                  <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="glass-card rounded-3xl p-10 relative overflow-hidden border-[var(--accent)]"
          >
            <div className="absolute inset-0 bg-[var(--accent)] opacity-[0.02]"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]"></div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">
              The <span className="text-[var(--accent)]">YATRAsathi</span> Way
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 text-lg leading-relaxed">
              One prompt. Zero tabs. Complete end-to-end trip engineering powered by advanced AI and real-time data.
            </p>
            
            <div className="flex items-center gap-4 text-white font-medium bg-black/40 p-4 rounded-xl border border-white/5">
              <CheckCircle2 className="w-6 h-6 text-[var(--accent)]" />
              <span>Smart routing & instant bookings</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
