import { NavLink } from 'react-router-dom';
import { Search, Bell, Crown, Menu } from 'lucide-react';
import ThemeToggle from '../shared/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const navTabs = [
  { label: 'Dashboard', path: '/' },
  { label: 'AI Study', path: '/ai' },
  { label: 'Campus', path: '/marketplace' },
  { label: 'Community', path: '/notes' },
  { label: 'Profile', path: '/profile' },
];

const TopNav = ({ toggleMobileSidebar }) => {
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3"
      style={{
        background: 'rgba(6, 11, 20, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white/60"
          onClick={toggleMobileSidebar}
        >
          <Menu size={20} />
        </button>

        {/* Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1">
        {navTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-sans font-medium transition-all duration-300 ${
                isActive
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { background: 'linear-gradient(135deg, rgba(209,73,91,0.2), rgba(209,73,91,0.05))', color: '#D1495B' }
                : {}
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search anything..."
            className="input-glass pl-9 pr-4 py-2 w-52 text-xs"
            style={{ borderRadius: '12px' }}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-sans px-1.5 py-0.5 rounded border border-white/10 text-white/30">
            ⌘K
          </kbd>
        </div>

        <ThemeToggle />

        {/* Notifications */}
        <button
          className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/5"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Bell size={18} className="text-white/60" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-crimson-rose text-[9px] text-white font-sans font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* Premium button */}
        <NavLink to="/premium">
          <motion.button
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans font-semibold"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(209,73,91,0.15))',
              border: '1px solid rgba(167,139,250,0.3)',
              color: '#a78bfa',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(167,139,250,0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Crown size={14} />
            Premium
          </motion.button>
        </NavLink>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-sans font-bold"
          style={{
            background: 'linear-gradient(135deg, #D1495B, #a78bfa)',
            color: 'white',
          }}
        >
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
