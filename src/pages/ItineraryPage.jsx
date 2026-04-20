import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Calendar, Users, Map, Hotel, Activity, Edit2, Share2, Download, Bookmark, 
  Sun, Sunset, Moon, MapPin, Clock, Star, Car, Bus, Plus, Check, Coffee
} from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';

function ItineraryPage() {
  const [activeDay, setActiveDay] = useState(1);
  const [saved, setSaved] = useState(false);
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get('tripId');
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (tripId) {
      fetch(`http://localhost:5555/api/trips/${tripId}`)
        .then(res => res.json())
        .then(data => setTripData(data))
        .catch(err => console.error(err));
    }
  }, [tripId]);

  const destName = tripData ? tripData.destination : 'Shimla + Manali';
  const travelersCount = tripData ? tripData.travelers : 3;
  const budgetTier = tripData ? tripData.budget : 'Comfort';
  const totalCost = tripData?.itinerary?.budgetBreakdown?.total || 25000;
  const budgetBreakdown = tripData?.itinerary?.budgetBreakdown || { stays: 45, transport: 25, food: 20, activities: 10 };
  const daysData = tripData?.itinerary?.days || [];
  const currentDayData = daysData.find(d => d.day === activeDay) || null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#00FF9D] selection:text-black pb-20">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          <div className="flex gap-4">
            <Link to="/plan" className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4" /> Edit Parameters
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* TOP SECTION: Overview Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF9D]/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#00FF9D]/20 text-[#00FF9D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">AI Generated</span>
                <span className="text-gray-400 text-sm">{budgetTier} Tier</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{destName} <span className="text-gray-500 font-light">— {daysData.length || 6} Days</span></h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#00FF9D]" /> 24 Dec - 29 Dec</div>
                {travelersCount > 1 ? (
                  <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#00FF9D]" /> {travelersCount} Travelers</div>
                ) : (
                  <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#00FF9D]" /> Solo</div>
                )}
                <div className="flex items-center gap-2 font-medium text-white">₹{totalCost.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5"><Map className="w-4 h-4" /> 6 Spots</div>
                <div className="flex items-center gap-1.5"><Hotel className="w-4 h-4" /> 2 Hotels</div>
                <div className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> 12 Acts</div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors tooltip"><Share2 className="w-5 h-5"/></button>
                <button className="p-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors"><Download className="w-5 h-5"/></button>
                <button 
                  onClick={() => setSaved(!saved)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-colors font-medium ${saved ? 'bg-[#00FF9D] text-black' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  <Bookmark className={`w-5 h-5 ${saved && 'fill-current'}`} /> {saved ? 'Saved' : 'Save Plan'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:w-[60%] space-y-6">
            
            {/* Day Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(daysData.length > 0 ? daysData.map(d => d.day) : [1, 2, 3, 4, 5, 6]).map(day => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeDay === day 
                      ? 'bg-[#00FF9D] text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Day {day}
                </button>
              ))}
            </div>

            {/* Day Content Card */}
            <motion.div 
              key={activeDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-6"
            >
              <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{currentDayData ? currentDayData.title : 'Arrival & Settling In'}</h2>
                  <p className="text-gray-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00FF9D]" /> {destName}
                  </p>
                </div>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                
                {currentDayData && currentDayData.activities.map((act, index) => {
                  let Icon = Sun;
                  let iconColor = 'text-[#00FF9D]';
                  if (act.type === 'meal') { Icon = Coffee; iconColor = 'text-yellow-400'; }
                  if (act.type === 'transport') { Icon = Car; iconColor = 'text-blue-400'; }
                  if (act.time.includes('PM') && parseInt(act.time.split(':')[0]) > 4 && parseInt(act.time.split(':')[0]) < 8) { Icon = Sunset; iconColor = 'text-orange-400'; }
                  if (act.time.includes('PM') && parseInt(act.time.split(':')[0]) >= 8) { Icon = Moon; iconColor = 'text-indigo-400'; }
                  
                  return (
                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-white/10 bg-black/40 hover:bg-black/60 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{act.title}</h3>
                          <span className="text-xs text-gray-500 font-mono">{act.time}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{act.description}</p>
                        {act.cost > 0 && (
                          <div className="flex items-center gap-4 text-xs font-semibold text-[#00FF9D]">
                            Cost: ₹{act.cost.toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {!currentDayData && <p className="text-gray-400 text-center py-8">Loading activities...</p>}

              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Sticky Sidebar */}
          <div className="lg:w-[40%] space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Map */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-4 h-64 relative">
                <InteractiveMap locationName={destName} />
              </div>

              {/* Hotel Card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden flex flex-col">
                <div className="h-32 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center relative">
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-1 text-xs rounded-md font-medium border border-white/10">Night 1 & 2</div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg">Snow Valley Resorts</h3>
                    <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded text-sm font-medium">
                      <Star className="w-3 h-3 fill-current" /> 4.2
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 flex items-center gap-1"><MapPin className="w-3 h-3" /> Mall Road, Shimla</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <p className="text-lg font-bold">₹4,500 <span className="text-xs text-gray-500 font-normal">/ night</span></p>
                    </div>
                    <button className="bg-[#00FF9D] text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#00e68d] transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Budget Tracker */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                <h3 className="font-bold mb-4">Budget Tracker</h3>
                <div className="flex items-center gap-6">
                  {/* Mock Donut Chart */}
                  <div className="w-24 h-24 rounded-full border-8 border-white/5 relative flex items-center justify-center shrink-0">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="48" cy="48" r="44" stroke="#00FF9D" strokeWidth="8" fill="none" strokeDasharray="276" strokeDashoffset="60" className="opacity-80" />
                      <circle cx="48" cy="48" r="44" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray="276" strokeDashoffset="200" className="opacity-80" />
                    </svg>
                    <span className="text-[10px] text-center leading-tight font-bold">₹{(totalCost/1000).toFixed(0)}k</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00FF9D]"></div>Stays</span>
                      <span className="font-medium text-gray-400">₹{budgetBreakdown.stays.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Transport</span>
                      <span className="font-medium text-gray-400">₹{budgetBreakdown.transport.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div>Food</span>
                      <span className="font-medium text-gray-400">₹{budgetBreakdown.food.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div>Activities</span>
                      <span className="font-medium text-gray-400">₹{budgetBreakdown.activities.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupons */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-5">
                <h3 className="text-sm text-gray-400 mb-3 font-medium uppercase tracking-wider">Available Coupons</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="border border-[#00FF9D] text-[#00FF9D] bg-[#00FF9D]/5 px-3 py-1.5 rounded-lg text-sm font-mono border-dashed">YATRA20</div>
                  <div className="border border-[#00FF9D] text-[#00FF9D] bg-[#00FF9D]/5 px-3 py-1.5 rounded-lg text-sm font-mono border-dashed">SHIMLA500</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM: Adventure Activities */}
        <div className="pt-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Activities</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              {name: 'Paragliding in Kullu', price: '₹2,500', difficulty: 'Moderate'},
              {name: 'Jakhu Temple Trek', price: 'Free', difficulty: 'Easy'},
              {name: 'River Rafting', price: '₹1,500', difficulty: 'Hard'},
              {name: 'Ice Skating', price: '₹300', difficulty: 'Moderate'}
            ].map((act, i) => (
              <div key={i} className="min-w-[240px] bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex flex-col">
                <div className="h-32 bg-white/5 rounded-xl mb-4 bg-[url('https://images.unsplash.com/photo-1522064516314-8f7808da50d9?q=80&w=400&auto=format&fit=crop')] bg-cover"></div>
                <h3 className="font-bold mb-1">{act.name}</h3>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>{act.price}</span>
                  <span>{act.difficulty}</span>
                </div>
                <button className="mt-auto w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default ItineraryPage;
