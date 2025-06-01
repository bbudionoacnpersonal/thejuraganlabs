import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const NavbarUser: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center ml-4">
      <div className="text-white text-sm mr-3">{user.name}</div>
      <button
        type="button"
        className="p-1.5 text-gray-400 hover:text-white transition-colors duration-200"
        onClick={handleLogout}
      >
        <span className="sr-only">Logout</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  );
};

export default NavbarUser;