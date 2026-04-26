import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Crown, Check, X, Send, Plane, Rocket, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';

const plans = [
  {
    id: 'basic',
    n: 'BASIC',
    p: '$15',
    c: '99',
    icon: <Send size={40} className="text-slate-900 dark:text-white" />,
    color: '#00a896',
    features: ['FREE SUPPORT 24/7', 'DATABASES DOWNLOAD'],
    style: { bg: '#00a896', secondary: '#028090' }
  },
  {
    id: 'standard',
    n: 'STANDARD',
    p: '$25',
    c: '99',
    icon: <Plane size={48} className="text-slate-900 dark:text-white" />,
    color: '#f39c12',
    features: ['FREE SUPPORT 24/7', 'DATABASES DOWNLOAD', 'MAINTENANCE EMAIL'],
    style: { bg: '#f39c12', secondary: '#e67e22' }
  },
  {
    id: 'premium',
    n: 'PREMIUM',
    p: '$35',
    c: '99',
    icon: <Rocket size={40} className="text-slate-900 dark:text-white" />,
    color: '#8e44ad',
    features: ['FREE SUPPORT 24/7', 'DATABASES DOWNLOAD', 'MAINTENANCE EMAIL', 'UNLIMITED TRAFFIC'],
    style: { bg: '#8e44ad', secondary: '#71368b' }
  }
];

<<<<<<< HEAD
const Premium = () => (
  <AnimatedPage>
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold text-[var(--fg-color)] flex items-center justify-center gap-2"><Crown className="text-amber-400" size={24}/>StudyNest Premium</h1>
        <p className="text-sm font-sans text-[var(--text-muted)] mt-2">Unlock the full power of AI-driven learning</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p,i)=>(
          <motion.div key={i} className="glass-card p-6 relative" style={{background:p.style.bg,border:`1px solid ${p.style.border}`}} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} whileHover={{y:-5}}>
            {p.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-sans font-bold" style={{background:'linear-gradient(135deg,#a78bfa,#D1495B)',color:'white'}}>Most Popular</div>}
            <h3 className="text-lg font-heading font-bold text-[var(--fg-color)]">{p.n}</h3>
            <div className="mt-2 mb-1"><span className="text-3xl font-heading font-bold text-slate-900 dark:text-white">{p.p}</span><span className="text-sm font-sans text-[var(--text-muted)]"> / {p.per}</span></div>
            {p.sub && <p className="text-[11px] font-sans text-emerald-400 mb-3">{p.sub}</p>}
            <div className="space-y-2.5 my-5">
              {p.features.map((f,j)=>(
                <div key={j} className="flex items-center gap-2">
                  {f.v ? <Check size={14} className="text-emerald-400"/> : <X size={14} className="text-slate-900/50 dark:text-white/50"/>}
                  <span className={`text-xs font-sans ${f.v?'text-[var(--fg-color)] opacity-70':'text-[var(--text-muted)] opacity-80'}`}>{f.t}</span>
=======
const Premium = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(null);

  const handlePurchase = async (planId) => {
    setLoading(planId);
    try {
      // In mock mode, we just update the local state
      // But we'll try to call the API first
      await api.post('/payments/upgrade', { plan: planId });
      
      const updatedUser = { ...user, plan: planId };
      setUser(updatedUser);
      toast.success(`Successfully upgraded to ${planId.toUpperCase()}!`);
    } catch (error) {
      // Fallback for mock mode
      const updatedUser = { ...user, plan: planId };
      setUser(updatedUser);
      toast.success(`Welcome to ${planId.toUpperCase()}! (Demo Mode)`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">Choose Your Plan</h1>
          <div className="w-24 h-1 bg-crimson-rose mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative w-full max-w-sm rounded-[40px] overflow-hidden shadow-2xl flex flex-col ${p.id === 'standard' ? 'md:-mt-8 md:mb-8 scale-105 z-10' : ''}`}
              style={{ background: 'white' }}
            >
              {/* Header */}
              <div 
                className="h-48 flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: p.style.bg }}
              >
                <div className="mb-4 relative z-10">{p.icon}</div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white tracking-widest relative z-10">{p.n}</h2>
                
                {/* Wave effect */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0', transform: 'scaleX(1.5)' }}></div>
              </div>

              {/* Price */}
              <div className="pt-8 pb-4 text-center">
                <div className="inline-flex items-start">
                  <span className="text-4xl font-bold text-gray-800">{p.p}</span>
                  <div className="flex flex-col items-start ml-1">
                    <span className="text-lg font-bold text-gray-800 leading-none">{p.c}</span>
                    <div className="w-6 h-0.5 bg-gray-300 my-1"></div>
                    <span className="text-[10px] font-bold text-gray-400 leading-none">PER MONTH</span>
                  </div>
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 px-8 py-6 space-y-4">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: p.style.bg }}></div>
                    <span className="text-xs font-bold text-gray-500 tracking-tight">{f}</span>
                  </div>
                ))}
              </div>

              {/* Footer / Button */}
              <div className="p-8 mt-auto">
                <button
                  onClick={() => handlePurchase(p.id)}
                  disabled={loading === p.id || user?.plan === p.id}
                  className="w-full py-4 rounded-2xl text-slate-900 dark:text-white font-bold tracking-widest text-lg shadow-xl transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                  style={{ background: '#333' }}
                >
                  {loading === p.id ? <Loader2 className="animate-spin mx-auto" size={24} /> : (user?.plan === p.id ? 'ACTIVE' : 'BUY')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Premium;


