import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Send, Upload, Sparkles, FileText, Brain, PenTool } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI study assistant powered by Gemini Pro. I can help you understand concepts, summarize PDFs, generate quizzes, create flashcards, and write essays. What would you like to learn today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }, { role: 'assistant', content: 'This is a demo response. Connect the backend with your Gemini API key to get real AI responses. The AI would provide detailed explanations, code examples, and structured learning content based on your question.' }]);
    setInput('');
  };

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold" style={{ color: 'var(--fg-color)' }}>AI Study Assistant</h1>
          <span className="badge" style={{background:'rgba(167,139,250,0.15)',color:'#a78bfa',border:'1px solid rgba(167,139,250,0.3)'}}>Gemini Pro</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[{i:<FileText size={14}/>,l:'Summarize PDF'},{i:<Brain size={14}/>,l:'Generate Quiz'},{i:<Sparkles size={14}/>,l:'Flashcards'},{i:<PenTool size={14}/>,l:'Essay Help'}].map((a,i)=>(
            <button key={i} className="btn-secondary flex items-center gap-2 text-xs">{a.i}{a.l}</button>
          ))}
        </div>
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
                  {m.content}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors hover:bg-white/5" style={{background:'var(--card-bg)',borderColor:'var(--card-border)'}}>
              <Upload size={16} style={{ color: 'var(--text-muted)' }}/>
            </button>
            <input className="input-glass flex-1" placeholder="Ask anything about your subjects..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()}/>
            <button className="btn-primary px-4 flex items-center justify-center" onClick={handleSend}><Send size={16}/></button>
          </div>
        </div>
        <div className="text-center text-[11px] font-sans" style={{ color: 'var(--text-muted)' }}>7 / 10 free queries used today · Upgrade to Premium for unlimited</div>
      </div>
    </AnimatedPage>
  );
};

export default AIAssistant;


