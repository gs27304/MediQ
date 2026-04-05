import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({
        success: false,
        message: "No input provided.",
      });
    }

    // ✅ Keeping your same Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemma-3-27b-it",
    });

    const systemPrompt = `
      You are MediQ Intelligence, a professional medical AI assistant.
      User Query: "${messages}"

      Give concise, safe, professional medical advice.
      Always end with:
      Disclaimer: This is for informational purposes only and is not a substitute for professional medical advice.
    `;

    const result = await model.generateContent(systemPrompt);
    const botReplyText = result.response.text();

    return res.status(200).json({
      success: true,
      botReply: botReplyText,
    });
  } catch (error) {
    console.error("Gemini Route Error:", error);

    if (error.status === 429) {
      return res.status(200).json({
        success: true,
        botReply:
          "MediQ AI is currently busy because the free AI limit was reached. Please wait 1 minute and try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Neural link interrupted. Please try again later.",
    });
  }
});

export default router;