"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AuthPage } from "./auth-page"

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, login } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <AuthPage
          onBack={() => window.history.back()}
          onAuthSuccess={(userData) => {
            login(userData)
          }}
        />
      )
    )
  }

  return <>{children}</>
}
