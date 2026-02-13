import { genkit } from 'genkit';
import { googleAI, vertexAI } from '@genkit-ai/google-genai';
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
    process.env.NODE_ENV === 'production'
      ? vertexAI({ location: 'us-central1' })      
      : googleAI({ apiKey: apiKey }),
  ],
  model:
    process.env.NODE_ENV === 'production'
      ? vertexAI.model('gemini-2.5-flash-image')
      : googleAI.model('gemini-2.5-flash-lite'),
});
