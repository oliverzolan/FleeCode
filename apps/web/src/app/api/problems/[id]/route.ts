import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch specific problem from your API server
    const response = await fetch(`${process.env.API_URL}/api/problems/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
      }
      throw new Error('Failed to fetch problem')
    }

    const problem = await response.json()
    return NextResponse.json(problem)
  } catch (error) {
    console.error('Error fetching problem:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 