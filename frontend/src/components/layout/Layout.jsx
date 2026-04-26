import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <motion.main
        className="min-h-screen transition-all duration-300"
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <TopNav />
        <div className="p-6">
          <Outlet />
        </div>

        {/* Footer status bar */}
        <footer
          className="sticky bottom-0 flex items-center justify-between px-6 py-2 text-[11px] font-sans"
          style={{
            background: 'rgba(6, 11, 20, 0.9)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              All systems operational
            </span>
          </div>
          <div className="flex items-center gap-4">
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
