import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { CONST_GEMINI_API_KEY } from '@/lib/constants';

let apiKey: string | undefined = process.env.GEMINI_API_KEY;

if (apiKey) {
  console.log('[genkit.ts] Genkit: GEMINI_API_KEY found in environment variables. Initializing Google AI plugin.');
} else {
  console.warn('[genkit.ts] Genkit: GEMINI_API_KEY NOT found in environment variables. Using hard-coded fallback.');
  // The GEMINI_API_KEY is now hard-coded below.
  // WARNING: Hard-coding API keys is not recommended for production environments.
  // For better security, prefer using environment variables or a secret manager.
  apiKey = CONST_GEMINI_API_KEY;
  if (apiKey) {
    console.log('[genkit.ts] Genkit: Hard-coded Gemini API key was loaded.');
  } else {
    console.warn('[genkit.ts] Genkit: Gemini API key was not loaded.');
  }   
}

export const ai = genkit({
  plugins: [
    // Use Google AI with API Key for all environments (dev and prod)
    googleAI({ apiKey: apiKey }),
  ],
  model:
    // Use a stable Google AI model for all environments
    googleAI.model('gemini-1.5-flash-latest'),
});
