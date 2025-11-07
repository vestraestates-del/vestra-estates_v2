// api/generate.js
import { GoogleGenAI } from '@google/genai';

// This function handles POST requests to /api/generate
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { model, contents, config } = req.body;
  if (!contents) {
    return res.status(400).json({ error: '"contents" is required in the request body.' });
  }

  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.error('API_KEY environment variable is not set on the server.');
    return res.status(500).json({ error: 'API key is not configured.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const requestPayload = {
      model: model || 'gemini-2.5-flash', // Default to flash if not provided
      contents,
      ...(config && { config })
    };
    
    const response = await ai.models.generateContent(requestPayload);
    
    // Handle image modality response
    const imageParts = response.candidates?.[0]?.content?.parts?.filter(p => p.inlineData && p.inlineData.mimeType.startsWith('image/'));
    if (imageParts && imageParts.length > 0) {
        const images = imageParts.map(p => p.inlineData.data);
        return res.status(200).json({ images });
    }
    
    // Default to text response using the .text getter
    const text = response.text;
    
    if (text === undefined || text === null) {
        console.warn('Gemini API returned an empty or undefined text response.', { response });
        // Check for safety ratings to provide a more specific error
        const finishReason = response.candidates?.[0]?.finishReason;
        if (finishReason === 'SAFETY') {
             return res.status(200).json({ text: "The response was blocked due to safety concerns. Please modify your prompt." });
        }
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