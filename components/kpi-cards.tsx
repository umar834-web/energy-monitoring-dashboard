"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Zap, Gauge, AlertTriangle, CheckCircle } from "lucide-react"

export function KPICards() {
  const kpis = [
    {
      title: "Total Energy Generated",
      value: "2,847 MW",
      change: "+12.5%",
      trend: "up",
      icon: Zap,
      color: "text-green-600",
    },
    {
      title: "Plant Efficiency",
      value: "91.2%",
      change: "+2.1%",
      trend: "up",
      icon: Gauge,
      color: "text-blue-600",
    },
    {
      title: "Active Alerts",
      value: "3",
      change: "-2",
      trend: "down",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "System Status",
      value: "Operational",
      change: "99.8% uptime",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <Icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={kpi.trend === "up" ? "text-green-600" : "text-red-600"}>{kpi.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
