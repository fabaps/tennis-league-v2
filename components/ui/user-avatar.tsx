"use client"

import Image from "next/image"
import { useMemo } from "react"

interface UserAvatarProps {
  name: string
  photo?: string | null
  size?: number
  className?: string
}

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
]

export function UserAvatar({ name, photo, size = 128, className = "" }: UserAvatarProps) {
  const initials = useMemo(() => {
    const parts = name.split(" ")
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }, [name])

  const backgroundColor = useMemo(() => {
    // Usar el nombre para generar un índice consistente
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }, [name])

  if (photo) {
    return (
      <div 
        className={`relative overflow-hidden rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={photo}
          alt={name}
          width={size}
          height={size}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-semibold ${backgroundColor} ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(size * 0.4, 16),
      }}
    >
      {initials}
    </div>
  )
}
