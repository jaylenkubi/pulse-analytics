import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/lib/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulse Analytics",
  description: "Pulse Analytics",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <main className="flex-1">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
