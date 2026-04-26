import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Crown, Check, X } from 'lucide-react';

const plans = [
  {n:'Free',p:'₹0',per:'forever',pop:false,features:[{t:'10 AI queries/day',v:true},{t:'Notes upload/download',v:true},{t:'Basic budget tracker',v:true},{t:'Marketplace listings',v:false},{t:'Priority complaints',v:false},{t:'Advanced analytics',v:false}],btn:'Current Plan',style:{bg:'rgba(255,255,255,0.04)',border:'rgba(255,255,255,0.08)'}},
  {n:'Premium',p:'₹99',per:'month',pop:true,features:[{t:'Unlimited AI queries',v:true},{t:'PDF summarizer',v:true},{t:'Quiz generator',v:true},{t:'Marketplace access',v:true},{t:'Priority complaints',v:true},{t:'Advanced analytics',v:true}],btn:'Upgrade — Razorpay',style:{bg:'linear-gradient(135deg,rgba(167,139,250,0.1),rgba(209,73,91,0.1))',border:'rgba(167,139,250,0.3)'}},
  {n:'Annual',p:'₹799',per:'year',pop:false,sub:'Save ₹389 vs monthly',features:[{t:'Everything in Premium',v:true},{t:'Ad-free marketplace',v:true},{t:'Exclusive notes access',v:true},{t:'Early feature access',v:true},{t:'Dedicated support',v:true},{t:'Export all data',v:true}],btn:'Get Annual Deal',style:{bg:'rgba(255,255,255,0.04)',border:'rgba(255,255,255,0.08)'}},
];

const Premium = () => (
  <AnimatedPage>
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold text-white flex items-center justify-center gap-2"><Crown className="text-amber-400" size={24}/>StudyNest Premium</h1>
        <p className="text-sm font-sans text-white/40 mt-2">Unlock the full power of AI-driven learning</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p,i)=>(
          <motion.div key={i} className="glass-card p-6 relative" style={{background:p.style.bg,border:`1px solid ${p.style.border}`}} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} whileHover={{y:-5}}>
            {p.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-sans font-bold" style={{background:'linear-gradient(135deg,#a78bfa,#D1495B)',color:'white'}}>Most Popular</div>}
            <h3 className="text-lg font-heading font-bold text-white">{p.n}</h3>
            <div className="mt-2 mb-1"><span className="text-3xl font-heading font-bold text-white">{p.p}</span><span className="text-sm font-sans text-white/40"> / {p.per}</span></div>
            {p.sub && <p className="text-[11px] font-sans text-emerald-400 mb-3">{p.sub}</p>}
            <div className="space-y-2.5 my-5">
              {p.features.map((f,j)=>(
                <div key={j} className="flex items-center gap-2">
                  {f.v ? <Check size={14} className="text-emerald-400"/> : <X size={14} className="text-white/20"/>}
                  <span className={`text-xs font-sans ${f.v?'text-white/70':'text-white/30'}`}>{f.t}</span>
                </div>
              ))}
            </div>
            <button className={`w-full py-2.5 rounded-xl text-sm font-sans font-semibold transition-all ${p.pop?'btn-primary':'btn-secondary'}`}>{p.btn}</button>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedPage>
);

export default Premium;
