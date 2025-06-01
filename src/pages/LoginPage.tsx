import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import LoginForm from '@/components/auth/LoginForm';
import Footer from '@/components/common/Footer';
import useAuthStore from '@/store/authStore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="bg-dark-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Select your role to get started</h2>
            <p className="mt-2 text-sm text-gray-400">
              We will personalize the UI based on your role
            </p>
          </div>
          
          <div className="mt-8 bg-dark-surface py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-dark-border">
            <LoginForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;