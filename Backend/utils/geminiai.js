import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiAPIResponse = async (messages) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const formattedMessages = messages.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
        }));

        const result = await model.generateContent({
            contents: formattedMessages
        });

        return result.response.text();

    } catch (err) {
        console.error("Gemini API Error:", err);
        throw err;
    }
};

export default getGeminiAPIResponse;