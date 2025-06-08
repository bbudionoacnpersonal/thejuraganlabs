[
  {
    "id": "general_industry_services_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the General Industry Services industry, focused on Sales & Marketing.",
    "industry": "general_industry_services",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "61 minutes",
    "tags": [
      "sales marketing",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 519,
    "rating": 4.7,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the General Industry Services industry, focused on Customer Service.",
    "industry": "general_industry_services",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "advanced",
    "estimatedTime": "40 minutes",
    "tags": [
      "customer service",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 344,
    "rating": 4.7,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the General Industry Services industry, focused on Customer Experience.",
    "industry": "general_industry_services",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "beginner",
    "estimatedTime": "43 minutes",
    "tags": [
      "customer experience",
      "general industry services"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 640,
    "rating": 4.8,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the General Industry Services industry, focused on Field Services.",
    "industry": "general_industry_services",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "advanced",
    "estimatedTime": "32 minutes",
    "tags": [
      "field services",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 719,
    "rating": 4.6,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the General Industry Services industry, focused on Supply Chain & Operations.",
    "industry": "general_industry_services",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "advanced",
    "estimatedTime": "62 minutes",
    "tags": [
      "supply chain operations",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1332,
    "rating": 4.9,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the General Industry Services industry, focused on Research & Development.",
    "industry": "general_industry_services",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "74 minutes",
    "tags": [
      "research development",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1042,
    "rating": 4.8,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the General Industry Services industry, focused on Engineering & Construction.",
    "industry": "general_industry_services",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "advanced",
    "estimatedTime": "65 minutes",
    "tags": [
      "engineering construction",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 835,
    "rating": 4.9,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the General Industry Services industry, focused on Production & Manufacturing.",
    "industry": "general_industry_services",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "67 minutes",
    "tags": [
      "production manufacturing",
      "general industry services"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1287,
    "rating": 4.6,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the General Industry Services industry, focused on Asset Management.",
    "industry": "general_industry_services",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "advanced",
    "estimatedTime": "68 minutes",
    "tags": [
      "asset management",
      "general industry services"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 682,
    "rating": 5.0,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the General Industry Services industry, focused on Quality & Safety.",
    "industry": "general_industry_services",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "advanced",
    "estimatedTime": "63 minutes",
    "tags": [
      "quality safety",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 775,
    "rating": 4.9,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the General Industry Services industry, focused on Environment & Sustainability.",
    "industry": "general_industry_services",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "advanced",
    "estimatedTime": "55 minutes",
    "tags": [
      "environment sustainability",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 451,
    "rating": 4.8,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the General Industry Services industry, focused on Strategy & Innovation.",
    "industry": "general_industry_services",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "38 minutes",
    "tags": [
      "strategy innovation",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1097,
    "rating": 4.8,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the General Industry Services industry, focused on Risk & Compliance.",
    "industry": "general_industry_services",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "beginner",
    "estimatedTime": "60 minutes",
    "tags": [
      "risk compliance",
      "general industry services"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1454,
    "rating": 4.5,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the General Industry Services industry, focused on Finance & Accounting.",
    "industry": "general_industry_services",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "beginner",
    "estimatedTime": "60 minutes",
    "tags": [
      "finance accounting",
      "general industry services"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 777,
    "rating": 4.7,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the General Industry Services industry, focused on Legal & Regulatory.",
    "industry": "general_industry_services",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "advanced",
    "estimatedTime": "50 minutes",
    "tags": [
      "legal regulatory",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 485,
    "rating": 4.6,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the General Industry Services industry, focused on Human Resources.",
    "industry": "general_industry_services",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "advanced",
    "estimatedTime": "39 minutes",
    "tags": [
      "human resources",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1167,
    "rating": 5.0,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the General Industry Services industry, focused on Procurement & Sourcing.",
    "industry": "general_industry_services",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "69 minutes",
    "tags": [
      "procurement sourcing",
      "general industry services"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1324,
    "rating": 4.8,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "general_industry_services_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the General Industry Services industry, focused on Information Technology.",
    "industry": "general_industry_services",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "beginner",
    "estimatedTime": "58 minutes",
    "tags": [
      "information technology",
      "general industry services"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 839,
    "rating": 4.6,
    "createdBy": "General Industry Services AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the Banking Financing industry, focused on Sales & Marketing.",
    "industry": "banking_financing",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "37 minutes",
    "tags": [
      "sales marketing",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 737,
    "rating": 4.7,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the Banking Financing industry, focused on Customer Service.",
    "industry": "banking_financing",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "beginner",
    "estimatedTime": "47 minutes",
    "tags": [
      "customer service",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 614,
    "rating": 4.6,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the Banking Financing industry, focused on Customer Experience.",
    "industry": "banking_financing",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "beginner",
    "estimatedTime": "54 minutes",
    "tags": [
      "customer experience",
      "banking financing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1272,
    "rating": 4.5,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the Banking Financing industry, focused on Field Services.",
    "industry": "banking_financing",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "advanced",
    "estimatedTime": "47 minutes",
    "tags": [
      "field services",
      "banking financing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1031,
    "rating": 4.6,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the Banking Financing industry, focused on Supply Chain & Operations.",
    "industry": "banking_financing",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "advanced",
    "estimatedTime": "33 minutes",
    "tags": [
      "supply chain operations",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 424,
    "rating": 5.0,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the Banking Financing industry, focused on Research & Development.",
    "industry": "banking_financing",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "43 minutes",
    "tags": [
      "research development",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 806,
    "rating": 4.6,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the Banking Financing industry, focused on Engineering & Construction.",
    "industry": "banking_financing",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "advanced",
    "estimatedTime": "46 minutes",
    "tags": [
      "engineering construction",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 907,
    "rating": 4.6,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the Banking Financing industry, focused on Production & Manufacturing.",
    "industry": "banking_financing",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "72 minutes",
    "tags": [
      "production manufacturing",
      "banking financing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 841,
    "rating": 5.0,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the Banking Financing industry, focused on Asset Management.",
    "industry": "banking_financing",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "beginner",
    "estimatedTime": "57 minutes",
    "tags": [
      "asset management",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 705,
    "rating": 4.7,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the Banking Financing industry, focused on Quality & Safety.",
    "industry": "banking_financing",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "47 minutes",
    "tags": [
      "quality safety",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1285,
    "rating": 4.7,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the Banking Financing industry, focused on Environment & Sustainability.",
    "industry": "banking_financing",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "48 minutes",
    "tags": [
      "environment sustainability",
      "banking financing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 807,
    "rating": 4.9,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the Banking Financing industry, focused on Strategy & Innovation.",
    "industry": "banking_financing",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "beginner",
    "estimatedTime": "39 minutes",
    "tags": [
      "strategy innovation",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 982,
    "rating": 4.5,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the Banking Financing industry, focused on Risk & Compliance.",
    "industry": "banking_financing",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "advanced",
    "estimatedTime": "68 minutes",
    "tags": [
      "risk compliance",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1245,
    "rating": 5.0,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the Banking Financing industry, focused on Finance & Accounting.",
    "industry": "banking_financing",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "advanced",
    "estimatedTime": "38 minutes",
    "tags": [
      "finance accounting",
      "banking financing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 371,
    "rating": 4.8,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the Banking Financing industry, focused on Legal & Regulatory.",
    "industry": "banking_financing",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "advanced",
    "estimatedTime": "63 minutes",
    "tags": [
      "legal regulatory",
      "banking financing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 723,
    "rating": 4.6,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the Banking Financing industry, focused on Human Resources.",
    "industry": "banking_financing",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "advanced",
    "estimatedTime": "67 minutes",
    "tags": [
      "human resources",
      "banking financing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 806,
    "rating": 4.6,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the Banking Financing industry, focused on Procurement & Sourcing.",
    "industry": "banking_financing",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "49 minutes",
    "tags": [
      "procurement sourcing",
      "banking financing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 382,
    "rating": 5.0,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "banking_financing_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the Banking Financing industry, focused on Information Technology.",
    "industry": "banking_financing",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "46 minutes",
    "tags": [
      "information technology",
      "banking financing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1324,
    "rating": 4.7,
    "createdBy": "Banking Financing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the Healthcare Public Sector industry, focused on Sales & Marketing.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "66 minutes",
    "tags": [
      "sales marketing",
      "healthcare public sector"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 415,
    "rating": 4.7,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the Healthcare Public Sector industry, focused on Customer Service.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "33 minutes",
    "tags": [
      "customer service",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 407,
    "rating": 4.9,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the Healthcare Public Sector industry, focused on Customer Experience.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "47 minutes",
    "tags": [
      "customer experience",
      "healthcare public sector"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1425,
    "rating": 4.7,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the Healthcare Public Sector industry, focused on Field Services.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "advanced",
    "estimatedTime": "45 minutes",
    "tags": [
      "field services",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 704,
    "rating": 4.9,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the Healthcare Public Sector industry, focused on Supply Chain & Operations.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "45 minutes",
    "tags": [
      "supply chain operations",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1162,
    "rating": 4.6,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the Healthcare Public Sector industry, focused on Research & Development.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "beginner",
    "estimatedTime": "47 minutes",
    "tags": [
      "research development",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 943,
    "rating": 4.6,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the Healthcare Public Sector industry, focused on Engineering & Construction.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "beginner",
    "estimatedTime": "73 minutes",
    "tags": [
      "engineering construction",
      "healthcare public sector"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1445,
    "rating": 4.9,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the Healthcare Public Sector industry, focused on Production & Manufacturing.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "65 minutes",
    "tags": [
      "production manufacturing",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1496,
    "rating": 4.8,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the Healthcare Public Sector industry, focused on Asset Management.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "beginner",
    "estimatedTime": "74 minutes",
    "tags": [
      "asset management",
      "healthcare public sector"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 912,
    "rating": 4.5,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the Healthcare Public Sector industry, focused on Quality & Safety.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "advanced",
    "estimatedTime": "34 minutes",
    "tags": [
      "quality safety",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 421,
    "rating": 4.6,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the Healthcare Public Sector industry, focused on Environment & Sustainability.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "advanced",
    "estimatedTime": "57 minutes",
    "tags": [
      "environment sustainability",
      "healthcare public sector"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1069,
    "rating": 4.6,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the Healthcare Public Sector industry, focused on Strategy & Innovation.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "67 minutes",
    "tags": [
      "strategy innovation",
      "healthcare public sector"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1347,
    "rating": 4.7,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the Healthcare Public Sector industry, focused on Risk & Compliance.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "advanced",
    "estimatedTime": "64 minutes",
    "tags": [
      "risk compliance",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 937,
    "rating": 4.7,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the Healthcare Public Sector industry, focused on Finance & Accounting.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "advanced",
    "estimatedTime": "74 minutes",
    "tags": [
      "finance accounting",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 763,
    "rating": 4.7,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the Healthcare Public Sector industry, focused on Legal & Regulatory.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "advanced",
    "estimatedTime": "42 minutes",
    "tags": [
      "legal regulatory",
      "healthcare public sector"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 956,
    "rating": 4.6,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the Healthcare Public Sector industry, focused on Human Resources.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "advanced",
    "estimatedTime": "35 minutes",
    "tags": [
      "human resources",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1325,
    "rating": 4.9,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the Healthcare Public Sector industry, focused on Procurement & Sourcing.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "73 minutes",
    "tags": [
      "procurement sourcing",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1130,
    "rating": 4.9,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "healthcare_public_sector_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the Healthcare Public Sector industry, focused on Information Technology.",
    "industry": "healthcare_public_sector",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "advanced",
    "estimatedTime": "43 minutes",
    "tags": [
      "information technology",
      "healthcare public sector"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 568,
    "rating": 4.6,
    "createdBy": "Healthcare Public Sector AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the Retail Ecommerce industry, focused on Sales & Marketing.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "31 minutes",
    "tags": [
      "sales marketing",
      "retail ecommerce"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 825,
    "rating": 4.6,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the Retail Ecommerce industry, focused on Customer Service.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "70 minutes",
    "tags": [
      "customer service",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 824,
    "rating": 4.9,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the Retail Ecommerce industry, focused on Customer Experience.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "72 minutes",
    "tags": [
      "customer experience",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 503,
    "rating": 4.9,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the Retail Ecommerce industry, focused on Field Services.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "beginner",
    "estimatedTime": "64 minutes",
    "tags": [
      "field services",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 484,
    "rating": 4.8,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the Retail Ecommerce industry, focused on Supply Chain & Operations.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "31 minutes",
    "tags": [
      "supply chain operations",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 395,
    "rating": 4.8,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the Retail Ecommerce industry, focused on Research & Development.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "advanced",
    "estimatedTime": "51 minutes",
    "tags": [
      "research development",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 682,
    "rating": 5.0,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the Retail Ecommerce industry, focused on Engineering & Construction.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "advanced",
    "estimatedTime": "48 minutes",
    "tags": [
      "engineering construction",
      "retail ecommerce"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1080,
    "rating": 4.6,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the Retail Ecommerce industry, focused on Production & Manufacturing.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "beginner",
    "estimatedTime": "67 minutes",
    "tags": [
      "production manufacturing",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 553,
    "rating": 5.0,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the Retail Ecommerce industry, focused on Asset Management.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "52 minutes",
    "tags": [
      "asset management",
      "retail ecommerce"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 820,
    "rating": 4.8,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the Retail Ecommerce industry, focused on Quality & Safety.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "advanced",
    "estimatedTime": "56 minutes",
    "tags": [
      "quality safety",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 843,
    "rating": 4.8,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the Retail Ecommerce industry, focused on Environment & Sustainability.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "34 minutes",
    "tags": [
      "environment sustainability",
      "retail ecommerce"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 401,
    "rating": 4.8,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the Retail Ecommerce industry, focused on Strategy & Innovation.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "beginner",
    "estimatedTime": "69 minutes",
    "tags": [
      "strategy innovation",
      "retail ecommerce"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 379,
    "rating": 4.6,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the Retail Ecommerce industry, focused on Risk & Compliance.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "60 minutes",
    "tags": [
      "risk compliance",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1380,
    "rating": 4.7,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the Retail Ecommerce industry, focused on Finance & Accounting.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "advanced",
    "estimatedTime": "33 minutes",
    "tags": [
      "finance accounting",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1057,
    "rating": 4.9,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the Retail Ecommerce industry, focused on Legal & Regulatory.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "beginner",
    "estimatedTime": "32 minutes",
    "tags": [
      "legal regulatory",
      "retail ecommerce"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1440,
    "rating": 4.8,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the Retail Ecommerce industry, focused on Human Resources.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "beginner",
    "estimatedTime": "37 minutes",
    "tags": [
      "human resources",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1200,
    "rating": 4.7,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the Retail Ecommerce industry, focused on Procurement & Sourcing.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "73 minutes",
    "tags": [
      "procurement sourcing",
      "retail ecommerce"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 623,
    "rating": 4.8,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "retail_ecommerce_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the Retail Ecommerce industry, focused on Information Technology.",
    "industry": "retail_ecommerce",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "advanced",
    "estimatedTime": "33 minutes",
    "tags": [
      "information technology",
      "retail ecommerce"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1417,
    "rating": 4.7,
    "createdBy": "Retail Ecommerce AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the Consumer Goods Manufacturing industry, focused on Sales & Marketing.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "60 minutes",
    "tags": [
      "sales marketing",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1388,
    "rating": 4.7,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the Consumer Goods Manufacturing industry, focused on Customer Service.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "53 minutes",
    "tags": [
      "customer service",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 483,
    "rating": 4.6,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the Consumer Goods Manufacturing industry, focused on Customer Experience.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "advanced",
    "estimatedTime": "67 minutes",
    "tags": [
      "customer experience",
      "consumer goods manufacturing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 311,
    "rating": 4.6,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the Consumer Goods Manufacturing industry, focused on Field Services.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "70 minutes",
    "tags": [
      "field services",
      "consumer goods manufacturing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 421,
    "rating": 4.9,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the Consumer Goods Manufacturing industry, focused on Supply Chain & Operations.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "beginner",
    "estimatedTime": "34 minutes",
    "tags": [
      "supply chain operations",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 833,
    "rating": 5.0,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the Consumer Goods Manufacturing industry, focused on Research & Development.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "50 minutes",
    "tags": [
      "research development",
      "consumer goods manufacturing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1018,
    "rating": 4.9,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the Consumer Goods Manufacturing industry, focused on Engineering & Construction.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "beginner",
    "estimatedTime": "70 minutes",
    "tags": [
      "engineering construction",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1254,
    "rating": 4.9,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the Consumer Goods Manufacturing industry, focused on Production & Manufacturing.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "beginner",
    "estimatedTime": "30 minutes",
    "tags": [
      "production manufacturing",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 518,
    "rating": 5.0,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the Consumer Goods Manufacturing industry, focused on Asset Management.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "advanced",
    "estimatedTime": "48 minutes",
    "tags": [
      "asset management",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1192,
    "rating": 4.8,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the Consumer Goods Manufacturing industry, focused on Quality & Safety.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "44 minutes",
    "tags": [
      "quality safety",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 694,
    "rating": 4.5,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the Consumer Goods Manufacturing industry, focused on Environment & Sustainability.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "41 minutes",
    "tags": [
      "environment sustainability",
      "consumer goods manufacturing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 917,
    "rating": 4.9,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the Consumer Goods Manufacturing industry, focused on Strategy & Innovation.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "41 minutes",
    "tags": [
      "strategy innovation",
      "consumer goods manufacturing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1078,
    "rating": 4.6,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the Consumer Goods Manufacturing industry, focused on Risk & Compliance.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "beginner",
    "estimatedTime": "42 minutes",
    "tags": [
      "risk compliance",
      "consumer goods manufacturing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1113,
    "rating": 4.8,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the Consumer Goods Manufacturing industry, focused on Finance & Accounting.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "advanced",
    "estimatedTime": "30 minutes",
    "tags": [
      "finance accounting",
      "consumer goods manufacturing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1256,
    "rating": 4.9,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the Consumer Goods Manufacturing industry, focused on Legal & Regulatory.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "beginner",
    "estimatedTime": "60 minutes",
    "tags": [
      "legal regulatory",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1280,
    "rating": 4.8,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the Consumer Goods Manufacturing industry, focused on Human Resources.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "beginner",
    "estimatedTime": "33 minutes",
    "tags": [
      "human resources",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1283,
    "rating": 4.9,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the Consumer Goods Manufacturing industry, focused on Procurement & Sourcing.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "beginner",
    "estimatedTime": "41 minutes",
    "tags": [
      "procurement sourcing",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 699,
    "rating": 4.6,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "consumer_goods_manufacturing_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the Consumer Goods Manufacturing industry, focused on Information Technology.",
    "industry": "consumer_goods_manufacturing",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "beginner",
    "estimatedTime": "31 minutes",
    "tags": [
      "information technology",
      "consumer goods manufacturing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1477,
    "rating": 4.9,
    "createdBy": "Consumer Goods Manufacturing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the Telecommunications Technology industry, focused on Sales & Marketing.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "61 minutes",
    "tags": [
      "sales marketing",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 662,
    "rating": 4.8,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the Telecommunications Technology industry, focused on Customer Service.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "35 minutes",
    "tags": [
      "customer service",
      "telecommunications technology"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1231,
    "rating": 4.8,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the Telecommunications Technology industry, focused on Customer Experience.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "advanced",
    "estimatedTime": "39 minutes",
    "tags": [
      "customer experience",
      "telecommunications technology"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 823,
    "rating": 4.6,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the Telecommunications Technology industry, focused on Field Services.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "53 minutes",
    "tags": [
      "field services",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1444,
    "rating": 4.8,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the Telecommunications Technology industry, focused on Supply Chain & Operations.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "beginner",
    "estimatedTime": "67 minutes",
    "tags": [
      "supply chain operations",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1160,
    "rating": 4.5,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the Telecommunications Technology industry, focused on Research & Development.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "advanced",
    "estimatedTime": "73 minutes",
    "tags": [
      "research development",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 883,
    "rating": 5.0,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the Telecommunications Technology industry, focused on Engineering & Construction.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "advanced",
    "estimatedTime": "64 minutes",
    "tags": [
      "engineering construction",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 613,
    "rating": 4.9,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the Telecommunications Technology industry, focused on Production & Manufacturing.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "36 minutes",
    "tags": [
      "production manufacturing",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1110,
    "rating": 4.6,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the Telecommunications Technology industry, focused on Asset Management.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "beginner",
    "estimatedTime": "64 minutes",
    "tags": [
      "asset management",
      "telecommunications technology"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 738,
    "rating": 4.9,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the Telecommunications Technology industry, focused on Quality & Safety.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "beginner",
    "estimatedTime": "48 minutes",
    "tags": [
      "quality safety",
      "telecommunications technology"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 842,
    "rating": 4.9,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the Telecommunications Technology industry, focused on Environment & Sustainability.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "advanced",
    "estimatedTime": "67 minutes",
    "tags": [
      "environment sustainability",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 590,
    "rating": 4.7,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the Telecommunications Technology industry, focused on Strategy & Innovation.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "53 minutes",
    "tags": [
      "strategy innovation",
      "telecommunications technology"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 992,
    "rating": 4.8,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the Telecommunications Technology industry, focused on Risk & Compliance.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "32 minutes",
    "tags": [
      "risk compliance",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 305,
    "rating": 4.9,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the Telecommunications Technology industry, focused on Finance & Accounting.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "beginner",
    "estimatedTime": "60 minutes",
    "tags": [
      "finance accounting",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 563,
    "rating": 4.9,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the Telecommunications Technology industry, focused on Legal & Regulatory.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "beginner",
    "estimatedTime": "69 minutes",
    "tags": [
      "legal regulatory",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 593,
    "rating": 4.9,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the Telecommunications Technology industry, focused on Human Resources.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "beginner",
    "estimatedTime": "38 minutes",
    "tags": [
      "human resources",
      "telecommunications technology"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1158,
    "rating": 4.6,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the Telecommunications Technology industry, focused on Procurement & Sourcing.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "46 minutes",
    "tags": [
      "procurement sourcing",
      "telecommunications technology"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 403,
    "rating": 4.7,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "telecommunications_technology_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the Telecommunications Technology industry, focused on Information Technology.",
    "industry": "telecommunications_technology",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "advanced",
    "estimatedTime": "71 minutes",
    "tags": [
      "information technology",
      "telecommunications technology"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 824,
    "rating": 4.7,
    "createdBy": "Telecommunications Technology AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the Utilities industry, focused on Sales & Marketing.",
    "industry": "utilities",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "46 minutes",
    "tags": [
      "sales marketing",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 890,
    "rating": 4.5,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the Utilities industry, focused on Customer Service.",
    "industry": "utilities",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "74 minutes",
    "tags": [
      "customer service",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1093,
    "rating": 4.8,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the Utilities industry, focused on Customer Experience.",
    "industry": "utilities",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "advanced",
    "estimatedTime": "53 minutes",
    "tags": [
      "customer experience",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1408,
    "rating": 4.6,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the Utilities industry, focused on Field Services.",
    "industry": "utilities",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "75 minutes",
    "tags": [
      "field services",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 531,
    "rating": 4.9,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the Utilities industry, focused on Supply Chain & Operations.",
    "industry": "utilities",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "advanced",
    "estimatedTime": "47 minutes",
    "tags": [
      "supply chain operations",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1294,
    "rating": 4.6,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the Utilities industry, focused on Research & Development.",
    "industry": "utilities",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "beginner",
    "estimatedTime": "57 minutes",
    "tags": [
      "research development",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 986,
    "rating": 4.6,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the Utilities industry, focused on Engineering & Construction.",
    "industry": "utilities",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "beginner",
    "estimatedTime": "57 minutes",
    "tags": [
      "engineering construction",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 704,
    "rating": 4.6,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the Utilities industry, focused on Production & Manufacturing.",
    "industry": "utilities",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "beginner",
    "estimatedTime": "62 minutes",
    "tags": [
      "production manufacturing",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 751,
    "rating": 4.8,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the Utilities industry, focused on Asset Management.",
    "industry": "utilities",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "55 minutes",
    "tags": [
      "asset management",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 858,
    "rating": 4.8,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the Utilities industry, focused on Quality & Safety.",
    "industry": "utilities",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "56 minutes",
    "tags": [
      "quality safety",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 992,
    "rating": 5.0,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the Utilities industry, focused on Environment & Sustainability.",
    "industry": "utilities",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "beginner",
    "estimatedTime": "57 minutes",
    "tags": [
      "environment sustainability",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1445,
    "rating": 4.6,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the Utilities industry, focused on Strategy & Innovation.",
    "industry": "utilities",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "55 minutes",
    "tags": [
      "strategy innovation",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 758,
    "rating": 5.0,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the Utilities industry, focused on Risk & Compliance.",
    "industry": "utilities",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "68 minutes",
    "tags": [
      "risk compliance",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 619,
    "rating": 4.9,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the Utilities industry, focused on Finance & Accounting.",
    "industry": "utilities",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "beginner",
    "estimatedTime": "71 minutes",
    "tags": [
      "finance accounting",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 648,
    "rating": 4.6,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the Utilities industry, focused on Legal & Regulatory.",
    "industry": "utilities",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "beginner",
    "estimatedTime": "31 minutes",
    "tags": [
      "legal regulatory",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 988,
    "rating": 4.5,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the Utilities industry, focused on Human Resources.",
    "industry": "utilities",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "advanced",
    "estimatedTime": "71 minutes",
    "tags": [
      "human resources",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1252,
    "rating": 4.9,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the Utilities industry, focused on Procurement & Sourcing.",
    "industry": "utilities",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "45 minutes",
    "tags": [
      "procurement sourcing",
      "utilities"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1420,
    "rating": 4.8,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "utilities_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the Utilities industry, focused on Information Technology.",
    "industry": "utilities",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "advanced",
    "estimatedTime": "63 minutes",
    "tags": [
      "information technology",
      "utilities"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 821,
    "rating": 4.5,
    "createdBy": "Utilities AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the Energy Oil Gas industry, focused on Sales & Marketing.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "beginner",
    "estimatedTime": "40 minutes",
    "tags": [
      "sales marketing",
      "energy oil gas"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 781,
    "rating": 5.0,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the Energy Oil Gas industry, focused on Customer Service.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "beginner",
    "estimatedTime": "36 minutes",
    "tags": [
      "customer service",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1055,
    "rating": 4.9,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the Energy Oil Gas industry, focused on Customer Experience.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "advanced",
    "estimatedTime": "59 minutes",
    "tags": [
      "customer experience",
      "energy oil gas"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 540,
    "rating": 4.5,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the Energy Oil Gas industry, focused on Field Services.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "beginner",
    "estimatedTime": "75 minutes",
    "tags": [
      "field services",
      "energy oil gas"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1394,
    "rating": 4.7,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the Energy Oil Gas industry, focused on Supply Chain & Operations.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "advanced",
    "estimatedTime": "50 minutes",
    "tags": [
      "supply chain operations",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 492,
    "rating": 4.7,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the Energy Oil Gas industry, focused on Research & Development.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "advanced",
    "estimatedTime": "49 minutes",
    "tags": [
      "research development",
      "energy oil gas"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 899,
    "rating": 5.0,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the Energy Oil Gas industry, focused on Engineering & Construction.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "42 minutes",
    "tags": [
      "engineering construction",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1045,
    "rating": 4.9,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the Energy Oil Gas industry, focused on Production & Manufacturing.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "48 minutes",
    "tags": [
      "production manufacturing",
      "energy oil gas"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1232,
    "rating": 4.9,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the Energy Oil Gas industry, focused on Asset Management.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "beginner",
    "estimatedTime": "69 minutes",
    "tags": [
      "asset management",
      "energy oil gas"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 376,
    "rating": 4.7,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the Energy Oil Gas industry, focused on Quality & Safety.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "52 minutes",
    "tags": [
      "quality safety",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1155,
    "rating": 4.9,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the Energy Oil Gas industry, focused on Environment & Sustainability.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "advanced",
    "estimatedTime": "41 minutes",
    "tags": [
      "environment sustainability",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1410,
    "rating": 4.7,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the Energy Oil Gas industry, focused on Strategy & Innovation.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "advanced",
    "estimatedTime": "56 minutes",
    "tags": [
      "strategy innovation",
      "energy oil gas"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 719,
    "rating": 4.8,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the Energy Oil Gas industry, focused on Risk & Compliance.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "beginner",
    "estimatedTime": "45 minutes",
    "tags": [
      "risk compliance",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 417,
    "rating": 4.7,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the Energy Oil Gas industry, focused on Finance & Accounting.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "31 minutes",
    "tags": [
      "finance accounting",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 419,
    "rating": 4.5,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the Energy Oil Gas industry, focused on Legal & Regulatory.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "beginner",
    "estimatedTime": "64 minutes",
    "tags": [
      "legal regulatory",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1139,
    "rating": 4.7,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the Energy Oil Gas industry, focused on Human Resources.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "beginner",
    "estimatedTime": "75 minutes",
    "tags": [
      "human resources",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 882,
    "rating": 4.6,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the Energy Oil Gas industry, focused on Procurement & Sourcing.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "66 minutes",
    "tags": [
      "procurement sourcing",
      "energy oil gas"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 567,
    "rating": 4.9,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "energy_oil_gas_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the Energy Oil Gas industry, focused on Information Technology.",
    "industry": "energy_oil_gas",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "43 minutes",
    "tags": [
      "information technology",
      "energy oil gas"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 764,
    "rating": 4.8,
    "createdBy": "Energy Oil Gas AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_sales_marketing",
    "title": "Personalized Marketing Campaign Generator",
    "description": "An AI team that provides Personalized Marketing Campaign Generator for the Petrochemical Chemical Processing industry, focused on Sales & Marketing.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "sales_marketing"
    ],
    "difficulty": "beginner",
    "estimatedTime": "53 minutes",
    "tags": [
      "sales marketing",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Sales & Marketing tasks.",
      "label": "Sales & Marketing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Sales & Marketing tasks.",
            "label": "Sales & Marketing Agent",
            "config": {
              "name": "Sales & Marketing_agent",
              "system_message": "You are specialized in Sales & Marketing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Sales & Marketing specialized tool",
                  "label": "Sales & MarketingTool",
                  "config": {
                    "name": "Sales & Marketing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 516,
    "rating": 4.8,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_customer_service",
    "title": "AI-Powered Customer Support Assistant",
    "description": "An AI team that provides AI-Powered Customer Support Assistant for the Petrochemical Chemical Processing industry, focused on Customer Service.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "customer_service"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "75 minutes",
    "tags": [
      "customer service",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Service tasks.",
      "label": "Customer Service AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Service tasks.",
            "label": "Customer Service Agent",
            "config": {
              "name": "Customer Service_agent",
              "system_message": "You are specialized in Customer Service tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Service specialized tool",
                  "label": "Customer ServiceTool",
                  "config": {
                    "name": "Customer Service_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 896,
    "rating": 4.8,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_customer_experience",
    "title": "Customer Feedback Sentiment Analyzer",
    "description": "An AI team that provides Customer Feedback Sentiment Analyzer for the Petrochemical Chemical Processing industry, focused on Customer Experience.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "customer_experience"
    ],
    "difficulty": "advanced",
    "estimatedTime": "65 minutes",
    "tags": [
      "customer experience",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Customer Experience tasks.",
      "label": "Customer Experience AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Customer Experience tasks.",
            "label": "Customer Experience Agent",
            "config": {
              "name": "Customer Experience_agent",
              "system_message": "You are specialized in Customer Experience tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Customer Experience specialized tool",
                  "label": "Customer ExperienceTool",
                  "config": {
                    "name": "Customer Experience_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 465,
    "rating": 4.8,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_field_services",
    "title": "Field Service Scheduling Optimizer",
    "description": "An AI team that provides Field Service Scheduling Optimizer for the Petrochemical Chemical Processing industry, focused on Field Services.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "field_services"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "65 minutes",
    "tags": [
      "field services",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Field Services tasks.",
      "label": "Field Services AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Field Services tasks.",
            "label": "Field Services Agent",
            "config": {
              "name": "Field Services_agent",
              "system_message": "You are specialized in Field Services tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Field Services specialized tool",
                  "label": "Field ServicesTool",
                  "config": {
                    "name": "Field Services_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1468,
    "rating": 4.9,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_supply_chain_operations",
    "title": "Supply Chain Demand Forecasting AI",
    "description": "An AI team that provides Supply Chain Demand Forecasting AI for the Petrochemical Chemical Processing industry, focused on Supply Chain & Operations.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "supply_chain_operations"
    ],
    "difficulty": "advanced",
    "estimatedTime": "32 minutes",
    "tags": [
      "supply chain operations",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Supply Chain & Operations tasks.",
      "label": "Supply Chain & Operations AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Supply Chain & Operations tasks.",
            "label": "Supply Chain & Operations Agent",
            "config": {
              "name": "Supply Chain & Operations_agent",
              "system_message": "You are specialized in Supply Chain & Operations tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Supply Chain & Operations specialized tool",
                  "label": "Supply Chain & OperationsTool",
                  "config": {
                    "name": "Supply Chain & Operations_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 658,
    "rating": 4.8,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_research_development",
    "title": "Product Innovation Idea Generator",
    "description": "An AI team that provides Product Innovation Idea Generator for the Petrochemical Chemical Processing industry, focused on Research & Development.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "research_development"
    ],
    "difficulty": "beginner",
    "estimatedTime": "58 minutes",
    "tags": [
      "research development",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Research & Development tasks.",
      "label": "Research & Development AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Research & Development tasks.",
            "label": "Research & Development Agent",
            "config": {
              "name": "Research & Development_agent",
              "system_message": "You are specialized in Research & Development tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Research & Development specialized tool",
                  "label": "Research & DevelopmentTool",
                  "config": {
                    "name": "Research & Development_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 803,
    "rating": 4.5,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_engineering_construction",
    "title": "Construction Project Planning Assistant",
    "description": "An AI team that provides Construction Project Planning Assistant for the Petrochemical Chemical Processing industry, focused on Engineering & Construction.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "engineering_construction"
    ],
    "difficulty": "beginner",
    "estimatedTime": "72 minutes",
    "tags": [
      "engineering construction",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Engineering & Construction tasks.",
      "label": "Engineering & Construction AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Engineering & Construction tasks.",
            "label": "Engineering & Construction Agent",
            "config": {
              "name": "Engineering & Construction_agent",
              "system_message": "You are specialized in Engineering & Construction tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Engineering & Construction specialized tool",
                  "label": "Engineering & ConstructionTool",
                  "config": {
                    "name": "Engineering & Construction_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 755,
    "rating": 4.6,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_production_manufacturing",
    "title": "Manufacturing Process Optimization AI",
    "description": "An AI team that provides Manufacturing Process Optimization AI for the Petrochemical Chemical Processing industry, focused on Production & Manufacturing.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "production_manufacturing"
    ],
    "difficulty": "beginner",
    "estimatedTime": "31 minutes",
    "tags": [
      "production manufacturing",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Production & Manufacturing tasks.",
      "label": "Production & Manufacturing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Production & Manufacturing tasks.",
            "label": "Production & Manufacturing Agent",
            "config": {
              "name": "Production & Manufacturing_agent",
              "system_message": "You are specialized in Production & Manufacturing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Production & Manufacturing specialized tool",
                  "label": "Production & ManufacturingTool",
                  "config": {
                    "name": "Production & Manufacturing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 838,
    "rating": 4.7,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_asset_management",
    "title": "Predictive Asset Maintenance Advisor",
    "description": "An AI team that provides Predictive Asset Maintenance Advisor for the Petrochemical Chemical Processing industry, focused on Asset Management.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "asset_management"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "55 minutes",
    "tags": [
      "asset management",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Asset Management tasks.",
      "label": "Asset Management AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Asset Management tasks.",
            "label": "Asset Management Agent",
            "config": {
              "name": "Asset Management_agent",
              "system_message": "You are specialized in Asset Management tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Asset Management specialized tool",
                  "label": "Asset ManagementTool",
                  "config": {
                    "name": "Asset Management_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 555,
    "rating": 4.7,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_quality_safety",
    "title": "Quality Control Defect Detection System",
    "description": "An AI team that provides Quality Control Defect Detection System for the Petrochemical Chemical Processing industry, focused on Quality & Safety.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "quality_safety"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "57 minutes",
    "tags": [
      "quality safety",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Quality & Safety tasks.",
      "label": "Quality & Safety AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Quality & Safety tasks.",
            "label": "Quality & Safety Agent",
            "config": {
              "name": "Quality & Safety_agent",
              "system_message": "You are specialized in Quality & Safety tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Quality & Safety specialized tool",
                  "label": "Quality & SafetyTool",
                  "config": {
                    "name": "Quality & Safety_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1386,
    "rating": 4.5,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_environment_sustainability",
    "title": "Sustainability Compliance Monitor",
    "description": "An AI team that provides Sustainability Compliance Monitor for the Petrochemical Chemical Processing industry, focused on Environment & Sustainability.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "environment_sustainability"
    ],
    "difficulty": "beginner",
    "estimatedTime": "31 minutes",
    "tags": [
      "environment sustainability",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Environment & Sustainability tasks.",
      "label": "Environment & Sustainability AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Environment & Sustainability tasks.",
            "label": "Environment & Sustainability Agent",
            "config": {
              "name": "Environment & Sustainability_agent",
              "system_message": "You are specialized in Environment & Sustainability tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Environment & Sustainability specialized tool",
                  "label": "Environment & SustainabilityTool",
                  "config": {
                    "name": "Environment & Sustainability_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 646,
    "rating": 4.7,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_strategy_innovation",
    "title": "Strategic Business Planning Assistant",
    "description": "An AI team that provides Strategic Business Planning Assistant for the Petrochemical Chemical Processing industry, focused on Strategy & Innovation.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "strategy_innovation"
    ],
    "difficulty": "beginner",
    "estimatedTime": "61 minutes",
    "tags": [
      "strategy innovation",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Strategy & Innovation tasks.",
      "label": "Strategy & Innovation AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Strategy & Innovation tasks.",
            "label": "Strategy & Innovation Agent",
            "config": {
              "name": "Strategy & Innovation_agent",
              "system_message": "You are specialized in Strategy & Innovation tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Strategy & Innovation specialized tool",
                  "label": "Strategy & InnovationTool",
                  "config": {
                    "name": "Strategy & Innovation_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 771,
    "rating": 4.6,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_risk_compliance",
    "title": "Risk Detection and Compliance Monitoring AI",
    "description": "An AI team that provides Risk Detection and Compliance Monitoring AI for the Petrochemical Chemical Processing industry, focused on Risk & Compliance.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "risk_compliance"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "43 minutes",
    "tags": [
      "risk compliance",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Risk & Compliance tasks.",
      "label": "Risk & Compliance AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Risk & Compliance tasks.",
            "label": "Risk & Compliance Agent",
            "config": {
              "name": "Risk & Compliance_agent",
              "system_message": "You are specialized in Risk & Compliance tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Risk & Compliance specialized tool",
                  "label": "Risk & ComplianceTool",
                  "config": {
                    "name": "Risk & Compliance_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 921,
    "rating": 4.7,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_finance_accounting",
    "title": "Automated Financial Report Generator",
    "description": "An AI team that provides Automated Financial Report Generator for the Petrochemical Chemical Processing industry, focused on Finance & Accounting.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "finance_accounting"
    ],
    "difficulty": "beginner",
    "estimatedTime": "65 minutes",
    "tags": [
      "finance accounting",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Finance & Accounting tasks.",
      "label": "Finance & Accounting AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Finance & Accounting tasks.",
            "label": "Finance & Accounting Agent",
            "config": {
              "name": "Finance & Accounting_agent",
              "system_message": "You are specialized in Finance & Accounting tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Finance & Accounting specialized tool",
                  "label": "Finance & AccountingTool",
                  "config": {
                    "name": "Finance & Accounting_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 642,
    "rating": 4.5,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_legal_regulatory",
    "title": "Contract Compliance and Legal Risk Analyzer",
    "description": "An AI team that provides Contract Compliance and Legal Risk Analyzer for the Petrochemical Chemical Processing industry, focused on Legal & Regulatory.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "legal_regulatory"
    ],
    "difficulty": "advanced",
    "estimatedTime": "49 minutes",
    "tags": [
      "legal regulatory",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Legal & Regulatory tasks.",
      "label": "Legal & Regulatory AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Legal & Regulatory tasks.",
            "label": "Legal & Regulatory Agent",
            "config": {
              "name": "Legal & Regulatory_agent",
              "system_message": "You are specialized in Legal & Regulatory tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Legal & Regulatory specialized tool",
                  "label": "Legal & RegulatoryTool",
                  "config": {
                    "name": "Legal & Regulatory_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1084,
    "rating": 4.9,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_human_resources",
    "title": "Employee Onboarding Virtual Assistant",
    "description": "An AI team that provides Employee Onboarding Virtual Assistant for the Petrochemical Chemical Processing industry, focused on Human Resources.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "human_resources"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "56 minutes",
    "tags": [
      "human resources",
      "petrochemical chemical processing"
    ],
    "isPopular": true,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Human Resources tasks.",
      "label": "Human Resources AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Human Resources tasks.",
            "label": "Human Resources Agent",
            "config": {
              "name": "Human Resources_agent",
              "system_message": "You are specialized in Human Resources tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Human Resources specialized tool",
                  "label": "Human ResourcesTool",
                  "config": {
                    "name": "Human Resources_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1398,
    "rating": 4.6,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_procurement_sourcing",
    "title": "Procurement Spend Analysis AI",
    "description": "An AI team that provides Procurement Spend Analysis AI for the Petrochemical Chemical Processing industry, focused on Procurement & Sourcing.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "procurement_sourcing"
    ],
    "difficulty": "advanced",
    "estimatedTime": "65 minutes",
    "tags": [
      "procurement sourcing",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Procurement & Sourcing tasks.",
      "label": "Procurement & Sourcing AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Procurement & Sourcing tasks.",
            "label": "Procurement & Sourcing Agent",
            "config": {
              "name": "Procurement & Sourcing_agent",
              "system_message": "You are specialized in Procurement & Sourcing tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Procurement & Sourcing specialized tool",
                  "label": "Procurement & SourcingTool",
                  "config": {
                    "name": "Procurement & Sourcing_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 1044,
    "rating": 4.8,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  },
  {
    "id": "petrochemical_chemical_processing_information_technology",
    "title": "IT Incident Detection and Resolution Bot",
    "description": "An AI team that provides IT Incident Detection and Resolution Bot for the Petrochemical Chemical Processing industry, focused on Information Technology.",
    "industry": "petrochemical_chemical_processing",
    "functionAreas": [
      "information_technology"
    ],
    "difficulty": "intermediate",
    "estimatedTime": "40 minutes",
    "tags": [
      "information technology",
      "petrochemical chemical processing"
    ],
    "isPopular": false,
    "autogenStructure": {
      "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
      "component_type": "team",
      "version": 1,
      "component_version": 1,
      "description": "AI team for Information Technology tasks.",
      "label": "Information Technology AI Team",
      "config": {
        "participants": [
          {
            "provider": "autogen_agentchat.agents.AssistantAgent",
            "component_type": "agent",
            "version": 1,
            "component_version": 1,
            "description": "Handles Information Technology tasks.",
            "label": "Information Technology Agent",
            "config": {
              "name": "Information Technology_agent",
              "system_message": "You are specialized in Information Technology tasks.",
              "tools": [
                {
                  "provider": "autogen_core.tools.FunctionTool",
                  "component_type": "tool",
                  "version": 1,
                  "component_version": 1,
                  "description": "Information Technology specialized tool",
                  "label": "Information TechnologyTool",
                  "config": {
                    "name": "Information Technology_function"
                  }
                }
              ]
            }
          }
        ],
        "termination_condition": {
          "description": "Terminate after task completion."
        }
      }
    },
    "usage": 502,
    "rating": 4.8,
    "createdBy": "Petrochemical Chemical Processing AI Team",
    "lastUpdated": "2025-06-08"
  }
]