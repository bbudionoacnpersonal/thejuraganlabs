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
import IndustryOnboardingPage from '@/pages/IndustryOnboardingPage';

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

const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const hasCompletedOnboarding = localStorage.getItem('user_industry');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" />;
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
        
        {/* Onboarding route */}
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <IndustryOnboardingPage />
          </ProtectedRoute>
        } />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <OnboardingRoute>
            <DashboardPage />
          </OnboardingRoute>
        } />
        
        <Route path="/teams" element={
          <OnboardingRoute>
            <TeamsPage />
          </OnboardingRoute>
        } />
        
        <Route path="/teams/create" element={
          <OnboardingRoute>
            <CreateTeamPage />
          </OnboardingRoute>
        } />
        
        <Route path="/agents" element={
          <OnboardingRoute>
            <AgentsPage />
          </OnboardingRoute>
        } />
        
        <Route path="/agents/create" element={
          <OnboardingRoute>
            <CreateAgentPage />
          </OnboardingRoute>
        } />
        
        <Route path="/agents/:id" element={
          <OnboardingRoute>
            <AgentDetailPage />
          </OnboardingRoute>
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