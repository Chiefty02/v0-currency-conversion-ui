"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Gift, Clock, CheckCircle } from "lucide-react"

interface TransactionHistoryProps {
  onNavigateToWallet: (crypto: string) => void
  onNavigateToTrade: (tradeId: string) => void
}

export function TransactionHistory({ onNavigateToWallet, onNavigateToTrade }: TransactionHistoryProps) {
  const pendingTransactions = [
    {
      id: "tx_001",
      type: "crypto_deposit",
      asset: "USDT",
      amount: "52,389",
      currency: "USD",
      status: "pending",
      timestamp: "2024-01-15 14:30",
      network: "TRC20",
      txHash: "0x1234...5678",
    },
  ]

  const completedTransactions = [
    {
      id: "tx_002",
      type: "p2p_trade",
      asset: "TYR",
      amount: "0.000432",
      currency: "USD",
      status: "completed",
      timestamp: "2024-01-15 12:15",
      trader: "Trader USDT",
      tradeType: "buy",
    },
    {
      id: "tx_003",
      type: "crypto_deposit",
      asset: "USDT",
      amount: "0.00016",
      currency: "USD",
      status: "completed",
      timestamp: "2024-01-15 11:45",
      network: "ERC20",
    },
    {
      id: "tx_004",
      type: "exchange",
      asset: "USDT",
      toAsset: "TYR",
      amount: "20,162",
      currency: "TYR",
      status: "completed",
      timestamp: "2024-01-15 10:30",
    },
    {
      id: "tx_005",
      type: "invoice",
      asset: "Various",
      amount: "15,726",
      currency: "USD",
      status: "completed",
      timestamp: "2024-01-15 09:20",
    },
    {
      id: "tx_006",
      type: "p2p_trade",
      asset: "Giftcard",
      amount: "23,3407",
      currency: "USD",
      status: "completed",
      timestamp: "2024-01-15 08:15",
      trader: "GiftTrader",
      tradeType: "buy",
      giftcardType: "Amazon",
    },
    {
      id: "tx_007",
      type: "exchange",
      asset: "TYR",
      amount: "0.00432",
      currency: "USD",
      status: "completed",
      timestamp: "2024-01-14 16:45",
    },
    {
      id: "tx_008",
      type: "crypto_deposit",
      asset: "USDT",
      amount: "0.00039",
      currency: "USD",
      status: "completed",
      timestamp: "2024-01-14 15:30",
      network: "BSC",
    },
    {
      id: "tx_009",
      type: "crypto_deposit",
      asset: "USDT",
      amount: "20,000",
      currency: "USD",
      status: "completed",
      timestamp: "2024-01-14 14:20",
      network: "TRC20",
    },
  ]

  const getTransactionIcon = (type: string, status: string) => {
    if (status === "pending") return <Clock className="w-4 h-4 text-yellow-500" />
    if (status === "completed") return <CheckCircle className="w-4 h-4 text-green-500" />

    switch (type) {
      case "crypto_deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />
      case "crypto_withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "p2p_trade":
        return <RefreshCw className="w-4 h-4 text-blue-500" />
      case "exchange":
        return <RefreshCw className="w-4 h-4 text-purple-500" />
      default:
        return <Gift className="w-4 h-4 text-[#fbc108]" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Still Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Completed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            Unknown
          </Badge>
        )
    }
  }

  const handleTransactionClick = (transaction: any) => {
    if (transaction.type === "crypto_deposit" || transaction.type === "crypto_withdrawal") {
      onNavigateToWallet(transaction.asset)
    } else if (transaction.type === "p2p_trade") {
      onNavigateToTrade(transaction.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-white">Transaction History</h2>
        <div className="w-6 h-6 bg-[#fbc108] rounded-full flex items-center justify-center">
          <span className="text-black text-xs font-bold">{pendingTransactions.length}</span>
        </div>
      </div>

      {/* Pending Transactions */}
      {pendingTransactions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Pending transaction</h3>
          {pendingTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="bg-[#2f2f2f] border-[#5d5b5b] p-4 cursor-pointer hover:bg-[#3a3a3a] transition-colors"
              onClick={() => handleTransactionClick(transaction)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTransactionIcon(transaction.type, transaction.status)}
                  <div>
                    <p className="text-white font-medium">
                      {transaction.type === "crypto_deposit" ? "Buy" : "Trade"} {transaction.asset}
                    </p>
                    <p className="text-gray-400 text-sm">{transaction.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    ${transaction.amount} {transaction.currency}
                  </p>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Completed Transactions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Completed</h3>
        {completedTransactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="bg-[#2f2f2f] border-[#5d5b5b] p-4 cursor-pointer hover:bg-[#3a3a3a] transition-colors"
            onClick={() => handleTransactionClick(transaction)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getTransactionIcon(transaction.type, transaction.status)}
                <div>
                  <p className="text-white font-medium">
                    {transaction.type === "p2p_trade" &&
                      `${transaction.tradeType === "buy" ? "Buy" : "Sell"} ${transaction.asset}`}
                    {transaction.type === "crypto_deposit" && `Buy ${transaction.asset}`}
                    {transaction.type === "exchange" &&
                      `Exchange ${transaction.asset}${transaction.toAsset ? ` to ${transaction.toAsset}` : ""}`}
                    {transaction.type === "invoice" && "Invoice"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {transaction.trader && `Trader ${transaction.trader}`}
                    {transaction.network && `${transaction.network} Network`}
                    {!transaction.trader && !transaction.network && transaction.timestamp}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  {transaction.amount} {transaction.currency}
                </p>
                <p className="text-gray-400 text-sm">{transaction.timestamp}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
