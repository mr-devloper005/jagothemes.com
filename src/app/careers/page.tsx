import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  { title: 'Trust & safety specialist', location: 'Dhaka / hybrid', type: 'Full-time', level: 'Mid' },
  { title: 'Product designer (mobile web)', location: 'Remote', type: 'Full-time', level: 'Senior' },
  { title: 'Partner success — local sellers', location: 'Chattogram', type: 'Full-time', level: 'Mid' },
]

const benefits = [
  'Small product team — your work ships weekly, not quarterly',
  'Transparent salary bands and performance reviews twice a year',
  'Health coverage and device stipend for remote teammates',
  'Learning budget for conferences, courses, and language classes',
]

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Help us grow ${SITE_CONFIG.name} into the calmest place to buy and sell locally — thoughtful design, fair policies, and fast support for real people.`}
      actions={
        <Button asChild className="bg-[#008c72] text-white hover:bg-[#007764]">
          <Link href="/contact">Introduce yourself</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className={card}>
              <CardContent className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border border-[#008c72]/20 bg-[#008c72]/10 text-[#008c72]">{role.level}</Badge>
                  <Badge variant="outline" className="border-[#0a3d2e]/15 text-[#05201c]">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-3 text-lg font-bold text-[#05201c]">{role.title}</h2>
                <p className="mt-1 text-sm text-[#3d5249]">{role.location}</p>
                <Button variant="outline" className="mt-5 rounded-full border-[#0a3d2e]/15" asChild>
                  <Link href="/contact">Ask about this role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={card}>
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#05201c]">Why join now</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#3d5249]">
              We are scaling trust tooling, smarter search, and seller onboarding across Bangladesh — early teammates shape
              the rituals and rituals matter here.
            </p>
            <div className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa] px-4 py-3 text-sm text-[#05201c]">
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
