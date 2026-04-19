import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Tell us your vibe", desc: "Share your destination, dates, and budget." },
    { num: "02", title: "AI Generation", desc: "Our engine crafts a perfectly paced itinerary." },
    { num: "03", title: "Review & Tweak", desc: "Swap activities or adjust timings instantly." },
    { num: "04", title: "One-Click Book", desc: "Secure flights and hotels at the best rates." },
    { num: "05", title: "Travel", desc: "Access your entire trip offline via the app." }
  ];

  return (
    <section className="py-24 relative z-10 border-t border-[var(--border)] bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How it works</h2>
          <p className="text-[var(--text-secondary)] text-lg">Five steps to your perfect journey.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20"></div>

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center md:text-left"
            >
              <div className="w-16 h-16 mx-auto md:mx-0 bg-black border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--accent)] font-mono text-xl mb-6 relative z-10">
                {step.num}
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
