import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const highlights = [
  { label: 'Live ads this season', value: '24k+' },
  { label: 'Cities with active buyers', value: '64' },
  { label: 'Avg. reply time (messages)', value: '< 2h' },
]

const values = [
  {
    title: 'Built for real listings',
    description: 'Photos, maps, and price sit up front so buyers skim less and ask better questions.',
  },
  {
    title: 'Calm, not cluttered',
    description: 'We skip noisy feeds and unrelated modules — just classified lanes that stay easy to scan.',
  },
  {
    title: 'Trust by design',
    description: 'Clear seller cues, saved searches, and straightforward contact paths keep the marketplace human.',
  },
]

const cardFrame = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} helps people across Bangladesh buy and sell vehicles, homes, phones, and bikes with a focused, friendly classifieds experience.`}
      actions={
        <>
          <Button variant="outline" asChild className="border-white/35 bg-transparent text-white hover:bg-white/10">
            <Link href="/classifieds">Browse ads</Link>
          </Button>
          <Button asChild className="bg-[#008c72] text-white hover:bg-[#007764]">
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <Card className={cardFrame}>
          <CardContent className="space-y-5 p-7 sm:p-8">
            <Badge className="border border-[#008c72]/25 bg-[#008c72]/10 text-[#008c72]">Our story</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#05201c]">Local commerce, thoughtfully paced</h2>
            <p className="text-sm leading-relaxed text-[#3d5249]">
              We started from a simple frustration: great second-hand deals were buried in chaotic groups and generic
              directories. {SITE_CONFIG.name} is the opposite — a single place to post with confidence, browse with
              filters that matter, and message without handing your phone number to everyone on the internet.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa] p-4">
                  <div className="text-2xl font-bold text-[#05201c]">{item.value}</div>
                  <div className="mt-1 text-xs font-medium text-[#3d5249]">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className={cardFrame}>
              <CardContent className="p-6 sm:p-7">
                <h3 className="text-lg font-semibold text-[#05201c]">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3d5249]">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
