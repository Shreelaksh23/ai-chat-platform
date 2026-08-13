import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const AIService = {

    async generateResponse(messages) {
        try {

            const contents = messages.map((message) => ({
                role:
                    message.role === "assistant"
                        ? "model"
                        : "user",

                parts: [
                    {
                        text: message.content,
                    },
                ],
            }));

            const response =
                await ai.models.generateContent({
                    model:  process.env.GEMINI_MODEL,
                    contents,
                });

            return response.text;

        } catch (error) {

            console.error(
                "Gemini API Error:",
                error
            );

            throw new Error(
                "Failed to generate AI response"
            );
        }
    },
};

export default AIService;