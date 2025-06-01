import { Message } from '@/types';

export const mockMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Create an AI agent that can analyze customer support tickets and categorize them by priority and department.',
    timestamp: Date.now() - 5000,
    tokens: 25,
    cost: 0.002
  },
  {
    id: '2',
    role: 'assistant',
    content: "I'll help you create that agent. Let's configure the following components:\n\n• Natural language processing for ticket analysis\n• Classification system for priority levels\n• Department routing based on content",
    timestamp: Date.now() - 4000,
    tokens: 35,
    cost: 0.003
  },
  {
    id: '3',
    role: 'user',
    content: 'Great! I need it to integrate with our Zendesk account.',
    timestamp: Date.now() - 3000,
    tokens: 15,
    cost: 0.001
  }
];