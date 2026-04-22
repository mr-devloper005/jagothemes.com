import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Post your first ad',
    description: 'Photos, categories, price, and how drafts work before your listing goes live to buyers.',
  },
  {
    title: 'Stay safe when meeting',
    description: 'Public meetups, payment tips, and how to report a suspicious message or duplicate scam listing.',
  },
  {
    title: 'Manage messages & saves',
    description: 'Keep track of buyers, mute noisy threads, and use saved searches so you never miss a deal.',
  },
  {
    title: 'Account & notifications',
    description: 'Email preferences, password resets, and what we store locally on your device when you stay signed in.',
  },
]

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function HelpPage() {
  return (
    <PageShell
      title="Help center"
      description="Practical answers for posting ads, messaging sellers, and keeping your account tidy — written for busy people, not lawyers."
      actions={
        <Button asChild className="bg-[#008c72] text-white hover:bg-[#007764]">
          <Link href="/contact">Still stuck? Contact us</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className={`${card} transition-transform hover:-translate-y-0.5`}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#05201c]">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#3d5249]">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={card}>
          <CardContent className="p-6 sm:p-7">
            <h3 className="text-lg font-bold text-[#05201c]">FAQ</h3>
            <p className="mt-1 text-sm text-[#3d5249]">Short answers — tap to expand.</p>
            <Accordion type="single" collapsible className="mt-5">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#0a3d2e]/10">
                  <AccordionTrigger className="text-left text-[#05201c] hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#3d5249]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
