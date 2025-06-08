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
          model_client: {
            model_name: string;
          };
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
    tags: ['#strategy', '#innovation', '#market-analysis'],
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
              model_client: { model_name: "gpt-4" },
              system_message: "Analyze market trends and competitive landscape.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "market_trend_analyzer" } }
              ]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "SWOT Strategy Generator",
            label: "Strategy Synthesizer",
            config: {
              name: "strategy_synthesizer",
              model_client: { model_name: "claude-3-sonnet" },
              system_message: "Generate strategic SWOT options.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "swot_analysis" } }
              ]
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
    tags: ['#risk-monitoring', '#compliance', '#fraud-detection'],
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
              model_client: { model_name: "claude-3-sonnet" },
              system_message: "Check financial transactions for risks and compliance.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "risk_evaluation" } }
              ]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Fraud Detection",
            label: "Fraud Detector",
            config: {
              name: "fraud_detector",
              model_client: { model_name: "gpt-4-turbo" },
              system_message: "Detect fraudulent transactions using pattern analysis.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "fraud_detection" } }
              ]
            }
          }
        ],
        tools: [
          { name: "Workday API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "SAP DWC Integration", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Salesforce Compliance API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Terminate after compliance and fraud checks are complete." }
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
    tags: ['#patient-support', '#healthcare', '#customer-service'],
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
              model_client: { model_name: "gemini-1.5-pro" },
              system_message: "Help schedule patient appointments.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "appointment_scheduler" } }
              ]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Medical Query Handler",
            label: "Query Handler",
            config: {
              name: "query_handler",
              model_client: { model_name: "gpt-4" },
              system_message: "Handle patient inquiries and FAQs.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "patient_query_responder" } }
              ]
            }
          }
        ],
        tools: [
          { name: "360 Customer API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Workday API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Electronic Health Record API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Terminate after patient issues are resolved." }
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
    description: 'Create targeted marketing campaigns based on customer behavior.',
    industry: 'retail_ecommerce',
    functionAreas: ['Marketing & Brand Mgmt.'],
    difficulty: 'beginner',
    estimatedTime: '20 minutes',
    tags: ['#marketing', '#personalization', '#customer-engagement'],
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
              model_client: { model_name: "gpt-4-turbo" },
              system_message: "Generate personalized marketing content.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "generate_campaign_content" } }
              ]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Audience Segmenter",
            label: "Audience Segmenter",
            config: {
              name: "audience_segmenter",
              model_client: { model_name: "claude-3-sonnet" },
              system_message: "Segment audience for better targeting.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "customer_segmentation" } }
              ]
            }
          }
        ],
        tools: [
          { name: "Campaign API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "360 Customer API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Facebook Ads API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Terminate after marketing plan execution." }
      }
    },
    usage: 400,
    rating: 4.9,
    createdBy: 'Retail Marketing Team',
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