"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Wrench, AlertTriangle, FileText } from "lucide-react"

export default function EnergyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const events = [
    { date: 15, type: "maintenance", title: "Solar Panel Cleaning", icon: Wrench },
    { date: 22, type: "alert", title: "Turbine Inspection", icon: AlertTriangle },
    { date: 28, type: "report", title: "Monthly Report Due", icon: FileText },
  ]

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const getEventForDate = (date: number) => {
    return events.find((event) => event.date === date)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Maintenance & Reports Calendar</CardTitle>
            <CardDescription>Scheduled maintenance and report deadlines</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="p-2 h-12"></div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = i + 1
            const event = getEventForDate(date)
            const isToday =
              date === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={date}
                className={`p-1 h-12 border rounded ${isToday ? "bg-blue-50 border-blue-200" : "border-gray-200"}`}
              >
                <div className="text-sm font-medium">{date}</div>
                {event && (
                  <div className="mt-1">
                    <Badge
                      variant={
                        event.type === "alert" ? "destructive" : event.type === "maintenance" ? "default" : "secondary"
                      }
                      className="text-xs p-0 px-1"
                    >
                      <event.icon className="h-2 w-2" />
                    </Badge>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-sm">Upcoming Events</h4>
          {events.map((event, index) => {
            const Icon = event.icon
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Icon className="h-4 w-4 text-gray-500" />
                <span>
                  {monthNames[currentDate.getMonth()]} {event.date}
                </span>
                <span className="text-gray-600">- {event.title}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
