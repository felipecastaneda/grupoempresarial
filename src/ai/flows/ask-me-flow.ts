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

// In a real application, this content would be fetched from a database or a file store.
const DATA_SECURITY_POLICY = `
1. Introduction
This policy outlines the procedures and mechanisms to ensure the security of AppIntel Hub's data assets. All employees, contractors, and partners are required to adhere to these guidelines.

2. Data Classification
Data is classified into three levels: Public, Internal, and Confidential.
- Public: Information intended for public consumption.
- Internal: Information for company-wide access, but not for external distribution.
- Confidential: Sensitive data with restricted access, such as customer PII, financial records, and source code.

3. Access Control
- Access to data is granted on a "need-to-know" basis.
- Strong, unique passwords are required for all systems.
- Two-factor authentication (2FA) must be enabled where available.

4. Data Handling
- Confidential data must not be stored on personal devices or unapproved cloud services.
- All devices storing confidential data must be encrypted.
- When sharing data, use company-approved secure channels.

5. Incident Response
- Any suspected data breach or security incident must be reported immediately to the IT department.
- The incident response team will investigate and take appropriate action to mitigate the impact.
`;

const AskMeInputSchema = z.object({
  question: z.string().describe("The user's question."),
});
export type AskMeInput = z.infer<typeof AskMeInputSchema>;

const AskMeOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the question."),
});
export type AskMeOutput = z.infer<typeof AskMeOutputSchema>;

export async function askMe(input: AskMeInput): Promise<AskMeOutput> {
  return askMeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askMePrompt',
  input: {schema: AskMeInputSchema},
  output: {schema: AskMeOutputSchema},
  prompt: `You are an AI assistant for AppIntel Hub. Your role is to answer questions based *only* on the information provided in the company policies.

If a question is outside the scope of the provided policy, you must state that you do not have information on that topic. Do not make up answers.

Here is the Data Security Policy:
---
${DATA_SECURITY_POLICY}
---

New question from user: "{{question}}"

Based on the policy, provide an answer to the user's new question.`,
});

const askMeFlow = ai.defineFlow(
  {
    name: 'askMeFlow',
    inputSchema: AskMeInputSchema,
    outputSchema: AskMeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
