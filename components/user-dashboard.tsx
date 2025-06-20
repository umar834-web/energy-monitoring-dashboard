"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
import { KPICards } from "@/components/kpi-cards"
import { EnergyOutputChart, EfficiencyChart, EnergyMixChart } from "@/components/energy-charts"
import EnergyCalendar from "@/components/energy-calendar"
import AIAssistant from "@/components/ai-assistant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, FileText } from "lucide-react"

interface UserDashboardProps {
  user: { name: string; role: string } | null
  onLogout: () => void
}

export default function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [activeItem, setActiveItem] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <KPICards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnergyOutputChart />
              <EfficiencyChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnergyMixChart />
              <EnergyCalendar />
            </div>
          </div>
        )

      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name || ""} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="user@hindustan-power.com" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Operations" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Update Profile</Button>
            </CardContent>
          </Card>
        )

      case "reports":
        return (
          <Card>
            <CardHeader>
              <CardTitle>My Reports</CardTitle>
              <CardDescription>Access your personalized energy reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Personal Energy Dashboard",
                    description: "Your customized energy overview",
                    date: "2024-01-15",
                  },
                  { title: "Weekly Summary", description: "Your weekly energy insights", date: "2024-01-14" },
                  { title: "Monthly Performance", description: "Monthly performance metrics", date: "2024-01-01" },
                ].map((report, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">Generated: {report.date}</p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "downloads":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Downloads</CardTitle>
              <CardDescription>Download reports and data exports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Energy Data Export (CSV)", size: "2.3 MB", date: "2024-01-15" },
                  { name: "Monthly Report (PDF)", size: "1.8 MB", date: "2024-01-14" },
                  { name: "Performance Metrics (Excel)", size: "3.1 MB", date: "2024-01-10" },
                ].map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{file.name}</h4>
                      <p className="text-sm text-gray-600">
                        {file.size} • {file.date}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
              <CardDescription>Customize your dashboard preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Dashboard Preferences</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Show real-time data updates
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Enable desktop notifications
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Auto-refresh charts every 30 seconds
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Email Notifications</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Weekly summary reports
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      System maintenance alerts
                    </label>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return <div>Content for {activeItem}</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        userRole="user"
        activeItem={activeItem}
        onItemClick={setActiveItem}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>

      <AIAssistant />
    </div>
  )
}
