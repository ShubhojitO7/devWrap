import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from './components/shared/SplashScreen';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import NotesHub from './pages/NotesHub';
import Marketplace from './pages/Marketplace';
import Complaints from './pages/Complaints';
import Budget from './pages/Budget';
import LostFound from './pages/LostFound';
import Routine from './pages/Routine';
import Premium from './pages/Premium';
import Profile from './pages/Profile';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AnimatePresence mode="wait">
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        </AnimatePresence>
        {!showSplash && (
          <BrowserRouter>
            <Toaster position="top-right" toastOptions={{
              style: { background: '#102542', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Inter, sans-serif', fontSize: '13px' },
            }} />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/ai" element={<AIAssistant />} />
                <Route path="/notes" element={<NotesHub />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/lost-found" element={<LostFound />} />
                <Route path="/routine" element={<Routine />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
