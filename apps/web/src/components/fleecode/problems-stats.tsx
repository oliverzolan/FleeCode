import { Trophy, Target, Clock, BookOpen } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProblemsStats() {
  const stats = [
    {
      label: "Solved",
      value: "23",
      total: "150",
      percentage: 15,
      icon: Trophy,
      color: "text-green-600",
    },
    {
      label: "In Progress",
      value: "8",
      total: "150",
      percentage: 5,
      icon: Target,
      color: "text-blue-600",
    },
    {
      label: "Study Time",
      value: "42h",
      total: "This month",
      percentage: 70,
      icon: Clock,
      color: "text-purple-600",
    },
    {
      label: "Concepts",
      value: "12",
      total: "25",
      percentage: 48,
      icon: BookOpen,
      color: "text-orange-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.total}</div>
              </div>
            </div>
            <Progress value={stat.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
