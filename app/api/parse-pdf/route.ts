import { NextRequest, NextResponse } from "next/server"
import pdfParse from "pdf-parse"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      )
    }

    if (files.length > 3) {
      return NextResponse.json(
        { error: "Maximum 3 files allowed" },
        { status: 400 }
      )
    }

    const texts = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const data = await pdfParse(buffer)
        return {
          filename: file.name,
          text: data.text,
        }
      })
    )

    const combinedText = texts.map(t => t.text).join("\n\n---\n\n")

    return NextResponse.json({
      text: combinedText,
      files: texts.map(t => t.filename),
    })
  } catch (error: any) {
    console.error("Error parsing PDF:", error)
    return NextResponse.json(
      { error: error.message || "Failed to parse PDF" },
      { status: 500 }
    )
  }
}

