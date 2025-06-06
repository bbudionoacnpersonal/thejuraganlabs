// Google Gemini AI service for analyzing conversation messages and extracting Autogen structure
import { TeamStructure } from '@/types';

const GEMINI_API_KEY = 'AIzaSyD1S4r1Xz-7E2f8RyQFEehmzuHa7ZrINMM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';

interface AnalysisResult {
  teamStructure?: TeamStructure;
  analysisStage: 'initial' | 'team_identified' | 'agents_emerging' | 'structure_complete';
  progressiveElements: {
    teamName?: string;
    teamDescription?: string;
    teamType?: string;
    identifiedAgents?: Array<{
      name: string;
      description: string;
      role: string;
      confidence: number;
    }>;
  };
  confidence: number;
  reasoning: string;
}

export const analyzeConversationProgressive = async (
  messages: string[],
  currentStructure?: TeamStructure | null
): Promise<AnalysisResult> => {
  try {
    console.log('🔍 Starting Gemini progressive analysis...', {
      messageCount: messages.length,
      hasCurrentStructure: !!currentStructure
    });

    // Create analysis prompt for Gemini
    const analysisPrompt = createGeminiAnalysisPrompt(messages, currentStructure);
    
    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: analysisPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
          responseMimeType: "application/json"
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📥 Gemini API response received:', data);

    // Parse Gemini response
    const analysisResult = parseGeminiResponse(data);
    
    console.log('✅ Gemini analysis completed:', {
      stage: analysisResult.analysisStage,
      hasTeamStructure: !!analysisResult.teamStructure,
      confidence: analysisResult.confidence
    });

    return analysisResult;

  } catch (error) {
    console.error('❌ Gemini analysis failed:', error);
    
    // Return fallback analysis
    return {
      analysisStage: 'initial',
      progressiveElements: {},
      confidence: 0.1,
      reasoning: `Gemini analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

const createGeminiAnalysisPrompt = (messages: string[], currentStructure?: TeamStructure | null): string => {
  const conversationText = messages.join('\n');
  
  return `You are an expert AI system analyst. Analyze this conversation to progressively build an AutoGen team structure.

CONVERSATION:
${conversationText}

CURRENT STRUCTURE: ${currentStructure ? JSON.stringify(currentStructure, null, 2) : 'None'}

ANALYSIS RULES:
1. Only extract information explicitly mentioned in the conversation
2. Do not add default agents or components
3. Progress through stages: initial → team_identified → agents_emerging → structure_complete
4. Be conservative - only include what's clearly discussed

RESPONSE FORMAT (JSON):
{
  "analysisStage": "initial|team_identified|agents_emerging|structure_complete",
  "progressiveElements": {
    "teamName": "string (only if clearly mentioned)",
    "teamDescription": "string (only if purpose is clear)",
    "teamType": "RoundRobinGroupChat|SelectorGroupChat|MagenticOneGroupChat|Swarm|GraphFlow",
    "identifiedAgents": [
      {
        "name": "string",
        "description": "string", 
        "role": "string",
        "confidence": 0.0-1.0
      }
    ]
  },
  "confidence": 0.0-1.0,
  "reasoning": "string explaining the analysis",
  "teamStructure": {
    // Only include if stage is 'structure_complete'
    "provider": "autogen_agentchat.teams.RoundRobinGroupChat",
    "component_type": "team",
    "version": 1,
    "component_version": 1,
    "description": "string",
    "label": "string",
    "config": {
      "participants": [
        {
          "provider": "autogen_agentchat.agents.AssistantAgent",
          "component_type": "agent",
          "version": 1,
          "component_version": 1,
          "description": "string",
          "label": "string",
          "config": {
            "name": "string",
            "model_client": {
              "provider": "autogen_ext.models.openai.OpenAIChatCompletionClient",
              "component_type": "model",
              "version": 1,
              "component_version": 1,
              "description": "Chat completion client for OpenAI hosted models.",
              "label": "OpenAIChatCompletionClient",
              "config": {
                "model": "gpt-4o-mini"
              }
            },
            "tools": [
              {
                "provider": "autogen_core.tools.FunctionTool",
                "component_type": "tool",
                "version": 1,
                "component_version": 1,
                "description": "string",
                "label": "string",
                "config": {
                  "source_code": "def function_name(param: type) -> type",
                  "name": "string",
                  "description": "string",
                  "global_imports": [],
                  "has_cancellation_support": false
                }
              }
            ],
            "model_context": {
              "provider": "autogen_core.model_context.UnboundedChatCompletionContext",
              "component_type": "chat_completion_context",
              "version": 1,
              "component_version": 1,
              "description": "An unbounded chat completion context that keeps a view of the all the messages.",
              "label": "UnboundedChatCompletionContext",
              "config": {}
            },
            "description": "string",
            "system_message": "string",
            "model_client_stream": false,
            "reflect_on_tool_use": false,
            "tool_call_summary_format": "{result}"
          }
        }
      ],
      "model_client": {
        "provider": "autogen_ext.models.openai.OpenAIChatCompletionClient",
        "component_type": "model",
        "version": 1,
        "component_version": 1,
        "description": "Chat completion client for OpenAI hosted models.",
        "label": "OpenAIChatCompletionClient",
        "config": {
          "model": "gpt-4o-mini"
        }
      },
      "termination_condition": {
        "provider": "autogen_agentchat.base.OrTerminationCondition",
        "component_type": "termination",
        "version": 1,
        "component_version": 1,
        "label": "OrTerminationCondition",
        "config": {
          "conditions": [
            {
              "provider": "autogen_agentchat.conditions.TextMentionTermination",
              "component_type": "termination",
              "version": 1,
              "component_version": 1,
              "description": "Terminate the conversation if a specific text is mentioned.",
              "label": "TextMentionTermination",
              "config": {
                "text": "TERMINATE"
              }
            },
            {
              "provider": "autogen_agentchat.conditions.MaxMessageTermination",
              "component_type": "termination",
              "version": 1,
              "component_version": 1,
              "description": "Terminate the conversation after a maximum number of messages have been exchanged.",
              "label": "MaxMessageTermination",
              "config": {
                "max_messages": 10,
                "include_agent_event": false
              }
            }
          ]
        }
      }
    }
  }
}

TEAM TYPES:
- RoundRobinGroupChat: Agents take turns in sequence
- SelectorGroupChat: LLM selects next speaker dynamically  
- MagenticOneGroupChat: Generalist multi-agent for web/file tasks
- Swarm: HandoffMessage for explicit transitions
- GraphFlow: Complex workflows with branches & loops

Analyze the conversation and respond with valid JSON only.`;
};

const parseGeminiResponse = (data: any): AnalysisResult => {
  try {
    // Extract content from Gemini response structure
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!content) {
      throw new Error('No content in Gemini response');
    }

    console.log('📝 Raw Gemini content:', content);

    // Clean and parse JSON with improved extraction
    let cleanedContent = content.trim();
    
    // Remove markdown formatting if present
    cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Use improved JSON extraction with proper bracket matching
    const jsonResult = extractValidJSON(cleanedContent);
    if (!jsonResult) {
      throw new Error('No valid JSON found in Gemini response');
    }

    const parsed = JSON.parse(jsonResult);
    
    // Validate and structure the response
    const analysisResult: AnalysisResult = {
      analysisStage: parsed.analysisStage || 'initial',
      progressiveElements: parsed.progressiveElements || {},
      confidence: parsed.confidence || 0.5,
      reasoning: parsed.reasoning || 'Gemini analysis completed',
      teamStructure: parsed.teamStructure
    };

    console.log('✅ Parsed Gemini analysis:', {
      stage: analysisResult.analysisStage,
      hasTeamStructure: !!analysisResult.teamStructure,
      elementsCount: Object.keys(analysisResult.progressiveElements).length
    });

    return analysisResult;

  } catch (error) {
    console.error('❌ Error parsing Gemini response:', error);
    
    // Return fallback analysis
    return {
      analysisStage: 'initial',
      progressiveElements: {},
      confidence: 0.1,
      reasoning: `Failed to parse Gemini response: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Improved JSON extraction function with proper bracket matching
const extractValidJSON = (text: string): string | null => {
  try {
    // Find the first opening brace
    const startIndex = text.indexOf('{');
    if (startIndex === -1) {
      return null;
    }

    // Track bracket depth to find the matching closing brace
    let braceCount = 0;
    let inString = false;
    let escapeNext = false;
    
    for (let i = startIndex; i < text.length; i++) {
      const char = text[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"' && !escapeNext) {
        inString = !inString;
        continue;
      }
      
      if (!inString) {
        if (char === '{') {
          braceCount++;
        } else if (char === '}') {
          braceCount--;
          
          // Found the matching closing brace
          if (braceCount === 0) {
            const jsonString = text.substring(startIndex, i + 1);
            
            // Validate that it's parseable JSON
            try {
              JSON.parse(jsonString);
              return jsonString;
            } catch {
              // Continue searching for another valid JSON object
              continue;
            }
          }
        }
      }
    }
    
    // If we couldn't find a complete JSON object, try the original regex as fallback
    const fallbackMatch = text.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
    if (fallbackMatch) {
      try {
        JSON.parse(fallbackMatch[0]);
        return fallbackMatch[0];
      } catch {
        // Fallback failed too
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error in extractValidJSON:', error);
    return null;
  }
};

// Legacy function for backward compatibility
export const analyzeConversationForAutogenStructure = async (
  messages: string[],
  currentStructure?: TeamStructure | null,
  userIndustry?: string,
  userFocusAreas?: string[]
): Promise<AnalysisResult> => {
  console.log('⚠️ Using legacy function - redirecting to progressive analysis');
  return analyzeConversationProgressive(messages, currentStructure);
};