# Groq PDF Assistant

A full-stack Next.js 14 application that allows you to query and summarize PDF documents using Groq's Llama 3 AI model.

## Features

- 🧠 **Query PDFs** - Ask questions about uploaded PDF documents and get AI-powered answers
- ✍️ **Summarize PDFs** - Generate customizable summaries with adjustable length (1-10) and text color
- 📁 **Multiple PDF Support** - Upload up to 3 PDF files at once
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS and Shadcn/UI components
- ⚡ **Fast Processing** - Powered by Groq's lightning-fast inference engine

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **PDF Parsing**: pdf-parse
- **AI API**: Groq SDK (Llama 3.3 70B Versatile by default)
- **File Upload**: react-dropzone

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Groq API key (get one from [https://console.groq.com/](https://console.groq.com/))

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
Create a `.env.local` file in the root directory with the following content:
   ```
GROQ_API_KEY=your_actual_groq_api_key_here
# Optional: override the default model (defaults to llama-3.3-70b-versatile)
# GROQ_MODEL=llama-3.1-8b-instant
   ```
   
   **Important**: Replace `your_actual_groq_api_key_here` with your actual Groq API key from [https://console.groq.com/](https://console.groq.com/)
   
   You can get your API key by:
   1. Signing up at [https://console.groq.com/](https://console.groq.com/)
   2. Navigating to API Keys section
   3. Creating a new API key
   4. Copying it to your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Query PDFs

1. Navigate to the `/query` page
2. Upload one or more PDF files (up to 3)
3. Wait for the PDFs to be processed
4. Enter your question in the text area
5. Click "Ask" to get an AI-powered answer

### Summarize PDFs

1. Navigate to the `/summarize` page
2. Upload one or more PDF files (up to 3)
3. Adjust the summary length slider (1-10)
4. Choose your preferred text color
5. Click "Generate Summary" to create a customized summary

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── query/          # API route for PDF queries
│   │   └── summarize/      # API route for PDF summaries
│   ├── about/              # About page
│   ├── query/              # Query PDFs page
│   ├── summarize/          # Summarize PDFs page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   └── ui/                 # Shadcn/UI components
├── lib/
│   └── utils.ts            # Utility functions
└── .env.local              # Environment variables (create this)
```

## API Routes

### `/api/query`

Handles PDF text queries.

**Request:**
```json
{
  "text": "PDF text content...",
  "question": "Your question here"
}
```

**Response:**
```json
{
  "answer": "AI-generated answer..."
}
```

### `/api/summarize`

Generates PDF summaries.

**Request:**
```json
{
  "text": "PDF text content...",
  "length": 5,
  "color": "#000000"
}
```

**Response:**
```json
{
  "summary": "Generated summary...",
  "color": "#000000"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key | Yes |
| `GROQ_MODEL` (optional) | Override the Groq model (defaults to `llama-3.3-70b-versatile`) | No |

## Building for Production

```bash
npm run build
npm start
```

## License

MIT

## Support

For issues or questions, please check the [Groq API documentation](https://console.groq.com/docs) or create an issue in the repository.

