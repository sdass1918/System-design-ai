// In production (Vercel): hits the /api/chat serverless function
// In development (Vite):  proxied to the NVIDIA API via vite.config.ts
const NIM_API_URL = "/api/chat";
const MODEL = "meta/llama-3.3-70b-instruct";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are an expert system design tutor who uses the Socratic method. You receive system design diagrams represented as JSON (nodes and edges from a ReactFlow canvas).

Your approach:
1. When you first receive a diagram, briefly acknowledge what you see — the components and their connections.
2. Instead of immediately telling the user what's wrong or what to add, ASK PROBING QUESTIONS that guide them to discover improvements on their own. For example:
   - "What happens if your load balancer goes down? How would you handle that?"
   - "I see you have a single database. What would happen under heavy read traffic?"
   - "How will data flow between these two services? Have you considered the consistency model?"
3. After the user responds, acknowledge their thinking, then ask a deeper follow-up question or gently suggest an area they might have missed.
4. Only provide direct suggestions if the user is stuck after 2-3 hints.
5. Keep your responses concise and focused — one or two questions at a time.
6. Use markdown formatting for clarity (bold for component names, bullet lists for multiple points).

You are friendly, encouraging, and genuinely interested in helping the user learn system design deeply.`;

export async function sendToNIM(
  messages: ChatMessage[]
): Promise<string> {
  const fullMessages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

  const response = await fetch(NIM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: fullMessages,
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 1024,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `API error (${response.status}): ${errorBody}`
    );
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export function buildDiagramPrompt(diagramJson: {
  nodes: unknown[];
  edges: unknown[];
}): string {
  return `Here is my current system design diagram:

\`\`\`json
${JSON.stringify(diagramJson, null, 2)}
\`\`\`

Please analyze this diagram and help me improve it using the Socratic method. Start by telling me what you see, then ask me questions that will help me think about potential improvements.`;
}
