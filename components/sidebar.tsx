"use client"

import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Settings,
  MessageCircle,
  LogOut,
  Menu,
  X,
  History,
  User,
  Shield,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  user?: any
  onLogout?: () => void
  onShowAuth?: () => void
}

export function Sidebar({ activeSection, onSectionChange, user, onLogout, onShowAuth }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true, requiresAuth: false },
    { icon: Wallet, label: "Wallet", active: false, requiresAuth: true },
    { icon: TrendingUp, label: "Trading", active: false, requiresAuth: true },
    { icon: History, label: "Transaction History", active: false, requiresAuth: true },
    { icon: Settings, label: "Settings", active: false, requiresAuth: false },
    { icon: MessageCircle, label: "Contact us", active: false, requiresAuth: false },
  ]

  const handleSectionClick = (item: any) => {
    if (item.requiresAuth && !user) {
      onShowAuth?.()
      return
    }
    onSectionChange(item.label.toLowerCase())
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#2f2f2f] text-white hover:bg-[#5d5b5b]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-[#2f2f2f] border-r border-[#5d5b5b]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-[#5d5b5b]">
            <h1 className="text-[#fbc108] text-2xl font-bold font-sans">{"TYRION"}</h1>
            {user && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-[#fbc108] flex items-center justify-center">
                  <User className="h-3 w-3 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.authType === "wallet" ? user.walletType : "Email"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.label.toLowerCase()
              const isLocked = item.requiresAuth && !user

              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={`
                    w-full justify-start gap-3 h-12 rounded-lg relative
                    ${
                      isActive
                        ? "bg-[#fbc108] text-black hover:bg-[#fbc108]/90"
                        : isLocked
                          ? "text-[#888888] hover:text-[#bbbbbb] hover:bg-[#3a3a3a]"
                          : "text-[#bbbbbb] hover:text-white hover:bg-[#5d5b5b]"
                    }
                  `}
                  onClick={() => handleSectionClick(item)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isLocked && <Shield className="w-3 h-3 ml-auto text-[#888888]" />}
                </Button>
              )
            })}
          </nav>

          {/* Auth Section */}
          <div className="p-4 border-t border-[#5d5b5b]">
            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 rounded-lg text-[#bbbbbb] hover:text-white hover:bg-[#5d5b5b]"
                onClick={() => {
                  onLogout?.()
                  setIsOpen(false)
                }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 rounded-lg text-[#fbc108] hover:text-[#fbc108]/80 hover:bg-[#5d5b5b] border border-[#fbc108]/30"
                onClick={() => {
                  onShowAuth?.()
                  setIsOpen(false)
                }}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
