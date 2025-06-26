import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id: string
      email: string
      name: string
    }
  }
  
  interface User {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            return null
          }

          const data = await response.json()
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            accessToken: data.token,
          }
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.accessToken = token.accessToken
        session.user.id = token.sub!
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
} 