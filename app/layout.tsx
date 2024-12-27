import NavBar from "./components/NavBar"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "John Peng - Portfolio",
  description: "Software Engineer & Security Professional",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
