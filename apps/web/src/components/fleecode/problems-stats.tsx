import { Trophy, Target, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProblemsStats() {
  const stats = [
    {
      label: "Blind 75",
      value: "0",
      total: "75",
      percentage: 0,
      icon: Trophy,
      color: "text-green-600",
      description: "Essential coding interview problems",
      href: "/blind75"
    },
    {
      label: "LeetCode 150",
      value: "0",
      total: "150",
      percentage: 0,
      icon: Target,
      color: "text-blue-600",
      description: "Most important interview questions",
      href: "/problems"
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Link key={stat.label} href={stat.href}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">
                    {stat.description}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{stat.value}/{stat.total}</div>
                    <div className="text-xs text-muted-foreground">problems solved</div>
                  </div>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}
