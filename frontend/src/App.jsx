import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import Habits from './pages/Habits';
import Premium from './pages/Premium';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null; // Or a loading spinner
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);
  const { loading } = useAuth();

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      
      {!showSplash && (
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{
            style: { background: '#102542', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Inter, sans-serif', fontSize: '13px' },
          }} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ai" element={<AIAssistant />} />
              <Route path="/notes" element={<NotesHub />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/lost-found" element={<LostFound />} />
              <Route path="/routine" element={<Routine />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
