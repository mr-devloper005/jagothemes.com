 'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Globe, Mail, MapPin, MessageCircle, Tag, X } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const panel = 'rounded-[6px] border border-[#d9d9d9] bg-[#f6f6f6] shadow-sm'
const detailLabel = 'text-[14px] font-semibold text-[#8a8a8a]'
const detailValue = 'mt-1 text-[20px] font-semibold leading-tight text-[#111] sm:text-[28px]'

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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []

  const price =
    typeof content.price === 'string'
      ? content.price
      : typeof content.budget === 'string'
      ? content.budget
      : typeof content.amount === 'string'
      ? content.amount
      : ''
  const brand = typeof content.brand === 'string' ? content.brand : ''
  const kind = typeof content.type === 'string' ? content.type : typeof content.condition === 'string' ? content.condition : ''
  const age = typeof content.age === 'string' ? content.age : typeof content.howOld === 'string' ? content.howOld : ''
  const locality = typeof content.locality === 'string' ? content.locality : location
  const replyHref = email ? `mailto:${email}?subject=Question about: ${encodeURIComponent(post.title)}` : phone ? `tel:${phone}` : website

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
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')

  return (
    <div className="min-h-screen bg-[#efefef] text-[#111]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-5xl px-3 py-8 sm:px-6">
        <nav className="mb-5 text-xs font-medium text-[#666]">
          <Link href="/" className="hover:text-[#0b69d2]">
            Home
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href={taskRoute} className="hover:text-[#0b69d2]">
            {taskLabel}
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-[#111]">Ad detail</span>
        </nav>

        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0b69d2] hover:underline">
           Back to {taskLabel}
        </Link>

        <section className={`${panel} overflow-hidden`}>
          <div className="border-b border-[#d9d9d9] bg-[#f3f3f3] p-4 sm:p-5">
            <h1 className="text-[26px] font-bold leading-tight text-black sm:text-[38px]">{post.title}</h1>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {price ? (
                <div>
                  <p className={detailLabel}>Price</p>
                  <p className={detailValue}>{price}</p>
                </div>
              ) : null}
              {brand ? (
                <div>
                  <p className={detailLabel}>Brand</p>
                  <p className={detailValue}>{brand}</p>
                </div>
              ) : null}
              {kind ? (
                <div>
                  <p className={detailLabel}>Type</p>
                  <p className={detailValue}>{kind}</p>
                </div>
              ) : null}
              {age ? (
                <div>
                  <p className={detailLabel}>How old</p>
                  <p className={detailValue}>{age}</p>
                </div>
              ) : null}
              {locality ? (
                <div>
                  <p className={detailLabel}>Locality</p>
                  <p className={detailValue}>{locality}</p>
                </div>
              ) : null}
              {!price && !brand && !kind && !age && !locality ? (
                <div>
                  <p className={detailLabel}>Category</p>
                  <p className={detailValue}>{category || taskLabel}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-b border-[#d9d9d9] bg-[#3f3f41] px-3 py-5 sm:px-6">
            <button
              type="button"
              onClick={() => setLightboxImage(images[0])}
              className="relative mx-auto block h-[220px] w-full max-w-2xl overflow-hidden border border-[#d4d4d4] bg-[#efefef] sm:h-[280px]"
            >
              <ContentImage src={images[0]} alt={post.title} fill className="object-contain" />
            </button>
            {images.length > 1 ? (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                {images.slice(1, 5).map((image) => (
                  <button
                    type="button"
                    key={image}
                    onClick={() => setLightboxImage(image)}
                    className="relative h-20 overflow-hidden border border-[#cfcfcf] bg-[#efefef] sm:h-24"
                  >
                    <ContentImage src={image} alt={post.title} fill className="object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 border-b border-[#d9d9d9] bg-[#f3f3f3] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#8a8a8a]">Mobile</p>
              <p className="mt-1 break-all text-[28px] font-bold leading-tight text-black sm:text-[34px]">{phone || email || website || 'Contact on request'}</p>
            </div>
            {replyHref ? (
              <a
                href={replyHref}
                target={replyHref.startsWith('http') ? '_blank' : undefined}
                rel={replyHref.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#f57921] px-8 py-3 text-[20px] font-semibold text-white transition hover:bg-[#e56f1c]"
              >
                <MessageCircle className="h-5 w-5" />
                Reply
              </a>
            ) : null}
          </div>

          <div className="bg-[#f3f3f3] p-4 sm:p-5">
            <h2 className="text-[34px] font-bold leading-tight text-black sm:text-[42px]">Description</h2>
            <RichContent html={descriptionHtml} className="mt-4 text-[20px] leading-9 text-[#111] sm:text-[28px] sm:leading-[1.65]" />
            {website || location || email || highlights.length ? (
              <div className="mt-7 space-y-3 border-t border-[#d9d9d9] pt-5 text-[18px] leading-8 text-[#222] sm:text-[24px] sm:leading-[1.8]">
                {location ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#666]" />
                    <span>{location}</span>
                  </div>
                ) : null}
                {website ? (
                  <div className="flex items-start gap-3">
                    <Globe className="mt-1 h-5 w-5 shrink-0 text-[#666]" />
                    <a href={website} className="break-all text-[#0b69d2] hover:underline" target="_blank" rel="noreferrer">
                      {website}
                    </a>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-[#666]" />
                    <a href={`mailto:${email}`} className="break-all text-[#0b69d2] hover:underline">
                      {email}
                    </a>
                  </div>
                ) : null}
                {highlights.slice(0, 4).map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {mapEmbedUrl ? (
          <section className="mt-7 overflow-hidden rounded-[6px] border border-[#d9d9d9] bg-white">
            <div className="border-b border-[#e2e2e2] px-4 py-3">
              <p className="text-sm font-semibold text-[#555]">Location map</p>
            </div>
            <iframe
              src={mapEmbedUrl}
              title={`${post.title} map`}
              className="h-[260px] w-full border-0 sm:h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-10 border-t border-[#d9d9d9] pt-8">
            <div className="flex flex-col gap-4 border-b border-[#e5e5e5] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#666]">You may also like</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">More from this category</h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ddd] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#555]">
                <Tag className="h-3.5 w-3.5 text-[#666]" /> {taskLabel}
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

      {lightboxImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black hover:bg-white"
            aria-label="Close image preview"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-md bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <ContentImage src={lightboxImage} alt={`${post.title} preview`} fill className="object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

