import Link from 'next/link'
import { Headphones, LifeBuoy, Mail, MapPin, MessageCircle } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: MessageCircle,
    title: 'Buying & selling help',
    body: 'Questions about posting ads, editing photos, pricing, or marking an item sold — we route you to the right checklist fast.',
  },
  {
    icon: Headphones,
    title: 'Account & safety',
    body: 'Sign-in issues, saved ads, reporting a listing, or understanding how your profile appears to other members.',
  },
  {
    icon: MapPin,
    title: 'Local coverage',
    body: 'Suggest a new city or category focus for vehicles, homes, phones, and bikes across Bangladesh.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0f7f4_0%,#ffffff_52%)] text-[#05201c]">
      <NavbarShell />
      <header className="relative overflow-hidden bg-[#05201c] text-white shadow-[0_12px_40px_rgba(5,32,28,0.2)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(0, 140, 114, 0.5), transparent 45%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7fe8d4]">We reply within one business day</p>
          <h1 className="mt-3 max-w-3xl font-sans text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Talk to the {SITE_CONFIG.name} team
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Whether you are listing your first phone or managing several vehicle ads, tell us what you need — we answer in plain language, no ticket black holes.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0a3d2e]/12 bg-white px-4 py-2 text-xs font-semibold text-[#008c72] shadow-sm">
              <LifeBuoy className="h-4 w-4" />
              Classifieds support
            </div>
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div
                  key={lane.title}
                  className="rounded-[15px] border border-[#0a3d2e]/10 bg-white p-6 shadow-[0_12px_40px_rgba(5,32,28,0.06)]"
                >
                  <lane.icon className="h-5 w-5 text-[#008c72]" />
                  <h2 className="mt-3 text-lg font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#3d5249]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] border border-[#0a3d2e]/10 bg-white p-8 shadow-[0_20px_60px_rgba(5,32,28,0.08)]">
            <h2 className="text-xl font-bold">Send a message</h2>
            <p className="mt-2 text-sm text-[#3d5249]">Share your email, ad link if relevant, and what you tried already — we respond faster with context.</p>
            <form className="mt-8 grid gap-4">
              <input
                className="h-12 rounded-2xl border border-[#0a3d2e]/12 bg-[#f7fbfa] px-4 text-sm text-[#05201c] outline-none ring-[#008c72]/30 placeholder:text-[#05201c]/45 focus:ring-2"
                placeholder="Your name"
              />
              <input
                className="h-12 rounded-2xl border border-[#0a3d2e]/12 bg-[#f7fbfa] px-4 text-sm text-[#05201c] outline-none ring-[#008c72]/30 placeholder:text-[#05201c]/45 focus:ring-2"
                placeholder="Email address"
              />
              <input
                className="h-12 rounded-2xl border border-[#0a3d2e]/12 bg-[#f7fbfa] px-4 text-sm text-[#05201c] outline-none ring-[#008c72]/30 placeholder:text-[#05201c]/45 focus:ring-2"
                placeholder="Topic (e.g. billing, report a listing)"
              />
              <textarea
                className="min-h-[168px] rounded-2xl border border-[#0a3d2e]/12 bg-[#f7fbfa] px-4 py-3 text-sm text-[#05201c] outline-none ring-[#008c72]/30 placeholder:text-[#05201c]/45 focus:ring-2"
                placeholder="Describe your question — include links or screenshots if helpful."
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#008c72] px-6 text-sm font-semibold text-white transition hover:bg-[#007764]"
              >
                Send message
              </button>
            </form>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-xs text-[#3d5249]">Or email us directly at</span>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#008c72]/20 bg-[#008c72]/5 px-3 py-1.5 text-xs font-semibold text-[#008c72] transition hover:bg-[#008c72]/10"
              >
                <Mail className="h-3.5 w-3.5" />
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-[#3d5249]">
              Prefer self-serve?{' '}
              <Link href="/help" className="font-semibold text-[#008c72] hover:underline">
                Help center
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
