"use client"

import { useState, useEffect, useCallback } from "react"

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  walletType: string | null
}

interface UseWalletReturn extends WalletState {
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
  switchChain: (chainId: number) => Promise<void>
  isLoading: boolean
  error: string | null
}

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  on: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

export function useWallet(): UseWalletReturn {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    walletType: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(async (walletType: string) => {
    setIsLoading(true)
    setError(null)

    try {
      if (walletType === "MetaMask") {
        if (typeof window === "undefined" || !window.ethereum) {
          throw new Error("MetaMask is not installed")
        }

        const accounts = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[]

        const chainId = (await window.ethereum.request({
          method: "eth_chainId",
        })) as string

        const balance = (await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })) as string

        setState({
          isConnected: true,
          address: accounts[0],
          balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
          chainId: Number.parseInt(chainId, 16),
          walletType: "MetaMask",
        })
      } else if (walletType === "WalletConnect") {
        // Simulate WalletConnect connection
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setState({
          isConnected: true,
          address: "0x1234567890123456789012345678901234567890",
          balance: "1.2345",
          chainId: 1,
          walletType: "WalletConnect",
        })
      } else if (walletType === "Coinbase") {
        // Simulate Coinbase Wallet connection
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setState({
          isConnected: true,
          address: "0x0987654321098765432109876543210987654321",
          balance: "2.5678",
          chainId: 1,
          walletType: "Coinbase",
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect wallet"
      setError(errorMessage)
      setState({
        isConnected: false,
        address: null,
        balance: null,
        chainId: null,
        walletType: null,
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      walletType: null,
    })
    setError(null)
  }, [])

  const switchChain = useCallback(async (chainId: number) => {
    if (typeof window === "undefined" || !window.ethereum) return

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to switch chain"
      setError(errorMessage)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect()
        } else {
          setState((prev) => ({ ...prev, address: accounts[0] }))
        }
      }

      const handleChainChanged = (chainId: string) => {
        setState((prev) => ({ ...prev, chainId: Number.parseInt(chainId, 16) }))
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          window.ethereum.removeListener("chainChanged", handleChainChanged)
        }
      }
    }
  }, [disconnect])

  return {
    ...state,
    connect,
    disconnect,
    switchChain,
    isLoading,
    error,
  }
}
