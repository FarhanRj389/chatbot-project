import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
})

const DEFAULT_MODEL = "llama-3.3-70b-versatile"
const MODEL = process.env.GROQ_MODEL || DEFAULT_MODEL

export async function POST(request: NextRequest) {
  try {
    const { text, length, color } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured" },
        { status: 500 }
      )
    }

    // Map length (1-10) to summary instructions
    const lengthDescriptions: { [key: number]: string } = {
      1: "very brief (1-2 sentences)",
      2: "brief (2-3 sentences)",
      3: "short (3-4 sentences)",
      4: "concise (4-5 sentences)",
      5: "moderate (5-7 sentences)",
      6: "detailed (7-9 sentences)",
      7: "comprehensive (9-12 sentences)",
      8: "thorough (12-15 sentences)",
      9: "extensive (15-20 sentences)",
      10: "very extensive (20+ sentences)"
    }

    const lengthDescription = lengthDescriptions[length] || lengthDescriptions[5]

    const MAX_CHARS = 200_000
    const truncatedText =
      text.length > MAX_CHARS
        ? `${text.slice(0, MAX_CHARS)}\n\n[Truncated for model input due to size limits.]`
        : text

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates clear and concise summaries of PDF documents."
        },
        {
          role: "user",
          content: `Please provide a ${lengthDescription} summary of the following PDF text:\n\n${truncatedText}`
        }
      ],
      model: MODEL,
      temperature: 0.7,
      max_tokens: 2048,
    })

    const summary = completion.choices[0]?.message?.content || "No summary generated."

    return NextResponse.json({ summary, color })
  } catch (error: any) {
    console.error("Error in summarize API:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to generate summary",
        details:
          (error as any)?.response?.data ||
          (error as any)?.response?.statusText ||
          null,
      },
      { status: 500 }
    )
  }
}

