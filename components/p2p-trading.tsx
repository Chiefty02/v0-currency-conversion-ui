"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  Search,
  Filter,
  Star,
  Clock,
  Shield,
  MessageCircle,
  TrendingUp,
  User,
  CheckCircle,
  AlertCircle,
  X,
  Calculator,
  ArrowRight,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"

const giftCardAssets = [
  { code: "STEAM", name: "Steam Gift Card", icon: "🎮" },
  { code: "APPLE", name: "Apple Gift Card", icon: "🍎" },
  { code: "AMAZON", name: "Amazon Gift Card", icon: "📦" },
  { code: "RAZERGOLD", name: "Razer Gold", icon: "🎯" },
  { code: "MACY", name: "Macy's Gift Card", icon: "🛍️" },
  { code: "GOOGLE", name: "Google Play Card", icon: "📱" },
  { code: "XBOX", name: "Xbox Gift Card", icon: "🎮" },
  { code: "NETFLIX", name: "Netflix Gift Card", icon: "🎬" },
  { code: "SPOTIFY", name: "Spotify Gift Card", icon: "🎵" },
  { code: "WALMART", name: "Walmart Gift Card", icon: "🏪" },
]

const cryptoAssets = [
  { code: "BTC", name: "Bitcoin", symbol: "₿" },
  { code: "ETH", name: "Ethereum", symbol: "Ξ" },
  { code: "USDT", name: "Tether", symbol: "₮" },
  { code: "USDC", name: "USD Coin", symbol: "USDC" },
  { code: "BNB", name: "Binance Coin", symbol: "BNB" },
  { code: "SOL", name: "Solana", symbol: "◎" },
  { code: "ADA", name: "Cardano", symbol: "₳" },
  { code: "DOT", name: "Polkadot", symbol: "●" },
  { code: "MATIC", name: "Polygon", symbol: "◆" },
  { code: "AVAX", name: "Avalanche", symbol: "▲" },
  { code: "LINK", name: "Chainlink", symbol: "⬡" },
  { code: "UNI", name: "Uniswap", symbol: "🦄" },
  { code: "TYR", name: "Tyrion", symbol: "TYR" },
]

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 1650 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.35 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.52 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 149 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", rate: 7.24 },
]

const mockOffers = [
  {
    id: 6,
    user: {
      name: "NairaTrader",
      avatar: "🇳🇬",
      rating: 4.9,
      trades: 1850,
      verified: true,
      online: true,
    },
    asset: "STEAM",
    type: "buy",
    basePrice: 850, // Base price in USD (will be converted to NGN: 850 * 1650 = ₦1,402,500 per $1 Steam card)
    amount: "$10-$500",
    paymentMethod: "Bank Transfer",
    discount: "3%",
    timeLimit: "30 mins",
    terms: "Steam gift cards only. Must provide clear receipt and card details. Fast payment guaranteed.",
  },
  {
    id: 1,
    user: {
      name: "Cinamon2356",
      avatar: "👤",
      rating: 4.8,
      trades: 1250,
      verified: true,
      online: true,
    },
    asset: "ETH",
    type: "sell",
    basePrice: 2389, // Base price in USD
    amount: "0.5-2.0 ETH",
    paymentMethod: "Bank Transfer",
    discount: "2%",
    timeLimit: "15 mins",
    terms: "Fast and secure trading. ID verification required.",
  },
  {
    id: 2,
    user: {
      name: "CryptoKing99",
      avatar: "👑",
      rating: 4.9,
      trades: 2100,
      verified: true,
      online: true,
    },
    asset: "USDT",
    type: "buy",
    basePrice: 0.998,
    amount: "100-5000 USDT",
    paymentMethod: "Bank Transfer",
    discount: "0.2%",
    timeLimit: "30 mins",
    terms: "Quick payment, no delays. Minimum 100 USDT.",
  },
  {
    id: 3,
    user: {
      name: "GiftCardPro",
      avatar: "🎁",
      rating: 4.7,
      trades: 890,
      verified: true,
      online: false,
    },
    asset: "STEAM",
    type: "buy",
    basePrice: 95,
    amount: "$50-$500",
    paymentMethod: "Crypto Payment",
    discount: "5%",
    timeLimit: "45 mins",
    terms: "Steam cards only. Must provide receipt.",
  },
  {
    id: 4,
    user: {
      name: "TradeExpert",
      avatar: "⭐",
      rating: 5.0,
      trades: 3200,
      verified: true,
      online: true,
    },
    asset: "BTC",
    type: "sell",
    basePrice: 43250,
    amount: "0.01-1.0 BTC",
    paymentMethod: "Bank Transfer",
    discount: "1%",
    timeLimit: "20 mins",
    terms: "Premium trader. Fast execution guaranteed.",
  },
  {
    id: 5,
    user: {
      name: "AmazonDeals",
      avatar: "📦",
      rating: 4.6,
      trades: 650,
      verified: true,
      online: true,
    },
    asset: "AMAZON",
    type: "sell",
    basePrice: 98,
    amount: "$25-$1000",
    paymentMethod: "Crypto Payment",
    discount: "2%",
    timeLimit: "60 mins",
    terms: "Amazon gift cards. Digital delivery only.",
  },
]

export function P2PTradingInterface() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")
  const [selectedAssetType, setSelectedAssetType] = useState<"giftcard" | "crypto">("giftcard")
  const [selectedAsset, setSelectedAsset] = useState(giftCardAssets[0])
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [isAssetDropdownOpen, setIsAssetDropdownOpen] = useState(false)
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<any>(null)
  const [tradeAmount, setTradeAmount] = useState("")
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("All Methods")
  const [showTradeChat, setShowTradeChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [tradeData, setTradeData] = useState<any>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  const assetDropdownRef = useRef<HTMLDivElement>(null)
  const currencyDropdownRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (showTradeChat && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [showTradeChat, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const currentAssets = selectedAssetType === "giftcard" ? giftCardAssets : cryptoAssets

  const convertPrice = (basePrice: number) => {
    const convertedPrice = basePrice * selectedCurrency.rate
    return convertedPrice.toLocaleString("en-US", {
      minimumFractionDigits: selectedCurrency.code === "JPY" ? 0 : 2,
      maximumFractionDigits: selectedCurrency.code === "JPY" ? 0 : 2,
    })
  }

  const filteredOffers = mockOffers.filter((offer) => {
    const matchesTab = offer.type === activeTab
    const matchesAsset = offer.asset === selectedAsset.code
    const matchesSearch = offer.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPayment = selectedPaymentMethod === "All Methods" || offer.paymentMethod === selectedPaymentMethod
    return matchesTab && matchesAsset && matchesSearch && matchesPayment
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (assetDropdownRef.current && !assetDropdownRef.current.contains(event.target as Node)) {
        setIsAssetDropdownOpen(false)
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleAssetTypeChange = (type: "giftcard" | "crypto") => {
    setSelectedAssetType(type)
    setSelectedAsset(type === "giftcard" ? giftCardAssets[0] : cryptoAssets[0])
  }

  const handleOfferClick = (offer: any) => {
    setSelectedOffer(offer)
    setShowTradeModal(true)
    setTradeAmount("")
  }

  const calculateReceiveAmount = () => {
    if (!tradeAmount || !selectedOffer) return "0"

    const amount = Number.parseFloat(tradeAmount)
    if (isNaN(amount)) return "0"

    const priceInSelectedCurrency = selectedOffer.basePrice * selectedCurrency.rate

    if (selectedAssetType === "giftcard") {
      if (activeTab === "buy") {
        return `$${(amount / priceInSelectedCurrency).toFixed(2)}`
      } else {
        return (amount * priceInSelectedCurrency).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      }
    } else {
      if (activeTab === "buy") {
        return (amount / priceInSelectedCurrency).toFixed(6)
      } else {
        return (amount * priceInSelectedCurrency).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      }
    }
  }

  const getReceiveCurrency = () => {
    if (selectedAssetType === "giftcard") {
      return activeTab === "buy" ? "USD" : selectedCurrency.code
    } else {
      return activeTab === "buy" ? selectedAsset.code : selectedCurrency.code
    }
  }

  const handleProceedToTrade = () => {
    if (!tradeAmount || !selectedOffer) return

    const amount = Number.parseFloat(tradeAmount)
    const receiveAmount = calculateReceiveAmount()
    const receiveCurrency = getReceiveCurrency()

    setTradeData({
      offer: selectedOffer,
      sendAmount: amount,
      sendCurrency: selectedAssetType === "giftcard" ? selectedCurrency.code : selectedAsset.code,
      receiveAmount: receiveAmount,
      receiveCurrency: receiveCurrency,
      tradeType: activeTab,
      assetType: selectedAssetType,
      asset: selectedAsset,
    })

    setChatMessages([
      {
        id: 1,
        sender: selectedOffer.user.name,
        message: `Hello! Ready to ${activeTab} ${selectedAsset.name}. Please follow the instructions carefully.`,
        timestamp: new Date(),
        type: "text",
      },
    ])

    setShowTradeModal(false)
    setShowTradeChat(true)
    setTimeLeft(30 * 60)
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: "You",
      message: chatMessage,
      timestamp: new Date(),
      type: "text",
    }

    setChatMessages([...chatMessages, newMessage])
    setChatMessage("")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: "You",
      message: `Uploaded: ${file.name}`,
      timestamp: new Date(),
      type: "file",
      fileName: file.name,
    }

    setChatMessages([...chatMessages, newMessage])
  }

  const closeTradeModal = () => {
    setShowTradeModal(false)
    setSelectedOffer(null)
    setTradeAmount("")
  }

  const closeTradeChat = () => {
    setShowTradeChat(false)
    setTradeData(null)
    setChatMessages([])
    setTimeLeft(30 * 60)
  }

  const handlePaymentMade = () => {
    setShowTradeChat(false)
    setShowConfirmation(true)
  }

  const handleConfirmPayment = (confirmed: boolean) => {
    if (confirmed) {
      setShowConfirmation(false)
      setShowCompletion(true)
      // Auto close completion after 5 seconds
      setTimeout(() => {
        setShowCompletion(false)
        setTradeData(null)
        setChatMessages([])
        setTimeLeft(30 * 60)
      }, 5000)
    } else {
      setShowConfirmation(false)
      setShowTradeChat(true)
    }
  }

  const handleCloseCompletion = () => {
    setShowCompletion(false)
    setTradeData(null)
    setChatMessages([])
    setTimeLeft(30 * 60)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">P2P Trading</h2>
          <p className="text-gray-400">Trade gift cards and cryptocurrencies directly with other users</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Shield className="w-4 h-4" />
          <span>Secure P2P Trading</span>
        </div>
      </div>

      {/* Trading Tabs */}
      <div className="flex items-center gap-0 bg-[#2f2f2f] rounded-xl p-1 w-fit">
        <Button
          onClick={() => setActiveTab("buy")}
          className={`px-8 py-3 rounded-lg font-medium transition-all ${
            activeTab === "buy"
              ? "bg-[#fbc108] text-black hover:bg-[#e6ad07]"
              : "bg-transparent text-gray-400 hover:text-white hover:bg-[#4a4a4a]"
          }`}
        >
          Buy
        </Button>
        <Button
          onClick={() => setActiveTab("sell")}
          className={`px-8 py-3 rounded-lg font-medium transition-all ${
            activeTab === "sell"
              ? "bg-[#fbc108] text-black hover:bg-[#e6ad07]"
              : "bg-transparent text-gray-400 hover:text-white hover:bg-[#4a4a4a]"
          }`}
        >
          Sell
        </Button>
      </div>

      {/* Asset Type Selection */}
      <Card className="bg-[#2f2f2f] border-none rounded-xl p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="giftcard"
              name="assetType"
              checked={selectedAssetType === "giftcard"}
              onChange={() => handleAssetTypeChange("giftcard")}
              className="w-4 h-4 text-[#fbc108] bg-[#4a4a4a] border-gray-600 focus:ring-[#fbc108]"
            />
            <label htmlFor="giftcard" className="text-white font-medium cursor-pointer">
              Gift Cards
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="crypto"
              name="assetType"
              checked={selectedAssetType === "crypto"}
              onChange={() => handleAssetTypeChange("crypto")}
              className="w-4 h-4 text-[#fbc108] bg-[#4a4a4a] border-gray-600 focus:ring-[#fbc108]"
            />
            <label htmlFor="crypto" className="text-white font-medium cursor-pointer">
              Crypto Assets
            </label>
          </div>
        </div>

        {/* Asset Selection, Currency Selection and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1" ref={assetDropdownRef}>
            <label className="text-white text-sm font-medium mb-2 block">
              Select {selectedAssetType === "giftcard" ? "Gift Card" : "Cryptocurrency"}
            </label>
            <button
              onClick={() => setIsAssetDropdownOpen(!isAssetDropdownOpen)}
              className="w-full bg-[#4a4a4a] border border-gray-600 text-white rounded-lg px-4 py-3 flex items-center justify-between hover:bg-[#5a5a5a] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {selectedAssetType === "giftcard" ? selectedAsset.icon : (selectedAsset as any).symbol}
                </span>
                <span className="font-medium">{selectedAsset.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {isAssetDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#4a4a4a] rounded-lg shadow-lg border border-gray-600 z-50 max-h-60 overflow-y-auto">
                {currentAssets.map((asset) => (
                  <button
                    key={asset.code}
                    onClick={() => {
                      setSelectedAsset(asset)
                      setIsAssetDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[#5a5a5a] first:rounded-t-lg last:rounded-b-lg flex items-center gap-3 text-white"
                  >
                    <span className="text-xl">
                      {selectedAssetType === "giftcard" ? asset.icon : (asset as any).symbol}
                    </span>
                    <span className="font-medium">{asset.name}</span>
                    <span className="text-gray-400 ml-auto">{asset.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1" ref={currencyDropdownRef}>
            <label className="text-white text-sm font-medium mb-2 block">Trading Currency</label>
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="w-full bg-[#4a4a4a] border border-gray-600 text-white rounded-lg px-4 py-3 flex items-center justify-between hover:bg-[#5a5a5a] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{selectedCurrency.symbol}</span>
                <span className="font-medium">{selectedCurrency.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {isCurrencyDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#4a4a4a] rounded-lg shadow-lg border border-gray-600 z-50 max-h-60 overflow-y-auto">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency)
                      setIsCurrencyDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[#5a5a5a] first:rounded-t-lg last:rounded-b-lg flex items-center gap-3 text-white"
                  >
                    <span className="text-xl">{currency.symbol}</span>
                    <span className="font-medium">{currency.name}</span>
                    <span className="text-gray-400 ml-auto">{currency.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1">
            <label className="text-white text-sm font-medium mb-2 block">Search Traders</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by trader name..."
                className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 pl-10"
              />
            </div>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white bg-transparent px-4 py-3"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 p-4 bg-[#4a4a4a] rounded-lg">
            <h4 className="text-white font-medium mb-4">Filter Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Payment Method</label>
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full bg-[#5a5a5a] border border-gray-600 text-white rounded-lg px-3 py-2"
                >
                  <option>All Methods</option>
                  <option>Bank Transfer</option>
                  <option>Crypto Payment</option>
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Min Rating</label>
                <select className="w-full bg-[#5a5a5a] border border-gray-600 text-white rounded-lg px-3 py-2">
                  <option>Any Rating</option>
                  <option>4.5+ Stars</option>
                  <option>4.0+ Stars</option>
                  <option>3.5+ Stars</option>
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Online Status</label>
                <select className="w-full bg-[#5a5a5a] border border-gray-600 text-white rounded-lg px-3 py-2">
                  <option>All Users</option>
                  <option>Online Only</option>
                  <option>Recently Active</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Trading Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#2f2f2f] border-none rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fbc108] rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">24h Volume</p>
              <p className="text-white font-bold">$2.4M</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#2f2f2f] border-none rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Traders</p>
              <p className="text-white font-bold">1,247</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#2f2f2f] border-none rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Response</p>
              <p className="text-white font-bold">2.3 min</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#2f2f2f] border-none rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="text-white font-bold">98.7%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Offers List */}
      <Card className="bg-[#2f2f2f] border-none rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-semibold">
            {activeTab === "buy" ? "Buy" : "Sell"} {selectedAsset.name} Offers
          </h3>
          <div className="text-gray-400 text-sm">{filteredOffers.length} offers available</div>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#4a4a4a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No offers found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search for different assets</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOffers.map((offer) => (
              <Card
                key={offer.id}
                className="bg-[#4a4a4a] border-none rounded-xl p-6 hover:bg-[#5a5a5a] transition-colors cursor-pointer"
                onClick={() => handleOfferClick(offer)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#fbc108] rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-lg">{offer.user.avatar}</span>
                      </div>
                      {offer.user.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#4a4a4a]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold">{offer.user.name}</h4>
                        {offer.user.verified && <CheckCircle className="w-4 h-4 text-[#fbc108]" />}
                        {offer.user.online ? (
                          <span className="text-green-400 text-xs">Online</span>
                        ) : (
                          <span className="text-gray-500 text-xs">Offline</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{offer.user.rating}</span>
                        </div>
                        <span>{offer.user.trades} trades</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{offer.timeLimit}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">
                        {selectedCurrency.symbol}
                        {convertPrice(offer.basePrice)}
                      </div>
                      <div className="text-gray-400 text-sm">{offer.amount}</div>
                      {offer.discount && <div className="text-green-400 text-sm">{offer.discount} discount</div>}
                    </div>

                    <div className="text-right">
                      <div className="text-gray-300 text-sm mb-1">{offer.paymentMethod}</div>
                      <div className="text-gray-500 text-xs max-w-48 truncate">{offer.terms}</div>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOfferClick(offer)
                      }}
                      className="bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium px-6 py-2 rounded-lg"
                    >
                      {activeTab === "buy" ? "Buy" : "Sell"} {selectedAsset.code}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Trade Modal */}
      {showTradeModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[#2f2f2f] border-none rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setActiveTab("buy")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "buy" ? "bg-[#fbc108] text-black" : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Buy
                </Button>
                <Button
                  onClick={() => setActiveTab("sell")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "sell" ? "bg-[#fbc108] text-black" : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Sell
                </Button>
              </div>
              <Button onClick={closeTradeModal} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Rate:</span>
                <span className="text-white font-medium">
                  {convertPrice(selectedOffer.basePrice)} {selectedCurrency.code}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Range:</span>
                <span className="text-white font-medium">{selectedOffer.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Assets:</span>
                <span className="text-white font-medium">{selectedAsset.name}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  How much do you want to {activeTab}? 💰
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 pr-16"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    {selectedAssetType === "giftcard" ? selectedCurrency.code : selectedAsset.code}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calculator className="w-4 h-4" />
                <span>You will receive:</span>
                <span className="text-[#fbc108] font-bold">
                  {calculateReceiveAmount()} {getReceiveCurrency()}
                </span>
              </div>

              <Button
                onClick={handleProceedToTrade}
                className="w-full bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium py-3 rounded-lg"
                disabled={!tradeAmount || Number.parseFloat(tradeAmount) <= 0}
              >
                Proceed to trade
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="mt-6 p-4 bg-[#4a4a4a] rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#fbc108] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm">{selectedOffer.user.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{selectedOffer.user.name}</span>
                    {selectedOffer.user.verified && <CheckCircle className="w-3 h-3 text-[#fbc108]" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{selectedOffer.user.rating}</span>
                    </div>
                    <span>{selectedOffer.user.trades} trades</span>
                    <span className="text-green-400">Online</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{selectedOffer.terms}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Trade Chat Interface */}
      {showTradeChat && tradeData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[#2f2f2f] border-none rounded-xl w-full max-w-2xl h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-600">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#fbc108] rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-[#fbc108] text-2xl font-bold">{formatTime(timeLeft)}</div>
                  <div className="text-gray-400 text-sm">Time remaining</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-white font-medium">
                    {tradeData.tradeType === "buy" ? "You're buying" : "You're selling"}
                  </div>
                  <div className="text-[#fbc108] font-bold">
                    {tradeData.sendAmount} {tradeData.sendCurrency}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-gray-400" />

                <div className="text-right">
                  <div className="text-white font-medium">You'll receive</div>
                  <div className="text-[#fbc108] font-bold">
                    {tradeData.receiveAmount} {tradeData.receiveCurrency}
                  </div>
                </div>
              </div>

              <Button onClick={closeTradeChat} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Balance Display */}
            <div className="flex items-center justify-between p-4 bg-[#4a4a4a] mx-6 mt-4 rounded-lg">
              <div className="text-center">
                <div className="text-gray-400 text-sm">Your balance</div>
                <div className="text-[#fbc108] font-bold">
                  {tradeData.receiveCurrency === "NGN"
                    ? "₦234,500"
                    : tradeData.receiveCurrency === "USD"
                      ? "$2,450"
                      : `24,800 ${tradeData.receiveCurrency}`}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm">To send</div>
                <div className="text-white font-bold flex items-center gap-2">
                  {tradeData.sendCurrency === "NGN" ? "₦" : tradeData.sendCurrency === "USD" ? "$" : ""}
                  {tradeData.sendAmount}
                  <button className="text-[#fbc108] text-sm hover:text-[#e6ad07]">📋</button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "You" ? "bg-[#fbc108] text-black" : "bg-[#4a4a4a] text-white"
                      }`}
                    >
                      <div className="font-medium text-sm mb-1">{msg.sender}</div>
                      <div className="text-sm">{msg.message}</div>
                      {msg.type === "file" && (
                        <div className="mt-2 p-2 bg-black/20 rounded text-xs">📎 {msg.fileName}</div>
                      )}
                      <div className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-600">
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  📎
                </Button>
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#fbc108] hover:bg-[#e6ad07] text-black px-4"
                  disabled={!chatMessage.trim()}
                >
                  Send
                </Button>
              </div>

              <div className="mt-4">
                <Button
                  onClick={handlePaymentMade}
                  className="w-full bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium py-3 rounded-lg"
                >
                  🔒 Payment made
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && tradeData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[#2f2f2f] border-none rounded-xl w-full max-w-md p-8 text-center">
            <div className="w-16 h-16 bg-[#4a4a4a] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-[#fbc108] text-2xl">❓</span>
            </div>

            <h3 className="text-white text-lg font-semibold mb-4">
              Please Confirm the {tradeData.tradeType === "buy" ? "receipt" : "payment"} of
            </h3>

            <div className="text-[#fbc108] text-2xl font-bold mb-2">
              {tradeData.tradeType === "buy"
                ? `${tradeData.receiveAmount} ${tradeData.receiveCurrency}`
                : `${tradeData.sendAmount} ${tradeData.sendCurrency}`}
            </div>

            <p className="text-gray-400 text-sm mb-8">
              {tradeData.tradeType === "buy" ? `from ${tradeData.offer.user.name}` : `to ${tradeData.offer.user.name}`}
            </p>

            <div className="flex gap-4">
              <Button
                onClick={() => handleConfirmPayment(true)}
                className="flex-1 bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium py-3 rounded-lg"
              >
                Confirmed
              </Button>
              <Button
                onClick={() => handleConfirmPayment(false)}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white bg-transparent py-3 rounded-lg"
              >
                Not confirmed
              </Button>
            </div>

            <Button
              onClick={() => setShowConfirmation(false)}
              className="w-full mt-4 bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white py-2 rounded-lg"
            >
              💬 Message
            </Button>
          </Card>
        </div>
      )}

      {/* Completion Modal */}
      {showCompletion && tradeData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[#2f2f2f] border-none rounded-xl w-full max-w-md p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-white text-xl font-bold mb-4">Trade Completed!</h3>

            <p className="text-gray-300 text-lg mb-6">
              Trade Completed with <span className="text-[#fbc108] font-semibold">{tradeData.offer.user.name}</span>
            </p>

            <div className="bg-[#4a4a4a] rounded-lg p-4 mb-6">
              <div className="text-gray-400 text-sm mb-2">Transaction Summary</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Asset:</span>
                  <span className="text-white">{tradeData.asset.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Amount {tradeData.tradeType === "buy" ? "Bought" : "Sold"}:</span>
                  <span className="text-[#fbc108] font-semibold">
                    {tradeData.tradeType === "buy"
                      ? `${tradeData.receiveAmount} ${tradeData.receiveCurrency}`
                      : `${tradeData.sendAmount} ${tradeData.sendCurrency}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total {tradeData.tradeType === "buy" ? "Paid" : "Received"}:</span>
                  <span className="text-white font-semibold">
                    {tradeData.tradeType === "buy"
                      ? `${tradeData.sendAmount} ${tradeData.sendCurrency}`
                      : `${tradeData.receiveAmount} ${tradeData.receiveCurrency}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Payment Method:</span>
                  <span className="text-white">{tradeData.offer.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Trade ID:</span>
                  <span className="text-gray-300 font-mono">
                    #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCloseCompletion}
                className="flex-1 bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium py-3 rounded-lg"
              >
                Continue Trading
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white bg-transparent py-3 rounded-lg"
              >
                View Receipt
              </Button>
            </div>

            <p className="text-gray-500 text-xs mt-4">This window will close automatically in a few seconds</p>
          </Card>
        </div>
      )}

      {/* Create Offer CTA */}
      <Card className="bg-gradient-to-r from-[#fbc108] to-[#e6ad07] border-none rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-black text-xl font-bold mb-2">Create Your Own Offer</h3>
            <p className="text-black/80">Set your own rates and payment methods. Start trading with better margins.</p>
          </div>
          <Button className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg">
            Create Offer
          </Button>
        </div>
      </Card>

      {/* Safety Tips */}
      <Card className="bg-[#2f2f2f] border-none rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">P2P Trading Safety Tips</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Always verify trader ratings and completion rates before trading</li>
              <li>• Use the platform's escrow service for secure transactions</li>
              <li>• Never share sensitive personal information outside the platform</li>
              <li>• Report suspicious activities to our support team immediately</li>
              <li>• Double-check payment details before confirming transactions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
