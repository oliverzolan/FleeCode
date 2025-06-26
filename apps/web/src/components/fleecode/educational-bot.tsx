"use client"

import { useState } from "react"
import { Bot, Send, Lightbulb, BookOpen, Code } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EducationalBotProps {
  problemId: number
}

export function EducationalBot({ problemId }: EducationalBotProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot" as const,
      content:
        "Hi! I'm your educational assistant. I'm here to help you understand the problem and guide your thinking, but I won't give you the direct answer. What would you like to explore?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const quickActions = [
    { icon: Lightbulb, label: "Give me a hint", action: "hint" },
    { icon: BookOpen, label: "Explain concepts", action: "concepts" },
    { icon: Code, label: "Review my approach", action: "review" },
  ]

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        content: getBotResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleQuickAction = (action: string) => {
    const responses = {
      hint: "Think about what you need to find for each number in the array. If you're looking for two numbers that sum to a target, what would you need to check for each number you encounter?",
      concepts:
        "This problem involves arrays and hash tables. Arrays let you iterate through elements, while hash tables provide fast lookup. How might you combine these two concepts?",
      review:
        "I'd be happy to review your approach! Can you walk me through your current thinking or share what you've tried so far?",
    }

    const botMessage = {
      id: messages.length + 1,
      type: "bot" as const,
      content: responses[action as keyof typeof responses],
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("answer") || input.includes("solution")) {
      return "I can't give you the direct answer, but I can help you think through it! What approach are you considering? Have you thought about what data structure might help you store and lookup values efficiently?"
    }

    if (input.includes("stuck") || input.includes("help")) {
      return "Let's break this down step by step. You need to find two numbers that add up to the target. For each number you see, what would its 'partner' number need to be?"
    }

    if (input.includes("hash") || input.includes("map")) {
      return "Great thinking! Hash tables are indeed useful here. What would you store in the hash table, and when would you check if something exists in it?"
    }

    return "That's an interesting point! Can you elaborate on your thinking? What specific part would you like to explore further?"
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5" />
          Edu Bot
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                size="sm"
                className="justify-start h-8 text-xs"
                onClick={() => handleQuickAction(action.action)}
              >
                <action.icon className="mr-2 h-3 w-3" />
                {action.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="text-sm"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button size="sm" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
