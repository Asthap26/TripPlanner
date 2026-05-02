import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Star, MapPin, ArrowLeft, Loader2, Search, Bed, ShieldCheck } from 'lucide-react';

function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5555/api/partner/search?type=hotel')
      .then(res => res.json())
      .then(data => {
        setHotels(data.hotels || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredHotels = hotels.filter(h => 
    h.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00FF9D] selection:text-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white" title="Back">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              YATRA<span className="text-[#00FF9D]">sathi</span>
            </Link>
          </div>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search hotels or cities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00FF9D] w-64"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Building2 className="text-[#00FF9D]" /> Verified Stays
          </h1>
          <p className="text-gray-400">Handpicked hotels and resorts with guaranteed best prices and AI-verified standards.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#00FF9D] animate-spin mb-4" />
            <p className="text-gray-500">Scanning for the best stays...</p>
          </div>
        ) : filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <motion.div 
                key={hotel._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-[#00FF9D]/30 transition-all flex flex-col"
              >
                <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${hotel.photo || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop'})` }}>
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-white border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00FF9D]" /> AI Verified
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00FF9D] transition-colors">{hotel.businessName}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 rounded text-sm">
                      <Star className="w-3 h-3 fill-current" /> {hotel.averageRating?.toFixed(1) || '4.8'}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mb-6">
                    <MapPin className="w-3 h-3" /> {hotel.city}, {hotel.state}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Starts From</span>
                      <span className="text-lg font-bold text-white font-mono">₹{hotel.pricePerHour || 1800}</span>
                      <span className="text-[10px] text-gray-400">/night</span>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col justify-center">
                      <div className="flex items-center gap-1 text-[#00FF9D]">
                        <Bed className="w-3 h-3" />
                        <span className="text-xs font-bold">Available</span>
                      </div>
                      <span className="text-[10px] text-gray-400">Instant Booking</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-[#00FF9D] text-black rounded-2xl font-bold hover:bg-[#00e68d] transition-all transform active:scale-95 shadow-[0_10px_20px_rgba(0,255,157,0.1)]">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5 border-dashed">
            <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400">No hotels found</h3>
            <p className="text-gray-500">We're expanding our network. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default HotelsPage;
