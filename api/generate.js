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
    console.error('API_KEY environment variable is not set on the server.');
    return res.status(500).json({ error: 'API key is not configured.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const requestPayload = {
      model: 'gemini-2.5-flash',
      contents: contents || [{ role: 'user', parts: [{ text: prompt }] }],
      ...(systemInstruction && { config: { systemInstruction } })
    };
    
    const response = await ai.models.generateContent(requestPayload);
    
    // The .text getter is the most reliable way to get the text output.
    const text = response.text;
    
    // It's good practice to check if the text is empty, as it could indicate a safety block or other issue.
    if (!text) {
        console.warn('Gemini API returned an empty text response.', { response });
        return res.status(200).json({ text: "I am unable to provide a response at this time." });
    }

    res.status(200).json({ text });

  } catch (error) {
    console.error('Error calling Google GenAI:', error);
    res.status(500).json({ 
        error: 'An internal server error occurred while contacting the AI service.',
        details: error.message 
    });
  }
}
