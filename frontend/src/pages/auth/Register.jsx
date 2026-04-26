import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, GraduationCap, BookOpen, ArrowRight, Loader2, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    branch: '',
    semester: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a192f] py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-crimson-rose/10 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl glass-card p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-crimson-rose rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <Bot size={32} className="text-slate-900 dark:text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">Join StudyNest</h1>
          <p className="text-slate-900/50 dark:text-white/50 font-sans mt-2">Create your student profile to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-sans font-semibold text-slate-900/50 dark:text-white/50 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/50 dark:text-white/50" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-glass pl-10"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans font-semibold text-slate-900/50 dark:text-white/50 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/50 dark:text-white/50" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-glass pl-10"
                placeholder="john@college.edu"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans font-semibold text-slate-900/50 dark:text-white/50 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/50 dark:text-white/50" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-glass pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans font-semibold text-slate-900/50 dark:text-white/50 ml-1">College/University</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/50 dark:text-white/50" size={18} />
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="input-glass pl-10"
                placeholder="IIT Delhi"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans font-semibold text-slate-900/50 dark:text-white/50 ml-1">Branch/Stream</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/50 dark:text-white/50" size={18} />
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="input-glass pl-10"
                placeholder="Computer Science"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans font-semibold text-slate-900/50 dark:text-white/50 ml-1">Current Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="input-glass"
              required
            >
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6,7,8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-900/10 dark:border-white/10 text-center">
          <p className="text-sm font-sans text-slate-900/50 dark:text-white/50">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline font-semibold">Sign in instead</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
