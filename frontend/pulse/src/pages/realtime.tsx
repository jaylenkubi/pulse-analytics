import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"

// Mock real-time data - to be replaced with real API data
const generateRealtimeData = () => {
  const baseVisitors = 150
  const now = new Date()
  return Array.from({ length: 20 }, (_, i) => {
    const time = new Date(now.getTime() - (19 - i) * 30000) // 30-second intervals
    return {
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      visitors: baseVisitors + Math.floor(Math.random() * 50),
    }
  })
}

const generateActivePages = () => [
  { page: "/home", visitors: 45, trend: "up" },
  { page: "/products", visitors: 32, trend: "down" },
  { page: "/checkout", visitors: 28, trend: "up" },
  { page: "/blog", visitors: 24, trend: "stable" },
  { page: "/about", visitors: 18, trend: "down" },
]

const generateRecentEvents = () => [
  { type: "pageview", page: "/products/item-1", timestamp: "Just now" },
  { type: "click", element: "Add to Cart", timestamp: "30s ago" },
  { type: "form", action: "Newsletter Signup", timestamp: "1m ago" },
  { type: "pageview", page: "/checkout", timestamp: "2m ago" },
  { type: "click", element: "Product Image", timestamp: "3m ago" },
]

export default function RealtimePage() {
  const [realtimeData, setRealtimeData] = useState(generateRealtimeData())
  const [activePages, setActivePages] = useState(generateActivePages())
  const [recentEvents, setRecentEvents] = useState(generateRecentEvents())
  const [currentVisitors, setCurrentVisitors] = useState(
    realtimeData[realtimeData.length - 1].visitors
  )

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData((prev) => {
        const newData = [...prev.slice(1)]
        const lastTime = new Date()
        newData.push({
          time: lastTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          visitors: prev[prev.length - 1].visitors + Math.floor(Math.random() * 20) - 10,
        })
        return newData
      })
      setActivePages(generateActivePages())
      setRecentEvents(generateRecentEvents())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update current visitors count
  useEffect(() => {
    setCurrentVisitors(realtimeData[realtimeData.length - 1].visitors)
  }, [realtimeData])

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">Real-time Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 md:col-span-2">
          <CardHeader>
            <CardTitle>Live Visitor Count: {currentVisitors}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={realtimeData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <CardHeader>
            <CardTitle>Active Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activePages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <span className="text-sm">{page.page}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{page.visitors}</span>
                    <Badge
                      variant={
                        page.trend === "up"
                          ? "default"
                          : page.trend === "down"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {page.trend === "up" ? "↑" : page.trend === "down" ? "↓" : "→"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {event.type === "pageview"
                        ? `Page View: ${event.page}`
                        : event.type === "click"
                        ? `Click: ${event.element}`
                        : `Form: ${event.action}`}
                    </span>
                    <span className="text-xs text-gray-500">{event.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}