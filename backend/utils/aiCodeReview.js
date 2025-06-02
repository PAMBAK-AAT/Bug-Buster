
const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const aiCodeReview = async (code, prompt) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${prompt}\nCode:\n${code}`
    });
    
    // console.log(response.text);
    return response.text;
};



module.exports = { aiCodeReview };