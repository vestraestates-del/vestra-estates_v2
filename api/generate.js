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

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents || [{ role: 'user', parts: [{ text: prompt }] }],
        ...(systemInstruction && { config: { systemInstruction } })
    });
    
    const text = response.text;

    if (text === undefined) {
      console.error('No text found in Gemini API response:', response);
      return res.status(500).json({ error: 'Failed to extract text from AI response.' });
    }

    res.status(200).json({ text });

  } catch (error) {
    console.error('Error in API function:', error);
    res.status(500).json({ error: error.message || 'An internal server error occurred.' });
  }
}