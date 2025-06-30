'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardShell } from '@/components/fleecode/dashboard-shell'
import { Blind75ProblemsList } from '@/components/fleecode/blind75-problems-list'
import { Blind75Hero } from '@/components/fleecode/blind75-hero'

export default function Blind75Page() {
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
            <h1 className="text-3xl font-bold tracking-tight">Blind 75</h1>
            <p className="text-muted-foreground">
              Essential coding interview problems curated by Blind
            </p>
          </div>
        </div>

        <Blind75Hero />

        <Blind75ProblemsList />
      </div>
    </DashboardShell>
  )
} 