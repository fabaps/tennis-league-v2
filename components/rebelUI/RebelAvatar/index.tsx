import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { RankingUser } from '@/types/user'

export const RebelAvatar = ({user, size = "sm"}: {user: RankingUser | null, size?: "sm" | "md" | "lg" | "xl"}) => {
    const sizes = {
        sm: "size-10",
        md: "size-15",
        lg: "size-20",
        xl: "size-25"
    }

    return (
        <Avatar className={`${sizes[size]} animate-fade-down`}>
            <AvatarImage
                src={user?.picture}
                alt={`picture_${user?.name}`}
            />
            <AvatarFallback>
                <p className={`${size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : "text-3xl"} font-bold`}>
                {user?.name ? (user.name[0] + user.name.split(" ")[1][0]) : ""}
                </p>
            </AvatarFallback>
        </Avatar>
    )
}
