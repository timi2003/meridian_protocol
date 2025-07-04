"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import { useProtocolStore } from "@/lib/store"

type DepositStep = "input" | "depositing" | "success"

export function DepositModal() {
  const { setCurrentView, solanaBalance, evmBalance, addCollateral } = useProtocolStore()
  const [amount, setAmount] = useState("")
  const [currentStep, setCurrentStep] = useState<DepositStep>("input")
  const [selectedAsset, setSelectedAsset] = useState<"SOL" | "ETH">("SOL")

  const balance = selectedAsset === "SOL" ? solanaBalance : evmBalance
  const isValidAmount = Number.parseFloat(amount) > 0 && Number.parseFloat(amount) <= balance

  const handleDeposit = async () => {
    if (!isValidAmount) return

    setCurrentStep("depositing")

    // Simulate deposit transaction
    setTimeout(() => {
      const depositAmount = Number.parseFloat(amount)
      const assetPrice = selectedAsset === "SOL" ? 100 : 3000 // Mock prices
      const value = depositAmount * assetPrice

      addCollateral({
        symbol: selectedAsset,
        name: selectedAsset === "SOL" ? "Solana" : "Ethereum",
        chain: selectedAsset === "SOL" ? "Solana" : "Ethereum",
        amount: depositAmount,
        value: value,
        icon: selectedAsset === "SOL" ? "S" : "E",
      })

      setCurrentStep("success")
    }, 2000)
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
            <p className="text-slate-400">Add assets from your wallet as collateral to increase borrowing power</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === "input" && (
              <>
                <div className="space-y-4">
                  {/* Asset Selection */}
                  <div className="space-y-2">
                    <Label className="text-white">Select Asset</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={selectedAsset === "SOL" ? "default" : "outline"}
                        onClick={() => setSelectedAsset("SOL")}
                        className={`p-4 h-auto ${
                          selectedAsset === "SOL"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "border-slate-600 hover:bg-slate-800 bg-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">S</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium">Solana</div>
                            <div className="text-sm opacity-70">SOL</div>
                          </div>
                        </div>
                      </Button>

                      <Button
                        variant={selectedAsset === "ETH" ? "default" : "outline"}
                        onClick={() => setSelectedAsset("ETH")}
                        className={`p-4 h-auto ${
                          selectedAsset === "ETH"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "border-slate-600 hover:bg-slate-800 bg-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">E</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium">Ethereum</div>
                            <div className="text-sm opacity-70">ETH</div>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-white">Amount</Label>
                      <span className="text-slate-400 text-sm">
                        Balance: {balance.toFixed(4)} {selectedAsset}
                      </span>
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
                        onClick={() => setAmount((balance * 0.25).toFixed(4))}
                        className="border-slate-600 text-slate-300"
                      >
                        25%
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount((balance * 0.5).toFixed(4))}
                        className="border-slate-600 text-slate-300"
                      >
                        50%
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount((balance * 0.75).toFixed(4))}
                        className="border-slate-600 text-slate-300"
                      >
                        75%
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount(balance.toFixed(4))}
                        className="border-slate-600 text-slate-300"
                      >
                        MAX
                      </Button>
                    </div>
                  </div>

                  {/* Deposit Preview */}
                  {isValidAmount && (
                    <div className="p-4 bg-slate-800 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Deposit Preview</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Amount</span>
                          <span className="text-white">
                            {amount} {selectedAsset}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Estimated Value</span>
                          <span className="text-white">
                            ${(Number.parseFloat(amount) * (selectedAsset === "SOL" ? 100 : 3000)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleDeposit}
                  disabled={!isValidAmount}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700"
                >
                  Deposit {amount || "0"} {selectedAsset}
                </Button>
              </>
            )}

            {currentStep === "depositing" && (
              <div className="text-center space-y-4 py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                <div>
                  <h3 className="text-white font-medium">Processing Deposit...</h3>
                  <p className="text-slate-400 text-sm">Confirming transaction on the blockchain</p>
                </div>
              </div>
            )}

            {currentStep === "success" && (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Deposit Successful!</h3>
                  <p className="text-slate-400">Your collateral has been added and is now available for borrowing</p>
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
