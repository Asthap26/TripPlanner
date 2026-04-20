import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, TrendingUp, Users, Star, DollarSign, Calendar, 
  Download, Check, X, MessageSquare, Flag, Settings, 
  Image as ImageIcon, Percent, Zap, ChevronDown, ChevronUp, Bell
} from 'lucide-react';

function BusinessDashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, reviews, settings

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter shrink-0 border-r border-white/10 pr-6">
              YATRA<span className="text-[#00FF9D]">sathi</span>
            </Link>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=100&auto=format&fit=crop" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-sm font-bold flex items-center gap-2">
                  Cafe Simla Times <Check className="w-3 h-3 text-[#00FF9D]" />
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] bg-[#00FF9D]/10 text-[#00FF9D] px-1.5 py-0.5 rounded font-mono border border-[#00FF9D]/20">PRO PLAN</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-xs font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
              Upgrade Plan
            </button>
            <button className="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* ANALYTICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Profile Views", value: "1,240", change: "+18%", trend: "up", icon: Users, color: "text-blue-400" },
            { label: "Booking Requests", value: "34", change: "+7%", trend: "up", icon: Calendar, color: "text-purple-400" },
            { label: "Average Rating", value: "4.7 / 5", change: "+0.2", trend: "up", icon: Star, color: "text-yellow-400" },
            { label: "Est. Revenue", value: "₹1.8L", change: "+12%", trend: "up", icon: DollarSign, color: "text-[#00FF9D]" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.04] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-gray-400 font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* MAIN CONTENT */}
          <div className="lg:w-[70%] space-y-8">
            
            {/* Custom Tabs for Business Dashboard */}
            <div className="flex gap-4 border-b border-white/10 pb-4 overflow-x-auto scrollbar-hide">
              {[
                { id: 'bookings', label: 'Booking Requests' },
                { id: 'reviews', label: 'Reviews Received' },
                { id: 'settings', label: 'Listing Settings' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-colors shrink-0 ${
                    activeTab === tab.id 
                      ? 'bg-[#00FF9D] text-black shadow-[0_0_15px_rgba(0,255,157,0.2)]' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Recent Bookings</h3>
                  <button className="flex items-center gap-2 text-sm text-[#00FF9D] font-medium hover:underline bg-[#00FF9D]/10 px-4 py-2 rounded-lg border border-[#00FF9D]/20">
                    <Download className="w-4 h-4" /> Export CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/10 text-sm text-gray-400">
                        <th className="pb-4 font-medium">Guest Name</th>
                        <th className="pb-4 font-medium">Date & Time</th>
                        <th className="pb-4 font-medium">Party Size</th>
                        <th className="pb-4 font-medium">Status</th>
                        <th className="pb-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { guest: "Arjun Kumar", date: "Dec 24, 8:00 PM", size: 3, status: "Pending" },
                        { guest: "Priya Sharma", date: "Dec 24, 1:30 PM", size: 2, status: "Confirmed" },
                        { guest: "Rahul Singh", date: "Dec 25, 7:00 PM", size: 6, status: "Cancelled" },
                      ].map((booking, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 font-medium">{booking.guest}</td>
                          <td className="py-4 text-gray-300">{booking.date}</td>
                          <td className="py-4 text-gray-300">{booking.size} people</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${
                              booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            {booking.status === 'Pending' && (
                              <div className="flex justify-end gap-2">
                                <button className="p-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors tooltip" title="Confirm">
                                  <Check className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors tooltip" title="Decline">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {[
                  { name: "Ananya Desai", trip: "Honeymoon in Shimla", rating: 5, text: "Absolutely loved the ambiance and the wood-fired pizza was to die for. Perfect spot for dinner after a long day of sightseeing.", date: "2 days ago" },
                  { name: "Vikram Mehta", trip: "Family Vacation", rating: 4, text: "Great food but service was a bit slow during peak hours. The view from the balcony is totally worth the wait though.", date: "1 week ago" }
                ].map((review, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{review.name}</h4>
                          <span className="text-xs text-gray-500">• {review.date}</span>
                        </div>
                        <p className="text-xs text-[#00FF9D] font-medium bg-[#00FF9D]/10 px-2 py-0.5 rounded border border-[#00FF9D]/20 w-fit mb-2">Part of: {review.trip}</p>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />)}
                        </div>
                      </div>
                      <button className="p-2 text-gray-500 hover:text-white transition-colors tooltip" title="Flag Review">
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{review.text}"</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Reply to Guest
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Building2 className="w-5 h-5"/> Business Info</h3>
                    <div className="flex items-center gap-3 w-48">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[78%] h-full bg-[#00FF9D]"></div>
                      </div>
                      <span className="text-xs font-bold text-[#00FF9D]">78%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Display Name</label>
                      <input type="text" defaultValue="Cafe Simla Times" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Cuisine Type</label>
                      <input type="text" defaultValue="Italian, Cafe" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-400 mb-1">Short Description</label>
                      <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D] min-h-[80px]">Famous for wood-fired pizzas and panoramic valley views.</textarea>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">Save Changes</button>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><ImageIcon className="w-5 h-5"/> Photo Gallery</h3>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="aspect-square bg-cover bg-center rounded-xl border border-white/20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=200&auto=format&fit=crop)' }}></div>
                    <div className="aspect-square bg-cover bg-center rounded-xl border border-white/20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=200&auto=format&fit=crop)' }}></div>
                    <div className="aspect-square border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-gray-400">
                      <UploadCloud className="w-6 h-6 mb-1" />
                      <span className="text-xs">Upload</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Percent className="w-5 h-5"/> Special Offers</h3>
                  <div className="flex gap-4">
                    <input type="text" placeholder="Coupon Code (e.g. WINTER20)" className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                    <input type="text" placeholder="Discount %" className="w-24 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                    <button className="px-6 py-3 bg-[#00FF9D] text-black font-bold rounded-xl hover:bg-[#00e68d] transition-colors">Add</button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* SIDE PANEL */}
          <div className="lg:w-[30%] space-y-6">
            
            <div className="bg-gradient-to-br from-[#00FF9D]/20 to-black border border-[#00FF9D]/30 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(0,255,157,0.1)]">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#00FF9D]/20 blur-xl rounded-full"></div>
              <div className="w-12 h-12 bg-[#00FF9D] rounded-xl flex items-center justify-center mb-4 relative z-10">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-xl text-white mb-2 relative z-10">Boost Your Listing</h3>
              <p className="text-sm text-gray-300 mb-6 relative z-10">Get 3x more visibility in AI itineraries by upgrading to Premium.</p>
              <button className="w-full bg-[#00FF9D] text-black py-3 rounded-xl font-bold text-sm relative z-10 shadow-lg hover:bg-[#00e68d] transition-colors">
                View Upgrade Options
              </button>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold mb-4 border-b border-white/10 pb-2">Quick Tips</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] shrink-0 mt-1.5"></div>
                  <p>Add a menu PDF to reach 100% profile completeness.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] shrink-0 mt-1.5"></div>
                  <p>Reply to reviews within 24 hours to improve your search ranking.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] shrink-0 mt-1.5"></div>
                  <p>Update your holiday closed dates to prevent false bookings.</p>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default BusinessDashboardPage;
