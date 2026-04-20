import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Plus, Minus, Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

const indianStatesAndCities = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Mahabaleshwar", "Lonavala"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Hampi", "Coorg", "Gokarna"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Ooty", "Kodaikanal", "Mahabalipuram", "Rameswaram"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Munnar", "Wayanad", "Alleppey", "Kovalam", "Varkala"],
  "Goa": ["North Goa", "South Goa", "Panaji", "Vasco da Gama"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Mount Abu", "Bikaner"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Dalhousie", "Kasauli", "Spiti Valley", "Kasol"],
  "Uttarakhand": ["Dehradun", "Mussoorie", "Nainital", "Rishikesh", "Haridwar", "Auli", "Jim Corbett"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Kutch", "Gir", "Somnath"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Sundarbans", "Digha", "Kalimpong"],
  "Uttar Pradesh": ["Lucknow", "Agra", "Varanasi", "Mathura", "Vrindavan", "Ayodhya"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Ujjain", "Khajuraho", "Pachmarhi"],
  "Punjab": ["Amritsar", "Chandigarh", "Ludhiana", "Jalandhar", "Pathankot"],
  "Jammu & Kashmir": ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Jammu"]
};

const destinations = ['Shimla', 'Manali', 'Goa', 'Kerala', 'Ladakh', 'Rajasthan', 'Ooty', 'Pondicherry'];
const tripTypes = ['Solo', 'Couple', 'Family', 'Friends Group'];
const preferencesOptions = ['Vegetarian food', 'Adventure activities', 'Cultural sites', 'Nightlife', 'Beach', 'Hill stations', 'Wildlife'];
const hotelTypes = ['Hostel', 'Budget hotel', '3-star', '5-star', 'Resort'];
const loadingTexts = ["Analyzing destinations...", "Optimizing budget...", "Building your itinerary..."];

function TripWizardPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  // State for Wizard
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [dates, setDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState({ adults: 2, children: 0 });
  const [tripType, setTripType] = useState('Couple');
  const [budget, setBudget] = useState(25000);
  const [preferences, setPreferences] = useState([]);
  const [hotelType, setHotelType] = useState('3-star');

  // Handlers
  const toggleDestination = (dest) => {
    setSelectedDestinations(prev => 
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  const togglePreference = (pref) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const calculateBudgetTier = (val) => {
    if (val < 15000) return 'Economy';
    if (val < 40000) return 'Comfort';
    if (val < 100000) return 'Premium';
    return 'Luxury';
  };

  const totalTravelers = travelers.adults + travelers.children;

  useEffect(() => {
    if (tripType === 'Solo') {
      setTravelers({ adults: 1, children: 0 });
    } else if (travelers.adults === 1 && travelers.children === 0) {
      setTravelers({ adults: 2, children: 0 });
    }
  }, [tripType]);

  const diffTime = dates.start && dates.end ? Math.abs(new Date(dates.end) - new Date(dates.start)) : 0;
  const diffDays = diffTime ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 : 0;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLoadingTextIndex(0);

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userId = user ? user.id : undefined;

    const interval = setInterval(() => {
      setLoadingTextIndex(prev => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    try {
      const response = await fetch('http://localhost:5555/api/trips/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          destination: selectedCity ? `${selectedCity}, ${selectedState}` : (selectedDestinations.join(', ') || 'Shimla'),
          startDate: dates.start || new Date().toISOString().split('T')[0],
          endDate: dates.end || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          travelers: totalTravelers,
          budget: calculateBudgetTier(budget),
          totalBudget: budget * totalTravelers,
          diffDays: diffDays || 5,
          interests: preferences
        })
      });

      if (!response.ok) throw new Error('Failed to generate trip');

      const data = await response.json();
      clearInterval(interval);
      navigate(`/itinerary?tripId=${data._id}`);
    } catch (error) {
      console.error(error);
      alert('Error generating trip. Ensure the Node backend (port 5555) is running!');
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1113] text-white flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          YATRA<span className="text-[#00FF9D]">sathi</span>
        </Link>
        <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          Exit Planning
        </Link>
      </div>

      <div className="w-full max-w-3xl bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md shadow-2xl overflow-hidden relative">
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-white/10">
          <motion.div 
            className="h-full bg-[#00FF9D]"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {isGenerating ? (
          <div className="p-16 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-16 h-16 text-[#00FF9D] animate-spin mb-8" />
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingTextIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-medium text-white"
              >
                {loadingTexts[loadingTextIndex]}
              </motion.p>
            </AnimatePresence>
            <p className="text-gray-400 mt-4">This usually takes about 5 seconds...</p>
          </div>
        ) : (
          <div className="p-8 sm:p-12">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-12">
              <span className="text-sm font-semibold text-[#00FF9D]">Step {step} of 4</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <button 
                    key={i}
                    onClick={() => setStep(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${step >= i ? 'bg-[#00FF9D]' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 min-h-[300px]"
                >
                  <h2 className="text-3xl font-bold">Where do you want to go?</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Select State</label>
                      <select 
                        value={selectedState} 
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          setSelectedCity('');
                          setSelectedDestinations([]); // Clear quick selections if using dropdowns
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 text-lg text-white focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-gray-500">Choose a State...</option>
                        {Object.keys(indianStatesAndCities).map(state => (
                          <option key={state} value={state} className="bg-gray-900 text-white">{state}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Select City</label>
                      <select 
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedState}
                        className={`w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 text-lg text-white focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all appearance-none ${!selectedState ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <option value="" disabled className="text-gray-500">
                          {!selectedState ? 'Select a state first' : 'Choose a City...'}
                        </option>
                        {selectedState && indianStatesAndCities[selectedState].map(city => (
                          <option key={city} value={city} className="bg-gray-900 text-white">{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {!selectedState && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Or pick a Popular Destination</p>
                      <div className="flex flex-wrap gap-3">
                        {destinations.map(dest => {
                          const isSelected = selectedDestinations.includes(dest);
                          return (
                            <button
                              key={dest}
                              onClick={() => toggleDestination(dest)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                                isSelected 
                                  ? 'bg-[#00FF9D]/10 border-[#00FF9D] text-[#00FF9D]' 
                                  : 'bg-transparent border-white/10 text-gray-300 hover:border-white/30'
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4" />}
                              {dest}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 min-h-[300px]"
                >
                  <h2 className="text-3xl font-bold">When & Who?</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                      <input 
                        type="date" 
                        value={dates.start}
                        onChange={(e) => setDates({...dates, start: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00FF9D]"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">End Date</label>
                      <input 
                        type="date" 
                        value={dates.end}
                        onChange={(e) => setDates({...dates, end: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00FF9D]"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>
                  {dates.start && dates.end && diffDays > 0 && (
                    <p className="text-sm text-[#00FF9D]">Trip duration: {diffDays} days, {diffDays - 1} nights</p>
                  )}

                  {tripType !== 'Solo' && (
                    <div className="pt-4 border-t border-white/10">
                      <label className="block text-sm text-gray-400 mb-4">Travelers</label>
                      <div className="flex items-center justify-between mb-4 bg-black/20 p-4 rounded-xl border border-white/5">
                        <span className="font-medium text-lg">Adults</span>
                        <div className="flex items-center gap-4">
                          <button onClick={() => setTravelers({...travelers, adults: Math.max(1, travelers.adults - 1)})} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Minus className="w-4 h-4"/></button>
                          <span className="w-4 text-center">{travelers.adults}</span>
                          <button onClick={() => setTravelers({...travelers, adults: travelers.adults + 1})} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Plus className="w-4 h-4"/></button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                        <span className="font-medium text-lg">Children</span>
                        <div className="flex items-center gap-4">
                          <button onClick={() => setTravelers({...travelers, children: Math.max(0, travelers.children - 1)})} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Minus className="w-4 h-4"/></button>
                          <span className="w-4 text-center">{travelers.children}</span>
                          <button onClick={() => setTravelers({...travelers, children: travelers.children + 1})} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Plus className="w-4 h-4"/></button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 mt-6">
                    <label className="block text-sm text-gray-400 mb-4">Trip Type</label>
                    <div className="flex flex-wrap gap-3">
                      {tripTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => setTripType(type)}
                          className={`px-6 py-3 rounded-full border transition-all ${
                            tripType === type 
                              ? 'bg-[#00FF9D]/10 border-[#00FF9D] text-[#00FF9D]' 
                              : 'bg-transparent border-white/10 text-gray-300 hover:border-white/30'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 min-h-[300px]"
                >
                  <h2 className="text-3xl font-bold">What's your budget?</h2>
                  
                  <div className="pt-8 pb-12">
                    <div className="flex justify-between text-gray-400 text-sm mb-4">
                      <span>₹5,000</span>
                      <span>₹2,00,000+</span>
                    </div>
                    
                    <input 
                      type="range" 
                      min="5000" 
                      max="200000" 
                      step="5000"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-[#00FF9D] h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />

                    <div className="mt-12 text-center">
                      <div className="inline-block px-4 py-1 bg-[#00FF9D]/10 text-[#00FF9D] rounded-full text-sm font-semibold mb-4 uppercase tracking-wider">
                        {calculateBudgetTier(budget)} Tier
                      </div>
                      <h3 className="text-4xl font-bold text-white mb-2">
                        ₹{budget.toLocaleString('en-IN')} <span className="text-xl text-gray-400 font-normal">per person</span>
                      </h3>
                      <p className="text-gray-400 text-lg">
                        Total estimated: <span className="text-white font-medium">₹{(budget * totalTravelers).toLocaleString('en-IN')}</span> for {totalTravelers} travelers
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 min-h-[300px]"
                >
                  <h2 className="text-3xl font-bold">Preferences</h2>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-4">Activities & Interests</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {preferencesOptions.map(pref => {
                        const isSelected = preferences.includes(pref);
                        return (
                          <button
                            key={pref}
                            onClick={() => togglePreference(pref)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              isSelected 
                                ? 'bg-[#00FF9D]/10 border-[#00FF9D] text-white' 
                                : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/20'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{pref}</span>
                              {isSelected && <Check className="w-4 h-4 text-[#00FF9D]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-sm text-gray-400 mb-4">Hotel Preference</label>
                    <div className="flex flex-wrap gap-3">
                      {hotelTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => setHotelType(type)}
                          className={`px-5 py-2.5 rounded-full border transition-all text-sm ${
                            hotelType === type 
                              ? 'bg-white text-black border-white font-medium' 
                              : 'bg-transparent border-white/20 text-gray-300 hover:border-white/40'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="text-gray-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
              ) : <div></div>}

              {step < 4 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  className="bg-white text-black px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  Next <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={handleGenerate}
                  className="bg-[#00FF9D] text-black w-full sm:w-auto px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#00e68d] transition-colors text-lg shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                >
                  Generate My AI Travel Plan <ArrowRight className="w-6 h-6" />
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default TripWizardPage;
