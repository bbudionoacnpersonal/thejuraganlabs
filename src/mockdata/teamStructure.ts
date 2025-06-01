import { TeamStructure } from '@/types';

export const teamStructure: TeamStructure = {
  provider: "autogen_agentchat.teams.RoundRobinGroupChat",
  component_type: "team",
  version: 1,
  component_version: 1,
  description: "You're an agent that help customer serice address customer inquiries.",
  label: "Customer Service",
  config: {
    participants: [
      {
        provider: "autogen_agentchat.agents.AssistantAgent",
        component_type: "agent",
        version: 1,
        component_version: 1,
        description: "You're an agent that can create a html code",
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
                source_code: "def calculator(a: float, b: float, operator: str)",
                name: "calculator",
                description: "A simple calculator that performs basic arithmetic operations",
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
      },
      {
        provider: "autogen_agentchat.agents.UserProxyAgent",
        component_type: "agent",
        version: 1,
        component_version: 1,
        description: "An agent that can represent a human user through an input function.",
        label: "UserProxyAgent",
        config: {
          name: "user_proxy",
          description: "a human user that should be consulted only when the assistant_agent is unable to verify the information provided by the websurfer_agent"
        }
      }
    ],
    model_client: {
      provider: "autogen_ext.models.openai.OpenAIChatCompletionClient",
      component_type: "model",
      version: 1,
      component_version: 1,
      description: "gemini-2.0-flash",
      label: "gemini-2.0-flash",
      config: {
        model: "gemini-2.0-flash",
        api_key: "AIzaSyBS6FGKhuma72kePrx6bbt29qhnzFpPTWs",
        base_url: "https://generativelanguage.googleapis.com/v1beta/openai"
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
              max_messages: 2,
              include_agent_event: false
            }
          }
        ]
      }
    }
  }
};