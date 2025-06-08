// src/mockdata/industryFunctionGallery.ts

interface UseCaseTemplate {
  id: string;
  title: string;
  description: string;
  industries: string[]; // <- Now supports multiple industries!
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
          model_client: { model_name: string };
          system_message?: string;
          tools?: Array<{ provider: string; config: { name: string } }>;
        };
      }>;
      tools?: Array<{ name: string; provider: string; config: Record<string, any> }>;
      termination_condition: any;
    };
  };
  usage: number;
  rating: number;
  createdBy: string;
  lastUpdated: string;
}

export const industryFunctionGallery: UseCaseTemplate[] = [
  // BANKING
  {
    id: 'banking_customer_support_ai',
    title: 'Banking Customer Support AI',
    description: 'AI agents for handling banking customer queries, fraud reporting, and issue resolution.',
    industries: ['banking_financing', 'insurance_services'],
    functionAreas: ['Customer Service & Support'],
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    tags: ['#banking', '#customer-support', '#fraud-detection'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Banking AI Support Team",
      label: "Bank Support AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Handles general banking queries",
            label: "Banking Assistant",
            config: {
              name: "banking_assistant",
              model_client: { model_name: "gpt-4" },
              system_message: "Assist customers with banking inquiries.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "query_handler" } }
              ]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Fraud detection support",
            label: "Fraud Specialist",
            config: {
              name: "fraud_specialist",
              model_client: { model_name: "claude-3-sonnet" },
              system_message: "Detect and report fraudulent transactions.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "fraud_detector" } }
              ]
            }
          }
        ],
        tools: [
          { name: "Banking Core API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Fraud Detection API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Customer 360 API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Session ends after ticket is closed." }
      }
    },
    usage: 1200,
    rating: 4.8,
    createdBy: 'Banking Customer Experience Team',
    lastUpdated: '2025-06-05'
  },

  // HEALTHCARE
  {
    id: 'healthcare_appointment_scheduling',
    title: 'Healthcare Appointment Scheduling Assistant',
    description: 'AI agents automate appointment scheduling and patient triage.',
    industries: ['healthcare_public_sector'],
    functionAreas: ['Customer Service & Support', 'Ops & Process Engineering'],
    difficulty: 'beginner',
    estimatedTime: '20 minutes',
    tags: ['#healthcare', '#patient-care', '#scheduling'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "AI team for patient appointment management",
      label: "Healthcare Scheduler",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Handles patient appointments",
            label: "Appointment Bot",
            config: {
              name: "appointment_bot",
              model_client: { model_name: "gemini-1.5-pro" },
              system_message: "Manage appointment scheduling.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "schedule_appointment" } }
              ]
            }
          }
        ],
        tools: [
          { name: "Hospital EHR API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Patient CRM API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Session ends after appointment confirmation." }
      }
    },
    usage: 700,
    rating: 4.5,
    createdBy: 'Healthcare Ops Team',
    lastUpdated: '2025-06-05'
  },

  // RETAIL
  {
    id: 'retail_sales_recommendation',
    title: 'Retail Sales Recommendation AI',
    description: 'AI agents recommend personalized products based on user preferences and history.',
    industries: ['retail_ecommerce', 'consumer_goods_manufacturing'],
    functionAreas: ['Sales & Revenue Growth', 'Marketing & Brand Mgmt.'],
    difficulty: 'intermediate',
    estimatedTime: '35 minutes',
    tags: ['#retail', '#sales', '#recommendation'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Retail recommendation AI team",
      label: "Sales Recommender",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Generates personalized product suggestions",
            label: "Product Recommender",
            config: {
              name: "product_recommender",
              model_client: { model_name: "gpt-4" },
              system_message: "Provide personalized product recommendations.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "recommend_products" } }
              ]
            }
          }
        ],
        tools: [
          { name: "E-commerce API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Product Inventory API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Recommendation Engine API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Session ends after recommendation is delivered." }
      }
    },
    usage: 1500,
    rating: 4.9,
    createdBy: 'Retail Sales Team',
    lastUpdated: '2025-06-05'
  },

  // TELECOMMUNICATIONS
  {
    id: 'telecom_network_ops',
    title: 'Telecom Network Operations Optimizer',
    description: 'Optimize telecom network performance with AI agents.',
    industries: ['telecommunications_technology'],
    functionAreas: ['Ops & Process Engineering', 'IT & Data'],
    difficulty: 'advanced',
    estimatedTime: '60 minutes',
    tags: ['#telecom', '#network-optimization', '#ops'],
    isPopular: false,
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Optimize telecom network operations",
      label: "Telecom Network Ops AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Monitor network performance",
            label: "Network Monitor",
            config: {
              name: "network_monitor",
              model_client: { model_name: "claude-3-sonnet" },
              system_message: "Monitor and optimize network traffic.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "network_traffic_analysis" } }
              ]
            }
          }
        ],
        tools: [
          { name: "Network Monitoring API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Performance Analytics API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Session ends after performance report generation." }
      }
    },
    usage: 500,
    rating: 4.7,
    createdBy: 'Telecom Ops Team',
    lastUpdated: '2025-06-05'
  },
  
  // UTILITIES
  {
    id: 'utilities_grid_optimizer',
    title: 'Utilities Smart Grid Optimization',
    description: 'Optimize energy grid performance using AI agents.',
    industries: ['utilities'],
    functionAreas: ['Ops & Process Engineering', 'Environmental & Safety'],
    difficulty: 'advanced',
    estimatedTime: '50 minutes',
    tags: ['#utilities', '#grid-optimization', '#energy'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "AI agents to optimize energy grids",
      label: "Smart Grid Optimizer",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Optimize load distribution",
            label: "Load Optimizer",
            config: {
              name: "load_optimizer",
              model_client: { model_name: "gpt-4" },
              system_message: "Optimize grid load balancing.",
              tools: [
                { provider: "autogen_core.tools.FunctionTool", config: { name: "optimize_load_distribution" } }
              ]
            }
          }
        ],
        tools: [
          { name: "Smart Meter API", provider: "autogen_core.tools.ExternalAPI", config: {} },
          { name: "Grid Analytics API", provider: "autogen_core.tools.ExternalAPI", config: {} }
        ],
        termination_condition: { description: "Optimization report generated." }
      }
    },
    usage: 300,
    rating: 4.5,
    createdBy: 'Utility Grid Ops Team',
    lastUpdated: '2025-06-05'
  },

  //Consumer Goods & Manufacturing — Supply Chain Optimization
  {
  id: 'consumer_goods_supply_chain_optimization',
  title: 'Supply Chain Forecasting & Optimization AI',
  description: 'AI agents for predictive inventory management and supplier risk analysis.',
  industries: ['consumer_goods_manufacturing', 'retail_ecommerce'],
  functionAreas: ['Procurement & Supply Chain', 'Ops & Process Engineering'],
  difficulty: 'advanced',
  estimatedTime: '55 minutes',
  tags: ['#supply-chain', '#forecasting', '#inventory-management'],
  isPopular: true,
  autogenStructure: {
    provider: "autogen_agentchat.teams.RoundRobinGroupChat",
    component_type: "team",
    version: 1,
    component_version: 1,
    description: "Supply chain optimization with AI",
    label: "Supply Chain AI",
    config: {
      participants: [
        {
          provider: "autogen_agentchat.agents.AssistantAgent",
          component_type: "agent",
          version: 1,
          component_version: 1,
          description: "Forecast inventory demand",
          label: "Demand Forecaster",
          config: {
            name: "demand_forecaster",
            model_client: { model_name: "gpt-4" },
            system_message: "Forecast product demand based on historical sales.",
            tools: [
              { provider: "autogen_core.tools.FunctionTool", config: { name: "demand_forecasting" } }
            ]
          }
        },
        {
          provider: "autogen_agentchat.agents.AssistantAgent",
          component_type: "agent",
          version: 1,
          component_version: 1,
          description: "Supplier risk evaluation",
          label: "Risk Evaluator",
          config: {
            name: "risk_evaluator",
            model_client: { model_name: "claude-3-sonnet" },
            system_message: "Assess supplier risks based on reliability data.",
            tools: [
              { provider: "autogen_core.tools.FunctionTool", config: { name: "supplier_risk_assessment" } }
            ]
          }
        }
      ],
      tools: [
        { name: "Inventory Management API", provider: "autogen_core.tools.ExternalAPI", config: {} },
        { name: "Supply Chain Risk API", provider: "autogen_core.tools.ExternalAPI", config: {} },
        { name: "Logistics Optimization API", provider: "autogen_core.tools.ExternalAPI", config: {} }
      ],
      termination_condition: { description: "Session ends after optimized supply chain plan delivered." }
    }
  },
  usage: 900,
  rating: 4.7,
  createdBy: 'Supply Chain Analytics Team',
  lastUpdated: '2025-06-06'
},

  //🛢️ Energy, Oil & Gas — Well Monitoring
{
  id: 'energy_oilgas_well_monitoring',
  title: 'Well Monitoring & Production Optimization AI',
  description: 'AI agents continuously monitor well performance and optimize extraction processes.',
  industries: ['energy_oil_gas', 'utilities'],
  functionAreas: ['Asset Management', 'Environmental & Safety'],
  difficulty: 'advanced',
  estimatedTime: '60 minutes',
  tags: ['#well-monitoring', '#oilgas', '#optimization'],
  isPopular: true,
  autogenStructure: {
    provider: "autogen_agentchat.teams.SelectorGroupChat",
    component_type: "team",
    version: 1,
    component_version: 1,
    description: "Oil & Gas well performance optimization",
    label: "Well Optimization AI",
    config: {
      participants: [
        {
          provider: "autogen_agentchat.agents.AssistantAgent",
          component_type: "agent",
          version: 1,
          component_version: 1,
          description: "Monitors well pressure and flow",
          label: "Well Monitor",
          config: {
            name: "well_monitor",
            model_client: { model_name: "gemini-1.5-pro" },
            system_message: "Continuously monitor well parameters like pressure and flow.",
            tools: [
              { provider: "autogen_core.tools.FunctionTool", config: { name: "well_data_reader" } }
            ]
          }
        },
        {
          provider: "autogen_agentchat.agents.AssistantAgent",
          component_type: "agent",
          version: 1,
          component_version: 1,
          description: "Optimize extraction based on well conditions",
          label: "Production Optimizer",
          config: {
            name: "production_optimizer",
            model_client: { model_name: "gpt-4" },
            system_message: "Optimize oil extraction rate based on real-time data.",
            tools: [
              { provider: "autogen_core.tools.FunctionTool", config: { name: "extraction_optimizer" } }
            ]
          }
        }
      ],
      tools: [
        { name: "Well Sensor API", provider: "autogen_core.tools.ExternalAPI", config: {} },
        { name: "Oil Production Monitoring API", provider: "autogen_core.tools.ExternalAPI", config: {} },
        { name: "Reservoir Simulation API", provider: "autogen_core.tools.ExternalAPI", config: {} }
      ],
      termination_condition: { description: "Terminate after daily production report generation." }
    }
  },
  usage: 750,
  rating: 4.8,
  createdBy: 'Well Operations Team',
  lastUpdated: '2025-06-06'
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