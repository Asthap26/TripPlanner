import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold text-white tracking-tight">
          YATRA<span className="text-[var(--accent)]">sathi</span>
        </div>
        <div className="text-[var(--text-secondary)] text-sm">
          © {new Date().getFullYear()} YATRAsathi Intelligence. All systems operational.
        </div>
        <div className="flex gap-6 text-sm text-[var(--text-secondary)]">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
