import React from 'react';
import { motion } from 'framer-motion';

export default function Destinations() {
  const images = [
    { title: "Bali, Indonesia", span: "md:col-span-2 md:row-span-2", id: "100" },
    { title: "Tokyo, Japan", span: "md:col-span-1 md:row-span-1", id: "101" },
    { title: "Swiss Alps", span: "md:col-span-1 md:row-span-1", id: "102" },
    { title: "Santorini, Greece", span: "md:col-span-1 md:row-span-2", id: "103" },
    { title: "Machu Picchu", span: "md:col-span-1 md:row-span-1", id: "104" }
  ];

  return (
    <section className="py-24 relative z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">
          Explore the <span className="text-[var(--accent)]">unexplored.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl overflow-hidden group ${img.span}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
              <img 
                src={`https://picsum.photos/id/${img.id}/800/800`} 
                alt={img.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white text-xl font-bold">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
