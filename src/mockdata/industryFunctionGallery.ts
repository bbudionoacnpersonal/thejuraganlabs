// src/mockdata/industryFunctionGallery.ts
interface UseCaseTemplate {
  id: string;
  title: string;
  description: string;
- industry: string;
+ industries: string[];
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
  // Example: Strategy AI — now applied to multiple industries
  {
    id: 'strategy_innovation_assistant',
    title: 'Corporate Strategy Brainstorming Assistant',
    description: 'AI system to brainstorm, evaluate, and refine corporate strategies across industries.',
   industry: 'general_industry_services',
   industries: ['banking_financing', 'retail_ecommerce', 'telecommunications_technology'],
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

  // Next use case also supports multiple industries...
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