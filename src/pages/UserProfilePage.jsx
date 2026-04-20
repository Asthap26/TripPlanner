import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Star, Navigation, Map, ThumbsUp, Award, Share2, Edit2, Mountain
} from 'lucide-react';
import { motion } from 'framer-motion';

function UserProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Trips');
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const isOwnProfile = true; 

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

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-20">
      
      {/* Header Placeholder */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter shrink-0">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          <div className="text-sm font-medium text-gray-300">
            Profile
          </div>
        </div>
      </header>

      {/* PROFILE HEADER */}
      <div className="relative">
        <div className="h-48 sm:h-64 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 w-full relative overflow-hidden">
          {/* Subtle noise/texture overlay could go here */}
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 sm:-mt-20 mb-8">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#0A0A0A] overflow-hidden bg-[#00FF9D]/20 flex items-center justify-center text-6xl text-[#00FF9D] font-bold">
                  {user ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 border-2 border-[#0A0A0A] tooltip" title="Verified Traveler">
                  <CheckBadgeIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
                <div>
                  <h1 className="text-3xl font-bold">{user ? user.name : 'Traveler'}</h1>
                  <p className="text-gray-400 text-sm mb-2">@{user ? user.name.toLowerCase().replace(' ', '_') : 'traveler'} • <span className="flex items-center gap-1 inline-flex"><Calendar className="w-3 h-3"/> Traveler since 2024</span></p>
                  <p className="max-w-md text-sm text-gray-300 leading-relaxed">Excited to explore the world with YATRAsathi! 🌍</p>
                </div>
              
              <div className="shrink-0">
                {isOwnProfile ? (
                  <button className="px-6 py-2 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>
                ) : (
                  <button className="px-8 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* STATS ROW */}
          <div className="flex gap-6 sm:gap-12 pb-8 border-b border-white/10 overflow-x-auto scrollbar-hide">
            <div><span className="font-bold text-xl">{trips.length}</span> <span className="text-gray-400 text-sm">Trips</span></div>
            <div><span className="font-bold text-xl">0</span> <span className="text-gray-400 text-sm">Reviews</span></div>
            <div><span className="font-bold text-xl">89</span> <span className="text-gray-400 text-sm">Tips</span></div>
            <div><span className="font-bold text-xl">340</span> <span className="text-gray-400 text-sm">Followers</span></div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        
        {/* TABS */}
        <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
          {['Trips', 'Reviews', 'Tips', 'Badges'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-medium text-sm transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-[#00FF9D]' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF9D]" />
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT - TRIPS */}
        {activeTab === 'Trips' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Public Trips</h2>
              {isOwnProfile && <span className="text-xs text-gray-500 flex items-center gap-1"><LockIcon className="w-3 h-3"/> 4 Private Trips</span>}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {trips.length > 0 ? trips.map((trip) => (
                <Link to={`/itinerary?tripId=${trip._id}`} key={trip._id} className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-[#00FF9D]/30 hover:shadow-[0_0_15px_rgba(0,255,157,0.1)] transition-all">
                  <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop')` }}>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-semibold">{trip.itinerary?.days?.length || 5} Days</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-[#00FF9D] transition-colors">{trip.destination}</h3>
                    <p className="text-xs text-gray-400">{new Date(trip.startDate).toLocaleDateString()} • {trip.travelers} Travelers</p>
                  </div>
                </Link>
              )) : (
                <p className="text-gray-400 col-span-3 text-center py-10">No trips planned yet.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB CONTENT - TIPS */}
        {activeTab === 'Tips' && (
          <div className="space-y-6 max-w-2xl">
            {[
              { dest: "Shimla", text: "Avoid driving to Mall Road on weekends. The traffic is intense and parking is a nightmare. Better to take a cab or walk if your hotel is close by.", upvotes: 45, date: "2 months ago" },
              { dest: "Goa", text: "Rent a scooter from a verified vendor only. Always take a video of the scooter before driving off to avoid false damage claims later.", upvotes: 112, date: "4 months ago" },
            ].map((tip, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-sm text-[#00FF9D] font-medium">
                    <MapPin className="w-4 h-4" /> {tip.dest}
                  </div>
                  <span className="text-xs text-gray-500">{tip.date}</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">"{tip.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#00FF9D] transition-colors">
                    <ThumbsUp className="w-4 h-4" /> {tip.upvotes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT - BADGES */}
        {activeTab === 'Badges' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold">Achievements earned</h2>
            <div className="flex flex-wrap gap-4">
              {[
                { name: "First Trip", icon: Navigation, earned: true, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
                { name: "10 Destinations", icon: Map, earned: true, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
                { name: "Top Reviewer", icon: Star, earned: true, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
                { name: "Budget Master", icon: Award, earned: false, color: "text-gray-600", bg: "bg-white/5 border-white/10 grayscale" },
                { name: "Adventure Seeker", icon: Mountain, earned: false, color: "text-gray-600", bg: "bg-white/5 border-white/10 grayscale" },
              ].map((badge, i) => (
                <div key={i} className={`w-32 h-40 rounded-2xl border flex flex-col items-center justify-center p-4 text-center ${badge.bg}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-white/5 ${badge.color}`}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <h4 className={`text-xs font-bold ${badge.earned ? 'text-white' : 'text-gray-500'}`}>{badge.name}</h4>
                  {!badge.earned && <div className="mt-2 text-[10px] text-gray-500">Locked</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
           <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
               <Star className="w-8 h-8 text-gray-500" />
             </div>
             <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
             <p className="text-gray-400 max-w-sm">When {user ? user.name.split(' ')[0] : 'you'} leave reviews, they will appear here.</p>
           </div>
        )}

      </main>
    </div>
  );
}

// Simple icons for the profile
const CheckBadgeIcon = ({className}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);
const LockIcon = ({className}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

export default UserProfilePage;
