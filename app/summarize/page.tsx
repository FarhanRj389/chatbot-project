"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, X, Loader2, FileText } from "lucide-react"

export default function SummarizePage() {
  const [files, setFiles] = useState<File[]>([])
  const [pdfText, setPdfText] = useState<string>("")
  const [summary, setSummary] = useState<string>("")
  const [length, setLength] = useState<number>(5)
  const [color, setColor] = useState<string>("#000000")
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
      setSummary("")
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
    if (!pdfText.trim()) {
      alert("Please upload a PDF first.")
      return
    }

    setLoading(true)
    setSummary("")

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: pdfText,
          length: length,
          color: color,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        const details = data?.details
          ? ` (details: ${typeof data.details === "string" ? data.details : JSON.stringify(data.details)})`
          : ""
        throw new Error(`${data?.error || "Failed to generate summary"}${details}`)
      }

      setSummary(data.summary)
    } catch (error) {
      console.error("Error:", error)
      const message =
        error instanceof Error ? error.message : "Error generating summary. Please try again."
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Summarize PDFs</h1>

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
              <FileText className="h-5 w-5" />
              Summary Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Summary Length (1-10): {length}
                </label>
                <Input
                  type="range"
                  min="1"
                  max="10"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  1 = Very Short, 10 = Very Detailed
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Text Color</label>
                <div className="flex items-center gap-4">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-20 h-10 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  "Generate Summary"
                )}
              </Button>
            </form>

            {summary && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Summary:</h3>
                <p
                  className="text-sm whitespace-pre-wrap"
                  style={{ color: color }}
                >
                  {summary}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

