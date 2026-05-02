import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Star, MapPin, ArrowLeft, Loader2, Search, Compass, Clock } from 'lucide-react';

function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5555/api/partner/search')
      .then(res => res.json())
      .then(data => {
        setActivities(data.activities || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredActivities = activities.filter(a => 
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
              placeholder="Search activities..." 
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
            <Activity className="text-[#00FF9D]" /> Unique Experiences
          </h1>
          <p className="text-gray-400">Curated local activities, tours, and adventures across the country.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#00FF9D] animate-spin mb-4" />
            <p className="text-gray-500">Finding the best adventures...</p>
          </div>
        ) : filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => (
              <motion.div 
                key={act._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-[#00FF9D]/30 transition-all flex flex-col"
              >
                <div className="h-56 bg-cover bg-center relative" style={{ backgroundImage: `url(${act.photo || 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=600&auto=format&fit=crop'})` }}>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2 text-xs font-bold text-white border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-[#00FF9D]" /> {act.duration || '2-4 Hours'}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00FF9D] transition-colors">{act.businessName}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 rounded text-sm">
                      <Star className="w-3 h-3 fill-current" /> {act.averageRating?.toFixed(1) || '5.0'}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" /> {act.city}, {act.state}
                  </p>
                  
                  <p className="text-sm text-gray-300 line-clamp-2 mb-6 flex-1">
                    {act.details || 'Experience the local culture and landmarks with our expert-guided tours.'}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-bold">Price</span>
                      <span className="text-lg font-bold text-white font-mono">₹{act.pricePerPerson || 499}<span className="text-xs font-normal text-gray-400">/person</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#00FF9D] font-bold">
                      <Compass className="w-4 h-4" /> Instant Pass
                    </div>
                  </div>

                  <button className="w-full py-3 bg-white/5 hover:bg-[#00FF9D] hover:text-black rounded-xl font-bold transition-all text-sm border border-white/5 group-hover:border-[#00FF9D]/50">
                    Book Experience
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5 border-dashed">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400">No activities found</h3>
            <p className="text-gray-500">Check back soon for new local experiences!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ActivitiesPage;
