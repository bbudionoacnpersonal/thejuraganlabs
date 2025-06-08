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
          system_message?: string;
          tools?: Array<{
            provider: string;
            config: { name: string };
          }>;
        };
      }>;
      tools?: Array<{
        name: string;
        provider: string;
        config: Record<string, any>;
      }>;
      termination_condition: any;
    };
  };
  usage: number;
  rating: number;
  createdBy: string;
  lastUpdated: string;
}

export const industryFunctionGallery: UseCaseTemplate[] = [
  // 1. General Industry Services
  {
    id: 'general_strategy_innovation',
    title: 'Corporate Strategy Brainstorming Assistant',
    description: 'AI system to brainstorm, evaluate, and refine corporate strategies.',
    industry: 'general_industry_services',
    functionAreas: ['Innovation and R&D'],
    difficulty: 'intermediate',
    estimatedTime: '45 minutes',
    tags: ['strategy', 'innovation', 'market analysis'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Corporate strategy development with AI",
      label: "Strategy Assistant",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Market analysis expert",
            label: "Market Analyst",
            config: {
              name: "market_analyst",
              system_message: "Analyze market trends.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "analyze_market_data" } }]
            }
          }
        ],
        tools: [
          { name: "SAP DWC Integration", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "360 Customer API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Terminate after strategy options are generated." }
      }
    },
    usage: 500,
    rating: 4.7,
    createdBy: 'Corporate Strategy Team',
    lastUpdated: '2025-06-01'
  },

  // 2. Banking & Financing
  {
    id: 'banking_risk_compliance',
    title: 'Automated Risk & Compliance Monitor',
    description: 'Monitor financial transactions for compliance breaches.',
    industry: 'banking_financing',
    functionAreas: ['Legal, Risk, & Policy'],
    difficulty: 'advanced',
    estimatedTime: '60 minutes',
    tags: ['risk monitoring', 'compliance', 'fraud detection'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Financial compliance monitoring",
      label: "Risk Compliance AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Compliance checker",
            label: "Compliance Checker",
            config: {
              name: "compliance_checker",
              system_message: "Check financial transactions for risks.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "check_compliance" } }]
            }
          }
        ],
        tools: [
          { name: "Workday API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "SAP DWC Integration", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Terminate after compliance report is generated." }
      }
    },
    usage: 800,
    rating: 4.8,
    createdBy: 'Banking Compliance Team',
    lastUpdated: '2025-06-01'
  },

  // 3. Healthcare & Public Sector
  {
    id: 'healthcare_patient_support',
    title: 'Healthcare AI Patient Support',
    description: 'Handle patient queries, scheduling, and routing complex cases.',
    industry: 'healthcare_public_sector',
    functionAreas: ['Customer Service & Support'],
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    tags: ['customer service', 'healthcare', 'support'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Healthcare customer service AI",
      label: "Patient Support AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Schedules patient appointments",
            label: "Scheduler",
            config: {
              name: "scheduler",
              system_message: "Help schedule patient appointments.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "schedule_appointment" } }]
            }
          }
        ],
        tools: [
          { name: "360 Customer API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Workday API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Terminate after scheduling is completed." }
      }
    },
    usage: 600,
    rating: 4.6,
    createdBy: 'Healthcare Support Team',
    lastUpdated: '2025-06-01'
  },

  // 4. Retail & E-commerce
  {
    id: 'retail_personalized_marketing',
    title: 'Retail Personalized Marketing AI',
    description: 'Target marketing campaigns based on customer behavior.',
    industry: 'retail_ecommerce',
    functionAreas: ['Marketing & Brand Mgmt.'],
    difficulty: 'beginner',
    estimatedTime: '20 minutes',
    tags: ['marketing', 'personalization', 'customer engagement'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "AI personalized marketing campaigns",
      label: "Marketing AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Generates campaign content",
            label: "Content Generator",
            config: {
              name: "content_generator",
              system_message: "Generate personalized marketing content.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "generate_content" } }]
            }
          }
        ],
        tools: [
          { name: "Campaign API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "360 Customer API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Terminate after campaign creation." }
      }
    },
    usage: 400,
    rating: 4.9,
    createdBy: 'Retail Marketing Team',
    lastUpdated: '2025-06-01'
  },

  // 5. Telecommunications & Technology
  {
    id: 'telecom_network_analysis',
    title: 'Telecom Network Traffic Analyzer',
    description: 'Analyze and optimize telecom network traffic.',
    industry: 'telecommunications_technology',
    functionAreas: ['Ops & Process Engineering'],
    difficulty: 'advanced',
    estimatedTime: '75 minutes',
    tags: ['network', 'telecom', 'optimization'],
    isPopular: false,
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Optimize network traffic flows",
      label: "Network Analyzer",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Analyze traffic patterns",
            label: "Traffic Analyzer",
            config: {
              name: "traffic_analyzer",
              system_message: "Optimize network traffic.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "optimize_traffic" } }]
            }
          }
        ],
        tools: [
          { name: "Tiktok Video API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Campaign API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Terminate after optimization plan is complete." }
      }
    },
    usage: 300,
    rating: 4.5,
    createdBy: 'Telecom Network Team',
    lastUpdated: '2025-06-01'
  }
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