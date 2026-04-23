import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      title="Search ads"
      description={
        query
          ? `Showing matches for “${query}” across live listings and saved catalog content.`
          : "Search titles, descriptions, and tags — or scroll the freshest picks below."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#05201c]/40" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Search vehicles, homes, phones…"
              className="h-11 border-[#0a3d2e]/15 bg-white pl-9 text-[#05201c] placeholder:text-[#05201c]/45"
            />
          </div>
          <Button type="submit" className="h-11 bg-[#008c72] text-white hover:bg-[#007764]">
            Search
          </Button>
        </form>
      }
    >
      {results.length ? (
        <div>
          <p className="mb-6 text-sm font-medium text-[#3d5249]">
            {results.length} result{results.length === 1 ? '' : 's'} {query ? `for your query` : '— popular picks'}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => {
              const task = getPostTaskKey(post);
              const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
              return <TaskPostCard key={post.id} post={post} href={href} />;
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-[15px] border border-dashed border-[#0a3d2e]/20 bg-[#f7fbfa] px-6 py-14 text-center">
          <p className="text-base font-semibold text-[#05201c]">No matches yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#3d5249]">
            Try a shorter keyword, check spelling, or browse categories from the home page — new ads land every day.
          </p>
        </div>
      )}
    </PageShell>
  );
}
