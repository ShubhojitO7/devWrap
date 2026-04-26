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

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  return (
    <motion.aside
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col"
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: 'rgba(6, 11, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #D1495B, #b83a4a)' }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white text-lg font-heading font-bold">N</span>
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className="text-lg font-heading font-bold text-white whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              Study<span className="text-crimson-rose">Nest</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Menu sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {menuSections.map((section) => (
          <div key={section.title}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  className="px-3 mb-2 text-[10px] font-sans font-semibold tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
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
                  <NavLink key={item.label} to={item.path}>
                    <motion.div
                      className={`sidebar-item ${isActive ? 'active' : ''}`}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      style={collapsed ? { justifyContent: 'center', padding: '10px' } : {}}
                    >
                      <item.icon size={18} className="flex-shrink-0" />
                      <AnimatePresence>
                        {!collapsed && (
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
                      {!collapsed && item.badge && (
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
          {!collapsed && (
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
              <div className="w-full h-1.5 rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #a78bfa, #D1495B)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </div>
              <p className="text-[10px] font-sans" style={{ color: 'rgba(255,255,255,0.4)' }}>
                7 / 10 — <NavLink to="/premium" className="text-crimson-rose hover:underline">Upgrade for unlimited</NavLink>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110"
        style={{
          background: '#102542',
          borderColor: 'rgba(255,255,255,0.15)',
        }}
      >
        {collapsed ? <ChevronRight size={12} className="text-white/60" /> : <ChevronLeft size={12} className="text-white/60" />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
