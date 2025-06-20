"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const energyData = [
  { time: "00:00", solar: 0, wind: 45, thermal: 120, total: 165 },
  { time: "06:00", solar: 20, wind: 38, thermal: 115, total: 173 },
  { time: "12:00", solar: 85, wind: 42, thermal: 110, total: 237 },
  { time: "18:00", solar: 35, wind: 55, thermal: 125, total: 215 },
  { time: "24:00", solar: 0, wind: 48, thermal: 118, total: 166 },
]

const efficiencyData = [
  { month: "Jan", efficiency: 87 },
  { month: "Feb", efficiency: 89 },
  { month: "Mar", efficiency: 92 },
  { month: "Apr", efficiency: 88 },
  { month: "May", efficiency: 94 },
  { month: "Jun", efficiency: 91 },
]

const energyMixData = [
  { name: "Solar", value: 35, color: "#f59e0b" },
  { name: "Wind", value: 28, color: "#3b82f6" },
  { name: "Thermal", value: 37, color: "#6b7280" },
]

export function EnergyOutputChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Output (MW)</CardTitle>
        <CardDescription>Real-time power generation by source</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            solar: { label: "Solar", color: "#f59e0b" },
            wind: { label: "Wind", color: "#3b82f6" },
            thermal: { label: "Thermal", color: "#6b7280" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="solar" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="wind" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="thermal" stackId="1" stroke="#6b7280" fill="#6b7280" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function EfficiencyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plant Efficiency (%)</CardTitle>
        <CardDescription>Monthly efficiency trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            efficiency: { label: "Efficiency", color: "#10b981" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function EnergyMixChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Mix</CardTitle>
        <CardDescription>Current power generation distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            solar: { label: "Solar", color: "#f59e0b" },
            wind: { label: "Wind", color: "#3b82f6" },
            thermal: { label: "Thermal", color: "#6b7280" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={energyMixData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {energyMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
