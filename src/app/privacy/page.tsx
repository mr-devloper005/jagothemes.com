import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'What we collect',
    body: 'Account details you provide (name, email), content in your ads and messages, basic device data for security, and anonymous usage patterns to improve search quality.',
  },
  {
    title: 'How we use information',
    body: 'To run the marketplace (showing your ads, delivering messages), prevent fraud, comply with law, and communicate product updates you can opt out of anytime.',
  },
  {
    title: 'Storage & local sessions',
    body: 'When you choose “stay signed in,” a secure browser token may be stored locally so you are not asked to log in on every visit — you can clear it from settings or your browser.',
  },
  {
    title: 'Your controls',
    body: 'Export or delete your account data where applicable, adjust email preferences, and contact us if you need a manual review of what we hold on your behalf.',
  },
]

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy policy"
      description="Plain-language summary of how we handle personal data on this classifieds marketplace."
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
