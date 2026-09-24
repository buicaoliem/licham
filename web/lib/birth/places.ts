/**
 * Danh sách nơi sinh chọn sẵn: tỉnh lỵ 63 tỉnh/thành Việt Nam (theo địa giới trước 1/7/2025 — tên người
 * dùng quen ghi trên giấy khai sinh) và các thành phố nước ngoài có đông người Việt.
 * Tọa độ lấy tới 0,01° (≈ 1 km) — sai số này làm lệch Ascendant dưới 0,1°, không đáng kể so với sai số giờ sinh.
 * Ngoài danh sách, người dùng nhập tọa độ và múi giờ IANA thủ công.
 */
import type { BirthPlaceTz } from "./time";

export interface Place extends BirthPlaceTz {
  id: string;
  name: string;
  /** Nhóm hiển thị trong ô chọn. */
  group: string;
}

const VN = "Asia/Ho_Chi_Minh";

function vn(id: string, name: string, lat: number, lon: number): Place {
  return { id, name, group: "Việt Nam", lat, lon, tz: VN, country: "VN" };
}

function intl(id: string, name: string, group: string, lat: number, lon: number, tz: string, country: string): Place {
  return { id, name, group, lat, lon, tz, country };
}

export const PLACES: readonly Place[] = [
  vn("ha-noi", "Hà Nội", 21.03, 105.85),
  vn("tp-hcm", "TP Hồ Chí Minh (Sài Gòn)", 10.78, 106.7),
  vn("hai-phong", "Hải Phòng", 20.84, 106.69),
  vn("da-nang", "Đà Nẵng", 16.05, 108.2),
  vn("can-tho", "Cần Thơ", 10.05, 105.75),
  vn("hue", "Huế (Thừa Thiên Huế)", 16.46, 107.59),
  vn("an-giang", "An Giang (Long Xuyên)", 10.39, 105.44),
  vn("vung-tau", "Bà Rịa – Vũng Tàu", 10.35, 107.08),
  vn("bac-giang", "Bắc Giang", 21.27, 106.19),
  vn("bac-kan", "Bắc Kạn", 22.15, 105.83),
  vn("bac-lieu", "Bạc Liêu", 9.29, 105.73),
  vn("bac-ninh", "Bắc Ninh", 21.19, 106.08),
  vn("ben-tre", "Bến Tre", 10.24, 106.38),
  vn("binh-dinh", "Bình Định (Quy Nhơn)", 13.78, 109.22),
  vn("binh-duong", "Bình Dương (Thủ Dầu Một)", 10.98, 106.65),
  vn("binh-phuoc", "Bình Phước (Đồng Xoài)", 11.54, 106.88),
  vn("binh-thuan", "Bình Thuận (Phan Thiết)", 10.93, 108.1),
  vn("ca-mau", "Cà Mau", 9.18, 105.15),
  vn("cao-bang", "Cao Bằng", 22.67, 106.26),
  vn("dak-lak", "Đắk Lắk (Buôn Ma Thuột)", 12.67, 108.04),
  vn("dak-nong", "Đắk Nông (Gia Nghĩa)", 12.0, 107.69),
  vn("dien-bien", "Điện Biên", 21.39, 103.02),
  vn("dong-nai", "Đồng Nai (Biên Hòa)", 10.96, 106.84),
  vn("dong-thap", "Đồng Tháp (Cao Lãnh)", 10.46, 105.63),
  vn("gia-lai", "Gia Lai (Pleiku)", 13.98, 108.0),
  vn("ha-giang", "Hà Giang", 22.82, 104.98),
  vn("ha-nam", "Hà Nam (Phủ Lý)", 20.54, 105.91),
  vn("ha-tinh", "Hà Tĩnh", 18.34, 105.91),
  vn("hai-duong", "Hải Dương", 20.94, 106.33),
  vn("hau-giang", "Hậu Giang (Vị Thanh)", 9.78, 105.47),
  vn("hoa-binh", "Hòa Bình", 20.81, 105.34),
  vn("hung-yen", "Hưng Yên", 20.65, 106.05),
  vn("khanh-hoa", "Khánh Hòa (Nha Trang)", 12.24, 109.2),
  vn("kien-giang", "Kiên Giang (Rạch Giá)", 10.01, 105.08),
  vn("kon-tum", "Kon Tum", 14.35, 108.0),
  vn("lai-chau", "Lai Châu", 22.4, 103.46),
  vn("lam-dong", "Lâm Đồng (Đà Lạt)", 11.94, 108.46),
  vn("lang-son", "Lạng Sơn", 21.85, 106.76),
  vn("lao-cai", "Lào Cai", 22.49, 103.97),
  vn("long-an", "Long An (Tân An)", 10.54, 106.41),
  vn("nam-dinh", "Nam Định", 20.43, 106.18),
  vn("nghe-an", "Nghệ An (Vinh)", 18.68, 105.68),
  vn("ninh-binh", "Ninh Bình", 20.25, 105.97),
  vn("ninh-thuan", "Ninh Thuận (Phan Rang)", 11.57, 108.99),
  vn("phu-tho", "Phú Thọ (Việt Trì)", 21.32, 105.4),
  vn("phu-yen", "Phú Yên (Tuy Hòa)", 13.09, 109.29),
  vn("quang-binh", "Quảng Bình (Đồng Hới)", 17.47, 106.62),
  vn("quang-nam", "Quảng Nam (Tam Kỳ)", 15.57, 108.47),
  vn("quang-ngai", "Quảng Ngãi", 15.12, 108.79),
  vn("quang-ninh", "Quảng Ninh (Hạ Long)", 20.95, 107.08),
  vn("quang-tri", "Quảng Trị (Đông Hà)", 16.82, 107.1),
  vn("soc-trang", "Sóc Trăng", 9.6, 105.98),
  vn("son-la", "Sơn La", 21.33, 103.91),
  vn("tay-ninh", "Tây Ninh", 11.31, 106.1),
  vn("thai-binh", "Thái Bình", 20.45, 106.34),
  vn("thai-nguyen", "Thái Nguyên", 21.59, 105.85),
  vn("thanh-hoa", "Thanh Hóa", 19.81, 105.78),
  vn("tien-giang", "Tiền Giang (Mỹ Tho)", 10.36, 106.36),
  vn("tra-vinh", "Trà Vinh", 9.93, 106.35),
  vn("tuyen-quang", "Tuyên Quang", 21.82, 105.21),
  vn("vinh-long", "Vĩnh Long", 10.25, 105.97),
  vn("vinh-phuc", "Vĩnh Phúc (Vĩnh Yên)", 21.31, 105.6),
  vn("yen-bai", "Yên Bái", 21.71, 104.88),

  intl("los-angeles", "Los Angeles", "Hoa Kỳ", 34.05, -118.24, "America/Los_Angeles", "US"),
  intl("orange-county", "Westminster (Orange County)", "Hoa Kỳ", 33.76, -117.99, "America/Los_Angeles", "US"),
  intl("san-jose", "San Jose", "Hoa Kỳ", 37.34, -121.89, "America/Los_Angeles", "US"),
  intl("seattle", "Seattle", "Hoa Kỳ", 47.61, -122.33, "America/Los_Angeles", "US"),
  intl("houston", "Houston", "Hoa Kỳ", 29.76, -95.37, "America/Chicago", "US"),
  intl("dallas", "Dallas", "Hoa Kỳ", 32.78, -96.8, "America/Chicago", "US"),
  intl("chicago", "Chicago", "Hoa Kỳ", 41.88, -87.63, "America/Chicago", "US"),
  intl("atlanta", "Atlanta", "Hoa Kỳ", 33.75, -84.39, "America/New_York", "US"),
  intl("washington", "Washington, D.C.", "Hoa Kỳ", 38.91, -77.04, "America/New_York", "US"),
  intl("new-york", "New York", "Hoa Kỳ", 40.71, -74.01, "America/New_York", "US"),
  intl("boston", "Boston", "Hoa Kỳ", 42.36, -71.06, "America/New_York", "US"),
  intl("honolulu", "Honolulu", "Hoa Kỳ", 21.31, -157.86, "Pacific/Honolulu", "US"),
  intl("toronto", "Toronto", "Canada", 43.65, -79.38, "America/Toronto", "CA"),
  intl("montreal", "Montréal", "Canada", 45.5, -73.57, "America/Toronto", "CA"),
  intl("vancouver", "Vancouver", "Canada", 49.28, -123.12, "America/Vancouver", "CA"),
  intl("mexico-city", "Thành phố México", "Châu Mỹ khác", 19.43, -99.13, "America/Mexico_City", "MX"),
  intl("sao-paulo", "São Paulo", "Châu Mỹ khác", -23.55, -46.63, "America/Sao_Paulo", "BR"),
  intl("paris", "Paris", "Châu Âu", 48.86, 2.35, "Europe/Paris", "FR"),
  intl("berlin", "Berlin", "Châu Âu", 52.52, 13.4, "Europe/Berlin", "DE"),
  intl("london", "London", "Châu Âu", 51.51, -0.13, "Europe/London", "GB"),
  intl("praha", "Praha", "Châu Âu", 50.08, 14.44, "Europe/Prague", "CZ"),
  intl("warszawa", "Warszawa", "Châu Âu", 52.23, 21.01, "Europe/Warsaw", "PL"),
  intl("moskva", "Moskva", "Châu Âu", 55.76, 37.62, "Europe/Moscow", "RU"),
  intl("amsterdam", "Amsterdam", "Châu Âu", 52.37, 4.9, "Europe/Amsterdam", "NL"),
  intl("bruxelles", "Bruxelles", "Châu Âu", 50.85, 4.35, "Europe/Brussels", "BE"),
  intl("zurich", "Zürich", "Châu Âu", 47.38, 8.54, "Europe/Zurich", "CH"),
  intl("roma", "Roma", "Châu Âu", 41.9, 12.5, "Europe/Rome", "IT"),
  intl("madrid", "Madrid", "Châu Âu", 40.42, -3.7, "Europe/Madrid", "ES"),
  intl("oslo", "Oslo", "Châu Âu", 59.91, 10.75, "Europe/Oslo", "NO"),
  intl("stockholm", "Stockholm", "Châu Âu", 59.33, 18.07, "Europe/Stockholm", "SE"),
  intl("kobenhavn", "Copenhagen", "Châu Âu", 55.68, 12.57, "Europe/Copenhagen", "DK"),
  intl("tromso", "Tromsø (vĩ độ cao)", "Châu Âu", 69.65, 18.96, "Europe/Oslo", "NO"),
  intl("sydney", "Sydney", "Châu Đại Dương", -33.87, 151.21, "Australia/Sydney", "AU"),
  intl("melbourne", "Melbourne", "Châu Đại Dương", -37.81, 144.96, "Australia/Melbourne", "AU"),
  intl("brisbane", "Brisbane", "Châu Đại Dương", -27.47, 153.03, "Australia/Brisbane", "AU"),
  intl("adelaide", "Adelaide", "Châu Đại Dương", -34.93, 138.6, "Australia/Adelaide", "AU"),
  intl("perth", "Perth", "Châu Đại Dương", -31.95, 115.86, "Australia/Perth", "AU"),
  intl("auckland", "Auckland", "Châu Đại Dương", -36.85, 174.76, "Pacific/Auckland", "NZ"),
  intl("tokyo", "Tokyo", "Châu Á", 35.68, 139.65, "Asia/Tokyo", "JP"),
  intl("osaka", "Osaka", "Châu Á", 34.69, 135.5, "Asia/Tokyo", "JP"),
  intl("seoul", "Seoul", "Châu Á", 37.57, 126.98, "Asia/Seoul", "KR"),
  intl("dai-bac", "Đài Bắc", "Châu Á", 25.03, 121.57, "Asia/Taipei", "TW"),
  intl("bac-kinh", "Bắc Kinh", "Châu Á", 39.9, 116.41, "Asia/Shanghai", "CN"),
  intl("thuong-hai", "Thượng Hải", "Châu Á", 31.23, 121.47, "Asia/Shanghai", "CN"),
  intl("quang-chau", "Quảng Châu", "Châu Á", 23.13, 113.26, "Asia/Shanghai", "CN"),
  intl("hong-kong", "Hồng Kông", "Châu Á", 22.32, 114.17, "Asia/Hong_Kong", "HK"),
  intl("singapore", "Singapore", "Châu Á", 1.35, 103.82, "Asia/Singapore", "SG"),
  intl("bangkok", "Bangkok", "Châu Á", 13.76, 100.5, "Asia/Bangkok", "TH"),
  intl("vientiane", "Viêng Chăn", "Châu Á", 17.98, 102.63, "Asia/Vientiane", "LA"),
  intl("phnom-penh", "Phnôm Pênh", "Châu Á", 11.56, 104.93, "Asia/Phnom_Penh", "KH"),
  intl("kuala-lumpur", "Kuala Lumpur", "Châu Á", 3.14, 101.69, "Asia/Kuala_Lumpur", "MY"),
  intl("manila", "Manila", "Châu Á", 14.6, 120.98, "Asia/Manila", "PH"),
  intl("jakarta", "Jakarta", "Châu Á", -6.21, 106.85, "Asia/Jakarta", "ID"),
  intl("new-delhi", "New Delhi", "Châu Á", 28.61, 77.21, "Asia/Kolkata", "IN"),
  intl("dubai", "Dubai", "Châu Á", 25.2, 55.27, "Asia/Dubai", "AE"),
];

export const DEFAULT_PLACE_ID = "ha-noi";

export function placeById(id: string): Place | undefined {
  return PLACES.find((p) => p.id === id);
}

/** Nhóm theo `group` giữ thứ tự xuất hiện — dùng cho <optgroup>. */
export function placeGroups(): { group: string; places: Place[] }[] {
  const out: { group: string; places: Place[] }[] = [];
  for (const p of PLACES) {
    let g = out.find((x) => x.group === p.group);
    if (!g) {
      g = { group: p.group, places: [] };
      out.push(g);
    }
    g.places.push(p);
  }
  return out;
}

/** Định dạng tọa độ "21,03° B · 105,85° Đ". */
export function formatCoords(lat: number, lon: number): string {
  const f = (v: number) => Math.abs(v).toFixed(2).replace(".", ",");
  return `${f(lat)}° ${lat >= 0 ? "B" : "N"} · ${f(lon)}° ${lon >= 0 ? "Đ" : "T"}`;
}
