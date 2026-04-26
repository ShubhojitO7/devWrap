import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/shared/AnimatedPage';
import { Heart, Plus, Flame, CheckCircle2, Circle, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Habits = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning revision', streak: 6, history: [1, 1, 1, 1, 1, 1, 0], color: '#34d399', goal: 'Daily' },
    { id: 2, name: 'Exercise 30 min', streak: 3, history: [1, 0, 1, 0, 1, 0, 0], color: '#60a5fa', goal: '3x / week' },
    { id: 3, name: 'Read 20 pages', streak: 5, history: [1, 1, 1, 1, 0, 1, 0], color: '#fbbf24', goal: 'Daily' },
    { id: 4, name: 'No social media before 10am', streak: 7, history: [1, 1, 1, 1, 1, 1, 1], color: '#f87171', goal: 'Daily' },
  ]);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleHabit = (habitId, dayIndex) => {
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const newHistory = [...h.history];
        newHistory[dayIndex] = newHistory[dayIndex] ? 0 : 1;
        
        // Recalculate streak (simplified)
        let newStreak = 0;
        for (let i = newHistory.length - 1; i >= 0; i--) {
          if (newHistory[i]) newStreak++;
          else break;
        }
        
        return { ...h, history: newHistory, streak: newStreak };
      }
      return h;
    }));
  };

  const handleAddHabit = () => {
    toast.success('New habit template created!');
  };

  return (
    <AnimatedPage>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Habit Tracker</h1>
            <p className="text-sm font-sans text-white/40">Consistency is the key to mastery.</p>
          </div>
          <button onClick={handleAddHabit} className="btn-primary flex items-center gap-2">
            <Plus size={18}/> New Habit
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                <TrendingUp size={20}/>
              </div>
              <div>
                <p className="text-[11px] font-sans text-white/40">Weekly Success Rate</p>
                <p className="text-xl font-heading font-bold text-white">78%</p>
              </div>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full mt-3">
              <motion.div className="h-full bg-emerald-400 rounded-full" initial={{width:0}} animate={{width:'78%'}} transition={{duration:1}}/>
            </div>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                <Flame size={20}/>
              </div>
              <div>
                <p className="text-[11px] font-sans text-white/40">Longest Streak</p>
                <p className="text-xl font-heading font-bold text-white">12 Days</p>
              </div>
            </div>
            <p className="text-[10px] font-sans text-white/30 mt-3">Keep it up! You're in the top 5% of students.</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                <Award size={20}/>
              </div>
              <div>
                <p className="text-[11px] font-sans text-white/40">Monthly Badges</p>
                <p className="text-xl font-heading font-bold text-white">4 Earned</p>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              {[1,2,3,4].map(i => <div key={i} className="w-5 h-5 rounded-full bg-blue-400/20 border border-blue-400/30"/>)}
            </div>
          </div>
        </div>

        {/* Detailed Habits List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-heading font-bold text-white uppercase tracking-wider">Active Habits</h2>
            <div className="flex gap-4">
              {days.map(d => <span key={d} className="w-10 text-center text-[10px] font-sans text-white/30">{d}</span>)}
              <span className="w-12 text-center text-[10px] font-sans text-white/30">Streak</span>
            </div>
          </div>

          {habits.map((h, i) => (
            <motion.div 
              key={h.id} 
              className="glass-card p-4 flex items-center justify-between"
              initial={{opacity:0, x:-20}}
              animate={{opacity:1, x:0}}
              transition={{delay: i * 0.1}}
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 rounded-full" style={{background: h.color}}/>
                <div>
                  <h3 className="text-sm font-sans font-semibold text-white/90">{h.name}</h3>
                  <p className="text-[10px] font-sans text-white/30 flex items-center gap-1">
                    <Target size={10}/> {h.goal}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {h.history.map((status, j) => (
                    <button 
                      key={j} 
                      onClick={() => toggleHabit(h.id, j)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                      style={{
                        background: status ? `${h.color}15` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${status ? `${h.color}30` : 'rgba(255,255,255,0.05)'}`,
                        color: status ? h.color : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {status ? <CheckCircle2 size={16}/> : <Circle size={16}/>}
                    </button>
                  ))}
                </div>
                <div className="w-12 text-center">
                  <span className="text-sm font-heading font-bold text-amber-400 flex items-center justify-center gap-1">
                    <Flame size={14}/>{h.streak}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insights Section */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="glass-card p-5">
            <h3 className="text-sm font-heading font-bold text-white mb-4 flex items-center gap-2">
              <Calendar size={16} className="text-blue-400"/> Productivity Insights
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-sans text-white/60">
                You are most consistent with <b className="text-white">Morning revision</b>. You've completed it 14 days in a row!
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-sans text-white/60">
                Consistency dropped on <b className="text-white">Sundays</b>. Try setting a smaller goal for weekends.
              </div>
            </div>
          </div>
          <div className="glass-card p-5 bg-gradient-to-br from-crimson-rose/10 to-transparent">
            <h3 className="text-sm font-heading font-bold text-white mb-4 flex items-center gap-2">
              <Target size={16} className="text-crimson-rose"/> Smart Suggestion
            </h3>
            <p className="text-xs font-sans text-white/60 leading-relaxed mb-4">
              Based on your schedule, you have a gap between 4pm and 5pm. This is a great time to tackle your <b className="text-white">Exercise 30 min</b> habit.
            </p>
            <button className="text-[11px] font-sans font-bold text-crimson-rose hover:underline">Set reminder for 4:00 PM →</button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Habits;
