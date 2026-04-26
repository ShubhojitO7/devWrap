import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.main
        className="flex-1 min-h-screen transition-all duration-300"
        initial={false}
        animate={{ 
          marginLeft: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : (collapsed ? 72 : 240) 
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <TopNav setMobileOpen={setMobileOpen} />
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>

        {/* Footer status bar */}
        <footer
          className="sticky bottom-0 flex flex-col md:flex-row items-center justify-between px-6 py-3 text-[10px] md:text-[11px] font-sans gap-2"
          style={{
            background: 'var(--header-bg)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--header-border)',
            color: 'var(--text-muted)',
          }}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              All systems operational
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>StudyNest — React + Node.js + MongoDB + Gemini AI</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Gemini Pro connected
            </span>
          </div>
        </footer>
      </motion.main>
    </div>
  );
};

export default Layout;
