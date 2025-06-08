// src/mockdata/industryFunctionGallery.ts

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
  isPopular?: boolean; // Added to identify popular use cases
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
    isPopular: true,
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
            description: "Monitors transaction patterns and detects anomalies.",
            label: "Transaction Monitor",
            config: {
              name: "transaction_monitor",
              system_message: "You are a fraud detection specialist. Monitor transactions and identify suspicious patterns based on user behavior, transaction amounts, and timing.",
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Analyzes transaction patterns for fraud indicators",
                  label: "FraudAnalyzer",
                  config: { name: "analyze_transaction" }
                }
              ]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Assesses risk levels and makes blocking decisions.",
            label: "Risk Assessor",
            config: {
              name: "risk_assessor",
              system_message: "You are a risk assessment expert. Evaluate fraud indicators and determine appropriate actions including transaction blocking or flagging for review.",
              tools: [
                {
                  provider: "autogen_core.tools.FunctionTool",
                  component_type: "tool",
                  version: 1,
                  component_version: 1,
                  description: "Calculates risk score based on multiple factors",
                  label: "RiskCalculator",
                  config: { name: "calculate_risk_score" }
                }
              ]
            }
          }
        ],
        termination_condition: { description: "Terminate after processing a transaction." },
      },
    },
    usage: 1250,
    rating: 4.8,
    createdBy: 'Banking Security Team',
    lastUpdated: '2024-01-15',
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
    isPopular: true,
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
                    description: "Routes customer inquiries to appropriate specialists.",
                    label: "Support Coordinator",
                    config: {
                        name: "support_coordinator",
                        system_message: "You are a customer support coordinator. Analyze customer inquiries and route them to the most appropriate specialist agent.",
                        tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "classify_inquiry" }, label: "InquiryClassifier" }]
                    }
                },
                {
                    provider: "autogen_agentchat.agents.AssistantAgent",
                    component_type: "agent",
                    version: 1,
                    component_version: 1,
                    description: "Handles order-related inquiries and issues.",
                    label: "Order Specialist",
                    config: {
                        name: "order_specialist",
                        system_message: "You are an order specialist. Help customers with order tracking, modifications, and delivery issues.",
                        tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "get_order_status" }, label: "OrderTracker" }]
                    }
                }
            ],
            termination_condition: { description: "Terminate when issue is resolved." },
        },
    },
    usage: 890,
    rating: 4.6,
    createdBy: 'Retail Excellence Team',
    lastUpdated: '2024-01-12',
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
    isPopular: false,
    autogenStructure: {
        provider: "autogen_agentchat.teams.RoundRobinGroupChat", // UPDATED from HierarchicalGroupChat
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
                    description: "Monitors production line and detects quality issues.",
                    label: "Quality Inspector",
                    config: {
                        name: "quality_inspector",
                        system_message: "You are a quality control inspector. Monitor production data and identify quality issues or deviations from standards.",
                        tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "analyze_sensor_data" }, label: "SensorAnalyzer" }]
                    }
                },
                {
                    provider: "autogen_agentchat.agents.AssistantAgent",
                    component_type: "agent",
                    version: 1,
                    component_version: 1,
                    description: "Optimizes production processes based on quality data.",
                    label: "Process Optimizer",
                    config: {
                        name: "process_optimizer",
                        system_message: "You are a process optimization expert. Analyze quality data and recommend parameter adjustments to improve production quality.",
                        tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "optimize_parameters" }, label: "ParameterOptimizer" }]
                    }
                }
            ],
            termination_condition: { description: "Terminate after a quality check cycle." },
        },
    },
    usage: 567,
    rating: 4.7,
    createdBy: 'Manufacturing Excellence Team',
    lastUpdated: '2024-01-10',
  },

  // Healthcare Use Cases
  {
    id: 'healthcare_patient_triage',
    title: 'Intelligent Patient Triage System',
    description: 'AI agents that assess patient symptoms, prioritize cases, and route patients to appropriate care providers.',
    industry: 'healthcare',
    functionAreas: ['operations', 'risk', 'customer_service'],
    difficulty: 'advanced',
    estimatedTime: '50 minutes',
    tags: ['patient triage', 'symptom assessment', 'care routing', 'HIPAA compliant'],
    isPopular: true,
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
                    description: "Assesses patient symptoms and determines urgency.",
                    label: "Triage Nurse AI",
                    config: {
                        name: "triage_nurse_ai",
                        system_message: "You are a triage nurse. Assess patient symptoms, review medical history, and determine appropriate care priority and routing.",
                        tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "assess_symptoms" }, label: "SymptomAssessor" }]
                    }
                },
                {
                    provider: "autogen_agentchat.agents.AssistantAgent",
                    component_type: "agent",
                    version: 1,
                    component_version: 1,
                    description: "Connects to Electronic Health Records.",
                    label: "EHR Connector",
                    config: {
                        name: "ehr_connector",
                        system_message: "You are an EHR system interface. Provide patient history when requested securely.",
                        tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "get_patient_history" }, label: "EHRConnector" }]
                    }
                }
            ],
            termination_condition: { description: "Terminate when patient is routed." },
        },
    },
    usage: 423,
    rating: 4.9,
    createdBy: 'Healthcare Innovation Team',
    lastUpdated: '2024-01-08',
  },

  // Technology Use Cases
  {
    id: 'tech_code_review',
    title: 'Automated Code Review System',
    description: 'AI agents that perform comprehensive code reviews for quality, security vulnerabilities, and adherence to best practices.',
    industry: 'technology',
    functionAreas: ['innovation', 'risk'],
    difficulty: 'intermediate',
    estimatedTime: '35 minutes',
    tags: ['code review', 'security analysis', 'best practices', 'automation', 'devops'],
    isPopular: false,
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
                    description: "Reviews code for best practices and quality.",
                    label: "Code Reviewer",
                    config: {
                        name: "code_reviewer",
                        system_message: "You are a senior code reviewer. Analyze code for quality, and best practices. Provide constructive feedback.",
                        tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "analyze_code" }, label: "CodeAnalyzer" }]
                    }
                },
                {
                    provider: "autogen_agentchat.agents.AssistantAgent",
                    component_type: "agent",
                    version: 1,
                    component_version: 1,
                    description: "Scans code for security vulnerabilities.",
                    label: "Security Scanner",
                    config: {
                        name: "security_scanner",
                        system_message: "You are a security expert. Scan the code for any potential vulnerabilities or security flaws.",
                        tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "scan_security" }, label: "SecurityScanner" }]
                    }
                }
            ],
            termination_condition: { description: "Terminate when review is complete." },
        },
    },
    usage: 756,
    rating: 4.5,
    createdBy: 'Engineering Excellence Team',
    lastUpdated: '2024-01-14',
  },
  
  // NEW: Telecommunications Use Case
  {
    id: 'telecom_network_resolution',
    title: 'Network Fault Resolution Team',
    description: 'An AI team that proactively monitors network health, diagnoses faults, and automates the initial steps of the resolution process.',
    industry: 'telecommunications',
    functionAreas: ['operations', 'customer_service'],
    difficulty: 'intermediate',
    estimatedTime: '40 minutes',
    tags: ['network monitoring', 'fault detection', 'automation', 'telecom'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.SelectorGroupChat", // Changed to a supported type
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "A team to monitor and resolve network faults.",
      label: "Network Operations AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Monitors network traffic and device status for anomalies.",
            label: "Network Monitor",
            config: {
              name: "network_monitor",
              system_message: "Constantly analyze network telemetry data to detect anomalies, packet loss, or device failures.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "detect_network_anomaly" } }]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Diagnoses the root cause of a fault and suggests resolution steps.",
            label: "Fault Diagnostician",
            config: {
              name: "fault_diagnostician",
              system_message: "Given an anomaly, perform diagnostic checks to find the root cause and create a service ticket.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "create_service_ticket" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate once a ticket is created or the fault is marked as a false positive." }
      }
    },
    usage: 610,
    rating: 4.7,
    createdBy: 'Telecom Ops Team',
    lastUpdated: '2024-02-20'
  },

  // NEW: Energy, Oil & Gas Use Case
  {
    id: 'energy_predictive_maintenance',
    title: 'Predictive Maintenance for Drilling Rigs',
    description: 'This agent team analyzes sensor data from drilling equipment to predict potential failures and schedule maintenance proactively, reducing downtime.',
    industry: 'energy_oil_gas',
    functionAreas: ['operations', 'risk'],
    difficulty: 'advanced',
    estimatedTime: '75 minutes',
    tags: ['predictive maintenance', 'iot', 'risk management', 'oil & gas'],
    isPopular: false,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "A team for predictive maintenance of oil and gas equipment.",
      label: "Predictive Maintenance AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Analyzes real-time sensor data from equipment.",
            label: "Sensor Data Analyst",
            config: {
              name: "sensor_data_analyst",
              system_message: "Analyze vibration, temperature, and pressure data to detect patterns indicative of future equipment failure.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "analyze_equipment_health" } }]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Schedules maintenance tasks based on failure predictions.",
            label: "Maintenance Scheduler",
            config: {
              name: "maintenance_scheduler",
              system_message: "Based on the predicted failure timeframe, schedule maintenance with the operations team to minimize disruption.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "schedule_maintenance_window" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate once maintenance is scheduled." }
      }
    },
    usage: 350,
    rating: 4.9,
    createdBy: 'Energy Operations',
    lastUpdated: '2024-03-01'
  },

  // NEW: Education & Training Use Case
  {
    id: 'education_learning_planner',
    title: 'Personalized Student Learning Plan Generator',
    description: 'An AI team that assesses a student\'s knowledge gaps and learning style to generate a customized curriculum and study plan.',
    industry: 'education_training',
    functionAreas: ['innovation', 'operations'],
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    tags: ['edutech', 'personalized learning', 'curriculum', 'student assessment'],
    isPopular: true,
    autogenStructure: {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat", // UPDATED from HierarchicalGroupChat
      component_type: "team",
      version: 1,
      component_version: 1,
      description: "A team to create personalized learning plans for students.",
      label: "Personalized Learning AI",
      config: {
        participants: [
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Assesses student's current knowledge and learning style.",
            label: "Student Assessor",
            config: {
              name: "student_assessor",
              system_message: "Analyze student's quiz results and past performance to identify strengths and weaknesses.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "assess_student_performance" } }]
            }
          },
          {
            provider: "autogen_agentchat.agents.AssistantAgent",
            component_type: "agent",
            version: 1,
            component_version: 1,
            description: "Generates a custom curriculum based on the assessment.",
            label: "Curriculum Planner",
            config: {
              name: "curriculum_planner",
              system_message: "Based on the student's profile, generate a week-by-week learning plan with relevant modules and resources.",
              tools: [{ provider: "autogen_core.tools.FunctionTool", config: { name: "generate_learning_modules" } }]
            }
          }
        ],
        termination_condition: { description: "Terminate once the learning plan is generated and confirmed." }
      }
    },
    usage: 950,
    rating: 4.8,
    createdBy: 'EduTech Innovations',
    lastUpdated: '2024-02-15'
  }
];

/**
 * Filters the use case gallery based on optional criteria.
 * @param options - An object containing optional 'industry', 'functionAreas', and 'searchTerm' to filter by.
 * @returns An array of filtered UseCaseTemplate objects.
 */
export const filterUseCases = (options?: {
  industry?: string;
  functionAreas?: string[];
  searchTerm?: string;
}): UseCaseTemplate[] => {
  const { industry, functionAreas, searchTerm } = options || {};
  let filteredCases = [...industryFunctionGallery];

  // 1. Filter by search term if provided
  if (searchTerm) {
    const lowercasedTerm = searchTerm.toLowerCase();
    filteredCases = filteredCases.filter((useCase) => {
      const inTitle = useCase.title.toLowerCase().includes(lowercasedTerm);
      const inDescription = useCase.description.toLowerCase().includes(lowercasedTerm);
      const inTags = useCase.tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm));
      return inTitle || inDescription || inTags;
    });
  }

  // 2. Filter by industry if a valid industry is provided
  if (industry) {
    filteredCases = filteredCases.filter(
      (useCase) => useCase.industry === industry
    );
  }

  // 3. Filter by function areas if a valid array is provided
  if (functionAreas && functionAreas.length > 0) {
    filteredCases = filteredCases.filter((useCase) =>
      // Keep the use case if at least one of its function areas is in the filter list
      useCase.functionAreas.some((area) => functionAreas.includes(area))
    );
  }

  return filteredCases;
};


/**
 * Gets the most popular use cases, sorted by usage.
 * @returns An array of popular UseCaseTemplate objects.
 */
export const getPopularUseCases = (): UseCaseTemplate[] => {
  return industryFunctionGallery
    .filter((useCase) => useCase.isPopular)
    .sort((a, b) => b.usage - a.usage);
};