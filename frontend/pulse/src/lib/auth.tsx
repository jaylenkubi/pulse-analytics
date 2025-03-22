'use client'

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { useRefresh } from "@/api/generated/auth/auth"

type AuthContextType = {
  accessToken: string | null
  setTokens: (access: string, refresh: string) => void
  logout: () => void
  refreshAccessToken: () => Promise<void>
  isTokenExpired: () => boolean
}

type JwtPayload = {
  exp: number
  [key: string]: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const REFRESH_TOKEN_KEY = "refreshToken"
const ACCESS_TOKEN_KEY = "accessToken"
// Token will be refreshed when less than this amount of time remains (5 minutes)
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000 

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const router = useRouter()

  const { mutateAsync: refreshToken } = useRefresh({
    mutation: {
      onSuccess: (data) => {
      setAccessToken(data.accessToken)
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
      },
      onError: (error) => {
        console.error("Error refreshing token:", error)
        logout()
      }
    }
  })

  useEffect(() => {
    const initializeAuth = async () => {
      if (storedAccessToken) {
        try {
          const decodedToken = jwtDecode<JwtPayload>(storedAccessToken)
          const expirationTime = decodedToken.exp * 1000
          if (Date.now() < expirationTime) {
            setAccessToken(storedAccessToken)
            return
          }
        } catch (error) {
          console.error("Error with stored access token:", error)
        }
      }
      if (storedRefreshToken) {
        await refreshToken({ data: { refreshToken: storedRefreshToken } })
      }
    }

    initializeAuth()
  }, [])

  const setTokens = (access: string, refresh: string) => {
    setAccessToken(access)
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  }

  const logout = () => {
    setAccessToken(null)
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    router.push("/login")
  }

  const isTokenExpired = useCallback(() => {
    const token = accessToken || localStorage.getItem(ACCESS_TOKEN_KEY)
    if (!token) return true
    
    try {
      const decodedToken = jwtDecode<JwtPayload>(token)
      const expirationTime = decodedToken.exp * 1000 // Convert to milliseconds
      return Date.now() >= expirationTime - TOKEN_REFRESH_THRESHOLD
    } catch (error) {
      console.error("Error decoding token:", error)
      return true
    }
  }, [accessToken])

  const refreshAccessToken = async () => {
    if (storedRefreshToken) {
      await refreshToken({ data: { refreshToken: storedRefreshToken } })
    }
  }

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      setTokens, 
      refreshAccessToken,
      logout, 
      isTokenExpired
    }}>
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
