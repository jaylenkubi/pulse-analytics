import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Globe,
  Clock,
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { getGetAllFeaturesByWebsiteIdQueryKey, getGetWebsiteFeaturesQueryKey, useGetAllFeaturesByWebsiteId, useGetWebsiteFeatures } from "@/api/generated/features/features";
import { useUserStore } from "@/lib/stores/userStore";

const sidebarItems = {
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

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const router = useRouter();
  const [webPortalFeatures, setWebPortalFeatures] = useState([]);
  const currentPath = router.asPath;
  const { websiteAccess } = useUserStore();

  const {data: features} = useGetAllFeaturesByWebsiteId(websiteAccess[0]?.websiteId, {
    query: {
      queryKey: getGetAllFeaturesByWebsiteIdQueryKey(websiteAccess[0]?.websiteId),
      enabled: !!websiteAccess[0]?.websiteId
    }
  });

  useEffect(() => {
    if (features) {
      setWebPortalFeatures([]);
    }
  }, [features]);

  return (
    <div className={cn(
      "pb-12 min-h-screen relative transition-all duration-300 ease-in-out hidden md:block",
      collapsed ? "w-16" : "w-64"
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border shadow-md focus-visible:outline-none z-500"
        onClick={onToggle}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
      <div className="flex flex-col h-full space-y-4 py-4">
        <div className="flex-1">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {!collapsed && (
                <h2 className="mb-2 px-4 text-xs font-medium tracking-wider text-muted-foreground/70 uppercase">
                  Analytics
                </h2>
              )}
              {sidebarItems.main.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-sm transition-all duration-200",
                    "hover:text-primary hover:bg-[var(--sidebar-hover)]",
                    currentPath === item.href
                      ? "text-primary bg-[var(--sidebar-active)] shadow-sm"
                      : "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center flex-1">
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className={cn(
                      "transition-opacity duration-300",
                      collapsed ? "opacity-0 hidden" : "opacity-100"
                    )}>
                      {item.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="px-3 py-2 mt-auto">
          {!collapsed && (
            <h2 className="mb-2 px-4 text-xs font-medium tracking-wider text-muted-foreground/70 uppercase">
              Configuration
            </h2>
          )}
          <div className="space-y-1">
            {sidebarItems.configuration.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-sm transition-all duration-200",
                  "hover:text-primary hover:bg-[var(--sidebar-hover)]",
                  currentPath === item.href
                    ? "text-primary bg-[var(--sidebar-active)] shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                <div className="flex items-center flex-1">
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className={cn(
                    "transition-opacity duration-300",
                    collapsed ? "opacity-0 hidden" : "opacity-100"
                  )}>
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}