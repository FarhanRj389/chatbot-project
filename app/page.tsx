import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">FASTIAN'S PDF Utility</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Upload PDFs and interact with them using AI. Ask questions or generate summaries with customizable options.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link href="/query" className="group">
          <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <FileQuestion className="h-8 w-8 text-primary" />
                <CardTitle>Query PDFs</CardTitle>
              </div>
              <CardDescription>
                Upload PDFs and ask questions about their content. Get instant answers powered by FASTIAN'S AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Extract text from PDFs and have a conversation about the content. Perfect for research, analysis, and quick information retrieval.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/summarize" className="group">
          <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-8 w-8 text-primary" />
                <CardTitle>Summarize PDFs</CardTitle>
              </div>
              <CardDescription>
                Generate concise summaries of your PDFs with customizable length and styling options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Control summary length (1-10) and choose your preferred text color. Get AI-powered summaries tailored to your needs.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

