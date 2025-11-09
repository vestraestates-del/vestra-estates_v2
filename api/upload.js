import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const filename = req.headers['x-vercel-filename'] || req.query.filename;

  if (!filename) {
    return res.status(400).json({ error: 'Filename is required. Pass it as a "filename" query parameter or "x-vercel-filename" header.' });
  }
  
  // Sanitize filename to prevent path traversal
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '');
  const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;

  try {
    const blob = await put(`articles/${uniqueFilename}`, req.body, {
      access: 'public',
    });

    res.status(200).json(blob);
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    res.status(500).json({ error: 'An internal server error occurred during file upload.' });
  }
}
