import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageContainer from "@/components/PageContainer"
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const demographicData = [
  { age: "18-24", users: 2100 },
  { age: "25-34", users: 3500 },
  { age: "35-44", users: 2800 },
  { age: "45-54", users: 1900 },
  { age: "55-64", users: 1200 },
  { age: "65+", users: 800 },
]

const deviceData = [
  { name: "Desktop", value: 45 },
  { name: "Mobile", value: 40 },
  { name: "Tablet", value: 15 },
]

const locationData = [
  { country: "United States", users: 4500 },
  { country: "United Kingdom", users: 2300 },
  { country: "Germany", users: 1800 },
  { country: "France", users: 1500 },
  { country: "Canada", users: 1200 },
]

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)"
]

const getBadgeVariant = (value: string) => {
  const numericValue = parseFloat(value.replace(/%/g, ''))
  if (numericValue > 0) return "success"
  if (numericValue < 0) return "destructive"
  return "outline"
}

export default function AudiencePage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Audience</h2>
      </div>
      
      {/* Overview Section - Always Visible */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,300</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getBadgeVariant("+8")} className="text-xs">+8%</Badge>
              <p className="text-xs text-muted-foreground">from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,840</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getBadgeVariant("+12")} className="text-xs">+12%</Badge>
              <p className="text-xs text-muted-foreground">from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 32s</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getBadgeVariant("+2")} className="text-xs">+2%</Badge>
              <p className="text-xs text-muted-foreground">from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.3%</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getBadgeVariant("-3")} className="text-xs">-3%</Badge>
              <p className="text-xs text-muted-foreground">from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demographicData}>
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="var(--chart-1)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="country" type="category" />
                      <Tooltip />
                      <Bar dataKey="users" fill="var(--chart-2)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technology" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="var(--chart-1)"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
              <CardHeader>
                <CardTitle>Browser Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Chrome</span>
                        <span className="text-sm text-muted-foreground">58%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[58%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Safari</span>
                        <span className="text-sm text-muted-foreground">25%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[25%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Firefox</span>
                        <span className="text-sm text-muted-foreground">12%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[12%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Others</span>
                        <span className="text-sm text-muted-foreground">5%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[5%] rounded-full bg-primary"></div>
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