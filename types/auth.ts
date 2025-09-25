export interface User {
  id: string
  email?: string
  name: string
  authType: "email" | "wallet"
  address?: string
  walletType?: string
}

export interface WalletData {
  address: string
  balance: string
  walletType: string
  chainId: number
}

export interface AuthError {
  message: string
  code?: string
}
