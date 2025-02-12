'use client'

import { usePathname } from "next/navigation"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../sidebar/app-sidebar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export function PathCheck({ children, defaultOpen }: { children: React.ReactNode, defaultOpen: boolean }) {
	const pathname = usePathname()
	const isLoginPage = pathname === '/login'

	if (isLoginPage) {
		return children;
	}

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<main className="flex-1">
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href={pathname} className="text-foreground">
										{pathname.split('/').pop()!.charAt(0).toUpperCase() + pathname.split('/').pop()!.slice(1)}
									</BreadcrumbLink>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</header>
				</SidebarInset>
				{children}
			</main>
		</SidebarProvider>
	)
}
