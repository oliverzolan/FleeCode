import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const response = await fetch(`${process.env.API_URL}/api/problems/blind75`, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Blind 75 problems')
    }

    const problems = await response.json()
    return NextResponse.json(problems)
  } catch (error) {
    console.error('Error fetching Blind 75 problems:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 