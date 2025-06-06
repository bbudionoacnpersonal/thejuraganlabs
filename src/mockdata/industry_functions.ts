// Industry and Focus Area options with enhanced prompts and context
export const industries = [
  { 
    value: 'finance',
    label: 'Finance & Banking',
    keyPrompts: {
      agentConsiderations: [
        'Regulatory compliance (SOX, Basel III, GDPR)',
        'Real-time transaction processing',
        'Fraud detection and prevention',
        'Risk assessment and management'
      ],
      systemInstructions: `You are a financial services AI expert. Focus on:
        - Secure handling of financial data
        - Compliance with banking regulations
        - Integration with existing financial systems
        - Real-time processing capabilities
        - Risk management protocols`,
      toolPriorities: ['data_encryption', 'audit_logging', 'compliance_checker']
    }
  },
  { 
    value: 'healthcare',
    label: 'Healthcare & Life Sciences',
    keyPrompts: {
      agentConsiderations: [
        'HIPAA compliance',
        'Patient data privacy',
        'Electronic Health Records (EHR) integration',
        'Clinical decision support'
      ],
      systemInstructions: `You are a healthcare AI specialist. Prioritize:
        - Patient data protection
        - Clinical workflow integration
        - Medical terminology accuracy
        - Healthcare compliance standards
        - Emergency response protocols`,
      toolPriorities: ['ehr_connector', 'hipaa_validator', 'medical_nlp']
    }
  },
  { 
    value: 'retail',
    label: 'Retail & E-commerce',
    keyPrompts: {
      agentConsiderations: [
        'Inventory management',
        'Customer experience optimization',
        'Order processing automation',
        'Omnichannel integration'
      ],
      systemInstructions: `You are a retail AI solutions expert. Focus on:
        - Customer service excellence
        - Inventory optimization
        - Sales forecasting
        - Multi-channel integration
        - Personalization strategies`,
      toolPriorities: ['inventory_manager', 'customer_analyzer', 'sales_predictor']
    }
  },
  { 
    value: 'manufacturing',
    label: 'Manufacturing & Supply Chain',
    keyPrompts: {
      agentConsiderations: [
        'Production optimization',
        'Quality control automation',
        'Supply chain visibility',
        'Predictive maintenance'
      ],
      systemInstructions: `You are a manufacturing AI specialist. Emphasize:
        - Production efficiency
        - Quality assurance
        - Supply chain optimization
        - Equipment maintenance
        - Resource planning`,
      toolPriorities: ['production_monitor', 'quality_checker', 'maintenance_predictor']
    }
  },
  { 
    value: 'consumergoods',
    label: 'Consumer Goods & Services',
    keyPrompts: {
      agentConsiderations: [
        'Brand management',
        'Consumer insights',
        'Market trend analysis',
        'Product lifecycle management'
      ],
      systemInstructions: `You are a consumer goods AI expert. Focus on:
        - Consumer behavior analysis
        - Brand reputation management
        - Market trend identification
        - Product development support
        - Customer feedback analysis`,
      toolPriorities: ['market_analyzer', 'sentiment_analyzer', 'trend_predictor']
    }
  },
  { 
    value: 'technology',
    label: 'Technology & Software',
    keyPrompts: {
      agentConsiderations: [
        'Technical documentation',
        'Code analysis',
        'System integration',
        'Performance optimization'
      ],
      systemInstructions: `You are a technology sector AI specialist. Prioritize:
        - Code quality assessment
        - Technical documentation
        - System architecture
        - Performance optimization
        - Security best practices`,
      toolPriorities: ['code_analyzer', 'doc_generator', 'performance_monitor']
    }
  },
  { 
    value: 'telecom',
    label: 'Telecommunications',
    keyPrompts: {
      agentConsiderations: [
        'Network optimization',
        'Service quality monitoring',
        'Customer support automation',
        'Infrastructure management'
      ],
      systemInstructions: `You are a telecommunications AI expert. Focus on:
        - Network performance
        - Service quality
        - Customer support
        - Infrastructure planning
        - Technical troubleshooting`,
      toolPriorities: ['network_analyzer', 'service_monitor', 'support_automator']
    }
  },
  { 
    value: 'energy',
    label: 'Energy & Utilities',
    keyPrompts: {
      agentConsiderations: [
        'Grid management',
        'Energy consumption optimization',
        'Regulatory compliance',
        'Sustainable energy integration'
      ],
      systemInstructions: `You are an energy sector AI specialist. Emphasize:
        - Grid optimization
        - Energy efficiency
        - Regulatory compliance
        - Sustainability metrics
        - Resource management`,
      toolPriorities: ['grid_optimizer', 'energy_monitor', 'compliance_checker']
    }
  },
  { 
    value: 'education',
    label: 'Education & Training',
    keyPrompts: {
      agentConsiderations: [
        'Learning path customization',
        'Student progress tracking',
        'Content adaptation',
        'Assessment automation'
      ],
      systemInstructions: `You are an education AI expert. Focus on:
        - Personalized learning
        - Student assessment
        - Content management
        - Progress tracking
        - Educational analytics`,
      toolPriorities: ['content_adapter', 'progress_tracker', 'assessment_generator']
    }
  },
  { 
    value: 'government',
    label: 'Government & Public Sector',
    keyPrompts: {
      agentConsiderations: [
        'Public service automation',
        'Data security compliance',
        'Citizen engagement',
        'Policy implementation'
      ],
      systemInstructions: `You are a government sector AI specialist. Prioritize:
        - Public service delivery
        - Data security
        - Policy compliance
        - Citizen engagement
        - Administrative efficiency`,
      toolPriorities: ['service_automator', 'security_validator', 'policy_checker']
    }
  },
  { 
    value: 'consulting',
    label: 'Professional Services & Consulting',
    keyPrompts: {
      agentConsiderations: [
        'Business analysis',
        'Project management',
        'Client relationship management',
        'Knowledge management'
      ],
      systemInstructions: `You are a consulting services AI expert. Focus on:
        - Business analysis
        - Project management
        - Client relations
        - Knowledge sharing
        - Performance metrics`,
      toolPriorities: ['analysis_helper', 'project_manager', 'knowledge_base']
    }
  },
  { 
    value: 'others',
    label: 'General Industry Services',
    keyPrompts: {
      agentConsiderations: [
        'Process automation',
        'Resource optimization',
        'Service delivery',
        'Quality management'
      ],
      systemInstructions: `You are a general business AI specialist. Emphasize:
        - Process efficiency
        - Service quality
        - Resource management
        - Performance optimization
        - Customer satisfaction`,
      toolPriorities: ['process_automator', 'resource_optimizer', 'quality_monitor']
    }
  }
];

export const focusAreas = [
  { 
    value: 'customer_service',
    label: 'Customer Service & Support',
    keyConsiderations: [
      'Response time optimization',
      'Query categorization',
      'Sentiment analysis',
      'Escalation protocols'
    ]
  },
  { 
    value: 'sales',
    label: 'Sales & Revenue Growth',
    keyConsiderations: [
      'Lead qualification',
      'Sales pipeline optimization',
      'Revenue forecasting',
      'Customer relationship management'
    ]
  },
  { 
    value: 'marketing',
    label: 'Marketing & Brand Management',
    keyConsiderations: [
      'Campaign optimization',
      'Market analysis',
      'Content personalization',
      'Brand monitoring'
    ]
  },
  { 
    value: 'operations',
    label: 'Operations & Process Optimization',
    keyConsiderations: [
      'Workflow automation',
      'Resource allocation',
      'Quality control',
      'Performance monitoring'
    ]
  },
  { 
    value: 'hr',
    label: 'HR & Talent Management',
    keyConsiderations: [
      'Recruitment automation',
      'Employee engagement',
      'Performance evaluation',
      'Training optimization'
    ]
  },
  { 
    value: 'finance',
    label: 'Financial Planning & Analysis',
    keyConsiderations: [
      'Budget optimization',
      'Financial forecasting',
      'Risk assessment',
      'Compliance monitoring'
    ]
  },
  { 
    value: 'risk',
    label: 'Risk Management & Compliance',
    keyConsiderations: [
      'Risk assessment',
      'Compliance monitoring',
      'Audit automation',
      'Policy enforcement'
    ]
  },
  { 
    value: 'innovation',
    label: 'Innovation & R&D',
    keyConsiderations: [
      'Trend analysis',
      'Research automation',
      'Patent monitoring',
      'Technology assessment'
    ]
  },
  { 
    value: 'data',
    label: 'Data Analytics & Business Intelligence',
    keyConsiderations: [
      'Data processing',
      'Pattern recognition',
      'Predictive analytics',
      'Reporting automation'
    ]
  },
  { 
    value: 'social_commerce',
    label: 'Social Commerce',
    keyConsiderations: [
      'Social media Tiktok and Instragram integration',
      'Influencer analytics',
      'Engagement optimization',
      'Conversion tracking'
    ]
  }
];
