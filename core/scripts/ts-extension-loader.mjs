// Minimal ESM loader hook so `node --experimental-strip-types` can run
// scripts/compare.ts, which imports from src files that use extensionless
// relative specifiers (valid under the project's "Bundler" moduleResolution,
// but not resolvable by Node's own ESM resolver). Only used for this script.
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") && !/\.[a-zA-Z0-9]+$/.test(specifier)) {
    const base = fileURLToPath(new URL(specifier, context.parentURL));
    if (existsSync(`${base}.ts`)) {
      return nextResolve(`${specifier}.ts`, context);
    }
  }
  return nextResolve(specifier, context);
}
