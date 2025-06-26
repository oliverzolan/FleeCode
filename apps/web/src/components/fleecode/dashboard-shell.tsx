import type React from "react"
import { MainNav } from "@/components/fleecode/main-nav"
import { SideNav } from "@/components/fleecode/side-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex flex-1 gap-4 p-4 pt-6 md:gap-8 md:p-8">
        <aside className="hidden w-64 shrink-0 md:block">
          <SideNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
