import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Plus, MapPin } from 'lucide-react';

const items = [
  {t:'Blue Casio FX-991 calculator',l:'Library · 24 Apr',tp:'lost',rw:'₹50',c:'#f87171'},
  {t:'Black wallet near Canteen B',l:'Canteen B · 25 Apr',tp:'found',rw:'',c:'#34d399'},
  {t:'Dell 65W laptop charger',l:'Lab 302 · 25 Apr',tp:'lost',rw:'',c:'#f87171'},
  {t:'ID Card — Priya Sharma',l:'Main Gate · 26 Apr',tp:'found',rw:'',c:'#34d399'},
  {t:'Red water bottle (Milton)',l:'Gym · 26 Apr',tp:'lost',rw:'',c:'#f87171'},
  {t:'AirPods Pro case (black)',l:'Library 2nd floor · 23 Apr',tp:'lost',rw:'₹200',c:'#f87171'},
];

const LostFound = () => (
  <AnimatedPage>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold text-[var(--fg-color)]">Lost & Found</h1>
        <button className="btn-primary flex items-center gap-2 text-sm"><Plus size={14}/>Report Item</button>
      </div>
      <div className="flex gap-2">
        {['All','Lost','Found'].map((f,i)=>(
          <button key={f} className="px-5 py-2 rounded-full text-xs font-sans font-semibold transition-all" style={{background:i===0?'rgba(209,73,91,0.15)':'var(--card-border)',color:i===0?'#D1495B':'var(--fg-color)',border:`1px solid ${i===0?'rgba(209,73,91,0.3)':'rgba(255,255,255,0.08)'}`}}>{f}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it,i)=>(
          <motion.div key={i} className="glass-card p-5 flex items-start gap-4" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background:`${it.c}10`}}>
              <MapPin size={18} style={{color:it.c}}/>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-sans font-bold px-2 py-0.5 rounded-full uppercase" style={{background:`${it.c}15`,color:it.c,border:`1px solid ${it.c}30`}}>{it.tp}</span>
                {it.rw && <span className="text-[9px] font-sans text-amber-400">Reward: {it.rw}</span>}
              </div>
              <h3 className="text-sm font-sans font-semibold text-[var(--fg-color)] opacity-90">{it.t}</h3>
              <p className="text-[10px] font-sans text-[var(--text-muted)] opacity-80 mt-0.5">{it.l}</p>
            </div>
            <button className="btn-secondary text-[10px] px-3 py-1.5">Contact</button>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedPage>
);

export default LostFound;


