import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Clock, Calendar, BookOpen, AlertCircle } from 'lucide-react';

const schedule = {
  Mon:[{t:'9:00',s:'Operating Systems',r:'LH-201',c:'#fb923c'},{t:'11:00',s:'DBMS',r:'LH-105',c:'#60a5fa'},{t:'2:00',s:'ML Lab',r:'Lab-302',c:'#a78bfa'}],
  Tue:[{t:'9:00',s:'Computer Networks',r:'LH-201',c:'#34d399'},{t:'11:00',s:'Software Engg',r:'LH-105',c:'#fbbf24'},{t:'2:00',s:'OS Lab',r:'Lab-301',c:'#fb923c'}],
  Wed:[{t:'9:00',s:'Operating Systems',r:'LH-201',c:'#fb923c'},{t:'11:00',s:'Machine Learning',r:'LH-203',c:'#a78bfa'},{t:'3:00',s:'DBMS Lab',r:'Lab-302',c:'#60a5fa'}],
  Thu:[{t:'9:00',s:'Computer Networks',r:'LH-201',c:'#34d399'},{t:'11:00',s:'DBMS',r:'LH-105',c:'#60a5fa'},{t:'2:00',s:'Seminar',r:'Sem Hall',c:'#f472b6'}],
  Fri:[{t:'9:00',s:'Software Engg',r:'LH-105',c:'#fbbf24'},{t:'11:00',s:'Machine Learning',r:'LH-203',c:'#a78bfa'},{t:'2:00',s:'CN Lab',r:'Lab-301',c:'#34d399'}],
};

const exams = [
  {s:'Operating Systems',d:'5 May 2026',t:'9:00 AM',r:'Exam Hall A',days:9,c:'#fb923c'},
  {s:'DBMS',d:'8 May 2026',t:'9:00 AM',r:'Exam Hall B',days:12,c:'#60a5fa'},
  {s:'Computer Networks',d:'12 May 2026',t:'2:00 PM',r:'Exam Hall A',days:16,c:'#34d399'},
  {s:'Machine Learning',d:'15 May 2026',t:'9:00 AM',r:'Exam Hall C',days:19,c:'#a78bfa'},
  {s:'Software Engineering',d:'18 May 2026',t:'2:00 PM',r:'Exam Hall B',days:22,c:'#fbbf24'},
];

const Routine = () => (
  <AnimatedPage>
    <div className="space-y-6">
      <h1 className="text-xl font-heading font-bold text-[var(--fg-color)]">Routine & Exams</h1>

      {/* Upcoming Exams */}
      <div>
        <h2 className="text-base font-heading font-semibold text-[var(--fg-color)] mb-3 flex items-center gap-2"><AlertCircle size={16} className="text-crimson-rose"/>Upcoming Exams</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((e,i)=>(
            <motion.div key={i} className="glass-card-3d p-5" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${e.c}15`}}><BookOpen size={18} style={{color:e.c}}/></div>
                <span className="text-[10px] font-sans font-bold px-2 py-1 rounded-full" style={{background:e.days<=10?'rgba(248,113,113,0.15)':'rgba(251,191,36,0.15)',color:e.days<=10?'#f87171':'#fbbf24',border:`1px solid ${e.days<=10?'rgba(248,113,113,0.3)':'rgba(251,191,36,0.3)'}`}}>{e.days} days left</span>
              </div>
              <h3 className="text-sm font-sans font-semibold text-[var(--fg-color)] opacity-90">{e.s}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-[11px] font-sans text-[var(--text-muted)] flex items-center gap-1.5"><Calendar size={10}/>{e.d}</p>
                <p className="text-[11px] font-sans text-[var(--text-muted)] flex items-center gap-1.5"><Clock size={10}/>{e.t} · {e.r}</p>
              </div>
              <div className="mt-3 w-full h-1.5 rounded-full" style={{background:'var(--card-border)'}}>
                <motion.div className="h-full rounded-full" style={{background:e.c}} initial={{width:'0%'}} animate={{width:`${Math.max(10,100-e.days*4)}%`}} transition={{delay:0.5+i*0.1,duration:0.8}}/>
              </div>
              <p className="text-[10px] font-sans text-[var(--text-muted)] opacity-80 mt-1">Preparation: {Math.max(10,100-e.days*4)}%</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Timetable */}
      <div>
        <h2 className="text-base font-heading font-semibold text-[var(--fg-color)] mb-3 flex items-center gap-2"><Calendar size={16} className="text-blue-400"/>Weekly Timetable</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {Object.entries(schedule).map(([day, classes], di) => (
            <motion.div key={day} className="glass-card p-4" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:di*0.06}}>
              <h3 className="text-sm font-sans font-bold text-[var(--fg-color)] opacity-80 mb-3 text-center pb-2 border-b border-[var(--card-border)]">{day}</h3>
              <div className="space-y-2">
                {classes.map((cls, ci) => (
                  <div key={ci} className="p-2.5 rounded-xl" style={{background:`${cls.c}08`,borderLeft:`3px solid ${cls.c}`}}>
                    <p className="text-[10px] font-sans text-[var(--text-muted)] opacity-80">{cls.t}</p>
                    <p className="text-xs font-sans font-semibold text-[var(--fg-color)] opacity-80">{cls.s}</p>
                    <p className="text-[10px] font-sans text-[var(--text-muted)] opacity-80">{cls.r}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </AnimatedPage>
);

export default Routine;


