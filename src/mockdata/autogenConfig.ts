// Team Types
export const teamTypes = [
  {
    id: 'roundrobin',
    name: "RoundRobinGroupChat",
    desc: "Sends messages to agents one at a time in round-robin order",
    provider: "autogen_agentchat.teams.RoundRobinGroupChat",
    component_type: "team",
    version: 1
  },
  {
    id: 'broadcast',
    name: "BroadcastGroupChat",
    desc: "Sends the same message to all agents at once",
    provider: "autogen_agentchat.teams.BroadcastGroupChat",
    component_type: "team",
    version: 1
  },
  {
    id: 'hierarchical',
    name: "HierarchicalGroupChat",
    desc: "Sends message based on predefined roles or hierarchy",
    provider: "autogen_agentchat.teams.HierarchicalGroupChat",
    component_type: "team",
    version: 1
  },
  {
    id: 'cascading',
    name: "CascadingGroupChat",
    desc: "Tries each agent in sequence until one can handle the task",
    provider: "autogen_agentchat.teams.CascadingGroupChat",
    component_type: "team",
    version: 1
  },
  {
    id: 'concurrent',
    name: "ConcurrentGroupChat",
    desc: "Allows agents to operate in parallel and aggregate their responses",
    provider: "autogen_agentchat.teams.ConcurrentGroupChat",
    component_type: "team",
    version: 1
  }
];

// Agent Types
export const agentTypes = [
  {
    id: 'assistant',
    name: "AssistantAgent",
    desc: "General-purpose assistant agent (e.g., LLM-backed)",
    provider: "autogen_agentchat.agents.AssistantAgent",
    component_type: "agent",
    version: 1,
    requiresLLM: true,
    requiresTools: true,
    recommendedModel: 'gpt4',
    config: {
      name: "assistant",
      system_message: "You are a helpful assistant. Solve tasks carefully.",
      description: "An agent that provides assistance with ability to use tools."
    }
  },
  {
    id: 'userproxy',
    name: "UserProxyAgent",
    desc: "Simulates a human user (great for human-in-the-loop)",
    provider: "autogen_agentchat.agents.UserProxyAgent",
    component_type: "agent",
    version: 1,
    requiresLLM: false,
    requiresTools: false,
    recommendedModel: null,
    config: {
      name: "user_proxy",
      description: "An agent that represents a human user through an input function without ability to use tools."
    }
  },
  {
    id: 'codeinterpreter',
    name: "CodeInterpreterAgent",
    desc: "Special agent to run and interpret Python code",
    provider: "autogen_agentchat.agents.CodeInterpreterAgent",
    component_type: "agent",
    version: 1,
    requiresLLM: true,
    requiresTools: true,
    recommendedModel: 'gpt4',
    config: {
      name: "code_interpreter",
      description: "An agent that can write and execute Python code, and have capabilities using tools"
    }
  },
  {
    id: 'websearch',
    name: "WebSearchAgent",
    desc: "Agent that can use web search as a tool",
    provider: "autogen_agentchat.agents.WebSearchAgent",
    component_type: "agent",
    version: 1,
    requiresLLM: true,
    requiresTools: true,
    recommendedModel: 'llama3',
    config: {
      name: "web_searcher",
      description: "An agent that can search the web for information."
    }
  },
  {
    id: 'openai',
    name: "OpenAIAPIWrapperAgent",
    desc: "Custom wrapper around OpenAI LLMs",
    provider: "autogen_agentchat.agents.OpenAIAPIWrapperAgent",
    component_type: "agent",
    version: 1,
    requiresLLM: true,
    requiresTools: true,
    recommendedModel: 'gpt4',
    config: {
      name: "openai_wrapper",
      description: "An agent that provides a wrapper around OpenAI's API."
    }
  },
  {
    id: 'retrieval',
    name: "RetrievalAgent",
    desc: "Agent that performs RAG-style retrieval from documents",
    provider: "autogen_agentchat.agents.RetrievalAgent",
    component_type: "agent",
    version: 1,
    requiresLLM: true,
    requiresTools: true,
    recommendedModel: 'claude3',
    config: {
      name: "retrieval_agent",
      description: "An agent that can retrieve and process information from documents."
    }
  }
];

// Models
export const models = [
  {
    id: 'gpt4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Best for complex reasoning and analysis',
    config: {
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 2000
    }
  },
  {
    id: 'claude3',
    name: 'Claude 3',
    provider: 'Anthropic',
    description: 'Excellent for technical and analytical tasks',
    config: {
      model: "claude-3-opus-20240229",
      temperature: 0.7,
      max_tokens: 4000
    }
  },
  {
    id: 'llama3',
    name: 'Llama 3',
    provider: 'Meta',
    description: 'Good for general-purpose tasks',
    config: {
      model: "llama-3-70b",
      temperature: 0.7,
      max_tokens: 2000
    }
  },
  {
    id: 'mistral',
    name: 'Mistral',
    provider: 'Mistral AI',
    description: 'Efficient for straightforward tasks',
    config: {
      model: "mistral-large-latest",
      temperature: 0.7,
      max_tokens: 2000
    }
  }
];

// Tools
export const tools = [
  {
    id: 'websearch',
    name: "Web Search",
    desc: "Search and retrieve information from the internet",
    provider: "autogen_core.tools.WebSearchTool",
    component_type: "tool",
    version: 1,
    config: {
      tool_items: [
        {
          id: 'google',
          name: 'Google Search',
          description: 'Search using Google Search API',
          isDefault: true,
          attributes: {
            maxResults: 10,
            timeout: 10,
            maxRetries: 2
          }
        },
        {
          id: 'bing',
          name: 'Bing Search',
          description: 'Search using Bing Search API',
          attributes: {
            maxResults: 10,
            timeout: 10,
            maxRetries: 2
          }
        },
        {
          id: 'tiktok',
          name: 'TikTok Search',
          description: 'Search TikTok content',
          attributes: {
            maxResults: 5,
            timeout: 15,
            maxRetries: 2
          }
        }
      ],
      defaultItem: 'google',
      globalAttributes: {
        timeout: 10,
        maxRetries: 2
      }
    }
  },
  {
    id: 'database',
    name: "Database Connector",
    desc: "Connect to and query databases",
    provider: "autogen_core.tools.DatabaseTool",
    component_type: "tool",
    version: 1,
    config: {
      tool_items: [
        {
          id: 'snowflake',
          name: 'Snowflake',
          description: 'Connect to Snowflake data warehouse',
          isDefault: true,
          attributes: {
            requiresAuth: true,
            maxConnections: 5,
            timeout: 30,
            maxRetries: 3
          }
        },
        {
          id: 'databricks',
          name: 'Databricks',
          description: 'Connect to Databricks workspace',
          attributes: {
            requiresAuth: true,
            maxConnections: 3,
            timeout: 30,
            maxRetries: 3
          }
        },
        {
          id: 'sap_dwc',
          name: 'SAP DWC',
          description: 'Connect to SAP Data Warehouse Cloud',
          attributes: {
            requiresAuth: true,
            maxConnections: 2,
            timeout: 45,
            maxRetries: 2
          }
        },
        {
          id: 'sqlserver',
          name: 'SQL Server',
          description: 'Connect to Microsoft SQL Server',
          attributes: {
            requiresAuth: true,
            maxConnections: 10,
            timeout: 30,
            maxRetries: 3
          }
        },
        {
          id: 'bigquery',
          name: 'Google BigQuery',
          description: 'Connect to Google BigQuery',
          attributes: {
            requiresAuth: true,
            maxConnections: 5,
            timeout: 60,
            maxRetries: 3
          }
        },
        {
          id: 'workday',
          name: 'Workday',
          description: 'Connect to Workday analytics',
          attributes: {
            requiresAuth: true,
            maxConnections: 2,
            timeout: 30,
            maxRetries: 2
          }
        },
        {
          id: 'oracle_erp',
          name: 'Oracle ERP',
          description: 'Connect to Oracle ERP Cloud',
          attributes: {
            requiresAuth: true,
            maxConnections: 3,
            timeout: 45,
            maxRetries: 3
          }
        }
      ],
      defaultItem: 'snowflake',
      globalAttributes: {
        maxRows: 1000,
        timeout: 30,
        maxRetries: 3
      }
    }
  },
  {
    id: 'codeinterpreter',
    name: "Code Interpreter",
    desc: "Execute and analyze code",
    provider: "autogen_core.tools.CodeInterpreterTool",
    component_type: "tool",
    version: 1,
    config: {
      allowed_languages: ["python", "javascript", "typescript"],
      sandbox_mode: true
    }
  },
  {
    id: 'document',
    name: "Document Reader",
    desc: "Parse and analyze documents",
    provider: "autogen_core.tools.DocumentTool",
    component_type: "tool",
    version: 1,
    config: {
      supported_formats: ["pdf", "docx", "txt"],
      max_file_size: 10000000
    }
  },
  {
    id: 'api',
    name: "API Client",
    desc: "Make API calls to external services",
    provider: "autogen_core.tools.APITool",
    component_type: "tool",
    version: 1,
    config: {
      timeout: 30,
      max_retries: 3
    }
  }
];

// Termination Types
export const terminationTypes = [
  {
    id: 'auto',
    name: "Auto Termination",
    desc: "Stops if agent returns is_termination_msg=True",
    provider: "autogen_core.termination.AutoTermination",
    component_type: "termination",
    version: 1,
    config: {
      auto_terminate: true
    }
  },
  {
    id: 'max_round',
    name: "Max Round Termination",
    desc: "Stops after specified number of turns",
    provider: "autogen_core.termination.MaxRoundTermination",
    component_type: "termination",
    version: 1,
    config: {
      max_round: 10
    }
  },
  {
    id: 'manual',
    name: "Manual Termination",
    desc: "Stopped by user or custom logic",
    provider: "autogen_core.termination.ManualTermination",
    component_type: "termination",
    version: 1,
    config: {
      require_user_input: true
    }
  },
  {
    id: 'agent_initiated',
    name: "Agent-Initiated Termination",
    desc: "Agent returns is_termination_msg=True when done",
    provider: "autogen_core.termination.AgentInitiatedTermination",
    component_type: "termination",
    version: 1,
    config: {
      termination_message: "TASK_COMPLETE"
    }
  }
];

// Export all configurations
export const autogenConfig = {
  teamTypes,
  agentTypes,
  models,
  tools,
  terminationTypes
};