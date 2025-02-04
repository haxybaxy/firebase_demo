import 'dotenv/config';
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import pdf from 'pdf-parse';
import { createInterface } from "node:readline/promises";
import fs from 'fs';

const ai = genkit({
    plugins: [googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    })],
    model: gemini15Flash,
  });

  (async () => {
    try {
      // Step 1: get command line arguments
      const filename = process.argv[2];
      if (!filename) {
        console.error("Please provide a filename as a command line argument.");
        process.exit(1);
      }

      // Step 2: load PDF file
      let dataBuffer = fs.readFileSync(filename);
      const { text } = await pdf(dataBuffer);

      // Add size check
      console.log(`PDF text length: ${text.length} characters`);
      if (text.length > 30000) {  // adjust this limit based on your needs
        console.warn("Warning: PDF content might be too large for the model's context window");
      }

      // Step 3: construct prompt
      const prefix = process.argv[3] || "Sample prompt: Answer the user's questions about the contents of this PDF file.";
      const prompt = `
      ${prefix}
      Context:
      ${text}
      `;

      console.log("Initializing chat...");  // Add status message

      // Step 4: start chat
      const chat = ai.chat({ system: prompt })
      const readline = createInterface(process.stdin, process.stdout);
      console.log("You're chatting with Gemini. Ctrl-C to quit.\n");

      // Step 5: chat loop
      while (true) {
        const userInput = await readline.question("> ");
        const {text} = await chat.send(userInput);
        console.log(text);
      }


    } catch (error) {
      console.error("Error parsing PDF or interacting with Genkit:", error);
    }
  })(); // <-- don't forget the trailing parentheses to call the function!
