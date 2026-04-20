import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bus, Car, Train, ArrowRightLeft, Calendar, Users, 
  Wifi, Wind, BatteryCharging, Shield, Check, Info, X
} from 'lucide-react';

function TransportPage() {
  const [activeTab, setActiveTab] = useState('bus'); // bus, cab
  const [from, setFrom] = useState('New Delhi');
  const [to, setTo] = useState('Shimla');
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Mock Seat Layout (simplified)
  const renderSeats = () => {
    let rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(
        <div key={i} className="flex gap-4 justify-between mb-4">
          <div className="flex gap-2">
            {[1, 2].map(seat => {
              const id = `${i}${seat}L`;
              const isBooked = i === 2 || (i === 4 && seat === 1);
              const isSelected = selectedSeats.includes(id);
              return (
                <button 
                  key={id}
                  disabled={isBooked}
                  onClick={() => toggleSeat(id)}
                  className={`w-10 h-16 rounded-md border-2 transition-colors relative
                    ${isBooked ? 'bg-white/10 border-white/5 cursor-not-allowed' : 
                      isSelected ? 'bg-[#00FF9D] border-[#00FF9D]' : 'bg-transparent border-white/30 hover:border-[#00FF9D]/50'
                    }`}
                >
                  <div className="absolute top-1 left-1 right-1 h-2 bg-white/20 rounded-sm"></div>
                </button>
              );
            })}
          </div>
          <div className="w-8"></div> {/* Aisle */}
          <div className="flex gap-2">
            {[3, 4].map(seat => {
              const id = `${i}${seat}R`;
              const isBooked = i === 7 || (i === 1 && seat === 4);
              const isSelected = selectedSeats.includes(id);
              return (
                <button 
                  key={id}
                  disabled={isBooked}
                  onClick={() => toggleSeat(id)}
                  className={`w-10 h-16 rounded-md border-2 transition-colors relative
                    ${isBooked ? 'bg-white/10 border-white/5 cursor-not-allowed' : 
                      isSelected ? 'bg-[#00FF9D] border-[#00FF9D]' : 'bg-transparent border-white/30 hover:border-[#00FF9D]/50'
                    }`}
                >
                   <div className="absolute top-1 left-1 right-1 h-2 bg-white/20 rounded-sm"></div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter shrink-0">
            YATRA<span className="text-[#00FF9D]">sathi</span>
          </Link>
          <div className="text-sm font-medium text-gray-300 hidden sm:block">
            Transport Booking
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Search Widget */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 mb-8 shadow-xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
            <button onClick={() => setActiveTab('bus')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === 'bus' ? 'bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20' : 'text-gray-400 hover:bg-white/5'}`}>
              <Bus className="w-5 h-5" /> Bus
            </button>
            <button onClick={() => setActiveTab('cab')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === 'cab' ? 'bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20' : 'text-gray-400 hover:bg-white/5'}`}>
              <Car className="w-5 h-5" /> Cab
            </button>
            <button disabled className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-gray-600 cursor-not-allowed tooltip" title="Coming Soon">
              <Train className="w-5 h-5" /> Train <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded uppercase ml-1">Soon</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 flex flex-col sm:flex-row gap-4 relative w-full">
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1 ml-2">From</label>
                <div className="bg-black/40 border border-white/10 rounded-2xl p-3 px-4">
                  <input type="text" value={from} onChange={(e)=>setFrom(e.target.value)} className="w-full bg-transparent text-lg font-semibold focus:outline-none" />
                  <p className="text-xs text-gray-500">ISBT Kashmiri Gate</p>
                </div>
              </div>
              
              <button onClick={swapLocations} className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1 sm:translate-y-2 w-10 h-10 bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center z-10 hover:bg-white/10 transition-colors">
                <ArrowRightLeft className="w-4 h-4" />
              </button>

              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1 ml-2">To</label>
                <div className="bg-black/40 border border-white/10 rounded-2xl p-3 px-4">
                  <input type="text" value={to} onChange={(e)=>setTo(e.target.value)} className="w-full bg-transparent text-lg font-semibold focus:outline-none" />
                  <p className="text-xs text-gray-500">ISBT Tutikandi</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1 ml-2">Departure</label>
                <div className="bg-black/40 border border-white/10 rounded-2xl p-3 px-4 flex items-center gap-2 h-[72px]">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-semibold">24 Dec 25</p>
                    <p className="text-xs text-gray-500">Wednesday</p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1 ml-2">Passengers</label>
                <div className="bg-black/40 border border-white/10 rounded-2xl p-3 px-4 flex items-center gap-2 h-[72px]">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-semibold">2 Adults</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full md:w-auto h-[72px] px-8 bg-[#00FF9D] text-black font-bold rounded-2xl hover:bg-[#00e68d] transition-colors text-lg">
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Results Area */}
          <div className="flex-1 space-y-4">
            
            {activeTab === 'bus' && [
              { op: "Himachal RTC", type: "Volvo AC Sleeper (2+1)", dep: "22:00", arr: "06:30", dur: "8h 30m", price: 1450, seats: 12, rating: 4.5 },
              { op: "Zingbus", type: "Premium AC Seater (2+2)", dep: "23:15", arr: "07:00", dur: "7h 45m", price: 950, seats: 4, rating: 4.8 },
              { op: "IntrCity SmartBus", type: "AC Sleeper", dep: "21:30", arr: "05:45", dur: "8h 15m", price: 1600, seats: 1, rating: 4.2 },
            ].map((bus, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg">{bus.op}</h3>
                      <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-500/20">★ {bus.rating}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{bus.type}</p>
                    
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xl font-bold">{bus.dep}</p>
                        <p className="text-xs text-gray-500">ISBT Kashmiri Gate</p>
                      </div>
                      <div className="flex flex-col items-center flex-1 max-w-[100px]">
                        <p className="text-xs text-gray-400 mb-1">{bus.dur}</p>
                        <div className="w-full h-px bg-white/20 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xl font-bold">{bus.arr}</p>
                        <p className="text-xs text-gray-500">ISBT Tutikandi</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <div className="flex items-center gap-1 tooltip text-gray-400" title="AC"><Wind className="w-4 h-4" /></div>
                      <div className="flex items-center gap-1 tooltip text-gray-400" title="WiFi"><Wifi className="w-4 h-4" /></div>
                      <div className="flex items-center gap-1 tooltip text-gray-400" title="Charging Point"><BatteryCharging className="w-4 h-4" /></div>
                      <div className="flex items-center gap-1 tooltip text-gray-400" title="Safe Track"><Shield className="w-4 h-4" /></div>
                    </div>
                  </div>
                  
                  <div className="sm:w-48 flex flex-col justify-between items-start sm:items-end border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-4">
                    <div className="text-left sm:text-right w-full flex sm:flex-col justify-between sm:justify-start items-center sm:items-end mb-4">
                      <p className="text-sm text-gray-400">Starting from</p>
                      <p className="text-2xl font-bold">₹{bus.price}</p>
                      
                      <div className={`text-xs font-medium mt-2 px-2 py-1 rounded border ${
                        bus.seats > 10 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        bus.seats > 2 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {bus.seats} Seats Left
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedBus(bus)}
                      className="w-full py-3 border border-[#00FF9D] text-[#00FF9D] rounded-xl font-semibold hover:bg-[#00FF9D]/10 transition-colors"
                    >
                      Select Seats
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {activeTab === 'cab' && [
              { type: "Sedan", models: "Dzire, Etios or similar", pax: 4, bags: 2, ac: true, rating: 4.8, price: 4500, est: "6h 30m" },
              { type: "SUV", models: "Innova, Ertiga or similar", pax: 6, bags: 4, ac: true, rating: 4.9, price: 6200, est: "6h 45m" },
              { type: "Tempo Traveller", models: "Force Traveller", pax: 12, bags: 8, ac: true, rating: 4.7, price: 12500, est: "7h 15m" }
            ].map((cab, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="w-24 h-16 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <Car className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{cab.type} <span className="text-xs bg-white/10 px-2 py-0.5 rounded font-normal ml-2">{cab.ac ? 'AC' : 'Non-AC'}</span></h3>
                    <p className="text-sm text-gray-400">{cab.models}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>{cab.pax} Seats</span>
                      <span>{cab.bags} Bags</span>
                      <span className="text-[#00FF9D]">★ {cab.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                  <div className="text-left sm:text-right mb-0 sm:mb-4">
                    <p className="text-2xl font-bold">₹{cab.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Est. Time: {cab.est}</p>
                  </div>
                  <button className="px-6 py-2.5 bg-[#00FF9D] text-black rounded-xl font-bold hover:bg-[#00e68d] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar - Summary (Only shows if seats selected or cab chosen) */}
          <div className="lg:w-[350px]">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6 pb-4 border-b border-white/10">Booking Summary</h3>
              
              {!selectedBus && activeTab === 'bus' ? (
                <div className="text-center py-8 text-gray-500">
                  <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a bus to view seat layout and proceed.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold">{from} → {to}</p>
                      <p className="text-xs text-gray-400">24 Dec</p>
                    </div>
                    <p className="text-sm text-gray-400">{activeTab === 'bus' ? (selectedBus?.op || 'Bus Operator') : 'Sedan Cab'}</p>
                  </div>

                  {activeTab === 'bus' && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Selected Seats ({selectedSeats.length})</span>
                      <span className="font-medium">{selectedSeats.join(', ') || '-'}</span>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Base Fare</span>
                      <span>₹{activeTab === 'bus' ? (selectedSeats.length * (selectedBus?.price || 0)) : 4500}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Taxes & Fees</span>
                      <span>₹150</span>
                    </div>
                    <div className="border-t border-white/5 pt-3 flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-[#00FF9D]">₹{activeTab === 'bus' ? (selectedSeats.length * (selectedBus?.price || 0) + 150) : 4650}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <input type="text" placeholder="Coupon Code" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#00FF9D]" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00FF9D] text-sm font-bold">Apply</button>
                  </div>

                  <button 
                    disabled={activeTab === 'bus' && selectedSeats.length === 0}
                    className="w-full py-4 bg-[#00FF9D] text-black rounded-xl font-bold hover:bg-[#00e68d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm & Pay
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* SEAT SELECTION MODAL (Simplified as an inline section for demonstration) */}
      {selectedBus && activeTab === 'bus' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div>
                <h3 className="font-bold text-xl">{selectedBus.op}</h3>
                <p className="text-sm text-gray-400">Select your seats</p>
              </div>
              <button onClick={() => setSelectedBus(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col md:flex-row gap-12 justify-center bg-black/40">
              {/* Bus Diagram */}
              <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 pb-12 w-fit mx-auto relative shadow-inner">
                {/* Driver */}
                <div className="flex justify-end mb-8 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 border-2 border-white/20 rounded-full flex items-center justify-center text-xs text-gray-500">
                    S
                  </div>
                </div>
                {/* Seats */}
                <div>
                  {renderSeats()}
                </div>
              </div>

              {/* Legend & Info */}
              <div className="md:w-64 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 rounded-sm"></div>
                    <span className="text-sm text-gray-300">Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/5 bg-white/10 rounded-sm"></div>
                    <span className="text-sm text-gray-300">Booked</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-[#00FF9D] bg-[#00FF9D] rounded-sm"></div>
                    <span className="text-sm text-gray-300">Selected</span>
                  </div>
                </div>

                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">Price per seat</p>
                  <p className="text-2xl font-bold mb-4">₹{selectedBus.price}</p>
                  <p className="text-sm text-gray-400 mb-1">Total ({selectedSeats.length} seats)</p>
                  <p className="text-xl font-bold text-[#00FF9D]">₹{selectedSeats.length * selectedBus.price}</p>
                </div>
                
                <button 
                  onClick={() => setSelectedBus(null)}
                  className="w-full py-3 bg-[#00FF9D] text-black rounded-xl font-bold hover:bg-[#00e68d] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default TransportPage;
