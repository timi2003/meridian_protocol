import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SolanaWalletProvider } from "@/components/wallet-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MeridianProtocol - Next-Gen DeFi",
  description: "Professional omni-chain financial infrastructure",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SolanaWalletProvider>
          <div className="min-h-screen bg-slate-950">{children}</div>
        </SolanaWalletProvider>
      </body>
    </html>
  )
}
