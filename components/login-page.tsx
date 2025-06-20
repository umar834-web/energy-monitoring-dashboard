"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Leaf, Wind } from "lucide-react"

interface LoginPageProps {
  onLogin: (user: { name: string; role: string }) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      // Mock authentication
      if (email === "admin@hindustan-power.com" && password === "admin123") {
        onLogin({ name: "Admin User", role: "admin" })
      } else if (email === "user@hindustan-power.com" && password === "user123") {
        onLogin({ name: "John Doe", role: "user" })
      } else {
        setError("Invalid credentials. Try admin@hindustan-power.com / admin123 or user@hindustan-power.com / user123")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex gap-1">
              <Zap className="h-6 w-6 text-yellow-500" />
              <Leaf className="h-6 w-6 text-green-500" />
              <Wind className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Hindustan Power</CardTitle>
          <CardDescription>Energy Monitoring Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Demo Credentials:</p>
            <p>Admin: admin@hindustan-power.com / admin123</p>
            <p>User: user@hindustan-power.com / user123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
