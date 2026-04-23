import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  { name: 'Web app', detail: 'Browse, post, and message sellers', status: 'Operational' },
  { name: 'Search & listings API', detail: 'Category filters and saved searches', status: 'Operational' },
  { name: 'Media CDN', detail: 'Photos on ads and profiles', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed buyer notifications', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved' },
]

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="High-level health of the marketplace stack. We post incidents here when something affects posting, search, or sign-in."
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className={card}>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[#05201c]">{service.name}</h2>
                <p className="mt-1 text-sm text-[#3d5249]">{service.detail}</p>
                <Badge className="mt-4 border border-[#008c72]/25 bg-[#008c72]/12 text-[#007764] hover:bg-[#008c72]/15">
                  {service.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={card}>
          <CardContent className="p-6 sm:p-7">
            <h3 className="text-lg font-bold text-[#05201c]">Incident history</h3>
            <p className="mt-1 text-sm text-[#3d5249]">Recent events that touched multiple members — tap support if something looks off today.</p>
            <div className="mt-5 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa] px-4 py-3">
                  <div className="text-xs font-medium text-[#008c72]">{incident.date}</div>
                  <div className="text-sm font-semibold text-[#05201c]">{incident.title}</div>
                  <div className="text-xs text-[#3d5249]">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
