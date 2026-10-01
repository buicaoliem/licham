import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { COLLECTIONS, buildFeed, type Feed } from "./feed";
import { validateFeed } from "./validate";
import { ILLUSTRATION_CAPTION } from "../heritage-assets";

const dirs: string[] = [];
afterEach(() => {
  while (dirs.length) rmSync(dirs.pop()!, { recursive: true, force: true });
});

function write(feed: Feed): string {
  const dir = mkdtempSync(join(tmpdir(), "licham-feed-"));
  dirs.push(dir);
  mkdirSync(dir, { recursive: true });
  for (const name of COLLECTIONS) {
    writeFileSync(join(dir, feed.files[name].name), feed.files[name].bytes);
    writeFileSync(join(dir, feed.files[name].hashedName), feed.files[name].bytes);
  }
  writeFileSync(join(dir, "manifest.json"), JSON.stringify(feed.manifest));
  return dir;
}

describe("app content feed", () => {
  const stamp = { at: "2026-10-01T03:00:00Z", commit: "abc123" };
  const feed = buildFeed(stamp);

  it("khớp hợp đồng của app", () => {
    expect(validateFeed({ feedDir: write(feed) })).toEqual([]);
  });

  it("tất định: cùng nguồn cho cùng hash", () => {
    const again = buildFeed(stamp);
    for (const name of COLLECTIONS) expect(again.files[name].hash).toBe(feed.files[name].hash);
  });

  it("đủ ba collection, path tuyệt đối trên cùng host", () => {
    const cols = feed.manifest.collections as Record<string, { path: string }>;
    expect(Object.keys(cols).sort()).toEqual([...COLLECTIONS].sort());
    for (const c of Object.values(cols)) expect(c.path).toMatch(/^\/api\/app\/content\/[a-z]+\.[0-9a-f]{12}\.json$/);
  });

  it("dùng đúng một câu chú thích cho tranh minh họa", () => {
    expect(ILLUSTRATION_CAPTION).toBe("Tranh minh họa, không phải ảnh tư liệu lịch sử");
    const heritage = JSON.parse(feed.files.heritage.bytes.toString("utf8"));
    const notes = new Set<string>();
    for (const a of Object.values<{ kind: string; note: string | null }>(heritage.festivalArt)) if (a.kind === "img" && a.note) notes.add(a.note);
    for (const h of heritage.heroes as { art: { kind: string; note: string } | null }[]) if (h.art?.kind === "img") notes.add(h.art.note);
    expect([...notes]).toEqual([ILLUSTRATION_CAPTION]);
  });

  it("phát hiện file bị sửa sau khi tính hash", () => {
    const dir = write(feed);
    const cols = feed.manifest.collections as Record<string, { path: string }>;
    writeFileSync(join(dir, cols.catalog.path.split("/").pop()!), "{}");
    const errors = validateFeed({ feedDir: dir });
    expect(errors.some((e) => e.includes("catalog") && e.includes("hash"))).toBe(true);
  });
});
