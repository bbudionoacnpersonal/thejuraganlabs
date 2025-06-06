import { industries, focusAreas } from './industry_functions';

// Pre-built AI agents that can be leveraged by other users
export const prebuiltAgents = [
  {
    id: 'cs_ticket_analyzer',
    name: 'Customer Ticket Analyzer',
    description: 'Analyzes customer support tickets and categorizes them by priority and department',
    agentType: 'assistant',
    industry: 'retail',
    focusAreas: ['customer_service', 'operations'],
    modelClient: {
      provider: 'openai',
      model: 'gpt-4',
      modelContext: {
        type: 'UnboundedChatCompletionContext',
        config: {}
      },
      systemMessage: 'You are a specialized customer support ticket analyzer. Analyze tickets for priority, sentiment, and route to appropriate departments.',
    },
    streaming: true,
    reflectOnTools: true,
    tools: [
      {
        name: 'ticket_analyzer',
        description: 'Analyzes ticket content and metadata',
        config: {
          priority_levels: ['low', 'medium', 'high', 'urgent'],
          departments: ['technical', 'billing', 'general']
        }
      },
      {
        name: 'zendesk_connector',
        description: 'Connects to Zendesk API',
        config: {
          actions: ['read', 'update', 'create']
        }
      }
    ],
    shareableTo: ['all'],
    createdBy: 'AI Support Team',
    usage: 245,
    rating: 4.8
  },
  {
    id: 'marketing_content_creator',
    name: 'Mark. Content Generator',
    description: 'Creates marketing content based on brand guidelines and campaign objectives',
    agentType: 'assistant',
    industry: 'retail',
    focusAreas: ['marketing', 'digital'],
    modelClient: {
      provider: 'anthropic',
      model: 'claude-3',
      modelContext: {
        type: 'MarketingContext',
        config: {
          tone: 'professional',
          style: 'engaging'
        }
      },
      systemMessage: 'You are a marketing content specialist. Create compelling content that aligns with brand voice and campaign goals.',
    },
    streaming: true,
    reflectOnTools: true,
    tools: [
      {
        name: 'brand_guidelines',
        description: 'Access brand guidelines and assets',
        config: {
          elements: ['tone', 'colors', 'logos']
        }
      },
      {
        name: 'content_optimizer',
        description: 'Optimizes content for different platforms',
        config: {
          platforms: ['social', 'email', 'web']
        }
      }
    ],
    shareableTo: ['marketing', 'creative'],
    createdBy: 'Marketing Excellence Team',
    usage: 189,
    rating: 4.6
  },
  {
    id: 'procurement_analyst',
    name: 'Proc. Analysis Agent',
    description: 'Analyzes procurement data and suggests optimization strategies',
    agentType: 'userproxy',
    industry: 'manufacturing',
    focusAreas: ['operations', 'finance'],
    modelClient: {
      provider: 'openai',
      model: 'gpt-4',
      modelContext: {
        type: 'ProcurementContext',
        config: {
          regions: ['APAC', 'EMEA', 'NA'],
          categories: ['direct', 'indirect']
        }
      },
      systemMessage: 'You are a procurement analysis expert. Analyze spending patterns and suggest cost optimization strategies.',
    },
    streaming: false,
    reflectOnTools: true,
    tools: [
      {
        name: 'spend_analyzer',
        description: 'Analyzes procurement spend data',
        config: {
          metrics: ['volume', 'frequency', 'supplier']
        }
      },
      {
        name: 'supplier_evaluator',
        description: 'Evaluates supplier performance',
        config: {
          criteria: ['cost', 'quality', 'delivery']
        }
      }
    ],
    shareableTo: ['supplychain and proc'],
    createdBy: 'Procurement Excellence Team',
    usage: 156,
    rating: 4.7
  },
  {
    id: 'code_reviewer',
    name: 'Code Reviewer',
    description: 'Reviews code for best practices, security issues, and optimization opportunities',
    agentType: 'code_interpreter',
    industry: 'technology',
    focusAreas: ['innovation', 'risk'],
    modelClient: {
      provider: 'openai',
      model: 'gpt-4',
      modelContext: {
        type: 'CodeAnalysisContext',
        config: {
          languages: ['python', 'javascript', 'java']
        }
      },
      systemMessage: 'You are a code review expert. Analyze code for quality, security, and performance issues.',
    },
    streaming: true,
    reflectOnTools: true,
    tools: [
      {
        name: 'static_analyzer',
        description: 'Performs static code analysis',
        config: {
          rules: ['security', 'performance', 'style']
        }
      },
      {
        name: 'dependency_checker',
        description: 'Checks dependencies for vulnerabilities',
        config: {
          sources: ['npm', 'pypi', 'maven']
        }
      }
    ],
    shareableTo: ['tech'],
    createdBy: 'Engineering Excellence Team',
    usage: 312,
    rating: 4.9
  },
  {
    id: 'talent_evaluator',
    name: 'Talent Asses. Agent',
    description: 'Evaluates candidate profiles and assists in recruitment process',
    agentType: 'assistant',
    industry: 'consulting',
    focusAreas: ['hr', 'operations'],
    modelClient: {
      provider: 'anthropic',
      model: 'claude-3',
      modelContext: {
        type: 'RecruitmentContext',
        config: {
          assessment_types: ['technical', 'behavioral', 'cultural']
        }
      },
      systemMessage: 'You are a talent assessment specialist. Evaluate candidates based on defined criteria and company values.',
    },
    streaming: true,
    reflectOnTools: false,
    tools: [
      {
        name: 'resume_analyzer',
        description: 'Analyzes resumes and extracts key information',
        config: {
          fields: ['experience', 'skills', 'education']
        }
      },
      {
        name: 'interview_assistant',
        description: 'Generates interview questions and evaluates responses',
        config: {
          question_types: ['technical', 'behavioral']
        }
      }
    ],
    shareableTo: ['talent and organization'],
    createdBy: 'HR Excellence Team',
    usage: 178,
    rating: 4.5
  },
  {
    id: 'financial_analyst',
    name: 'Fin. Analysis Agent',
    description: 'Analyzes financial data and generates insights and reports',
    agentType: 'assistant',
    industry: 'finance',
    focusAreas: ['finance', 'risk', 'data'],
    modelClient: {
      provider: 'openai',
      model: 'gpt-4',
      modelContext: {
        type: 'FinancialContext',
        config: {
          metrics: ['revenue', 'costs', 'margins']
        }
      },
      systemMessage: 'You are a financial analysis expert. Analyze financial data and provide actionable insights.',
    },
    streaming: false,
    reflectOnTools: true,
    tools: [
      {
        name: 'financial_calculator',
        description: 'Performs financial calculations and analysis',
        config: {
          calculations: ['roi', 'npv', 'irr']
        }
      },
      {
        name: 'report_generator',
        description: 'Generates financial reports and visualizations',
        config: {
          formats: ['pdf', 'excel', 'powerpoint']
        }
      }
    ],
    shareableTo: ['cfo and enterprise values'],
    createdBy: 'Finance Excellence Team',
    usage: 234,
    rating: 4.8
  },
  {
    id: 'sap_dwc_extractor',
    name: 'SAP DWC Extractor',
    description: 'Extracts and processes data from SAP Data Warehouse Cloud',
    agentType: 'assistant',
    industry: 'manufacturing',
    focusAreas: ['data', 'operations'],
    modelClient: {
      provider: 'openai',
      model: 'gpt-4',
      modelContext: {
        type: 'DWCContext',
        config: {
          spaces: ['finance', 'sales', 'inventory'],
          dataLayers: ['semantic', 'acquisition']
        }
      },
      systemMessage: 'You are a SAP DWC data extraction specialist. Extract and transform data according to business requirements.',
    },
    streaming: true,
    reflectOnTools: true,
    tools: [
      {
        name: 'dwc_connector',
        description: 'Connects to SAP DWC and executes queries',
        config: {
          operations: ['read', 'write', 'transform'],
          authentication: ['oauth', 'basic']
        }
      },
      {
        name: 'data_validator',
        description: 'Validates extracted data against business rules',
        config: {
          validationTypes: ['format', 'completeness', 'consistency']
        }
      },
      {
        name: 'data_transformer',
        description: 'Transforms data into required formats',
        config: {
          formats: ['csv', 'json', 'parquet']
        }
      }
    ],
    shareableTo: ['tech', 'cfo and enterprise values'],
    createdBy: 'Data Excellence Team',
    usage: 167,
    rating: 4.7
  },
  {
    id: 'web_researcher',
    name: 'Web Researcher',
    description: 'Conducts comprehensive web research and synthesizes findings',
    agentType: 'assistant',
    industry: 'consulting',
    focusAreas: ['innovation', 'data'],
    modelClient: {
      provider: 'anthropic',
      model: 'claude-3',
      modelContext: {
        type: 'WebResearchContext',
        config: {
          searchDepth: 'comprehensive',
          credibilityCheck: true
        }
      },
      systemMessage: 'You are a web research specialist. Gather, analyze, and synthesize information from reliable web sources.',
    },
    streaming: true,
    reflectOnTools: true,
    tools: [
      {
        name: 'web_searcher',
        description: 'Performs advanced web searches',
        config: {
          engines: ['google', 'bing', 'scholar'],
          filters: ['date', 'language', 'region']
        }
      },
      {
        name: 'content_extractor',
        description: 'Extracts and processes web content',
        config: {
          contentTypes: ['text', 'tables', 'lists'],
          cleaning: ['ads', 'navigation', 'footers']
        }
      },
      {
        name: 'source_validator',
        description: 'Validates source credibility',
        config: {
          criteria: ['authority', 'currency', 'relevance']
        }
      }
    ],
    shareableTo: ['all'],
    createdBy: 'Research Excellence Team',
    usage: 289,
    rating: 4.8
  }
];

// Export types for TypeScript support
export interface PrebuiltAgent {
  id: string;
  name: string;
  description: string;
  agentType: 'assistant' | 'userproxy' | 'code_interpreter';
  industry: string;
  focusAreas: string[];
  modelClient: {
    provider: string;
    model: string;
    modelContext: {
      type: string;
      config: Record<string, unknown>;
    };
    systemMessage: string;
  };
  streaming: boolean;
  reflectOnTools: boolean;
  tools: Array<{
    name: string;
    description: string;
    config: Record<string, unknown>;
  }>;
  shareableTo: string[];
  createdBy: string;
  usage: number;
  rating: number;
}

// Department types for TypeScript
export type Department = 
  | 'all'
  | 'marketing'
  | 'sales'
  | 'supplychain and proc'
  | 'tech'
  | 'creative'
  | 'talent and organization'
  | 'cfo and enterprise values';