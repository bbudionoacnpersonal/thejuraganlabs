import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmailToken, error, isLoading } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    verifyEmailToken(token)
      .then(() => {
        navigate('/dashboard');
      })
      .catch(() => {
        // Error is handled by the store
      });
  }, [verifyEmailToken, searchParams, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-white">Verifying your email...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-error-500/20 border border-error-500 text-error-100 px-6 py-4 rounded-lg">
            <p>{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 text-sm text-primary-400 hover:text-primary-300"
            >
              Return to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmailPage;