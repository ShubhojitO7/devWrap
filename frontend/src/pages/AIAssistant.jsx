import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Send, Upload, Sparkles, FileText, Brain, PenTool, Loader2 } from 'lucide-react';
import api from '../utils/api';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
=======
>>>>>>> b1bfd2eb95596928a4e4cf234dfe689d00dc9bcc

const AIAssistant = () => {
  const { user } = useAuth();
  const location = useLocation();
  const hasInitialQueryRun = useRef(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi ${user?.name || 'there'}! I'm your AI study assistant powered by Gemini Pro. I can help you understand concepts, summarize PDFs, generate quizzes, create flashcards, and write essays. What would you like to learn today?` },
  ]);
  const [input, setInput] = useState('');
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
=======
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data } = await api.post('/ai/chat', {
        message: userMessage,
        history: messages
      });
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
>>>>>>> b1bfd2eb95596928a4e4cf234dfe689d00dc9bcc
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (overrideInput) => {
    const messageContent = typeof overrideInput === 'string' ? overrideInput : input;
    if (!messageContent.trim() || loading) return;

    const userMessage = { role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    if (typeof overrideInput !== 'string') setInput('');
    setLoading(true);

    try {
      const history = messages.slice(1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content
      }));

      const res = await api.post('/ai/chat', { message: messageContent, history });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
    } catch (error) {
      toast.error('Failed to get AI response. Check your API key.');
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please make sure the backend is running with a valid Gemini API key.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.initialQuery && !hasInitialQueryRun.current) {
      hasInitialQueryRun.current = true;
      handleSend(location.state.initialQuery);
    }
  }, [location.state]);

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold" style={{ color: 'var(--fg-color)' }}>AI Study Assistant</h1>
          <span className="badge" style={{background:'rgba(167,139,250,0.15)',color:'#a78bfa',border:'1px solid rgba(167,139,250,0.3)'}}>Gemini Pro</span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {[
            {i:<FileText size={14}/>, l:'Summarize PDF'},
            {i:<Brain size={14}/>, l:'Generate Quiz'},
            {i:<Sparkles size={14}/>, l:'Flashcards'},
            {i:<PenTool size={14}/>, l:'Essay Help'}
          ].map((a,i)=>(
            <button key={i} className="btn-secondary flex items-center gap-2 text-xs">{a.i}{a.l}</button>
          ))}
        </div>
<<<<<<< HEAD
        <div className="glass-card p-5 min-h-[500px] flex flex-col">
          <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-hide">
            {messages.map((m, i) => (
              <motion.div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'gap-3'}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
                {m.role === 'assistant' && <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-md" style={{background:'linear-gradient(135deg,#a78bfa,#D1495B)'}}><Sparkles size={12} className="text-white"/></div>}
                <div className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-sm font-sans shadow-sm ${m.role === 'user' ? 'text-[var(--fg-color)]' : ''}`} 
                     style={{
                       background: m.role === 'user' ? 'linear-gradient(135deg,#D1495B,#b83a4a)' : 'var(--card-bg)',
                       border: m.role === 'user' ? 'none' : '1px solid var(--card-border)',
                       color: m.role === 'user' ? 'white' : 'var(--fg-color)',
                       opacity: m.role === 'user' ? 1 : 0.9
                     }}>
=======

        <div className="glass-card p-5 min-h-[500px] flex flex-col relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-rose/5 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[80px] pointer-events-none" />

          <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            {messages.map((m, i) => (
              <motion.div 
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'gap-3'}`} 
                initial={{opacity:0,y:10}} 
                animate={{opacity:1,y:0}}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{background:'linear-gradient(135deg,#a78bfa,#D1495B)'}}>
                    <Sparkles size={14} className="text-white"/>
                  </div>
                )}
                <div 
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-sans ${m.role === 'user' ? 'text-white' : 'text-white/80'}`} 
                  style={{
                    background: m.role === 'user' ? 'linear-gradient(135deg,#D1495B,#b83a4a)' : 'rgba(255,255,255,0.06)',
                    boxShadow: m.role === 'user' ? '0 4px 15px rgba(209,73,91,0.2)' : 'none',
                    border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}
                >
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
                  {m.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div className="flex gap-3" initial={{opacity:0}} animate={{opacity:1}}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(255,255,255,0.05)'}}>
                  <Loader2 size={14} className="text-white/40 animate-spin"/>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{animationDelay:'0ms'}}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{animationDelay:'150ms'}}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{animationDelay:'300ms'}}/>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
<<<<<<< HEAD

          <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/5">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10" title="Upload PDF">
              <Upload size={18} className="text-white/40"/>
            </button>
            <input 
              className="bg-transparent border-none outline-none flex-1 text-white text-sm font-sans px-2" 
              placeholder="Ask anything about your subjects..." 
              value={input} 
              onChange={e=>setInput(e.target.value)} 
              onKeyDown={e=>e.key==='Enter'&&handleSend()}
              disabled={loading}
            />
            <button 
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${input.trim() ? 'bg-crimson-rose text-white scale-100' : 'bg-white/5 text-white/20 scale-95'}`} 
              onClick={handleSend}
              disabled={!input.trim() || loading}
            >
              <Send size={18}/>
=======
          <div className="flex gap-2">
<<<<<<< HEAD
            <button className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors hover:bg-white/5" style={{background:'var(--card-bg)',borderColor:'var(--card-border)'}}>
              <Upload size={16} style={{ color: 'var(--text-muted)' }}/>
            </button>
            <input className="input-glass flex-1" placeholder="Ask anything about your subjects..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()}/>
            <button className="btn-primary px-4 flex items-center justify-center" onClick={handleSend}><Send size={16}/></button>
          </div>
        </div>
        <div className="text-center text-[11px] font-sans" style={{ color: 'var(--text-muted)' }}>7 / 10 free queries used today · Upgrade to Premium for unlimited</div>
=======
            <button className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)'}}><Upload size={16} className="text-white/40"/></button>
            <input className="input-glass flex-1" placeholder="Ask anything about your subjects..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()} disabled={isLoading} />
            <button className="btn-primary px-4" onClick={handleSend} disabled={isLoading}>
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
>>>>>>> b1bfd2eb95596928a4e4cf234dfe689d00dc9bcc
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-2">
          <p className="text-[11px] font-sans text-white/30">
            {user?.aiQueriesUsed || 0} / 10 free queries used today
          </p>
          <button className="text-[11px] font-sans font-bold text-amber-400 hover:underline">
            Upgrade to Premium ✦
          </button>
        </div>
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
      </div>
    </AnimatedPage>
  );
};

export default AIAssistant;


