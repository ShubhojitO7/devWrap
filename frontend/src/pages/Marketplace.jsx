import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { ShoppingBag, Search, Plus, MessageCircle, Filter } from 'lucide-react';

const listings = [
  {t:'Engineering Maths Vol 2',d:'Good condition · CSE',p:180,c:'books',img:'📗'},
  {t:'Logitech Wireless Mouse',d:'Like new · 6 months used',p:420,c:'electronics',img:'🖱️'},
  {t:'Drafter + Set squares',d:'Used · Civil Dept',p:95,c:'stationery',img:'📐'},
  {t:'Laptop Stand Adjustable',d:'Like new · Aluminium',p:550,c:'electronics',img:'💻'},
  {t:'Scientific Calculator FX-991',d:'Good condition',p:350,c:'electronics',img:'🔢'},
  {t:'Python Programming Book',d:'3rd Edition · Unused',p:220,c:'books',img:'📕'},
];

const Marketplace = () => (
  <AnimatedPage>
<<<<<<< HEAD
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold" style={{ color: 'var(--fg-color)' }}>Campus Marketplace</h1>
        <button className="btn-primary flex items-center gap-2 text-sm"><Plus size={14}/>List Item</button>
=======
    <div className="space-y-10 pb-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-3xl font-heading font-bold text-white">Campus Marketplace</h1>
        <button className="btn-primary flex items-center gap-2 text-sm px-6"><Plus size={16}/>List Item</button>
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}/>
          <input className="input-glass pl-9 w-full" placeholder="Search items..."/>
        </div>
        <button className="btn-secondary flex items-center gap-2"><Filter size={14}/>Filter</button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {['All','Books','Electronics','Stationery','Clothing','Furniture'].map((f,i)=>(
          <button key={f} className="px-4 py-1.5 rounded-full text-xs font-sans transition-all" style={{background:i===0?'rgba(209,73,91,0.15)':'var(--card-bg)',color:i===0?'#D1495B':'var(--text-muted)',border:`1px solid ${i===0?'rgba(209,73,91,0.3)':'var(--card-border)'}`}}>{f}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {listings.map((l,i)=>(
          <motion.div key={i} className="glass-card-3d p-5" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
            <div className="w-full h-32 rounded-xl mb-3 flex items-center justify-center text-4xl" style={{background:'var(--card-border)', opacity: 0.2}}>{l.img}</div>
            <h3 className="text-sm font-sans font-semibold" style={{ color: 'var(--fg-color)', opacity: 0.9 }}>{l.t}</h3>
            <p className="text-[10px] font-sans mt-0.5" style={{ color: 'var(--text-muted)' }}>{l.d}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: 'var(--card-border)' }}>
              <span className="text-lg font-heading font-bold" style={{ color: 'var(--fg-color)' }}>₹{l.p}</span>
              <button className="flex items-center gap-1.5 text-[11px] font-sans px-3 py-1.5 rounded-lg" style={{background:'rgba(209,73,91,0.15)',color:'#D1495B',border:'1px solid rgba(209,73,91,0.3)'}}><MessageCircle size={12}/>Chat</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedPage>
);

export default Marketplace;


