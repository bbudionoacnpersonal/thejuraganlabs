import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="bg-dark-background min-h-screen">
      <Navbar />
      
      <div className="max-w-md mx-auto pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-500 hover:text-primary-400">
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-dark-surface py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-dark-border">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;