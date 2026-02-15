
'use server';
/**
 * @fileOverview An AI agent for answering questions about company policies and site navigation.
 *
 * - askMe - A function that answers questions based on provided policy documents and site structure.
 * - AskMeInput - The input type for the askMe function.
 * - AskMeOutput - The return type for the askMe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import pdf from 'pdf-parse';
import { policies, projects } from '@/lib/data';

// Input from the client is just the question.
const ClientInputSchema = z.object({
  question: z.string().describe("The user's question."),
});
export type AskMeInput = z.infer<typeof ClientInputSchema>;

// The prompt will need the question and the combined policies text.
const PromptInputSchema = z.object({
  question: z.string().describe("The user's question."),
  policiesText: z.string().describe("The text content of all policy documents combined."),
  projectsText: z.string().describe("A summary of all current company projects."),
});

const AskMeOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the question."),
});
export type AskMeOutput = z.infer<typeof AskMeOutputSchema>;

// The exported function that the client calls.
export async function askMe(input: AskMeInput): Promise<AskMeOutput> {
  return askMeFlow(input);
}

const pageRoutes = {
    'dashboard': '/dashboard',
    'announcements': '/dashboard/announcements',
    'payroll': '/dashboard/payroll',
    'directory': '/dashboard/directory',
    'documents': '/dashboard/documents',
    'current projects': '/dashboard/current-projects',
    'performance': '/dashboard/performance',
    'policies and procedures': '/dashboard/policies-and-procedures',
    'ask me': '/dashboard/askme',
    'users': '/dashboard/users'
};

const getInternalLink = ai.defineTool(
    {
      name: 'getInternalLink',
      description: 'Returns the internal URL for a specific page within the AppIntel Hub website. Use this when a user asks for a link or where to find a specific page or information.',
      inputSchema: z.object({
        pageName: z.string().describe('The name of the page to get the link for (e.g., "Payroll", "Directory"). Should be lowercase.'),
      }),
      outputSchema: z.string().describe('The full URL of the page.'),
    },
    async ({ pageName }) => {
      const path = pageRoutes[pageName.toLowerCase() as keyof typeof pageRoutes];
      if (path) {
        // In a real app, this base URL should come from an environment variable.
        return `https://applicationintelligence.ai${path}`;
      }
      return 'Sorry, I could not find a link for that page.';
    }
);


const prompt = ai.definePrompt({
  name: 'askMePrompt',
  input: {schema: PromptInputSchema},
  output: {schema: AskMeOutputSchema},
  tools: [getInternalLink],
  prompt: `You are an AI assistant for AppIntel Hub. Your role is to answer questions based *only* on the information provided in the company policy documents, the current project list, and the available tools.

If a user asks where to find a page or for a link to a section of the website (like "payroll" or "directory"), you MUST use the 'getInternalLink' tool to provide the correct URL. When you use the tool, format your answer like this: "You can find that information on the [Page Name] page, or by visiting [URL]."

If a user asks about current projects, use the provided project list to summarize them.

If a question is about policies, use the documents provided. If a question is outside the scope of the provided policies, projects, or tools, you must state that you do not have information on that topic. Do not make up answers.

Here are the policy documents:
---
{{policiesText}}
---

Here is the list of current projects:
---
{{projectsText}}
---

New question from user: "{{question}}"

Based on the policies, projects, and available tools, provide an answer to the user's new question.`,
});

const askMeFlow = ai.defineFlow(
  {
    name: 'askMeFlow',
    inputSchema: ClientInputSchema,
    outputSchema: AskMeOutputSchema,
  },
  async (input) => {
    // 1. Fetch and parse all policy PDFs in parallel.
    const policyPromises = policies.map(async (policy) => {
      if (!policy.pdfUrl) return null;
      try {
        const response = await fetch(policy.pdfUrl);
        if (!response.ok) {
          console.error(`Failed to fetch PDF for "${policy.title}": ${response.statusText}`);
          return null;
        }
        const pdfBuffer = await response.arrayBuffer();
        const data = await pdf(Buffer.from(pdfBuffer));
        return { title: policy.title, text: data.text };
      } catch (error) {
        console.error(`Error processing PDF for "${policy.title}":`, error);
        return null;
      }
    });

    const parsedPolicies = (await Promise.all(policyPromises)).filter(p => p !== null);

    // 2. Combine the text from all documents.
    const policiesText = parsedPolicies
      .map(p => `--- Policy: ${p!.title} ---\n${p!.text}`)
      .join('\n\n');
    
    if (!policiesText) {
        return { answer: "I'm sorry, I couldn't load the policy documents. Please try again later." };
    }

    // 3. Combine project data
    const projectsText = projects
        .map(p => `Project: ${p.title}\nDescription: ${p.description}`)
        .join('\n\n');

    // 4. Call the prompt with the question and the combined text.
    // The prompt will automatically use the tool if needed.
    const { output } = await prompt({
        question: input.question,
        policiesText: policiesText,
        projectsText: projectsText,
    });
    return output!;
  }
);
