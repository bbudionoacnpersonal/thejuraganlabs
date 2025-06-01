import { create } from 'zustand';
import { User, Role } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: Role) => Promise<void>;
  setState: (state: Partial<AuthState>) => void;
}

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Business User',
    email: 'business@example.com',
    username: 'business',
    password: 'business@123!',
    role: 'business',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'AI Engineer',
    email: 'engineer@example.com',
    username: 'engineer',
    password: 'engineer@123!',
    role: 'engineer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'AI Architect',
    email: 'architect@example.com',
    username: 'architect',
    password: 'password123',
    role: 'architect',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: '4',
    name: 'AI Admin',
    email: 'admin@example.com',
    username: 'admin',
    password: 'admin@123!',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
];

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
      
      const user = mockUsers.find(u => u.username === username && u.password === password && u.role === role);
      
      if (!user) {
        throw new Error('Invalid credentials');
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
  
  signup: async (name, email, password, role) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email is already in use
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name,
        email,
        username: email.split('@')[0],
        password,
        role,
      };
      
      mockUsers.push(newUser);
      
      const token = `mock-jwt-token-${Math.random()}`;
      
      set({
        user: newUser,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      
      localStorage.setItem('zeus_auth_token', token);
      localStorage.setItem('zeus_user', JSON.stringify(newUser));
      
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