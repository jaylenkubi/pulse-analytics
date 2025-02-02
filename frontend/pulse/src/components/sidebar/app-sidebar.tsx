"use client"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar"
import { BarChart, ChevronUp, Command, Home, Settings, ShoppingCart, User2 } from "lucide-react"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

const items =
{
	main: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: Home,
		},
		{
			title: "Orders",
			url: "/orders",
			icon: ShoppingCart,
		},
		{
			title: "Products",
			url: "/products",
			icon: Command,
		},
		{
			title: "Customers",
			url: "/customers",
			icon: User2,
		}, {
			title: "Analytics",
			url: "/analytics",
			icon: BarChart,
		},
	],
	secondary: [
		{
			title: "Settings",
			url: "/settings",
			icon: Settings,
		},
		{
			title: "Support",
			url: "/support",
			icon: ChevronUp,
		}
	],
	user: {
		name: "admin",
		email: "m@pulseanalytics.co.uk",
		avatar: "/avatars/shadcn.jpg",
	}
}




export function AppSidebar() {

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/dashboard">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
									<img width="48" height="48" src="https://img.icons8.com/color/48/pulse.png" alt="pulse" />
								</div>
								<div className="text-left text-lg">
									<span className="truncate  ">Pulse Analytics</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={items.main} />
				<NavSecondary items={items.secondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={items.user} />
			</SidebarFooter>
		</Sidebar>
	)
}
