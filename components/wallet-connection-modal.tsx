"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Wallet } from "lucide-react"
import { useProtocolStore } from "@/lib/store"

interface WalletConnectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletConnectionModal({ open, onOpenChange }: WalletConnectionModalProps) {
  const { solanaWallet, evmWallet, connectSolanaWallet, connectEvmWallet } = useProtocolStore()

  const bothConnected = solanaWallet && evmWallet

  const handleEnterProtocol = () => {
    onOpenChange(false)
    // This will trigger the user profile check in the main component
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Connect Your Wallets</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Solana Wallet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Solana Wallet</h3>
              {solanaWallet && <Check className="h-5 w-5 text-green-500" />}
            </div>

            {solanaWallet ? (
              <div className="bg-slate-800 p-3 rounded-lg">
                <p className="text-sm text-slate-300 font-mono">
                  {solanaWallet.slice(0, 8)}...{solanaWallet.slice(-8)}
                </p>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={connectSolanaWallet}
                  variant="outline"
                  className="flex-1 border-slate-600 hover:bg-slate-800 bg-transparent"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Phantom
                </Button>
                <Button
                  onClick={connectSolanaWallet}
                  variant="outline"
                  className="flex-1 border-slate-600 hover:bg-slate-800 bg-transparent"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Solflare
                </Button>
              </div>
            )}
          </div>

          {/* EVM Wallet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">EVM Wallet</h3>
              {evmWallet && <Check className="h-5 w-5 text-green-500" />}
            </div>

            {evmWallet ? (
              <div className="bg-slate-800 p-3 rounded-lg">
                <p className="text-sm text-slate-300 font-mono">
                  {evmWallet.slice(0, 8)}...{evmWallet.slice(-8)}
                </p>
              </div>
            ) : (
              <Button
                onClick={connectEvmWallet}
                variant="outline"
                className="w-full border-slate-600 hover:bg-slate-800 bg-transparent"
              >
                <Wallet className="h-4 w-4 mr-2" />
                MetaMask
              </Button>
            )}
          </div>

          {/* Enter Protocol Button */}
          <Button
            onClick={handleEnterProtocol}
            disabled={!bothConnected}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500"
          >
            {bothConnected ? "Enter Protocol" : "Connect Both Wallets"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
