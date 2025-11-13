import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, FileText, Zap, Palette } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About FASTIAN'S PDF Utility</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Purpose</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
          FASTIAN'S PDF Utility is your go-to solution for all PDF-related tasks. Whether you need to summarize lengthy documents or extract specific information, our tool is designed to make your life easier.
          </p>
          <p className="text-muted-foreground">Our Summarization App is designed to enhance productivity by transforming lengthy texts into concise, easy-to-understand summaries. Utilizing advanced natural language processing techniques, the app identifies key points, eliminates redundant information, and delivers accurate summaries that preserve the original meaning. In addition to summarizing content, the app offers a powerful query search option, allowing users to instantly find specific information within large documents. Whether you're reviewing articles, research papers, or meeting notes, our tool helps you save time, stay informed, and access relevant content with ease.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <FileQuestion className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Query PDFs</h3>
              <p className="text-sm text-muted-foreground">
                Upload PDF files and ask questions about their content. The AI analyzes the text and provides 
                accurate answers based on the document context.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Summarize PDFs</h3>
              <p className="text-sm text-muted-foreground">
                Generate summaries with customizable length (1-10 scale) and choose your preferred text color 
                for the output. Perfect for quick document overviews.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Fast Processing</h3>
              <p className="text-sm text-muted-foreground">
                Powered by Groq&apos;s lightning-fast inference engine, get results in seconds. Support for 
                multiple PDF uploads (up to 3 files at once).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Palette className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Customizable</h3>
              <p className="text-sm text-muted-foreground">
                Control summary length and customize text color to match your preferences or branding needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Next.js 14 (App Router)</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Shadcn/UI Components</li>
                <li>• React Dropzone</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Backend & APIs</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Next.js API Routes</li>
                <li>• Groq SDK (Llama 3.3 70B Versatile)</li>
                <li>• pdf-parse (PDF text extraction)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">1.</span>
              <span>Upload one or more PDF files (up to 3) using the drag-and-drop interface or file picker.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">2.</span>
              <span>The app extracts text from the PDFs using pdf-parse library.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">3.</span>
              <span>
                For queries: Enter your question and the AI analyzes the PDF content to provide accurate answers.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">4.</span>
              <span>
                For summaries: Adjust the length slider (1-10) and choose a text color, then generate a 
                customized summary of the document.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">5.</span>
              <span>
                All AI processing is handled by Groq&apos;s API using the Llama 3-70B-8192 model, ensuring 
                fast and accurate results.
              </span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

