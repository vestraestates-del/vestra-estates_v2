// api/generate.js
import { GoogleGenAI } from '@google/genai';

// This function handles POST requests to /api/generate
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { prompt, contents, systemInstruction } = req.body;
  if (!prompt && !contents) {
    return res.status(400).json({ error: 'Either "prompt" or "contents" is required in the request body.' });
  }

  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.error('API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'API key is not configured on the server.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    // Standardize the request payload for Gemini
    const requestPayload = {
      model: 'gemini-2.5-flash',
      // If `contents` is provided, use it. Otherwise, construct it from `prompt`.
      contents: contents || [{ role: 'user', parts: [{ text: prompt }] }],
      // Conditionally add the system instruction to the config if it exists.
      ...(systemInstruction && { config: { systemInstruction } })
    };
    
    const response = await ai.models.generateContent(requestPayload);
    
    const text = response.text;

    if (text === undefined) {
      console.error('No text found in Gemini API response:', response);
      // It's better to send the raw response for debugging if text is missing.
      return res.status(500).json({ 
          error: 'Failed to extract text from AI response.',
          details: response // Sending full response might give clues.
      });
    }

    res.status(200).json({ text });

  } catch (error) {
    console.error('Error in API function:', error);
    // Provide a more structured error response
    res.status(500).json({ 
        error: 'An internal server error occurred while contacting the AI service.',
        details: error.message 
    });
  }
}
