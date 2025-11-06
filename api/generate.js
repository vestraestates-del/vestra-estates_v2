// api/generate.js

// This function handles POST requests to /api/generate
export default async function handler(req, res) {
  // 1. Check if the request method is POST.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // 2. Extract the prompt, contents, and systemInstruction from the request body.
  const { prompt, contents, systemInstruction } = req.body;
  if (!prompt && !contents) {
    return res.status(400).json({ error: 'Either "prompt" or "contents" is required in the request body.' });
  }

  // 3. Get the Gemini API Key from environment variables.
  // This is crucial for security. The key is stored on the server, not the client.
  const GEMINI_API_KEY = process.env.API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'API key is not configured on the server.' });
  }

  // 4. Define the Gemini API endpoint.
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // 5. Construct the request body for the Gemini API.
  const requestBody = {
    // If a full 'contents' array is provided (for chat), use it.
    // Otherwise, build a simple 'contents' array from the 'prompt'.
    contents: contents || [{ parts: [{ text: prompt }] }],
    // If a 'systemInstruction' is provided, include it in the correct format.
    ...(systemInstruction && { system_instruction: { parts: [{ text: systemInstruction }] } })
  };

  try {
    // 6. Make the secure, server-to-server call to the Gemini API.
    const apiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle non-successful responses from the Gemini API.
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('Gemini API Error:', errorData);
      return res.status(apiResponse.status).json({
        error: `Gemini API request failed: ${errorData.error?.message || 'Unknown error'}`
      });
    }

    const data = await apiResponse.json();
    
    // 7. Extract the generated text from the response.
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text === undefined) {
        console.error('No text found in Gemini API response:', data);
        return res.status(500).json({ error: 'Failed to extract text from AI response.' });
    }

    // 8. Send the successful response back to the frontend.
    res.status(200).json({ text });

  } catch (error) {
    console.error('Error in API function:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
