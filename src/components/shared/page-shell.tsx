'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0f7f4_0%,#ffffff_52%,#f7fbfa_100%)] text-[#05201c]">
      <NavbarShell />
      <header className="relative overflow-hidden bg-[#05201c] text-white shadow-[0_12px_40px_rgba(5,32,28,0.2)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, rgba(0, 140, 114, 0.45), transparent 42%), radial-gradient(circle at 90% 10%, rgba(255,255,255,0.12), transparent 35%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-11 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.65rem]">
                {title}
              </h1>
              {description ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">{description}</p>
              ) : null}
            </div>
            {actions ? (
              <div className="flex flex-wrap items-center gap-3 [&_button]:rounded-full [&_a]:rounded-full [&_input]:rounded-full [&_input]:border-[#0a3d2e]/20 [&_input]:bg-white">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">{children}</main>
      <Footer />
    </div>
  )
}
