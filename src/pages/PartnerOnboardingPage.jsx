import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Briefcase, TrendingUp, Users, CalendarCheck, CheckCircle2, 
  ShieldCheck, UploadCloud, ArrowRight, Loader2, MapPin, ArrowLeft
} from 'lucide-react';
import { indianStatesAndCities } from '../utils/locations';

function PartnerOnboardingPage() {
  const navigate = useNavigate();
  const [partnerType, setPartnerType] = useState('restaurant'); // restaurant, agency

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Restaurant',
    ownerName: '',
    city: '',
    email: '',
    phone: '',
    gstNumber: '',
    password: '',
    state: '',
    pricePerPerson: '',
    time: '',
    duration: '',
    details: '',
    driverCount: '',
    pricePerKm: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          dataToSend.append(key, formData[key]);
        }
      });

      const res = await fetch('http://localhost:5555/api/auth/register-partner', {
        method: 'POST',
        body: dataToSend
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      setSuccess('Application submitted successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00FF9D] selection:text-black">
      
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            YATRA<span className="text-[#00FF9D]">sathi</span> <span className="text-sm font-normal text-gray-400">for Partners</span>
          </Link>
          <div className="flex gap-4 items-center">
            <button onClick={() => navigate(-1)} className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => navigate('/auth')} className="text-sm font-medium hover:text-[#00FF9D] transition-colors">Login</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-20 overflow-hidden flex flex-col items-center justify-center text-center px-4 min-h-[60vh]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-[#00FF9D]/10 rounded-full blur-[120px] opacity-50"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Grow your business with <br/><span className="text-[#00FF9D]">YATRAsathi</span> travelers.
          </h1>
          <p className="text-xl text-gray-400 mb-10">Join 1,200+ verified businesses across India reaching high-intent travelers every day.</p>
          <button 
            onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#00FF9D] text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#00e68d] transition-colors shadow-[0_0_30px_rgba(0,255,157,0.3)]"
          >
            List Your Business
          </button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-24 space-y-24 relative z-10">
        
        {/* PARTNER TABS & BENEFITS */}
        <section>
          <div className="flex justify-center mb-12">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 relative">
              <button 
                onClick={() => setPartnerType('restaurant')}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors z-10 ${partnerType === 'restaurant' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Building2 className="w-5 h-5" /> Restaurant Owner
              </button>
              <button 
                onClick={() => setPartnerType('agency')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors z-10 ${partnerType === 'agency' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Briefcase className="w-5 h-5" /> Travel Agency
              </button>
              <button 
                onClick={() => {
                  setPartnerType('activity');
                  setFormData({ ...formData, businessType: 'Travel and Other Activity' });
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors z-10 ${partnerType === 'activity' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <MapPin className="w-5 h-5" /> Activity / Travel
              </button>
              <div 
                className="absolute top-1 bottom-1 w-[calc(33.33%-4px)] bg-[#00FF9D] rounded-lg transition-all duration-300 ease-out"
                style={{ left: partnerType === 'restaurant' ? '4px' : partnerType === 'agency' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 0px)' }}
              />
            </div>
          </div>

          {partnerType === 'restaurant' ? (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#00FF9D]/20 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[#00FF9D]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Get Discovered</h3>
                <p className="text-gray-400">Appear directly in AI-generated itineraries when travelers are actively planning trips to your city.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#00FF9D]/20 flex items-center justify-center mb-6">
                  <CalendarCheck className="w-6 h-6 text-[#00FF9D]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Direct Pre-bookings</h3>
                <p className="text-gray-400">Accept guaranteed table reservations from travelers before they even arrive at the destination.</p>
              </div>
              <div className="bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-3xl p-8 flex flex-col justify-center text-center">
                <p className="text-[#00FF9D] font-medium mb-2 uppercase tracking-widest text-sm">Average Results</p>
                <h3 className="text-4xl font-bold mb-2">₹2.4L</h3>
                <p className="text-gray-300 text-sm">Average monthly revenue generated for verified listed restaurants</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Targeted Leads</h3>
                <p className="text-gray-400">Receive qualified leads from travelers who have built an itinerary matching your service areas.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custom Packages</h3>
                <p className="text-gray-400">Offer your exclusive tour packages directly as alternatives to the AI-generated plans.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <CalendarCheck className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time Booking</h3>
                <p className="text-gray-400">Manage all your bookings, cancellations, and customer communications from one unified dashboard.</p>
              </div>
            </div>
          )}
        </section>



        {/* REGISTRATION FORM & TRUST */}
        <section id="register" className="flex flex-col lg:flex-row gap-12 items-center">
          
            <div>
              <h2 className="text-3xl font-bold mb-4">Join the network today.</h2>
              <p className="text-gray-400">Registration takes less than 5 minutes. Start reaching thousands of travelers every day.</p>
            </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Business Registration</h3>
              
              {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 text-sm rounded-lg">{error}</div>}
              {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 text-green-400 text-sm rounded-lg">{success}</div>}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Business Name</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Business Type</label>
                    <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D] appearance-none">
                      <option>Restaurant</option>
                      <option>Travel Agency</option>
                      <option>Hotel / Resort</option>
                      <option>Travel and Other Activity</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Owner Name</label>
                    <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                  </div>
                  {formData.businessType !== 'Travel Agency' && (
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">State</label>
                      <select name="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value, city: '' })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D] appearance-none">
                        <option value="" disabled>Choose State</option>
                        {Object.keys(indianStatesAndCities).map(state => (
                          <option key={state} value={state} className="bg-gray-900 text-white">{state}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                {formData.businessType !== 'Travel Agency' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">City</label>
                      <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.state} className={`w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D] appearance-none ${!formData.state ? 'opacity-50' : ''}`}>
                        <option value="" disabled>Choose City</option>
                        {formData.state && indianStatesAndCities[formData.state].map(city => (
                          <option key={city} value={city} className="bg-gray-900 text-white">{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {formData.businessType === 'Travel Agency' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Number of Drivers</label>
                      <input type="number" name="driverCount" value={formData.driverCount} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Price per Km (₹)</label>
                      <input type="number" name="pricePerKm" value={formData.pricePerKm} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                    </div>
                  </div>
                )}
                {formData.businessType === 'Travel and Other Activity' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Price Per Person (₹)</label>
                        <input type="number" name="pricePerPerson" value={formData.pricePerPerson} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Timing (e.g., 10:00 AM)</label>
                        <input type="text" name="time" value={formData.time} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Duration (e.g., 2 hours)</label>
                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Activity Details</label>
                        <textarea name="details" value={formData.details} onChange={handleChange} rows="2" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]"></textarea>
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">GST Number (Optional for basic)</label>
                  <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D]" placeholder="To manage your dashboard later" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Upload Business Photo (Gallery)</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00FF9D] pr-12 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#00FF9D]/10 file:text-[#00FF9D] hover:file:bg-[#00FF9D]/20 cursor-pointer" 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <UploadCloud className="w-5 h-5 text-gray-500 group-hover:text-[#00FF9D] transition-colors" />
                    </div>
                  </div>
                  <p className="mt-1.5 text-[10px] text-gray-500 italic">Select a JPG or PNG image of your business to showcase to travelers.</p>
                  {formData.photo instanceof File && (
                    <div className="mt-2 h-20 w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      <img src={URL.createObjectURL(formData.photo)} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <button disabled={loading} className="w-full bg-[#00FF9D] text-black py-4 rounded-xl font-bold mt-4 hover:bg-[#00e68d] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  Submit Application <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default PartnerOnboardingPage;
