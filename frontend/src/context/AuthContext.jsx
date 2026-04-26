import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useState({
    id: 'demo-user-1',
    name: 'Aryan',
    email: 'aryan@college.edu',
    college: 'NIT Delhi',
    branch: 'CSE',
    semester: 6,
    cgpa: 8.4,
    hostelRoom: 'Room 402',
    plan: 'free',
    avatar: '',
    aiQueriesUsed: 7,
    streak: 6,
  });

  const [isAuthenticated] = useState(true);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
