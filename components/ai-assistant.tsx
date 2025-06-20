"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, ChevronDown, ChevronUp, Lightbulb, TrendingUp, AlertCircle } from "lucide-react"

export default function AIAssistant() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm your AI Energy Assistant. I can help you analyze power data, generate insights, and provide recommendations.",
      timestamp: new Date(),
    },
  ])

  const insights = [
    {
      type: "efficiency",
      title: "Efficiency Optimization",
      description: "Solar panel efficiency can be improved by 3.2% with regular cleaning",
      icon: TrendingUp,
      priority: "medium",
    },
    {
      type: "maintenance",
      title: "Maintenance Alert",
      description: "Wind turbine #3 requires scheduled maintenance in 5 days",
      icon: AlertCircle,
      priority: "high",
    },
    {
      type: "recommendation",
      title: "Cost Optimization",
      description: "Consider shifting thermal load during peak hours to reduce costs by 8%",
      icon: Lightbulb,
      priority: "low",
    },
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessages = [
      ...messages,
      { type: "user", content: message, timestamp: new Date() },
      {
        type: "ai",
        content:
          "Based on your current energy data, I recommend focusing on solar optimization during peak hours. Would you like me to generate a detailed report?",
        timestamp: new Date(),
      },
    ]

    setMessages(newMessages)
    setMessage("")
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 z-50 shadow-lg">
      <CardHeader
        className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg">AI Energy Assistant</CardTitle>
        </div>
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">AI Insights & Recommendations</h4>
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Icon className="h-4 w-4 mt-0.5 text-blue-600" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{insight.title}</span>
                      <Badge
                        variant={
                          insight.priority === "high"
                            ? "destructive"
                            : insight.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{insight.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-3">Chat with AI</h4>
            <div className="max-h-32 overflow-y-auto space-y-2 mb-3">
              {messages.slice(-3).map((msg, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 rounded ${
                    msg.type === "ai" ? "bg-blue-50 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ask about energy data..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="text-sm"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
