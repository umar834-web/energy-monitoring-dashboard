"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Users,
  FileText,
  BarChart3,
  Settings,
  User,
  Download,
  ChevronLeft,
  ChevronRight,
  Zap,
  Leaf,
  Wind,
} from "lucide-react"

interface SidebarProps {
  userRole: "admin" | "user"
  activeItem: string
  onItemClick: (item: string) => void
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ userRole, activeItem, onItemClick, collapsed, onToggle }: SidebarProps) {
  const adminItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const userItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const items = userRole === "admin" ? adminItems : userItems

  return (
    <div
      className={cn("bg-gray-900 text-white transition-all duration-300 flex flex-col", collapsed ? "w-16" : "w-64")}
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Zap className="h-5 w-5 text-yellow-500" />
                <Leaf className="h-5 w-5 text-green-500" />
                <Wind className="h-5 w-5 text-blue-500" />
              </div>
              <span className="font-bold text-lg">HP Energy</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-gray-700">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white hover:bg-gray-700",
                    activeItem === item.id && "bg-green-600 hover:bg-green-700",
                    collapsed && "px-2",
                  )}
                  onClick={() => onItemClick(item.id)}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
