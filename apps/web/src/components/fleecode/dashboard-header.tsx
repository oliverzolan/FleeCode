import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DashboardHeaderProps {
  heading: string
  text?: string
}

export function DashboardHeader({ heading, text }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Card className="flex items-center gap-4 p-2">
          <div className="grid gap-0.5">
            <p className="text-sm font-medium">Sarah Johnson</p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-xs text-muted-foreground">Level 3 • 120 XP</p>
            </div>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </Card>
        <Button size="sm">Ask Edu Bot</Button>
      </div>
    </div>
  )
}
