// Industry and Focus Area options with enhanced prompts and context
export const industries = [
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
  },
  { 
    value: 'banking',
    label: 'Banking & Financing',
    keyPrompts: {
      agentConsiderations: [
        'Regulatory compliance (SOX, Basel III, GDPR)',
        'Real-time transaction and mobile banking',
        'Underwriting process',
        'Consumer exprience and retail banking',
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
    value: 'healthcare_public_sector',
    label: 'Healthcare & Public Sector',
    keyPrompts: {
      agentConsiderations: [
        'HIPAA compliance & patient data privacy',
        'Electronic Health Records (EHR) integration',
        'Clinical decision support',
        'Public service automation',
        'Government data security compliance (e.g., FISMA)',
        'Citizen engagement and communication',
        'Policy implementation and tracking'
      ],
      systemInstructions: `You are an AI specialist for healthcare and the public sector. Prioritize:
        - Secure handling of sensitive data (HIPAA, PII)
        - Clinical and public service workflow integration
        - Medical terminology and policy accuracy
        - Healthcare and government compliance standards
        - Citizen and patient engagement protocols`,
      toolPriorities: ['ehr_connector', 'hipaa_validator', 'service_automator', 'security_validator', 'policy_checker']
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
        'Data and Ads monetization',
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
    value: 'cpg_manufacturing',
    label: 'Consumer Goods & Manufacturing',
    keyPrompts: {
      agentConsiderations: [
        'Production optimization & Quality control',
        'Supply chain visibility & Predictive maintenance',
        'Brand management & Consumer insights',
        'Market trend analysis & Sales management',
        'Product lifecycle management from creation to consumer',
      ],
      systemInstructions: `You are an AI expert for the entire product lifecycle, from manufacturing to consumer goods. Focus on:
        - Production efficiency and supply chain optimization
        - Product quality assurance
        - Consumer behavior analysis and brand reputation
        - Market trend identification and sales strategies
        - Integrating customer feedback into the product lifecycle`,
      toolPriorities: ['production_monitor', 'quality_checker', 'market_analyzer', 'sentiment_analyzer', 'trend_predictor']
    }
  },
  { 
    value: 'telecom_technology',
    label: 'Telecommunications & Technology',
    keyPrompts: {
      agentConsiderations: [
        'Code analysis and generation',
        'System integration and API management',
        'Network optimization and monitoring',
        'Service quality and SLA management',
        'Product offering and pricing management',
        'Technical documentation automation',
        'Infrastructure management (Cloud & On-prem)'
      ],
      systemInstructions: `You are a technology and telecommunications AI specialist. Prioritize:
        - Code quality and system architecture
        - Network performance, reliability, and security
        - Technical documentation and troubleshooting
        - Performance optimization for software and networks
        - Campaign and product personalization
        - Automation of DevOps and NetOps processes`,
      toolPriorities: ['code_analyzer', 'performance_monitor', 'network_analyzer', 'service_monitor', 'doc_generator', 'next_best_offer']
    }
  },
  { 
    value: 'utilities',
    label: 'Utilities',
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
    value: 'resources_energy',
    label: 'Energy, Oil & Gas',
    keyPrompts: {
      agentConsiderations: [
        'Renewable energy integration',
        'Upstream exploration and production management',
        'Well and Site Management',
        'Downstream refining and distribution management'
      ],
      systemInstructions: `You are an energy, oil & gas AI expert. Focus on:
        - Upstream process efficiency
        - Midstream logistics and storage
        - Downstream processing and distribution 
        - Asset investment and performance management
        - Well and site safety and compliance`,
      toolPriorities: ['well_reader', 'asset_tracker', 'GIS_reader']
    }
  },
  { 
    value: 'petrochemical',
    label: 'Petrochemical & Chemical Processing',
    keyPrompts: {
      agentConsiderations: [
        'Process optimization and control',
        'Chemical safety and hazard management',
        'Feedstock and raw material management',
        'Product quality and specification compliance',
        'Environmental monitoring and emissions control',
        'Catalyst management and performance',
        'Plant maintenance and turnaround planning',
        'Supply chain and logistics optimization'
      ],
      systemInstructions: `You are a petrochemical and chemical processing AI expert. Focus on:
        - Chemical process optimization
        - Safety and environmental compliance
        - Quality control and product specifications
        - Feedstock and catalyst management
        - Plant operations and maintenance
        - Supply chain efficiency
        - Regulatory compliance (EPA, OSHA, DOT)
        - Energy efficiency and sustainability`,
      toolPriorities: ['process_optimizer', 'safety_monitor', 'quality_analyzer', 'emissions_tracker', 'maintenance_scheduler']
    }
  }
];

export const focusAreas = [
  // =================================
  // 1. Customer-Facing Functions
  // =================================
  { 
    value: 'customer_service',
    label: 'Customer Service & Support',
    function_group: 'Customer-Facing Functions',
    keyConsiderations: [
      'Response time optimization',
      'Query categorization',
      'Sentiment analysis',
      'Personal advisor',
      'Escalation protocols'
    ]
  },
  { 
    value: 'sales',
    label: 'Sales & Revenue Growth',
    function_group: 'Customer-Facing Functions',
    keyConsiderations: [
      'Lead qualification',
      'Sales pipeline optimization',
      'Revenue forecasting',
      'Customer relationship management'
    ]
  },
  { 
    value: 'marketing',
    label: 'Marketing & Brand Mgmt.',
    function_group: 'Customer-Facing Functions',
    keyConsiderations: [
      'Campaign optimization',
      'Market analysis',
      'Content personalization',
      'Brand monitoring'
    ]
  },
  { 
    value: 'social_commerce',
    label: 'Social Commerce',
    function_group: 'Customer-Facing Functions',
    keyConsiderations: [
      'Social media Tiktok and Instragram integration',
      'Influencer analytics',
      'Engagement optimization',
      'Conversion tracking'
    ]
  },
  // =================================
  // 2. Core Business Operations
  // =================================
  { 
    value: 'operations',
    label: 'Ops & Process Engineering',
    function_group: 'Core Business Operations',
    keyConsiderations: [
      'Workflow automation',
      'Resource allocation',
      'Quality control',
      'Performance monitoring',
      'Process simulation and modeling',
      'Heat and mass transfer optimization',
      'Reaction kinetics analysis',
      'Process safety analysis'
    ]
  },
  { 
    value: 'supply_chain',
    label: 'Procurement & Supply Chain',
    function_group: 'Core Business Operations',
    keyConsiderations: [
      'Feedstock procurement optimization',
      'Chemical inventory management',
      'Transportation and logistics',
      'Supplier quality management',
      'Market price analysis',
      'Contract management'
    ]
  },
    { 
    value: 'asset',
    label: 'Asset management',
    function_group: 'Core Business Operations',
    keyConsiderations: [
      'Asset capital investment',
      'Asset maintenance',
      'Asset lifecycle management',
      'Asset profitability analysis'
    ]
  },

  { 
    value: 'innovation',
    label: 'Innovation and R&D',
    function_group: 'Core Business Operations',
    keyConsiderations: [
      'Trend analysis',
      'Research automation',
      'Patent monitoring',
      'Technology assessment'
    ]
  },
  // =================================
  // 3. Business & Corporate Functions
  // =================================
  { 
    value: 'finance',
    label: 'Finance & Analysis',
    function_group: 'Business & Corporate Functions',
    keyConsiderations: [
      'Budget optimization',
      'Financial forecasting',
      'Risk assessment',
      'Compliance monitoring'
    ]
  },
  { 
    value: 'risk',
    label: 'Legal, Risk, & Policy',
    function_group: 'Business & Corporate Functions',
    keyConsiderations: [
      'Risk assessment',
      'Compliance monitoring',
      'Audit automation',
      'Policy enforcement'
    ]
  },
  { 
    value: 'hr',
    label: 'HR & Talent ',
    function_group: 'Business & Corporate Functions',
    keyConsiderations: [
      'Recruitment automation',
      'Employee engagement',
      'Performance evaluation',
      'Training optimization'
    ]
  },
  { 
    value: 'environmental_compliance',
    label: 'Environmental & Safety',
    function_group: 'Business & Corporate Functions',
    keyConsiderations: [
      'Emissions monitoring and control',
      'Waste management optimization',
      'Environmental impact assessment',
      'Safety protocol enforcement',
      'Regulatory reporting automation',
      'Incident management and prevention'
    ]
  },
  
    { 
    value: 'data',
    label: 'Data  & Insights',
    function_group: 'Business & Corporate Functions',
    keyConsiderations: [
      'Data processing',
      'Pattern recognition',
      'Predictive analytics',
      'Reporting automation'
    ]
  }
];