"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Coins, CreditCard } from "lucide-react"
import { useProtocolStore } from "@/lib/store"

export function MainDashboard() {
  const { trustScore, tier, healthFactor, totalCollateral, totalDebt, netValue, setCurrentView } = useProtocolStore()

  const progressToNextTier = ((trustScore % 250) / 250) * 100

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Protocol Dashboard</h1>
          <p className="text-slate-400">Manage your omni-chain financial position</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trust Score Card */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-white">Trust Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-white">{trustScore}</div>
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                    {tier} TIER
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress to {tier === "GOLD" ? "Platinum" : "next"} tier</span>
                    <span className="text-slate-400">{Math.round(progressToNextTier)}%</span>
                  </div>
                  <Progress value={progressToNextTier} className="h-2" />
                  <p className="text-xs text-slate-500">
                    {250 - (trustScore % 250)} points to {tier === "GOLD" ? "Platinum" : "next"} tier
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Global Position Card */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-white">Net Position</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-white">Health Factor: {healthFactor.toFixed(1)}</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Collateral</span>
                    <span className="text-white font-medium">${totalCollateral.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Debt</span>
                    <span className="text-white font-medium">${totalDebt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-2">
                    <span className="text-slate-400">Net Value</span>
                    <span className="text-green-500 font-bold">${netValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collateral Overview Card */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-white">My Collateral</CardTitle>
              <Coins className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">W</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Wrapped ETH</div>
                      <div className="text-slate-400 text-sm">Sepolia</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">10.0 WETH</div>
                    <div className="text-slate-400 text-sm">$30,000</div>
                  </div>
                </div>
                <Button onClick={() => setCurrentView("deposit")} className="w-full bg-blue-500 hover:bg-blue-600">
                  + Deposit More Collateral
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Debt Overview Card */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-white">My Loans</CardTitle>
              <CreditCard className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">U</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">USDC</div>
                      <div className="text-slate-400 text-sm">Solana</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">$5,000</div>
                    <div className="text-slate-400 text-sm">2.5% APR</div>
                  </div>
                </div>
                <Button onClick={() => setCurrentView("borrow")} className="w-full bg-blue-500 hover:bg-blue-600">
                  Borrow Asset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
