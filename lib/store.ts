"use client"

import React from "react"

import { useState } from "react"

interface WalletState {
  solanaWallet: string | null
  evmWallet: string | null
  isWalletConnected: boolean
}

interface UserState {
  hasUserProfile: boolean
  trustScore: number
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM"
  healthFactor: number
  totalCollateral: number
  totalDebt: number
  netValue: number
}

interface UIState {
  currentView: "dashboard" | "deposit" | "borrow"
  isLoading: boolean
}

// Global state object
const globalState = {
  solanaWallet: null as string | null,
  evmWallet: null as string | null,
  isWalletConnected: false,
  hasUserProfile: false,
  trustScore: 750,
  tier: "GOLD" as const,
  healthFactor: 2.5,
  totalCollateral: 30000,
  totalDebt: 5000,
  netValue: 25000,
  currentView: "dashboard" as const,
  isLoading: false,
}

// Store update listeners
const listeners = new Set<() => void>()

const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

// Simple state management hook
export function useProtocolStore() {
  const [state, setState] = useState(globalState)

  // Subscribe to global state changes
  React.useEffect(() => {
    const listener = () => setState({ ...globalState })
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const updateState = (updates: Partial<typeof globalState>) => {
    Object.assign(globalState, updates)
    notifyListeners()
  }

  return {
    ...state,
    connectSolanaWallet: () => {
      const updates: Partial<typeof globalState> = {
        solanaWallet: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      }
      if (globalState.evmWallet) {
        updates.isWalletConnected = true
      }
      updateState(updates)
    },
    connectEvmWallet: () => {
      const updates: Partial<typeof globalState> = {
        evmWallet: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
      }
      if (globalState.solanaWallet) {
        updates.isWalletConnected = true
      }
      updateState(updates)
    },
    createUserProfile: () => {
      updateState({ hasUserProfile: true, isLoading: false })
    },
    setCurrentView: (view: "dashboard" | "deposit" | "borrow") => {
      updateState({ currentView: view })
    },
    setLoading: (loading: boolean) => {
      updateState({ isLoading: loading })
    },
  }
}
