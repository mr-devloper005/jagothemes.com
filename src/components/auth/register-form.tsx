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

export function RegisterForm({ actionClassName }: Props) {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({
        title: 'Missing details',
        description: 'Fill in your name, email, and password.',
        variant: 'destructive',
      })
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      toast({
        title: 'Account ready',
        description: 'You are signed in and saved on this device.',
      })
      router.push('/')
      router.refresh()
    } catch {
      toast({
        title: 'Could not create account',
        description: 'Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="register-name" className="text-sm font-medium">
          Full name
        </Label>
        <Input
          id="register-name"
          autoComplete="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Your name"
          className="h-12 rounded-2xl border-[#0a3d2e]/15 bg-white px-4"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="you@example.com"
          className="h-12 rounded-2xl border-[#0a3d2e]/15 bg-white px-4"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password" className="text-sm font-medium">
          Password
        </Label>
        <Input
          id="register-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-2xl border-[#0a3d2e]/15 bg-white px-4"
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${actionClassName}`}>
        {isLoading ? 'Creating…' : 'Create account'}
      </Button>
      <div className="flex items-center justify-between text-sm text-[#3d5249]">
        <span>Already have an account?</span>
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#05201c] hover:underline">
          <Sparkles className="h-4 w-4" />
          Sign in
        </Link>
      </div>
    </form>
  )
}
