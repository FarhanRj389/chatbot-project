import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Groq PDF Assistant",
  description: "Query and summarize PDFs using Groq AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-cyan-800 py-8 ">
          <div className="container flex h-14 items-center justify-center">
            <Link href="/" className="flex flex-col items-center space-x-2 ">
              <Image src="/logo.png" alt="FASTIAN'S PDF Utility" width={100} height={100} />
              <span className="font-bold text-xl text-white">FASTIAN&apos;S PDF Utility</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center space-x-4 pt-14">
            <Link href="/">
              <Button variant="ghost" className="text-white font-bold text-lg">Home</Button>
            </Link>
            <Link href="/query">
              <Button variant="ghost" className="text-white font-bold text-lg">Query</Button>
            </Link>
            <Link href="/summarize">
              <Button variant="ghost" className="text-white font-bold text-lg">Summarize</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="text-white font-bold text-lg">About</Button>
            </Link>
          </div>

        </nav>
        <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
      </body>
    </html>
  )
}

