"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, Wallet, TrendingUp, Settings, MessageCircle, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Wallet, label: "Wallet", active: false },
    { icon: TrendingUp, label: "Trading", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: MessageCircle, label: "Contact us", active: false },
  ]

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
            <h1 className="text-[#fbc108] text-2xl font-bold">Tyrion</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.label.toLowerCase()
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={`
                    w-full justify-start gap-3 h-12 rounded-lg
                    ${
                      isActive
                        ? "bg-[#fbc108] text-black hover:bg-[#fbc108]/90"
                        : "text-[#bbbbbb] hover:text-white hover:bg-[#5d5b5b]"
                    }
                  `}
                  onClick={() => {
                    onSectionChange(item.label.toLowerCase())
                    setIsOpen(false)
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#5d5b5b]">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 rounded-lg text-[#bbbbbb] hover:text-white hover:bg-[#5d5b5b]"
              onClick={() => {
                onSectionChange("logout")
                setIsOpen(false)
              }}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
