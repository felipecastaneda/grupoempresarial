import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('[genkit.ts] GEMINI_API_KEY is not configured. Google AI flows may not run.');
}

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: apiKey }),
  ],
  model:
    googleAI.model('gemini-2.5-flash-lite'),
});
