import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const panel = 'rounded-[15px] border border-[#0a3d2e]/10 bg-white shadow-[0_16px_48px_rgba(5,32,28,0.08)]'
const softRow = 'flex items-center gap-3 rounded-2xl border border-[#0a3d2e]/10 bg-[#f7fbfa] px-4 py-3 text-sm text-[#05201c]'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const isClassified = task === 'classified'

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  const trustChips = isClassified
    ? ['Photo-first gallery', 'Location & map when available', 'Direct seller contact', 'Related picks from the same lane']
    : ['Clear contact details', 'Structured profile fields', 'Map and location cues', 'Related listings nearby']

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0f7f4_0%,#ffffff_55%)] text-[#05201c]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-6 text-xs font-medium text-[#3d5249]">
          <Link href="/" className="hover:text-[#008c72]">
            Home
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href={taskRoute} className="hover:text-[#008c72]">
            {taskLabel}
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-[#05201c]">Ad detail</span>
        </nav>

        <Link
          href={taskRoute}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#008c72] hover:underline"
        >
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className={`overflow-hidden ${panel} rounded-[18px]`}>
              <div className="relative h-[400px] overflow-hidden bg-[#e8f2ee] sm:h-[420px]">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                {isClassified ? (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#008c72] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    <Sparkles className="h-3 w-3" /> Featured
                  </span>
                ) : null}
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-xl border border-[#0a3d2e]/10 bg-[#f7fbfa]">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={`mt-8 p-7 sm:p-8 ${panel}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008c72]">
                {isClassified ? 'About this listing' : `About this ${task}`}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {isClassified ? 'Everything buyers ask before they message you' : 'Structured details you can scan in seconds'}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#3d5249] sm:text-base">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa] px-4 py-3 text-sm text-[#05201c]">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-7 sm:p-8 ${panel}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008c72]">{category || taskLabel}</p>
                  <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#05201c] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {isClassified ? 'Active' : 'Verified'}
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? (
                  <div className={softRow}>
                    <MapPin className="h-4 w-4 shrink-0 text-[#008c72]" /> {location}
                  </div>
                ) : null}
                {phone ? (
                  <div className={softRow}>
                    <Phone className="h-4 w-4 shrink-0 text-[#008c72]" /> {phone}
                  </div>
                ) : null}
                {email ? (
                  <div className={softRow}>
                    <Mail className="h-4 w-4 shrink-0 text-[#008c72]" /> {email}
                  </div>
                ) : null}
                {website ? (
                  <div className={softRow}>
                    <Globe className="h-4 w-4 shrink-0 text-[#008c72]" /> {website}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {email ? (
                  <a
                    href={`mailto:${email}?subject=Question about: ${encodeURIComponent(post.title)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#008c72] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#007764]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isClassified ? 'Message seller' : 'Send email'}
                  </a>
                ) : null}
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#0a3d2e]/15 bg-white px-5 py-3 text-sm font-semibold text-[#05201c] transition hover:bg-[#f0f7f4]"
                  >
                    {isClassified ? 'Open link' : 'Visit website'}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href={taskRoute}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0a3d2e]/15 bg-[#f7fbfa] px-5 py-3 text-sm font-semibold text-[#05201c] hover:bg-[#ecf5f1]"
                >
                  More {taskLabel.toLowerCase()}
                </Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className={`overflow-hidden ${panel}`}>
                <div className="border-b border-[#0a3d2e]/10 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008c72]">Map</p>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-[300px] w-full border-0 sm:h-[320px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}

            <div className={`p-6 sm:p-7 ${panel}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008c72]">Why this page feels different</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {trustChips.map((item) => (
                  <div key={item} className="rounded-[12px] border border-[#0a3d2e]/10 bg-[#f7fbfa] px-4 py-3 text-sm text-[#05201c]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14 border-t border-[#0a3d2e]/10 pt-12">
            <div className="flex flex-col gap-4 border-b border-[#0a3d2e]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008c72]">You may also like</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">More from this category</h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0a3d2e]/12 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#3d5249]">
                <Tag className="h-3.5 w-3.5 text-[#008c72]" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
