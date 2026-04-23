"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  const panel =
    "rounded-[2rem] border border-[#0a3d2e]/12 bg-white p-8 shadow-[0_24px_80px_rgba(5,32,28,0.08)] sm:p-10"

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0f7f4_0%,#ffffff_52%,#f7fbfa_100%)] text-[#05201c]">
      <NavbarShell />
      <main className="mx-auto flex max-w-lg flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#3d5249] transition-colors hover:text-[#008c72]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className={panel}>
            {!isSubmitted ? (
              <>
                <h1 className="text-3xl font-bold tracking-tight text-[#05201c]">Reset your password</h1>
                <p className="mt-3 text-sm leading-relaxed text-[#3d5249]">
                  Enter the email on your account. We will send a link to create a new password — check spam if nothing
                  arrives in a few minutes.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#05201c]">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3d5249]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-full border-[#0a3d2e]/20 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-[#008c72] text-white hover:bg-[#007764]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#008c72]/15">
                  <CheckCircle className="h-8 w-8 text-[#008c72]" />
                </div>
                <h1 className="text-3xl font-bold text-[#05201c]">Check your email</h1>
                <p className="mt-3 text-sm leading-relaxed text-[#3d5249]">
                  If that address matches an account, you will see a reset link shortly. Sent to{" "}
                  <strong className="text-[#05201c]">{email}</strong>
                </p>
                <Button asChild variant="outline" className="mt-8 w-full rounded-full border-[#0a3d2e]/20">
                  <Link href="/login">Back to login</Link>
                </Button>
                <p className="mt-6 text-sm text-[#3d5249]">
                  Did not receive the email?{" "}
                  <button type="button" onClick={() => setIsSubmitted(false)} className="font-medium text-[#008c72] hover:underline">
                    Try again
                  </button>
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
