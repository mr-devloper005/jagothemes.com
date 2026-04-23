'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  actionClassName: string
}

export function LoginForm({ actionClassName }: Props) {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({
        title: 'Missing details',
        description: 'Enter your email and password to continue.',
        variant: 'destructive',
      })
      return
    }
    try {
      await login(email.trim(), password)
      toast({
        title: 'Signed in',
        description: 'Your session is saved on this device.',
      })
      router.push('/')
      router.refresh()
    } catch {
      toast({
        title: 'Sign in failed',
        description: 'Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="login-email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="you@example.com"
          className="h-12 rounded-2xl border-[#0a3d2e]/15 bg-white px-4"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password" className="text-sm font-medium">
          Password
        </Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-2xl border-[#0a3d2e]/15 bg-white px-4"
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${actionClassName}`}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
      <div className="flex items-center justify-between text-sm text-[#3d5249]">
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#05201c] hover:underline">
          <Sparkles className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </form>
  )
}
