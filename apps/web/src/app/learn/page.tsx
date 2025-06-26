'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardShell } from '@/components/fleecode/dashboard-shell'
import { DataStructureTree } from '@/components/fleecode/data-structure-tree'
import { ConceptExplanation } from '@/components/fleecode/concept-explanation'

export default function LearnPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Learning Center</h1>
            <p className="text-muted-foreground">
              Master data structures and algorithms concepts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataStructureTree />
          <ConceptExplanation concepts={["Arrays", "Hash Tables", "Two Pointers", "Sliding Window"]} />
        </div>
      </div>
    </DashboardShell>
  )
}
