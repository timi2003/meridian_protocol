"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import { useProtocolStore } from "@/lib/store"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { PhantomWalletName, SolflareWalletName } from "@solana/wallet-adapter-wallets"

interface WalletConnectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletConnectionModal({ open, onOpenChange }: WalletConnectionModalProps) {
  const { solanaWallet, evmWallet, solanaBalance, evmBalance, connectSolanaWallet, connectEvmWallet, updateBalances } =
    useProtocolStore()
  const { publicKey, connected, connecting, wallet, select, connect, disconnect } = useWallet()
  const { connection } = useConnection()
  const [loadingSolana, setLoadingSolana] = useState(false)
  const [loadingEvm, setLoadingEvm] = useState(false)
  const [selectedSolanaWallet, setSelectedSolanaWallet] = useState<string | null>(null)

  const bothConnected = solanaWallet && evmWallet

  // Handle Solana wallet connection
  useEffect(() => {
    if (connected && publicKey && !solanaWallet) {
      setLoadingSolana(true)
      // Fetch SOL balance
      connection
        .getBalance(publicKey)
        .then((balance) => {
          const solBalance = balance / LAMPORTS_PER_SOL
          connectSolanaWallet(publicKey, solBalance)
          setLoadingSolana(false)
        })
        .catch((error) => {
          console.error("Error fetching SOL balance:", error)
          connectSolanaWallet(publicKey, 0)
          setLoadingSolana(false)
        })
    }
  }, [connected, publicKey, connection, connectSolanaWallet, solanaWallet])

  // Periodically update balances
  useEffect(() => {
    if (connected && publicKey) {
      const interval = setInterval(() => {
        connection
          .getBalance(publicKey)
          .then((balance) => {
            const solBalance = balance / LAMPORTS_PER_SOL
            updateBalances(solBalance)
          })
          .catch(console.error)
      }, 10000) // Update every 10 seconds

      return () => clearInterval(interval)
    }
  }, [connected, publicKey, connection, updateBalances])

  const handleConnectPhantom = async () => {
    try {
      setLoadingSolana(true)
      setSelectedSolanaWallet("Phantom")

      // Disconnect any existing wallet first
      if (connected) {
        await disconnect()
      }

      // Select Phantom wallet
      select(PhantomWalletName)

      // Wait a bit for wallet selection to process
      setTimeout(async () => {
        try {
          await connect()
        } catch (error) {
          console.error("Error connecting to Phantom:", error)
          setLoadingSolana(false)
          alert("Failed to connect to Phantom wallet. Please make sure Phantom is installed and try again.")
        }
      }, 500)
    } catch (error) {
      console.error("Error selecting Phantom wallet:", error)
      setLoadingSolana(false)
      alert("Failed to connect to Phantom wallet. Please make sure Phantom is installed and try again.")
    }
  }

  const handleConnectSolflare = async () => {
    try {
      setLoadingSolana(true)
      setSelectedSolanaWallet("Solflare")

      // Disconnect any existing wallet first
      if (connected) {
        await disconnect()
      }

      // Select Solflare wallet
      select(SolflareWalletName)

      // Wait a bit for wallet selection to process
      setTimeout(async () => {
        try {
          await connect()
        } catch (error) {
          console.error("Error connecting to Solflare:", error)
          setLoadingSolana(false)
          alert("Failed to connect to Solflare wallet. Please make sure Solflare is installed and try again.")
        }
      }, 500)
    } catch (error) {
      console.error("Error selecting Solflare wallet:", error)
      setLoadingSolana(false)
      alert("Failed to connect to Solflare wallet. Please make sure Solflare is installed and try again.")
    }
  }

  const handleConnectMetaMask = async () => {
    setLoadingEvm(true)
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
        // Request account access from MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
          const address = accounts[0]

          // Get ETH balance from MetaMask
          const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [address, "latest"],
          })

          // Convert from wei to ETH
          const ethBalance = Number.parseInt(balance, 16) / Math.pow(10, 18)

          connectEvmWallet(address, ethBalance)
        } else {
          alert("No accounts found in MetaMask. Please make sure you have accounts set up.")
        }
      } else {
        alert("MetaMask is not installed or not detected. Please install MetaMask extension and try again.")
        // Open MetaMask installation page
        window.open("https://metamask.io/download/", "_blank")
      }
    } catch (error: any) {
      console.error("Error connecting to MetaMask:", error)

      if (error.code === 4001) {
        alert("Connection rejected by user. Please approve the connection in MetaMask to continue.")
      } else if (error.code === -32002) {
        alert("Connection request is already pending. Please check MetaMask and approve the connection.")
      } else {
        alert("Failed to connect to MetaMask. Please make sure MetaMask is unlocked and try again.")
      }
    } finally {
      setLoadingEvm(false)
    }
  }

  const handleEnterProtocol = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Connect Your Wallets</DialogTitle>
          <p className="text-slate-400 text-sm">Connect both Solana and Ethereum wallets to access the protocol</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Solana Wallet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Solana Wallet</h3>
              {solanaWallet && <Check className="h-5 w-5 text-green-500" />}
            </div>

            {solanaWallet ? (
              <div className="bg-slate-800 p-3 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  {wallet?.adapter.icon && (
                    <img
                      src={wallet.adapter.icon || "/placeholder.svg"}
                      alt={wallet.adapter.name}
                      className="w-5 h-5"
                    />
                  )}
                  <span className="text-sm font-medium">{wallet?.adapter.name}</span>
                </div>
                <p className="text-sm text-slate-300 font-mono">
                  {solanaWallet.slice(0, 8)}...{solanaWallet.slice(-8)}
                </p>
                <p className="text-xs text-slate-400">Balance: {solanaBalance.toFixed(4)} SOL</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleConnectPhantom}
                  disabled={connecting || loadingSolana}
                  className="flex-1 border-slate-600 hover:bg-slate-800 bg-transparent border"
                >
                  {connecting || (loadingSolana && selectedSolanaWallet === "Phantom") ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 mr-2 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      Phantom
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleConnectSolflare}
                  disabled={connecting || loadingSolana}
                  className="flex-1 border-slate-600 hover:bg-slate-800 bg-transparent border"
                >
                  {connecting || (loadingSolana && selectedSolanaWallet === "Solflare") ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 mr-2 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">S</span>
                      </div>
                      Solflare
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* EVM Wallet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Ethereum Wallet</h3>
              {evmWallet && <Check className="h-5 w-5 text-green-500" />}
            </div>

            {evmWallet ? (
              <div className="bg-slate-800 p-3 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <span className="text-sm font-medium">MetaMask</span>
                </div>
                <p className="text-sm text-slate-300 font-mono">
                  {evmWallet.slice(0, 8)}...{evmWallet.slice(-8)}
                </p>
                <p className="text-xs text-slate-400">Balance: {evmBalance.toFixed(4)} ETH</p>
              </div>
            ) : (
              <Button
                onClick={handleConnectMetaMask}
                disabled={loadingEvm}
                className="w-full border-slate-600 hover:bg-slate-800 bg-transparent border"
              >
                {loadingEvm ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting to MetaMask...
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 mr-2 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    Connect MetaMask
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Connection Status */}
          {!bothConnected && (
            <div className="text-center p-3 bg-slate-800 rounded-lg">
              <p className="text-slate-400 text-sm">
                {!solanaWallet && !evmWallet
                  ? "Connect both wallets to access the protocol"
                  : !solanaWallet
                    ? "Please connect your Solana wallet"
                    : "Please connect your Ethereum wallet"}
              </p>
            </div>
          )}

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
