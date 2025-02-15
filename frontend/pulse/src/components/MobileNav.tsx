import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, LayoutDashboard, BarChart3, Users, Settings, Globe, Clock, MousePointerClick } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"

const mobileNavItems = {
  main: [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Traffic Sources",
      href: "/sources",
      icon: Globe,
    },
    {
      title: "User Behavior",
      href: "/behavior",
      icon: MousePointerClick,
    },
    {
      title: "Real-time",
      href: "/realtime",
      icon: Clock,
    },
    {
      title: "Audience",
      href: "/audience",
      icon: Users,
    },
    {
      title: "Performance",
      href: "/performance",
      icon: BarChart3,
    },
  ],
  configuration: [
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ],
};

export function MobileNav() {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-6 mt-6">
          <div>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Analytics
            </h2>
            <div className="flex flex-col gap-1">
              {mobileNavItems.main.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "text-sm flex items-center py-3 px-4 rounded-lg transition-colors",
                    currentPath === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Configuration
            </h2>
            <div className="flex flex-col gap-1">
              {mobileNavItems.configuration.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "text-sm flex items-center py-3 px-4 rounded-lg transition-colors",
                    currentPath === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}