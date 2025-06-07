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
      // ... (structure remains the same)
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
        // ... (structure remains the same)
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
        // ... (structure remains the same)
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
    functionAreas: ['operations', 'risk'],
    difficulty: 'advanced',
    estimatedTime: '50 minutes',
    tags: ['patient triage', 'symptom assessment', 'care routing', 'HIPAA compliant'],
    isPopular: true,
    autogenStructure: {
        // ... (structure remains the same)
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
    description: 'AI agents that perform comprehensive code reviews, security analysis, and suggest improvements.',
    industry: 'technology',
    functionAreas: ['innovation', 'risk'],
    difficulty: 'intermediate',
    estimatedTime: '35 minutes',
    tags: ['code review', 'security analysis', 'best practices', 'automation'],
    isPopular: false,
    autogenStructure: {
        // ... (structure remains the same)
    },
    usage: 756,
    rating: 4.5,
    createdBy: 'Engineering Excellence Team',
    lastUpdated: '2024-01-14',
  },
];

/**
 * Filters the use case gallery based on optional industry and function area criteria.
 * @param options - An object containing optional 'industry' and 'functionAreas' to filter by.
 * @returns An array of filtered UseCaseTemplate objects.
 */
export const filterUseCases = (options?: {
  industry?: string;
  functionAreas?: string[];
}): UseCaseTemplate[] => {
  let filteredCases = [...industryFunctionGallery];

  // 1. Filter by industry if a valid industry is provided
  if (options?.industry) {
    filteredCases = filteredCases.filter(
      (useCase) => useCase.industry === options.industry
    );
  }

  // 2. Filter by function areas if a valid array is provided
  if (options?.functionAreas && options.functionAreas.length > 0) {
    filteredCases = filteredCases.filter((useCase) =>
      // Keep the use case if at least one of its function areas is in the filter list
      useCase.functionAreas.some((area) => options.functionAreas?.includes(area))
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