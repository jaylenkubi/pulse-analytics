import React from "react";
import Head from "next/head";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { Progress } from "@/components/ui/progress";

// Mock data - in a real app this would come from an API
const mockData = {
  visitors: {
    current: 12543,
    trend: [
      { value: 10200 },
      { value: 11400 },
      { value: 10800 },
      { value: 11900 },
      { value: 12543 },
    ],
    percentageChange: 15
  },
  pageviews: {
    current: 45123,
    trend: [
      { value: 38000 },
      { value: 42000 },
      { value: 41000 },
      { value: 43500 },
      { value: 45123 },
    ],
    percentageChange: 8
  },
  avgTime: {
    current: "2:35",
    trend: [
      { value: 130 },
      { value: 145 },
      { value: 155 },
      { value: 140 },
      { value: 155 },
    ],
    percentageChange: -3
  },
  bounceRate: {
    current: "32%",
    trend: [
      { value: 35 },
      { value: 34 },
      { value: 33 },
      { value: 32.5 },
      { value: 32 },
    ],
    percentageChange: -5
  },
  trafficData: [
    { date: "Jan 30", visitors: 2400 },
    { date: "Jan 31", visitors: 1398 },
    { date: "Feb 1", visitors: 3800 },
    { date: "Feb 2", visitors: 3908 },
    { date: "Feb 3", visitors: 4800 },
    { date: "Feb 4", visitors: 3800 },
    { date: "Feb 5", visitors: 4300 },
  ],
  recentVisitors: [
    { page: "/home", time: "2 mins ago", duration: "1:23", country: "US" },
    { page: "/products", time: "5 mins ago", duration: "2:45", country: "UK" },
    { page: "/about", time: "12 mins ago", duration: "0:45", country: "DE" },
    { page: "/contact", time: "15 mins ago", duration: "3:12", country: "FR" },
  ],
  topPages: [
    { page: "/home", views: 12500, percentage: 28 },
    { page: "/products", views: 8300, percentage: 19 },
    { page: "/about", views: 6200, percentage: 14 },
    { page: "/blog", views: 5100, percentage: 11 },
    { page: "/contact", views: 4200, percentage: 9 },
  ],
  devices: [
    { name: "Desktop", value: 58 },
    { name: "Mobile", value: 35 },
    { name: "Tablet", value: 7 },
  ],
  browsers: [
    { name: "Chrome", value: 64 },
    { name: "Safari", value: 19 },
    { name: "Firefox", value: 12 },
    { name: "Edge", value: 5 },
  ],
  trafficSources: [
    { source: "Direct", visits: 5200 },
    { source: "Organic", visits: 4300 },
    { source: "Social", visits: 2100 },
    { source: "Referral", visits: 1900 },
    { source: "Email", visits: 900 },
  ],
  countries: [
    { country: "United States", visits: 4500, percentage: 35 },
    { country: "United Kingdom", visits: 2300, percentage: 18 },
    { country: "Germany", visits: 1800, percentage: 14 },
    { country: "France", visits: 1500, percentage: 12 },
    { country: "Japan", visits: 1200, percentage: 9 },
  ],
  engagement: [
    { metric: "Avg. Session Duration", value: "2:35" },
    { metric: "Pages per Session", value: "3.2" },
    { metric: "Active Users", value: "1.2k" },
  ]
};

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

const MetricCard = ({ 
  title, 
  description, 
  value, 
  data, 
  color,
  isHighlighted = false,
  trend = 0
}: { 
  title: string;
  description: string;
  value: string | number;
  data: Array<{ value: number }>;
  color: string;
  isHighlighted?: boolean;
  trend?: number;
}) => (
  <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {trend !== 0 && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
            trend > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <p className={`text-3xl font-bold ${isHighlighted ? 'text-primary' : ''}`}>{value}</p>
        <div className="h-[40px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Website Analytics</title>
        <meta name="description" content="Website Analytics Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Visitors"
            description="Total unique visitors"
            value={mockData.visitors.current.toLocaleString()}
            data={mockData.visitors.trend}
            color="#FF6B6B"
            isHighlighted={true}
            trend={mockData.visitors.percentageChange}
          />
          <MetricCard
            title="Pageviews"
            description="Total page views"
            value={mockData.pageviews.current.toLocaleString()}
            data={mockData.pageviews.trend}
            color="#4ECDC4"
            isHighlighted={true}
            trend={mockData.pageviews.percentageChange}
          />
          <MetricCard
            title="Avg. Time"
            description="Time on site"
            value={mockData.avgTime.current}
            data={mockData.avgTime.trend}
            color="#45B7D1"
            trend={mockData.avgTime.percentageChange}
          />
          <MetricCard
            title="Bounce Rate"
            description="Visitor bounce rate"
            value={mockData.bounceRate.current}
            data={mockData.bounceRate.trend}
            color="#96CEB4"
            isHighlighted={mockData.bounceRate.percentageChange < 0}
            trend={mockData.bounceRate.percentageChange}
          />
        </div>

        {/* Traffic Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4 border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Daily visitor traffic</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#FF6B6B" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="p-4 border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.trafficSources}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#4ECDC4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Device and Browser Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>Visitor device types</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.devices}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {mockData.devices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Browser Usage</CardTitle>
              <CardDescription>Most used browsers</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.browsers}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {mockData.browsers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages and Geographic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most viewed pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.topPages.map((page, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{page.page}</span>
                      <span className="text-muted-foreground">{page.views.toLocaleString()} views</span>
                    </div>
                    <Progress value={page.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Visitor locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.countries.map((country, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{country.country}</span>
                      <span className="text-muted-foreground">{country.visits.toLocaleString()} visits</span>
                    </div>
                    <Progress value={country.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Visitors</CardTitle>
            <CardDescription>Latest website activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Country</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.recentVisitors.map((visitor, index) => (
                  <TableRow key={index}>
                    <TableCell>{visitor.page}</TableCell>
                    <TableCell>{visitor.time}</TableCell>
                    <TableCell>{visitor.duration}</TableCell>
                    <TableCell>{visitor.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}