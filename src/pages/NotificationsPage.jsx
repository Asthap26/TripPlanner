import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, Check, Map, Hotel, Heart, Tag, Star, Bus
} from 'lucide-react';
import { motion } from 'framer-motion';

function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Trips', 'Bookings', 'Reviews', 'Tips'];

  const notifications = [
    { id: 1, type: 'trip', title: 'AI plan for Manali is ready!', detail: 'Your 5-day comfort tier itinerary has been successfully generated.', time: '10 mins ago', read: false, icon: Map, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 2, type: 'booking', title: 'Hotel Sunrise Palace confirmed your booking', detail: 'Check-in on Dec 24, 2023. Booking ID: #HTL89234', time: '2 hours ago', read: false, icon: Hotel, color: 'text-green-400', bg: 'bg-green-400/10' },
    { id: 3, type: 'social', title: 'Priya reviewed your travel tip', detail: '"Great tip about the Mall road traffic!"', time: '5 hours ago', read: true, icon: Heart, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 4, type: 'promo', title: 'Coupon YATRA20 expires in 24 hours', detail: 'Use it to get 20% off on your next transport booking.', time: 'Yesterday', read: true, icon: Tag, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { id: 5, type: 'social', title: 'Your Shimla review got 12 upvotes', detail: 'Your insights are helping other travelers.', time: '2 days ago', read: true, icon: Star, color: 'text-[#00FF9D]', bg: 'bg-[#00FF9D]/10' },
    { id: 6, type: 'booking', title: 'Bus booking confirmed: Delhi → Shimla', detail: 'Zingbus Premium AC Seater, Departure: 23:15', time: '3 days ago', read: true, icon: Bus, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter shrink-0">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium hover:text-[#00FF9D] transition-colors">Dashboard</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <div className="flex items-center gap-4">
            <button className="text-sm text-[#00FF9D] font-medium hover:underline flex items-center gap-1">
              <Check className="w-4 h-4" /> Mark all as read
            </button>
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
                activeTab === tab 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* NOTIFICATION LIST */}
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`relative bg-white/[0.02] border rounded-2xl p-4 sm:p-5 flex gap-4 hover:bg-white/[0.04] transition-colors cursor-pointer ${
                !notif.read ? 'border-[#00FF9D]/30' : 'border-white/5'
              }`}
            >
              {!notif.read && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00FF9D] rounded-l-2xl"></div>
              )}
              
              <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center ${notif.bg}`}>
                <notif.icon className={`w-6 h-6 ${notif.color}`} />
              </div>
              
              <div className="flex-1 pr-12">
                <p className="text-sm sm:text-base">
                  <span className={`font-bold ${!notif.read ? 'text-white' : 'text-gray-200'}`}>{notif.title}</span>
                  <span className="text-gray-400 block mt-0.5">{notif.detail}</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
              </div>

              {!notif.read && (
                <div className="absolute right-5 top-5 w-2.5 h-2.5 rounded-full bg-[#00FF9D]"></div>
              )}
            </div>
          ))}
        </div>

        {/* EMPTY STATE EXAMPLE (Hidden unless list is empty) */}
        {notifications.length === 0 && (
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center mt-8">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">You're all caught up!</h3>
            <p className="text-gray-400 max-w-sm mb-6">You have no new notifications right now. Check back later.</p>
            <Link to="/plan" className="bg-[#00FF9D] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#00e68d] transition-colors">
              Plan your next trip
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}

export default NotificationsPage;
