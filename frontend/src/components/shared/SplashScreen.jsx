import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => onComplete(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #060b14, #0a1628, #102542)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(209,73,91,0.15), transparent 70%)', top: '20%', left: '30%' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.1), transparent 70%)', bottom: '20%', right: '25%' }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-6">
          {/* Logo icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D1495B, #b83a4a)', boxShadow: '0 0 40px rgba(209,73,91,0.4)' }}
          >
            <span className="text-white text-3xl font-heading font-bold">N</span>
          </motion.div>

          {/* Brand name */}
          <motion.div className="flex items-center gap-1">
            {'StudyNest'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-5xl font-heading font-bold"
                initial={{ opacity: 0, y: 30 }}
                animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 150 }}
                style={{ color: i < 5 ? '#ffffff' : '#D1495B' }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-sm md:text-base font-sans tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            All-in-One AI Student Platform
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="w-48 h-1 rounded-full overflow-hidden mt-4"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #D1495B, #f0abb4)' }}
              initial={{ width: '0%' }}
              animate={phase >= 2 ? { width: '100%' } : {}}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
