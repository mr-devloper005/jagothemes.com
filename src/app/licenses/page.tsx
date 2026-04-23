import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const licenses = [
  { name: 'Next.js', description: 'MIT License — React framework and tooling we ship the web app with.' },
  { name: 'React', description: 'MIT License — UI library powering components and client interactions.' },
  { name: 'Tailwind CSS', description: 'MIT License — utility-first styling system for layout and theme tokens.' },
]

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function LicensesPage() {
  return (
    <PageShell
      title="Open source licenses"
      description="We build on a strong open-source stack. Here are the headline projects — full attributions ship with the application bundle."
    >
      <Card className={card}>
        <CardContent className="space-y-4 p-7 sm:p-8">
          {licenses.map((license) => (
            <div key={license.name} className="rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa] p-5">
              <h3 className="text-sm font-bold text-[#05201c]">{license.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3d5249]">{license.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
