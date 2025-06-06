// Mock database for users
interface StoredUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
  avatar?: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationExpires?: number;
}

export const mockUsers: StoredUser[] = [
  {
    id: '1',
    name: 'Business User',
    email: 'business@example.com',
    username: 'business',
    password: 'business@123!',
    role: 'business',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isVerified: true
  },
  {
    id: '2',
    name: 'AI Engineer',
    email: 'engineer@example.com',
    username: 'engineer',
    password: 'engineer@123!',
    role: 'engineer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isVerified: true
  },
  {
    id: '3',
    name: 'AI Architect',
    email: 'architect@example.com',
    username: 'architect',
    password: 'password123',
    role: 'architect',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    isVerified: true
  },
  {
    id: '4',
    name: 'AI Admin',
    email: 'admin@example.com',
    username: 'admin',
    password: 'admin@123!',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    isVerified: true
  }
];

// Helper functions
export const findUserByEmail = (email: string) => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserByUsername = (username: string) => {
  return mockUsers.find(user => user.username.toLowerCase() === username.toLowerCase());
};

export const findUserByVerificationToken = (token: string) => {
  return mockUsers.find(user => user.verificationToken === token);
};

export const addUser = (user: StoredUser) => {
  mockUsers.push(user);
};

export const updateUser = (userId: string, updates: Partial<StoredUser>) => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
  }
};