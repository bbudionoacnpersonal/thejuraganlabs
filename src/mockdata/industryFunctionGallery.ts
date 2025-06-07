// Industry Function Gallery - Use cases grouped by industry and functions with Autogen JSON format
export interface UseCaseTemplate {
  id: string;
  title: string;
  description: string;
  industry: string;
  functionAreas: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
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
  // Banking & Finance Use Cases
  {
    id: 'banking_fraud_detection',
    title: 'Real-time Fraud Detection System',
    description: 'AI agents team that monitors transactions in real-time, detects suspicious patterns, and automatically flags potential fraud cases for review.',
    industry: 'banking',
    functionAreas: ['risk', 'finance'],
    difficulty: 'advanced',
    estimatedTime: '45 minutes',
    tags: ['fraud detection', 'real-time monitoring', 'risk assessment', 'compliance'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Real-time fraud detection and prevention system",
      label: "Fraud Detection Team",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Monitors transaction patterns and detects anomalies",
            label: "Transaction Monitor",
            config: {
              name: "transaction_monitor",
              model_client: {
                provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
                component_type: "model",
                version: 1,
                component_version: 1,
                description: "Chat completion client for OpenAI hosted models.",
                label: "OpenAIChatCompletionClient",
                config: { model: "gpt-4o-mini" }
              },
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Analyzes transaction patterns for fraud indicators",
                  label: "FraudAnalyzer",
                  config: {
                    source_code: "def analyze_transaction(transaction_data: dict, user_profile: dict) -> dict",
                    name: "analyze_transaction",
                    description: "Analyzes transaction for fraud indicators",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                },
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Connects to banking core system",
                  label: "BankingConnector",
                  config: {
                    source_code: "def get_account_history(account_id: str, days: int) -> list",
                    name: "get_account_history",
                    description: "Retrieves account transaction history",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                }
              ],
              system_message: "You are a fraud detection specialist. Monitor transactions and identify suspicious patterns based on user behavior, transaction amounts, and timing.",
              model_client_stream: false,
              reflect_on_tool_use: true,
              tool_call_summary_format: "{result}"
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Assesses risk levels and makes blocking decisions",
            label: "Risk Assessor",
            config: {
              name: "risk_assessor",
              model_client: {
                provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
                component_type: "model",
                version: 1,
                component_version: 1,
                description: "Chat completion client for OpenAI hosted models.",
                label: "OpenAIChatCompletionClient",
                config: { model: "gpt-4o-mini" }
              },
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Calculates risk score based on multiple factors",
                  label: "RiskCalculator",
                  config: {
                    source_code: "def calculate_risk_score(transaction: dict, fraud_indicators: list) -> float",
                    name: "calculate_risk_score",
                    description: "Calculates comprehensive risk score",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                }
              ],
              system_message: "You are a risk assessment expert. Evaluate fraud indicators and determine appropriate actions including transaction blocking or flagging for review.",
              model_client_stream: false,
              reflect_on_tool_use: true,
              tool_call_summary_format: "{result}"
            }
          }
        ],
        model_client: {
          provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
          component_type: "model",
          version: 1,
          component_version: 1,
          description: "Chat completion client for OpenAI hosted models.",
          label: "OpenAIChatCompletionClient",
          config: { model: "gpt-4o-mini" }
        },
        termination_condition: {
          provider: "autogen_agentchat.conditions.MaxMessageTermination",
          component_type: "termination",
          version: 1,
          component_version: 1,
          description: "Terminate after processing transaction",
          label: "MaxMessageTermination",
          config: { max_messages: 5, include_agent_event: false }
        }
      }
    },
    usage: 1250,
    rating: 4.8,
    createdBy: "Banking Security Team",
    lastUpdated: "2024-01-15"
  },

  // Retail Use Cases
  {
    id: 'retail_customer_service',
    title: 'Intelligent Customer Support Hub',
    description: 'Multi-agent system that handles customer inquiries, processes returns, and escalates complex issues to human agents.',
    industry: 'retail',
    functionAreas: ['customer_service', 'operations'],
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    tags: ['customer support', 'ticket routing', 'automated responses', 'escalation'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Intelligent customer support system with specialized agents",
      label: "Customer Support Hub",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Routes customer inquiries to appropriate specialists",
            label: "Support Coordinator",
            config: {
              name: "support_coordinator",
              model_client: {
                provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
                component_type: "model",
                version: 1,
                component_version: 1,
                description: "Chat completion client for OpenAI hosted models.",
                label: "OpenAIChatCompletionClient",
                config: { model: "gpt-4o-mini" }
              },
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Categorizes customer inquiries by type and urgency",
                  label: "InquiryClassifier",
                  config: {
                    source_code: "def classify_inquiry(message: str, customer_data: dict) -> dict",
                    name: "classify_inquiry",
                    description: "Classifies customer inquiry type and priority",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                },
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Connects to Zendesk for ticket management",
                  label: "ZendeskConnector",
                  config: {
                    source_code: "def create_ticket(customer_id: str, issue_type: str, description: str) -> str",
                    name: "create_ticket",
                    description: "Creates support ticket in Zendesk",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                }
              ],
              system_message: "You are a customer support coordinator. Analyze customer inquiries and route them to the most appropriate specialist agent.",
              model_client_stream: false,
              reflect_on_tool_use: true,
              tool_call_summary_format: "{result}"
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Handles order-related inquiries and issues",
            label: "Order Specialist",
            config: {
              name: "order_specialist",
              model_client: {
                provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
                component_type: "model",
                version: 1,
                component_version: 1,
                description: "Chat completion client for OpenAI hosted models.",
                label: "OpenAIChatCompletionClient",
                config: { model: "gpt-4o-mini" }
              },
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Retrieves order information and status",
                  label: "OrderTracker",
                  config: {
                    source_code: "def get_order_status(order_id: str) -> dict",
                    name: "get_order_status",
                    description: "Gets current order status and tracking info",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                }
              ],
              system_message: "You are an order specialist. Help customers with order tracking, modifications, and delivery issues.",
              model_client_stream: false,
              reflect_on_tool_use: true,
              tool_call_summary_format: "{result}"
            }
          }
        ],
        model_client: {
          provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
          component_type: "model",
          version: 1,
          component_version: 1,
          description: "Chat completion client for OpenAI hosted models.",
          label: "OpenAIChatCompletionClient",
          config: { model: "gpt-4o-mini" }
        },
        termination_condition: {
          provider: "autogen_agentchat.conditions.TextMentionTermination",
          component_type: "termination",
          version: 1,
          component_version: 1,
          description: "Terminate when issue is resolved",
          label: "TextMentionTermination",
          config: { text: "RESOLVED" }
        }
      }
    },
    usage: 890,
    rating: 4.6,
    createdBy: "Retail Excellence Team",
    lastUpdated: "2024-01-12"
  },

  // Manufacturing Use Cases
  {
    id: 'manufacturing_quality_control',
    title: 'Automated Quality Control System',
    description: 'AI agents that monitor production quality, detect defects, and optimize manufacturing processes in real-time.',
    industry: 'manufacturing',
    functionAreas: ['operations', 'risk'],
    difficulty: 'advanced',
    estimatedTime: '60 minutes',
    tags: ['quality control', 'defect detection', 'process optimization', 'manufacturing'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.HierarchicalGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Automated quality control and process optimization system",
      label: "Quality Control Team",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Monitors production line and detects quality issues",
            label: "Quality Inspector",
            config: {
              name: "quality_inspector",
              model_client: {
                provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
                component_type: "model",
                version: 1,
                component_version: 1,
                description: "Chat completion client for OpenAI hosted models.",
                label: "OpenAIChatCompletionClient",
                config: { model: "gpt-4o-mini" }
              },
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Analyzes sensor data for quality metrics",
                  label: "SensorAnalyzer",
                  config: {
                    source_code: "def analyze_sensor_data(sensor_readings: dict, quality_thresholds: dict) -> dict",
                    name: "analyze_sensor_data",
                    description: "Analyzes production sensor data for quality indicators",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                },
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Connects to manufacturing execution system",
                  label: "MESConnector",
                  config: {
                    source_code: "def get_production_data(line_id: str, time_range: str) -> dict",
                    name: "get_production_data",
                    description: "Retrieves production data from MES",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                }
              ],
              system_message: "You are a quality control inspector. Monitor production data and identify quality issues or deviations from standards.",
              model_client_stream: false,
              reflect_on_tool_use: true,
              tool_call_summary_format: "{result}"
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Optimizes production processes based on quality data",
            label: "Process Optimizer",
            config: {
              name: "process_optimizer",
              model_client: {
                provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
                component_type: "model",
                version: 1,
                component_version: 1,
                description: "Chat completion client for OpenAI hosted models.",
                label: "OpenAIChatCompletionClient",
                config: { model: "gpt-4o-mini" }
              },
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Optimizes production parameters",
                  label: "ParameterOptimizer",
                  config: {
                    source_code: "def optimize_parameters(current_params: dict, quality_data: dict) -> dict",
                    name: "optimize_parameters",
                    description: "Optimizes production parameters for better quality",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                }
              ],
              system_message: "You are a process optimization expert. Analyze quality data and recommend parameter adjustments to improve production quality.",
              model_client_stream: false,
              reflect_on_tool_use: true,
              tool_call_summary_format: "{result}"
            }
          }
        ],
        model_client: {
          provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
          component_type: "model",
          version: 1,
          component_version: 1,
          description: "Chat completion client for OpenAI hosted models.",
          label: "OpenAIChatCompletionClient",
          config: { model: "gpt-4o-mini" }
        },
        termination_condition: {
          provider: "autogen_agentchat.conditions.MaxMessageTermination",
          component_type: "termination",
          version: 1,
          component_version: 1,
          description: "Terminate after quality check cycle",
          label: "MaxMessageTermination",
          config: { max_messages: 8, include_agent_event: false }
        }
      }
    },
    usage: 567,
    rating: 4.7,
    createdBy: "Manufacturing Excellence Team",
    lastUpdated: "2024-01-10"
  },

  // Healthcare Use Cases
  {
    id: 'healthcare_patient_triage',
    title: 'Intelligent Patient Triage System',
    description: 'AI agents that assess patient symptoms, prioritize cases, and route patients to appropriate care providers.',
    industry: 'healthcare',
    functionAreas: ['operations', 'risk'],
    difficulty: 'advanced',
    estimatedTime: '50 minutes',
    tags: ['patient triage', 'symptom assessment', 'care routing', 'HIPAA compliant'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Intelligent patient triage and care routing system",
      label: "Patient Triage Team",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Assesses patient symptoms and determines urgency",
            label: "Triage Nurse",
            config: {
              name: "triage_nurse",
              model_client: {
                provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
                component_type: "model",
                version: 1,
                component_version: 1,
                description: "Chat completion client for OpenAI hosted models.",
                label: "OpenAIChatCompletionClient",
                config: { model: "gpt-4o-mini" }
              },
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Assesses symptom severity and urgency",
                  label: "SymptomAssessor",
                  config: {
                    source_code: "def assess_symptoms(symptoms: list, patient_history: dict) -> dict",
                    name: "assess_symptoms",
                    description: "Assesses patient symptoms for urgency and severity",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                },
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Connects to Electronic Health Records",
                  label: "EHRConnector",
                  config: {
                    source_code: "def get_patient_history(patient_id: str) -> dict",
                    name: "get_patient_history",
                    description: "Retrieves patient medical history from EHR",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                }
              ],
              system_message: "You are a triage nurse. Assess patient symptoms, review medical history, and determine appropriate care priority and routing.",
              model_client_stream: false,
              reflect_on_tool_use: true,
              tool_call_summary_format: "{result}"
            }
          }
        ],
        model_client: {
          provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
          component_type: "model",
          version: 1,
          component_version: 1,
          description: "Chat completion client for OpenAI hosted models.",
          label: "OpenAIChatCompletionClient",
          config: { model: "gpt-4o-mini" }
        },
        termination_condition: {
          provider: "autogen_agentchat.conditions.TextMentionTermination",
          component_type: "termination",
          version: 1,
          component_version: 1,
          description: "Terminate when patient is routed",
          label: "TextMentionTermination",
          config: { text: "ROUTED" }
        }
      }
    },
    usage: 423,
    rating: 4.9,
    createdBy: "Healthcare Innovation Team",
    lastUpdated: "2024-01-08"
  },

  // Technology Use Cases
  {
    id: 'tech_code_review',
    title: 'Automated Code Review System',
    description: 'AI agents that perform comprehensive code reviews, security analysis, and suggest improvements.',
    industry: 'technology',
    functionAreas: ['innovation', 'risk'],
    difficulty: 'intermediate',
    estimatedTime: '35 minutes',
    tags: ['code review', 'security analysis', 'best practices', 'automation'],
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "Automated code review and security analysis system",
      label: "Code Review Team",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Reviews code for best practices and quality",
            label: "Code Reviewer",
            config: {
              name: "code_reviewer",
              model_client: {
                provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
                component_type: "model",
                version: 1,
                component_version: 1,
                description: "Chat completion client for OpenAI hosted models.",
                label: "OpenAIChatCompletionClient",
                config: { model: "gpt-4o-mini" }
              },
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Analyzes code for quality and best practices",
                  label: "CodeAnalyzer",
                  config: {
                    source_code: "def analyze_code(code: str, language: str) -> dict",
                    name: "analyze_code",
                    description: "Analyzes code quality and adherence to best practices",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                },
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Scans code for security vulnerabilities",
                  label: "SecurityScanner",
                  config: {
                    source_code: "def scan_security(code: str, dependencies: list) -> dict",
                    name: "scan_security",
                    description: "Scans code for security vulnerabilities",
                    global_imports: [],
                    has_cancellation_support: false
                  }
                }
              ],
              system_message: "You are a senior code reviewer. Analyze code for quality, security, and best practices. Provide constructive feedback and suggestions.",
              model_client_stream: false,
              reflect_on_tool_use: true,
              tool_call_summary_format: "{result}"
            }
          }
        ],
        model_client: {
          provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
          component_type: "model",
          version: 1,
          component_version: 1,
          description: "Chat completion client for OpenAI hosted models.",
          label: "OpenAIChatCompletionClient",
          config: { model: "gpt-4o-mini" }
        },
        termination_condition: {
          provider: "autogen_agentchat.conditions.TextMentionTermination",
          component_type: "termination",
          version: 1,
          component_version: 1,
          description: "Terminate when review is complete",
          label: "TextMentionTermination",
          config: { text: "REVIEW_COMPLETE" }
        }
      }
    },
    usage: 756,
    rating: 4.5,
    createdBy: "Engineering Excellence Team",
    lastUpdated: "2024-01-14"
  }
];

// Helper functions to filter gallery data
const getUseCasesByIndustry = (industry: string): UseCaseTemplate[] => {
  return industryFunctionGallery.filter(useCase => useCase.industry === industry);
};

const getUseCasesByFunction = (functionArea: string): UseCaseTemplate[] => {
  return industryFunctionGallery.filter(useCase => 
    useCase.functionAreas.includes(functionArea)
  );
};

export const getUseCasesByIndustryAndFunction = (industry: string, functionAreas: string[]): UseCaseTemplate[] => {
  return industryFunctionGallery.filter(useCase => 
    useCase.industry === industry)
  ;
};

export const getPopularUseCases = (limit: number = 5): UseCaseTemplate[] => {
  return industryFunctionGallery
    .sort((a, b) => b.usage - a.usage)
    .slice(0, limit);
};

const getUseCasesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): UseCaseTemplate[] => {
  return industryFunctionGallery.filter(useCase => useCase.difficulty === difficulty);
};