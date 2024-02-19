// pages/api/execute.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { code } = req.body;

  try {
    const flaskResponse = await axios.post('http://localhost:5000/execute', { code });
    res.status(200).json({ output: flaskResponse.data.output });
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
