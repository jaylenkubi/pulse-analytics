import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for the sources
const sourceData = [
  {
    name: "Google",
    visitors: 12500,
    category: "Search Engine",
    conversionRate: 3.2,
    bounceRate: 45,
    avgDuration: "2:15",
    pagesPerSession: 2.8,
  },
  {
    name: "Direct",
    visitors: 8300,
    category: "Direct Traffic",
    conversionRate: 2.8,
    bounceRate: 52,
    avgDuration: "1:45",
    pagesPerSession: 2.1,
  },
  {
    name: "Facebook",
    visitors: 6200,
    category: "Social Media",
    conversionRate: 2.5,
    bounceRate: 58,
    avgDuration: "1:30",
    pagesPerSession: 1.9,
  },
  {
    name: "Twitter",
    visitors: 4100,
    category: "Social Media",
    conversionRate: 1.8,
    bounceRate: 62,
    avgDuration: "1:15",
    pagesPerSession: 1.7,
  },
  {
    name: "LinkedIn",
    visitors: 3800,
    category: "Social Media",
    conversionRate: 3.5,
    bounceRate: 48,
    avgDuration: "2:30",
    pagesPerSession: 2.6,
  },
]

const categoryData = [
  { name: "Search Engine", value: 12500 },
  { name: "Direct Traffic", value: 8300 },
  { name: "Social Media", value: 14100 },
  { name: "Referral", value: 5200 },
  { name: "Email", value: 3100 },
  { name: "Paid Ads", value: 4800 },
]

export default function SourcesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Traffic Sources</h1>

      {/* Overview Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Traffic by Source Category</CardTitle>
          <CardDescription>Distribution of visitors across different traffic sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Sources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Source Analysis</CardTitle>
          <CardDescription>Comprehensive metrics for each traffic source</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Visitors</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Bounce Rate</TableHead>
                <TableHead>Avg. Duration</TableHead>
                <TableHead>Pages/Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sourceData.map((source) => (
                <TableRow key={source.name}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{source.category}</Badge>
                  </TableCell>
                  <TableCell>{source.visitors.toLocaleString()}</TableCell>
                  <TableCell>{source.conversionRate}%</TableCell>
                  <TableCell>{source.bounceRate}%</TableCell>
                  <TableCell>{source.avgDuration}</TableCell>
                  <TableCell>{source.pagesPerSession}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}