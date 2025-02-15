import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageContainer from "@/components/PageContainer"
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

const loadTimeData = [
  { date: "Mon", time: 2.1 },
  { date: "Tue", time: 2.3 },
  { date: "Wed", time: 2.0 },
  { date: "Thu", time: 2.4 },
  { date: "Fri", time: 2.2 },
  { date: "Sat", time: 1.9 },
  { date: "Sun", time: 2.0 },
]

const errorRateData = [
  { date: "Mon", rate: 0.8 },
  { date: "Tue", rate: 1.2 },
  { date: "Wed", rate: 0.9 },
  { date: "Thu", rate: 1.1 },
  { date: "Fri", rate: 0.7 },
  { date: "Sat", rate: 0.6 },
  { date: "Sun", rate: 0.8 },
]

const serverResponseData = [
  { time: "00:00", response: 180 },
  { time: "04:00", response: 150 },
  { time: "08:00", response: 240 },
  { time: "12:00", response: 280 },
  { time: "16:00", response: 260 },
  { time: "20:00", response: 190 },
]

// Common card style
const cardStyle = "border-primary/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40"

const getBadgeVariant = (value: string) => {
  // For time values (ending with 's' or 'ms')
  if (value.endsWith('s') || value.endsWith('ms')) {
    const numericValue = parseFloat(value.replace(/[ms]/g, ''))
    // For these metrics, lower is better, so we invert the logic
    return numericValue > 0 ? "destructive" : "success"
  }
  // For percentage values
  const numericValue = parseFloat(value.replace(/[%+]/g, ''))
  if (numericValue > 0) return "success"
  if (numericValue < 0) return "destructive"
  return "outline"
}

export default function PerformancePage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Performance</h2>
      </div>

      {/* Overview Section - Always Visible */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Load Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1s</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getBadgeVariant("-0.2s")} className="text-xs">-0.2s</Badge>
              <p className="text-xs text-muted-foreground">from last week</p>
            </div>
          </CardContent>
        </Card>
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.8%</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getBadgeVariant("-0.1")} className="text-xs">-0.1%</Badge>
              <p className="text-xs text-muted-foreground">from last week</p>
            </div>
          </CardContent>
        </Card>
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185ms</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getBadgeVariant("+5ms")} className="text-xs">+5ms</Badge>
              <p className="text-xs text-muted-foreground">from last week</p>
            </div>
          </CardContent>
        </Card>
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="speed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="speed">Speed Metrics</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
        </TabsList>

        <TabsContent value="speed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className={cardStyle}>
              <CardHeader>
                <CardTitle>Page Load Time (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={loadTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="time"
                        stroke="#8884d8"
                        name="Load Time (s)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className={cardStyle}>
              <CardHeader>
                <CardTitle>Server Response Time (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={serverResponseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="response"
                        stroke="#82ca9d"
                        name="Response Time (ms)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className={cardStyle}>
              <CardHeader>
                <CardTitle>Error Rate Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={errorRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#ff4d4f"
                        name="Error Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className={cardStyle}>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">404 Not Found</span>
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[45%] rounded-full bg-destructive"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">500 Server Error</span>
                        <span className="text-sm text-muted-foreground">30%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[30%] rounded-full bg-destructive"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">403 Forbidden</span>
                        <span className="text-sm text-muted-foreground">15%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[15%] rounded-full bg-destructive"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Other Errors</span>
                        <span className="text-sm text-muted-foreground">10%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[10%] rounded-full bg-destructive"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}