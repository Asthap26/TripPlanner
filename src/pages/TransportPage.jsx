import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Bus, Star, MapPin, ArrowLeft, Loader2, Search, Navigation, Phone, ShieldCheck } from 'lucide-react';

function TransportPage() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5555/api/partner/search?type=travel_agency')
      .then(res => res.json())
      .then(data => {
        setAgencies(data.agencies || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredAgencies = agencies.filter(a => 
    a.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.city && a.city.toLowerCase().includes(searchTerm.toLowerCase()))
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
              placeholder="Search transport partners..." 
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
            <Car className="text-[#00FF9D]" /> Transport Partners
          </h1>
          <p className="text-gray-400">Reliable cabs, luxury buses, and experienced drivers for your entire journey.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#00FF9D] animate-spin mb-4" />
            <p className="text-gray-500">Connecting to our fleet...</p>
          </div>
        ) : filteredAgencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgencies.map((agency) => (
              <motion.div 
                key={agency._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-[#00FF9D]/30 transition-all flex flex-col p-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#00FF9D]/10 flex items-center justify-center">
                    <Navigation className="w-7 h-7 text-[#00FF9D]" />
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 rounded text-sm">
                    <Star className="w-3 h-3 fill-current" /> {agency.averageRating?.toFixed(1) || '4.9'}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00FF9D] transition-colors">{agency.businessName}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-6">
                  <MapPin className="w-3 h-3" /> {agency.city || 'Pan India Service'}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Car className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">Pricing</span>
                    </div>
                    <span className="text-lg font-bold text-white font-mono">₹{agency.pricePerKm || 12}/km</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00FF9D]" />
                    <span>{agency.driverCount || 5}+ Professional Drivers available</span>
                  </div>
                </div>

                <div className="mt-auto flex gap-3">
                  <button className="flex-1 py-3 bg-[#00FF9D] text-black rounded-xl font-bold hover:bg-[#00e68d] transition-all flex items-center justify-center gap-2">
                    Book Now
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5 border-dashed">
            <Bus className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400">No transport partners found</h3>
            <p className="text-gray-500">Our network is growing. Try searching for major cities!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default TransportPage;
