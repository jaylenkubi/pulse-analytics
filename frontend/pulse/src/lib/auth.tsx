'use client'

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { authControllerRefresh } from "@/api/generated/auth/auth"
import { jwtDecode } from "jwt-decode"

type AuthContextType = {
  accessToken: string | null
  setTokens: (access: string, refresh: string) => void
  logout: () => void
  refreshAccessToken: () => Promise<string | null>
  isTokenExpired: () => boolean
}

type JwtPayload = {
  exp: number
  [key: string]: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const REFRESH_TOKEN_KEY = "refreshToken"
const ACCESS_TOKEN_KEY = "accessToken"
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000 

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const router = useRouter()

  // Check for existing token on initialization
  useEffect(() => {
    const initializeAuth = async () => {
      // First check if we have a stored access token
      const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
      
      if (storedAccessToken) {
        // Check if the stored token is valid and not expired
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
      
      // If we have a refresh token but no valid access token, try to refresh
      const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
      if (storedRefreshToken) {
        try {
          const newToken = await refreshAccessToken()
          if (!newToken) {
            logout()
          }
        } catch (error) {
          logout()
        }
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

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!refreshToken) return null

    try {
      const response = await authControllerRefresh({ refreshToken })
      const newAccessToken = response.accessToken
      setAccessToken(newAccessToken)
      localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken)
      return newAccessToken
    } catch (error) {
      console.error("Error refreshing token:", error)
      return null
    }
  }, [])

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      setTokens, 
      logout, 
      refreshAccessToken,
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
