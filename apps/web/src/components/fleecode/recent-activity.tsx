import { Clock } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="relative mt-0.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                <Clock className="h-3 w-3" />
              </div>
              <div className="absolute bottom-0 left-1/2 top-6 w-px -translate-x-1/2 bg-border" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Completed "Two Sum" problem</p>
              <p className="text-sm text-muted-foreground">You solved it in 15 minutes</p>
              <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative mt-0.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                <Clock className="h-3 w-3" />
              </div>
              <div className="absolute bottom-0 left-1/2 top-6 w-px -translate-x-1/2 bg-border" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Learned about Linked List basics</p>
              <p className="text-sm text-muted-foreground">Completed the tutorial on singly linked lists</p>
              <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative mt-0.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                <Clock className="h-3 w-3" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Started "Maximum Depth of Binary Tree"</p>
              <p className="text-sm text-muted-foreground">Made initial progress on the problem</p>
              <p className="text-xs text-muted-foreground">2 days ago at 5:20 PM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
