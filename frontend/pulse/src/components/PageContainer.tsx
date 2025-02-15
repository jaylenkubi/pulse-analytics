import { cn } from "@/lib/utils"
import React from "react"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("flex-1 space-y-4 p-8 pt-6", className)}>
      {children}
    </div>
  )
}