import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-card border-b py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-tight">
          YATRA<span className="text-[var(--accent)]">sathi</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-[var(--text-secondary)]">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Destinations</a>
          <a href="#" className="hover:text-white transition-colors">Testimonials</a>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-black font-semibold text-sm hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    </motion.nav>
  );
}
