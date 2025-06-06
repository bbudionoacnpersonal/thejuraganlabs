// Anthropic AI service for analyzing conversation messages and extracting Autogen structure
import { TeamStructure } from '@/types';

interface AnalysisResult {
  teamStructure?: TeamStructure;
  conversationStage: 'initial' | 'team_discussion' | 'agent_configuration' | 'finalization';
  confidence: number;
  reasoning: string;
}

export const analyzeConversationForAutogenStructure = async (
  messages: string[],
  currentStructure?: TeamStructure,
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
    
    // Generate realistic Autogen structure based on conversation
    const teamStructure: TeamStructure = {
      provider: "autogen_agentchat.teams.RoundRobinGroupChat",
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
    
    return {
      teamStructure,
      conversationStage,
      confidence,
      reasoning: `Analyzed ${messages.length} messages and identified ${conversationStage} stage with ${confidence * 100}% confidence`
    };
    
  } catch (error) {
    console.error('Error in Anthropic analysis:', error);
    throw new Error('Failed to analyze conversation');
  }
};

const extractTeamName = (conversationText: string, userIndustry?: string): string => {
  // Extract team name from conversation or generate based on industry
  const industryMap: Record<string, string> = {
    'finance': 'Financial Analysis Team',
    'healthcare': 'Healthcare Support Team',
    'retail': 'Customer Service Team',
    'manufacturing': 'Operations Team',
    'technology': 'Development Team',
    'consulting': 'Advisory Team'
  };
  
  // Look for explicit team names in conversation
  const teamNameMatch = conversationText.match(/(?:team|group)\s+(?:called|named|for)\s+([^.!?]+)/i);
  if (teamNameMatch) {
    return teamNameMatch[1].trim();
  }
  
  return industryMap[userIndustry || ''] || 'AI Agents Team';
};

const extractTeamDescription = (conversationText: string, userIndustry?: string): string => {
  // Extract purpose from conversation
  const purposeMatch = conversationText.match(/(?:for|to|that)\s+([^.!?]+(?:analyz|help|assist|process|manage|handle)[^.!?]*)/i);
  if (purposeMatch) {
    return purposeMatch[1].trim();
  }
  
  const industryDescriptions: Record<string, string> = {
    'finance': 'Analyze financial data and provide insights for decision making',
    'healthcare': 'Assist with patient care and medical information processing',
    'retail': 'Handle customer inquiries and optimize shopping experience',
    'manufacturing': 'Optimize production processes and quality control',
    'technology': 'Support software development and technical operations',
    'consulting': 'Provide strategic advice and analysis for business decisions'
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
  
  // Add industry-specific agents based on focus areas
  if (userFocusAreas && userFocusAreas.length > 0) {
    userFocusAreas.slice(0, 2).forEach((focusArea, index) => {
      const agentName = focusArea.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      participants.push({
        provider: "autogen_agentchat.agents.AssistantAgent",
        component_type: "agent",
        version: 1,
        component_version: 1,
        description: `Specialized agent for ${agentName.toLowerCase()} tasks`,
        label: `${agentName}Agent`,
        config: {
          name: `${focusArea}_agent`,
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
              description: `Specialized tool for ${agentName.toLowerCase()}`,
              label: "FunctionTool",
              config: {
                source_code: `def ${focusArea}_processor(input: str) -> str`,
                name: `${focusArea}_processor`,
                description: `Process ${agentName.toLowerCase()} related tasks`,
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
          description: `Specialized agent for ${agentName.toLowerCase()} operations`,
          system_message: `You are a ${agentName.toLowerCase()} specialist. Focus on ${agentName.toLowerCase()} related tasks.`,
          model_client_stream: false,
          reflect_on_tool_use: false,
          tool_call_summary_format: "{result}"
        }
      });
    });
  }
  
  return participants;
};