import { Role, RoleFeatures } from '@/types';

export const AGENT_GROUPS = {
  MARKETING: 'marketing',
  HR: 'hr',
  IT: 'it_services',
  OPERATIONS: 'operations',
  FINANCE: 'finance',
  CUSTOMER_SERVICE: 'customer_service',
} as const;

export const ROLES: Record<Role, RoleFeatures> = {
  business: {
    name: 'Business User',
    features: {
      voiceInput: true,
      settings: false,
      analytics: false,
      modelManagement: false,
      teamManagement: true,
    },
    dashboardItems: ['createTeam', 'modifyTeam'],
    agentGroups: [AGENT_GROUPS.MARKETING, AGENT_GROUPS.CUSTOMER_SERVICE]
  },
  engineer: {
    name: 'AI Engineer',
    features: {
      voiceInput: false,
      settings: false,
      analytics: true,
      modelManagement: true,
      teamManagement: true,
    },
    dashboardItems: ['createTeam', 'modifyTeam', 'analytics'],
    agentGroups: [AGENT_GROUPS.IT, AGENT_GROUPS.OPERATIONS]
  },
  architect: {
    name: 'AI Architect',
    features: {
      voiceInput: false,
      settings: false,
      analytics: true,
      modelManagement: true,
      teamManagement: true,
    },
    dashboardItems: ['createTeam', 'modifyTeam', 'analytics', 'modelManagement'],
    agentGroups: Object.values(AGENT_GROUPS)
  },
  admin: {
    name: 'Administrator',
    features: {
      voiceInput: false,
      settings: true,
      analytics: true,
      modelManagement: true,
      teamManagement: true,
    },
    dashboardItems: ['createTeam', 'modifyTeam', 'analytics', 'modelManagement', 'settings'],
    agentGroups: Object.values(AGENT_GROUPS)
  }
};

export const GROUP_DESCRIPTIONS = {
  [AGENT_GROUPS.MARKETING]: 'AI agents for marketing automation and analytics',
  [AGENT_GROUPS.HR]: 'HR process automation and employee assistance',
  [AGENT_GROUPS.IT]: 'IT support and system maintenance automation',
  [AGENT_GROUPS.OPERATIONS]: 'Operations and workflow automation',
  [AGENT_GROUPS.FINANCE]: 'Financial analysis and reporting automation',
  [AGENT_GROUPS.CUSTOMER_SERVICE]: 'Customer support and service automation',
};