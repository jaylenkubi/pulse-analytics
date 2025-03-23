import { create } from 'zustand'

interface User {
  id: string
  email: string
  role: string
}

interface WebsiteAccess {
  websiteId: string
  accessLevel: string
}

interface Feature {
  id: string
  name: string
  description?: string
}

interface UserState {
  user: User | null
  websiteAccess: WebsiteAccess[]
  features: Feature[]
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setWebsiteAccess: (access: WebsiteAccess[]) => void
  setFeatures: (features: Feature[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  websiteAccess: [],
  features: [],
  isLoading: false,
  error: null,
  setUser: (user: User | null) => set({ user }),
  setWebsiteAccess: (access: WebsiteAccess[]) => set({ websiteAccess: access }),
  setFeatures: (features: Feature[]) => set({ features }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
  reset: () => set({ user: null, websiteAccess: [], features: [], isLoading: false, error: null }),
}))
