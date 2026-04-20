import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, MapPin, Star, Filter, Map, List as ListIcon, Heart, ExternalLink 
} from 'lucide-react';

function RestaurantsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({ veg: false });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold tracking-tighter shrink-0">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          
          <div className="flex-1 w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search restaurants, cuisines, locations..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#00FF9D] focus:bg-black/40 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-white/5 rounded-lg p-1 border border-white/10">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'map' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Map className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* FILTERS ROW */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide mb-6 border-b border-white/5">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 shrink-0">
            <Filter className="w-4 h-4" /> All Filters
          </button>
          
          <div className="h-6 w-px bg-white/20 shrink-0"></div>

          <button 
            onClick={() => setFilters({...filters, veg: !filters.veg})}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors shrink-0 ${
              filters.veg ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/10'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Veg Only
          </button>

          {['North Indian', 'Cafe', 'Street Food', 'Italian', 'Rooftop'].map(tag => (
            <button key={tag} className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 text-gray-300 shrink-0">
              {tag}
            </button>
          ))}
          
          <button className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 text-gray-300 shrink-0">
            Price: ₹₹-₹₹₹
          </button>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {[
              { name: "Cafe Simla Times", cuisine: "Italian, Cafe", rating: 4.6, reviews: 342, price: "₹₹", verified: true, prebook: true, img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop" },
              { name: "Himachali Rasoi", cuisine: "North Indian, Local", rating: 4.8, reviews: 512, price: "₹", verified: true, prebook: false, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop" },
              { name: "The Restaurant at Oberoi", cuisine: "Fine Dining", rating: 4.9, reviews: 218, price: "₹₹₹₹", verified: true, prebook: true, img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop" },
              { name: "Wake & Bake", cuisine: "Cafe, Continental", rating: 4.4, reviews: 892, price: "₹₹", verified: false, prebook: false, img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop" },
            ].map((rest, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all flex flex-col">
                <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${rest.img})` }}>
                  <button className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur rounded-full hover:bg-white/20 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-[#00FF9D] transition-colors">{rest.name}</h3>
                      <p className="text-sm text-gray-400">{rest.cuisine}</p>
                    </div>
                    <div className="bg-black/50 border border-white/10 px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                      {rest.rating} <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 my-3">
                    <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded border border-white/10">{rest.price}</span>
                    {rest.verified && (
                      <span className="text-xs font-medium bg-[#00FF9D]/10 text-[#00FF9D] px-2 py-1 rounded border border-[#00FF9D]/20 flex items-center gap-1">
                        <Check className="w-3 h-3" /> YATRA Verified
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 flex gap-3">
                    <button className="flex-1 py-2 bg-transparent border border-white/20 hover:bg-white/10 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                      Menu <ExternalLink className="w-4 h-4" />
                    </button>
                    {rest.prebook ? (
                      <button className="flex-1 py-2 bg-[#00FF9D] text-black hover:bg-[#00e68d] rounded-xl text-sm font-bold transition-colors">
                        Book Table
                      </button>
                    ) : (
                      <button className="flex-1 py-2 bg-white/5 text-gray-400 rounded-xl text-sm font-medium cursor-not-allowed">
                        Walk-in Only
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[60vh] bg-white/[0.02] border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale"></div>
            <div className="relative z-10 text-center">
              <Map className="w-12 h-12 text-[#00FF9D] mx-auto mb-4 opacity-80" />
              <h2 className="text-xl font-bold mb-2">Interactive Map View</h2>
              <p className="text-gray-400">Map integration would be rendered here.</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default RestaurantsPage;
