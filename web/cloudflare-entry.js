// Cloudflare Worker entry: wraps the OpenNext handler with
//  1. the workers.dev SEO guard: any host ending ".workers.dev" gets "X-Robots-Tag: noindex, nofollow" and a
//     disallow-all robots.txt. Real domains pass through untouched (fully indexable).
//  2. the daily Cron Trigger (replaces the Vercel Deploy Hook rebuild at 00:05): pages that show "today" are prerendered
//     at build, so at 00:05 Vietnam time the cron regenerates them (see lib/refresh-plan.ts) and the site flips to the new
//     date without a deploy.
// Wrangler bundles this file at deploy time, after OpenNext has generated .open-next/worker.js.
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
import handler from "./.open-next/worker.js";
import prerenderManifest from "./.open-next/server-functions/default/web/.next/prerender-manifest.json";
import { currentTime } from "./lib/clock.ts";
import { pathsToRefresh, vnDateKey } from "./lib/refresh-plan.ts";

const ORIGIN = "https://licham.app";
const MARKER_KEY = "meta/last-refresh.json";
const isWorkersDev = (hostname) => hostname === "workers.dev" || hostname.endsWith(".workers.dev");

async function readLastRunDate(env) {
  try {
    const obj = await env.NEXT_INC_CACHE_R2_BUCKET.get(MARKER_KEY);
    return obj ? ((await obj.json()).date ?? null) : null;
  } catch {
    return null;
  }
}

// Ask Next.js to regenerate one cached page (on-demand ISR). The preview-mode id is generated per build and lives only in the Worker bundle.
async function regenerate(path, env, ctx) {
  const res = await handler.fetch(
    new Request(ORIGIN + path, { headers: { "x-prerender-revalidate": prerenderManifest.preview.previewModeId } }),
    env,
    ctx,
  );
  await res.arrayBuffer();
  return res.status;
}

async function refresh(env, ctx) {
  const now = currentTime();
  const lastRunDate = await readLastRunDate(env);
  const paths = pathsToRefresh({ now, routes: Object.keys(prerenderManifest.routes), lastRunDate });
  const failed = [];
  for (const path of paths) {
    try {
      const status = await regenerate(path, env, ctx);
      if (status !== 200) failed.push(`${path} -> ${status}`);
    } catch (e) {
      failed.push(`${path} -> ${e}`);
    }
  }
  console.log(JSON.stringify({ cron: "refresh", now: now.toISOString(), lastRunDate, refreshed: paths.length, failed }));
  // Keep the old marker on failure so the next run tries the same day again.
  if (failed.length === 0) {
    await env.NEXT_INC_CACHE_R2_BUCKET.put(MARKER_KEY, JSON.stringify({ date: vnDateKey(now), at: now.toISOString() }));
  }
}

const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (!isWorkersDev(url.hostname)) return handler.fetch(request, env, ctx);

    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /\n", {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-robots-tag": "noindex, nofollow",
          "cache-control": "no-store",
        },
      });
    }

    const res = await handler.fetch(request, env, ctx);
    const out = new Response(res.body, res);
    out.headers.set("X-Robots-Tag", "noindex, nofollow");
    return out;
  },

  // Daily at 17:05 UTC (00:05 Asia/Ho_Chi_Minh). Locally: GET /cdn-cgi/handler/scheduled.
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(refresh(env, ctx));
  },
};

export default worker;
