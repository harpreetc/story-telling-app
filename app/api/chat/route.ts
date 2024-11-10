import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
    //apiKey: process.env.OPENAI_API_KEY,
    baseURL: " http://127.0.0.1:5000/v1",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    stream: true,
    model: "gpt-4o-mini",
    messages: [
      { role: "system",
        content: "You are a helpful storyteller that can generate stories based on the given characters and genre."
      },
      ...messages
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}