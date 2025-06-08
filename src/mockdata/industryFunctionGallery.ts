// src/mockdata/industryFunctionGallery.ts

interface UseCaseTemplate {
  id: string;
  title: string;
  description: string;
  industry: string;
  functionAreas: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  isPopular?: boolean;
  autogenStructure: {
    provider: string;
    component_type: string;
    version: number;
    component_version: number;
    description: string;
    label: string;
    config: {
      participants: Array<{
        provider: string;
        component_type: string;
        version: number;
        component_version: number;
        description: string;
        label: string;
        config: {
          name: string;
          model_client?: any;
          tools?: any[];
          model_context?: any;
          description?: string;
          system_message?: string;
          model_client_stream?: boolean;
          reflect_on_tool_use?: boolean;
          tool_call_summary_format?: string;
        };
      }>;
      model_client?: any;
      termination_condition: any;
    };
  };
  usage: number;
  rating: number;
  createdBy: string;
  lastUpdated: string;
}

export const industryFunctionGallery: UseCaseTemplate[] = [
  // 1. General Industry Services - Strategy & Innovation
  {
    id: 'general_strategy_innovation',
    title: 'Corporate Strategy Brainstorming Assistant',
    description: 'Multi-agent system that helps executives brainstorm, evaluate, and refine corporate strategies based on market data and trends.',
    industry: 'general_industry_services',
    functionAreas: ['strategy_innovation'],
    difficulty: 'intermediate',
    estimatedTime: '45 minutes',
    tags: ['strategy', 'innovation', 'market analysis'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Assist corporate strategy development with AI",
      label: "Strategy Assistant",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Analyzes market trends and competitive landscape.",
            label: "Market Analyst",
            config: {
              name: "market_analyst",
              system_message: "Analyze market trends and identify strategic opportunities.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "analyze_market_data" } }]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Synthesizes strategic options and evaluates feasibility.",
            label: "Strategy Synthesizer",
            config: {
              name: "strategy_synthesizer",
              system_message: "Generate and evaluate strategic options for business growth.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "generate_strategy_options" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after strategy recommendations are generated." }
      }
    },
    usage: 500,
    rating: 4.7,
    createdBy: 'General Strategy Team',
    lastUpdated: '2025-06-01'
  },

  // 2. Banking & Financing - Risk & Compliance
  {
    id: 'banking_risk_compliance',
    title: 'Automated Risk & Compliance Monitoring',
    description: 'AI agents that monitor financial transactions for compliance breaches and assess risk exposure in real-time.',
    industry: 'banking_financing',
    functionAreas: ['risk_compliance'],
    difficulty: 'advanced',
    estimatedTime: '60 minutes',
    tags: ['risk monitoring', 'compliance', 'fraud detection'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Monitor financial risks and ensure regulatory compliance",
      label: "Risk Compliance AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Scans transactions for risk indicators.",
            label: "Transaction Monitor",
            config: {
              name: "transaction_monitor",
              system_message: "Analyze transactions to detect risk and compliance breaches.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "monitor_transactions" } }]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Assesses compliance status.",
            label: "Compliance Officer AI",
            config: {
              name: "compliance_officer_ai",
              system_message: "Review flagged transactions and assess compliance with regulations.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "assess_compliance" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after risk report generation." }
      }
    },
    usage: 800,
    rating: 4.8,
    createdBy: 'Banking Compliance Team',
    lastUpdated: '2025-06-01'
  },

  // 3. Healthcare & Public Sector - Customer Service
  {
    id: 'healthcare_customer_service',
    title: 'AI Healthcare Customer Support Assistant',
    description: 'An AI assistant team that handles patient queries, appointment scheduling, and routing complex inquiries to human agents.',
    industry: 'healthcare_public_sector',
    functionAreas: ['customer_service'],
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    tags: ['customer service', 'patient support', 'healthcare assistant'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "AI team for healthcare customer support",
      label: "Healthcare Support AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Handles patient appointment scheduling.",
            label: "Appointment Scheduler",
            config: {
              name: "appointment_scheduler",
              system_message: "Help patients schedule, reschedule, and cancel appointments.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "schedule_appointment" } }]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Routes complex queries to human support.",
            label: "Support Router",
            config: {
              name: "support_router",
              system_message: "Route complex patient inquiries to human agents.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "route_support_ticket" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after ticket is closed." }
      }
    },
    usage: 600,
    rating: 4.6,
    createdBy: 'Healthcare Customer Experience Team',
    lastUpdated: '2025-06-01'
  },

  // More entries here...
];

const filterUseCases = (options?: {
  industry?: string;
  functionAreas?: string[];
  searchTerm?: string;
}): UseCaseTemplate[] => {
  const { industry, functionAreas, searchTerm } = options || {};
  let filteredCases = [...industryFunctionGallery];

  if (searchTerm) {
    const lowercasedTerm = searchTerm.toLowerCase();
    filteredCases = filteredCases.filter((useCase) => {
      const inTitle = useCase.title.toLowerCase().includes(lowercasedTerm);
      const inDescription = useCase.description.toLowerCase().includes(lowercasedTerm);
      const inTags = useCase.tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm));
      return inTitle || inDescription || inTags;
    });
  }

  if (industry) {
    filteredCases = filteredCases.filter(
      (useCase) => useCase.industry === industry
    );
  }

  if (functionAreas && functionAreas.length > 0) {
    filteredCases = filteredCases.filter((useCase) =>
      useCase.functionAreas.some((area) => functionAreas.includes(area))
    );
  }

  return filteredCases;
};

const getPopularUseCases = (): UseCaseTemplate[] => {
  return industryFunctionGallery
    .filter((useCase) => useCase.isPopular)
    .sort((a, b) => b.usage - a.usage);
};