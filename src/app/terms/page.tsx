import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Using the marketplace',
    body: `By accessing ${SITE_CONFIG.name} you agree to post accurate information, respect other members, and follow local laws for the items you buy or sell.`,
  },
  {
    title: 'Listings & transactions',
    body: 'Deals happen between buyers and sellers. We provide the platform and messaging tools but are not a party to your sale unless explicitly stated for a specific paid service.',
  },
  {
    title: 'Content & moderation',
    body: 'We may remove listings or accounts that violate policies, look fraudulent, or risk member safety — with notice when practical.',
  },
  {
    title: 'Liability',
    body: 'The service is provided as-is to the extent permitted by law. Please inspect items in person when possible and use secure payment practices.',
  },
]

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of service"
      description={`Rules and expectations for everyone who buys, sells, or browses on ${SITE_CONFIG.name}.`}
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
