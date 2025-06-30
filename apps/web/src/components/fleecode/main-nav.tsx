"use client"

import { BookOpen, Code, Github, Home, Settings, User, LogOut, Trophy } from "lucide-react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MainNav() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2 font-bold">
          <Code className="h-5 w-5" />
          <span>FleeCode</span>
        </div>
        <nav className="ml-6 flex items-center gap-4 text-sm">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 font-medium transition-colors hover:text-foreground/80"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/blind75"
            className="flex items-center gap-1 font-medium text-foreground transition-colors hover:text-foreground/80"
          >
            <Trophy className="h-4 w-4" />
            Blind 75
          </Link>
          <Link
            href="/problems"
            className="flex items-center gap-1 font-medium text-foreground transition-colors hover:text-foreground/80"
          >
            <Code className="h-4 w-4" />
            Problems
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative w-64">
            <Input type="search" placeholder="Search problems..." className="h-9 w-full" />
          </div>
          <Button size="icon" variant="ghost">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          
          {status === 'authenticated' && session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {session.user.name?.charAt(0) || session.user.email?.charAt(0) || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
