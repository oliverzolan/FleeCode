'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardShell } from '@/components/fleecode/dashboard-shell'
import { ProblemsList } from '@/components/fleecode/problems-list'
import { ProblemsHeader } from '@/components/fleecode/problems-header'
import { ProblemsFilters } from '@/components/fleecode/problems-filters'

export default function ProblemsPage() {
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
        <ProblemsHeader />
        <ProblemsFilters />
        <ProblemsList />
      </div>
    </DashboardShell>
  )
}
