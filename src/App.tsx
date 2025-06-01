import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import DashboardPage from '@/pages/DashboardPage';
import TeamsPage from '@/pages/TeamsPage';
import CreateTeamPage from '@/pages/CreateTeamPage';
import AgentsPage from '@/pages/AgentsPage';
import CreateAgentPage from '@/pages/CreateAgentPage';
import AgentDetailPage from '@/pages/AgentDetailPage';
import UserManagementPage from '@/pages/UserManagementPage';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const { setState } = useAuthStore();
  
  // Load user from localStorage on app initialization
  useEffect(() => {
    const storedToken = localStorage.getItem('zeus_auth_token');
    const storedUser = localStorage.getItem('zeus_user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setState({
          user: parsedUser,
          token: storedToken,
          isAuthenticated: true,
        });
      } catch (error) {
        // Invalid user data, clear localStorage
        localStorage.removeItem('zeus_auth_token');
        localStorage.removeItem('zeus_user');
      }
    }
  }, [setState]);
  
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        
        <Route path="/teams" element={
          <ProtectedRoute>
            <TeamsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/teams/create" element={
          <ProtectedRoute>
            <CreateTeamPage />
          </ProtectedRoute>
        } />
        
        <Route path="/agents" element={
          <ProtectedRoute>
            <AgentsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/agents/create" element={
          <ProtectedRoute>
            <CreateAgentPage />
          </ProtectedRoute>
        } />
        
        <Route path="/agents/:id" element={
          <ProtectedRoute>
            <AgentDetailPage />
          </ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/settings/users" element={
          <AdminRoute>
            <UserManagementPage />
          </AdminRoute>
        } />
        
        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;