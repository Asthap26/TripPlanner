import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, Users, Map, Hotel, Activity, Edit2, Share2, Download, Bookmark, 
  Sun, Sunset, Moon, MapPin, Clock, Star, Car, Bus, Plus, Check, Coffee, ArrowLeft
} from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';

function ItineraryPage() {
  const [activeDay, setActiveDay] = useState(1);
  const [saved, setSaved] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [availablePartners, setAvailablePartners] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDayToAdd, setSelectedDayToAdd] = useState(1);
  const [searchParams] = useSearchParams();
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [ratingPartner, setRatingPartner] = useState(null);
  const [userRating, setUserRating] = useState(5);
  const [isRating, setIsRating] = useState(false);
  const navigate = useNavigate();
  const tripId = searchParams.get('tripId');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/auth');
      return;
    }
  }, [navigate]);

  const handleDeleteTrip = async () => {
    if (!tripId) return;
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5555/api/trips/${tripId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        navigate('/dashboard');
      } else {
        alert('Failed to delete trip');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting trip');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = () => {
    const subject = `My Trip Plan to ${destName}`;
    const body = `Hey! Check out my trip plan to ${destName} from ${new Date(tripData?.startDate).toLocaleDateString()} to ${new Date(tripData?.endDate).toLocaleDateString()}.\n\nOverview: ${tripData?.itinerary?.overview}\n\nTotal Budget: ₹${totalCost}\n\nPlanned via YATRAsathi.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submitRating = async () => {
    if (!ratingPartner) return;
    setIsRating(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('http://localhost:5555/api/partner/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: ratingPartner._id,
          type: ratingPartner.type,
          userId: user.id,
          rating: userRating
        })
      });
      if (res.ok) {
        alert('Rating submitted successfully!');
        setRatingPartner(null);
        // Refresh available partners to show new rating
        window.location.reload(); 
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to submit rating');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRating(false);
    }
  };

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

  useEffect(() => {
    if (destName) {
      const parts = destName.split(',');
      const city = parts[0].trim();
      const state = parts.length > 1 ? parts[1].trim() : '';
      
      fetch(`http://localhost:5555/api/partner/search?city=${city}&state=${state}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            const mappedPartners = [];
            
            // Map Activities
            if (data.activities) {
              data.activities.forEach(a => {
                mappedPartners.push({
                  _id: a._id,
                  type: 'activity',
                  title: a.businessName,
                  description: a.details,
                  price: a.pricePerPerson,
                  time: "10:00 AM",
                  duration: a.duration,
                  photo: a.photo,
                  averageRating: a.averageRating,
                  totalRatings: a.totalRatings,
                  icon: Activity
                });
              });
            }
            
            // Map Hotels
            if (data.hotels) {
              data.hotels.forEach(h => {
                mappedPartners.push({
                  _id: h._id,
                  type: 'hotel',
                  title: h.businessName,
                  description: `Hotel/Resort by ${h.ownerName}`,
                  price: h.rooms && h.rooms.length > 0 ? h.rooms[0].pricePerNight : 0,
                  time: "Check-in: 02:00 PM",
                  duration: "1 Night",
                  photo: h.photo,
                  averageRating: h.averageRating,
                  totalRatings: h.totalRatings,
                  icon: Hotel
                });
              });
            }
            
            // Map Restaurants
            if (data.restaurants) {
              data.restaurants.forEach(r => {
                mappedPartners.push({
                  _id: r._id,
                  type: 'meal',
                  title: r.businessName,
                  description: `Restaurant by ${r.ownerName}`,
                  price: r.menu && r.menu.length > 0 ? r.menu[0].price : 0,
                  time: "12:00 PM or 08:00 PM",
                  duration: "1-2 Hours",
                  photo: r.photo,
                  averageRating: r.averageRating,
                  totalRatings: r.totalRatings,
                  icon: Coffee
                });
              });
            }
            
            // Map Agencies
            if (data.agencies) {
              data.agencies.forEach(ag => {
                mappedPartners.push({
                  _id: ag._id,
                  type: 'transport',
                  title: ag.businessName,
                  description: `Travel Agency by ${ag.ownerName}`,
                  price: ag.pricePerKm || 0,
                  time: "Flexible",
                  duration: "Variable",
                  photo: ag.photo,
                  averageRating: ag.averageRating,
                  totalRatings: ag.totalRatings,
                  icon: Car
                });
              });
            }
            
            setAvailablePartners(mappedPartners);
          }
        })
        .catch(console.error);
    }
  }, [destName]);

  const handleAddActivity = async () => {
    if (!selectedActivity || !tripId) return;
    setIsAdding(true);
    try {
      // Create a payload that the backend add-activity route expects or can parse easily
      const activityPayload = {
        businessName: selectedActivity.title,
        time: selectedActivity.time,
        details: selectedActivity.description,
        pricePerPerson: selectedActivity.price,
        duration: selectedActivity.duration
      };

      const res = await fetch(`http://localhost:5555/api/trips/${tripId}/add-activity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: selectedDayToAdd, activity: activityPayload })
      });
      const updatedTrip = await res.json();
      setTripData(updatedTrip);
      setSelectedActivity(null);
    } catch (err) {
      console.error(err);
      alert('Failed to add activity');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#00FF9D] selection:text-black pb-20">
      
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
                <button onClick={handleShare} className="p-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors tooltip" title="Share via Gmail"><Share2 className="w-5 h-5"/></button>
                <button onClick={() => window.print()} className="p-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors" title="Download PDF"><Download className="w-5 h-5"/></button>
                <button 
                  onClick={handleDeleteTrip}
                  disabled={isDeleting}
                  className="p-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Delete Trip"
                >
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
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

        {tripData?.selectedPartners && tripData.selectedPartners.length > 0 && (
          <div className="bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-3xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Check className="w-6 h-6 text-[#00FF9D]" />
              Your Pre-Booked YATRAsathi Offers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tripData.selectedPartners.map((partner, idx) => (
                <div key={idx} className="bg-black/40 border border-white/10 p-4 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#00FF9D] text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                    {partner.discountApplied || 20}% DISCOUNT APPLIED
                  </div>
                  <h3 className="font-bold text-white text-lg pr-8">{partner.businessName}</h3>
                  <p className="text-sm text-gray-400">
                    {partner.pricePerKm ? `Price: ₹${partner.pricePerKm}/km` : partner.city}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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
              {availablePartners.filter(p => p.type === 'hotel').length > 0 ? (
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden flex flex-col">
                  <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${availablePartners.find(p => p.type === 'hotel').photo || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop'})` }}>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-1 text-xs rounded-md font-medium border border-white/10">Night 1 & 2</div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg">{availablePartners.find(p => p.type === 'hotel').title}</h3>
                      <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded text-sm font-medium">
                        <Star className="w-3 h-3 fill-current" /> 4.5
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 flex items-center gap-1"><MapPin className="w-3 h-3" /> {destName}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div>
                        <p className="text-lg font-bold">₹{availablePartners.find(p => p.type === 'hotel').price} <span className="text-xs text-gray-500 font-normal">/ night</span></p>
                      </div>
                      <button className="bg-[#00FF9D] text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#00e68d] transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
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
              )}

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
                  <div className="border border-[#00FF9D] text-[#00FF9D] bg-[#00FF9D]/5 px-3 py-1.5 rounded-lg text-sm font-mono border-dashed">{destName.split(',')[0].toUpperCase().replace(/\s+/g, '')}500</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="pt-12">
          <h2 className="text-2xl font-bold mb-6">Available Partners in {destName}</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {availablePartners.length > 0 ? availablePartners.map((partner, i) => {
              const Icon = partner.icon;
              return (
                <div key={i} className="min-w-[280px] bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Icon className="w-8 h-8 text-[#00FF9D]" />
                  </div>
                  <div className="h-32 bg-white/5 rounded-xl mb-4 bg-cover relative" style={{ backgroundImage: `url(${partner.photo || 'https://images.unsplash.com/photo-1522064516314-8f7808da50d9?q=80&w=400&auto=format&fit=crop'})` }}>
                     <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 text-xs rounded-md font-medium border border-white/10 capitalize">
                       {partner.type}
                     </div>
                  </div>
                  <h3 className="font-bold mb-1">{partner.title}</h3>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center gap-0.5 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">{partner.averageRating ? partner.averageRating.toFixed(1) : 'New'}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">({partner.totalRatings || 0} reviews)</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">{partner.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <span className="text-[#00FF9D] font-medium">₹{partner.price || 'Ask Price'}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {partner.duration || 'N/A'}</span>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button 
                      onClick={() => setSelectedActivity(partner)}
                      className="flex-1 py-2 bg-[#00FF9D]/10 text-[#00FF9D] hover:bg-[#00FF9D]/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                    <button 
                      onClick={() => setRatingPartner(partner)}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      Rate
                    </button>
                  </div>
                </div>
              );
            }) : (
              <p className="text-gray-400 italic">No registered partners available for this destination yet.</p>
            )}
          </div>
        </div>

      </main>

      {/* Add Activity Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 p-6 rounded-3xl max-w-sm w-full"
          >
            <h3 className="text-xl font-bold mb-2">Add to Itinerary</h3>
            <p className="text-gray-400 text-sm mb-6">Select the date to add <strong className="text-white">{selectedActivity.title}</strong> to your trip.</p>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Select Date</label>
              <select 
                value={selectedDayToAdd}
                onChange={(e) => setSelectedDayToAdd(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF9D]"
              >
                {daysData.map(d => {
                  const dateStr = tripData?.startDate;
                  let displayStr = `Day ${d.day} - ${d.title}`;
                  if (dateStr) {
                    const dateObj = new Date(dateStr);
                    dateObj.setDate(dateObj.getDate() + (d.day - 1));
                    const formatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    displayStr = `${formatted} (Day ${d.day}) - ${d.title}`;
                  }
                  return (
                    <option key={d.day} value={d.day}>{displayStr}</option>
                  );
                })}
              </select>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedActivity(null)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddActivity}
                disabled={isAdding}
                className="flex-1 py-3 rounded-xl bg-[#00FF9D] text-black font-bold hover:bg-[#00e68d] transition-colors disabled:opacity-50"
              >
                {isAdding ? 'Adding...' : 'Confirm'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Rating Modal */}
      {ratingPartner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full text-center"
          >
            <div className="w-16 h-16 bg-[#00FF9D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-[#00FF9D]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Rate {ratingPartner.title}</h3>
            <p className="text-gray-400 text-sm mb-8">How was your experience? Your rating helps other travelers!</p>
            
            <div className="flex justify-center gap-2 mb-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className={`transition-all ${userRating >= star ? 'text-yellow-500 scale-110' : 'text-gray-600'}`}
                >
                  <Star className={`w-10 h-10 ${userRating >= star ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setRatingPartner(null)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={submitRating}
                disabled={isRating}
                className="flex-1 py-3 rounded-xl bg-[#00FF9D] text-black font-bold hover:bg-[#00e68d] transition-colors disabled:opacity-50"
              >
                {isRating ? 'Submitting...' : 'Submit Rating'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ItineraryPage;
