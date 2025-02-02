'use client'

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className={cn(
                                    "w-full py-3 px-3 flex items-center gap-3  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md",
                                    pathname === item.url && "bg-sidebar-primary/10 text-sidebar-primary"
                                )}
                            >
                                <Link href={item.url}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

