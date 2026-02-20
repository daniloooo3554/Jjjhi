
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Ты помощник для школьной домашки. Объясняй понятно." },
        { role: "user", content: question }
      ],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(10000, () => {
  console.log("Server running");
});
