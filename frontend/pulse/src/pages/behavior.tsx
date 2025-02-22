import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data - to be replaced with real API data
const pageViewsData = [
  { page: "/home", views: 2100, avgTime: "2:30" },
  { page: "/products", views: 1400, avgTime: "3:15" },
  { page: "/about", views: 800, avgTime: "1:45" },
  { page: "/contact", views: 600, avgTime: "1:20" },
  { page: "/blog", views: 950, avgTime: "4:10" },
]

const userFlowData = [
  { step: "Landing", users: 1000 },
  { step: "Browse", users: 750 },
  { step: "Search", users: 500 },
  { step: "Product View", users: 400 },
  { step: "Cart", users: 200 },
]

const engagementTrend = [
  { date: "Mon", score: 75 },
  { date: "Tue", score: 82 },
  { date: "Wed", score: 78 },
  { date: "Thu", score: 85 },
  { date: "Fri", score: 90 },
  { date: "Sat", score: 87 },
  { date: "Sun", score: 83 },
]

export default function BehaviorPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">User Behavior Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <CardHeader>
            <CardTitle>Popular Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageViewsData}>
                  <XAxis dataKey="page" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="var(--chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <CardHeader>
            <CardTitle>User Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userFlowData}>
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="var(--chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 md:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementTrend}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="var(--chart-3)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 md:col-span-2">
          <CardHeader>
            <CardTitle>Page Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3">Page</th>
                    <th className="px-6 py-3">Views</th>
                    <th className="px-6 py-3">Avg. Time</th>
                  </tr>
                </thead>
                <tbody>
                  {pageViewsData.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{item.page}</td>
                      <td className="px-6 py-4">{item.views}</td>
                      <td className="px-6 py-4">{item.avgTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}