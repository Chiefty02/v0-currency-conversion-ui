"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  ArrowUpDown,
  X,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  Copy,
  Download,
  Check,
  ArrowLeft,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Sidebar } from "@/components/sidebar"
import { useState, useEffect, useRef } from "react"
import { P2PTradingInterface } from "@/components/p2p-trading"
import { TransactionHistory } from "@/components/transaction-history"
import { ContactUs } from "@/components/contact-us"

const chartData = [
  { x: 0, value: 200 },
  { x: 1, value: 250 },
  { x: 1.5, value: 750 },
  { x: 2, value: 150 },
  { x: 2.5, value: 450 },
  { x: 3, value: 300 },
  { x: 3.5, value: 650 },
  { x: 4, value: 450 },
  { x: 4.5, value: 550 },
  { x: 5, value: 650 },
  { x: 5.5, value: 450 },
  { x: 6, value: 600 },
  { x: 6.5, value: 400 },
  { x: 7, value: 150 },
  { x: 7.5, value: 800 },
  { x: 8, value: 500 },
  { x: 8.5, value: 750 },
  { x: 9, value: 200 },
]

const currencies = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
]

const cryptoAssets = [
  { code: "BTC", symbol: "₿", name: "Bitcoin", balance: 1.5, usdValue: 45000 },
  { code: "ETH", symbol: "Ξ", name: "Ethereum", balance: 10, usdValue: 2500 },
  { code: "BNB", symbol: "BNB", name: "Binance Coin", balance: 20, usdValue: 300 },
  { code: "SOL", symbol: "◎", name: "Solana", balance: 100, usdValue: 150 },
  { code: "USDT", symbol: "₮", name: "Tether", balance: 5000, usdValue: 1 },
  { code: "USDC", symbol: "USDC", name: "USD Coin", balance: 3000, usdValue: 1 },
  { code: "ADA", symbol: "₳", name: "Cardano", balance: 2000, usdValue: 0.45 },
  { code: "DOT", symbol: "●", name: "Polkadot", balance: 150, usdValue: 6.5 },
  { code: "MATIC", symbol: "◆", name: "Polygon", balance: 800, usdValue: 0.85 },
  { code: "AVAX", symbol: "▲", name: "Avalanche", balance: 50, usdValue: 35 },
  { code: "LINK", symbol: "⬡", name: "Chainlink", balance: 200, usdValue: 14 },
  { code: "UNI", symbol: "🦄", name: "Uniswap", balance: 100, usdValue: 7.5 },
  { code: "TYR", symbol: "TYR", name: "Tyrion", balance: 25000, usdValue: 0.05 },
]

const exchangeRates = {
  USD: 1,
  NGN: 1650,
  EUR: 0.85,
  CAD: 1.35,
  AUD: 1.45,
  GBP: 0.75,
}

const cryptoNetworks = {
  BTC: [
    { name: "Bitcoin", code: "BTC", address: "1A1zPleP5QQefi2DMPTfTL5SLmv7DivfNa" },
    {
      name: "Bitcoin Lightning",
      code: "BTC-LN",
      address:
        "lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl2pkx2ctnv5sxxmmwwd5kgetjypeh2ursdae8g6twvus8g6rfwvs8qun0dfjkxaq8rkx3yf5tcsyz3d73gafnh3cax9rn449d9p5uxz9ezhhypd0elx87sjle52x86fux2ypatgddc6k63n7erqz25le42c4u4ecky03ylcqca784w",
    },
  ],
  ETH: [
    { name: "Ethereum", code: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "Polygon", code: "MATIC", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "Arbitrum", code: "ARB", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
  ],
  BNB: [
    { name: "BNB Smart Chain", code: "BSC", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "BNB Beacon Chain", code: "BNB", address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2" },
  ],
  SOL: [{ name: "Solana", code: "SOL", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" }],
  USDT: [
    { name: "Ethereum (ERC-20)", code: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "Tron (TRC-20)", code: "TRX", address: "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs" },
    { name: "BNB Smart Chain (BEP-20)", code: "BSC", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
  ],
  USDC: [
    { name: "Ethereum (ERC-20)", code: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "Polygon", code: "MATIC", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "Solana", code: "SOL", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" },
  ],
  ADA: [
    {
      name: "Cardano",
      code: "ADA",
      address: "addr1qxy2lpan99fcnyrz4usqp7md9qp7pz3v9x8d5gh4tjdvdhsxw6tpwr3y4xdj0algaq47dxt8aa2g6nvqjp8jtc6sraqq0dwht",
    },
  ],
  DOT: [{ name: "Polkadot", code: "DOT", address: "1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg" }],
  MATIC: [
    { name: "Polygon", code: "MATIC", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "Ethereum (ERC-20)", code: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
  ],
  AVAX: [{ name: "Avalanche C-Chain", code: "AVAX", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" }],
  LINK: [
    { name: "Ethereum (ERC-20)", code: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "BNB Smart Chain (BEP-20)", code: "BSC", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
  ],
  UNI: [{ name: "Ethereum (ERC-20)", code: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" }],
  TYR: [
    { name: "Ethereum (ERC-20)", code: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
    { name: "BNB Smart Chain (BEP-20)", code: "BSC", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e" },
  ],
}

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#ffffff" fontSize="12">
        {payload.value}
      </text>
    </g>
  )
}

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dx={-4} dy={4} textAnchor="end" fill="#ffffff" fontSize="12">
        {payload.value}
      </text>
    </g>
  )
}

const DepositInterface = () => {
  // Placeholder for Deposit Interface
  return <div>Deposit Interface</div>
}

const SwapInterface = ({
  swapFromCrypto,
  swapToCrypto,
  setShowSwapInterface,
  setSwapFromCrypto,
  setSwapAmount,
  setSelectedPercentage,
  calculateSwapAmount,
  handlePercentageSelect,
  swapAmount,
  setSwapToCrypto,
  selectedPercentage,
}: {
  swapFromCrypto: any
  swapToCrypto: any
  setShowSwapInterface: (show: boolean) => void
  setSwapFromCrypto: (crypto: any) => void
  setSwapAmount: (amount: string) => void
  setSelectedPercentage: (percentage: number) => void
  calculateSwapAmount: () => string
  handlePercentageSelect: (percentage: number) => void
  swapAmount: string
  setSwapToCrypto: (crypto: any) => void
  selectedPercentage: number
}) => (
  <div className="bg-[#2f2f2f] border-none rounded-2xl p-6 max-w-md mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-white text-xl font-medium">
        Swap {swapFromCrypto.code} to {swapToCrypto.code}
      </h3>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSwapInterface(false)}
        className="text-gray-400 hover:text-white"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
    <p className="text-gray-400 text-sm mb-6">Swap assets between different cryptocurrencies</p>
    <div className="mb-6">
      <label className="text-white text-sm font-medium mb-2 block">From</label>
      <div className="relative">
        <select
          value={swapFromCrypto.code}
          onChange={(e) => {
            const crypto = cryptoAssets.find((c) => c.code === e.target.value)
            if (crypto) {
              setSwapFromCrypto(crypto)
              setSwapAmount("")
              setSelectedPercentage(0)
            }
          }}
          className="w-full bg-[#4a4a4a] border border-gray-600 text-white rounded-lg px-4 py-3 appearance-none cursor-pointer"
        >
          {cryptoAssets.map((crypto) => (
            <option key={crypto.code} value={crypto.code} className="bg-[#4a4a4a] text-white">
              {crypto.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
    <div className="mb-6">
      <label className="text-white text-sm font-medium mb-2 block">To</label>
      <div className="relative">
        <select
          value={swapToCrypto.code}
          onChange={(e) => {
            const crypto = cryptoAssets.find((c) => c.code === e.target.value)
            if (crypto) setSwapToCrypto(crypto)
          }}
          className="w-full bg-[#4a4a4a] border border-gray-600 text-white rounded-lg px-4 py-3 appearance-none cursor-pointer"
        >
          {cryptoAssets.map((crypto) => (
            <option key={crypto.code} value={crypto.code} className="bg-[#4a4a4a] text-white">
              {crypto.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-white text-sm font-medium">Amount</label>
        <Button
          onClick={() => setShowSwapInterface(false)}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>
      <Input
        type="number"
        value={swapAmount}
        onChange={(e) => setSwapAmount(e.target.value)}
        placeholder="Type amount"
        className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 rounded-lg text-lg"
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-gray-400 text-sm">
          Balance: {swapFromCrypto.balance} {swapFromCrypto.code}
        </p>
        <p className="text-gray-400 text-sm">
          Receive: {calculateSwapAmount()} {swapToCrypto.code}
        </p>
      </div>
    </div>
    <div className="flex gap-2 mb-6">
      {[25, 50, 75, 100].map((percentage) => (
        <Button
          key={percentage}
          onClick={() => handlePercentageSelect(percentage)}
          className={`flex-1 py-2 text-sm rounded-lg transition-colors ${
            selectedPercentage === percentage
              ? "bg-[#fbc108] text-black"
              : "bg-[#4a4a4a] text-gray-400 hover:bg-[#5a5a5a] hover:text-white"
          }`}
        >
          {percentage}%
        </Button>
      ))}
    </div>
    <Button
      className="w-full bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium py-3 rounded-lg"
      disabled={!swapAmount || Number.parseFloat(swapAmount) <= 0}
    >
      Swap
    </Button>
    <div className="mt-6 p-4 bg-[#4a4a4a] rounded-lg">
      <h5 className="text-[#fbc108] text-sm font-medium mb-2">Important Notice</h5>
      <ul className="text-gray-300 text-xs space-y-1">
        <li>• Ensure you have enough balance to cover the swap</li>
        <li>• Swap fees may apply</li>
        <li>• Swaps are irreversible once confirmed</li>
      </ul>
    </div>
  </div>
)

const WithdrawInterface = ({
  withdrawCrypto,
  setShowWithdrawInterface,
  setWithdrawCrypto,
  setWithdrawAddress,
  setWithdrawNetwork,
  setWithdrawAmount,
  withdrawPercentage,
  handleWithdrawPercentageSelect,
  withdrawAddress,
  withdrawNetwork,
  withdrawAmount,
}: {
  withdrawCrypto: any
  setShowWithdrawInterface: (show: boolean) => void
  setWithdrawCrypto: (crypto: any) => void
  setWithdrawAddress: (address: string) => void
  setWithdrawNetwork: (network: any) => void
  setWithdrawAmount: (amount: string) => void
  withdrawPercentage: number
  handleWithdrawPercentageSelect: (percentage: number) => void
  withdrawAddress: string
  withdrawNetwork: any
  withdrawAmount: string
}) => (
  <Card className="bg-[#2f2f2f] border-none rounded-2xl p-6 max-w-md mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-white text-xl font-medium">Send {withdrawCrypto.code}</h3>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowWithdrawInterface(false)}
        className="text-gray-400 hover:text-white"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
    <p className="text-gray-400 text-sm mb-6">Send assets to crypto address</p>
    <div className="mb-6">
      <label className="text-white text-sm font-medium mb-2 block">Wallet address</label>
      <Input
        type="text"
        value={withdrawAddress}
        onChange={(e) => setWithdrawAddress(e.target.value)}
        placeholder="Paste wallet address"
        className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 rounded-lg"
      />
    </div>
    <div className="mb-6">
      <label className="text-white text-sm font-medium mb-2 block">Network</label>
      <div className="relative">
        <select
          value={withdrawNetwork.code}
          onChange={(e) => {
            const network = (cryptoNetworks[withdrawCrypto.code as keyof typeof cryptoNetworks] || []).find(
              (n) => n.code === e.target.value,
            )
            if (network) setWithdrawNetwork(network)
          }}
          className="w-full bg-[#4a4a4a] border border-gray-600 text-white rounded-lg px-4 py-3 appearance-none cursor-pointer"
        >
          {(cryptoNetworks[withdrawCrypto.code as keyof typeof cryptoNetworks] || []).map((network) => (
            <option key={network.code} value={network.code} className="bg-[#4a4a4a] text-white">
              {network.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-white text-sm font-medium">Amount</label>
        <Button
          onClick={() => setShowWithdrawInterface(false)}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>
      <Input
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        placeholder="Type amount"
        className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 rounded-lg text-lg"
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-gray-400 text-sm">
          Balance: {withdrawCrypto.balance} {withdrawCrypto.code}
        </p>
        <p className="text-gray-400 text-sm">
          ${(Number(withdrawAmount || 0) * withdrawCrypto.usdValue).toLocaleString()}
        </p>
      </div>
    </div>
    <div className="flex gap-2 mb-6">
      {[25, 50, 75, 100].map((percentage) => (
        <Button
          key={percentage}
          onClick={() => handleWithdrawPercentageSelect(percentage)}
          className={`flex-1 py-2 text-sm rounded-lg transition-colors ${
            withdrawPercentage === percentage
              ? "bg-[#fbc108] text-black"
              : "bg-[#4a4a4a] text-gray-400 hover:bg-[#5a5a5a] hover:text-white"
          }`}
        >
          {percentage}%
        </Button>
      ))}
    </div>
    <Button
      className="w-full bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium py-3 rounded-lg"
      disabled={!withdrawAddress || !withdrawAmount || Number.parseFloat(withdrawAmount) <= 0}
    >
      Withdraw
    </Button>
    <div className="mt-6 p-4 bg-[#4a4a4a] rounded-lg">
      <h5 className="text-[#fbc108] text-sm font-medium mb-2">Important Notice</h5>
      <ul className="text-gray-300 text-xs space-y-1">
        <li>• Double-check the recipient address before confirming</li>
        <li>• Ensure you're using the correct {withdrawNetwork.name} network</li>
        <li>• Minimum withdrawal: 0.001 {withdrawCrypto.code}</li>
        <li>• Network fees will be deducted from your withdrawal</li>
        <li>• Withdrawals are irreversible once confirmed</li>
      </ul>
    </div>
  </Card>
)

export default function TradingDashboard() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAssets[0])
  const [isCryptoDropdownOpen, setIsCryptoDropdownOpen] = useState(false)
  const [showSwapInterface, setShowSwapInterface] = useState(false)
  const [swapFromCrypto, setSwapFromCrypto] = useState(cryptoAssets[0])
  const [swapToCrypto, setSwapToCrypto] = useState(cryptoAssets[1])
  const [swapAmount, setSwapAmount] = useState("")
  const [selectedPercentage, setSelectedPercentage] = useState(0)
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false)
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showDepositInterface, setShowDepositInterface] = useState(false)
  const [depositCrypto, setDepositCrypto] = useState(cryptoAssets[0])
  const [selectedNetwork, setSelectedNetwork] = useState(cryptoNetworks.BTC[0])
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [showWithdrawInterface, setShowWithdrawInterface] = useState(false)
  const [withdrawCrypto, setWithdrawCrypto] = useState(cryptoAssets[0])
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawAddress, setWithdrawAddress] = useState("")
  const [withdrawNetwork, setWithdrawNetwork] = useState(cryptoNetworks.BTC[0])
  const [withdrawPercentage, setWithdrawPercentage] = useState(0)

  const currencyDropdownRef = useRef<HTMLDivElement>(null)
  const cryptoDropdownRef = useRef<HTMLDivElement>(null)
  const fromDropdownRef = useRef<HTMLDivElement>(null)
  const toDropdownRef = useRef<HTMLDivElement>(null)

  const calculateBalance = () => {
    const cryptoUsdValue = selectedCrypto.balance * selectedCrypto.usdValue
    const exchangeRate = exchangeRates[selectedCurrency.code as keyof typeof exchangeRates]
    return (cryptoUsdValue * exchangeRate).toLocaleString()
  }

  const calculateSwapAmount = () => {
    if (!swapAmount) return "0"
    const fromValue = Number.parseFloat(swapAmount) * swapFromCrypto.usdValue
    const toAmount = fromValue / swapToCrypto.usdValue
    return toAmount.toFixed(6)
  }

  const handlePercentageSelect = (percentage: number) => {
    setSelectedPercentage(percentage)
    const amount = ((swapFromCrypto.balance * percentage) / 100).toString()
    setSwapAmount(amount)
  }

  const handleMaxClick = () => {
    setSelectedPercentage(100)
    setSwapAmount(swapFromCrypto.balance.toString())
  }

  const swapAssets = () => {
    const temp = swapFromCrypto
    setSwapFromCrypto(swapToCrypto)
    setSwapToCrypto(temp)
    setSwapAmount("")
    setSelectedPercentage(0)
  }

  const handleDepositClick = (crypto: (typeof cryptoAssets)[0]) => {
    setDepositCrypto(crypto)
    const networks = cryptoNetworks[crypto.code as keyof typeof cryptoNetworks] || []
    setSelectedNetwork(networks[0] || { name: "Default", code: crypto.code, address: "N/A" })
    setShowDepositInterface(true)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const downloadQRCode = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 200
    canvas.height = 200

    // Simple QR code pattern (placeholder)
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, 200, 200)
    ctx.fillStyle = "#ffffff"

    // Create a simple pattern
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillRect(i * 10, j * 10, 10, 10)
        }
      }
    }

    const link = document.createElement("a")
    link.download = `${depositCrypto.code}-${selectedNetwork.code}-deposit-qr.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false)
      }
      if (cryptoDropdownRef.current && !cryptoDropdownRef.current.contains(event.target as Node)) {
        setIsCryptoDropdownOpen(false)
      }
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target as Node)) {
        setIsFromDropdownOpen(false)
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target as Node)) {
        setIsToDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleWithdrawClick = (crypto: (typeof cryptoAssets)[0]) => {
    setWithdrawCrypto(crypto)
    const networks = cryptoNetworks[crypto.code as keyof typeof cryptoNetworks] || []
    setWithdrawNetwork(networks[0] || { name: "Default", code: crypto.code, address: "N/A" })
    setShowWithdrawInterface(true)
    setWithdrawAmount("")
    setWithdrawAddress("")
    setWithdrawPercentage(0)
  }

  const handleWithdrawPercentageSelect = (percentage: number) => {
    setWithdrawPercentage(percentage)
    const amount = ((withdrawCrypto.balance * percentage) / 100).toString()
    setWithdrawAmount(amount)
  }

  const handleWithdrawMaxClick = () => {
    setWithdrawPercentage(100)
    setWithdrawAmount(withdrawCrypto.balance.toString())
  }

  const handleDashboardDeposit = () => {
    setActiveSection("wallet")
    setTimeout(() => handleDepositClick(selectedCrypto), 100)
  }

  const handleDashboardWithdraw = () => {
    setActiveSection("wallet")
    setTimeout(() => handleWithdrawClick(selectedCrypto), 100)
  }

  const handleDashboardSwap = () => {
    setActiveSection("wallet")
    setTimeout(() => {
      setSwapFromCrypto(selectedCrypto)
      setShowSwapInterface(true)
    }, 100)
  }

  const WalletInterface = () => {
    if (showDepositInterface) {
      return <DepositInterface />
    }

    if (showWithdrawInterface) {
      return (
        <WithdrawInterface
          withdrawCrypto={withdrawCrypto}
          setShowWithdrawInterface={setShowWithdrawInterface}
          setWithdrawCrypto={setWithdrawCrypto}
          setWithdrawAddress={setWithdrawAddress}
          setWithdrawNetwork={setWithdrawNetwork}
          setWithdrawAmount={setWithdrawAmount}
          withdrawPercentage={withdrawPercentage}
          handleWithdrawPercentageSelect={handleWithdrawPercentageSelect}
          withdrawAddress={withdrawAddress}
          withdrawNetwork={withdrawNetwork}
          withdrawAmount={withdrawAmount}
        />
      )
    }

    if (showSwapInterface) {
      return (
        <SwapInterface
          swapFromCrypto={swapFromCrypto}
          swapToCrypto={swapToCrypto}
          setShowSwapInterface={setShowSwapInterface}
          setSwapFromCrypto={setSwapFromCrypto}
          setSwapAmount={setSwapAmount}
          setSelectedPercentage={setSelectedPercentage}
          calculateSwapAmount={calculateSwapAmount}
          handlePercentageSelect={handlePercentageSelect}
          swapAmount={swapAmount}
          setSwapToCrypto={setSwapToCrypto}
          selectedPercentage={selectedPercentage}
        />
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Wallet</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowDepositInterface(false)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {cryptoAssets.map((asset) => {
            const totalValue = asset.balance * asset.usdValue
            const isPositive = Math.random() > 0.5
            const priceChange = (Math.random() * 10 - 5).toFixed(2)

            return (
              <Card
                key={asset.code}
                className="bg-[#2f2f2f] border-none rounded-xl p-6 hover:bg-[#3a3a3a] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#fbc108] rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-lg">{asset.symbol}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{asset.name}</h3>
                      <p className="text-gray-400 text-sm">{asset.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-xl">
                      {asset.balance.toLocaleString()} {asset.code}
                    </div>
                    <div className="text-gray-400 text-sm">${totalValue.toLocaleString()}</div>
                    <div
                      className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}
                    >
                      {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {isPositive ? "+" : ""}
                      {priceChange}%
                    </div>
                  </div>
                  <div className="flex gap-2 ml-6">
                    <Button
                      size="sm"
                      onClick={() => handleDepositClick(asset)}
                      className="bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium px-4 py-2 rounded-lg"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Deposit
                    </Button>
                    <button
                      onClick={() => handleWithdrawClick(asset)}
                      style={{
                        backgroundColor: "#fbc108",
                        color: "#000000",
                        border: "none",
                        borderRadius: "0.5rem",
                        padding: "0.5rem 1rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e6ad07"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fbc108"
                      }}
                    >
                      <Minus className="w-4 h-4" style={{ color: "#000000" }} />
                      Withdraw
                    </button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white font-medium px-4 py-2 rounded-lg bg-transparent"
                      onClick={() => {
                        setSwapFromCrypto(asset)
                        setShowSwapInterface(true)
                      }}
                    >
                      <ArrowUpDown className="w-4 h-4 mr-1" />
                      Swap
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
        <Card className="bg-[#2f2f2f] border-none rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Portfolio Distribution</h3>
          <div className="space-y-3">
            {cryptoAssets.slice(0, 5).map((asset) => {
              const totalPortfolio = cryptoAssets.reduce((total, a) => total + a.balance * a.usdValue, 0)
              const percentage = (((asset.balance * asset.usdValue) / totalPortfolio) * 100).toFixed(1)

              return (
                <div key={asset.code} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#fbc108] rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">{asset.symbol}</span>
                    </div>
                    <span className="text-white font-medium">{asset.code}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-[#4a4a4a] rounded-full h-2">
                      <div className="bg-[#fbc108] h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-gray-400 text-sm w-12 text-right">{percentage}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    )
  }

  const handleNavigateToWallet = (crypto: string) => {
    setActiveSection("wallet")
    // Find and select the crypto asset
    const asset = cryptoAssets.find((c) => c.code === crypto)
    if (asset) {
      setSelectedCrypto(asset)
    }
  }

  const handleNavigateToTrade = (tradeId: string) => {
    setActiveSection("trading")
    // Could implement specific trade navigation logic here
  }

  return (
    <div className="min-h-screen bg-[#363636] flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 lg:ml-0 p-6">
        <div className="max-w-7xl mx-auto">
          {showWithdrawInterface ? (
            <WithdrawInterface
              withdrawCrypto={withdrawCrypto}
              setShowWithdrawInterface={setShowWithdrawInterface}
              setWithdrawCrypto={setWithdrawCrypto}
              setWithdrawAddress={setWithdrawAddress}
              setWithdrawNetwork={setWithdrawNetwork}
              setWithdrawAmount={setWithdrawAmount}
              withdrawPercentage={withdrawPercentage}
              handleWithdrawPercentageSelect={handleWithdrawPercentageSelect}
              withdrawAddress={withdrawAddress}
              withdrawNetwork={withdrawNetwork}
              withdrawAmount={withdrawAmount}
            />
          ) : showDepositInterface ? (
            <div className="bg-[#2f2f2f] border-none rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-medium">Deposit {depositCrypto.code}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDepositInterface(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-gray-400 text-sm mb-6">Deposit assets to crypto address</p>
              <div className="mb-6">
                <label className="text-white text-sm font-medium mb-2 block">Network</label>
                <div className="relative">
                  <select
                    value={selectedNetwork.code}
                    onChange={(e) => {
                      const network = (cryptoNetworks[depositCrypto.code as keyof typeof cryptoNetworks] || []).find(
                        (n) => n.code === e.target.value,
                      )
                      if (network) setSelectedNetwork(network)
                    }}
                    className="w-full bg-[#4a4a4a] border border-gray-600 text-white rounded-lg px-4 py-3 appearance-none cursor-pointer"
                  >
                    {(cryptoNetworks[depositCrypto.code as keyof typeof cryptoNetworks] || []).map((network) => (
                      <option key={network.code} value={network.code} className="bg-[#4a4a4a] text-white">
                        {network.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <Button
                className="w-full bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium py-3 rounded-lg"
                onClick={() => {
                  // Deposit logic here
                }}
              >
                Deposit
              </Button>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-gray-400 text-sm">Scan QR code to deposit</p>
                <Button
                  onClick={downloadQRCode}
                  className="bg-[#4a4a4a] text-gray-400 hover:bg-[#5a5a5a] hover:text-white px-3 py-2 rounded-lg flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download QR Code
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-gray-400 text-sm">Address: {selectedNetwork.address}</p>
                <Button
                  onClick={() => copyToClipboard(selectedNetwork.address)}
                  className="bg-[#4a4a4a] text-gray-400 hover:bg-[#5a5a5a] hover:text-white px-3 py-2 rounded-lg flex items-center gap-1"
                >
                  <Copy className="w-4 h-4" />
                  Copy Address
                </Button>
              </div>
              {copiedAddress && (
                <div className="mt-4 p-4 bg-[#4a4a4a] rounded-lg flex items-center justify-between">
                  <p className="text-white text-sm">Address copied to clipboard</p>
                  <Check className="w-4 h-4 text-[#fbc108]" />
                </div>
              )}
            </div>
          ) : activeSection === "wallet" ? (
            <WalletInterface />
          ) : activeSection === "trading" ? (
            <P2PTradingInterface />
          ) : activeSection === "transaction history" ? (
            <TransactionHistory onNavigateToWallet={handleNavigateToWallet} onNavigateToTrade={handleNavigateToTrade} />
          ) : activeSection === "contact us" ? (
            <ContactUs />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Balance Card */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-[#fbc108] border-none rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Currency Dropdown */}
                      <div className="relative" ref={currencyDropdownRef}>
                        <button
                          onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
                        >
                          <span className="text-black font-medium">{selectedCurrency.code}</span>
                          <ChevronDown className="w-4 h-4 text-black" />
                        </button>
                        {isCurrencyDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border z-50 min-w-[200px]">
                            {currencies.map((currency) => (
                              <button
                                key={currency.code}
                                onClick={() => {
                                  setSelectedCurrency(currency)
                                  setIsCurrencyDropdownOpen(false)
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
                              >
                                <span className="font-medium">{currency.name}</span>
                                <span className="text-gray-500">{currency.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Crypto Dropdown */}
                      <div className="relative" ref={cryptoDropdownRef}>
                        <button
                          onClick={() => setIsCryptoDropdownOpen(!isCryptoDropdownOpen)}
                          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
                        >
                          <span className="text-black font-medium">{selectedCrypto.code}</span>
                          <ChevronDown className="w-4 h-4 text-black" />
                        </button>
                        {isCryptoDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border z-50 min-w-[200px]">
                            {cryptoAssets.map((crypto) => (
                              <button
                                key={crypto.code}
                                onClick={() => {
                                  setSelectedCrypto(crypto)
                                  setIsCryptoDropdownOpen(false)
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
                              >
                                <span className="font-medium">{crypto.name}</span>
                                <span className="text-gray-500">{crypto.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-black text-4xl font-bold mb-2">
                      {selectedCurrency.symbol}
                      {calculateBalance()}
                    </div>
                    <div className="text-black/70 text-lg">
                      {selectedCrypto.balance} {selectedCrypto.code}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleDashboardDeposit}
                      className="flex-1 bg-black/20 hover:bg-black/30 text-white border-none font-medium py-3"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      DEPOSIT
                    </Button>
                    <Button
                      onClick={handleDashboardWithdraw}
                      className="flex-1 bg-black/20 hover:bg-black/30 text-white border-none font-medium py-3"
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      WITHDRAW
                    </Button>
                    <Button
                      onClick={handleDashboardSwap}
                      className="flex-1 bg-black/20 hover:bg-black/30 text-white border-none font-medium py-3"
                    >
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      SWAP
                    </Button>
                  </div>
                </Card>

                {/* Trading Chart */}
                <Card className="bg-[#6b7280] border-none rounded-2xl p-6">
                  <h3 className="text-white text-lg font-medium mb-4">Trading Chart</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <XAxis
                          dataKey="x"
                          axisLine={false}
                          tickLine={false}
                          tick={<CustomXAxisTick />}
                          domain={[0, 9]}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={<CustomYAxisTick />}
                          domain={[0, 1000]}
                          ticks={[0, 250, 500, 750, 1000]}
                        />
                        <Line type="monotone" dataKey="value" stroke="#fbc108" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="value" stroke="#919191" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Uncompleted Tasks */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-lg font-medium">Uncompleted tasks</h3>
                  <div className="w-4 h-4 bg-[#fbc108] rounded-sm flex items-center justify-center">
                    <span className="text-black text-xs font-bold">!</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Card className="bg-[#2f2f2f] border-none rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 bg-[#fbc108] rounded-sm flex items-center justify-center mt-0.5">
                          <span className="text-black text-xs font-bold">!</span>
                        </div>
                        <div>
                          <p className="text-white text-sm">
                            Your order of tyrion hoodie is yet to be completed, fill in your shipping address
                          </p>
                          <p className="text-[#bbbbbb] text-xs mt-1">1 day ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#bbbbbb] hover:text-white p-1">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                  <Card className="bg-[#2f2f2f] border-none rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 bg-[#fbc108] rounded-sm flex items-center justify-center mt-0.5">
                          <span className="text-black text-xs font-bold">!</span>
                        </div>
                        <div>
                          <p className="text-white text-sm">
                            Confirm payment of $3,000 into your USD wallet by Thechemdesigner03
                          </p>
                          <p className="text-[#bbbbbb] text-xs mt-1">2 hours ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#bbbbbb] hover:text-white p-1">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                  <Card className="bg-[#2f2f2f] border-none rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 bg-[#fbc108] rounded-sm flex items-center justify-center mt-0.5">
                          <span className="text-black text-xs font-bold">!</span>
                        </div>
                        <div>
                          <p className="text-white text-sm">
                            Your order of tyrion hoodie is yet to be completed, fill in your shipping address
                          </p>
                          <p className="text-[#bbbbbb] text-xs mt-1">1 day ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#bbbbbb] hover:text-white p-1">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
