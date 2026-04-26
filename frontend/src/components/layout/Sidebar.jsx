import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bot, BookOpen, CalendarDays, ClipboardList,
  CheckSquare, BarChart3, ShoppingBag, AlertTriangle, Search as SearchIcon,
  Calendar, Users, Heart, Timer, Brain, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const menuSections = [
  {
    title: 'CORE',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/', badge: null },
      { label: 'AI Assistant', icon: Bot, path: '/ai', badge: null },
      { label: 'Notes Hub', icon: BookOpen, path: '/notes', badge: null },
      { label: 'Timetable', icon: CalendarDays, path: '/routine', badge: 'Today', badgeColor: '#34d399' },
      { label: 'Assignments', icon: ClipboardList, path: '/routine', badge: '3', badgeColor: '#fbbf24' },
      { label: 'Attendance', icon: CheckSquare, path: '/routine', badge: null },
      { label: 'GPA Tracker', icon: BarChart3, path: '/routine', badge: null },
    ],
  },
  {
    title: 'CAMPUS',
    items: [
      { label: 'Marketplace', icon: ShoppingBag, path: '/marketplace', badge: null },
      { label: 'Complaints', icon: AlertTriangle, path: '/complaints', badge: '2', badgeColor: '#f87171' },
      { label: 'Lost & Found', icon: SearchIcon, path: '/lost-found', badge: null },
      { label: 'Events', icon: Calendar, path: '/routine', badge: null },
    ],
  },
  {
    title: 'PERSONAL',
    items: [
      { label: 'Peer Study', icon: Users, path: '/ai', badge: null },
      { label: 'Habit Tracker', icon: Heart, path: '/habits', badge: null },
      { label: 'Budget', icon: BarChart3, path: '/budget', badge: null },
      { label: 'Pomodoro', icon: Timer, path: '/routine', badge: null },
      { label: 'Wellbeing', icon: Heart, path: '/routine', badge: null },
      { label: 'AI Resume', icon: Brain, path: '/ai', badge: null },
    ],
  },
];

const Sidebar = ({ collapsed, setCollapsed, isMobile, closeMobile }) => {
  const location = useLocation();

  return (
    <motion.aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col ${isMobile ? 'w-64' : ''}`}
      initial={false}
      animate={{ width: isMobile ? 256 : (collapsed ? 72 : 240) }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: 'var(--sidebar-bg)',
        backdropFilter: 'blur(30px)',
        borderRight: '1px solid var(--sidebar-border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b" style={{ borderColor: 'var(--card-border)' }}>
        <div className="flex items-center gap-3">
          <motion.div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #D1495B, #b83a4a)' }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white text-lg font-heading font-bold">N</span>
          </motion.div>
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.span
                className="text-lg font-heading font-bold whitespace-nowrap"
                style={{ color: 'var(--fg-color)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Study<span className="text-[#D1495B]">Nest</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {isMobile && (
          <button onClick={closeMobile} className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--card-bg)]">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Menu sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {menuSections.map((section) => (
          <div key={section.title}>
            <AnimatePresence>
              {(!collapsed || isMobile) && (
                <motion.p
                  className="px-3 mb-2 text-[10px] font-sans font-semibold tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path && item.label === 'Dashboard' ? location.pathname === '/' :
                  location.pathname === item.path;
                return (
<<<<<<< HEAD
                  <NavLink 
                    key={item.label} 
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                  >
=======
                  <NavLink key={item.label} to={item.path} onClick={isMobile ? closeMobile : undefined}>
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
                    <motion.div
                      className={`sidebar-item ${isActive ? 'active' : ''}`}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      style={(collapsed && !isMobile) ? { justifyContent: 'center', padding: '10px' } : {}}
                    >
                      <item.icon size={18} className="flex-shrink-0" />
                      <AnimatePresence>
                        {(!collapsed || isMobile) && (
                          <motion.span
                            className="flex-1 font-sans text-sm whitespace-nowrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {(!collapsed || isMobile) && item.badge && (
                        <span
                          className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${item.badgeColor}20`,
                            color: item.badgeColor,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* AI queries widget */}
      <div className="px-3 pb-4">
        <AnimatePresence>
          {(!collapsed || isMobile) && (
            <motion.div
              className="glass-card p-3 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-sans font-semibold" style={{ color: '#a78bfa' }}>
                  AI queries today
                </span>
                <Sparkles size={14} style={{ color: '#a78bfa' }} />
              </div>
              <div className="w-full h-1.5 rounded-full mb-2" style={{ background: 'var(--card-border)', opacity: 0.2 }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #a78bfa, #D1495B)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </div>
<<<<<<< HEAD
              <p className="text-[10px] font-sans" style={{ color: 'var(--text-muted)' }}>
                7 / 10 — Upgrade for unlimited
=======
              <p className="text-[10px] font-sans" style={{ color: 'var(--text-muted)' }}>
                7 / 10 — <NavLink to="/premium" className="text-crimson-rose hover:underline">Upgrade for unlimited</NavLink>
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse button */}
<<<<<<< HEAD
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full hidden lg:flex items-center justify-center border transition-all duration-200 hover:scale-110"
        style={{
          background: 'var(--sidebar-bg)',
          borderColor: 'var(--sidebar-border)',
          color: 'var(--fg-color)'
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
=======
      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110"
          style={{
            background: '#102542',
            borderColor: 'rgba(255,255,255,0.15)',
          }}
        >
          {collapsed ? <ChevronRight size={12} className="text-slate-900/50 dark:text-white/50" /> : <ChevronLeft size={12} className="text-slate-900/50 dark:text-white/50" />}
        </button>
      )}
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
    </motion.aside>
  );
};

export default Sidebar;
