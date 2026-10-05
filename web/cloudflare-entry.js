// Cloudflare Worker entry: wraps the OpenNext handler with the workers.dev SEO guard.
// Any host ending ".workers.dev" gets "X-Robots-Tag: noindex, nofollow" and a disallow-all robots.txt.
// Real domains pass through untouched (fully indexable).
// Wrangler bundles this file at deploy time, after OpenNext has generated .open-next/worker.js.
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
import handler from "./.open-next/worker.js";

const isWorkersDev = (hostname) => hostname === "workers.dev" || hostname.endsWith(".workers.dev");

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
};

export default worker;
