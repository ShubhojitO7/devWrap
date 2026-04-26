import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Plus, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import api from '../utils/api';

const Budget = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ expenses: [], stats: {} });

<<<<<<< HEAD
const Budget = () => (
  <AnimatedPage>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold text-[var(--fg-color)]">Budget Manager</h1>
        <button className="btn-primary flex items-center gap-2 text-sm"><Plus size={14}/>Add Expense</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-5"><p className="text-[11px] font-sans text-[var(--text-muted)]">Total Spent</p><p className="text-2xl font-heading font-bold text-[var(--fg-color)] mt-1">₹4,280</p><p className="text-[10px] font-sans text-amber-400 mt-1 flex items-center gap-1"><TrendingUp size={10}/>12% more than last month</p></div>
        <div className="glass-card p-5"><p className="text-[11px] font-sans text-[var(--text-muted)]">Remaining</p><p className="text-2xl font-heading font-bold text-emerald-400 mt-1">₹1,720</p><p className="text-[10px] font-sans text-[var(--text-muted)] opacity-80 mt-1">of ₹6,000 budget</p></div>
        <div className="glass-card p-5"><p className="text-[11px] font-sans text-[var(--text-muted)]">Biggest Category</p><p className="text-2xl font-heading font-bold text-orange-400 mt-1">Food</p><p className="text-[10px] font-sans text-[var(--text-muted)] opacity-80 mt-1">₹1,840 (43%)</p></div>
      </div>
      <div className="glass-card p-5">
        <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {[{c:'Food',a:1840,p:43,col:'#fb923c'},{c:'Transport',a:960,p:22,col:'#60a5fa'},{c:'Books',a:620,p:15,col:'#a78bfa'},{c:'Others',a:860,p:20,col:'#fbbf24'}].map((c,i)=>(
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-sans text-slate-900/50 dark:text-white/50 w-20">{c.c}</span>
              <div className="flex-1 h-2 rounded-full" style={{background:'var(--card-border)'}}><motion.div className="h-full rounded-full" style={{background:c.col}} initial={{width:'0%'}} animate={{width:`${c.p}%`}} transition={{delay:0.3+i*0.1,duration:0.8}}/></div>
              <span className="text-xs font-sans text-slate-900/50 dark:text-white/50 w-16 text-right">₹{c.a}</span>
=======
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await api.get('/budget');
        setData(res.data);
      } catch (error) {
        // Mock data fallback
        setData({
          expenses: [
            {d:'Today',items:[{t:'Lunch — Canteen B',a:80,c:'food',col:'#fb923c'},{t:'Auto to market',a:40,c:'transport',col:'#60a5fa'}]},
            {d:'Yesterday',items:[{t:'Programming book',a:320,c:'books',col:'#a78bfa'},{t:'Dinner — Dominos',a:250,c:'food',col:'#fb923c'},{t:'Mobile recharge',a:199,c:'recharge',col:'#fbbf24'}]},
          ],
          stats: { total: 4280, remaining: 1720, budget: 6000, trend: 12 },
          categories: [{c:'Food',a:1840,p:43,col:'#fb923c'},{c:'Transport',a:960,p:22,col:'#60a5fa'},{c:'Books',a:620,p:15,col:'#a78bfa'},{c:'Others',a:860,p:20,col:'#fbbf24'}]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-crimson-rose" size={40} />
    </div>
  );

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold text-slate-900 dark:text-white">Budget Manager</h1>
          <button className="btn-primary flex items-center gap-2 text-sm"><Plus size={14}/>Add Expense</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card p-5">
            <p className="text-[11px] font-sans text-slate-900/50 dark:text-white/50">Total Spent</p>
            <p className="text-2xl font-heading font-bold text-slate-900 dark:text-white mt-1">₹{data.stats.total}</p>
            <p className="text-[10px] font-sans text-amber-400 mt-1 flex items-center gap-1">
              <TrendingUp size={10}/>{data.stats.trend}% more than last month
            </p>
          </div>
          <div className="glass-card p-5">
            <p className="text-[11px] font-sans text-slate-900/50 dark:text-white/50">Remaining</p>
            <p className="text-2xl font-heading font-bold text-emerald-400 mt-1">₹{data.stats.remaining}</p>
            <p className="text-[10px] font-sans text-slate-900/50 dark:text-white/50 mt-1">of ₹{data.stats.budget} budget</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-[11px] font-sans text-slate-900/50 dark:text-white/50">Biggest Category</p>
            <p className="text-2xl font-heading font-bold text-orange-400 mt-1">Food</p>
            <p className="text-[10px] font-sans text-slate-900/50 dark:text-white/50 mt-1">₹1,840 (43%)</p>
          </div>
        </div>
        
        <div className="glass-card p-5">
          <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {data.categories?.map((c,i)=>(
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-sans text-slate-900/50 dark:text-white/50 w-20">{c.c}</span>
                <div className="flex-1 h-2 rounded-full" style={{background:'var(--card-border)'}}>
                  <motion.div 
                    className="h-full rounded-full" 
                    style={{background:c.col}} 
                    initial={{width:'0%'}} 
                    animate={{width:`${c.p}%`}} 
                    transition={{delay:0.3+i*0.1,duration:0.8}}
                  />
                </div>
                <span className="text-xs font-sans text-slate-900/50 dark:text-white/50 w-16 text-right">₹{c.a}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white mb-4">Recent Transactions</h3>
          {data.expenses.map((g,gi)=>(
            <div key={gi} className="mb-4">
              <p className="text-[11px] font-sans text-slate-900/50 dark:text-white/50 mb-2">{g.d}</p>
              {g.items.map((e,i)=>(
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-900/10 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:`${e.col}15`}}>
                      <div className="w-2 h-2 rounded-full" style={{background:e.col}}/>
                    </div>
                    <div>
                      <p className="text-xs font-sans text-slate-900/50 dark:text-white/50">{e.t}</p>
                      <p className="text-[10px] font-sans text-slate-900/50 dark:text-white/50">{e.c}</p>
                    </div>
                  </div>
                  <span className="text-sm font-sans font-semibold text-slate-900 dark:text-white">-₹{e.a}</span>
                </div>
              ))}
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
      <div className="glass-card p-5">
        <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white mb-4">Recent Transactions</h3>
        {expenses.map((g,gi)=>(
          <div key={gi} className="mb-4">
            <p className="text-[11px] font-sans text-[var(--text-muted)] opacity-80 mb-2">{g.d}</p>
            {g.items.map((e,i)=>(
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:`${e.col}15`}}><div className="w-2 h-2 rounded-full" style={{background:e.col}}/></div><div><p className="text-xs font-sans text-[var(--fg-color)] opacity-80">{e.t}</p><p className="text-[10px] font-sans text-[var(--text-muted)] opacity-80">{e.c}</p></div></div>
                <span className="text-sm font-sans font-semibold text-slate-900 dark:text-white">-₹{e.a}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </AnimatedPage>
);
=======
    </AnimatedPage>
  );
};
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd

export default Budget;


