'use client'

import { useRouter } from 'next/router'
import { useAuth } from '@/lib/auth'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { cn } from '@/lib/utils'

// Public routes that don't require authentication
const publicRoutes = ['/login', '/signup']

export function PathCheck({ 
  children,
  defaultOpen = false
}: { 
  children: React.ReactNode
  defaultOpen?: boolean 
}) {
  const router = useRouter()
  const { accessToken } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(!defaultOpen)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.includes(router.pathname)
    
    // If not a public route and no access token, redirect to login
    if (!isPublicRoute && !accessToken) {
      router.push('/login')
    } else {
      setIsLoading(false)
    }
  }, [router, accessToken])

  // If loading, show nothing
  if (isLoading) {
    return null
  }

  // If it's a public route, just render the children without layout
  if (publicRoutes.includes(router.pathname)) {
    return <main>{children}</main>
  }

  // Otherwise, render with the full layout
  return (
    <div className="min-h-screen relative">
      <Header className="border-b border-border/40 shadow-sm" />
      <div className="flex">
        <aside className={cn(
          "hidden md:block fixed inset-y-0 z-40 mt-16 transition-all duration-300 ease-in-out border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          sidebarCollapsed ? "w-16" : "w-64"
        )}>
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
        </aside>
        <main className={cn(
          "flex-1 pt-16 transition-all duration-300 ease-in-out",
          "md:pl-64",
          sidebarCollapsed && "md:pl-16"
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}
