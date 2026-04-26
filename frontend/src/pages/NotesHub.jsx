import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Search, Upload, Star, Download, Filter, FileText } from 'lucide-react';

const notes = [
  {t:'OS Unit 4 — Memory Management',s:'Operating Systems',sem:6,r:5,d:248,u:'Rahul K.',col:'CSE'},
  {t:'DBMS — ER Diagrams & Normalization',s:'Database Management',sem:5,r:4.5,d:194,u:'Priya S.',col:'CSE'},
  {t:'CN — TCP/IP Complete Notes',s:'Computer Networks',sem:6,r:5,d:312,u:'Amit R.',col:'CSE'},
  {t:'ML — Regression & Classification',s:'Machine Learning',sem:6,r:4,d:156,u:'Neha G.',col:'CSE'},
  {t:'Data Structures — Trees & Graphs',s:'DSA',sem:3,r:4.8,d:520,u:'Vikram P.',col:'CSE'},
  {t:'Digital Electronics Notes',s:'DE',sem:4,r:4.2,d:89,u:'Sana M.',col:'ECE'},
];

const NotesHub = () => {
  const [search, setSearch] = useState('');
  const filtered = notes.filter(n => n.t.toLowerCase().includes(search.toLowerCase()) || n.s.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl font-heading font-bold" style={{ color: 'var(--fg-color)' }}>Notes Hub</h1>
          <button className="btn-primary flex items-center gap-2 text-sm w-full sm:w-auto justify-center"><Upload size={14}/>Upload Notes</button>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}/>
            <input className="input-glass pl-9 w-full" placeholder="Search notes by subject, topic..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn-secondary flex items-center gap-2 justify-center"><Filter size={14}/>Filters</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All','Sem 6','Sem 5','CSE','ECE'].map((f,i)=>(
            <button key={f} className="px-4 py-1.5 rounded-full text-xs font-sans transition-all" style={{background:i===0?'rgba(209,73,91,0.15)':'var(--card-bg)',color:i===0?'#D1495B':'var(--text-muted)',border:`1px solid ${i===0?'rgba(209,73,91,0.3)':'var(--card-border)'}`}}>{f}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          {filtered.map((n,i)=>(
            <motion.div key={i} className="glass-card-3d p-5" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{background:'var(--card-bg)', borderColor:'var(--card-border)'}}><FileText size={18} className="text-blue-400"/></div>
                <div className="flex-1">
                  <h3 className="text-sm font-sans font-semibold" style={{ color: 'var(--fg-color)', opacity: 0.9 }}>{n.t}</h3>
                  <p className="text-[10px] font-sans mt-0.5" style={{ color: 'var(--text-muted)' }}>{n.s} · {n.col} · Sem {n.sem}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({length:5}).map((_,j)=>(<Star key={j} size={10} className={j<Math.floor(n.r)?'text-amber-400':'text-[var(--text-muted)]'} style={{ opacity: j<Math.floor(n.r)?1:0.3 }} fill={j<Math.floor(n.r)?'#fbbf24':'transparent'}/>))}
                  </div>
                  <span className="text-[10px] font-sans" style={{ color: 'var(--text-muted)' }}>{n.r}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-sans" style={{ color: 'var(--text-muted)' }}><Download size={10}/>{n.d}</div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: 'var(--card-border)' }}>
                <span className="text-[10px] font-sans" style={{ color: 'var(--text-muted)' }}>by {n.u}</span>
                <button className="text-[10px] font-sans px-3 py-1 rounded-lg" style={{background:'rgba(96,165,250,0.15)',color:'#60a5fa',border:'1px solid rgba(96,165,250,0.3)'}}>Download PDF</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default NotesHub;


