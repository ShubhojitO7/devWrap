import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowMobileSidebar(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && showMobileSidebar && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
            />
            <motion.div 
              className="fixed left-0 top-0 bottom-0 z-50"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <Sidebar collapsed={false} setCollapsed={() => {}} isMobile={true} closeMobile={() => setShowMobileSidebar(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.main
        className="min-h-screen transition-all duration-300"
        animate={{ 
          marginLeft: isMobile ? 0 : (collapsed ? 72 : 240) 
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <TopNav toggleMobileSidebar={() => setShowMobileSidebar(true)} />
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
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
