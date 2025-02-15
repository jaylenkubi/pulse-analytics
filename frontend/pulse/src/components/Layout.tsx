import React, { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { cn } from "@/lib/utils"
import { useRouter } from "next/router"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  
  // Define auth pages that should not have the sidebar and header
  const isAuthPage = ['/login', '/signup'].includes(router.pathname);

  if (isAuthPage) {
    return <main>{children}</main>;
  }

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