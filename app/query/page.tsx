"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, X, Loader2, MessageSquare } from "lucide-react"

interface Message {
  question: string
  answer: string
}

export default function QueryPage() {
  const [files, setFiles] = useState<File[]>([])
  const [pdfText, setPdfText] = useState<string>("")
  const [question, setQuestion] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)

  const onDrop = async (acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === "application/pdf")
    const newFiles = [...files, ...pdfFiles].slice(0, 3) // Limit to 3 files
    setFiles(newFiles)
    
    if (pdfFiles.length > 0) {
      setUploading(true)
      try {
        const formData = new FormData()
        newFiles.forEach((file) => {
          formData.append("files", file)
        })

        const response = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to parse PDF")
        }

        const data = await response.json()
        setPdfText(data.text)
      } catch (error) {
        console.error("Error parsing PDF:", error)
        alert("Error parsing PDF. Please try again.")
      } finally {
        setUploading(false)
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"]
    },
    maxFiles: 3,
    multiple: true
  })

  const removeFile = async (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    if (newFiles.length === 0) {
      setPdfText("")
    } else {
      // Re-parse remaining files
      try {
        const formData = new FormData()
        newFiles.forEach((file) => {
          formData.append("files", file)
        })

        const response = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          setPdfText(data.text)
        }
      } catch (error) {
        console.error("Error re-parsing PDFs:", error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !pdfText.trim()) {
      alert("Please upload a PDF and enter a question.")
      return
    }

    setLoading(true)
    const currentQuestion = question
    setQuestion("")

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: pdfText,
          question: currentQuestion,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        const details = data?.details
          ? ` (details: ${typeof data.details === "string" ? data.details : JSON.stringify(data.details)})`
          : ""
        throw new Error(`${data?.error || "Failed to get answer"}${details}`)
      }

      setMessages([...messages, { question: currentQuestion, answer: data.answer }])
    } catch (error) {
      console.error("Error:", error)
      const message =
        error instanceof Error ? error.message : "Error getting answer. Please try again."
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Query PDFs</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {uploading ? (
              <p className="text-muted-foreground">Processing PDFs...</p>
            ) : (
              <>
                <p className="text-muted-foreground mb-2">
                  {isDragActive
                    ? "Drop PDFs here"
                    : "Drag & drop PDF files here, or click to select"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Maximum 3 files
                </p>
              </>
            )}
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="text-sm truncate flex-1">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {pdfText && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Ask Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about the PDF..."
                  className="flex-1"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !question.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Asking...
                    </>
                  ) : (
                    "Ask"
                  )}
                </Button>
              </div>
            </form>

            {messages.length > 0 && (
              <div className="mt-6 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="space-y-2">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-semibold mb-2">Question:</p>
                      <p className="text-sm">{msg.question}</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Answer:</p>
                      <p className="text-sm whitespace-pre-wrap">{msg.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

