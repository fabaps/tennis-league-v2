"use client"

import { useEffect } from "react"
import { auth } from "@/config"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthStore } from "@/store/useAuth"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchCurrentUserData } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCurrentUserData()
      }
    })

    return () => unsubscribe()
  }, [fetchCurrentUserData])

  return <>{children}</>
}
