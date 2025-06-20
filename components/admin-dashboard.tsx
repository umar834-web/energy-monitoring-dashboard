"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
import { KPICards } from "@/components/kpi-cards"
import { EnergyOutputChart, EfficiencyChart, EnergyMixChart } from "@/components/energy-charts"
import EnergyCalendar from "@/components/energy-calendar"
import AIAssistant from "@/components/ai-assistant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Edit, Trash2 } from "lucide-react"

interface AdminDashboardProps {
  user: { name: string; role: string } | null
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
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

      case "users":
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage system users and permissions</CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", email: "john@hindustan-power.com", role: "User", status: "Active" },
                  { name: "Jane Smith", email: "jane@hindustan-power.com", role: "Admin", status: "Active" },
                  { name: "Mike Johnson", email: "mike@hindustan-power.com", role: "User", status: "Inactive" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "reports":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>Generate and manage energy reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Daily Energy Report", description: "Daily power generation summary", date: "2024-01-15" },
                  { title: "Weekly Efficiency Report", description: "Plant efficiency analysis", date: "2024-01-14" },
                  { title: "Monthly Overview", description: "Comprehensive monthly report", date: "2024-01-01" },
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
                        Download Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "analytics":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Deep insights into energy performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <EnergyOutputChart />
                  <EfficiencyChart />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system parameters and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Alert Thresholds</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Low Efficiency Alert (%)</label>
                      <input type="number" className="w-full p-2 border rounded" defaultValue="85" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">High Temperature Alert (°C)</label>
                      <input type="number" className="w-full p-2 border rounded" defaultValue="75" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Notification Settings</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Email notifications for critical alerts
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      SMS notifications for system failures
                    </label>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Save Settings</Button>
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
        userRole="admin"
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
