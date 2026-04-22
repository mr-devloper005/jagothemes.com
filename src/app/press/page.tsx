'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

const card = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_12px_40px_rgba(5,32,28,0.06)]'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      title="Press room"
      description="Logos, screenshots, and story angles for journalists covering local commerce, trust & safety, and how classifieds behave in Bangladesh."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={card}>
          <CardContent className="space-y-4 p-6 sm:p-7">
            <div>
              <h2 className="text-lg font-bold text-[#05201c]">Brand kit</h2>
              <p className="mt-1 text-sm leading-relaxed text-[#3d5249]">
                Approved assets for print and digital — preview before download so you grab the right crop.
              </p>
            </div>
            <div className="grid gap-3">
              {mockPressAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa] px-4 py-4 transition-colors hover:border-[#008c72]/25"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#05201c]">{asset.title}</p>
                      <p className="text-xs text-[#3d5249]">{asset.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="border border-[#008c72]/20 bg-[#008c72]/10 text-[#008c72]">{asset.fileType}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full border-[#0a3d2e]/15"
                        onClick={() => setActiveAssetId(asset.id)}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-full bg-[#008c72] text-white hover:bg-[#007764]"
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#008c72]">Coverage</h2>
          {mockPressCoverage.map((item) => (
            <Card key={item.id} className={`${card} transition-transform hover:-translate-y-0.5`}>
              <CardContent className="p-6">
                <div className="text-xs font-medium uppercase tracking-wide text-[#3d5249]">{item.outlet}</div>
                <p className="mt-2 text-sm font-medium leading-snug text-[#05201c]">{item.headline}</p>
                <p className="mt-2 text-xs text-[#3d5249]">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#0a3d2e]/15">
          <DialogHeader>
            <DialogTitle className="text-[#05201c]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa]">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-[#3d5249]">{activeAsset?.description}</p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-full border-[#0a3d2e]/15" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-[#008c72] text-white hover:bg-[#007764]"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
