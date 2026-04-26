import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import { User, Mail, School, BookOpen, Crown, Settings, LogOut, Phone, Calendar, Shield, CreditCard, Bell, ChevronRight, Star } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  const sections = [
    {
      title: 'Academic Profile',
      items: [
        { icon: <School size={16}/>, label: 'College', value: user.college },
        { icon: <BookOpen size={16}/>, label: 'Branch', value: user.branch },
        { icon: <User size={16}/>, label: 'Semester', value: `Semester ${user.semester}` },
        { icon: <Crown size={16}/>, label: 'Current CGPA', value: user.cgpa, color: '#fbbf24' },
      ]
    },
    {
      title: 'Personal Information',
      items: [
        { icon: <Mail size={16}/>, label: 'Email', value: user.email },
        { icon: <Phone size={16}/>, label: 'Phone', value: '+91 98765 43210' },
        { icon: <Calendar size={16}/>, label: 'Date of Birth', value: '12 May 2004' },
      ]
    }
  ];

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold text-white">My Profile</h1>
          <button className="text-xs font-sans text-crimson-rose hover:underline flex items-center gap-1">Edit Profile <ChevronRight size={12}/></button>
        </div>

        {/* Hero Section */}
        <div className="glass-card p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-rose/10 blur-[100px] pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-heading font-bold shadow-2xl" style={{background:'linear-gradient(135deg,#D1495B,#a78bfa)',color:'white'}}>
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center border-4 border-[#060b14] text-[#060b14]">
                <Star size={14} fill="currentColor"/>
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-2xl font-heading font-bold text-white">{user.name}</h2>
                <span className="badge" style={{background:'rgba(52,211,153,0.15)',color:'#34d399',border:'1px solid rgba(52,211,153,0.3)',fontSize:'10px'}}>PRO MEMBER</span>
              </div>
              <p className="text-sm font-sans text-white/40 mb-4">{user.email} · Student ID: #SW-2024-9102</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-center md:text-left">
                  <p className="text-lg font-heading font-bold text-white">124</p>
                  <p className="text-[10px] font-sans text-white/30 uppercase tracking-wider">Notes Shared</p>
                </div>
                <div className="w-px h-8 bg-white/10 hidden md:block"/>
                <div className="text-center md:text-left">
                  <p className="text-lg font-heading font-bold text-white">4.9</p>
                  <p className="text-[10px] font-sans text-white/30 uppercase tracking-wider">Avg Rating</p>
                </div>
                <div className="w-px h-8 bg-white/10 hidden md:block"/>
                <div className="text-center md:text-left">
                  <p className="text-lg font-heading font-bold text-white">2.4k</p>
                  <p className="text-[10px] font-sans text-white/30 uppercase tracking-wider">Downloads</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button className="btn-primary w-full flex items-center justify-center gap-2 text-sm"><Settings size={14}/> Settings</button>
              <button className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"><LogOut size={14}/> Logout</button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <div key={idx} className="glass-card p-6">
              <h3 className="text-sm font-heading font-bold text-white/80 mb-4 uppercase tracking-widest text-xs">{section.title}</h3>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3 text-white/40">
                      {item.icon}
                      <span className="text-xs font-sans">{item.label}</span>
                    </div>
                    <span className="text-sm font-sans text-white/80" style={item.color ? {color: item.color} : {}}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Account & Security Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Shield size={18}/>, label: 'Security', desc: 'Password & 2FA', color: '#60a5fa' },
            { icon: <CreditCard size={18}/>, label: 'Billing', desc: 'Manage plan', color: '#a78bfa' },
            { icon: <Bell size={18}/>, label: 'Notifications', desc: 'Email & Push', color: '#fbbf24' },
            { icon: <Settings size={18}/>, label: 'Preferences', desc: 'Dark mode & UI', color: '#34d399' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="glass-card p-4 text-center cursor-pointer hover:bg-white/5 transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{background: `${item.color}15`, color: item.color}}>
                {item.icon}
              </div>
              <p className="text-xs font-sans font-bold text-white mb-1">{item.label}</p>
              <p className="text-[9px] font-sans text-white/30">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;
