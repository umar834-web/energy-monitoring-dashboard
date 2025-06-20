"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import AdminDashboard from "@/components/admin-dashboard"
import UserDashboard from "@/components/user-dashboard"

export default function App() {
  const [currentPage, setCurrentPage] = useState<"login" | "admin" | "user">("login")
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  const handleLogin = (userData: { name: string; role: string }) => {
    setUser(userData)
    setCurrentPage(userData.role === "admin" ? "admin" : "user")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("login")
  }

  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} />
  }

  return currentPage === "admin" ? (
    <AdminDashboard user={user} onLogout={handleLogout} />
  ) : (
    <UserDashboard user={user} onLogout={handleLogout} />
  )
}
