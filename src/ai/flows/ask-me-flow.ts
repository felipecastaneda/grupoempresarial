
'use server';
/**
 * @fileOverview An AI agent for answering questions about company policies.
 *
 * - askMe - A function that answers questions based on provided policy documents.
 * - AskMeInput - The input type for the askMe function.
 * - AskMeOutput - The return type for the askMe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import pdf from 'pdf-parse';
import { policies } from '@/lib/data';

// Input from the client is just the question.
const ClientInputSchema = z.object({
  question: z.string().describe("The user's question."),
});
export type AskMeInput = z.infer<typeof ClientInputSchema>;

// The prompt will need the question and the combined policies text.
const PromptInputSchema = z.object({
  question: z.string().describe("The user's question."),
  policiesText: z.string().describe("The text content of all policy documents combined."),
});

const AskMeOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the question."),
});
export type AskMeOutput = z.infer<typeof AskMeOutputSchema>;

// The exported function that the client calls.
export async function askMe(input: AskMeInput): Promise<AskMeOutput> {
  return askMeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askMePrompt',
  input: {schema: PromptInputSchema},
  output: {schema: AskMeOutputSchema},
  prompt: `You are an AI assistant for AppIntel Hub. Your role is to answer questions based *only* on the information provided in the company policy documents.

If a question is outside the scope of the provided policies, you must state that you do not have information on that topic. Do not make up answers.

Here are the policy documents:
---
{{policiesText}}
---

New question from user: "{{question}}"

Based on the policies, provide an answer to the user's new question.`,
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

    // 3. Call the prompt with the question and the combined text.
    const { output } = await prompt({
        question: input.question,
        policiesText: policiesText,
    });
    return output!;
  }
);
