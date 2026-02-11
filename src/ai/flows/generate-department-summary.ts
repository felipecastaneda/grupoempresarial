'use server';

/**
 * @fileOverview An AI agent for generating department performance summaries.
 *
 * - generateDepartmentSummary - A function that generates a summary of a department's performance.
 * - GenerateDepartmentSummaryInput - The input type for the generateDepartmentSummary function.
 * - GenerateDepartmentSummaryOutput - The return type for the generateDepartmentSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDepartmentSummaryInputSchema = z.object({
  departmentName: z.string().describe('The name of the department to summarize.'),
  performanceData: z.string().describe('Performance data from Firestore for the department.'),
});
export type GenerateDepartmentSummaryInput = z.infer<typeof GenerateDepartmentSummaryInputSchema>;

const GenerateDepartmentSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the department performance.'),
});
export type GenerateDepartmentSummaryOutput = z.infer<typeof GenerateDepartmentSummaryOutputSchema>;

export async function generateDepartmentSummary(
  input: GenerateDepartmentSummaryInput
): Promise<GenerateDepartmentSummaryOutput> {
  return generateDepartmentSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDepartmentSummaryPrompt',
  input: {schema: GenerateDepartmentSummaryInputSchema},
  output: {schema: GenerateDepartmentSummaryOutputSchema},
  prompt: `You are an AI assistant that generates department performance summaries.

  Based on the following performance data from Firestore for the {{departmentName}} department:
  {{performanceData}}

  Generate a concise summary of the department's recent performance.
  `,
});

const generateDepartmentSummaryFlow = ai.defineFlow(
  {
    name: 'generateDepartmentSummaryFlow',
    inputSchema: GenerateDepartmentSummaryInputSchema,
    outputSchema: GenerateDepartmentSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
