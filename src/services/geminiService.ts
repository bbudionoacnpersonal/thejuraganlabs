// Gemini AI service for analyzing conversation messages and extracting Autogen structure
import { TeamStructure } from '@/types';

interface AnalysisResult {
  teamStructure?: TeamStructure;
  conversationStage: 'initial' | 'team_discussion' | 'agent_configuration' | 'finalization';
  confidence: number;
  reasoning: string;
}

export const analyzeConversationForAutogenStructure = async (
  messages: string[],
  currentStructure?: TeamStructure | null, // Explicitly allow null
  userIndustry?: string,
  userFocusAreas?: string[]
): Promise<AnalysisResult> => {
  try {
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const conversationText = messages.join('\n');
    const hasTeamMention = /team|group|agents|collaboration/i.test(conversationText);
    const hasAgentMention = /agent|assistant|bot|ai/i.test(conversationText);
    const hasToolMention = /tool|function|capability|integration/i.test(conversationText);
    const hasTaskMention = /task|goal|objective|purpose/i.test(conversationText);
    
    console.log('🔍 Anthropic Analysis Input:', {
      messageCount: messages.length,
      hasCurrentStructure: !!currentStructure,
      userIndustry,
      userFocusAreas,
      conversationText: conversationText.substring(0, 200) + '...'
    });
    
    // Determine conversation stage
    let conversationStage: 'initial' | 'team_discussion' | 'agent_configuration' | 'finalization' = 'initial';
    let confidence = 0.5;
    
    if (hasTaskMention && hasAgentMention && hasToolMention) {
      conversationStage = 'finalization';
      confidence = 0.9;
    } else if (hasAgentMention && hasToolMention) {
      conversationStage = 'agent_configuration';
      confidence = 0.8;
    } else if (hasTeamMention || hasAgentMention) {
      conversationStage = 'team_discussion';
      confidence = 0.7;
    }
    
    // 🚨 CRITICAL: Generate FRESH Autogen structure based ONLY on current conversation
    // Do NOT use currentStructure as a template - analyze from scratch
    const teamStructure: TeamStructure = {
      provider: determineTeamType(conversationText),
      component_type: "team",
      version: 1,
      component_version: 1,
      description: extractTeamDescription(conversationText, userIndustry),
      label: extractTeamName(conversationText, userIndustry),
      config: {
        participants: generateParticipants(conversationText, userIndustry, userFocusAreas),
        model_client: {
          provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
          component_type: "model",
          version: 1,
          component_version: 1,
          description: "Chat completion client for OpenAI hosted models.",
          label: "OpenAIChatCompletionClient",
          config: {
            model: "gpt-4o-mini"
          }
        },
        termination_condition: {
          provider: "autogen_agentchat.base.OrTerminationCondition",
          component_type: "termination",
          version: 1,
          component_version: 1,
          label: "OrTerminationCondition",
          config: {
            conditions: [
              {
                provider: "autogen_agentchat.conditions.TextMentionTermination",
                component_type: "termination",
                version: 1,
                component_version: 1,
                description: "Terminate the conversation if a specific text is mentioned.",
                label: "TextMentionTermination",
                config: {
                  text: "TERMINATE"
                }
              },
              {
                provider: "autogen_agentchat.conditions.MaxMessageTermination",
                component_type: "termination",
                version: 1,
                component_version: 1,
                description: "Terminate the conversation after a maximum number of messages have been exchanged.",
                label: "MaxMessageTermination",
                config: {
                  max_messages: 10,
                  include_agent_event: false
                }
              }
            ]
          }
        }
      }
    };
    
    console.log('✅ Generated FRESH Autogen structure:', {
      teamName: teamStructure.label,
      teamType: teamStructure.provider.split('.').pop(),
      participantCount: teamStructure.config.participants.length,
      stage: conversationStage,
      confidence
    });
    
    return {
      teamStructure,
      conversationStage,
      confidence,
      reasoning: `Analyzed ${messages.length} messages and generated fresh structure for ${conversationStage} stage with ${confidence * 100}% confidence`
    };
    
  } catch (error) {
    console.error('Error in Anthropic analysis:', error);
    throw new Error('Failed to analyze conversation');
  }
};

const determineTeamType = (conversationText: string): string => {
  // Enhanced team type analysis with new types
  
  // Check for specific team type mentions
  if (/selector|select.*speaker|dynamic.*selection|llm.*select/i.test(conversationText)) {
    return "autogen_agentchat.teams.SelectorGroupChat";
  }
  
  if (/magnetic.*one|magenticone|generalist|web.*task|file.*task/i.test(conversationText)) {
    return "autogen_agentchat.teams.MagenticOneGroupChat";
  }
  
  if (/swarm|handoff|transition|explicit.*control/i.test(conversationText)) {
    return "autogen_agentchat.teams.Swarm";
  }
  
  if (/graph.*flow|complex.*workflow|branch|loop|conditional/i.test(conversationText)) {
    return "autogen_agentchat.teams.GraphFlow";
  }

  // Default to RoundRobin for most use cases
  return "autogen_agentchat.teams.RoundRobinGroupChat";
};

const extractTeamName = (conversationText: string, userIndustry?: string): string => {
  // Extract team name from conversation or generate based on industry
  const industryMap: Record<string, string> = {
    'finance': 'Financial Analysis Team',
    'healthcare': 'Healthcare Support Team',
    'retail': 'Customer Service Team',
    'manufacturing': 'Operations Team',
    'technology': 'Development Team',
    'consulting': 'Advisory Team',
    'utilities': 'Utilities Management Team',
    'resources energy': 'Energy Operations Team',
    'petrochemical': 'Process Optimization Team'
  };
  
  // Look for explicit team names in conversation
  const teamNameMatch = conversationText.match(/(?:team|group)\s+(?:called|named|for)\s+([^.!?]+)/i);
  if (teamNameMatch) {
    return teamNameMatch[1].trim();
  }
  
  // Look for specific task mentions
  if (/customer.?support|help.?desk|service/i.test(conversationText)) {
    return 'Customer Support Team';
  }
  if (/analyz|data|insight/i.test(conversationText)) {
    return 'Analysis Team';
  }
  if (/market|sales|revenue/i.test(conversationText)) {
    return 'Business Intelligence Team';
  }
  
  return industryMap[userIndustry || ''] || 'AI Agents Team';
};

const extractTeamDescription = (conversationText: string, userIndustry?: string): string => {
  // Extract purpose from conversation
  const purposeMatch = conversationText.match(/(?:for|to|that)\s+([^.!?]+(?:analyz|help|assist|process|manage|handle)[^.!?]*)/i);
  if (purposeMatch) {
    return purposeMatch[1].trim();
  }
  
  // Look for specific task descriptions
  if (/customer.?support|help.?desk/i.test(conversationText)) {
    return 'Handle customer inquiries and provide support assistance';
  }
  if (/analyz.*data|data.*analyz/i.test(conversationText)) {
    return 'Analyze data and provide actionable insights';
  }
  if (/ticket|categoriz|priorit/i.test(conversationText)) {
    return 'Categorize and prioritize incoming requests';
  }
  
  const industryDescriptions: Record<string, string> = {
    'finance': 'Analyze financial data and provide insights for decision making',
    'healthcare': 'Assist with patient care and medical information processing',
    'retail': 'Handle customer inquiries and optimize shopping experience',
    'manufacturing': 'Optimize production processes and quality control',
    'technology': 'Support software development and technical operations',
    'consulting': 'Provide strategic advice and analysis for business decisions',
    'utilities': 'Manage utility operations and customer service',
    'resources energy': 'Optimize energy operations and resource management',
    'petrochemical': 'Optimize chemical processes and ensure safety compliance'
  };
  
  return industryDescriptions[userIndustry || ''] || 'Process user requests and provide intelligent assistance';
};

const generateParticipants = (conversationText: string, userIndustry?: string, userFocusAreas?: string[]) => {
  const participants = [];
  
  // Always include an assistant agent
  participants.push({
    provider: "autogen_agentchat.agents.AssistantAgent",
    component_type: "agent",
    version: 1,
    component_version: 1,
    description: "Main assistant agent that coordinates team activities",
    label: "AssistantAgent",
    config: {
      name: "assistant_agent",
      model_client: {
        provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
        component_type: "model",
        version: 1,
        component_version: 1,
        description: "Chat completion client for OpenAI hosted models.",
        label: "OpenAIChatCompletionClient",
        config: {
          model: "gpt-4o-mini"
        }
      },
      tools: [
        {
          provider: "autogen_core.tools.FunctionTool",
          component_type: "tool",
          version: 1,
          component_version: 1,
          description: "Create custom tools by wrapping standard Python functions.",
          label: "FunctionTool",
          config: {
            source_code: "def analyzer(data: str) -> str",
            name: "analyzer",
            description: "Analyze data and provide insights",
            global_imports: [],
            has_cancellation_support: false
          }
        }
      ],
      model_context: {
        provider: "autogen_core.model_context.UnboundedChatCompletionContext",
        component_type: "chat_completion_context",
        version: 1,
        component_version: 1,
        description: "An unbounded chat completion context that keeps a view of the all the messages.",
        label: "UnboundedChatCompletionContext",
        config: {}
      },
      description: "An agent that provides assistance with ability to use tools.",
      system_message: "You are a helpful assistant. Solve tasks carefully. When done, say TERMINATE.",
      model_client_stream: false,
      reflect_on_tool_use: false,
      tool_call_summary_format: "{result}"
    }
  });
  
  // Add a user proxy agent
  participants.push({
    provider: "autogen_agentchat.agents.UserProxyAgent",
    component_type: "agent",
    version: 1,
    component_version: 1,
    description: "An agent that can represent a human user through an input function.",
    label: "UserProxyAgent",
    config: {
      name: "user_proxy",
      description: "A human user that provides input and feedback to the team"
    }
  });
  
  // Generate agents based on conversation content and focus areas
  const agentTypes = determineAgentTypes(conversationText, userIndustry, userFocusAreas);
  
  agentTypes.forEach((agentType, index) => {
    participants.push({
      provider: "autogen_agentchat.agents.AssistantAgent",
      component_type: "agent",
      version: 1,
      component_version: 1,
      description: agentType.description,
      label: agentType.name,
      config: {
        name: agentType.name.toLowerCase().replace(/\s+/g, '_'),
        model_client: {
          provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
          component_type: "model",
          version: 1,
          component_version: 1,
          description: "Chat completion client for OpenAI hosted models.",
          label: "OpenAIChatCompletionClient",
          config: {
            model: "gpt-4o-mini"
          }
        },
        tools: agentType.tools,
        model_context: {
          provider: "autogen_core.model_context.UnboundedChatCompletionContext",
          component_type: "chat_completion_context",
          version: 1,
          component_version: 1,
          description: "An unbounded chat completion context that keeps a view of the all the messages.",
          label: "UnboundedChatCompletionContext",
          config: {}
        },
        description: agentType.description,
        system_message: agentType.systemMessage,
        model_client_stream: false,
        reflect_on_tool_use: false,
        tool_call_summary_format: "{result}"
      }
    });
  });
  
  return participants;
};

const determineAgentTypes = (conversationText: string, userIndustry?: string, userFocusAreas?: string[]) => {
  const agentTypes = [];
  
  // Analyze conversation for specific agent needs
  if (/customer.?support|ticket|help.?desk/i.test(conversationText)) {
    agentTypes.push({
      name: "CustomerSupportAgent",
      description: "Specialized agent for handling customer support requests",
      systemMessage: "You are a customer support specialist. Help resolve customer issues efficiently.",
      tools: [
        {
          provider: "autogen_core.tools.FunctionTool",
          component_type: "tool",
          version: 1,
          component_version: 1,
          description: "Ticket analysis and categorization tool",
          label: "TicketAnalyzer",
          config: {
            source_code: "def analyze_ticket(content: str) -> dict",
            name: "analyze_ticket",
            description: "Analyze and categorize support tickets",
            global_imports: [],
            has_cancellation_support: false
          }
        }
      ]
    });
  }
  
  if (/analyz|data|insight|report/i.test(conversationText)) {
    agentTypes.push({
      name: "DataAnalysisAgent",
      description: "Specialized agent for data analysis and insights generation",
      systemMessage: "You are a data analysis expert. Analyze data and provide actionable insights.",
      tools: [
        {
          provider: "autogen_core.tools.FunctionTool",
          component_type: "tool",
          version: 1,
          component_version: 1,
          description: "Data processing and analysis tool",
          label: "DataProcessor",
          config: {
            source_code: "def process_data(data: str) -> dict",
            name: "process_data",
            description: "Process and analyze data",
            global_imports: [],
            has_cancellation_support: false
          }
        }
      ]
    });
  }
  
  // Add industry-specific agents based on focus areas
  if (userFocusAreas && userFocusAreas.length > 0) {
    userFocusAreas.slice(0, 1).forEach((focusArea) => {
      const agentName = focusArea.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + 'Agent';
      agentTypes.push({
        name: agentName,
        description: `Specialized agent for ${focusArea.replace(/_/g, ' ')} operations`,
        systemMessage: `You are a ${focusArea.replace(/_/g, ' ')} specialist. Focus on ${focusArea.replace(/_/g, ' ')} related tasks.`,
        tools: [
          {
            provider: "autogen_core.tools.FunctionTool",
            component_type: "tool",
            version: 1,
            component_version: 1,
            description: `Specialized tool for ${focusArea.replace(/_/g, ' ')}`,
            label: "SpecializedTool",
            config: {
              source_code: `def ${focusArea}_processor(input: str) -> str`,
              name: `${focusArea}_processor`,
              description: `Process ${focusArea.replace(/_/g, ' ')} related tasks`,
              global_imports: [],
              has_cancellation_support: false
            }
          }
        ]
      });
    });
  }
  
  // Ensure we have at least one specialized agent
  if (agentTypes.length === 0) {
    agentTypes.push({
      name: "SpecialistAgent",
      description: "General purpose specialist agent for task execution",
      systemMessage: "You are a specialist agent. Execute tasks efficiently and provide detailed responses.",
      tools: [
        {
          provider: "autogen_core.tools.FunctionTool",
          component_type: "tool",
          version: 1,
          component_version: 1,
          description: "General purpose task processor",
          label: "TaskProcessor",
          config: {
            source_code: "def process_task(task: str) -> str",
            name: "process_task",
            description: "Process general tasks",
            global_imports: [],
            has_cancellation_support: false
          }
        }
      ]
    });
  }
  
  return agentTypes;
};