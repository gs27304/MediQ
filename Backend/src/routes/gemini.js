import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Initialize the Gemini AI with your API Key from environment variables


/**
 * @route   POST /api/v1/gemini/chat
 * @desc    Handles medical queries using Gemini AI
 * @access  Public (or Private if you add auth middleware later)
 */
router.post('/chat', async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ success: false, message: "No input provided." });
    }

    // Using gemini-1.5-flash for faster response times in a chatbot UI
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Professional system prompt for MediQ Intelligence
    const systemPrompt = `
      You are MediQ Intelligence, a high-end medical AI assistant integrated into a healthcare platform.
      User Query: "${messages}"
      
      Instructions:
      1. Provide accurate, concise, and professional medical information.
      2. Use a helpful and empathetic tone.
      3. CRITICAL: Include a clear disclaimer at the end stating: "Disclaimer: This is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment."
    `;
    
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Returns botReply to match your Chatbot.jsx state logic
    res.status(200).json({ 
      success: true,
      botReply: text 
    });

  } catch (error) {
    console.error("Gemini Route Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Neural link interrupted. Please try again later." 
    });
  }
});

export default router;