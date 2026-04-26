import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import StatCard from '../components/shared/StatCard';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Bot, FileText, Receipt, Timer, ArrowUpRight, Star, Download, CheckCircle, Circle, Clock, Send, BookOpen, ShoppingBag, AlertTriangle, Search, Calendar, Heart, Smile, Meh, Frown, Crown } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [aiQuery, setAiQuery] = useState('');

  const handleAISubmit = (e) => {
    e?.preventDefault();
    if (aiQuery.trim()) {
      navigate('/ai', { state: { initialQuery: aiQuery } });
    }
  };

  const quickActions = [
    {icon: <Bot size={20}/>, label:'Ask AI', color:'#a78bfa', path: '/ai'},
    {icon: <FileText size={20}/>, label:'Upload Note', color:'#60a5fa', path: '/notes'},
    {icon: <Receipt size={20}/>, label:'Log Expense', color:'#34d399', path: '/budget'},
    {icon: <Timer size={20}/>, label:'Pomodoro', color:'#D1495B', path: '/routine'},
    {icon: <Calendar size={20}/>, label:'Schedule', color:'#fbbf24', path: '/routine'},
  ];

  return (
    <AnimatedPage>
      <div className="space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Good morning, {user.name} 👋</h1>
          <p className="text-sm font-sans mt-1" style={{color:'rgba(255,255,255,0.4)'}}>B.Tech {user.branch} · Semester {user.semester} · CGPA {user.cgpa} · 3 things due this week</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon="📊" value={user.cgpa} label="Current CGPA" sublabel="↑ 0.2 this sem" sublabelColor="#34d399" delay={0} />
          <StatCard icon="📅" value="83%" label="Avg attendance" sublabel="↓ 2% — watch out" sublabelColor="#fbbf24" delay={1} />
          <StatCard icon="💰" value="₹1,720" label="Budget left" sublabel="29% remaining" sublabelColor="#60a5fa" delay={2} />
          <StatCard icon="🔥" value="6d" label="Study streak" sublabel="↑ Best this month" sublabelColor="#a78bfa" delay={3} />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-xs font-heading font-bold text-white/40 uppercase tracking-widest px-1">Quick Actions</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {quickActions.map((a,i) => (
              <Link to={a.path} key={i}>
                <motion.div className="quick-action" whileHover={{y:-3}} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${a.color}15`,color:a.color}}>{a.icon}</div>
                  <span className="text-xs font-sans text-white/60">{a.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Chat Preview + Today's Schedule */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-heading font-bold text-white">AI Study Assistant</h2>
              <span className="badge text-[10px]" style={{background:'rgba(167,139,250,0.15)',color:'#a78bfa',border:'1px solid rgba(167,139,250,0.3)'}}>Gemini Pro</span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"/>
                <div className="glass-card p-3 text-xs font-sans text-white/70 max-w-md">Hi {user.name}! I can help with any subject. Ask me, upload a PDF, or generate quiz questions for your upcoming exam!</div>
              </div>
              <div className="flex justify-end"><div className="px-4 py-2 rounded-2xl text-xs font-sans" style={{background:'linear-gradient(135deg,#D1495B,#b83a4a)',color:'white'}}>Explain virtual memory with page replacement algorithms</div></div>
              <div className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"/>
                <div className="glass-card p-3 text-xs font-sans text-white/70 max-w-md">Virtual memory lets OS use disk as RAM extension. Key algorithms: <b className="text-amber-400">LRU</b> (least recently used), <b className="text-amber-400">FIFO</b> (first in first out — simplest), and <b className="text-amber-400">Optimal</b> (best but impractical). LRU = Optimal in practice.</div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-3">
              {['Summarize PDF','Generate Quiz','Flashcards','Essay help'].map(t=>(
                <button key={t} onClick={() => navigate('/ai', { state: { initialQuery: t } })} className="px-3 py-1.5 rounded-lg text-[11px] font-sans border transition-all hover:border-crimson-rose-400/30" style={{borderColor:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.5)'}}>{t}</button>
              ))}
            </div>
            <form onSubmit={handleAISubmit} className="flex gap-2">
              <input 
                className="input-glass flex-1 text-xs" 
                placeholder="Ask anything or upload PDF..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary px-3 py-2"><Send size={14}/></button>
            </form>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-heading font-bold text-white mb-3">Today's Timeline</h3>
            {[{t:'9am',s:'OS',c:'#fb923c'},{t:'11am',s:'DBMS',c:'#60a5fa'},{t:'2pm',s:'ML Lab',c:'#a78bfa'},{t:'4pm',s:'Study',c:'#34d399'}].map((s,i)=>(
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5">
                <span className="text-[11px] font-sans text-white/30 w-10">{s.t}</span>
                <div className="w-2 h-2 rounded-full" style={{background:s.c}}/>
                <span className="text-xs font-sans text-white/70">{s.s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance + Assignments */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-heading font-bold text-white">Attendance tracker</h3>
              <button className="text-[11px] font-sans text-crimson-rose flex items-center gap-1">Details <ArrowUpRight size={10}/></button>
            </div>
            {[{s:'OS',p:88,c:'#34d399',l:'Safe'},{s:'DBMS',p:75,c:'#fbbf24',l:'Caution'},{s:'CN',p:92,c:'#34d399',l:'Safe'},{s:'ML',p:68,c:'#f87171',l:'Risk'},{s:'SE',p:80,c:'#34d399',l:'Safe'}].map((a,i)=>(
              <div key={i} className="flex items-center gap-3 mb-3">
                <span className="text-xs font-sans text-white/70 w-12">{a.s}</span>
                <div className="flex-1 h-2 rounded-full" style={{background:'rgba(255,255,255,0.06)'}}>
                  <motion.div className="h-full rounded-full" style={{background:a.c}} initial={{width:'0%'}} animate={{width:`${a.p}%`}} transition={{delay:0.5+i*0.1,duration:0.8}}/>
                </div>
                <span className="text-[11px] font-sans text-white/50 w-10">{a.p}%</span>
                <span className="text-[10px] font-sans font-semibold" style={{color:a.c}}>{a.l}</span>
              </div>
            ))}
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-heading font-bold text-white">Assignments</h3>
              <span className="badge badge-open text-[10px]">3 pending</span>
            </div>
            {[{t:'CN Lab Report',s:'Computer Networks',st:'Done',c:'#34d399'},{t:'OS Assignment 3 — Memory',s:'Operating Systems',st:'28 Apr',c:'#fbbf24'},{t:'DBMS ER Diagram project',s:'Database Management',st:'30 Apr',c:'#fb923c'},{t:'ML Mini Project',s:'Machine Learning',st:'5 May',c:'#f87171'}].map((a,i)=>(
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{border:`1.5px solid ${a.c}`}}>
                  {a.st==='Done' && <CheckCircle size={12} style={{color:a.c}}/>}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-sans text-white/80">{a.t}</p>
                  <p className="text-[10px] font-sans text-white/30">{a.s}</p>
                </div>
                <span className="text-[10px] font-sans font-semibold" style={{color:a.c}}>{a.st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Hub + Flashcard */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-heading font-bold text-white">Notes hub</h3>
              <button className="text-[11px] font-sans text-crimson-rose">Browse all →</button>
            </div>
            {[{t:'OS Unit 4 — Memory Management',s:'CSE Sem 6',r:5,d:248},{t:'DBMS — ER Diagrams & Normalization',s:'CSE Sem 5',r:4.5,d:194},{t:'CN — TCP/IP Complete Notes',s:'CSE Sem 6',r:5,d:312},{t:'ML — Regression & Classification',s:'CSE Sem 6',r:4,d:156}].map((n,i)=>(
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                <FileText size={16} className="text-white/30"/>
                <div className="flex-1">
                  <p className="text-xs font-sans text-white/80">{n.t}</p>
                  <p className="text-[10px] font-sans text-white/30">{n.s} · {'★'.repeat(Math.floor(n.r))} · {n.d} downloads</p>
                </div>
                <button className="text-[10px] font-sans px-2 py-1 rounded-lg" style={{background:'rgba(96,165,250,0.15)',color:'#60a5fa',border:'1px solid rgba(96,165,250,0.3)'}}>+ PDF</button>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <button className="btn-secondary text-[11px] px-3 py-1.5">+ Upload notes</button>
              <button className="btn-secondary text-[11px] px-3 py-1.5">AI Summarize ✦</button>
            </div>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-heading font-bold text-white">Flashcard deck</h3>
              <span className="badge" style={{background:'rgba(167,139,250,0.15)',color:'#a78bfa',border:'1px solid rgba(167,139,250,0.3)',fontSize:'10px'}}>OS Exam prep</span>
            </div>
            <p className="text-[10px] font-sans text-white/40 mb-3">Card 7 of 24 · LRU Algorithm</p>
            <div className="glass-card p-4 text-center mb-3">
              <p className="text-xs font-sans text-white/50 mb-2">What does LRU stand for and when is it used?</p>
              <p className="text-sm font-sans text-crimson-rose font-semibold">Least Recently Used — page replacement algorithm that removes the page not used for the longest time.</p>
            </div>
            <div className="flex justify-center gap-2 mb-3">
              {['Hard','Okay','Easy'].map((l,i)=>(
                <button key={l} className="px-4 py-1.5 rounded-lg text-[11px] font-sans font-semibold" style={{background:['rgba(248,113,113,0.15)','rgba(251,191,36,0.15)','rgba(52,211,153,0.15)'][i],color:['#f87171','#fbbf24','#34d399'][i],border:`1px solid ${['rgba(248,113,113,0.3)','rgba(251,191,36,0.3)','rgba(52,211,153,0.3)'][i]}`}}>{l}</button>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] font-sans text-white/40">
              <span className="text-blue-400">6 mastered</span><span className="text-amber-400">1 review</span><span>17 remaining</span>
            </div>
          </div>
        </div>

        {/* Budget + Habit Tracker + Wellbeing */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-heading font-bold text-white">Budget</h3>
              <button className="text-[11px] font-sans text-blue-400">April →</button>
            </div>
            <div className="mb-3"><span className="text-2xl font-heading font-bold text-white">₹4,280</span><span className="text-xs font-sans text-white/30"> / ₹6,000</span></div>
            <div className="w-full h-2 rounded-full mb-3" style={{background:'rgba(255,255,255,0.06)'}}>
              <motion.div className="h-full rounded-full" style={{background:'linear-gradient(90deg,#60a5fa,#a78bfa)'}} initial={{width:'0%'}} animate={{width:'71%'}} transition={{delay:0.8,duration:1}}/>
            </div>
            {[{c:'Food',a:'₹1,840',col:'#fb923c'},{c:'Transport',a:'₹960',col:'#60a5fa'},{c:'Books',a:'₹620',col:'#a78bfa'},{c:'Others',a:'₹860',col:'#fbbf24'}].map((e,i)=>(
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{background:e.col}}/><span className="text-[11px] font-sans text-white/60">{e.c}</span></div>
                <span className="text-[11px] font-sans text-white/80">{e.a}</span>
              </div>
            ))}
            <div className="mt-3 px-3 py-1.5 rounded-lg text-[10px] font-sans font-semibold text-center" style={{background:'rgba(251,191,36,0.15)',color:'#fbbf24',border:'1px solid rgba(251,191,36,0.3)'}}>⚠ 71% budget used — 4 days left in month</div>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-heading font-bold text-white">Habit tracker</h3>
              <Link to="/habits" className="badge badge-resolved text-[10px] cursor-pointer hover:bg-emerald-400/20 transition-colors">6d streak</Link>
            </div>
            {[{h:'Morning revision',s:[1,1,1,1,1,1,0],st:6},{h:'Exercise 30 min',s:[1,0,1,0,1,0,0],st:3},{h:'Read 20 pages',s:[1,1,1,1,0,1,0],st:5},{h:'No social media before 10am',s:[1,1,1,1,1,1,1],st:7}].map((h,i)=>(
              <div key={i} className="mb-3">
                <p className="text-[11px] font-sans text-white/70 mb-1">{h.h}</p>
                <div className="flex items-center gap-1">
                  {['M','T','W','T','F','S','S'].map((d,j)=>(
                    <div key={j} className="w-5 h-5 rounded text-[9px] font-sans flex items-center justify-center" style={{background:h.s[j]?'rgba(52,211,153,0.2)':'rgba(255,255,255,0.04)',color:h.s[j]?'#34d399':'rgba(255,255,255,0.2)',border:h.s[j]?'1px solid rgba(52,211,153,0.3)':'1px solid transparent'}}>{d}</div>
                  ))}
                  <span className="text-[10px] font-sans text-amber-400 ml-1">🔥{h.st}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card p-5">
            <h3 className="text-sm font-heading font-bold text-white mb-3">Wellbeing check</h3>
            <p className="text-[11px] font-sans text-white/40 mb-2">How are you feeling today?</p>
            <div className="flex gap-2 mb-1 justify-between">
              {[
                {e:'😞', n:'Down'},
                {e:'😐', n:'Neutral'},
                {e:'😊', n:'Good'},
                {e:'😄', n:'Great'},
                {e:'🤩', n:'Awesome'}
              ].map((m,i)=>(
                <div key={i} className="flex flex-col items-center gap-1">
                  <button className="w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all hover:scale-110" style={{background:i===3?'rgba(52,211,153,0.2)':'rgba(255,255,255,0.04)',border:i===3?'1px solid rgba(52,211,153,0.3)':'1px solid transparent'}}>{m.e}</button>
                  <span className="text-[8px] font-sans text-white/30 uppercase tracking-tighter">{m.n}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-sans text-white/30 mb-2 mt-4">This week's mood</p>
            <div className="flex gap-1 mb-3">
              {['M','T','W','T','F'].map((d,i)=>(
                <div key={i} className="w-6 h-6 rounded text-[9px] font-sans flex items-center justify-center" style={{background:['rgba(52,211,153,0.15)','rgba(52,211,153,0.15)','rgba(251,191,36,0.15)','rgba(52,211,153,0.15)','rgba(96,165,250,0.15)'][i],color:['#34d399','#34d399','#fbbf24','#34d399','#60a5fa'][i]}}>{d}</div>
              ))}
            </div>
            <div className="glass-card p-3 text-[10px] font-sans text-white/50">Tip: You've had a good week! Remember to take a 10-min break every hour. Staying hydrated boosts focus by 15%.</div>
          </div>
        </div>


        {/* Marketplace + Events + Lost & Found */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-heading font-bold text-white">Marketplace</h3>
              <button className="text-[11px] font-sans text-crimson-rose">Browse →</button>
            </div>
            {[{t:'Engineering Maths Vol 2',d:'Good condition · CSE',p:'₹180',c:'#34d399'},{t:'Logitech Wireless Mouse',d:'Like new',p:'₹420',c:'#60a5fa'},{t:'Drafter + Set squares',d:'Used · Civil Dept',p:'₹95',c:'#fbbf24'}].map((l,i)=>(
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg" style={{background:`${l.c}15`}}/>
                <div className="flex-1">
                  <p className="text-xs font-sans text-white/80">{l.t}</p>
                  <p className="text-[10px] font-sans text-white/30">{l.d}</p>
                </div>
                <span className="text-sm font-heading font-bold text-white">{l.p}</span>
              </div>
            ))}
            <button className="w-full mt-3 btn-secondary text-[11px] py-2">+ List your item</button>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-heading font-bold text-white">Campus events</h3>
              <button className="text-[11px] font-sans text-crimson-rose">All →</button>
            </div>
            {[{d:'28',m:'APR',t:'Hackathon 2026 — Registration',l:'Main Auditorium · 10:00 AM',tag:'Tech',tc:'#60a5fa'},{d:'30',m:'APR',t:'Cultural Fest — Music Night',l:'Open Ground · 6:00 PM',tag:'Culture',tc:'#a78bfa'},{d:'2',m:'MAY',t:'Alumni Talk — Career in AI/ML',l:'Seminar Hall · 11:00 AM',tag:'Career',tc:'#34d399'}].map((e,i)=>(
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center text-center" style={{background:'rgba(96,165,250,0.1)',border:'1px solid rgba(96,165,250,0.2)'}}>
                  <span className="text-[10px] font-sans font-bold text-blue-400">{e.d}</span>
                  <span className="text-[8px] font-sans text-blue-400/60">{e.m}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-sans text-white/80">{e.t}</p>
                  <p className="text-[10px] font-sans text-white/30">{e.l}</p>
                  <span className="text-[9px] font-sans px-2 py-0.5 rounded-full mt-1 inline-block" style={{background:`${e.tc}15`,color:e.tc}}>{e.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-heading font-bold text-white">Lost & Found</h3>
              <button className="text-[11px] font-sans text-crimson-rose">Report →</button>
            </div>
            {[{t:'Blue Casio FX-991 calculator',l:'Library · 24 Apr · Reward ₹50',tp:'LOST',c:'#f87171'},{t:'Black wallet near Canteen B',l:'Canteen B · 25 Apr',tp:'FOUND',c:'#34d399'},{t:'Dell 65W laptop charger',l:'Lab 302 · 25 Apr',tp:'LOST',c:'#f87171'},{t:'ID Card — Priya Sharma',l:'Main Gate · 26 Apr',tp:'FOUND',c:'#34d399'}].map((l,i)=>(
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5">
                <span className="text-[9px] font-sans font-bold px-2 py-0.5 rounded-full" style={{background:`${l.c}15`,color:l.c,border:`1px solid ${l.c}30`}}>{l.tp}</span>
                <div className="flex-1">
                  <p className="text-xs font-sans text-white/80">{l.t}</p>
                  <p className="text-[10px] font-sans text-white/30">{l.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints + Premium CTA */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-heading font-bold text-white">Hostel complaints</h3>
              <span className="badge" style={{background:'rgba(96,165,250,0.15)',color:'#60a5fa',border:'1px solid rgba(96,165,250,0.3)',fontSize:'10px'}}>Room 402</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[{t:'Water tap leaking',s:'Open',d:'24 Apr',c:'#fbbf24'},{t:'WiFi not working',s:'In Progress',d:'22 Apr',c:'#60a5fa'},{t:'AC remote missing',s:'Resolved',d:'18 Apr',c:'#34d399'},{t:'Mess food quality',s:'Resolved',d:'10 Apr',c:'#34d399'}].map((c,i)=>(
                <div key={i} className="flex items-start gap-2">
                  <Circle size={8} className="mt-1 flex-shrink-0" style={{color:c.c}}/>
                  <div>
                    <p className="text-xs font-sans text-white/80">{c.t}</p>
                    <p className="text-[10px] font-sans text-white/30">{c.s} · {c.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full btn-secondary text-[11px] py-2" style={{borderColor:'rgba(52,211,153,0.3)',color:'#34d399'}}>+ Submit new complaint</button>
          </div>
          <motion.div className="glass-card p-5 relative overflow-hidden" style={{background:'linear-gradient(135deg,rgba(167,139,250,0.1),rgba(209,73,91,0.1))',border:'1px solid rgba(167,139,250,0.2)'}} whileHover={{scale:1.01}}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-heading font-bold text-white flex items-center gap-2"><Crown size={16} className="text-amber-400"/>Unlock StudyNest Premium</h3>
                <p className="text-[11px] font-sans text-white/40 mt-1">Unlimited AI queries · Advanced analytics · Priority complaints · Ad-free marketplace · Exclusive notes</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-heading font-bold text-white">₹99<span className="text-xs text-white/40">/mo</span></p>
                <p className="text-[10px] font-sans text-white/30">or ₹799/yr</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Dashboard;
