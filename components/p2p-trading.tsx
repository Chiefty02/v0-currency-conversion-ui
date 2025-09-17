"use client"

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
  TrendingDown,
  User,
  CheckCircle,
  AlertCircle,
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

const mockOffers = [
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
    price: "$2,389",
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
    price: "$0.998",
    amount: "100-5000 USDT",
    paymentMethod: "PayPal",
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
    price: "$95",
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
    price: "$43,250",
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
    price: "$98",
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
  const [isAssetDropdownOpen, setIsAssetDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const assetDropdownRef = useRef<HTMLDivElement>(null)

  const currentAssets = selectedAssetType === "giftcard" ? giftCardAssets : cryptoAssets

  const filteredOffers = mockOffers.filter((offer) => {
    const matchesTab = offer.type === activeTab
    const matchesAsset = offer.asset === selectedAsset.code
    const matchesSearch = offer.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesAsset && matchesSearch
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (assetDropdownRef.current && !assetDropdownRef.current.contains(event.target as Node)) {
        setIsAssetDropdownOpen(false)
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

        {/* Asset Selection and Search */}
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
                <select className="w-full bg-[#5a5a5a] border border-gray-600 text-white rounded-lg px-3 py-2">
                  <option>All Methods</option>
                  <option>Bank Transfer</option>
                  <option>PayPal</option>
                  <option>Crypto Payment</option>
                  <option>Cash</option>
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
          <div className="text-gray-400 text-sm">
            {filteredOffers.length} offers available
          </div>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#4a4a4a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No offers found</p>
            <p className="text-gray-500 text-sm">
              Try adjusting your filters or search for different assets
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOffers.map((offer) => (
              <Card key={offer.id} className="bg-[#4a4a4a] border-none rounded-xl p-6 hover:bg-[#5a5a5a] transition-colors">
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
                        {offer.user.verified && (
                          <CheckCircle className="w-4 h-4 text-[#fbc108]" />
                        )}
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
                      <div className="text-white font-bold text-lg">{offer.price}</div>
                      <div className="text-gray-400 text-sm">{offer.amount}</div>
                      {offer.discount && (
                        <div className="text-green-400 text-sm">{offer.discount} discount</div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-gray-300 text-sm mb-1">{offer.paymentMethod}</div>
                      <div className="text-gray-500 text-xs max-w-48 truncate">
                        {offer.terms}
                      </div>
                    </div>

                    <Button
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

      {/* Create Offer CTA */}
      <Card className="bg-gradient-to-r from-[#fbc108] to-[#e6ad07] border-none rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-black text-xl font-bold mb-2">Create Your Own Offer</h3>
            <p className="text-black/80">
              Set your own rates and payment methods. Start trading with better margins.
            </p>
          </div>
          <Button
            className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg"
          >
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