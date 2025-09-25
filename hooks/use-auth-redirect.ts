"use client"

import { useAuth } from "@/contexts/auth-context"
import { useCallback } from "react"

export function useAuthRedirect() {
  const { isAuthenticated } = useAuth()

  const requireAuth = useCallback(
    (callback?: () => void) => {
      if (!isAuthenticated) {
        if (typeof window !== "undefined" && callback) {
          sessionStorage.setItem("post_auth_action", "callback")
        }
        return false
      }
      return true
    },
    [isAuthenticated],
  )

  const executePostAuthAction = useCallback(() => {
    if (typeof window !== "undefined") {
      const action = sessionStorage.getItem("post_auth_action")
      if (action) {
        sessionStorage.removeItem("post_auth_action")
        return true
      }
    }
    return false
  }, [])

  return {
    requireAuth,
    executePostAuthAction,
    isAuthenticated,
  }
}
