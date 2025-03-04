"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import ProfileContent from "./ProfileContent"

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Perfil" />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent router={router} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

