import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Users, CalendarCheck, Utensils, 
  Car, Hotel, DollarSign, Clock, LogOut, Plus
} from 'lucide-react';

function PartnerDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [partnerData, setPartnerData] = useState(null);

  const fetchPartnerData = useCallback(async (email, type) => {
    try {
      const res = await fetch(`http://localhost:5555/api/partner/me?email=${email}&type=${type}`);
      if (res.ok) {
        const data = await res.json();
        setPartnerData(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/auth');
      return;
    }
    const parsedUser = JSON.parse(userStr);
    if (parsedUser.role !== 'partner') {
      navigate('/');
      return;
    }
    setUser(parsedUser);
    fetchPartnerData(parsedUser.email, parsedUser.partnerType);
  }, [navigate, fetchPartnerData]);

  if (!user || !partnerData) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Loading Portal...</div>;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00FF9D]/20 flex items-center justify-center">
              {user.partnerType === 'Restaurant' ? <Utensils className="w-5 h-5 text-[#00FF9D]"/> :
               user.partnerType === 'Travel Agency' ? <Car className="w-5 h-5 text-[#00FF9D]"/> :
               <Hotel className="w-5 h-5 text-[#00FF9D]"/>}
            </div>
            <div>
              <h1 className="text-xl font-bold">{user.name} Management</h1>
              <p className="text-xs text-[#00FF9D] font-medium tracking-widest uppercase">{user.partnerType} PORTAL</p>
            </div>
          </div>
          
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {user.partnerType === 'Restaurant' && <RestaurantDashboard partnerData={partnerData} refresh={() => fetchPartnerData(user.email, user.partnerType)} user={user} />}
        {user.partnerType === 'Travel Agency' && <AgencyDashboard partnerData={partnerData} refresh={() => fetchPartnerData(user.email, user.partnerType)} user={user} />}
        {user.partnerType === 'Hotel / Resort' && <HotelDashboard partnerData={partnerData} refresh={() => fetchPartnerData(user.email, user.partnerType)} user={user} />}
      </main>
    </div>
  );
}

function RestaurantDashboard({ partnerData, refresh, user }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: '', price: '' });

  const handleAddItem = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5555/api/partner/restaurant/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, item: newItem })
    });
    setNewItem({ name: '', category: '', price: '' });
    setShowAdd(false);
    refresh();
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Sold Out' : 'Available';
    await fetch(`http://localhost:5555/api/partner/restaurant/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, status: newStatus })
    });
    refresh();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Utensils/>} title="Active Menu Items" value={partnerData.menu?.length || 0} trend="Real-time" />
        <StatCard icon={<DollarSign/>} title="Today's Revenue" value="₹12,450" trend="Mock Stat" />
        <StatCard icon={<Clock/>} title="Status" value="Open" trend={partnerData.openingTime || "11:00 AM - 11:00 PM"} />
      </div>
      
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu & Pricing Management</h2>
          <button onClick={() => setShowAdd(!showAdd)} className="bg-[#00FF9D] text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> {showAdd ? 'Cancel' : 'Add Item'}
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAddItem} className="mb-8 bg-black/40 p-4 rounded-xl border border-white/10 flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">Item Name</label>
              <input type="text" required value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <div className="w-48">
              <label className="block text-xs text-gray-400 mb-1">Category</label>
              <input type="text" required value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <div className="w-32">
              <label className="block text-xs text-gray-400 mb-1">Price (₹)</label>
              <input type="number" required value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <button type="submit" className="bg-[#00FF9D] text-black px-4 py-2 rounded-lg font-bold text-sm h-[38px]">Save</button>
          </form>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-4 font-medium">Item Name</th>
                <th className="pb-4 font-medium">Category</th>
                <th className="pb-4 font-medium">Price</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {partnerData.menu?.length === 0 && (
                <tr><td colSpan="5" className="py-4 text-center text-gray-500">No items in menu. Add one above!</td></tr>
              )}
              {partnerData.menu?.map(item => (
                <tr key={item._id} className="border-b border-white/5">
                  <td className="py-4 font-medium">{item.name}</td>
                  <td className="py-4 text-gray-400">{item.category}</td>
                  <td className="py-4">₹{item.price}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs ${item.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button onClick={() => toggleStatus(item._id, item.status)} className="text-[#00FF9D] hover:underline text-xs">
                      Mark as {item.status === 'Available' ? 'Sold Out' : 'Available'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AgencyDashboard({ partnerData, refresh, user }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: '', expertise: '', vehicle: '' });

  const handleAddDriver = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5555/api/partner/agency/driver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, driver: newDriver })
    });
    setNewDriver({ name: '', expertise: '', vehicle: '' });
    setShowAdd(false);
    refresh();
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'FREE' ? 'ON TRIP' : 'FREE';
    await fetch(`http://localhost:5555/api/partner/agency/driver/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, status: newStatus })
    });
    refresh();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Car/>} title="Total Fleet" value={partnerData.drivers?.length || 0} trend="Drivers Registered" />
        <StatCard icon={<Users/>} title="Free Drivers" value={partnerData.drivers?.filter(d => d.status === 'FREE').length || 0} trend="Available for assignment" />
        <StatCard icon={<Building2/>} title="Ongoing Trips" value={partnerData.drivers?.filter(d => d.status === 'ON TRIP').length || 0} trend="Currently dispatched" />
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Driver Roster & Status</h2>
          <button onClick={() => setShowAdd(!showAdd)} className="bg-[#00FF9D] text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
            <Plus className="w-4 h-4"/> {showAdd ? 'Cancel' : 'Add Driver'}
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAddDriver} className="mb-8 bg-black/40 p-4 rounded-xl border border-white/10 flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">Driver Name</label>
              <input type="text" required value={newDriver.name} onChange={e => setNewDriver({...newDriver, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">Expertise (e.g. Hill Stations)</label>
              <input type="text" required value={newDriver.expertise} onChange={e => setNewDriver({...newDriver, expertise: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <div className="w-48">
              <label className="block text-xs text-gray-400 mb-1">Vehicle Model</label>
              <input type="text" required value={newDriver.vehicle} onChange={e => setNewDriver({...newDriver, vehicle: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <button type="submit" className="bg-[#00FF9D] text-black px-4 py-2 rounded-lg font-bold text-sm h-[38px]">Save</button>
          </form>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {partnerData.drivers?.length === 0 && <p className="text-gray-500 col-span-2">No drivers registered yet.</p>}
          {partnerData.drivers?.map(driver => (
            <div key={driver._id} className="p-4 bg-black/40 border border-white/5 rounded-xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{driver.name}</p>
                  <p className="text-sm text-gray-400">{driver.expertise} • {driver.vehicle}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${driver.status === 'FREE' ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-blue-500/20 text-blue-400 border-blue-500/20'}`}>
                  {driver.status}
                </span>
              </div>
              <button onClick={() => toggleStatus(driver._id, driver.status)} className="w-full py-2 border border-white/10 rounded-lg text-xs font-semibold hover:bg-white/5 transition-colors">
                {driver.status === 'FREE' ? 'Assign Trip (Mark Busy)' : 'End Trip (Mark Free)'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HotelDashboard({ partnerData, refresh, user }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newRoom, setNewRoom] = useState({ roomType: '', price: '', total: '' });

  const handleAddRoom = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5555/api/partner/hotel/room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, room: newRoom })
    });
    setNewRoom({ roomType: '', price: '', total: '' });
    setShowAdd(false);
    refresh();
  };

  const updateBooked = async (id, action) => {
    await fetch(`http://localhost:5555/api/partner/hotel/room/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, action })
    });
    refresh();
  };

  const totalRooms = partnerData.rooms?.reduce((acc, curr) => acc + curr.total, 0) || 0;
  const bookedRooms = partnerData.rooms?.reduce((acc, curr) => acc + curr.booked, 0) || 0;
  const occPct = totalRooms ? Math.round((bookedRooms/totalRooms)*100) : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Hotel/>} title="Total Rooms" value={totalRooms} trend={`${partnerData.rooms?.length || 0} categories`} />
        <StatCard icon={<CalendarCheck/>} title="Current Occupancy" value={`${occPct}%`} trend={`${bookedRooms} rooms booked`} />
        <StatCard icon={<DollarSign/>} title="Today's Revenue" value="Live Calculation" trend="Based on bookings" />
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Room Inventory</h2>
          <button onClick={() => setShowAdd(!showAdd)} className="bg-[#00FF9D] text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
            <Plus className="w-4 h-4"/> {showAdd ? 'Cancel' : 'Add Room Type'}
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAddRoom} className="mb-8 bg-black/40 p-4 rounded-xl border border-white/10 flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">Room Type (e.g. Deluxe Suite)</label>
              <input type="text" required value={newRoom.roomType} onChange={e => setNewRoom({...newRoom, roomType: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <div className="w-32">
              <label className="block text-xs text-gray-400 mb-1">Price (₹)</label>
              <input type="number" required value={newRoom.price} onChange={e => setNewRoom({...newRoom, price: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <div className="w-32">
              <label className="block text-xs text-gray-400 mb-1">Total Rooms</label>
              <input type="number" required value={newRoom.total} onChange={e => setNewRoom({...newRoom, total: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#00FF9D] outline-none" />
            </div>
            <button type="submit" className="bg-[#00FF9D] text-black px-4 py-2 rounded-lg font-bold text-sm h-[38px]">Save</button>
          </form>
        )}
        
        <div className="space-y-4">
          {partnerData.rooms?.length === 0 && <p className="text-gray-500">No rooms added yet.</p>}
          {partnerData.rooms?.map(room => (
            <div key={room._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-white/10 rounded-xl bg-black/40 gap-4">
              <div>
                <h3 className="font-bold text-lg text-[#00FF9D]">{room.roomType}</h3>
                <p className="text-sm text-gray-400">₹{room.price} / night</p>
              </div>
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <p className="text-2xl font-bold">{room.booked} / {room.total}</p>
                  <p className={`text-xs ${room.booked === room.total ? 'text-red-400' : 'text-gray-500'}`}>
                    {room.booked === room.total ? 'Fully Booked' : 'Rooms Booked'}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => updateBooked(room._id, 'increment')} disabled={room.booked >= room.total} className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed">+ Add Booking</button>
                  <button onClick={() => updateBooked(room._id, 'decrement')} disabled={room.booked <= 0} className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed">- Cancel Booking</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
      <div className="absolute -right-6 -top-6 text-white/5 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { className: 'w-full h-full' })}
      </div>
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
          {React.cloneElement(icon, { className: 'w-5 h-5 text-gray-300' })}
        </div>
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold mb-2">{value}</h3>
        <p className="text-xs text-[#00FF9D]">{trend}</p>
      </div>
    </div>
  );
}

export default PartnerDashboardPage;
