"use client"

import { useState } from "react"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { MainDashboard } from "@/components/main-dashboard"
import { DepositModal } from "@/components/deposit-modal"
import { BorrowModal } from "@/components/borrow-modal"
import { Button } from "@/components/ui/button"
import { useProtocolStore } from "@/lib/store"

export default function Home() {
  const { isWalletConnected, hasUserProfile, currentView, setCurrentView } = useProtocolStore()

  const [showWalletModal, setShowWalletModal] = useState(false)

  // Landing state - show connect wallet CTA
  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">MeridianProtocol</h1>
            <p className="text-slate-400 text-lg max-w-md">Next-generation omni-chain financial infrastructure</p>
          </div>

          <Button
            onClick={() => setShowWalletModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
          >
            Connect Wallets to Begin
          </Button>
        </div>

        <WalletConnectionModal open={showWalletModal} onOpenChange={setShowWalletModal} />
      </div>
    )
  }

  // Route to appropriate view based on user state
  if (!hasUserProfile) {
    return <OnboardingScreen />
  }

  if (currentView === "dashboard") {
    return <MainDashboard />
  }

  if (currentView === "deposit") {
    return <DepositModal />
  }

  if (currentView === "borrow") {
    return <BorrowModal />
  }

  return <MainDashboard />
}
