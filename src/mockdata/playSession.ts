import { Session } from '@/types';

export const mockSessions: Session[] = [
  {
    id: '1',
    name: 'Customer Support Analysis',
    lastModified: '2 hours ago',
    messageCount: 24,
    description: 'AI agents team analyzing customer support tickets and categorizing them',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Marketing Content Generation',
    lastModified: '5 hours ago',
    messageCount: 15,
    description: 'Team generating marketing content for social media campaign',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Data Analysis Session',
    lastModified: 'yesterday',
    messageCount: 32,
    description: 'AI agents analyzing sales data and generating insights',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    name: 'Code Review Discussion',
    lastModified: '2 days ago',
    messageCount: 45,
    description: 'Team reviewing and suggesting improvements for codebase',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
  }
];