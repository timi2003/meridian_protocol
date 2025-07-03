"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp, LinkIcon } from "lucide-react"
import { useProtocolStore } from "@/lib/store"

export function OnboardingScreen() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const { createUserProfile, isLoading, setLoading } = useProtocolStore()

  const handleCreateIdentity = async () => {
    setLoading(true)
    // Simulate brief transaction time then immediately redirect
    setTimeout(() => {
      createUserProfile() // This will immediately set hasUserProfile to true and redirect
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-slate-900 border-slate-700">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold text-white">Create Your Omni-Chain Financial Identity</CardTitle>
          <p className="text-slate-400 text-lg">
            Establish your on-chain reputation and unlock advanced DeFi capabilities
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Value Propositions */}
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Build On-Chain Reputation</h3>
                <p className="text-slate-400">Your positive actions are rewarded and tracked permanently</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Unlock Better Loan Terms</h3>
                <p className="text-slate-400">Higher Trust Score means higher LTVs and lower fees</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <LinkIcon className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Single Identity Across All Chains</h3>
                <p className="text-slate-400">Your reputation follows you everywhere</p>
              </div>
            </div>
          </div>

          {/* NFT Explanation */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-white mb-2">Your Identity Anchor</h3>
            <p className="text-slate-400">
              Your identity is secured by a non-transferable NFT, minted directly to your wallet. It's your unique key
              to the protocol and cannot be sold or transferred.
            </p>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="border-slate-600 data-[state=checked]:bg-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-slate-300 leading-relaxed cursor-pointer">
              I understand this action is permanent and links my wallet to this identity. The OCI NFT cannot be
              transferred or sold.
            </label>
          </div>

          {/* Create Identity Button */}
          <Button
            onClick={handleCreateIdentity}
            disabled={!agreedToTerms || isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 py-3 text-lg"
          >
            {isLoading ? "Creating Identity..." : "Create Identity & Mint OCI NFT"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
