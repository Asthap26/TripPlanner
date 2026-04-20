import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Map, Plane, Tag, Star, Calendar, Users, ArrowRight, Share2, Eye,
  Clock, MapPin, Gift, Search, Plus, Navigation
} from 'lucide-react';

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/auth');
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);
    
    // Fetch trips
    fetch(`http://localhost:5555/api/trips/user/${userData.id}`)
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(err => console.error(err));
  }, [navigate]);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/profile" className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-[#00FF9D]/20 flex items-center justify-center text-[#00FF9D] font-bold">
              {user ? user.name.charAt(0).toUpperCase() : 'U'}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {user ? user.name.split(' ')[0] : 'Traveler'} 👋</h1>
            <p className="text-gray-400">{currentDate}</p>
          </div>
          <Link to="/plan" className="bg-[#00FF9D] text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#00e68d] transition-colors shadow-[0_0_15px_rgba(0,255,157,0.2)]">
            <Plus className="w-5 h-5" /> Plan New Trip
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Trips Planned", value: trips.length.toString(), icon: Navigation, color: "text-blue-400" },
            { label: "Destinations Visited", value: trips.length.toString(), icon: MapPin, color: "text-purple-400" },
            { label: "Saved with coupons", value: "₹45,000", icon: Tag, color: "text-[#00FF9D]" },
            { label: "Avg Rating Given", value: "4.8", icon: Star, color: "text-yellow-400" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.04] transition-colors">
              <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="lg:w-[70%] space-y-12">
            
            {/* UPCOMING TRIPS */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#00FF9D]" /> Upcoming Trips
              </h2>
              
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {trips.length > 0 ? trips.map((trip) => (
                  <div key={trip._id} className="min-w-[320px] sm:min-w-[400px] bg-white/[0.02] border border-[#00FF9D]/30 rounded-3xl overflow-hidden relative group shadow-[0_0_20px_rgba(0,255,157,0.05)]">
                    <div className="h-40 bg-[url('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{trip.destination}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {new Date(trip.startDate).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4"/> {trip.travelers} Travelers</span>
                      </div>
                      <Link to={`/itinerary?tripId=${trip._id}`} className="w-full block text-center py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-colors">
                        View Itinerary
                      </Link>
                    </div>
                  </div>
                )) : (
                  <div className="min-w-[320px] sm:min-w-[400px] bg-white/[0.02] border border-white/10 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Map className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="font-medium mb-2">No trips planned yet</h3>
                    <Link to="/plan" className="text-[#00FF9D] text-sm font-medium hover:underline flex items-center gap-1">
                      Plan your first adventure <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* PAST TRIPS */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" /> Past Trips
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { dest: "Shimla & Manali", dates: "Dec 2023", img: "https://images.unsplash.com/photo-1605649487212-4d4ce7708323?q=80&w=800&auto=format&fit=crop", rating: 5, tips: true },
                  { dest: "Kerala Backwaters", dates: "Oct 2023", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop", rating: 4, tips: false },
                ].map((trip, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden flex">
                    <div className="w-1/3 min-h-[120px] bg-cover bg-center" style={{ backgroundImage: `url(${trip.img})` }}></div>
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{trip.dest}</h3>
                        <p className="text-xs text-gray-400 mb-2">{trip.dates}</p>
                        <div className="flex gap-1 mb-2">
                          {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= trip.rating ? 'text-[#00FF9D] fill-current' : 'text-gray-600'}`} />)}
                        </div>
                        {trip.tips && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Tips Shared</span>}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-1.5 text-xs border border-white/20 rounded hover:bg-white/10 transition-colors flex items-center justify-center gap-1"><Eye className="w-3 h-3"/> View</button>
                        <button className="flex-1 py-1.5 text-xs border border-white/20 rounded hover:bg-white/10 transition-colors flex items-center justify-center gap-1"><Share2 className="w-3 h-3"/> Share</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SAVED / DRAFT PLANS */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" /> Saved & Drafts
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Rajasthan Heritage Tour</h3>
                      <p className="text-xs text-gray-400 mb-2">Last edited 2 days ago</p>
                      <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-[#00FF9D]"></div>
                      </div>
                    </div>
                  </div>
                  <Link to="/plan" className="text-sm font-medium hover:text-[#00FF9D] flex items-center gap-1">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - SIDE PANEL */}
          <div className="lg:w-[30%] space-y-6">
            
            <div className="bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#00FF9D]/20 blur-xl rounded-full"></div>
              <h3 className="font-bold text-lg text-white mb-2 relative z-10">Spontaneous Trip?</h3>
              <p className="text-sm text-gray-300 mb-4 relative z-10">Let our AI build a weekend getaway based on your past preferences.</p>
              <button className="w-full bg-[#00FF9D] text-black py-2.5 rounded-xl font-bold text-sm relative z-10">Auto-Generate Plan</button>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Eye className="w-4 h-4"/> Recently Viewed</h3>
              <div className="space-y-3">
                {['Ladakh', 'Pondicherry', 'Rishikesh'].map((dest, i) => (
                  <Link key={i} to="/destination/demo" className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors -mx-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10"></div>
                      <span className="text-sm font-medium">{dest}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-[#00FF9D]"/> Active Coupons</h3>
              <div className="space-y-3">
                <div className="border border-white/10 bg-black/40 rounded-lg p-3 flex justify-between items-center">
                  <span className="font-mono text-sm text-[#00FF9D]">WELCOME500</span>
                  <span className="text-xs text-gray-400">Valid till Dec 31</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold mb-2">Invite a Friend</h3>
              <p className="text-sm text-gray-300 mb-4">Get ₹1,000 YATRA credits when a friend books their first trip.</p>
              <button className="w-full bg-white text-black py-2 rounded-xl text-sm font-bold">Copy Referral Link</button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
