import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const notifications = [
  { id: 1, title: 'New message on your ad', detail: 'Someone asked about mileage on your hatchback listing.', time: '2 hours ago' },
  { id: 2, title: 'Listing views heating up', detail: 'Your flat share post crossed 40 views today — reply while interest is fresh.', time: '5 hours ago' },
  { id: 3, title: 'Ad approved', detail: 'Your phone sale is live in Mobiles and visible in search.', time: '1 day ago' },
]

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function DashboardNotificationsPage() {
  return (
    <PageShell
      title="Notifications"
      description="A lightweight activity feed for your marketplace account — messages, listing health, and approvals in one place."
      actions={
        <Button variant="outline" className="rounded-full border-[#0a3d2e]/20" asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      }
    >
      <div className="grid gap-4">
        {notifications.map((note) => (
          <Card key={note.id} className={card}>
            <CardContent className="p-6">
              <div className="text-xs font-medium uppercase tracking-wide text-[#008c72]">{note.time}</div>
              <h2 className="mt-2 text-lg font-bold text-[#05201c]">{note.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#3d5249]">{note.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
