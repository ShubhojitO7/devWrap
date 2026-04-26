import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const StatCard = ({ icon, value, label, sublabel, sublabelColor = '#34d399', delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const isNumber = typeof value === 'number' || !isNaN(parseFloat(value));

  useEffect(() => {
    if (!isNumber) { setDisplayValue(value); return; }
    const target = parseFloat(value);
    const duration = 1200;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Number.isInteger(target) ? Math.round(target * eased) : (target * eased).toFixed(1));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), delay * 100);
    return () => clearTimeout(timer);
  }, [value, delay, isNumber]);

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-2xl font-heading font-bold" style={{ color: 'var(--fg-color)' }}>
        {typeof displayValue === 'string' && displayValue.startsWith('₹') ? displayValue : displayValue}
      </div>
      <p className="text-xs font-sans mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
      {sublabel && (
        <p className="text-xs font-sans mt-1 font-semibold" style={{ color: sublabelColor }}>
          {sublabel}
        </p>
      )}
    </motion.div>
  );
};

export default StatCard;
