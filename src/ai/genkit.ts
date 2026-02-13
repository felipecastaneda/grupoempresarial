import {genkit} from 'genkit';
import {vertexAI} from "@genkit-ai/google-genai";

export const ai = genkit({
  plugins: [
    vertexAI({location: "global"})
  ],
  model: vertexAI.model("gemini-1.0-pro"),
});
