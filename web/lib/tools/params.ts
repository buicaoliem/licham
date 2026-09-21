export type SearchParams = Record<string, string | string[] | undefined>;

/** Giá trị đầu tiên của một query param, bỏ khoảng trắng thừa. */
export function first(sp: SearchParams, name: string): string | undefined {
  const v = sp[name];
  const s = Array.isArray(v) ? v[0] : v;
  return s?.trim() || undefined;
}

export function hasAnyParam(sp: SearchParams, names: readonly string[]): boolean {
  return names.some((n) => sp[n] !== undefined);
}
