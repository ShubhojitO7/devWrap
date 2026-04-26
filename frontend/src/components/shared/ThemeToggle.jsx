import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
      style={{
        background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(16,37,66,0.08)',
        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(16,37,66,0.1)'}`,
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.4, type: 'spring' }}
      >
        {theme === 'dark' ? (
          <Moon size={18} className="text-yellow-300" />
        ) : (
          <Sun size={18} className="text-orange-500" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
