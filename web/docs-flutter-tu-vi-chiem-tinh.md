# Bàn giao Flutter — Lá số Tử Vi và Bản đồ sao

Tài liệu cho việc port `/la-so-tu-vi/` và `/chiem-tinh/` sang app Flutter Lịch Âm (`C:\dev\licham_mobile\licham-calendar-app`).
Website là nguồn chuẩn: app phải cho **cùng kết quả** trên bộ fixture ở mục 5. Không sửa app trong repo website.

## 1. Bản đồ mã nguồn

| Web (TypeScript) | Vai trò | Port sang Dart |
| --- | --- | --- |
| `web/lib/tu-vi-dau-so/engine.ts` | An sao, cục, cung, vòng sao, đại/tiểu hạn | **Port thẳng** — số học thuần, không phụ thuộc |
| `web/lib/tu-vi-dau-so/stars.ts` | Danh mục sao, Tứ Hóa, tên vòng, tên cung | **Port thẳng** (dữ liệu) |
| `web/lib/tu-vi-dau-so/van-han.ts` | Vận hạn theo năm xem, sao lưu | **Port thẳng** |
| `web/lib/tu-vi-dau-so/birth.ts` | Chuẩn hóa ngày giờ sinh → ngày âm + canh giờ | **Port**, dùng bộ đổi lịch âm sẵn có của app và lớp múi giờ ở mục 3 |
| `web/lib/tu-vi-dau-so/giai-nghia.ts` | Giải nghĩa cung, sao (nội dung tự biên soạn) | **Dùng lại nguyên văn** (có thể xuất JSON) |
| `web/lib/chiem-tinh/engine.ts` — `ascendant`, `midheaven`, `placidusCusps`, `porphyryCusps`, `houseOf`, `findAspects` | Hình học góc, nhà, góc hợp | **Port thẳng** |
| `web/lib/chiem-tinh/engine.ts` — `eclipticOfDate`, `trueNodeLongitude`, `SiderealTime`, `e_tilt` | Vị trí thiên thể, giờ sao, độ nghiêng | **Cần thư viện thiên văn** (mục 2) |
| `web/lib/chiem-tinh/giai-nghia.ts` | Cung hoàng đạo, hành tinh, nhà, góc hợp (nội dung) | **Dùng lại nguyên văn** |
| `web/lib/birth/places.ts` | 63 tỉnh thành + thành phố nước ngoài (tọa độ, múi giờ IANA) | **Dùng lại nguyên văn** |
| `web/lib/birth/time.ts` | Giờ đồng hồ → UTC, DST, lịch sử múi giờ VN | **Port**, thay `Intl` bằng package `timezone` (mục 3) |

Lịch âm: engine Tử Vi chỉ cần `solarToLunar`, `lunarToSolar`, `canChiOfYear`, `canChiFromParts` (nạp âm) của `@licham/core` —
app đã có bản Dart tương đương (`lib/almanac/`, `test/features/calendar_tools/fixtures/web_oracle.json`). Phải là **lịch Việt Nam UTC+7** (Hồ Ngọc Đức), không dùng thư viện lịch Trung Quốc.

## 2. Phần cần thư viện thiên văn / native

Web dùng `astronomy-engine` 2.1.19 (MIT). Không có bản Dart chính thức; có bản C, C#, Python, JavaScript, Kotlin. Lựa chọn:

1. **Khuyến nghị:** gọi bản **C** qua `dart:ffi` (chạy cả Android và iOS, cùng mã nguồn với web nên sai số gần như bằng 0).
2. Port riêng các hàm cần: `GeoVector` (VSOP87 rút gọn + Pluto), `GeoMoon`, `Ecliptic` (EQJ → hoàng đạo thật của ngày: tuế sai + chương động), `SiderealTime` (GAST), `e_tilt`, ΔT. Khối lượng lớn; bắt buộc chạy bộ fixture.
3. Không dùng Swiss Ephemeris nếu không chấp nhận giấy phép AGPL/thương mại.

Yêu cầu đầu ra: **kinh độ hoàng đạo biểu kiến (có quang sai) trên hoàng đạo thật của ngày, địa tâm**; Mặt Trăng không cần quang sai. Nút Bắc thực = pháp tuyến quỹ đạo tức thời (vị trí × vận tốc ±1 giờ); Nút trung bình theo Meeus 47.7.

## 3. Quy tắc múi giờ phải giữ giống website

Dart: package `timezone`, nạp **`latest_all.dart`** (bản `latest`/`latest_10y` cắt lịch sử cũ — sai với người sinh trước 2010).

1. **Giờ đồng hồ → UTC** (`resolveBirthTime`): thử các độ lệch quanh thời điểm (±1 ngày, −12 giờ), giữ các nghiệm tự nhất quán.
   - Không nghiệm (nhảy giờ mùa hè) → `gap`: dùng độ lệch **trước** khi chuyển.
   - Hai nghiệm (lùi giờ) → `ambiguous`: chọn **lần đầu** (UTC sớm hơn, còn giờ mùa hè).
2. **Giờ chuẩn / DST**: lấy mẫu độ lệch mỗi 30,4 ngày trong 12 tháng trước và 12 tháng sau; độ lệch nhỏ nhất xuất hiện ở **cả hai phía** và nhỏ hơn độ lệch hiện tại (chênh ≤ 120 phút) là giờ chuẩn. Đổi hẳn múi giờ (VN 13/6/1975) không phải DST.
3. **Việt Nam** (`Asia/Ho_Chi_Minh`, tzdata 2026a): LMT +7:06:30 → 1/7/1906; PLMT → 1/5/1911; +7 → 31/12/1942 23:00; +8 → 14/3/1945 23:00; +9 → 1/9/1945 24:00; +7 → 1/4/1947; +8 → 1/7/1955 01:00; +7 → 31/12/1959 23:00; +8 → 13/6/1975; +7.
   - **Miền Bắc 1960–1975**: nơi sinh `country == "VN"` và vĩ độ ≥ 17° trong [1959-12-31T16:00Z, 1975-06-12T16:00Z) → **+7** (`northVietnamAdjusted`).
   - **1947–1955**: `country == "VN"` và UTC trong [1947-03-31T17:00Z, 1955-06-30T17:00Z) → giữ mặc định tzdata (+8) nhưng **bắt buộc** trả cờ `historical` với hai lựa chọn (+8 vùng Pháp, +7 vùng kháng chiến); giao diện phải báo và cho tính lại.
   - Nơi sinh tự nhập tọa độ: coi là Việt Nam khi múi giờ là `Asia/Ho_Chi_Minh`.
4. **Múi giờ tự chọn** (`overrideOffsetMinutes`): dùng độ lệch cố định, không DST, `manualOffset = true`, vẫn trả cờ `historical`.
5. **Tử Vi** (`chuanHoaNgaySinh`), đúng thứ tự:
   1. Ngày âm nhập vào → ngày dương dân sự (`lunarToSolar`); lỗi tháng nhuận không tồn tại / ngày 30 tháng thiếu phải báo bằng lời.
   2. Giờ đồng hồ → UTC (bước 1–4).
   3. Sinh ở VN → quy về **UTC+7**; nước ngoài → giờ chuẩn địa phương (mặc định, có ghi chú) hoặc giữ giờ đồng hồ nếu người dùng chọn `gioMuaHe = "giu"`.
   4. Canh giờ = ⌊(giờ + 1)/2⌋ mod 12. Giờ 23 → giờ Tý và **ngày dương +1** trước khi đổi âm lịch.
   5. `solarToLunar` (lịch VN). Tháng nhuận an như tháng chính. Năm tính từ Tết.
6. **Chiêm tinh**: dùng đúng thời điểm UTC (giữ DST). Không rõ giờ sinh → tính 12:00 địa phương, báo các thiên thể đổi cung giữa 00:00 và 23:59 địa phương (`signChangesBetween`).

## 4. Quy ước Tử Vi (Nam phái) — không được đổi khi port

Hỏa/Linh theo âm dương nam nữ; Khôi Việt năm Canh = Ngọ/Dần; Nhâm: Thiên Phủ hóa Khoa; Thiên Quý đếm nghịch từ Văn Khúc;
vòng Thái Tuế 12 sao Nam phái; Giải Thần = Phượng Các. Chi tiết và bảng khác biệt: `web/docs-tu-vi-chiem-tinh.md`.
Mỗi lá số hiển thị khung "Quy ước đang áp dụng" (`quyUoc` trong `birth.ts`) — app nên hiển thị tương tự.

## 5. Kiểm thử đối chiếu Web–Flutter

**Fixture** (390 ca, sinh từ engine web):

| File | Số ca | Nội dung mỗi dòng |
| --- | --- | --- |
| `web/fixtures/tu-vi-dau-so-oracle.json` | 310 (10 ca biên + 300 ngẫu nhiên 1920–2069, nơi sinh VN) | `input` (ngày giờ đồng hồ, `place` id, giới tính, tùy chọn `overrideOffsetMinutes`, `gioMuaHe`), `lunar`, `solarTuVi`, `cuc`, `menhChi`, `thanChi`, `viTri` (65 sao → chi 0 = Tý), `tuHoa`, `tuan`, `triet`, `cung[]`, `vanHan` |
| `web/fixtures/chiem-tinh-oracle.json` | 80 (4 hệ nhà, nơi sinh ngẫu nhiên trong danh sách) | `input` (`utcIso`, `lat`, `lon`, `houseSystem`), `points` (lon/lat/speed/retrograde/house), `asc`, `mc`, `cusps`, `meanNode`, `aspects` |

Ca biên Tử Vi: giờ Tý muộn đêm giao thừa; miền Nam và miền Bắc 1970; 00:30 Sài Gòn 1965 lùi sang ngày trước; tháng 4 nhuận 2020; giờ lặp khi lùi DST ở New York; sinh trước Tết; 1950 Hà Nội mặc định +8 và tự chọn +7; New York giữ giờ mùa hè.

**Phía Web** (đã có): `web/lib/fixtures.test.ts` phát lại toàn bộ fixture bằng engine hiện tại.

```bash
pnpm --filter @licham/web exec vitest run lib/fixtures.test.ts
```

Khi engine web đổi có chủ đích: sinh lại fixture rồi chép sang app.

```bash
pnpm --filter @licham/web run export:la-so-fixtures
```

**Phía Flutter** (việc của app, làm trong repo app):

1. Chép hai file JSON vào `test/features/la_so/fixtures/` (giống cách `web_oracle.json` đang dùng).
2. Test Dart đọc từng dòng `cases`, dựng đầu vào (tra `place` theo id trong danh sách nơi sinh đã port), chạy engine Dart, so sánh:
   - Tử Vi: **bằng tuyệt đối** mọi trường (`lunar`, `solarTuVi`, `cuc`, `menhChi`, `thanChi`, toàn bộ `viTri`, `cung[].can/trangSinh/bacSi/thaiTue/daiHan`, `vanHan`).
   - Chiêm tinh: kinh độ ≤ **1e-4°** nếu dùng bản C của astronomy-engine qua FFI; ≤ 0,02° nếu port khác engine (Mặt Trăng sau 2050 ≤ 0,05°); `asc`, `mc`, `cusps` ≤ 1e-4° khi cùng đầu vào thiên văn; danh sách góc hợp trùng tên và loại (có thể khác ở ca orb sát ngưỡng khi dùng engine khác).
3. Chạy `flutter test test/features/la_so/`. Mọi sai lệch Tử Vi là lỗi; sai lệch chiêm tinh vượt ngưỡng là lỗi.
4. Kiểm thêm múi giờ trên thiết bị: bộ test `web/lib/birth/time.test.ts` và `web/lib/tu-vi-dau-so/birth.test.ts` liệt kê các mốc cần có test Dart tương ứng.
