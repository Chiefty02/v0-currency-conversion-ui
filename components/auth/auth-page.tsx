"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Wallet, Mail, ArrowLeft, Shield, Zap } from "lucide-react"
import type { User } from "@/types/auth"

interface AuthPageProps {
  onBack: () => void
  onAuthSuccess: (user: User) => void
}

export function AuthPage({ onBack, onAuthSuccess }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  const handleEmailAuth = async (type: "signin" | "signup") => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onAuthSuccess({
        id: "1",
        email: formData.email,
        name: formData.name || "User",
        authType: "email",
      })
    }, 2000)
  }

  const handleWalletConnect = async (walletType: string) => {
    setIsLoading(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsLoading(false)
      onAuthSuccess({
        id: "2",
        address: "0x1234...5678",
        name: "Wallet User",
        authType: "wallet",
        walletType,
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen auth-gradient flex justify-center p-4 items-end">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to App
          </Button>

          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{"Welcome to TYRION\n"} </h1>
          <p className="text-muted-foreground mt-2">Trade crypto and gift cards with TRUST </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        className="bg-background border-border pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleEmailAuth("signin")}
                    disabled={isLoading || !formData.email || !formData.password}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Sign In with Email
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        className="bg-background border-border pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Confirm Password</label>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className="bg-background border-border"
                    />
                  </div>

                  <Button
                    onClick={() => handleEmailAuth("signup")}
                    disabled={
                      isLoading ||
                      !formData.email ||
                      !formData.password ||
                      !formData.name ||
                      formData.password !== formData.confirmPassword
                    }
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Web3 Wallet Options */}
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => handleWalletConnect("MetaMask")}
                disabled={isLoading}
                className="w-full wallet-button justify-start"
              >
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded bg-orange-500 mr-3 flex items-center justify-center">
                    <Wallet className="h-3 w-3 text-white" />
                  </div>
                  MetaMask
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleWalletConnect("WalletConnect")}
                disabled={isLoading}
                className="w-full wallet-button justify-start"
              >
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded bg-blue-500 mr-3 flex items-center justify-center">
                    <Wallet className="h-3 w-3 text-white" />
                  </div>
                  WalletConnect
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleWalletConnect("Coinbase")}
                disabled={isLoading}
                className="w-full wallet-button justify-start"
              >
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded bg-blue-600 mr-3 flex items-center justify-center">
                    <Wallet className="h-3 w-3 text-white" />
                  </div>
                  Coinbase Wallet
                </div>
              </Button>
            </div>

            {/* Security Notice */}
            <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/50">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Secure & Decentralized</p>
                <p>Your funds remain in your control. We never store your private keys or seed phrases.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}
