import type { LeHoi } from "../types";
import { LE_HOI_IMPORTED } from "./le-hoi.generated";

/** Dữ liệu thật: sinh bởi scripts/import-van-hoa.ts từ le-hoi.csv. */
export const LE_HOI: readonly LeHoi[] = LE_HOI_IMPORTED;
export const leHoiBySlug = (slug: string) => LE_HOI.find((x) => x.slug === slug);
