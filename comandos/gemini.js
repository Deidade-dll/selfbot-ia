const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const apiKey = "You_api_key";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

module.exports = {
  name: "sudo",
  run: async (client, message, args) => {
    if (!args.length) {
      return message.reply("Please provide a message to send to the AI.");
    }

    let userMessage = args.join(" ").trim();
    userMessage = userMessage.replace(/['"]?sudo['"]?/gi, "").trim();

    if (!userMessage) {
      return message.reply('The message cannot only contain "sudo". Please write something else.');
    }

    const prompt = userMessage;

    try {

      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);

      const aiResponse = result.response.text();

      console.log("AI Response:", aiResponse); // Para log

      const finalResponse = `${aiResponse}\n\n*(the information may be inaccurate)*`;

      const msg = await message.reply(finalResponse);
      setTimeout(() => msg.delete().catch(() => {}), 50000);

    } catch (error) {
      console.error(`Error communicating with the AI: ${error.message}`);
      message.reply("An error occurred while trying to communicate with the AI. Please try again later.");
    }
  }
};
