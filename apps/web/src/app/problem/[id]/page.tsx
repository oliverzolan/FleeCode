'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { DashboardShell } from '@/components/fleecode/dashboard-shell'
import { ProblemHeader } from '@/components/fleecode/problem-header'
import { ProblemContent } from '@/components/fleecode/problem-content'
import { CodeEditor } from '@/components/fleecode/code-editor'
import { TestCases } from '@/components/fleecode/test-cases'

interface Problem {
  id: string
  title: string
  difficulty: string
  description: string
  learningContent: string
  starterCodeJson: Record<string, string>
  testCases: Array<{
    id: string
    input: string
    expectedOutput: string
    isHidden: boolean
  }>
  createdAt: string
  updatedAt: string
}

export default function ProblemPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [problem, setProblem] = useState<Problem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    const fetchProblem = async () => {
      if (!params.id || status !== 'authenticated') return
      
      try {
        const response = await fetch(`/api/problems/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setProblem(data)
        } else {
          console.error('Failed to fetch problem')
        }
      } catch (error) {
        console.error('Error fetching problem:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProblem()
  }, [params.id, status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (!problem) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Problem not found</div>
        </div>
      </DashboardShell>
    )
  }

  // Transform problem data to match component expectations
  const problemForHeader = {
    id: parseInt(problem.id) || 1,
    title: problem.title,
    difficulty: problem.difficulty as "Easy" | "Medium" | "Hard",
    category: "Algorithms", // Default category
    concepts: [], // Extract from learningContent if needed
    timeComplexity: "O(n)", // Default
    spaceComplexity: "O(1)" // Default
  }

  // Create examples from test cases
  const examples = problem.testCases
    .filter(tc => !tc.isHidden)
    .slice(0, 2) // Take first 2 non-hidden test cases as examples
    .map(tc => ({
      input: tc.input,
      output: tc.expectedOutput,
      explanation: ""
    }))

  const problemForContent = {
    id: parseInt(problem.id) || 1,
    title: problem.title,
    description: problem.description,
    examples: examples,
    constraints: [
      "1 <= n <= 10^5",
      "1 <= arr[i] <= 10^9"
    ], // Default constraints
    concepts: [] // Extract from learningContent if needed
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <ProblemHeader problem={problemForHeader} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProblemContent problem={problemForContent} />
            <TestCases examples={problemForContent.examples} />
          </div>
          
          <div className="space-y-6">
            <CodeEditor problemId={parseInt(problem.id) || 1} />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
