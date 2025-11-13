import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
})

const DEFAULT_MODEL = "llama-3.3-70b-versatile"
const MODEL = process.env.GROQ_MODEL || DEFAULT_MODEL

export async function POST(request: NextRequest) {
  try {
    const { text, question } = await request.json()

    if (!text || !question) {
      return NextResponse.json(
        { error: "Text and question are required" },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured" },
        { status: 500 }
      )
    }

    const MAX_CHARS = 200_000
    const truncatedText =
      text.length > MAX_CHARS
        ? `${text.slice(0, MAX_CHARS)}\n\n[Truncated for model input due to size limits.]`
        : text

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that answers questions based on the provided PDF text. Be concise and accurate in your responses."
        },
        {
          role: "user",
          content: `Based on the following PDF text, please answer this question: ${question}\n\nPDF Text:\n${truncatedText}`
        }
      ],
      model: MODEL,
      temperature: 0.7,
      max_tokens: 2048,
    })

    const answer = completion.choices[0]?.message?.content || "No answer generated."

    return NextResponse.json({ answer })
  } catch (error: any) {
    console.error("Error in query API:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to process query",
        details:
          (error as any)?.response?.data ||
          (error as any)?.response?.statusText ||
          null,
      },
      { status: 500 }
    )
  }
}

