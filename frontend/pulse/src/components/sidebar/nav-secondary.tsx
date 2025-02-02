'use client'

import { LucideIcon } from "lucide-react"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function NavSecondary({
    items,
    ...props
}: {
    items: {
        title: string
        url: string
        icon: LucideIcon
    }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const pathname = usePathname()

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild
                             className={cn(
                                "w-full py-3 px-3 flex items-center gap-3  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md",
                                pathname === item.url && "bg-sidebar-primary/10 text-sidebar-primary"
                            )}
                            >
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}