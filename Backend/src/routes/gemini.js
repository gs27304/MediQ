import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios'; // Required for ElevenLabs API call

const router = express.Router();

/**
 * @route   POST /api/v1/gemini/chat
 * @desc    Handles medical queries using Gemini AI + ElevenLabs TTS
 * @access  Public
 */
router.post('/chat', async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ success: false, message: "No input provided." });
    }

    // 1. Initialize Gemini Model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const systemPrompt = `
      You are MediQ Intelligence, a high-end medical AI assistant integrated into a healthcare platform.
      User Query: "${messages}"
      
      Instructions:
      1. Provide accurate, concise, and professional medical information.
      2. Use a helpful and empathetic tone.
      3. CRITICAL: Include a clear disclaimer at the end stating: "Disclaimer: This is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment."
    `;
    
    // 2. Generate Text Content from Gemini
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const botReplyText = response.text();
    
    // 3. Initialize ElevenLabs Voice Processing
    let audioBase64 = null;

    try {
      // We strip the disclaimer from the spoken audio to keep the voice response concise
      const speechText = botReplyText.split("Disclaimer:")[0].trim();

      const ttsResponse = await axios({
        method: 'post',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVEN_LABS_VOICE_ID}`,
        headers: {
          'accept': 'audio/mpeg',
          'xi-api-key': process.env.ELEVEN_LABS_API_KEY,
          'Content-Type': 'application/json',
        },
        data: {
          text: speechText,
          model_id: "eleven_monolingual_v1", // Better for Indian accents/context
          voice_settings: { 
            stability: 0.5, 
            similarity_boost: 0.75 
          }
        },
        responseType: 'arraybuffer', // Receive binary audio data
      });

      // Convert binary buffer to Base64 string for JSON transfer
      audioBase64 = Buffer.from(ttsResponse.data, 'binary').toString('base64');

    } catch (ttsError) {
      console.error("ElevenLabs TTS Error:", ttsError.message);
      // We don't throw here so the user still gets the text reply even if voice fails
    }

    // 4. Return both Text and Audio Data to Chatbot.jsx
    res.status(200).json({ 
      success: true,
      botReply: botReplyText,
      audioData: audioBase64 
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