import { create } from 'zustand';
import { User, Role } from '@/types';
import { validateNewUser, registerUser, verifyEmail } from '@/services/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, username: string, password: string, role: Role) => Promise<void>;
  verifyEmailToken: (token: string) => Promise<void>;
  setState: (state: Partial<AuthState>) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  setState: (state) => set(state),
  
  login: async (username, password, role) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role &&
        u.isVerified
      );
      
      if (!user) {
        throw new Error('Invalid credentials or email not verified');
      }
      
      const token = `mock-jwt-token-${Math.random()}`;
      
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      
      localStorage.setItem('zeus_auth_token', token);
      localStorage.setItem('zeus_user', JSON.stringify(user));
      
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('zeus_auth_token');
    localStorage.removeItem('zeus_user');
    
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  
  signup: async (name, email, username, password, role) => {
    set({ isLoading: true, error: null });
    
    try {
      // Validate unique email and username
      const validationErrors = validateNewUser(email, username);
      if (Object.keys(validationErrors).length > 0) {
        throw new Error(Object.values(validationErrors)[0]);
      }
      
      // Register new user
      const newUser = registerUser(name, email, username, password, role);
      
      set({
        isLoading: false,
        error: 'Please check your email to verify your account'
      });
      
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmailToken: async (token: string) => {
    set({ isLoading: true, error: null });

    try {
      const user = verifyEmail(token);
      const authToken = `mock-jwt-token-${Math.random()}`;

      set({
        user,
        token: authToken,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('zeus_auth_token', authToken);
      localStorage.setItem('zeus_user', JSON.stringify(user));

    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
      throw error;
    }
  },
}));

export default useAuthStore;