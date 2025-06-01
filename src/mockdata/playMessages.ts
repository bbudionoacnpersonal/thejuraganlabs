import { Message } from '@/types';

export const generateVersionResponse = (prompt: string, version: string, startTime: number) => {
  if (version === 'v1.1.0') {
    return {
      steps: [
        {
          agent: 'Planner Agent',
          agent_type: 'AssistantAgent',
          version: 1,
          content: 'Analyzing customer query and planning response strategy...',
          tokens: 120,
          duration: 600,
          timestamp: startTime + 300,
          llmDetails: {
            model: 'gpt-4o-mini',
            promptTokens: 85,
            completionTokens: 35,
            totalTokens: 120,
            duration: 450,
            call_id: 'call_abc123',
            system_message: 'You are a helpful assistant that analyzes customer queries.',
            user_message: 'Please analyze this customer query and determine priority.',
            response: 'The query has been analyzed and categorized as high priority.'
          },
          toolCalls: [
            {
              name: 'ticket_priority',
              version: 1,
              input: { description: 'Customer reports urgent system outage' },
              code: 'priorityAnalyzer.analyze(description)',
              output: 'high',
              duration: 150
            }
          ]
        },
        {
          agent: 'Executor Agent',
          type: 'AssistantAgent',
          version: 1,
          content: 'Executing planned response with ticket categorization...',
          tokens: 180,
          duration: 800,
          timestamp: startTime + 900,
          llmDetails: {
            model: 'gpt-4-nano',
            promptTokens: 120,
            completionTokens: 60,
            totalTokens: 180,
            duration: 600,
            call_id: 'call_def456',
            system_message: 'You are an executor agent that processes tickets.',
            user_message: 'Process this high priority ticket.',
            response: 'Ticket has been processed and routed to urgent queue.'
          },
          toolCalls: [
            {
              name: 'send_response',
              version: 1,
              input: { ticket_id: 'T123', response: 'Urgent ticket created for system outage' },
              code: 'ticketSystem.createTicket(ticket_id, response)',
              output: true,
              duration: 200
            }
          ]
        }
      ],
      finalResponse: {
        content: `[Latest Version] Support ticket processed: "${prompt}"\nPriority: High\nDepartment: Technical Support`,
        tokens: 350,
        duration: 500,
        timestamp: startTime + 2200
      }
    };
  } else if (version === 'v1.0.0') {
    return {
      steps: [
        {
          agent: 'Planner Agent',
          type: 'AssistantAgent',
          version: 1,
          content: 'Basic ticket analysis in progress...',
          tokens: 100,
          duration: 700,
          timestamp: startTime + 400,
          llmDetails: {
            model: 'gpt-4o-mini',
            promptTokens: 65,
            completionTokens: 35,
            totalTokens: 100,
            duration: 500,
            call_id: 'call_ghi789',
            system_message: 'You are a ticket analysis assistant.',
            user_message: 'Analyze this support ticket.',
            response: 'Ticket analysis complete, medium priority detected.'
          },
          toolCalls: [
            {
              name: 'ticket_priority',
              version: 1,
              input: { description: 'Standard support request' },
              code: 'analyzer.checkPriority(description)',
              output: 'medium',
              duration: 200
            }
          ]
        },
        {
          agent: 'Executor Agent',
          type: 'AssistantAgent',
          version: 1,
          content: 'Applying standard response template...',
          tokens: 150,
          duration: 900,
          timestamp: startTime + 1100,
          llmDetails: {
            model: 'gpt-4-nano',
            promptTokens: 90,
            completionTokens: 60,
            totalTokens: 150,
            duration: 700,
            call_id: 'call_jkl012',
            system_message: 'You are a ticket processor.',
            user_message: 'Process this medium priority ticket.',
            response: 'Standard ticket processing complete.'
          },
          toolCalls: [
            {
              name: 'send_response',
              version: 1,
              input: { ticket_id: 'T124', response: 'Support ticket created' },
              code: 'ticketSystem.create(ticket_id, response)',
              output: true,
              duration: 200
            }
          ]
        }
      ],
      finalResponse: {
        content: `[Previous Version] Ticket categorized: "${prompt}"\nPriority: Medium\nDepartment: General Support`,
        tokens: 250,
        duration: 600,
        timestamp: startTime + 1700
      }
    };
  } else {
    return {
      steps: [
        {
          agent: 'Planner Agent',
          type: 'AssistantAgent',
          version: 1,
          content: 'Simple ticket routing...',
          tokens: 80,
          duration: 500,
          timestamp: startTime + 300,
          llmDetails: {
            model: 'gpt-4o-mini',
            promptTokens: 50,
            completionTokens: 30,
            totalTokens: 80,
            duration: 400,
            call_id: 'call_mno345',
            system_message: 'You are a basic ticket router.',
            user_message: 'Route this ticket.',
            response: 'Ticket routed to general queue.'
          },
          toolCalls: [
            {
              name: 'ticket_priority',
              version: 1,
              input: { description: 'Basic inquiry' },
              code: 'router.assignQueue(description)',
              output: 'low',
              duration: 100
            }
          ]
        }
      ],
      finalResponse: {
        content: `[Legacy Version] Basic routing: "${prompt}"\nAssigned to general queue`,
        tokens: 150,
        duration: 400,
        timestamp: startTime + 700
      }
    };
  }
};

export const mockVersions = [
  { value: 'v1.1.0', label: 'Version 1.1.0' },
  { value: 'v1.0.0', label: 'Version 1.0.0' },
  { value: 'v0.9.0', label: 'Version 0.9.0' }
];

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