import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Lock, User, Phone, Loader2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(`http://localhost:5555${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'partner') {
        navigate('/partner-dashboard');
      } else {
        const origin = location.state?.from?.pathname || '/dashboard';
        navigate(origin);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-[40%] relative">
        {/* Placeholder image from unsplash */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              YATRA<span className="text-[#00FF9D]">sathi</span>
            </Link>
          </div>
          
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Your next adventure is <br/>one plan away.
            </h2>
            <ul className="space-y-4">
              {[
                "AI-powered custom itineraries",
                "Discover hidden gems & top spots",
                "Book trusted hotels & transport"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-lg text-gray-200">
                  <div className="bg-[#00FF9D]/20 p-1 rounded-full">
                    <Check className="w-5 h-5 text-[#00FF9D]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md relative">
          
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="text-3xl font-bold tracking-tighter">
              YATRA<span className="text-[#00FF9D]">sathi</span>
            </Link>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative"
          >
            <button onClick={() => navigate(-1)} className="absolute -top-12 left-0 text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">←</span>
              Back
            </button>
            {location.state?.from?.pathname === '/plan' && (
              <div className="mb-6 p-4 bg-[#00FF9D]/10 border border-[#00FF9D]/30 text-[#00FF9D] text-sm rounded-xl text-center font-medium">
                Please login first to start planning your trip.
              </div>
            )}
            {/* Toggle Tabs */}
            <div className="flex bg-black/50 p-1 rounded-xl mb-8 relative">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-colors z-10 ${isLogin ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-colors z-10 ${!isLogin ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Create Account
              </button>
              
              <motion.div 
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#00FF9D] rounded-lg"
                animate={{ left: isLogin ? '4px' : 'calc(50% + 2px)' }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.2 }}
              >
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {error && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 text-sm rounded-lg">{error}</div>}
                  {!isLogin && (
                    <div className="space-y-4">
                      <div>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required={!isLogin}
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type="tel" 
                            placeholder="Phone (optional)" 
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="email" 
                        placeholder="Email address" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all"
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="password" 
                          placeholder="Confirm Password" 
                          className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all"
                        />
                      </div>
                    </div>
                  )}



                  <button disabled={loading} className="w-full flex items-center justify-center gap-2 bg-[#00FF9D] text-black font-semibold rounded-xl py-4 hover:bg-[#00e68d] transition-colors mt-2 disabled:opacity-50">
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>



            <p className="text-center text-xs text-gray-500 mt-8">
              By signing up you agree to our <a href="#" className="text-gray-400 hover:text-white underline decoration-gray-600">Terms</a> & <a href="#" className="text-gray-400 hover:text-white underline decoration-gray-600">Privacy</a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
