'use client'

import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"

type AuthContextType = {
  accessToken: string | null
  setTokens: (access: string, refresh: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const REFRESH_TOKEN_KEY = "refreshToken"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const router = useRouter()

  const setTokens = (access: string, refresh: string) => {
    setAccessToken(access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  }

  const logout = () => {
    setAccessToken(null)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ accessToken, setTokens, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
