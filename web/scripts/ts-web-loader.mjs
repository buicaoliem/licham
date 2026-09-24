// ESM loader hook, used only for running web/scripts/*.ts build-time scripts with
// `node --experimental-strip-types`. Resolves the "@/*" path alias (defined in
// web/tsconfig.json for the Next.js bundler) to the web/ package root, and resolves
// extensionless relative specifiers to their ".ts" file, same as
// core/scripts/ts-extension-loader.mjs.
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const WEB_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = join(WEB_ROOT, specifier.slice(2));
    return nextResolve(pathToFileURL(existsSync(`${target}.ts`) ? `${target}.ts` : target).href, context);
  }
  // "./heritage-assets.generated" trông như có đuôi nhưng vẫn là file .ts — thử thêm ".ts" khi file đó tồn tại.
  if (specifier.startsWith(".") && !/\.(ts|tsx|js|mjs|cjs|json)$/.test(specifier)) {
    const base = fileURLToPath(new URL(specifier, context.parentURL));
    if (existsSync(`${base}.ts`)) {
      return nextResolve(`${specifier}.ts`, context);
    }
  }
  return nextResolve(specifier, context);
}
