import { create } from 'zustand';
import { Team, User } from '@/types';

interface TeamState {
  teams: Team[];
  currentTeam: Team | null;
  isLoading: boolean;
  error: string | null;
  fetchTeams: () => Promise<void>;
  createTeam: (name: string, description: string, ownerId: string) => Promise<void>;
  selectTeam: (teamId: string) => void;
  addMemberToTeam: (teamId: string, userId: string) => Promise<void>;
  removeMemberFromTeam: (teamId: string, userId: string) => Promise<void>;
}

// Mock data
const mockUsers: Record<string, User> = {
  '1': {
    id: '1',
    name: 'Business User',
    email: 'business@example.com',
    role: 'business',
  },
  '2': {
    id: '2',
    name: 'AI Engineer',
    email: 'engineer@example.com',
    role: 'engineer',
  },
  '3': {
    id: '3',
    name: 'AI Architect',
    email: 'architect@example.com',
    role: 'architect',
  },
};

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Customer Service Team',
    description: 'AI agents for customer service and support',
    members: [mockUsers['1'], mockUsers['2']],
    ownerId: '1',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    agents: [],
  },
  {
    id: '2',
    name: 'Marketing Analysis',
    description: 'AI agents for marketing data analysis and insights',
    members: [mockUsers['1'], mockUsers['3']],
    ownerId: '1',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    agents: [],
  },
];

const useTeamStore = create<TeamState>((set, get) => ({
  teams: [],
  currentTeam: null,
  isLoading: false,
  error: null,
  
  fetchTeams: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({
        teams: mockTeams,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
  
  createTeam: async (name, description, ownerId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const owner = mockUsers[ownerId];
      
      if (!owner) {
        throw new Error('Owner not found');
      }
      
      const newTeam: Team = {
        id: String(mockTeams.length + 1),
        name,
        description,
        members: [owner],
        ownerId,
        createdAt: new Date().toISOString(),
        agents: [],
      };
      
      mockTeams.push(newTeam);
      
      set({
        teams: [...get().teams, newTeam],
        currentTeam: newTeam,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
  
  selectTeam: (teamId) => {
    const team = get().teams.find(t => t.id === teamId) || null;
    set({ currentTeam: team });
  },
  
  addMemberToTeam: async (teamId, userId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = mockUsers[userId];
      
      if (!user) {
        throw new Error('User not found');
      }
      
      set({
        teams: get().teams.map(team => {
          if (team.id === teamId) {
            // Check if user is already a member
            if (team.members.some((member) => member.id === userId)) {
              return team;
            }
            
            return {
              ...team,
              members: [...team.members, user],
            };
          }
          return team;
        }),
        isLoading: false,
      });
      
      // Update current team if needed
      const currentTeam = get().currentTeam;
      if (currentTeam && currentTeam.id === teamId) {
        set({
          currentTeam: {
            ...currentTeam,
            members: [...currentTeam.members, user],
          },
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
  
  removeMemberFromTeam: async (teamId, userId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({
        teams: get().teams.map(team => {
          if (team.id === teamId) {
            return {
              ...team,
              members: team.members.filter((member) => member.id !== userId),
            };
          }
          return team;
        }),
        isLoading: false,
      });
      
      // Update current team if needed
      const currentTeam = get().currentTeam;
      if (currentTeam && currentTeam.id === teamId) {
        set({
          currentTeam: {
            ...currentTeam,
            members: currentTeam.members.filter((member) => member.id !== userId),
          },
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
}));

export default useTeamStore;