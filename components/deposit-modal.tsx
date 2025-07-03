"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, ExternalLink, Loader2 } from "lucide-react"
import { useProtocolStore } from "@/lib/store"

type DepositStep = "input" | "approve" | "deposit" | "waiting" | "success"

export function DepositModal() {
  const { setCurrentView } = useProtocolStore()
  const [amount, setAmount] = useState("")
  const [currentStep, setCurrentStep] = useState<DepositStep>("input")
  const [txHash, setTxHash] = useState("")

  const balance = 15.5 // Mock WETH balance
  const isValidAmount = Number.parseFloat(amount) > 0 && Number.parseFloat(amount) <= balance

  const handleApprove = async () => {
    setCurrentStep("approve")
    // Simulate approval transaction
    setTimeout(() => {
      setTxHash("0x1234...5678")
      setCurrentStep("deposit")
    }, 2000)
  }

  const handleDeposit = async () => {
    setCurrentStep("waiting")
    // Simulate deposit and cross-chain confirmation
    setTimeout(() => {
      setCurrentStep("success")
    }, 5000)
  }

  const handleComplete = () => {
    setCurrentView("dashboard")
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("dashboard")}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Deposit Collateral</CardTitle>
            <p className="text-slate-400">Add WETH collateral from Sepolia to increase your borrowing power</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === "input" && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Asset</Label>
                    <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">W</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Wrapped ETH</div>
                        <div className="text-slate-400 text-sm">Sepolia Testnet</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-white">Amount</Label>
                      <span className="text-slate-400 text-sm">Balance: {balance} WETH</span>
                    </div>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white text-lg"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount((balance * 0.25).toString())}
                        className="border-slate-600 text-slate-300"
                      >
                        25%
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount((balance * 0.5).toString())}
                        className="border-slate-600 text-slate-300"
                      >
                        50%
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount((balance * 0.75).toString())}
                        className="border-slate-600 text-slate-300"
                      >
                        75%
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount(balance.toString())}
                        className="border-slate-600 text-slate-300"
                      >
                        MAX
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleApprove}
                  disabled={!isValidAmount}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700"
                >
                  Approve WETH
                </Button>
              </>
            )}

            {currentStep === "approve" && (
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                <div>
                  <h3 className="text-white font-medium">Approving WETH...</h3>
                  <p className="text-slate-400 text-sm">Confirm the transaction in MetaMask</p>
                </div>
              </div>
            )}

            {currentStep === "deposit" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>WETH approved successfully</span>
                </div>
                <Button onClick={handleDeposit} className="w-full bg-blue-500 hover:bg-blue-600">
                  Deposit {amount} WETH
                </Button>
              </div>
            )}

            {currentStep === "waiting" && (
              <div className="space-y-6">
                <h3 className="text-white font-medium text-center">Processing Cross-Chain Deposit</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <div className="text-white">Transaction confirmed on Sepolia</div>
                      <a href="#" className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                        View on Etherscan <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                    <div className="flex-1">
                      <div className="text-white">Relaying message via LayerZero</div>
                      <a href="#" className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                        View on LayerZero Scan <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 border-2 border-slate-600 rounded-full" />
                    <div className="text-slate-400">Awaiting credit on Solana</div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === "success" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Deposit Successful!</h3>
                  <p className="text-slate-400">Your collateral has been credited and is now available for borrowing</p>
                </div>
                <Button onClick={handleComplete} className="w-full bg-blue-500 hover:bg-blue-600">
                  Return to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
