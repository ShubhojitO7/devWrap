import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Plus, Circle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const complaints = [
  {t:'Water tap leaking',d:'Bathroom tap dripping continuously',s:'open',c:'maintenance',dt:'24 Apr',p:'high',r:'Hostel B'},
  {t:'WiFi not working',d:'Floor 4 WiFi router down since morning',s:'in-progress',c:'wifi',dt:'22 Apr',p:'urgent',r:'IT Dept'},
  {t:'AC remote missing',d:'Remote was on the table yesterday',s:'resolved',c:'maintenance',dt:'18 Apr',p:'low',r:'Hostel B'},
  {t:'Mess food quality',d:'Found insects in lunch today',s:'resolved',c:'food',dt:'10 Apr',p:'high',r:'Mess Warden'},
];

const sc = {open:{c:'#fbbf24',l:'Open',bg:'rgba(251,191,36,0.15)'},'in-progress':{c:'#60a5fa',l:'In Progress',bg:'rgba(96,165,250,0.15)'},resolved:{c:'#34d399',l:'Resolved',bg:'rgba(52,211,153,0.15)'}};

const Complaints = () => (
  <AnimatedPage>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold text-[var(--fg-color)]">Hostel Complaints</h1>
        <button className="btn-primary flex items-center gap-2 text-sm"><Plus size={14}/>New Complaint</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{l:'Open',v:1,c:'#fbbf24'},{l:'In Progress',v:1,c:'#60a5fa'},{l:'Resolved',v:2,c:'#34d399'}].map((s,i)=>(
          <div key={i} className="glass-card p-4 text-center"><p className="text-2xl font-heading font-bold" style={{color:s.c}}>{s.v}</p><p className="text-[11px] font-sans text-[var(--text-muted)]">{s.l}</p></div>
        ))}
      </div>
      <div className="space-y-3">
        {complaints.map((c,i)=>(
          <motion.div key={i} className="glass-card p-5" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1">{c.s==='resolved'?<CheckCircle size={16} style={{color:'#34d399'}}/>:c.s==='in-progress'?<Clock size={16} style={{color:'#60a5fa'}}/>:<AlertTriangle size={16} style={{color:'#fbbf24'}}/>}</div>
                <div><h3 className="text-sm font-sans font-semibold text-[var(--fg-color)] opacity-90">{c.t}</h3><p className="text-[11px] font-sans text-[var(--text-muted)] mt-0.5">{c.d}</p><p className="text-[10px] font-sans text-[var(--text-muted)] opacity-80 mt-1">{c.r} · {c.dt}</p></div>
              </div>
              <span className="text-[10px] font-sans font-bold px-3 py-1 rounded-full" style={{background:sc[c.s].bg,color:sc[c.s].c,border:`1px solid ${sc[c.s].c}30`}}>{sc[c.s].l}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedPage>
);

export default Complaints;


