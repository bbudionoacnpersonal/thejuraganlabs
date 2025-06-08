// src/mockdata/industryFunctionGallery.ts

export interface UseCaseTemplate {
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

const industryFunctionGallery: UseCaseTemplate[] = [
  // 1. General Industry Services
  {
    id: 'general_innovation_rnd',
    title: 'Innovation Research Assistant',
    description: 'AI-driven research assistant that accelerates R&D activities across general industries, providing insights from the latest publications and patents.',
    industry: 'general_industry_services',
    functionAreas: ['innovation_rnd'],
    difficulty: 'intermediate',
    estimatedTime: '45 minutes',
    tags: ['innovation', 'research', 'patent analysis'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Support R&D teams with AI research insights",
      label: "Innovation Assistant",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Analyzes research trends.",
            label: "Research Analyst",
            config: {
              name: "research_analyst",
              system_message: "Analyze recent publications and patents in the given domain.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "fetch_latest_research" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after research summary is generated." }
      }
    },
    usage: 500,
    rating: 4.7,
    createdBy: 'General R&D Team',
    lastUpdated: '2025-06-01'
  },

  // 2. Banking & Financing
  {
    id: 'banking_finance_analysis',
    title: 'Financial Analysis Bot',
    description: 'A multi-agent system that assists analysts in building financial models and automating report generation.',
    industry: 'banking_financing',
    functionAreas: ['finance_analysis'],
    difficulty: 'advanced',
    estimatedTime: '60 minutes',
    tags: ['financial modeling', 'report generation', 'finance automation'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "AI-powered financial analysis assistant",
      label: "Finance Analysis AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Builds and validates financial models.",
            label: "Financial Modeler",
            config: {
              name: "financial_modeler",
              system_message: "Build financial projections and validate assumptions based on inputs.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "build_financial_model" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after financial model is completed." }
      }
    },
    usage: 1200,
    rating: 4.8,
    createdBy: 'Banking Analysts Group',
    lastUpdated: '2025-06-01'
  },

  // 3. Healthcare & Public Sector
  {
    id: 'healthcare_customer_support',
    title: 'Healthcare Customer Support AI',
    description: 'AI agent for handling healthcare service inquiries, appointment bookings, and escalations.',
    industry: 'healthcare_public_sector',
    functionAreas: ['customer_service_support'],
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    tags: ['healthcare support', 'customer service', 'AI chatbot'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Healthcare AI support agent",
      label: "Healthcare CS Assistant",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Handles patient queries.",
            label: "Patient Assistant",
            config: {
              name: "patient_assistant",
              system_message: "Assist patients with inquiries, bookings, and general information.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "manage_patient_query" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after successful resolution or escalation." }
      }
    },
    usage: 700,
    rating: 4.6,
    createdBy: 'Healthcare Experience Team',
    lastUpdated: '2025-06-01'
  },

  // 4. Retail & E-commerce
  {
    id: 'retail_sales_growth',
    title: 'Sales Growth Optimizer for Retail',
    description: 'AI system to identify and optimize growth opportunities across retail product lines.',
    industry: 'retail_ecommerce',
    functionAreas: ['sales_revenue_growth'],
    difficulty: 'advanced',
    estimatedTime: '50 minutes',
    tags: ['sales optimization', 'growth hacking', 'retail AI'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.HybridGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "AI-driven sales growth assistant for e-commerce.",
      label: "Sales Growth AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Suggests revenue growth strategies.",
            label: "Growth Strategist",
            config: {
              name: "growth_strategist",
              system_message: "Identify growth opportunities based on product sales trends.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "analyze_sales_trends" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after delivering growth plan recommendations." }
      }
    },
    usage: 950,
    rating: 4.5,
    createdBy: 'Retail Growth Team',
    lastUpdated: '2025-06-01'
  },

  // 5. Consumer Goods & Manufacturing
  {
    id: 'consumer_marketing_ai',
    title: 'Marketing Optimization for Consumer Goods',
    description: 'AI agents to optimize brand marketing campaigns and measure impact.',
    industry: 'consumer_goods_manufacturing',
    functionAreas: ['marketing_brand_management'],
    difficulty: 'intermediate',
    estimatedTime: '40 minutes',
    tags: ['marketing optimization', 'brand campaigns', 'consumer analytics'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "AI assistants for consumer goods marketing teams",
      label: "Consumer Marketing AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Optimizes brand marketing strategies.",
            label: "Brand Optimizer",
            config: {
              name: "brand_optimizer",
              system_message: "Evaluate and optimize brand marketing campaign performance.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "optimize_campaign" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after delivering optimized campaign strategies." }
      }
    },
    usage: 650,
    rating: 4.6,
    createdBy: 'Consumer Goods Marketing Team',
    lastUpdated: '2025-06-01'
  },

  // 6. Telecommunications & Technology
  {
    id: 'telecom_customer_support_ai',
    title: 'Telecom Customer Support Assistant',
    description: 'AI solution for telecom companies to manage customer support tickets efficiently and improve response times.',
    industry: 'telecommunications_technology',
    functionAreas: ['customer_service_support'],
    difficulty: 'beginner',
    estimatedTime: '30 minutes',
    tags: ['customer support', 'ticket management', 'telecom'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.HybridGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Customer support ticketing AI for telecom companies",
      label: "Telecom Support Bot",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "First-line ticket responder.",
            label: "Ticket Assistant",
            config: {
              name: "ticket_assistant",
              system_message: "Assist with resolving customer support tickets quickly.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "resolve_ticket" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after ticket resolution or escalation." }
      }
    },
    usage: 1050,
    rating: 4.7,
    createdBy: 'Telecom Service Ops Team',
    lastUpdated: '2025-06-01'
  },

  // 7. Utilities
  {
    id: 'utilities_asset_management_ai',
    title: 'Asset Management Optimization for Utilities',
    description: 'Optimizing utility company assets with predictive maintenance AI agents.',
    industry: 'utilities',
    functionAreas: ['asset_management'],
    difficulty: 'advanced',
    estimatedTime: '55 minutes',
    tags: ['asset management', 'predictive maintenance', 'utilities'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "AI agents for predictive asset management in utilities",
      label: "Utilities Asset AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Predicts asset maintenance needs.",
            label: "Maintenance Predictor",
            config: {
              name: "maintenance_predictor",
              system_message: "Predict and optimize maintenance schedules for assets.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "predict_maintenance" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after maintenance plan is generated." }
      }
    },
    usage: 480,
    rating: 4.5,
    createdBy: 'Utilities Asset Team',
    lastUpdated: '2025-06-01'
  },

  // 8. Energy, Oil & Gas
  {
    id: 'energy_ops_engineering',
    title: 'Operational Engineering Assistant for Energy',
    description: 'AI system that helps engineering teams in energy companies streamline operations and monitor efficiency.',
    industry: 'energy_oil_gas',
    functionAreas: ['ops_process_engineering'],
    difficulty: 'intermediate',
    estimatedTime: '50 minutes',
    tags: ['operations', 'engineering optimization', 'energy'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Operations optimization AI for energy sector",
      label: "Ops Engineering Bot",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Optimizes process engineering tasks.",
            label: "Process Engineer",
            config: {
              name: "process_engineer",
              system_message: "Analyze and optimize operations and processes in energy plants.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "optimize_operations" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after optimization plan delivery." }
      }
    },
    usage: 520,
    rating: 4.7,
    createdBy: 'Energy Ops Team',
    lastUpdated: '2025-06-01'
  },

  // 9. Petrochemical & Chemical Processing
  {
    id: 'petrochemical_procurement_ai',
    title: 'Procurement Optimization Assistant for Petrochemical',
    description: 'AI agents optimize procurement strategies and supplier negotiations for petrochemical companies.',
    industry: 'petrochemical_chemical_processing',
    functionAreas: ['procurement_supply_chain'],
    difficulty: 'advanced',
    estimatedTime: '60 minutes',
    tags: ['procurement', 'supplier optimization', 'petrochemical'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.HybridGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Procurement optimization AI for chemical processing industry",
      label: "Procurement AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Optimizes supplier selection and negotiations.",
            label: "Procurement Specialist",
            config: {
              name: "procurement_specialist",
              system_message: "Analyze supplier data and optimize procurement decisions.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "optimize_procurement" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate after procurement strategy is finalized." }
      }
    },
    usage: 400,
    rating: 4.5,
    createdBy: 'Petrochemical Procurement Team',
    lastUpdated: '2025-06-01'
  },
];

