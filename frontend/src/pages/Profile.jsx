import AnimatedPage from '../components/shared/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import { User, Mail, School, BookOpen, Crown, Settings, LogOut } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  return (
    <AnimatedPage>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-xl font-heading font-bold text-[var(--fg-color)]">Profile</h1>
        <div className="glass-card p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-heading font-bold" style={{background:'linear-gradient(135deg,#D1495B,#a78bfa)',color:'white'}}>{user.name.charAt(0)}</div>
          <div>
            <h2 className="text-lg font-heading font-bold text-[var(--fg-color)]">{user.name}</h2>
            <p className="text-sm font-sans text-[var(--text-muted)]">{user.email}</p>
            <span className="text-[10px] font-sans px-3 py-0.5 rounded-full mt-1 inline-block" style={{background:'rgba(52,211,153,0.15)',color:'#34d399',border:'1px solid rgba(52,211,153,0.3)'}}>Free Plan</span>
          </div>
        </div>
        <div className="glass-card p-5 space-y-4">
          {[{i:<School size={16}/>,l:'College',v:user.college},{i:<BookOpen size={16}/>,l:'Branch',v:user.branch},{i:<User size={16}/>,l:'Semester',v:`Sem ${user.semester}`},{i:<Crown size={16}/>,l:'CGPA',v:user.cgpa}].map((f,i)=>(
            <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3 text-[var(--text-muted)]">{f.i}<span className="text-xs font-sans">{f.l}</span></div>
              <span className="text-sm font-sans text-[var(--fg-color)] opacity-80">{f.v}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex-1 flex items-center justify-center gap-2"><Settings size={14}/>Settings</button>
          <button className="btn-primary flex-1 flex items-center justify-center gap-2"><LogOut size={14}/>Logout</button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;


