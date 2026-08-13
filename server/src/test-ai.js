// import "dotenv/config";
// import { GoogleGenAI } from "@google/genai";

// console.log("Key loaded:", !!process.env.GEMINI_API_KEY);

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// try {
//     const response = await ai.models.generateContent({
//         model: "gemini-3.5-flash",
//         contents: "Explain Redis in one sentence.",
//     });

//     console.log("\n====================");
//     console.log("AI RESPONSE:");
//     console.log(response.text);
//     console.log("====================\n");

// } catch (error) {
//     console.error("ERROR:");
//     console.error(error);
// }

import "dotenv/config";
import AIService from "./services/AIService.js";

const testAI = async () => {

    try {

        const messages = [

            {
                role: "user",
                content: "My name is Shree.",
            },

            {
                role: "assistant",
                content:
                    "Nice to meet you, Shree!",
            },

            {
                role: "user",
                content: "What is my name?",
            },

        ];

        const response =
            await AIService.generateResponse(
                messages
            );

        console.log("\n====================");
        console.log("AI RESPONSE:");
        console.log(response);
        console.log("====================\n");

    } catch (error) {
        console.error(
            "AI TEST FAILED:",
            error.message
        );

    }

};

testAI();