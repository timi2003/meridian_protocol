"use client"

import React from "react"
import { useState } from "react"
import type { PublicKey } from "@solana/web3.js"

interface WalletState {
  solanaWallet: string | null
  evmWallet: string | null
  isWalletConnected: boolean
  solanaBalance: number
  evmBalance: number
}

interface UserState {
  hasUserProfile: boolean
  trustScore: number
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM"
  healthFactor: number
  totalCollateral: number
  totalDebt: number
  netValue: number
  collateralAssets: Array<{
    symbol: string
    name: string
    chain: string
    amount: number
    value: number
    icon: string
  }>
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
  solanaBalance: 0,
  evmBalance: 0,
  hasUserProfile: false,
  trustScore: 750,
  tier: "GOLD" as const,
  healthFactor: 2.5,
  totalCollateral: 0,
  totalDebt: 5000,
  netValue: 0,
  currentView: "dashboard" as const,
  isLoading: false,
  collateralAssets: [] as Array<{
    symbol: string
    name: string
    chain: string
    amount: number
    value: number
    icon: string
  }>,
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
    connectSolanaWallet: (publicKey: PublicKey, balance: number) => {
      const walletAddress = publicKey.toString()
      const updates: Partial<typeof globalState> = {
        solanaWallet: walletAddress,
        solanaBalance: balance,
      }
      if (globalState.evmWallet) {
        updates.isWalletConnected = true
      }
      updateState(updates)
    },
    connectEvmWallet: (address: string, balance: number) => {
      const updates: Partial<typeof globalState> = {
        evmWallet: address,
        evmBalance: balance,
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
    addCollateral: (asset: {
      symbol: string
      name: string
      chain: string
      amount: number
      value: number
      icon: string
    }) => {
      const newAssets = [...globalState.collateralAssets, asset]
      const newTotalCollateral = newAssets.reduce((sum, asset) => sum + asset.value, 0)
      updateState({
        collateralAssets: newAssets,
        totalCollateral: newTotalCollateral,
        netValue: newTotalCollateral - globalState.totalDebt,
        healthFactor: newTotalCollateral > 0 ? newTotalCollateral / (globalState.totalDebt * 1.25) : 0,
      })
    },
    updateBalances: (solanaBalance: number, evmBalance?: number) => {
      const updates: Partial<typeof globalState> = { solanaBalance }
      if (evmBalance !== undefined) {
        updates.evmBalance = evmBalance
      }
      updateState(updates)
    },
  }
}
