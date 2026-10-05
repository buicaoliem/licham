import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// Pages are prerendered at build and copied into the R2 bucket "licham-next-cache" (binding NEXT_INC_CACHE_R2_BUCKET).
// Pages that depend on today's date are re-rendered on the Worker when the bucket entry is stale or when the daily
// Cron Trigger asks (cloudflare-entry.js).
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "short-lived" }),
  queue: memoryQueue,
});
