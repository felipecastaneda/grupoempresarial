
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

const DATA_SECURITY_POLICY_URL = 'https://firebasestorage.googleapis.com/v0/b/company-website-ba4a8.firebasestorage.app/o/policies_procedures%2FData%20Security%20Policy.pdf?alt=media&token=77a13b9f-03dd-426c-b0af-0bc84a4fc5e1';

// Input from the client is just the question.
const ClientInputSchema = z.object({
  question: z.string().describe("The user's question."),
});
export type AskMeInput = z.infer<typeof ClientInputSchema>;

// The prompt will need the question and the policy text.
const PromptInputSchema = z.object({
  question: z.string().describe("The user's question."),
  policyText: z.string().describe("The text content of the policy document."),
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
  prompt: `You are an AI assistant for AppIntel Hub. Your role is to answer questions based *only* on the information provided in the company policy document.

If a question is outside the scope of the provided policy, you must state that you do not have information on that topic. Do not make up answers.

Here is the policy document:
---
{{policyText}}
---

New question from user: "{{question}}"

Based on the policy, provide an answer to the user's new question.`,
});

const askMeFlow = ai.defineFlow(
  {
    name: 'askMeFlow',
    inputSchema: ClientInputSchema,
    outputSchema: AskMeOutputSchema,
  },
  async (input) => {
    // 1. Fetch the PDF from Firebase Storage.
    const response = await fetch(DATA_SECURITY_POLICY_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }
    const pdfBuffer = await response.arrayBuffer();

    // 2. Parse the PDF to extract text content.
    const data = await pdf(Buffer.from(pdfBuffer));
    const policyText = data.text;

    // 3. Call the prompt with the question and the extracted text.
    const { output } = await prompt({
        question: input.question,
        policyText: policyText,
    });
    return output!;
  }
);
