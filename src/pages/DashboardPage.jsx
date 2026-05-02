import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Map, Plane, Tag, Star, Calendar, Users, ArrowRight, Share2, Eye,
  Clock, MapPin, Gift, Search, Plus, Navigation, ArrowLeft
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
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white" title="Back">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              YATRA<span className="text-[#00FF9D]">sathi</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/profile" className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-[#00FF9D]/20 flex items-center justify-center text-[#00FF9D] font-bold">
              {user ? user.name.charAt(0).toUpperCase() : 'U'}
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/auth');
              }}
              className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest"
            >
              Logout
            </button>
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
              <h3 className="font-bold mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-[#00FF9D]"/> Active Coupons</h3>
              <div className="space-y-3">
                <div className="border border-white/10 bg-black/40 rounded-lg p-3 flex justify-between items-center">
                  <span className="font-mono text-sm text-[#00FF9D]">WELCOME500</span>
                  <span className="text-xs text-gray-400">Valid till Dec 31</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
