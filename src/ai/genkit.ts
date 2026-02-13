import { genkit } from 'genkit';
import { googleAI, vertexAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    process.env.NODE_ENV === 'production'
      ? vertexAI({ location: 'us-central1' })
      //: googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY }),
      : googleAI({ apiKey: process.env.GEMINI_API_KEY }),
  ],
  model:
    process.env.NODE_ENV === 'production'
      ? vertexAI.model('gemini-2.5-flash-image')
      : googleAI.model('gemini-2.5-flash-lite'),
});
