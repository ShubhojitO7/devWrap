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

<<<<<<< HEAD
const TopNav = ({ setMobileOpen }) => {
=======
const TopNav = ({ toggleMobileSidebar }) => {
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3"
      style={{
        background: 'var(--header-bg)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--header-border)',
      }}
    >
<<<<<<< HEAD
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-2 rounded-xl lg:hidden transition-colors hover:bg-white/5"
          style={{ color: 'var(--fg-color)' }}
=======
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white/60"
          onClick={toggleMobileSidebar}
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
        >
          <Menu size={20} />
        </button>

        {/* Nav Tabs */}
<<<<<<< HEAD
        <nav className="hidden lg:flex items-center gap-1">
          {navTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-sans font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--fg-color)] hover:bg-white/5'
                }`
              }
              style={({ isActive }) =>
=======
        <nav className="hidden md:flex items-center gap-1">
        {navTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-sans font-medium transition-all duration-300 ${
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
                isActive
                  ? { background: 'linear-gradient(135deg, rgba(209,73,91,0.2), rgba(209,73,91,0.05))', color: '#D1495B' }
                  : {}
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search anything..."
            className="input-glass pl-9 pr-4 py-2 w-32 md:w-52 text-xs"
            style={{ borderRadius: '12px' }}
          />
        </div>

        <ThemeToggle />

        {/* Notifications */}
        <button
          className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/5"
          style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
        >
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#D1495B] text-[8px] text-white font-sans font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* Premium button */}
<<<<<<< HEAD
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
          <span className="hidden lg:inline">Premium</span>
        </motion.button>
=======
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
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-sans font-bold flex-shrink-0"
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
