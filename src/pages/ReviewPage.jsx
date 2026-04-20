import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, UploadCloud, Lock, Globe, MessageSquare, CheckCircle, Info } from 'lucide-react';

function ReviewPage() {
  const [ratings, setRatings] = useState({
    overall: 0,
    hotels: 0,
    restaurants: 0,
    ai: 0
  });

  const [submitted, setSubmitted] = useState(false);
  const [tipPrivacy, setTipPrivacy] = useState('public');

  const StarRating = ({ value, onChange, size = "w-6 h-6" }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star} 
            onClick={() => onChange(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star className={`${size} ${star <= value ? 'text-[#00FF9D] fill-current' : 'text-gray-600'}`} />
          </button>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-[#00FF9D]/20 rounded-full flex items-center justify-center mb-6 border border-[#00FF9D]/30">
          <CheckCircle className="w-10 h-10 text-[#00FF9D]" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-center">Thank you for your feedback!</h1>
        <p className="text-gray-400 text-center max-w-md mb-8">
          Your review and tips have been saved. They will help thousands of future travelers plan better trips.
        </p>
        <Link to="/dashboard" className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-20">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter shrink-0">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          <div className="text-sm font-medium text-gray-300">
            Post-Trip Review
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">How was your trip to Shimla?</h1>
          <p className="text-gray-400">Dec 24 - Dec 29 • 3 Travelers</p>
        </div>

        {/* 1. Overall Trip */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-lg shadow-[#00FF9D]/5">
          <h2 className="text-2xl font-bold mb-6">Overall Experience</h2>
          <StarRating 
            value={ratings.overall} 
            onChange={(val) => setRatings({...ratings, overall: val})} 
            size="w-10 h-10" 
          />
        </section>

        {/* 2. Hotels */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold border-b border-white/10 pb-4">Stays</h2>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold">Snow Valley Resorts</h3>
                <p className="text-sm text-gray-400">Shimla • 2 Nights</p>
              </div>
              <StarRating value={ratings.hotels} onChange={(val) => setRatings({...ratings, hotels: val})} />
            </div>
            <textarea 
              placeholder="Any specific thoughts on this hotel?" 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#00FF9D] min-h-[100px]"
            ></textarea>
          </div>
        </section>

        {/* 3. Transport */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold border-b border-white/10 pb-4">Transport</h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold">Sedan Cab: Delhi → Shimla</h3>
              <p className="text-sm text-gray-400">Driver: Rajesh Kumar</p>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#00FF9D] bg-black border-white/20 rounded" />
                <span className="text-sm">Driver was punctual</span>
              </label>
            </div>
          </div>
        </section>

        {/* 4. AI Plan Quality */}
        <section className="bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-3xl p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#00FF9D]/20 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-[#00FF9D]" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">AI Plan Accuracy</h2>
              <p className="text-sm text-gray-400">Did the generated itinerary fit your pace and budget well?</p>
            </div>
          </div>
          
          <div className="mb-6">
            <StarRating value={ratings.ai} onChange={(val) => setRatings({...ratings, ai: val})} />
          </div>

          <textarea 
            placeholder="What could the AI improve for your next trip?" 
            className="w-full bg-black/40 border border-[#00FF9D]/30 rounded-xl p-4 text-sm focus:outline-none focus:border-[#00FF9D] min-h-[100px] placeholder-gray-500"
          ></textarea>
        </section>

        {/* 5. Travel Tips */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Share a Tip</h2>
            <p className="text-sm text-gray-400">Help future travelers navigating Shimla.</p>
          </div>

          <textarea 
            placeholder="e.g. 'Avoid Mall Road on weekends. The traffic is intense and parking is a nightmare...'" 
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#00FF9D] min-h-[120px]"
          ></textarea>

          <div>
            <label className="block text-sm text-gray-400 mb-3">Category Tag</label>
            <div className="flex flex-wrap gap-2">
              {['Food', 'Safety', 'Transport', 'Hidden gems', 'Avoid'].map(tag => (
                <button key={tag} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex bg-black/50 p-1 rounded-xl w-fit border border-white/10">
            <button 
              onClick={() => setTipPrivacy('public')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tipPrivacy === 'public' ? 'bg-white/10 text-white' : 'text-gray-400'}`}
            >
              <Globe className="w-4 h-4" /> Public
            </button>
            <button 
              onClick={() => setTipPrivacy('private')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tipPrivacy === 'private' ? 'bg-white/10 text-white' : 'text-gray-400'}`}
            >
              <Lock className="w-4 h-4" /> Private (Just for me)
            </button>
          </div>
        </section>

        {/* 6. Photo Upload */}
        <section className="bg-white/[0.02] border border-white/10 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-[#00FF9D] transition-colors" />
          </div>
          <h3 className="font-bold text-lg mb-2">Upload Trip Photos</h3>
          <p className="text-sm text-gray-400 mb-4">Drag and drop, or browse (Up to 10 photos)</p>
          <span className="bg-white/10 px-4 py-2 rounded-lg text-sm font-medium">Browse Files</span>
        </section>

        {/* Submit */}
        <div className="pt-8 border-t border-white/10">
          <button 
            onClick={() => setSubmitted(true)}
            className="w-full bg-[#00FF9D] text-black py-4 rounded-xl font-bold text-lg hover:bg-[#00e68d] transition-colors shadow-[0_0_20px_rgba(0,255,157,0.2)]"
          >
            Submit Review
          </button>
          <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
            <Info className="w-3 h-3" /> Your review helps us improve future AI itineraries.
          </p>
        </div>

      </main>
    </div>
  );
}

export default ReviewPage;
