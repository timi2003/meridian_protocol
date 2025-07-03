"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { useProtocolStore } from "@/lib/store"

export function BorrowModal() {
  const { setCurrentView, tier } = useProtocolStore()
  const [borrowAmount, setBorrowAmount] = useState("")

  const collateralValue = 30000 // $30k in WETH
  const baseLTV = 75 // 75% base LTV
  const tierBonus = tier === "GOLD" ? 7.5 : tier === "SILVER" ? 5 : tier === "PLATINUM" ? 10 : 0
  const userLTV = baseLTV + tierBonus

  const maxBorrowBase = collateralValue * (baseLTV / 100)
  const maxBorrowUser = collateralValue * (userLTV / 100)
  const bonusAmount = maxBorrowUser - maxBorrowBase

  const currentBorrow = Number.parseFloat(borrowAmount) || 0
  const currentLTV = (currentBorrow / collateralValue) * 100
  const liquidationPrice = currentBorrow > 0 ? (currentBorrow * 1.25) / 10 : 0 // Simplified calculation

  const getHealthColor = () => {
    if (currentLTV < 60) return "text-green-500"
    if (currentLTV < 75) return "text-yellow-500"
    return "text-red-500"
  }

  const handleBorrow = () => {
    // Simulate successful borrow
    alert("Borrow transaction submitted to Solana!")
    setCurrentView("dashboard")
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Borrowing Calculator */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Borrow Assets</CardTitle>
              <p className="text-slate-400">Borrow against your collateral with enhanced LTV</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Asset to Borrow</Label>
                  <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">U</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">USDC</div>
                      <div className="text-slate-400 text-sm">Solana</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Amount to Borrow</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={borrowAmount}
                    onChange={(e) => setBorrowAmount(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white text-lg"
                  />
                </div>
              </div>

              {/* Dynamic Readouts */}
              <div className="space-y-4 p-4 bg-slate-800 rounded-lg">
                <h3 className="text-white font-medium">Loan Details</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Health Factor</span>
                    <span className={`font-medium ${getHealthColor()}`}>
                      {currentBorrow > 0 ? (collateralValue / (currentBorrow * 1.25)).toFixed(2) : "∞"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Current LTV</span>
                    <span className="text-white font-medium">{currentLTV.toFixed(1)}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Interest Rate</span>
                    <span className="text-white font-medium">2.5% APR</span>
                  </div>

                  {currentBorrow > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Liquidation Price (ETH)</span>
                      <span className="text-red-400 font-medium">${liquidationPrice.toFixed(0)}</span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleBorrow}
                disabled={currentBorrow === 0 || currentBorrow > maxBorrowUser}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700"
              >
                Borrow {borrowAmount || "0"} USDC
              </Button>
            </CardContent>
          </Card>

          {/* Right Side - LTV Visualization */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                LTV Visualization
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* LTV Gauge */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="h-8 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-300"
                      style={{ width: `${Math.min(currentLTV, 100)}%` }}
                    />
                  </div>

                  {/* Markers */}
                  <div className="relative mt-2">
                    <div
                      className="absolute flex flex-col items-center"
                      style={{ left: `${baseLTV}%`, transform: "translateX(-50%)" }}
                    >
                      <div className="w-0.5 h-4 bg-slate-400" />
                      <span className="text-xs text-slate-400 mt-1">Standard Limit</span>
                      <span className="text-xs text-slate-400">{baseLTV}%</span>
                    </div>

                    <div
                      className="absolute flex flex-col items-center"
                      style={{ left: `${userLTV}%`, transform: "translateX(-50%)" }}
                    >
                      <div className="w-0.5 h-4 bg-blue-500" />
                      <span className="text-xs text-blue-400 mt-1">Your Limit</span>
                      <span className="text-xs text-blue-400">{userLTV}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">0%</span>
                  <span className="text-slate-400">100%</span>
                </div>
              </div>

              {/* Trust Score Bonus */}
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-semibold">Trust Score Bonus Unlocked!</h3>
                    <p className="text-slate-300 text-sm">
                      Your {tier} Tier status grants you a +{tierBonus}% LTV bonus, allowing you to borrow up to
                      <span className="text-blue-400 font-medium"> ${maxBorrowUser.toLocaleString()}</span> against your
                      collateral instead of the standard{" "}
                      <span className="text-slate-400">${maxBorrowBase.toLocaleString()}</span>.
                    </p>
                    <div className="text-green-400 font-medium">
                      Bonus: +${bonusAmount.toLocaleString()} borrowing power
                    </div>
                  </div>
                </div>
              </div>

              {/* Collateral Info */}
              <div className="space-y-3">
                <h3 className="text-white font-medium">Collateral Overview</h3>
                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">W</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">10.0 WETH</div>
                      <div className="text-slate-400 text-sm">Sepolia</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">${collateralValue.toLocaleString()}</div>
                    <div className="text-slate-400 text-sm">$3,000/ETH</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
