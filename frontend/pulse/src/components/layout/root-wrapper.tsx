'use client'

import { AuthProvider } from "@/lib/auth"
import { Providers } from "@/app/providers"
import { PathCheck } from "./path-check"

export function RootWrapper({ 
  children,
  defaultOpen 
}: { 
  children: React.ReactNode
  defaultOpen: boolean 
}) {
  return (
    <Providers>
      <AuthProvider>
        <PathCheck defaultOpen={defaultOpen}>
          {children}
        </PathCheck>
      </AuthProvider>
    </Providers>
  )
}
