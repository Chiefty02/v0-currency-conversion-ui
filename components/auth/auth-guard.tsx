"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User, Wallet } from "lucide-react"

interface AuthGuardProps {
  children: ReactNode
  message?: string
  showAuthButton?: boolean
  onAuthRequired?: () => void
}

export function AuthGuard({
  children,
  message = "Please sign in to access this feature",
  showAuthButton = true,
  onAuthRequired,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle>Authentication Required</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{message}</p>
          {showAuthButton && (
            <div className="space-y-2">
              <Button onClick={onAuthRequired} className="w-full">
                <User className="h-4 w-4 mr-2" />
                Sign In with Email
              </Button>
              <Button variant="outline" onClick={onAuthRequired} className="w-full bg-transparent">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
