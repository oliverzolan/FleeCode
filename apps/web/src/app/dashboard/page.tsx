'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardShell } from '@/components/fleecode/dashboard-shell'
import { ProblemsStats } from '@/components/fleecode/problems-stats'
import { SimplifiedProblemsList } from '@/components/fleecode/simplified-problems-list'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user?.name || session.user?.email}
            </p>
          </div>
        </div>

        {/* Widgets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProblemsStats />
        </div>

        {/* Problems List Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Problems</h2>
            <p className="text-muted-foreground">
              Practice coding problems to improve your skills
            </p>
          </div>
          <SimplifiedProblemsList />
        </div>
      </div>
    </DashboardShell>
  )
} 