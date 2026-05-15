import Link from 'next/link'
import { ArrowRight, Building2, FileText, Filter, HelpCircle, Image as ImageIcon, LayoutGrid, Search, Shield, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, CLASSIFIED_CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#07111f_0%,#13203a_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#edf3e4_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f0f7f4_0%,#ffffff_55%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid
  const isClassifiedHomeShell =
    task === 'classified' && layoutKey === 'classified-market' && recipe.homeLayout === 'classified-home'
  const shellClassResolved = isClassifiedHomeShell ? 'bg-[linear-gradient(180deg,#f0f7f4_0%,#ffffff_55%)]' : shellClass

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const ui = isClassifiedHomeShell && !isDark
    ? {
        muted: 'text-[#3d5249]',
        panel: 'border border-[#0a3d2e]/10 bg-white shadow-sm',
        soft: 'border border-[#0a3d2e]/10 bg-[#f7fbf9]',
        input: 'border border-[#0a3d2e]/15 bg-white text-[#05201c]',
        button: 'bg-[#008c72] text-white hover:bg-[#007764]',
      }
    : isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#72594a]',
          panel: 'border border-[#dbc6b6] bg-white/90',
          soft: 'border border-[#dbc6b6] bg-[#fff8ef]',
          input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
          button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
        }
      : {
          muted: 'text-slate-600',
          panel: 'border border-slate-200 bg-white',
          soft: 'border border-slate-200 bg-slate-50',
          input: 'border border-slate-200 bg-white text-slate-950',
          button: 'bg-slate-950 text-white hover:bg-slate-800',
        }

  return (
    <div className={`min-h-screen ${shellClassResolved}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-market' && isClassifiedHomeShell ? (
          <section className="relative mb-12 overflow-hidden rounded-[1.25rem] bg-[#05201c] px-6 py-11 text-white shadow-[0_24px_60px_rgba(5,32,28,0.28)] sm:px-8 lg:px-12 lg:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 12% 28%, rgba(0, 140, 114, 0.55), transparent 42%), radial-gradient(circle at 88% 12%, rgba(255,255,255,0.14), transparent 38%)',
              }}
            />
            <div className="pointer-events-none absolute -right-16 top-8 hidden h-48 w-72 rotate-6 rounded-2xl border border-white/10 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=60&auto=format&fit=crop')] bg-cover opacity-35 lg:block" />
            <div className="pointer-events-none absolute -right-8 top-24 hidden h-36 w-52 -rotate-6 rounded-2xl border border-white/10 bg-[url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=60&auto=format&fit=crop')] bg-cover opacity-30 lg:block" />
            <div className="relative">
              <nav className="text-xs font-medium text-white/70">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <span className="mx-2 text-white/40">/</span>
                <span className="text-white">Classifieds</span>
              </nav>
              <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div className="max-w-2xl">
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
                    <Tag className="h-3.5 w-3.5 text-[#8df0c8]" />
                    Local marketplace
                  </p>
                  <h1 className="mt-5 font-sans text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.15rem]">
                    Find your next car, home, phone, or bike — without the noise.
                  </h1>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/82 sm:text-base">
                    Honest photos, clear categories, and messaging that stays on the platform. Filter what you need, save
                    time, and meet sellers when you are ready.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href="/create/classified"
                      className="inline-flex items-center gap-2 rounded-full bg-[#008c72] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 transition hover:bg-[#007764]"
                    >
                      Post an ad
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/search"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                    >
                      <Search className="h-4 w-4" />
                      Search everything
                    </Link>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 lg:max-w-md lg:grid-cols-1">
                  <div className="rounded-[14px] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-bold tabular-nums text-white">{posts.length}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/65">Ads in this feed</p>
                  </div>
                  <div className="rounded-[14px] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-white">4</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/65">Core lanes</p>
                  </div>
                  <div className="rounded-[14px] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                    <p className="text-sm font-semibold leading-snug text-white">Vehicles · Houses · Mobiles · Bikes</p>
                    <p className="mt-1 text-xs text-white/65">Structured categories</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || (layoutKey === 'classified-market' && !isClassifiedHomeShell) ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch">
            <div className="rounded-[1.25rem] border border-[#0a3d2e]/12 bg-[#05201c] p-7 text-white shadow-[0_20px_50px_rgba(5,32,28,0.2)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8df0c8]/90">{taskConfig?.label || 'Classifieds'}</p>
              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Fresh listings for what you actually buy locally.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/78">
                Same green market look as the home page — skim titles, jump categories, and message sellers when something
                fits your budget.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/create/classified"
                  className="inline-flex items-center gap-2 rounded-full bg-[#008c72] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#007764]"
                >
                  Post an ad
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white/95 hover:bg-white/10">
                  Get support
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Meet in public', body: 'Pick busy spots for vehicles and high-value handovers.' },
                { title: 'Verify before you pay', body: 'Inspect items in person; avoid pressure to send deposits early.' },
                { title: 'Save searches', body: 'Use category links so new matches stay easy to track.' },
                { title: 'Clear photos win', body: 'Sellers with bright, honest shots get faster serious replies.' },
              ].map((item) => (
                <div key={item.title} className="rounded-[15px] border border-[#0a3d2e]/10 bg-white p-5 shadow-[0_12px_36px_rgba(5,32,28,0.06)]">
                  <p className="text-sm font-bold text-[#05201c]">{item.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#3d5249]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}


        {isClassifiedHomeShell ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_1fr] lg:items-start">
            <aside className="space-y-6">
              <div className={`rounded-[15px] p-5 ${ui.soft}`}>
                <h2 className="font-sans text-base font-bold text-[#05201c]">Categories</h2>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/classifieds"
                    className={`block rounded-full px-3 py-2 text-sm font-medium ${normalizedCategory === 'all' ? 'bg-[#05201c] text-white' : 'text-[#05201c] hover:bg-white/80'}`}
                  >
                    All ads
                  </Link>
                  {CLASSIFIED_CATEGORY_OPTIONS.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/classifieds?category=${item.slug}`}
                      className={`block rounded-full px-3 py-2 text-sm font-medium ${normalizedCategory === item.slug ? 'bg-[#05201c] text-white' : 'text-[#05201c] hover:bg-white/80'}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className={`rounded-[15px] p-5 ${ui.panel}`}>
                <h2 className="font-sans text-base font-bold text-[#05201c]">Price range</h2>
                <p className={`mt-2 text-xs leading-relaxed ${ui.muted}`}>Use filters on each listing or message sellers for the latest price.</p>
              </div>
              <div className={`rounded-[15px] p-5 ${ui.panel}`}>
                <div className="flex items-center gap-2 text-[#05201c]">
                  <Shield className="h-4 w-4 text-[#008c72]" />
                  <h2 className="font-sans text-base font-bold">Help & safety</h2>
                </div>
                <p className={`mt-2 text-xs leading-relaxed ${ui.muted}`}>
                  Questions about posting, reporting a listing, or meeting a buyer? We keep answers short and practical.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/help"
                    className="inline-flex items-center gap-2 rounded-full border border-[#0a3d2e]/12 bg-[#f7fbfa] px-3 py-2 text-xs font-semibold text-[#05201c] transition hover:border-[#008c72]/30"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-[#008c72]" />
                    Help center
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[#0a3d2e]/12 bg-[#f7fbfa] px-3 py-2 text-xs font-semibold text-[#05201c] transition hover:border-[#008c72]/30"
                  >
                    Contact us
                  </Link>
                  <Link href="/about" className="text-xs font-medium text-[#008c72] hover:underline">
                    Why we built this →
                  </Link>
                </div>
              </div>
            </aside>
            <div>
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
                <form action="/search" className="flex w-full flex-1 items-center gap-2 rounded-full border border-[#0a3d2e]/12 bg-white p-2 pl-4 shadow-sm">
                  <Search className="h-4 w-4 shrink-0 text-[#05201c]/40" />
                  <input name="q" className="min-w-0 flex-1 bg-transparent text-sm text-[#05201c] outline-none placeholder:text-[#05201c]/45" placeholder="Search to buy" />
                  <button type="submit" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${ui.button}`} aria-label="Search">
                    <Search className="h-4 w-4" />
                  </button>
                </form>
              </div>
              <form className={`mb-6 flex flex-wrap items-end gap-3 rounded-[15px] p-4 ${ui.panel}`} action={taskConfig?.route || '#'}>
                <div>
                  <label className={`block text-[10px] font-semibold uppercase tracking-wider ${ui.muted}`}>Category</label>
                  <select name="category" defaultValue={normalizedCategory} className={`mt-1.5 h-10 min-w-[10rem] rounded-xl px-3 text-sm ${ui.input}`}>
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={`h-10 rounded-full px-5 text-sm font-semibold ${ui.button}`}>
                  Apply
                </button>
              </form>
              <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
            </div>
          </div>
        ) : (
          <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
        )}
      </main>
      <Footer />
    </div>
  )
}
