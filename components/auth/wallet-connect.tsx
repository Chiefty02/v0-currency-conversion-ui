"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, CheckCircle, AlertCircle, Copy } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import type { WalletData } from "@/types/auth"

interface WalletConnectProps {
  onSuccess: (walletData: WalletData) => void
}

export function WalletConnect({ onSuccess }: WalletConnectProps) {
  const { connect, disconnect, isConnected, address, balance, walletType, isLoading, error } = useWallet()
  const [copied, setCopied] = useState(false)

  const handleConnect = async (type: string) => {
    await connect(type)
    if (address && balance) {
      onSuccess({
        address,
        balance,
        walletType: type,
        chainId: 1,
      })
    }
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            Wallet Connected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Wallet Type</p>
            <p className="text-sm text-muted-foreground">{walletType}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Address</p>
            <div className="flex items-center space-x-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">{formatAddress(address)}</code>
              <Button size="sm" variant="ghost" onClick={copyAddress}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && <p className="text-xs text-green-600">Address copied!</p>}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Balance</p>
            <p className="text-sm text-muted-foreground">{balance} ETH</p>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => onSuccess({ address, balance: balance || "0", walletType: walletType || "", chainId: 1 })}
              className="flex-1"
            >
              Continue
            </Button>
            <Button variant="outline" onClick={disconnect}>
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={() => handleConnect("MetaMask")}
          disabled={isLoading}
          className="w-full wallet-button justify-start"
        >
          <div className="flex items-center">
            <div className="h-5 w-5 rounded bg-orange-500 mr-3 flex items-center justify-center">
              <Wallet className="h-3 w-3 text-white" />
            </div>
            {isLoading ? "Connecting..." : "MetaMask"}
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleConnect("WalletConnect")}
          disabled={isLoading}
          className="w-full wallet-button justify-start"
        >
          <div className="flex items-center">
            <div className="h-5 w-5 rounded bg-blue-500 mr-3 flex items-center justify-center">
              <Wallet className="h-3 w-3 text-white" />
            </div>
            {isLoading ? "Connecting..." : "WalletConnect"}
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleConnect("Coinbase")}
          disabled={isLoading}
          className="w-full wallet-button justify-start"
        >
          <div className="flex items-center">
            <div className="h-5 w-5 rounded bg-blue-600 mr-3 flex items-center justify-center">
              <Wallet className="h-3 w-3 text-white" />
            </div>
            {isLoading ? "Connecting..." : "Coinbase Wallet"}
          </div>
        </Button>
      </div>
    </div>
  )
}
