import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, Star, Calendar, ArrowRight, Check, Heart, Share2, 
  ChevronRight, Map, Camera, Coffee, Mountain, ThumbsUp
} from 'lucide-react';

function DestinationPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Hotels', 'Restaurants', 'Activities', 'Travel Tips', 'Reviews'];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* Navbar Placeholder */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          <div className="flex gap-4">
             <Link to="/plan" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
              Plan Trip Here
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="relative h-[60vh] min-h-[400px] flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1605649487212-4d4ce7708323?q=80&w=2070&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pb-12">
          <div className="flex gap-2 mb-4">
            <span className="bg-black/50 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider text-gray-300">2,276m Elevation</span>
            <span className="bg-[#00FF9D]/20 border border-[#00FF9D]/30 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider text-[#00FF9D]">Best: Mar - Jun</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">Shimla, Himachal Pradesh</h1>
          <p className="text-xl text-gray-300 max-w-2xl">The Queen of Hills, featuring colonial architecture, stunning mountain views, and a vibrant mall road.</p>
        </div>
      </div>

      {/* GALLERY ROW */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {[
            "https://images.unsplash.com/photo-1524661135-423995f22d0b",
            "https://images.unsplash.com/photo-1596401057659-54316a3bc5de",
            "https://images.unsplash.com/photo-1522064516314-8f7808da50d9",
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945"
          ].map((img, i) => (
            <div key={i} className={`snap-center flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group ${i === 0 ? 'w-72 sm:w-96' : 'w-48 sm:w-64'} h-48 sm:h-64`}>
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url("${img}?q=80&w=600&auto=format&fit=crop")` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4 space-y-12 pb-20">
        
        {/* QUICK INFO BAR */}
        <div className="flex flex-wrap gap-4 items-center bg-white/[0.02] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 px-4 py-2 border-r border-white/10"><Calendar className="w-4 h-4 text-gray-400" /> <span className="text-sm font-medium">4-6 Days Ideal</span></div>
          <div className="flex items-center gap-2 px-4 py-2 border-r border-white/10"><MapPin className="w-4 h-4 text-gray-400" /> <span className="text-sm font-medium">342 km from Delhi</span></div>
          <div className="flex items-center gap-2 px-4 py-2 border-r border-white/10"><Plane className="w-4 h-4 text-gray-400" /> <span className="text-sm font-medium">Jubbarhatti Airport (22km)</span></div>
          <div className="flex items-center gap-2 px-4 py-2"><Star className="w-4 h-4 text-[#00FF9D]" /> <span className="text-sm font-medium">₹3,000 avg/day</span></div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="border-b border-white/10 flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-[#00FF9D]' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="destinationTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF9D]" />
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT - OVERVIEW */}
        {activeTab === 'Overview' && (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">About Shimla</h2>
                <p className="text-gray-300 leading-relaxed">
                  Once the summer capital of British India, Shimla remains the terminus of the narrow-gauge Kalka-Shimla Railway completed in 1903. It’s well-known for the handicraft shops that line The Mall, a pedestrian avenue, as well as the Lakkar Bazaar, a market specializing in wooden toys and crafts. The town's colonial past is evident in its architecture, while its stunning natural beauty makes it a perennial favorite for travelers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Top Attractions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'The Ridge', dist: 'Center', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop' },
                    { name: 'Jakhu Temple', dist: '2.5 km', img: 'https://images.unsplash.com/photo-1596401057659-54316a3bc5de?q=80&w=400&auto=format&fit=crop' },
                    { name: 'Mall Road', dist: 'Center', img: 'https://images.unsplash.com/photo-1522064516314-8f7808da50d9?q=80&w=400&auto=format&fit=crop' },
                    { name: 'Kufri', dist: '15 km', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=400&auto=format&fit=crop' },
                  ].map((attr, i) => (
                    <div key={i} className="flex gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <div className="w-20 h-20 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${attr.img})` }}></div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold group-hover:text-[#00FF9D] transition-colors">{attr.name}</h4>
                        <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3"/> {attr.dist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold mb-4">Best For</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Honeymoon', 'Family', 'Nature', 'Photography'].map(tag => (
                    <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <button className="w-full bg-[#00FF9D] text-black py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#00e68d] transition-colors">
                    Build Itinerary <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="w-full bg-transparent border border-white/20 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 hover:bg-white/5 transition-colors">
                    <Heart className="w-5 h-5" /> Save Destination
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT - TRAVEL TIPS */}
        {activeTab === 'Travel Tips' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Traveler Tips</h2>
              <button className="text-[#00FF9D] text-sm font-medium hover:underline">Add your tip +</button>
            </div>
            
            {[
              { author: "Priya S.", tip: "Avoid driving to Mall Road on weekends. The traffic is intense and parking is a nightmare. Better to take a cab or walk if your hotel is close by.", upvotes: 45, date: "Oct 2023" },
              { author: "Rahul M.", tip: "If you're visiting Jakhu Temple, watch out for the monkeys! They are known to snatch glasses and phones. Keep everything inside your bag.", upvotes: 32, date: "Sep 2023" },
            ].map((tip, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">{tip.author[0]}</div>
                    <div>
                      <p className="font-medium">{tip.author}</p>
                      <p className="text-xs text-gray-500">{tip.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#00FF9D] transition-colors bg-white/5 px-3 py-1.5 rounded-full">
                    <ThumbsUp className="w-4 h-4" /> {tip.upvotes}
                  </button>
                </div>
                <p className="text-gray-300 leading-relaxed">"{tip.tip}"</p>
              </div>
            ))}
          </div>
        )}

        {/* Other tabs would have placeholder content for now */}
        {['Hotels', 'Restaurants', 'Activities', 'Reviews'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Map className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Explore {activeTab} in Shimla</h3>
            <p className="text-gray-400 mb-6 max-w-md">Browse curated lists of the best {activeTab.toLowerCase()} specifically chosen for YATRAsathi travelers.</p>
            <button className="bg-white/10 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
              View All {activeTab}
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

export default DestinationPage;
