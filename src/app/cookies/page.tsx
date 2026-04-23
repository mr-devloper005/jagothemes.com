import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Keep you signed in safely, protect against abuse, and remember choices that affect core marketplace features.',
  },
  {
    title: 'Analytics cookies',
    body: 'Anonymous usage patterns so we can improve search relevance, fix broken flows, and prioritise the right categories.',
  },
  {
    title: 'Preference cookies',
    body: 'Remember filters, saved searches, and UI tweaks so the site feels familiar when you return on the same browser.',
  },
]

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie policy"
      description="What we store in your browser, why it exists, and how it supports a smoother classifieds experience."
    >
      <Card className={card}>
        <CardContent className="space-y-5 p-7 sm:p-8">
          <p className="text-xs font-medium text-[#008c72]">Last updated · April 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa] p-5">
              <h3 className="text-sm font-bold text-[#05201c]">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3d5249]">{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
