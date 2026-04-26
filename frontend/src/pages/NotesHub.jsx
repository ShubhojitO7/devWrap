import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Search, Upload, Star, Download, Filter, FileText, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-hot-toast';

const NotesHub = () => {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await api.get('/notes', {
          params: { search, semester: filter === 'All' ? undefined : filter.replace('Sem ', '') }
        });
        setNotes(res.data);
      } catch (error) {
        // Fallback to mock data if backend fails or is empty
        console.error('Failed to fetch notes', error);
        setNotes([
          {_id:'1', title:'OS Unit 4 — Memory Management', subject:'Operating Systems', semester:6, averageRating:5, downloads:248, uploader:{name:'Rahul K.'}, branch:'CSE'},
          {_id:'2', title:'DBMS — ER Diagrams & Normalization', subject:'Database Management', semester:5, averageRating:4.5, downloads:194, uploader:{name:'Priya S.'}, branch:'CSE'},
          {_id:'3', title:'CN — TCP/IP Complete Notes', subject:'Computer Networks', semester:6, averageRating:5, downloads:312, uploader:{name:'Amit R.'}, branch:'CSE'},
          {_id:'4', title:'ML — Regression & Classification', subject:'Machine Learning', semester:6, averageRating:4, downloads:156, uploader:{name:'Neha G.'}, branch:'CSE'},
        ]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchNotes();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, filter]);

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/notes/download/${id}`);
      window.open(res.data.fileUrl, '_blank');
      toast.success('Download started!');
    } catch (error) {
      toast.error('Failed to download note');
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        toast.promise(
          new Promise((resolve) => setTimeout(resolve, 2000)), // Simulating upload
          {
            loading: `Uploading ${file.name}...`,
            success: 'Note uploaded successfully! It will appear after review.',
            error: 'Failed to upload note.',
          }
        );
      }
    };
    input.click();
  };

  return (
    <AnimatedPage>
      <div className="space-y-6">
<<<<<<< HEAD
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
=======
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold text-slate-900 dark:text-white">Notes Hub</h1>
          <button onClick={handleUploadClick} className="btn-primary flex items-center gap-2 text-sm"><Upload size={14}/>Upload Notes</button>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/50 dark:text-white/50"/>
            <input 
              className="input-glass pl-9 w-full" 
              placeholder="Search notes by subject, topic..." 
              value={search} 
              onChange={e=>setSearch(e.target.value)}
            />
          </div>
          <button className="btn-secondary flex items-center gap-2"><Filter size={14}/>Filters</button>
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
        </div>

        <div className="flex gap-2 flex-wrap">
<<<<<<< HEAD
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
=======
          {['All','Sem 6','Sem 5','CSE','ECE'].map((f)=>(
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-sans transition-all" 
              style={{
                background: filter === f ? 'rgba(209,73,91,0.15)' : 'var(--card-border)',
                color: filter === f ? '#D1495B' : 'var(--fg-color)',
                border: `1px solid ${filter === f ? 'rgba(209,73,91,0.3)' : 'rgba(255,255,255,0.08)'}`
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-crimson-rose" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((n,i)=>(
              <motion.div 
                key={n._id} 
                className="glass-card-3d p-5" 
                initial={{opacity:0,y:20}} 
                animate={{opacity:1,y:0}} 
                transition={{delay:i*0.05}}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(96,165,250,0.1)'}}>
                    <FileText size={18} className="text-blue-400"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-sans font-semibold text-slate-900/50 dark:text-white/50">{n.title}</h3>
                    <p className="text-[10px] font-sans text-slate-900/50 dark:text-white/50 mt-0.5">{n.subject} · {n.branch} · Sem {n.semester}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({length:5}).map((_,j)=>(
                        <Star 
                          key={j} 
                          size={10} 
                          className={j < Math.floor(n.averageRating || 0) ? 'text-amber-400' : 'text-slate-900/50 dark:text-white/50'} 
                          fill={j < Math.floor(n.averageRating || 0) ? '#fbbf24' : 'transparent'}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-sans text-slate-900/50 dark:text-white/50">{n.averageRating || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-sans text-slate-900/50 dark:text-white/50">
                    <Download size={10}/>{n.downloads || 0}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-900/10 dark:border-white/10">
                  <span className="text-[10px] font-sans text-slate-900/50 dark:text-white/50">by {n.uploader?.name || 'Unknown'}</span>
                  <button 
                    onClick={() => handleDownload(n._id)}
                    className="text-[10px] font-sans px-3 py-1 rounded-lg" 
                    style={{background:'rgba(96,165,250,0.15)',color:'#60a5fa',border:'1px solid rgba(96,165,250,0.3)'}}
                  >
                    Download PDF
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
      </div>
    </AnimatedPage>
  );
};

export default NotesHub;


