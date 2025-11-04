import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_TC, Pacifico } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
// app/layout.tsx 或 pages/_app.tsx
import '../styles/globals.css'; // **相對路徑，不要以 / 開頭**


const _notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const _pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export const metadata: Metadata = {
  title: "涼夏飲品 Cool Summer Drinks ✨ Maid Cafe",
  description: "歡迎光臨主人！一杯清爽，消暑一整天。",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className={`font-sans antialiased ${_notoSansTC.className} ${_pacifico.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
