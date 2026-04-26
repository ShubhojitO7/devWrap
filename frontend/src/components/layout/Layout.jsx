import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
<<<<<<< HEAD
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
=======
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
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
        )}
      </AnimatePresence>

      <motion.main
<<<<<<< HEAD
        className="flex-1 min-h-screen transition-all duration-300"
        initial={false}
        animate={{ 
          marginLeft: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : (collapsed ? 72 : 240) 
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <TopNav setMobileOpen={setMobileOpen} />
        <div className="p-4 md:p-6 lg:p-8">
=======
        className="min-h-screen transition-all duration-300"
        animate={{ 
          marginLeft: isMobile ? 0 : (collapsed ? 72 : 240) 
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <TopNav toggleMobileSidebar={() => setShowMobileSidebar(true)} />
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
>>>>>>> c1e72641f002f69d4f370240bfd233508ed374bd
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
